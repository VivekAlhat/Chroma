package main

import (
	"fmt"
	"log"
	"os"
	"sort"

	"github.com/VivekAlhat/Chroma/helpers"
	"github.com/VivekAlhat/Chroma/kmeans"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

const K = 5
const MAX_ITERATIONS = 500

type Color struct {
	RGB        kmeans.Point `json:"rgb"`
	Hex        string       `json:"hex"`
	Percentage int          `json:"percentage"`
}

func main() {
	app := fiber.New(fiber.Config{
		BodyLimit: 10 * 1024 * 1024,
	})
	app.Use(cors.New())

	app.Get("/", func(c *fiber.Ctx) error {
		c.SendString("Hello Chroma")
		return nil
	})

	app.Post("/upload", func(c *fiber.Ctx) error {
		file, err := c.FormFile("image")
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

		palette := make([]Color, 0)
		for i := range clusters {
			percentage := helpers.CalculatePercentage(len(clusters[i].Points), len(points))
			hex := helpers.ConvertToHEX(clusters[i].Center)
			color := Color{RGB: clusters[i].Center, Hex: hex, Percentage: int(percentage)}
			palette = append(palette, color)
		}

		sort.Slice(palette, func(i, j int) bool {
			return palette[i].Percentage > palette[j].Percentage
		})

		deletion := os.Remove(destination)
		if deletion != nil {
			return err
		}

		return c.JSON(palette)
	})

	log.Fatal(app.Listen(":5050"))
}
