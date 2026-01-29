import json
from datetime import datetime, timedelta, timezone
from google.cloud import tasks_v2
from google.protobuf import timestamp_pb2

from config import PROJECT_ID, LOCATION, QUEUE_NAME, COMPLETION_FUNCTION_URL


def schedule_job_completion(job_id: str, delay_seconds: int) -> str:
    """Schedule job completion after delay using Cloud Tasks."""
    
    if not COMPLETION_FUNCTION_URL:
        raise ValueError("COMPLETION_FUNCTION_URL not configured")
    
    client = tasks_v2.CloudTasksClient()
    parent = client.queue_path(PROJECT_ID, LOCATION, QUEUE_NAME)
    
    execute_time = datetime.now(timezone.utc) + timedelta(seconds=delay_seconds)
    timestamp = timestamp_pb2.Timestamp()
    timestamp.FromDatetime(execute_time)
    
    task = {
        "http_request": {
            "http_method": tasks_v2.HttpMethod.POST,
            "url": COMPLETION_FUNCTION_URL,
            "headers": {"Content-Type": "application/json"},
            "oidc_token": {
                "service_account_email": "753744927002-compute@developer.gserviceaccount.com"
            },
            "body": json.dumps({"jobId": job_id}).encode(),
        },
        "schedule_time": timestamp,
    }
    
    response = client.create_task(request={"parent": parent, "task": task})
    print(f"Scheduled job {job_id} (+{delay_seconds}s)")
    
    return response.name