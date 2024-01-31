package main

import (
	"log"
	"time"

	"github.com/VivekAlhat/Chroma/server/handlers"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	app := fiber.New(fiber.Config{
		BodyLimit: 20 * 1024 * 1024,
	})

	app.Use(cors.New())
	app.Use(logger.New())
	app.Use(limiter.New(limiter.Config{
		Max:               5,
		Expiration:        60 * time.Minute,
		LimiterMiddleware: limiter.SlidingWindow{},
	}))

	app.Get("/", func(c *fiber.Ctx) error {
		c.SendString("Hello Chroma")
		return nil
	})

	app.Post("/upload", handlers.GeneratePalette)

	log.Fatal(app.Listen(":8000"))
}
