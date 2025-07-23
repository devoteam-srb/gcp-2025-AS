resource "google_iam_workload_identity_pool" "git_pool" { // Kreira workload identity pool
  workload_identity_pool_id = "git-pool-50"
  display_name              = "GitHub Actions Pool"
}

resource "google_iam_workload_identity_pool_provider" "github_provider" { //Kreira provider-a unutar pool-a Ovaj provider povezuje GitHub Actions s GCP-om, omogućavajući GitHub Actions workflowovima da dobiju privremene GCP tokene putem OIDC-a. To eliminira potrebu za dijeljenjem service account ključeva, čineći autentifikaciju sigurnijom.
  workload_identity_pool_id          = google_iam_workload_identity_pool.git_pool.workload_identity_pool_id
  workload_identity_pool_provider_id = "github-provider"
  display_name                       = "GitHub Actions Provider"

  oidc {
    issuer_uri = "https://token.actions.githubusercontent.com"
  }

  attribute_mapping = {
    "google.subject"         = "assertion.sub"
    "attribute.actor"        = "assertion.actor"
    "attribute.repository"   = "assertion.repository"
    "attribute.ref"          = "assertion.ref"
  }
  attribute_condition = "attribute.repository == assertion.repository && attribute.repository_owner == assertion.repository_owner"
}

resource "google_service_account_iam_member" "github_wif_binding" { // Dodjeljuje ulogu Workload Identity User (roles/iam.workloadIdentityUser) specifičnom GitHub repozitoriju (devoteam-srb/gcp-2025-AS) putem Workload Identity Poola.
  service_account_id = google_service_account.github_actions.name
  role               = "roles/iam.workloadIdentityUser"
  member             = "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.git_pool.name}/attribute.repository/devoteam-srb/gcp-2025-AS"
}
//Ovo je ključni korak koji povezuje GitHub repozitorij s GCP service accountom. Samo workflowovi iz navedenog repozitorija mogu "preuzeti" identitet service accounta i izvršavati akcije (npr. deploy na Cloud Run, upload u Artifact Registry).