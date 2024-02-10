package handlers

import (
	"fmt"
	"os"
	"strings"

	"github.com/VivekAlhat/Chroma/server/helpers"
	"github.com/VivekAlhat/Chroma/server/kmeans"
	"github.com/crazy3lf/colorconv"
	"github.com/gofiber/fiber/v2"
)

const K = 5
const MAX_ITERATIONS = 500

type Color struct {
	RGB        kmeans.Point `json:"rgb"`
	Hex        string       `json:"hex"`
	Percentage string       `json:"percentage"`
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
				hex := strings.Join(strings.Split(colorconv.RGBToHex(uint8(clusters[i].Center.R), uint8(clusters[i].Center.G), uint8(clusters[i].Center.B)), "0x"), "")
				color := Color{RGB: clusters[i].Center, Hex: hex, Percentage: fmt.Sprintf("%.2f", percentage)}
				colors = append(colors, color)
			}

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
