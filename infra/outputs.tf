output "backend_url" {
  value = google_cloud_run_service.backend.status[0].url
}

output "frontend_url" {
  value = google_cloud_run_service.frontend.status[0].url
}

output "workload_identity_provider" {
  description = "The Workload Identity Provider resource name for GitHub Actions."
  value       = google_iam_workload_identity_pool_provider.github_provider.name
}