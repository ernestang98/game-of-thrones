# models/ document how the structure that correspond to our ERD
from db.database import Base

from models.attempt import Attempt
from models.assignment import Assignment
from models.category import Category
from models.mail import Mail
from models.npc import Npc
from models.quest import Quest
from models.student import Student
from models.subquest import Subquest
from models.teacher import Teacher
from models.question import Question
from models.assignment_question import AssignmentQuestion
from models.challenge import Challenge

# TODO - from models.XXX import XXX (copy line above)
