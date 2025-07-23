resource "google_cloud_run_service" "backend" {
  name     = "cartwish-backend"
  location = "europe-west1"

  template {
    spec {
      containers {
        image = "europe-west1-docker.pkg.dev/sara-sandbox-interns/cartwish-repo/backend:latest"

        env {
          name  = "DATABASE"
          value = "mongodb+srv://aleksandarsrajer:aleksandarsrajer@cartwishcluster.jtpr4rz.mongodb.net/?retryWrites=true&w=majority&appName=CartWishCluster"
        }

        env {
          name  = "JWTSECRET"
          value = "cartwish_secret"
        }

        ports {
          container_port = 5000
        }
      }
    }
  }
  autogenerate_revision_name = true
  # metadata {
  #   annotations = {
  #     "run.googleapis.com/ingress" = "internal-and-cloud-load-balancing"
  #   }
  # }

}

# resource "google_cloud_run_service_iam_member" "backend_invoked_by_frontend" {
#   location = google_cloud_run_service.backend.location
#   service  = google_cloud_run_service.backend.name
#   role     = "roles/run.invoker"
#   member = "serviceAccount:${google_service_account.frontend_sa.email}"
# }