SELECT departments.department_name AS department, roles.title
FROM roles
LEFT JOIN departments
ON roles.department_id = department.id
ORDER BY roles.title;
