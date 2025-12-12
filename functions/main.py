from firebase_functions import firestore_fn
from firebase_admin import initialize_app, firestore
import time
import random

# Initialize Firebase Admin SDK
initialize_app()

@firestore_fn.on_document_created(document="jobs/{jobId}")
def process_logo_generation(event: firestore_fn.Event[firestore_fn.DocumentSnapshot | None]) -> None:
    """
    Process logo generation job when created in Firestore.
    Simulates AI processing with random delay and outcome.
    """
    
    # Validate event data
    if event.data is None:
        print("Error: No data in event")
        return
    
    job_data = event.data.to_dict()
    job_id = event.params["jobId"]
    
    print(f"Processing job {job_id}: {job_data}")
    
    # Simulate processing time (30-60 seconds)
    delay = random.randint(30, 60)
    print(f"Simulating {delay}s processing delay...")
    time.sleep(delay)
    
    # Determine outcome (90% success rate)
    success = random.random() < 0.9
    
    # Update job status in Firestore
    db = firestore.client()
    job_ref = db.collection("jobs").document(job_id)
    
    if success:
        job_ref.update({
            "status": "done",
            "resultUrl": f"https://via.placeholder.com/400/4A90E2/FFFFFF?text=Logo+{job_id[:6]}",
            "updatedAt": firestore.SERVER_TIMESTAMP,
        })
        print(f"✓ Job {job_id} completed")
    else:
        job_ref.update({
            "status": "failed",
            "errorMessage": "Random mock failure for testing",
            "updatedAt": firestore.SERVER_TIMESTAMP,
        })
        print(f"✗ Job {job_id} failed")