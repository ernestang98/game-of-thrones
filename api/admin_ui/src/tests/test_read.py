"""
Unit tests for the reading process of entities within the database via the REST endpoints.
"""
import math
from typing import Any, Dict

from fastapi.testclient import TestClient


def validate(
    client: TestClient, endpoint: str, expected_entity: Dict[str, any]
) -> bool:
    res = client.get(endpoint)
    assert res.status_code == 200
    data = res.json()

    return all(
        [
            data[field] == expected_entity[field]
            for field in expected_entity
            if field in data
        ]
    )


def test_read_student(client: TestClient, student: Dict[str, Any]):
    """Tests the GET endpoint at /student/ for student read

    Args:
        client (TestClient): Client for making HTTP requests to
        student (Dict[str, Any]): Student to be read
    """
    attempt_res = client.get(f"/attempt/")
    attempt_data = attempt_res.json()

    for attempt in attempt_data:
        student['points'] += attempt['points_scored']
        student['rank'] = math.floor(student['points']/100) + 1
        if student['rank'] > 11:
            student['rank'] = 11

    assert validate(client, f"/student/{student['email']}", student)


def test_read_teacher(client: TestClient, teacher: Dict[str, Any]):
    """Tests the GET endpoint at /teacher/ for teacher read

    Args:
        client (TestClient): Client for making HTTP requests to
        teacher (Dict[str, Any]): Teacher to be created
    """
    assert validate(client, f"/teacher/{teacher['email']}", teacher)


def test_read_all_assignments(client: TestClient, assignment: Dict[str, Any]):
    """Tests the GET endpoint at /asignment/ for asignment read

    Args:
        client (TestClient): Client for making HTTP requests to
        asignment (Dict[str, Any]): Assignment to be created
    """
    res = client.get(f"/assignment/")
    assert res.status_code == 200
    data = res.json()
    assert isinstance(data, list) and len(data) == 1
    returned_test_assignment = data[0]

    for field in assignment:
        if field in returned_test_assignment:
            assert returned_test_assignment[field] == assignment[field]


def test_read_all_mails(client: TestClient, mail: Dict[str, Any]):
    """Tests the GET endpoint at /mail/ for mail read

    Args:
        client (TestClient): Client for making HTTP requests to
        mail (Dict[str, Any]): Mail to be created
    """
    res = client.get(f"/mail/")
    assert res.status_code == 200
    data = res.json()
    assert isinstance(data, list) and len(data) == 1
    returned_test_mail = data[0]

    for field in mail:
        if field in returned_test_mail:
            assert returned_test_mail[field] == mail[field]


def test_read_category(client: TestClient, category: Dict[str, Any]):
    """Tests the GET endpoint at /category/ for category read

    Args:
        client (TestClient): Client for making HTTP requests to
        category (Dict[str, Any]): Category to be created
    """
    assert validate(client, f"/category/{category['category_name']}", category)


def test_read_quest(client: TestClient, quest: Dict[str, Any]):
    """Tests the GET endpoint at /quest/ for quest read

    Args:
        client (TestClient): Client for making HTTP requests to
        quest (Dict[str, Any]): Quest to be created
    """
    assert validate(client, f"/quest/{quest['quest_name']}", quest)


def test_read_subquest(client: TestClient, subquest: Dict[str, Any]):
    """Tests the GET endpoint at /subquest/ for subquest read

    Args:
        client (TestClient): Client for making HTTP requests to
        subquest (Dict[str, Any]): Subquest to be created
    """
    assert validate(client, f"/subquest/{subquest['subquest_name']}", subquest)


def test_read_attempt(client: TestClient, attempt: Dict[str, Any]):
    """Tests the GET endpoint at /attempt/ for attempt read

    Args:
        client (TestClient): Client for making HTTP requests to
        attempt (Dict[str, Any]): Attempt to be created
    """
    assert validate(client, f"/attempt/", attempt)


def test_read_question(client: TestClient, question: Dict[str, Any]):
    """Tests the GET endpoint at /question/ for question read

    Args:
        client (TestClient): Client for making HTTP requests to
        question (Dict[str, Any]): Question to be created
    """
    assert validate(client, f"/question/", question)


def test_read_assignment_question(
    client: TestClient, assignment_question: Dict[str, Any]
):
    """Tests the GET endpoint at /assignmentQuestion/ for assignment_question read

    Args:
        client (TestClient): Client for making HTTP requests to
        assignment_question (Dict[str, Any]): Question to be created
    """
    assert validate(client, f"/assignmentQuestion/", assignment_question)


def test_read_npc(client: TestClient, npc: Dict[str, Any]):
    """Tests the GET endpoint at /npc/ for npc read

    Args:
        client (TestClient): Client for making HTTP requests to
        npc (Dict[str, Any]): NPC to be created
    """
    assert validate(client, f"/npc/{npc['npc_name']}", npc)


def test_read_challenge(client: TestClient, challenge: Dict[str, Any]):
    """Tests the GET endpoint at /challenge/ for challenge read

    Args:
        client (TestClient): Client for making HTTP requests to
        challenge (Dict[str, Any]): Challenge to be created
    """
    assert validate(client, f"/challenge/", challenge)
