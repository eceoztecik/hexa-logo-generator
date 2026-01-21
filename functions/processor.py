import time
import random
from models import Job
from config import PROCESSING_DELAY_SECONDS_MIN, PROCESSING_DELAY_SECONDS_MAX, SUCCESS_RATE, PLACEHOLDER_URL

def process_job(job: Job) -> Job:
    # Simulate async processing delay
    delay = random.randint(PROCESSING_DELAY_SECONDS_MIN, PROCESSING_DELAY_SECONDS_MAX)
    time.sleep(delay)

    success = random.random() < SUCCESS_RATE

    if success:
        job.status = "done"
        job.result_url = f"{PLACEHOLDER_URL}+{job.id[:6]}"
    else:
        job.status = "failed"
        job.error_message = "Mock AI processing failure"

    return job
