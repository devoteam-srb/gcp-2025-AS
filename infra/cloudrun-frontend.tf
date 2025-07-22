resource "google_cloud_run_service" "frontend" {
  name     = "cartwish-frontend"
  location = "europe-west1"

  template {
    spec {
      containers {
        image = "europe-west1-docker.pkg.dev/sara-sandbox-interns/cartwish-repo/frontend:latest"
        ports {
          container_port = 80
        }
      }
    }
  }
}

 