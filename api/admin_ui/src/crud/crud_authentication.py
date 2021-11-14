import uuid
from collections import namedtuple
from datetime import datetime
from random import randint
from typing import Dict, Optional

from mail.send_mail import send_mail_async

Session = namedtuple("Session", ["email_address", "session_id", "time_created"])


class OTPSession:
    def __init__(self, *, ttl_in_seconds: int = 600):
        self.ttl_in_seconds = ttl_in_seconds
        self.map: Dict[int, Session] = dict()

    def create(self, otp: int, email_address: str):
        session_id = str(uuid.uuid4())
        time_created = datetime.now()
        session = Session(email_address, session_id, time_created)
        self.map[otp] = session

    def get(self, email_address: str, otp: int) -> Optional[Session]:
        time_retrieved = datetime.now()
        session = self.map.get(otp)

        if session is None:
            return False

        if session.email_address != email_address:
            return False

        if (
            time_retrieved - session.time_created
        ).total_seconds() > self.ttl_in_seconds:
            del self.map[otp]
            return False

        return True


class CRUDAuthentication:
    def __init__(self):
        self.otp_session: Dict[int, str] = OTPSession()

    async def send_otp(self, email_address: str) -> None:
        otp = randint(100000, 999999)
        self.otp_session.create(otp, email_address)
        await self.send_otp_email(email_address, otp)

    def verify_otp(self, email_address: str, otp: str) -> bool:
        return bool(self.otp_session.get(email_address, otp))

    async def send_otp_email(self, email_address: str, otp: int) -> None:
        subject = "Game of Thrones - Login OTP"
        recipients = [email_address]
        await send_mail_async(
            subject,
            recipients,
            subject,
            f"Your OTP is {otp}. It expires in {self.otp_session.ttl_in_seconds // 60} minutes.",
        )


authentication = CRUDAuthentication()
