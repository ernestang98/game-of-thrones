from fastapi import APIRouter

# TODO - import the endpoint
from api.endpoints import (
    assignment,
    assignmentQuestion,
    attempt,
    authentication,
    category,
    challenge,
    leaderboard,
    mail,
    npc,
    quest,
    question,
    student,
    subquest,
    teacher,
)

api_router = APIRouter()
api_router.include_router(
    authentication.router, prefix="/authentication", tags=["authentication"]
)
api_router.include_router(assignment.router, prefix="/assignment", tags=["assignment"])
api_router.include_router(
    assignmentQuestion.router, prefix="/assignmentQuestion", tags=["assignmentQuestion"]
)
api_router.include_router(attempt.router, prefix="/attempt", tags=["attempt"])
api_router.include_router(category.router, prefix="/category", tags=["category"])
api_router.include_router(challenge.router, prefix="/challenge", tags=["challenge"])
api_router.include_router(
    leaderboard.router, prefix="/leaderboard", tags=["leaderboard"]
)
api_router.include_router(mail.router, prefix="/mail", tags=["mail"])
api_router.include_router(npc.router, prefix="/npc", tags=["npc"])
api_router.include_router(quest.router, prefix="/quest", tags=["quest"])
api_router.include_router(question.router, prefix="/question", tags=["question"])
api_router.include_router(student.router, prefix="/student", tags=["student"])
api_router.include_router(subquest.router, prefix="/subquest", tags=["subquest"])
api_router.include_router(teacher.router, prefix="/teacher", tags=["teacher"])

# TODO api_router.include_router(xxx.router, prefix="/xxx", tags=["xxx"])
