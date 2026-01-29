import random
from firebase_functions import firestore_fn, https_fn, options
from firebase_admin import initialize_app, firestore

from repository import get_job, update_job
from validator import validate_job
from processor import process_job
from task_scheduler import schedule_job_completion
from config import PROCESSING_DELAY_SECONDS_MIN, PROCESSING_DELAY_SECONDS_MAX

initialize_app()


@firestore_fn.on_document_created(
    document="jobs/{jobId}",
    region="europe-west1"
)
def handle_job_creation(event: firestore_fn.Event):
    """Validate job and schedule async processing."""
    if event.data is None:
        print("Error: No data in event")
        return

    job_id = event.params["jobId"]
    print(f"[handle_job_creation] jobId={job_id}")

    db = firestore.client()

    try:
        job = get_job(job_id)
    except Exception as e:
        print(f"Failed to fetch job {job_id}: {e}")
        return

    if job.status != "pending":
        print(f"Job {job_id} not pending (status={job.status}), skipping")
        return

    if not validate_job(job):
        print(f"Validation failed for job {job_id}")
        db.collection("jobs").document(job_id).update({
            "status": "failed",
            "errorMessage": "Validation failed",
            "updatedAt": firestore.SERVER_TIMESTAMP
        })
        return

    # Mark as processing
    db.collection("jobs").document(job_id).update({
        "status": "processing",
        "updatedAt": firestore.SERVER_TIMESTAMP
    })

    delay = random.randint(
        PROCESSING_DELAY_SECONDS_MIN,
        PROCESSING_DELAY_SECONDS_MAX
    )

    try:
        schedule_job_completion(job_id, delay)
        print(f"Job {job_id} scheduled (+{delay}s)")
    except Exception as e:
        print(f"Scheduling failed for job {job_id}: {e}")
        db.collection("jobs").document(job_id).update({
            "status": "failed",
            "errorMessage": f"Scheduling failed: {str(e)}",
            "updatedAt": firestore.SERVER_TIMESTAMP
        })


@https_fn.on_request(
    cors=options.CorsOptions(cors_origins="*", cors_methods=["POST"]),
    region="europe-west1"
)
def complete_job(req: https_fn.Request) -> https_fn.Response:
    """Process job and mark as completed."""
    try:
        job_id = req.get_json().get("jobId")
        if not job_id:
            return https_fn.Response("Missing jobId", status=400)
    except Exception:
        return https_fn.Response("Invalid request", status=400)

    try:
        job = get_job(job_id)
    except ValueError:
        return https_fn.Response("Job not found", status=404)
    except Exception as e:
        return https_fn.Response(f"Error: {e}", status=500)

    if job.status != "processing":
        return https_fn.Response(
            f"Job already {job.status}",
            status=200
        )

    try:
        job = process_job(job)
        update_job(job)
        return https_fn.Response("Job completed", status=200)
    except Exception as e:
        print(f"Processing failed for job {job_id}: {e}")
        return https_fn.Response("Processing failed", status=500)
