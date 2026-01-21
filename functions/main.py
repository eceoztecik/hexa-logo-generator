from firebase_functions import firestore_fn
from firebase_admin import initialize_app
from repository import get_job, update_job
from validator import validate_job
from processor import process_job

initialize_app()

@firestore_fn.on_document_created(document="jobs/{jobId}")
def handle_job(event: firestore_fn.Event):
    if event.data is None:
        print("Error: No data in event")
        return

    job_id = event.params["jobId"]

    try:
        job = get_job(job_id)
    except ValueError as e:
        print(f"Job {job_id} not found: {e}")
        return
    except Exception as e:
        print(f"Failed to fetch job {job_id}: {e}")
        return

    if not validate_job(job):
        # Invalid job payload, mark as failed
        print(f"Job {job_id} failed validation")
        job.status = "failed"
        job.error_message = "Validation failed"
        try:
         update_job(job)
        except Exception:
         pass
        return

    print(f"Processing job {job_id}: {job.prompt}")
    job = process_job(job)
    update_job(job)
    print(f"Job {job_id} status: {job.status}")
