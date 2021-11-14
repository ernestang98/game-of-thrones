"""
Load Test Suites:
"""


"""
Import Relevant Libraries:
"""
from cicadad.core.decorators import scenario
from cicadad.core.engine import Engine
from cicadad.core.decorators import scenario, load_model, user_loop, dependency
from cicadad.core.scenario import n_seconds, iterations_per_second_limited, n_iterations
from utils import id_generator, generate_url
import requests
import json
import datetime


"""
Instantiate Global Constants/Variables:

REQUESTS_PER_SECOND - the maximum number of requests sendable by a user per second
NUMBER_OF_USERS - the number of simulated users
DURATION_OF_LOAD_TEST - the duration of load test in seconds
"""
engine = Engine()
BASE_URL = "https://fastapi-ernestang98.cloud.okteto.net"
REQUESTS_PER_SECOND = 4
NUMBER_OF_USERS = 30
DURATION_OF_LOAD_TEST = 30
WAIT_PERIOD = 2
TIMEOUT_PERIOD = 1000
LOAD_TEST_EMAIL = "{id}_loadtest@gmail.com".format(id=id_generator())
LOAD_TEST_NAME = "loadtest"
LOAD_TEST_NEW_NAME = "loadtest2"
LOAD_TEST_TEACHER_NAME = "teacher-loadtest"
LOAD_TEST_TEACHER_EMAIL = "teacher-loadtest@admin.com" 
LOAD_TEST_CATEGORY = "loadtest category DO NOT USE IN AUI OR GAME" 


"""
ROOT API LOAD TEST SUITES
"""
@scenario(engine)
@load_model(n_seconds(DURATION_OF_LOAD_TEST, NUMBER_OF_USERS))
@user_loop(iterations_per_second_limited(REQUESTS_PER_SECOND))
def base_api_test(context):
    response = requests.get(BASE_URL)
    assert response.status_code == 200
    return "Root API Test Passed!"


"""
SWAGGER DOCS API LOAD TEST SUITES
"""
@scenario(engine)
@load_model(n_seconds(DURATION_OF_LOAD_TEST, NUMBER_OF_USERS))
@user_loop(iterations_per_second_limited(REQUESTS_PER_SECOND))
def swagger_docs_api_test(context):
    response = requests.get(
        url=generate_url("/docs/", BASE_URL)
    )
    assert response.status_code == 200
    return "Swagger Documentation API Test Passed!"


"""
LEADERBOARD API LOAD TEST SUITES
"""
@scenario(engine)
@load_model(n_seconds(DURATION_OF_LOAD_TEST, NUMBER_OF_USERS))
@user_loop(iterations_per_second_limited(REQUESTS_PER_SECOND))
def leaderboard_api_test(context):
    response = requests.get(
        url=generate_url("/leaderboard/", BASE_URL)
    )
    assert response.status_code == 200
    return "Leaderboard API Test Passed!"


"""
STUDENT/* API LOAD TEST SUITES
"""
@scenario(engine)
@load_model(n_seconds(DURATION_OF_LOAD_TEST, NUMBER_OF_USERS))
@user_loop(iterations_per_second_limited(REQUESTS_PER_SECOND))
def read_all_users(context):
    response = requests.get(
        url=generate_url("/student/", BASE_URL)
    )
    assert response.status_code == 200
    return "READ ALL Student API Test Passed!"


@scenario(engine)
@load_model(n_iterations(1, 1, 1, TIMEOUT_PERIOD))
def create_user_for_load_test(context):
    response = requests.post(
        url=generate_url('/student/', BASE_URL),
        json={
          "email": LOAD_TEST_EMAIL,
          "name": LOAD_TEST_NAME
        }
    )
    assert response.status_code == 200
    body = response.json()
    return {
        "email": body["email"],
        "name": body["name"]
    }


@scenario(engine)
@load_model(n_seconds(DURATION_OF_LOAD_TEST, NUMBER_OF_USERS))
@user_loop(iterations_per_second_limited(REQUESTS_PER_SECOND))
@dependency(create_user_for_load_test)
def read_created_user_valid_test(context):
    response = requests.get(
        url=generate_url("/student/{email}".format(email = context["create_user_for_load_test"]["output"]["email"]), BASE_URL)
    )
    assert response.status_code == 200
    return "READ created student {} from database API Test Passed!".format(context["create_user_for_load_test"]["output"]["name"])  


@scenario(engine)
@load_model(n_seconds(DURATION_OF_LOAD_TEST, NUMBER_OF_USERS))
@user_loop(iterations_per_second_limited(REQUESTS_PER_SECOND))
@dependency(create_user_for_load_test)
def read_created_user_test_invalid_test(context):
    response = requests.get(
        url=generate_url("/student/{email}1".format(email = context["create_user_for_load_test"]["output"]["email"]), BASE_URL)
    )
    assert response.status_code == 200
    assert response.json() == None
    return "READ student {} that does not exists in database API Test Passed!".format(context["create_user_for_load_test"]["output"]["name"] + str(1))  


@scenario(engine)
@load_model(n_iterations(1, 1, 1, TIMEOUT_PERIOD))
@dependency(create_user_for_load_test)
def update_user_for_load_test(context):
    response = requests.patch(
        url=generate_url('/student/', BASE_URL),
        json={
          "email": context["create_user_for_load_test"]["output"]["email"],
          "name": LOAD_TEST_NEW_NAME
        },
    )
    assert response.status_code == 200
    body = response.json()
    assert body["name"] == LOAD_TEST_NEW_NAME
    return {"email": body["email"],"name": body["name"]}


@scenario(engine)
@load_model(n_iterations(1, 1, 1, TIMEOUT_PERIOD))
@dependency(create_user_for_load_test)
def delete_user_for_load_test(context):
    response = requests.delete(
        url=generate_url('/student/?email={email}'.format(email = context["create_user_for_load_test"]["output"]["email"]), BASE_URL)
    )
    assert response.status_code == 204
    return "DELETE created student {} from database API Test Passed!".format(context["create_user_for_load_test"]["output"]["name"])


@scenario(engine)
@load_model(n_iterations(1, 1, 1, TIMEOUT_PERIOD))
@dependency(create_user_for_load_test)
def verify_delete_user_for_load_test(context):
    response = requests.get(
        url=generate_url("/student/{email}".format(email = context["create_user_for_load_test"]["output"]["email"]), BASE_URL)
    )
    assert response.status_code == 200
    assert response.json() == None
    return "Verify DELETE created student {} from database API Test Passed! (timeout error from running 2 requests under one scenario hence, one request per scenario)".format(context["create_user_for_load_test"]["output"]["name"])


"""
TEACHER/* API LOAD TEST SUITES
"""
@scenario(engine)
@load_model(n_iterations(1, 1, 1, TIMEOUT_PERIOD))
def create_teacher_for_load_test(context):
    response = requests.post(
        url=generate_url('/teacher/', BASE_URL),
        json={
          "email": LOAD_TEST_TEACHER_EMAIL,
          "name": LOAD_TEST_TEACHER_NAME
        }
    )
    return "CREATE a Teacher API Test Passed!"

@scenario(engine)
@load_model(n_seconds(DURATION_OF_LOAD_TEST, NUMBER_OF_USERS))
@user_loop(iterations_per_second_limited(REQUESTS_PER_SECOND))
def read_all_teachers(context):
    response = requests.get(
        url=generate_url("/teacher/", BASE_URL)
    )
    assert response.status_code == 200
    assert response.json() != None  
    return "READ ALL CATEGORY API Test Passed!"


@scenario(engine)
@load_model(n_seconds(DURATION_OF_LOAD_TEST, NUMBER_OF_USERS))
@user_loop(iterations_per_second_limited(REQUESTS_PER_SECOND))
@dependency(create_teacher_for_load_test)
def read_teacher_by_email_valid(context):
    response = requests.get(
        url=generate_url("/teacher/{}".format(LOAD_TEST_TEACHER_EMAIL), BASE_URL)
    )
    assert response.status_code == 200
    assert response.json() != None
    return "READ a Teacher using valid email API Test Passed!"


@scenario(engine)
@load_model(n_seconds(DURATION_OF_LOAD_TEST, NUMBER_OF_USERS))
@user_loop(iterations_per_second_limited(REQUESTS_PER_SECOND))
@dependency(create_teacher_for_load_test)
def read_teacher_by_email_invalid(context):
    response = requests.get(
        url=generate_url("/teacher/{}1".format(LOAD_TEST_TEACHER_EMAIL), BASE_URL)
    )
    assert response.status_code == 200
    assert response.json() == None
    return "READ a Teacher using invalid email API Test Passed!"


"""
CATEGORY/* API LOAD TEST SUITES
"""
@scenario(engine)
@load_model(n_iterations(1, 1, 1, TIMEOUT_PERIOD))
def create_category_for_load_test(context):
    response = requests.post(
        url=generate_url('/category/', BASE_URL),
        json={
          "category_name": LOAD_TEST_CATEGORY,
        }
    )
    return "CREATE a Category API Test Passed!"


@scenario(engine)
@load_model(n_seconds(DURATION_OF_LOAD_TEST, NUMBER_OF_USERS))
@user_loop(iterations_per_second_limited(REQUESTS_PER_SECOND))
def read_all_category(context):
    response = requests.get(
        url=generate_url("/category/", BASE_URL)
    )
    assert response.status_code == 200
    assert response.json() != None  
    return "READ ALL Category API Test Passed!"


@scenario(engine)
@load_model(n_seconds(DURATION_OF_LOAD_TEST, NUMBER_OF_USERS))
@user_loop(iterations_per_second_limited(REQUESTS_PER_SECOND))
@dependency(create_category_for_load_test)
def read_category_by_email_valid(context):
    response = requests.get(
        url=generate_url("/category/{}".format(LOAD_TEST_CATEGORY), BASE_URL)
    )
    assert response.status_code == 200
    assert response.json() != None
    return "READ a Category using valid category API Test Passed!"


@scenario(engine)
@load_model(n_seconds(DURATION_OF_LOAD_TEST, NUMBER_OF_USERS))
@user_loop(iterations_per_second_limited(REQUESTS_PER_SECOND))
@dependency(create_category_for_load_test)
def read_category_by_email_invalid(context):
    response = requests.get(
        url=generate_url("/category/{}1".format(LOAD_TEST_CATEGORY), BASE_URL)
    )
    assert response.status_code == 200
    assert response.json() == None
    return "READ a Category using invalid category API Test Passed!"



if __name__ == "__main__":
    engine.start()

