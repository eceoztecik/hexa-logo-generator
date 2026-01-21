from models import Job
from config import VALID_LOGO_STYLES, MIN_PROMPT_LENGTH, MAX_PROMPT_LENGTH

def validate_job(job: Job) -> bool:
    prompt = job.prompt.strip() if job.prompt else ""

    if not prompt:
        return False

    if len(prompt) < MIN_PROMPT_LENGTH or len(prompt) > MAX_PROMPT_LENGTH:
        return False

    if not job.logo_style or job.logo_style not in VALID_LOGO_STYLES:
        return False

    return True

