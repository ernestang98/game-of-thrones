import os
from typing import Any, Dict

import pytest
import schemas
from db.database import Base, get_db
from fastapi.testclient import TestClient
from main import app
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_TEST_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(
    SQLALCHEMY_TEST_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


@pytest.fixture
def client() -> TestClient:
    app.dependency_overrides[get_db] = override_get_db
    return TestClient(app)


@pytest.fixture
def student() -> Dict[str, Any]:
    return vars(
        schemas.StudentCreate(
            email="student@e.ntu.edu.sg",
            name="student",
            points=0,
            status=1,
            rank=0,
            position=1,
        )
    )


@pytest.fixture
def student_updated() -> Dict[str, Any]:
    return vars(
        schemas.StudentUpdate(
            email="student@e.ntu.edu.sg",  # same PK to identify the object
            name="student_updated",
            points=1000,
            status=2,
            rank=10,
            position=2,
        )
    )


@pytest.fixture
def teacher() -> Dict[str, Any]:
    return vars(schemas.TeacherCreate(email="teacher@e.ntu.edu.sg", name="teacher"))


@pytest.fixture
def teacher_updated() -> Dict[str, Any]:
    return vars(
        schemas.TeacherUpdate(
            email="teacher@e.ntu.edu.sg",  # same PK to identify the object
            name="teacher_updated",
        )
    )


@pytest.fixture
def assignment() -> Dict[str, Any]:
    return vars(
        schemas.AssignmentCreate(
            assignment_name="assignment1",
            assigner="teacher@e.ntu.edu.sg",
            assignee="student@e.ntu.edu.sg",
            points_scored=50,
            time_to_complete_in_seconds=50,
            description="description",
        )
    )


@pytest.fixture
def assignment_updated() -> Dict[str, Any]:
    return vars(
        schemas.AssignmentUpdate(
            assignment_name="assignment1",  # same PK to identify the object
            assigner="teacher@e.ntu.edu.sg",
            assignee="student@e.ntu.edu.sg",
            points_scored=100,
            time_to_complete_in_seconds=100,
            description="updated_description",
        )
    )


@pytest.fixture
def mail() -> Dict[str, Any]:
    return vars(
        schemas.MailCreate(
            subject="subject",
            body_heading="heading",
            body_text="text",
            sender="teacher@e.ntu.edu.sg",
            recipients=["student@e.ntu.edu.sg"],
        )
    )


@pytest.fixture
def category() -> Dict[str, Any]:
    return vars(schemas.CategoryCreate(category_name="category"))


@pytest.fixture
def quest() -> Dict[str, Any]:
    return vars(schemas.QuestCreate(quest_name="quest", category_name="category"))


@pytest.fixture
def subquest() -> Dict[str, Any]:
    return vars(
        schemas.SubquestCreate(
            subquest_name="subquest",
            quest_name="quest",
        )
    )


@pytest.fixture
def npc() -> Dict[str, Any]:
    return vars(
        schemas.NpcCreate(
            npc_name="npc",
            subquest_name="subquest",
        )
    )


@pytest.fixture
def npc_updated() -> Dict[str, Any]:
    return vars(
        schemas.NpcUpdate(
            npc_name="npc_updated",
            subquest_name="subquest_updated",
        )
    )


@pytest.fixture
def attempt() -> Dict[str, Any]:
    return vars(
        schemas.AttemptCreate(
            quest_name="quest",
            student_email="student@e.ntu.edu.sg",
            points_scored=100,
            total_points=100,
            time_to_complete_in_seconds=100,
            completion_date="2021-10-16T15:10:45.030631",
        )
    )


@pytest.fixture
def attempt_updated() -> Dict[str, Any]:
    return vars(
        schemas.AttemptUpdate(
            quest_name="quest",
            student_email="student@e.ntu.edu.sg",
            points_scored=90,
            total_points=100,
            time_to_complete_in_seconds=500,
            completion_date="2021-10-16T15:10:04.435987",
        )
    )


@pytest.fixture
def student_stats() -> Dict[str, Any]:
    return vars(
        schemas.StudentReportStats(
            student_email="student@e.ntu.edu.sg",
            points_earned=100,
            max_points_earnable=100,
        )
    )


@pytest.fixture
def assignment_question() -> Dict[str, Any]:
    return vars(
        schemas.AssignmentQuestionCreate(
            assignment_name="assignment1",
            difficulty=1,
            points=100,
            prompt="assignment1qns1",
            answer="1",
            choice1="ca",
            choice2="wa",
            choice3="wa",
            choice4="wa",
        )
    )


@pytest.fixture
def assignment_question_updated() -> Dict[str, Any]:
    return vars(
        schemas.AssignmentQuestionUpdate(
            assignment_name="assignment1",
            difficulty=2,
            points=150,
            prompt="assignment1qns1updated",
            answer="2",
            choice1="wa",
            choice2="ca",
            choice3="wa_updated",
            choice4="wa_updated",
        )
    )


@pytest.fixture
def question() -> Dict[str, Any]:
    return vars(
        schemas.QuestionCreate(
            subquest_name="subquest",
            difficulty=1,
            points=100,
            prompt="assignment1qns1",
            answer=2,
            choice1="ca",
            choice2="wa",
            choice3="wa",
            choice4="wa",
        )
    )


@pytest.fixture
def question_updated() -> Dict[str, Any]:
    return vars(
        schemas.QuestionUpdate(
            subquest_name="subquest_updated",
            difficulty=2,
            points=150,
            prompt="assignment1qns1updated",
            answer=2,
            choice1="wa",
            choice2="ca",
            choice3="wa_updated",
            choice4="wa_updated",
        )
    )


@pytest.fixture
def challenge() -> Dict[str, Any]:
    return vars(
        schemas.ChallengeCreate(
            challenger_email="student@e.ntu.edu.sg",
            challengee_email="student@e.ntu.edu.sg",
            difficulty=1,
            quest_name="quest",
            category_name="category",
            number_of_questions=5,
            challengee_accepted = False,
            challenger_completed = False,
            challengee_completed = False
        )
    )


@pytest.fixture
def challenge_updated() -> Dict[str, Any]:
    return vars(
        schemas.ChallengeUpdate(
            challenger_email="student@e.ntu.edu.sg",
            challengee_email="student@e.ntu.edu.sg",
            difficulty=2,
            quest_name="quest",
            category_name="category",
            number_of_questions=10,
            challengee_accepted = True,
            challenger_completed = True,
            challengee_completed = True
        )
    )


def pysessionfinish(session, exitstatus):
    os.remove("test.db")
