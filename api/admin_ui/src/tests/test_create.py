"""
Unit tests for the creation process of entities within the database via the REST endpoints.
For creation, an ordering to the individual test cases must be specified
to prevent foreign key violations during INSERTs.
"""
from typing import Any, Dict

import pytest
from fastapi.testclient import TestClient
from requests import Response


def validate(response: Response, request_body: Dict[str, Any]) -> bool:
    # 1st creation should raise 200 OK
    assert response.status_code == 200
    response_body = response.json()

    # Ensure all fields in response and request are identical
    return all(
        [
            response_body[field] == request_body[field]
            for field in response_body
            if field in request_body
        ]
    )


@pytest.mark.run(order=0)
def test_create_student(client: TestClient, student: Dict[str, Any]):
    """Tests the POST endpoint at /student/ for student creation

    Args:
        client (TestClient): Client for making HTTP requests to
        student (Dict[str, Any]): Student to be created
    """
    assert validate(client.post("/student/", json=student), student)


@pytest.mark.run(order=1)
def test_create_teacher(client: TestClient, teacher: Dict[str, Any]):
    """Tests the POST endpoint at /teacher/ for teacher creation

    Args:
        client (TestClient): Client for making HTTP requests to
        teacher (Dict[str, Any]): Teacher to be created
    """
    assert validate(client.post("/teacher/", json=teacher), teacher)


@pytest.mark.run(order=2)
def test_create_assignment(client: TestClient, assignment: Dict[str, Any]):
    """Tests the POST endpoint at /asignment/ for asignment creation

    Args:
        client (TestClient): Client for making HTTP requests to
        asignment (Dict[str, Any]): Assignment to be created
    """
    assert validate(client.post("/assignment/", json=assignment), assignment)


@pytest.mark.run(order=3)
def test_create_mail(client: TestClient, mail: Dict[str, Any]):
    """Tests the POST endpoint at /mail/ for mail creation

    Args:
        client (TestClient): Client for making HTTP requests to
        mail (Dict[str, Any]): Mail to be created
    """
    res = client.post("/mail/", json=mail)
    assert res.status_code == 200


@pytest.mark.run(order=4)
def test_create_category(client: TestClient, category: Dict[str, Any]):
    """Tests the POST endpoint at /category/ for category creation

    Args:
        client (TestClient): Client for making HTTP requests to
        category (Dict[str, Any]): Category to be created
    """
    assert validate(client.post("/category/", json=category), category)


@pytest.mark.run(order=5)
def test_create_quest(client: TestClient, quest: Dict[str, Any]):
    """Tests the POST endpoint at /quest/ for quest creation

    Args:
        client (TestClient): Client for making HTTP requests to
        quest (Dict[str, Any]): Quest to be created
    """
    assert validate(client.post("/quest/", json=quest), quest)


@pytest.mark.run(order=6)
def test_create_subquest(client: TestClient, subquest: Dict[str, Any]):
    """Tests the POST endpoint at /subquest/ for subquest creation

    Args:
        client (TestClient): Client for making HTTP requests to
        subquest (Dict[str, Any]): Subquest to be created
    """
    assert validate(client.post("/subquest/", json=subquest), subquest)


@pytest.mark.run(order=7)
def test_create_attempt(client: TestClient, attempt: Dict[str, Any]):
    """Tests the POST endpoint at /attempt/ for attempt creation

    Args:
        client (TestClient): Client for making HTTP requests to
        attempt (Dict[str, Any]): Attempt to be created
    """
    assert validate(client.post("/attempt/", json=attempt), attempt)


@pytest.mark.run(order=8)
def test_create_question(client: TestClient, question: Dict[str, Any]):
    """Tests the POST endpoint at /question/ for question creation

    Args:
        client (TestClient): Client for making HTTP requests to
        question (Dict[str, Any]): Question to be created
    """
    assert validate(client.post("/question/", json=question), question)


@pytest.mark.run(order=9)
def test_create_assignment_question(
    client: TestClient, assignment_question: Dict[str, Any]
):
    """Tests the POST endpoint at /assignmentQuestion/ for assignmentQuestion creation

    Args:
        client (TestClient): Client for making HTTP requests to
        assignment_question (Dict[str, Any]): AssignmentQuestion to be created
    """
    assert validate(
        client.post("/assignmentQuestion/", json=assignment_question),
        assignment_question,
    )


@pytest.mark.run(order=10)
def test_create_npc(client: TestClient, npc: Dict[str, Any]):
    """Tests the POST endpoint at /npc/ for npc creation

    Args:
        client (TestClient): Client for making HTTP requests to
        npc (Dict[str, Any]): NPC to be created
    """
    assert validate(client.post("/npc/", json=npc), npc)


@pytest.mark.run(order=11)
def test_create_challenge(client: TestClient, challenge: Dict[str, Any]):
    """Tests the POST endpoint at /challenge/ for challenge creation

    Args:
        client (TestClient): Client for making HTTP requests to
        challenge (Dict[str, Any]): Challenge to be created
    """
    assert validate(client.post("/challenge/", json=challenge), challenge)
