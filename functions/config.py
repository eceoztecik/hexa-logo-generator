import os

# Job processing
PROCESSING_DELAY_SECONDS_MIN = 30
PROCESSING_DELAY_SECONDS_MAX = 60
SUCCESS_RATE = 0.9
PLACEHOLDER_URL = "https://via.placeholder.com/400/4A90E2/FFFFFF?text=Logo"

# Validation
VALID_LOGO_STYLES = ["monogram", "abstract", "mascot", "none"]
MIN_PROMPT_LENGTH = 3
MAX_PROMPT_LENGTH = 500

# Cloud Tasks
PROJECT_ID = os.environ.get("GCP_PROJECT", "hexa-logo-generator")
LOCATION = "europe-west1"
QUEUE_NAME = "job-processing-queue"
COMPLETION_FUNCTION_URL = "https://europe-west1-hexa-logo-generator.cloudfunctions.net/complete_job"