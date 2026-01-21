from firebase_admin import firestore
from models import Job

db = firestore.client()

def update_job(job: Job):
    try:
        job_ref = db.collection("jobs").document(job.id)
        update_data = {
            "status": job.status,
            "updatedAt": firestore.SERVER_TIMESTAMP,
        }

        if job.result_url:
            update_data["resultUrl"] = job.result_url
        if job.error_message:
            update_data["errorMessage"] = job.error_message

        job_ref.update(update_data)

    except Exception as e:
        print(f"Failed to update job {job.id}: {e}")
        raise


def get_job(job_id: str) -> Job:
    doc = db.collection("jobs").document(job_id).get()
    if doc.exists:
        data = doc.to_dict()
        return Job(
            id=doc.id,
            prompt=data["prompt"],
            logo_style=data["logoStyle"],
            surprise_me=data["surpriseMe"],
            status=data["status"],
            result_url=data.get("resultUrl"),
            error_message=data.get("errorMessage"),
            created_at=data.get("createdAt"),
            updated_at=data.get("updatedAt"),
        )
    else:
        raise ValueError("Job not found")
