package handlers

import (
	"fmt"
	"os"
	"sort"

	"github.com/VivekAlhat/Chroma/server/helpers"
	"github.com/VivekAlhat/Chroma/server/kmeans"
	"github.com/gofiber/fiber/v2"
)

const K = 5
const MAX_ITERATIONS = 500

type Color struct {
	RGB        kmeans.Point `json:"rgb"`
	Hex        string       `json:"hex"`
	Percentage int          `json:"percentage"`
}

type Palette struct {
	Name    string  `json:"name"`
	Palette []Color `json:"palette"`
}

func GeneratePalette(c *fiber.Ctx) error {
	form, err := c.MultipartForm()
	if err != nil {
		return err
	}

	var palettes []Palette
	for _, headers := range form.File {
		for _, file := range headers {
			colors := make([]Color, 0)

			err := os.MkdirAll("./tmp", os.ModePerm)
			if err != nil {
				return err
			}

			destination := fmt.Sprintf("./tmp/%s", file.Filename)
			if err := c.SaveFile(file, destination); err != nil {
				return err
			}

			img, err := helpers.LoadImage(destination)
			if err != nil {
				return err
			}

			resized := helpers.ResizeImage(img, 100)
			points := helpers.ExtractColors(resized)

			clusters := kmeans.KMeans(points, K, MAX_ITERATIONS)

			for i := range clusters {
				percentage := helpers.CalculatePercentage(len(clusters[i].Points), len(points))
				hex := helpers.ConvertToHEX(clusters[i].Center)
				color := Color{RGB: clusters[i].Center, Hex: hex, Percentage: int(percentage)}
				colors = append(colors, color)
			}

			sort.Slice(colors, func(i, j int) bool {
				return colors[i].Percentage > colors[j].Percentage
			})

			palette := Palette{Name: file.Filename, Palette: colors}
			palettes = append(palettes, palette)

			deletion := os.Remove(destination)
			if deletion != nil {
				return deletion
			}
		}
	}
	return c.JSON(palettes)
}
