package helpers

import (
	"fmt"
	"image"
	_ "image/jpeg"
	_ "image/png"
	"os"

	"github.com/VivekAlhat/Chroma/kmeans"
	"github.com/nfnt/resize"
)

func LoadImage(filepath string) (image.Image, error) {
	file, err := os.Open(filepath)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	img, _, err := image.Decode(file)
	if err != nil {
		return nil, err
	}

	return img, nil
}

func ResizeImage(image image.Image, width uint) (resized image.Image) {
	resized = resize.Resize(width, 0, image, resize.Lanczos2)
	return
}

func ExtractColors(image image.Image) []kmeans.Point {
	var points []kmeans.Point

	bounds := image.Bounds()
	for x := bounds.Min.X; x < bounds.Max.X; x++ {
		for y := bounds.Min.Y; y < bounds.Max.Y; y++ {
			r, g, b, _ := image.At(x, y).RGBA()
			points = append(points, kmeans.Point{R: int(r >> 8), G: int(g >> 8), B: int(b >> 8)})
		}
	}

	return points
}

func ConvertToHEX(point kmeans.Point) string {
	return fmt.Sprintf("#%X%X%X", point.R, point.G, point.B)
}

func CalculatePercentage(clusterPoints, totalPoints int) (percentage float64) {
	percentage = float64(clusterPoints) / float64(totalPoints) * 100
	return
}
