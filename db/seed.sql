INSERT INTO departments (department_name)
VALUES ("IT"),
    ("Accounting"),
    ("Programming"),
    ("Graphics"),
    ("Sound Design");

INSERT INTO roles (title, salary, department_id)
VALUES ("IT Specialist", 80000, 1),
    ("Accountant", 80000, 2),
    ("Physics Programmer", 90000, 3),
    ("Graphic Designer", 50000, 4),
    ("Sound Designer", 65000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Annie", "Smith", 2, null),
    ("John", "Doe", 5, null),
    ("Jack", "Anderson", 3, null),
    ("Emily", "Jackson", 1, null),
    ("Marting", "Gray", 4, null);