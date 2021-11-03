INSERT INTO department (name)
VALUES ("Deck"),
       ("Engineering"),
       ("Science"),
       ("Other");

INSERT INTO role (title, salary, department_id)
VALUES ("Captain", 2106819, 1),
       ("Executive Officer", 1851388, 1),
       ("Warrant Officer", 1734382, 1),
       ("Science Officer", null, 3),
       ("Navigation Officer", 1647663, 1),
       ("Chief Engineer", 1105668, 2),
       ("Engineering Technicican", 791311, 2),
       ("Cat", 0, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Arthur", "Dallas", 1, null),
       ("Thomas", "Kane", 2, 1),
       ("Ellen", "Ripley", 3, 1),
       ("Ash", null, 4, 1),
       ("Joan", "Lambert", 5, 1),
       ("Dennis", "Parker", 6, 1),
       ("Samuel", "Brett", 7, 6),
       ("Mr.", "Jones", 8, 3);
