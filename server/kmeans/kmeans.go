package kmeans

import (
	"math"
	"math/rand"
)

type Point struct {
	R, G, B int
}

type Cluster struct {
	Center Point
	Points []Point
}

func KMeans(points []Point, k int, maxIterations int) []Cluster {
	clusters := initClusters(points, k)
	for i := 0; i < maxIterations; i++ {
		assignDataPointsToClusters(points, clusters)
		updateCentroids(clusters)
	}
	return clusters
}

func initClusters(points []Point, k int) []Cluster {
	clusters := make([]Cluster, k)
	for i := range clusters {
		index := rand.Intn(len(points))
		clusters[i].Center = points[index]
	}
	return clusters
}

func assignDataPointsToClusters(points []Point, clusters []Cluster) {
	for i := range clusters {
		clusters[i].Points = nil
	}

	for _, p := range points {
		minDistance := getEuclideanDistance(p, clusters[0].Center)
		nearestCluster := 0

		for i := 1; i < len(clusters); i++ {
			distance := getEuclideanDistance(p, clusters[i].Center)
			if distance < minDistance {
				minDistance = distance
				nearestCluster = i
			}
		}

		clusters[nearestCluster].Points = append(clusters[nearestCluster].Points, p)
	}
}

func updateCentroids(clusters []Cluster) {
	for i := range clusters {
		d := len(clusters[i].Points)
		if len(clusters[i].Points) > 0 {
			sumR, sumG, sumB := 0, 0, 0
			for _, p := range clusters[i].Points {
				sumR += p.R
				sumG += p.G
				sumB += p.B
			}
			clusters[i].Center = Point{R: (sumR / d), G: (sumG / d), B: (sumB / d)}
		}
	}
}

func getEuclideanDistance(p1, p2 Point) float64 {
	return math.Sqrt(math.Pow(float64(p1.R-p2.R), 2) + math.Pow(float64(p1.G-p2.G), 2) + math.Pow(float64(p1.B-p2.B), 2))
}
