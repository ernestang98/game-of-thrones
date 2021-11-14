DELETE FROM Student;
INSERT INTO Student
VALUES (
        "B190020@e.ntu.edu.sg",
        "Leong Hao Zhi",
        0,
        2,
        1,
        1
    );
INSERT INTO Student
VALUES (
        "looy0018@e.ntu.edu.sg",
        "Loo Yi Ying Phoebe",
        0,
        2,
        1,
        2
    );
INSERT INTO Student
VALUES (
        "ERNE0009@e.ntu.edu.sg",
        "Ernest Ang Cheng Han",
        0,
        2,
        1,
        3
    );
INSERT INTO Student
VALUES (
        "student4@gmail.com",
        "student 4",
        0,
        2,
        1,
        4
    );
INSERT INTO Student
VALUES (
        "student5@gmail.com",
        "student 5",
        0,
        2,
        1,
        5
    );
INSERT INTO Student
VALUES (
        "student6@gmail.com",
        "student 6",
        0,
        2,
        1,
        6
    );
INSERT INTO Student
VALUES (
        "student11@gmail.com",
        "student 11",
        0,
        2,
        1,
        4
    );
INSERT INTO Student
VALUES (
        "student10@gmail.com",
        "student 10",
        0,
        2,
        1,
        5
    );
INSERT INTO Student
VALUES (
        "student12@gmail.com",
        "student 12",
        0,
        2,
        1,
        6
    );
INSERT INTO Student
VALUES (
        "student7@gmail.com",
        "student 7",
        0,
        2,
        1,
        7
    );
INSERT INTO Student
VALUES (
        "student8@gmail.com",
        "student 8",
        0,
        2,
        1,
        8
    );
INSERT INTO Student
VALUES (
        "student9@gmail.com",
        "student 9",
        0,
        2,
        1,
        8
    );
DELETE FROM Teacher;
INSERT INTO Teacher
VALUES ("wtan132@e.ntu.edu.sg", "Tan Wei Lun");
DELETE FROM Assignment;
INSERT INTO Assignment
VALUES (
        "CZ3001 Assignment 1",
        "wtan132@e.ntu.edu.sg",
        "ERNE0009@e.ntu.edu.sg",
        "Covering materials from lectures 1 - 3",
        NULL,
        NULL
    );
INSERT INTO Assignment
VALUES (
        "CZ3002 Assignment 1",
        "wtan132@e.ntu.edu.sg",
        "looy0018@e.ntu.edu.sg",
        "Covering materials from lectures 1 - 3",
        NULL,
        NULL
    );
INSERT INTO Assignment
VALUES (
        "CZ3003 Assignment 1",
        "wtan132@e.ntu.edu.sg",
        "B190020@e.ntu.edu.sg",
        "Covering materials from lectures 1 - 3",
        NULL,
        NULL
    );
DELETE FROM assignmentQuestion;
INSERT INTO assignmentQuestion
VALUES (
        "dsada-12-31-dasd-1-231",
        "CZ3001 Assignment 1",
        1,
        10,
        "Which of the following is not a type of cache miss?",
        2,
        "Conflict Miss",
        "Starvation Miss",
        "Capacity Miss",
        "Compulsory Miss"
    );
INSERT INTO assignmentQuestion
VALUES (
        "ikediqas321kodas-12-31-dasd-1-231",
        "CZ3001 Assignment 1",
        2,
        20,
        "Which of the following is not a typical internal component of a microprocessor?",
        4,
        "ALU",
        "L2 Cache",
        "Control Unit",
        "SSD"
    );
INSERT INTO assignmentQuestion
VALUES (
        "idsi4i9csioksa-12-31-dasd-1-231",
        "CZ3001 Assignment 1",
        3,
        30,
        "Which of the following is false?",
        1,
        "A TLB hit will incur a lookup in the page table",
        "A page table miss will incur a lookup in the disk",
        "A virtual address cannot be used to directly access a page on memory",
        "A page table entry must have a dirty flag"
    );
DELETE FROM Mail;
INSERT INTO Mail
VALUES (
        "dassqd21-3-213-1",
        "wtan132@e.ntu.edu.sg",
        "ERNE0009@e.ntu.edu.sg",
        "CZ3001 Assignment 1 is due soon",
        "CZ3001 Assignment 1 is due soon",
        "Hi Ernest, CZ3001 Assignment 1 is due soon. QPlease remember to complete it."
    );
INSERT INTO Mail
VALUES (
        "ytmihokrogkf-3-213-1",
        "wtan132@e.ntu.edu.sg",
        "looy0018@e.ntu.edu.sg",
        "CZ3002 Assignment 1 is due soon",
        "CZ3002 Assignment 1 is due soon",
        "Hi Phoebe, CZ3002 Assignment 1 is due soon. Please remember to complete it."
    );
INSERT INTO Mail
VALUES (
        "ujfasdujsqu-3-213-1",
        "wtan132@e.ntu.edu.sg",
        "B190020@e.ntu.edu.sg",
        "CZ3003 Assignment 1 is due soon",
        "CZ3003 Assignment 1 is due soon",
        "Hi Hao Zhi, CZ3003 Assignment 1 is due soon. Please remember to complete it."
    );
DELETE FROM Category;
INSERT INTO Category
VALUES (
        "CZ3001 Advanced Computer Organization and Architecture"
    );
INSERT INTO Category
VALUES ("CZ3002 Advanced Software Engineering");
INSERT INTO Category
VALUES ("CZ3003 Software Systems Analysis and Design");
INSERT INTO Category
VALUES ("CZ2006 Software Engineering");
DELETE FROM Quest;
INSERT INTO Quest
VALUES (
        "CZ3001 Quest 1",
        "CZ3001 Advanced Computer Organization and Architecture"
    );
INSERT INTO Quest
VALUES (
        "CZ3002 Quest 1",
        "CZ3002 Advanced Software Engineering"
    );
INSERT INTO Quest
VALUES (
        "CZ3003 Quest 1",
        "CZ3003 Software Systems Analysis and Design"
    );
INSERT INTO Quest
VALUES (
        "CZ2006 Quest 1",
        "CZ2006 Software Engineering"
    );
INSERT INTO Quest
VALUES (
        "CZ2006 Quest 2",
        "CZ2006 Software Engineering"
    );
INSERT INTO Quest
VALUES (
        "CZ2006 Quest 3",
        "CZ2006 Software Engineering"
    );
INSERT INTO Quest
VALUES (
        "CZ2006 Quest 4",
        "CZ2006 Software Engineering"
    );
INSERT INTO Quest
VALUES (
        "CZ2006 Quest 5",
        "CZ2006 Software Engineering"
    );
DELETE FROM Subquest;
INSERT INTO Subquest
VALUES ("CZ3001 Subquest 1", "CZ3001 Quest 1");
INSERT INTO Subquest
VALUES ("CZ3002 Subquest 1", "CZ3002 Quest 1");
INSERT INTO Subquest
VALUES ("CZ3002 Subquest 2", "CZ3002 Quest 1");
INSERT INTO Subquest
VALUES ("CZ3002 Subquest 3", "CZ3002 Quest 1");
INSERT INTO Subquest
VALUES ("CZ3002 Subquest 4", "CZ3002 Quest 1");
INSERT INTO Subquest
VALUES ("CZ3002 Subquest 5", "CZ3002 Quest 1");
INSERT INTO Subquest
VALUES ("CZ3003 Subquest 1", "CZ3003 Quest 1");
INSERT INTO Subquest
VALUES ("CZ2006 Subquest 1", "CZ2006 Quest 1");
INSERT INTO Subquest
VALUES ("CZ2006 Subquest 2", "CZ2006 Quest 1");
INSERT INTO Subquest
VALUES ("CZ2006 Subquest 3", "CZ2006 Quest 1");
INSERT INTO Subquest
VALUES ("CZ2006 Subquest 4", "CZ2006 Quest 1");
INSERT INTO Subquest
VALUES ("CZ2006 Subquest 5", "CZ2006 Quest 1");
INSERT INTO Subquest
VALUES ("CZ2006 Subquest 6", "CZ2006 Quest 2");
INSERT INTO Subquest
VALUES ("CZ2006 Subquest 7", "CZ2006 Quest 2");
INSERT INTO Subquest
VALUES ("CZ2006 Subquest 8", "CZ2006 Quest 2");
INSERT INTO Subquest
VALUES ("CZ2006 Subquest 9", "CZ2006 Quest 2");
INSERT INTO Subquest
VALUES ("CZ2006 Subquest 10", "CZ2006 Quest 2");
INSERT INTO Subquest
VALUES ("CZ2006 Subquest 11", "CZ2006 Quest 3");
INSERT INTO Subquest
VALUES ("CZ2006 Subquest 12", "CZ2006 Quest 3");
INSERT INTO Subquest
VALUES ("CZ2006 Subquest 13", "CZ2006 Quest 3");
INSERT INTO Subquest
VALUES ("CZ2006 Subquest 14", "CZ2006 Quest 3");
INSERT INTO Subquest
VALUES ("CZ2006 Subquest 15", "CZ2006 Quest 3");
INSERT INTO Subquest
VALUES ("CZ2006 Subquest 16", "CZ2006 Quest 4");
INSERT INTO Subquest
VALUES ("CZ2006 Subquest 17", "CZ2006 Quest 4");
INSERT INTO Subquest
VALUES ("CZ2006 Subquest 18", "CZ2006 Quest 4");
INSERT INTO Subquest
VALUES ("CZ2006 Subquest 19", "CZ2006 Quest 4");
INSERT INTO Subquest
VALUES ("CZ2006 Subquest 20", "CZ2006 Quest 4");
INSERT INTO Subquest
VALUES ("CZ2006 Subquest 21", "CZ2006 Quest 5");
INSERT INTO Subquest
VALUES ("CZ2006 Subquest 22", "CZ2006 Quest 5");
INSERT INTO Subquest
VALUES ("CZ2006 Subquest 23", "CZ2006 Quest 5");
INSERT INTO Subquest
VALUES ("CZ2006 Subquest 24", "CZ2006 Quest 5");
INSERT INTO Subquest
VALUES ("CZ2006 Subquest 25", "CZ2006 Quest 5");
DELETE FROM Challenge;
INSERT INTO Challenge
VALUES (
        "sdaqwij-21-321jidjq123",
        "ERNE0009@e.ntu.edu.sg",
        "looy0018@e.ntu.edu.sg",
        1,
        "CZ3001 Quest 1",
        "CZ3001 Advanced Computer Organization and Architecture",
        5,
        0,
        0,
        0
    );
INSERT INTO Challenge
VALUES (
        "wdq2e123-21-321jidjq123",
        "ERNE0009@e.ntu.edu.sg",
        "B190020@e.ntu.edu.sg",
        2,
        "CZ3001 Quest 1",
        "CZ3001 Advanced Computer Organization and Architecture",
        10,
        0,
        0,
        0
    );
INSERT INTO Challenge
VALUES (
        "dsqwe325-21-321jidjq123",
        "ERNE0009@e.ntu.edu.sg",
        "student4@gmail.com",
        3,
        "CZ3001 Quest 1",
        "CZ3001 Advanced Computer Organization and Architecture",
        15,
        0,
        0,
        0
    );
DELETE FROM Npc;
INSERT INTO Npc
VALUES ("Daenerys Targaryen", "CZ3001 Subquest 1");
INSERT INTO Npc
VALUES ("Arya Stark", "CZ3002 Subquest 1");
INSERT INTO Npc
VALUES ("Tyrion Lannister", "CZ3003 Subquest 1");
DELETE FROM Question;
INSERT INTO Question
VALUES (
        "0",
        "CZ3001 Subquest 1",
        1,
        5,
        "Which of the following is not a type of cache miss?",
        2,
        "Conflict Miss",
        "Starvation Miss",
        "Capacity Miss",
        "Compulsory Miss"
    );
INSERT INTO Question
VALUES (
        "1",
        "CZ3002 Subquest 1",
        1,
        5,
        "Which of the following is not a testing strategy?",
        1,
        "Unit Testing",
        "Integration Testing",
        "Mechanical Testing",
        "Regression Testing"
    );
INSERT INTO Question
VALUES (
        "2",
        "CZ3003 Subquest 1",
        1,
        5,
        "Which of the following is not an architectural style?",
        4,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );













INSERT INTO Question
VALUES (
        "3",
        "CZ2006 Subquest 1",
        3,
        5,
        "CZ2006 Subquest 1, Hard Question. Answer is 1",
        1,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "4",
        "CZ2006 Subquest 1",
        3,
        5,
        "CZ2006 Subquest 1, Hard Question.Answer is 2",
        2,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "5",
        "CZ2006 Subquest 1",
        3,
        5,
        "CZ2006 Subquest 1, Hard Question. Answer is 3",
        3,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "6",
        "CZ2006 Subquest 1",
        3,
        5,
        "CZ2006 Subquest 1, Hard Question. Answer is 4",
        4,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "7",
        "CZ2006 Subquest 1",
        2,
        5,
        "CZ2006 Subquest 1, Easy Question. Answer is 1",
        1,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "8",
        "CZ2006 Subquest 1",
        2,
        5,
        "CZ2006 Subquest 1, Easy Question. Answer is 2",
        2,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "9",
        "CZ2006 Subquest 1",
        2,
        5,
        "CZ2006 Subquest 1, Easy Question. Answer is 3",
        3,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "10",
        "CZ2006 Subquest 1",
        2,
        5,
        "CZ2006 Subquest 1, Easy Question. Answer is 4",
        4,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "11",
        "CZ2006 Subquest 1",
        3,
        5,
        "CZ2006 Subquest 1, Medium Question. Answer is 1",
        1,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "12",
        "CZ2006 Subquest 1",
        3,
        5,
        "CZ2006 Subquest 1, Medium Question. Answer is 2",
        2,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "13",
        "CZ2006 Subquest 1",
        3,
        5,
        "CZ2006 Subquest 1, Medium Question. Answer is 3",
        3,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "14",
        "CZ2006 Subquest 1",
        3,
        5,
        "CZ2006 Subquest 1, Medium Question. Answer is 4",
        4,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "15",
        "CZ2006 Subquest 1",
        3,
        5,
        "CZ2006 Subquest 1, Hard Question. Answer is 4",
        4,
        "Lorem Ipsum",
        "expedita distinctio",
        "maiores alias consequatur",
        "tenetur a sapiente"
    );
INSERT INTO Question
VALUES (
        "16",
        "CZ2006 Subquest 1",
        2,
        5,
        "CZ2006 Subquest 1, Easy Question. Answer is 4",
        4,
        "Lorem Ipsum",
        "expedita distinctio",
        "maiores alias consequatur",
        "tenetur a sapiente"
    );
INSERT INTO Question
VALUES (
        "17",
        "CZ2006 Subquest 1",
        3,
        5,
        "CZ2006 Subquest 1, Medium Question. Answer is 4",
        4,
        "Lorem Ipsum",
        "expedita distinctio",
        "maiores alias consequatur",
        "tenetur a sapiente"
    );
INSERT INTO Question
VALUES (
        "1113",
        "CZ2006 Subquest 2",
        3,
        5,
        "CZ2006 Subquest 2, Hard Question. Answer is 1",
        1,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "1114",
        "CZ2006 Subquest 2",
        3,
        5,
        "CZ2006 Subquest 2, Hard Question.Answer is 2",
        2,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "1115",
        "CZ2006 Subquest 2",
        3,
        5,
        "CZ2006 Subquest 2, Hard Question. Answer is 3",
        3,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "1116",
        "CZ2006 Subquest 2",
        3,
        5,
        "CZ2006 Subquest 2, Hard Question. Answer is 4",
        4,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "1117",
        "CZ2006 Subquest 2",
        2,
        5,
        "CZ2006 Subquest 2, Easy Question. Answer is 1",
        1,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "1118",
        "CZ2006 Subquest 2",
        2,
        5,
        "CZ2006 Subquest 2, Easy Question. Answer is 2",
        2,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "1119",
        "CZ2006 Subquest 2",
        2,
        5,
        "CZ2006 Subquest 2, Easy Question. Answer is 3",
        3,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "110",
        "CZ2006 Subquest 2",
        2,
        5,
        "CZ2006 Subquest 2, Easy Question. Answer is 4",
        4,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "111",
        "CZ2006 Subquest 2",
        3,
        5,
        "CZ2006 Subquest 2, Medium Question. Answer is 1",
        1,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "112",
        "CZ2006 Subquest 2",
        3,
        5,
        "CZ2006 Subquest 2, Medium Question. Answer is 2",
        2,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "113",
        "CZ2006 Subquest 2",
        3,
        5,
        "CZ2006 Subquest 2, Medium Question. Answer is 3",
        3,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "114",
        "CZ2006 Subquest 2",
        3,
        5,
        "CZ2006 Subquest 2, Medium Question. Answer is 4",
        4,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "115",
        "CZ2006 Subquest 2",
        3,
        5,
        "CZ2006 Subquest 2, Hard Question. Answer is 4",
        4,
        "Lorem Ipsum",
        "expedita distinctio",
        "maiores alias consequatur",
        "tenetur a sapiente"
    );
INSERT INTO Question
VALUES (
        "116",
        "CZ2006 Subquest 2",
        2,
        5,
        "CZ2006 Subquest 2, Easy Question. Answer is 4",
        4,
        "Lorem Ipsum",
        "expedita distinctio",
        "maiores alias consequatur",
        "tenetur a sapiente"
    );
INSERT INTO Question
VALUES (
        "117",
        "CZ2006 Subquest 2",
        3,
        5,
        "CZ2006 Subquest 2, Medium Question. Answer is 4",
        4,
        "Lorem Ipsum",
        "expedita distinctio",
        "maiores alias consequatur",
        "tenetur a sapiente"
    );
INSERT INTO Question
VALUES (
        "2223",
        "CZ2006 Subquest 3",
        3,
        5,
        "CZ2006 Subquest 3, Hard Question. Answer is 1",
        1,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "2224",
        "CZ2006 Subquest 3",
        3,
        5,
        "CZ2006 Subquest 3, Hard Question.Answer is 2",
        2,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "2225",
        "CZ2006 Subquest 3",
        3,
        5,
        "CZ2006 Subquest 3, Hard Question. Answer is 3",
        3,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "2226",
        "CZ2006 Subquest 3",
        3,
        5,
        "CZ2006 Subquest 3, Hard Question. Answer is 4",
        4,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "2227",
        "CZ2006 Subquest 3",
        2,
        5,
        "CZ2006 Subquest 3, Easy Question. Answer is 1",
        1,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "2228",
        "CZ2006 Subquest 3",
        2,
        5,
        "CZ2006 Subquest 3, Easy Question. Answer is 2",
        2,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "2229",
        "CZ2006 Subquest 3",
        2,
        5,
        "CZ2006 Subquest 3, Easy Question. Answer is 3",
        3,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "220",
        "CZ2006 Subquest 3",
        2,
        5,
        "CZ2006 Subquest 3, Easy Question. Answer is 4",
        4,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "221",
        "CZ2006 Subquest 3",
        3,
        5,
        "CZ2006 Subquest 3, Medium Question. Answer is 1",
        1,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "222",
        "CZ2006 Subquest 3",
        3,
        5,
        "CZ2006 Subquest 3, Medium Question. Answer is 2",
        2,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "223",
        "CZ2006 Subquest 3",
        3,
        5,
        "CZ2006 Subquest 3, Medium Question. Answer is 3",
        3,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "224",
        "CZ2006 Subquest 3",
        3,
        5,
        "CZ2006 Subquest 3, Medium Question. Answer is 4",
        4,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "225",
        "CZ2006 Subquest 3",
        3,
        5,
        "CZ2006 Subquest 3, Hard Question. Answer is 4",
        4,
        "Lorem Ipsum",
        "expedita distinctio",
        "maiores alias consequatur",
        "tenetur a sapiente"
    );
INSERT INTO Question
VALUES (
        "226",
        "CZ2006 Subquest 3",
        2,
        5,
        "CZ2006 Subquest 3, Easy Question. Answer is 4",
        4,
        "Lorem Ipsum",
        "expedita distinctio",
        "maiores alias consequatur",
        "tenetur a sapiente"
    );
INSERT INTO Question
VALUES (
        "227",
        "CZ2006 Subquest 3",
        3,
        5,
        "CZ2006 Subquest 3, Medium Question. Answer is 4",
        4,
        "Lorem Ipsum",
        "expedita distinctio",
        "maiores alias consequatur",
        "tenetur a sapiente"
    );
INSERT INTO Question
VALUES (
        "4443",
        "CZ2006 Subquest 4",
        3,
        5,
        "CZ2006 Subquest 4, Hard Question. Answer is 1",
        1,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "4444",
        "CZ2006 Subquest 4",
        3,
        5,
        "CZ2006 Subquest 4, Hard Question.Answer is 2",
        2,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "4445",
        "CZ2006 Subquest 4",
        3,
        5,
        "CZ2006 Subquest 4, Hard Question. Answer is 3",
        3,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "4446",
        "CZ2006 Subquest 4",
        3,
        5,
        "CZ2006 Subquest 4, Hard Question. Answer is 4",
        4,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "4447",
        "CZ2006 Subquest 4",
        2,
        5,
        "CZ2006 Subquest 4, Easy Question. Answer is 1",
        1,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "4448",
        "CZ2006 Subquest 4",
        2,
        5,
        "CZ2006 Subquest 4, Easy Question. Answer is 2",
        2,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "4449",
        "CZ2006 Subquest 4",
        2,
        5,
        "CZ2006 Subquest 4, Easy Question. Answer is 3",
        3,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "440",
        "CZ2006 Subquest 4",
        2,
        5,
        "CZ2006 Subquest 4, Easy Question. Answer is 4",
        4,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "441",
        "CZ2006 Subquest 4",
        3,
        5,
        "CZ2006 Subquest 4, Medium Question. Answer is 1",
        1,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "442",
        "CZ2006 Subquest 4",
        3,
        5,
        "CZ2006 Subquest 4, Medium Question. Answer is 2",
        2,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "443",
        "CZ2006 Subquest 4",
        3,
        5,
        "CZ2006 Subquest 4, Medium Question. Answer is 3",
        3,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "444",
        "CZ2006 Subquest 4",
        3,
        5,
        "CZ2006 Subquest 4, Medium Question. Answer is 4",
        4,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "445",
        "CZ2006 Subquest 4",
        3,
        5,
        "CZ2006 Subquest 4, Hard Question. Answer is 4",
        4,
        "Lorem Ipsum",
        "expedita distinctio",
        "maiores alias consequatur",
        "tenetur a sapiente"
    );
INSERT INTO Question
VALUES (
        "446",
        "CZ2006 Subquest 4",
        2,
        5,
        "CZ2006 Subquest 4, Easy Question. Answer is 4",
        4,
        "Lorem Ipsum",
        "expedita distinctio",
        "maiores alias consequatur",
        "tenetur a sapiente"
    );
INSERT INTO Question
VALUES (
        "447",
        "CZ2006 Subquest 4",
        3,
        5,
        "CZ2006 Subquest 4, Medium Question. Answer is 4",
        4,
        "Lorem Ipsum",
        "expedita distinctio",
        "maiores alias consequatur",
        "tenetur a sapiente"
    );
INSERT INTO Question
VALUES (
        "3333",
        "CZ2006 Subquest 5",
        3,
        5,
        "CZ2006 Subquest 5, Hard Question. Answer is 1",
        1,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "3334",
        "CZ2006 Subquest 5",
        3,
        5,
        "CZ2006 Subquest 5, Hard Question.Answer is 2",
        2,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "3335",
        "CZ2006 Subquest 5",
        3,
        5,
        "CZ2006 Subquest 5, Hard Question. Answer is 3",
        3,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "3336",
        "CZ2006 Subquest 5",
        3,
        5,
        "CZ2006 Subquest 5, Hard Question. Answer is 4",
        4,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "3337",
        "CZ2006 Subquest 5",
        2,
        5,
        "CZ2006 Subquest 5, Easy Question. Answer is 1",
        1,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "3338",
        "CZ2006 Subquest 5",
        2,
        5,
        "CZ2006 Subquest 5, Easy Question. Answer is 2",
        2,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "3339",
        "CZ2006 Subquest 5",
        2,
        5,
        "CZ2006 Subquest 5, Easy Question. Answer is 3",
        3,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "330",
        "CZ2006 Subquest 5",
        2,
        5,
        "CZ2006 Subquest 5, Easy Question. Answer is 4",
        4,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "331",
        "CZ2006 Subquest 5",
        3,
        5,
        "CZ2006 Subquest 5, Medium Question. Answer is 1",
        1,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "332",
        "CZ2006 Subquest 5",
        3,
        5,
        "CZ2006 Subquest 5, Medium Question. Answer is 2",
        2,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "333",
        "CZ2006 Subquest 5",
        3,
        5,
        "CZ2006 Subquest 5, Medium Question. Answer is 3",
        3,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "334",
        "CZ2006 Subquest 5",
        3,
        5,
        "CZ2006 Subquest 5, Medium Question. Answer is 4",
        4,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "335",
        "CZ2006 Subquest 5",
        3,
        5,
        "CZ2006 Subquest 5, Hard Question. Answer is 4",
        4,
        "Lorem Ipsum",
        "expedita distinctio",
        "maiores alias consequatur",
        "tenetur a sapiente"
    );
INSERT INTO Question
VALUES (
        "336",
        "CZ2006 Subquest 5",
        2,
        5,
        "CZ2006 Subquest 5, Easy Question. Answer is 4",
        4,
        "Lorem Ipsum",
        "expedita distinctio",
        "maiores alias consequatur",
        "tenetur a sapiente"
    );
INSERT INTO Question
VALUES (
        "337",
        "CZ2006 Subquest 5",
        3,
        5,
        "CZ2006 Subquest 5, Medium Question. Answer is 4",
        4,
        "Lorem Ipsum",
        "expedita distinctio",
        "maiores alias consequatur",
        "tenetur a sapiente"
    );


























































INSERT INTO Question
VALUES (
        "32323",
        "CZ2006 Subquest 6",
        3,
        5,
        "CZ2006 Subquest 6, Hard Question. Answer is 1",
        1,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "42323",
        "CZ2006 Subquest 6",
        3,
        5,
        "CZ2006 Subquest 6, Hard Question.Answer is 2",
        2,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "52323",
        "CZ2006 Subquest 6",
        3,
        5,
        "CZ2006 Subquest 6, Hard Question. Answer is 3",
        3,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "62323",
        "CZ2006 Subquest 6",
        3,
        5,
        "CZ2006 Subquest 6, Hard Question. Answer is 4",
        4,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "72323",
        "CZ2006 Subquest 6",
        1,
        5,
        "CZ2006 Subquest 6, Easy Question. Answer is 1",
        1,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "82323",
        "CZ2006 Subquest 6",
        1,
        5,
        "CZ2006 Subquest 6, Easy Question. Answer is 2",
        2,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "92323",
        "CZ2006 Subquest 6",
        1,
        5,
        "CZ2006 Subquest 6, Easy Question. Answer is 3",
        3,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "102323",
        "CZ2006 Subquest 6",
        1,
        5,
        "CZ2006 Subquest 6, Easy Question. Answer is 4",
        4,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "112323",
        "CZ2006 Subquest 6",
        2,
        5,
        "CZ2006 Subquest 6, Medium Question. Answer is 1",
        1,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "122323",
        "CZ2006 Subquest 6",
        2,
        5,
        "CZ2006 Subquest 6, Medium Question. Answer is 2",
        2,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "132323",
        "CZ2006 Subquest 6",
        2,
        5,
        "CZ2006 Subquest 6, Medium Question. Answer is 3",
        3,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "142323",
        "CZ2006 Subquest 6",
        2,
        5,
        "CZ2006 Subquest 6, Medium Question. Answer is 4",
        4,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "152323",
        "CZ2006 Subquest 6",
        3,
        5,
        "CZ2006 Subquest 6, Hard Question. Answer is 4",
        4,
        "Lorem Ipsum",
        "expedita distinctio",
        "maiores alias consequatur",
        "tenetur a sapiente"
    );
INSERT INTO Question
VALUES (
        "162323",
        "CZ2006 Subquest 6",
        1,
        5,
        "CZ2006 Subquest 6, Easy Question. Answer is 4",
        4,
        "Lorem Ipsum",
        "expedita distinctio",
        "maiores alias consequatur",
        "tenetur a sapiente"
    );
INSERT INTO Question
VALUES (
        "172323",
        "CZ2006 Subquest 6",
        2,
        5,
        "CZ2006 Subquest 6, Medium Question. Answer is 4",
        4,
        "Lorem Ipsum",
        "expedita distinctio",
        "maiores alias consequatur",
        "tenetur a sapiente"
    );
INSERT INTO Question
VALUES (
        "11132323",
        "CZ2006 Subquest 7",
        3,
        5,
        "CZ2006 Subquest 7, Hard Question. Answer is 1",
        1,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "11142323",
        "CZ2006 Subquest 7",
        3,
        5,
        "CZ2006 Subquest 7, Hard Question.Answer is 2",
        2,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "11152323",
        "CZ2006 Subquest 7",
        3,
        5,
        "CZ2006 Subquest 7, Hard Question. Answer is 3",
        3,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "11162323",
        "CZ2006 Subquest 7",
        3,
        5,
        "CZ2006 Subquest 7, Hard Question. Answer is 4",
        4,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "11172323",
        "CZ2006 Subquest 7",
        1,
        5,
        "CZ2006 Subquest 7, Easy Question. Answer is 1",
        1,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "11182323",
        "CZ2006 Subquest 7",
        1,
        5,
        "CZ2006 Subquest 7, Easy Question. Answer is 2",
        2,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "11192323",
        "CZ2006 Subquest 7",
        1,
        5,
        "CZ2006 Subquest 7, Easy Question. Answer is 3",
        3,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "1102323",
        "CZ2006 Subquest 7",
        1,
        5,
        "CZ2006 Subquest 7, Easy Question. Answer is 4",
        4,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "1112323",
        "CZ2006 Subquest 7",
        2,
        5,
        "CZ2006 Subquest 7, Medium Question. Answer is 1",
        1,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "1122323",
        "CZ2006 Subquest 7",
        2,
        5,
        "CZ2006 Subquest 7, Medium Question. Answer is 2",
        2,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "1132323",
        "CZ2006 Subquest 7",
        2,
        5,
        "CZ2006 Subquest 7, Medium Question. Answer is 3",
        3,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "1142323",
        "CZ2006 Subquest 7",
        2,
        5,
        "CZ2006 Subquest 7, Medium Question. Answer is 4",
        4,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "1152323",
        "CZ2006 Subquest 7",
        3,
        5,
        "CZ2006 Subquest 7, Hard Question. Answer is 4",
        4,
        "Lorem Ipsum",
        "expedita distinctio",
        "maiores alias consequatur",
        "tenetur a sapiente"
    );
INSERT INTO Question
VALUES (
        "1162323",
        "CZ2006 Subquest 7",
        1,
        5,
        "CZ2006 Subquest 7, Easy Question. Answer is 4",
        4,
        "Lorem Ipsum",
        "expedita distinctio",
        "maiores alias consequatur",
        "tenetur a sapiente"
    );
INSERT INTO Question
VALUES (
        "1172323",
        "CZ2006 Subquest 7",
        2,
        5,
        "CZ2006 Subquest 7, Medium Question. Answer is 4",
        4,
        "Lorem Ipsum",
        "expedita distinctio",
        "maiores alias consequatur",
        "tenetur a sapiente"
    );
INSERT INTO Question
VALUES (
        "22232323",
        "CZ2006 Subquest 8",
        3,
        5,
        "CZ2006 Subquest 8, Hard Question. Answer is 1",
        1,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "22242323",
        "CZ2006 Subquest 8",
        3,
        5,
        "CZ2006 Subquest 8, Hard Question.Answer is 2",
        2,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "22252323",
        "CZ2006 Subquest 8",
        3,
        5,
        "CZ2006 Subquest 8, Hard Question. Answer is 3",
        3,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "22262323",
        "CZ2006 Subquest 8",
        3,
        5,
        "CZ2006 Subquest 8, Hard Question. Answer is 4",
        4,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "22272323",
        "CZ2006 Subquest 8",
        1,
        5,
        "CZ2006 Subquest 8, Easy Question. Answer is 1",
        1,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "22282323",
        "CZ2006 Subquest 8",
        1,
        5,
        "CZ2006 Subquest 8, Easy Question. Answer is 2",
        2,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "22292323",
        "CZ2006 Subquest 8",
        1,
        5,
        "CZ2006 Subquest 8, Easy Question. Answer is 3",
        3,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "2202323",
        "CZ2006 Subquest 8",
        1,
        5,
        "CZ2006 Subquest 8, Easy Question. Answer is 4",
        4,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "2212323",
        "CZ2006 Subquest 8",
        2,
        5,
        "CZ2006 Subquest 8, Medium Question. Answer is 1",
        1,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "2222323",
        "CZ2006 Subquest 8",
        2,
        5,
        "CZ2006 Subquest 8, Medium Question. Answer is 2",
        2,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "2232323",
        "CZ2006 Subquest 8",
        2,
        5,
        "CZ2006 Subquest 8, Medium Question. Answer is 3",
        3,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "2242323",
        "CZ2006 Subquest 8",
        2,
        5,
        "CZ2006 Subquest 8, Medium Question. Answer is 4",
        4,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "2252323",
        "CZ2006 Subquest 8",
        3,
        5,
        "CZ2006 Subquest 8, Hard Question. Answer is 4",
        4,
        "Lorem Ipsum",
        "expedita distinctio",
        "maiores alias consequatur",
        "tenetur a sapiente"
    );
INSERT INTO Question
VALUES (
        "2262323",
        "CZ2006 Subquest 8",
        1,
        5,
        "CZ2006 Subquest 8, Eay Question. Answer is 4",
        4,
        "Lorem Ipsum",
        "expedita distinctio",
        "maiores alias consequatur",
        "tenetur a sapiente"
    );
INSERT INTO Question
VALUES (
        "2272323",
        "CZ2006 Subquest 8",
        2,
        5,
        "CZ2006 Subquest 8, Medium Question. Answer is 4",
        4,
        "Lorem Ipsum",
        "expedita distinctio",
        "maiores alias consequatur",
        "tenetur a sapiente"
    );
INSERT INTO Question
VALUES (
        "44432323",
        "CZ2006 Subquest 9",
        3,
        5,
        "CZ2006 Subquest 9, Hard Question. Answer is 1",
        1,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "44442323",
        "CZ2006 Subquest 9",
        3,
        5,
        "CZ2006 Subquest 9, Hard Question.Answer is 2",
        2,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "44452323",
        "CZ2006 Subquest 9",
        3,
        5,
        "CZ2006 Subquest 9, Hard Question. Answer is 3",
        3,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "44462323",
        "CZ2006 Subquest 9",
        3,
        5,
        "CZ2006 Subquest 9, Hard Question. Answer is 4",
        4,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "44472323",
        "CZ2006 Subquest 9",
        1,
        5,
        "CZ2006 Subquest 9, Easy Question. Answer is 1",
        1,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "44482323",
        "CZ2006 Subquest 9",
        1,
        5,
        "CZ2006 Subquest 9, Easy Question. Answer is 2",
        2,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "44492323",
        "CZ2006 Subquest 9",
        1,
        5,
        "CZ2006 Subquest 9, Easy Question. Answer is 3",
        3,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "4402323",
        "CZ2006 Subquest 9",
        1,
        5,
        "CZ2006 Subquest 9, Easy Question. Answer is 4",
        4,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "4412323",
        "CZ2006 Subquest 9",
        2,
        5,
        "CZ2006 Subquest 9, Medium Question. Answer is 1",
        1,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "4422323",
        "CZ2006 Subquest 9",
        2,
        5,
        "CZ2006 Subquest 9, Medium Question. Answer is 2",
        2,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "4432323",
        "CZ2006 Subquest 9",
        2,
        5,
        "CZ2006 Subquest 9, Medium Question. Answer is 3",
        3,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "4442323",
        "CZ2006 Subquest 9",
        2,
        5,
        "CZ2006 Subquest 9, Medium Question. Answer is 4",
        4,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "4452323",
        "CZ2006 Subquest 9",
        3,
        5,
        "CZ2006 Subquest 9, Hard Question. Answer is 4",
        4,
        "Lorem Ipsum",
        "expedita distinctio",
        "maiores alias consequatur",
        "tenetur a sapiente"
    );
INSERT INTO Question
VALUES (
        "4462323",
        "CZ2006 Subquest 9",
        1,
        5,
        "CZ2006 Subquest 9, Easy Question. Answer is 4",
        4,
        "Lorem Ipsum",
        "expedita distinctio",
        "maiores alias consequatur",
        "tenetur a sapiente"
    );
INSERT INTO Question
VALUES (
        "4472323",
        "CZ2006 Subquest 9",
        2,
        5,
        "CZ2006 Subquest 9, Medium Question. Answer is 4",
        4,
        "Lorem Ipsum",
        "expedita distinctio",
        "maiores alias consequatur",
        "tenetur a sapiente"
    );
INSERT INTO Question
VALUES (
        "33332323",
        "CZ2006 Subquest 10",
        3,
        5,
        "CZ2006 Subquest 10, Hard Question. Answer is 1",
        1,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "33342323",
        "CZ2006 Subquest 10",
        3,
        5,
        "CZ2006 Subquest 10, Hard Question.Answer is 2",
        2,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "33352323",
        "CZ2006 Subquest 10",
        3,
        5,
        "CZ2006 Subquest 10, Hard Question. Answer is 3",
        3,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "33362323",
        "CZ2006 Subquest 10",
        3,
        5,
        "CZ2006 Subquest 10, Hard Question. Answer is 4",
        4,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "33372323",
        "CZ2006 Subquest 10",
        1,
        5,
        "CZ2006 Subquest 10, Easy Question. Answer is 1",
        1,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "33382323",
        "CZ2006 Subquest 10",
        1,
        5,
        "CZ2006 Subquest 10, Easy Question. Answer is 2",
        2,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "33392323",
        "CZ2006 Subquest 10",
        1,
        5,
        "CZ2006 Subquest 10, Easy Question. Answer is 3",
        3,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "3302323",
        "CZ2006 Subquest 10",
        1,
        5,
        "CZ2006 Subquest 10, Easy Question. Answer is 4",
        4,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "3312323",
        "CZ2006 Subquest 10",
        2,
        5,
        "CZ2006 Subquest 10, Medium Question. Answer is 1",
        1,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "3322323",
        "CZ2006 Subquest 10",
        2,
        5,
        "CZ2006 Subquest 10, Medium Question. Answer is 2",
        2,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "3332323",
        "CZ2006 Subquest 10",
        2,
        5,
        "CZ2006 Subquest 10, Medium Question. Answer is 3",
        3,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "3342323",
        "CZ2006 Subquest 10",
        2,
        5,
        "CZ2006 Subquest 10, Medium Question. Answer is 4",
        4,
        "Pipe-and-filter",
        "Layered",
        "Client-Server",
        "Message Stacks"
    );
INSERT INTO Question
VALUES (
        "3352323",
        "CZ2006 Subquest 10",
        3,
        5,
        "CZ2006 Subquest 10, Hard Question. Answer is 4",
        4,
        "Lorem Ipsum",
        "expedita distinctio",
        "maiores alias consequatur",
        "tenetur a sapiente"
    );
INSERT INTO Question
VALUES (
        "3362323",
        "CZ2006 Subquest 10",
        1,
        5,
        "CZ2006 Subquest 10, Easy Question. Answer is 4",
        4,
        "Lorem Ipsum",
        "expedita distinctio",
        "maiores alias consequatur",
        "tenetur a sapiente"
    );
INSERT INTO Question
VALUES (
        "3372323",
        "CZ2006 Subquest 10",
        2,
        5,
        "CZ2006 Subquest 10, Medium Question. Answer is 4",
        4,
        "Lorem Ipsum",
        "expedita distinctio",
        "maiores alias consequatur",
        "tenetur a sapiente"
    );





DELETE FROM Attempt;
INSERT INTO Attempt
VALUES (
        "CZ3001 Quest 1",
        "B190020@e.ntu.edu.sg",
        50,
        100,
        3600,
        "2021-10-18 16:53:31.498332"
    );
INSERT INTO Attempt
VALUES (
        "CZ3002 Quest 1",
        "B190020@e.ntu.edu.sg",
        85,
        120,
        1800,
        "2021-10-18 18:10:31.498332"
    );
INSERT INTO Attempt
VALUES (
        "CZ3003 Quest 1",
        "B190020@e.ntu.edu.sg",
        50,
        150,
        600,
        "2021-10-18 20:23:31.498332"
    );