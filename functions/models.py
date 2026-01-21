from dataclasses import dataclass
from datetime import datetime
from typing import Optional

@dataclass
class Job:
    id: str
    prompt: str
    logo_style: str
    surprise_me: bool
    status: str
    result_url: Optional[str] = None
    error_message: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
