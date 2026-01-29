import random
from models import Job
from config import SUCCESS_RATE, PLACEHOLDER_URL


def process_job(job: Job) -> Job:
    """Process job and return result."""
    
    success = random.random() < SUCCESS_RATE

    if success:
        job.status = "done"
        job.result_url = f"{PLACEHOLDER_URL}+{job.id[:6]}"
    else:
        job.status = "failed"
        job.error_message = "Processing failed"

    return job