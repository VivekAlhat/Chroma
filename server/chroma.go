package main

import (
	"log"
	"time"

	"github.com/VivekAlhat/Chroma/server/handlers"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/storage/bbolt/v2"
)

func main() {
	app := fiber.New(fiber.Config{
		BodyLimit: 20 * 1024 * 1024,
	})

	storage := bbolt.New(bbolt.Config{
		Database: "/data/chroma_limiter.db",
	})

	app.Use(cors.New())
	app.Use(logger.New())
	app.Use(limiter.New(limiter.Config{
		Max:               5,
		Expiration:        30 * time.Minute,
		LimiterMiddleware: limiter.SlidingWindow{},
		KeyGenerator: func(c *fiber.Ctx) string {
			return c.Get("x-forwarded-for")
		},
		Storage: storage,
	}))

	app.Get("/", func(c *fiber.Ctx) error {
		c.SendString("Hello Chroma")
		return nil
	})

	app.Post("/upload", handlers.GeneratePalette)

	log.Fatal(app.Listen(":8080"))
}
