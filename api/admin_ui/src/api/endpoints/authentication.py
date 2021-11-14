import crud
from fastapi import APIRouter

router = APIRouter()


@router.get("/send")
async def send_otp(email_address: str):
    await crud.authentication.send_otp(email_address)


@router.get("/validate")
def validate_otp(email_address: str, otp: int) -> bool:
    return crud.authentication.verify_otp(email_address, otp)
