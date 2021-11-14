"""
Unit tests for the update process of entities within the database via the REST endpoints.
"""

from typing import Any, Dict

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


def test_update_student(client: TestClient, student_updated: Dict[str, Any]):
    """Tests the PATCH endpoint at /student/ for student update

    Args:
        client (TestClient): Client for making HTTP requests to
        student (Dict[str, Any]): Student to be updated
    """
    assert validate(client.patch("/student/", json=student_updated), student_updated)


def test_update_teacher(client: TestClient, teacher_updated: Dict[str, Any]):
    """Tests the PATCH endpoint at /teacher/ for teacher update

    Args:
        client (TestClient): Client for making HTTP requests to
        teacher (Dict[str, Any]): Teacher to be created
    """
    assert validate(client.patch("/teacher/", json=teacher_updated), teacher_updated)


def test_update_assignment(client: TestClient, assignment_updated: Dict[str, Any]):
    """Tests the PATCH endpoint at /asignment/ for asignment update

    Args:
        client (TestClient): Client for making HTTP requests to
        asignment (Dict[str, Any]): Assignment to be created
    """
    assert validate(
        client.patch("/assignment/", json=assignment_updated), assignment_updated
    )


def test_update_attempt(client: TestClient, attempt_updated: Dict[str, Any]):
    """Tests the PATCH endpoint at /attempt/ for attempt update

    Args:
        client (TestClient): Client for making HTTP requests to
        attempt (Dict[str, Any]): Attempt to be created
    """
    assert validate(client.patch("/attempt/", json=attempt_updated), attempt_updated)


# def test_update_assignmentQuestion(client: TestClient, assignmentQuestion_updated: Dict[str, Any]):
#     assert validate(client.patch("/assignmentQuestion/", json=assignmentQuestion_updated), assignmentQuestion_updated)


# def test_update_question(client: TestClient, question_updated: Dict[str, Any]):
#     assert validate(client.patch("/question/", json=question_updated), question_updated)
