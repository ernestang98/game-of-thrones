"""
Helper Functions:
"""


"""
Import relevant libraries
"""
import string
import random


"""
Generate random 6 alphanumeric identification number to be used to distinguish different iterations of load test
"""
def id_generator(size=6, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


"""
Generate full URL based on based URL and path
"""
def generate_url(path, base_url):
    return base_url + path