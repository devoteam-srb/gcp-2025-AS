resource "google_service_account" "github_actions" {
  account_id   = "github-actions-deployer"
  display_name = "GitHub Actions Deployer"
}

resource "google_project_iam_member" "github_actions_cloud_run" { //Dodeljuje ulogu Cloud Run Admin service account-u
  role    = "roles/run.admin"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
  project = "sara-sandbox-interns"
}

resource "google_project_iam_member" "github_actions_artifact" { //Dodeljuje ulogu writer-a za artifact registry nasem service account-u
  role    = "roles/artifactregistry.writer"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
  project = "sara-sandbox-interns"
}

resource "google_project_iam_member" "github_actions_viewer" {
  role    = "roles/viewer"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
  project = "sara-sandbox-interns"

}

resource "google_project_iam_member" "github_actions_sa" { //Dodeljuje ulogu service account user-a nasem service accountu ovo nam daje da GitHub Actions putem Workload Identity Federetaion-a preuzme identitet ovog servis account-a
  project = "sara-sandbox-interns"
  role    = "roles/iam.serviceAccountUser"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}