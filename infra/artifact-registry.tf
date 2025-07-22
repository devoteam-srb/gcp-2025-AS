resource "google_artifact_registry_repository" "docker_repo" {
  format        = "DOCKER"
  location      = "europe-west1"
  repository_id = "cartwish-repo"
}


