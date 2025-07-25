terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "5.30"
    }
  }
}

provider "google" {
  project = "sara-sandbox-interns"
  region  = "europe-west1"
}