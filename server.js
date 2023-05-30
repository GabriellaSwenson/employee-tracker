const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "happychaos",
    database: "company_db",
  },
  console.log(`Connected to the company_db database.`)
);

function viewDepartments() {
  db.query(`SELECT id, department_name FROM departments`, (err, rows) => {
    if (err) {
      throw err;
    }
    console.log(rows);
  });
}

function viewRoles() {
  db.query(
    `SELECT id, title, salary, department_id FROM roles`,
    (err, rows) => {
      if (err) {
        throw err;
      }
      console.log(rows);
    }
  );
}

function viewEmployees() {
  db.query(
    `SELECT id, first_name, last_name, role_id, manager_id FROM employees`,
    (err, rows) => {
      if (err) {
        throw err;
      }
      console.log(rows);
    }
  );
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDepartment",
        message: "What is the name of the department?",
      },
    ])
    .then((answers) => {
      db.query(
        "INSERT INTO departments (department_name) VALUES (?)",
        [answers.addDepartment],
        (err, rows) => {
          if (err) {
            throw err;
          }
          console.log(rows);
        }
      );
    });
}

function addRole() {
  let departmentChoices = rows.map((department) => {
    return {
      name: department.department_name,
      value: department.id,
    };
  });
  inquirer
    .prompt([
      {
        type: "input",
        name: "addRole",
        message: "What is the name of the role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for this role?",
      },
      {
        type: "list",
        name: "department",
        message: "Which department does this role belong to?",
        choices: [departmentChoices],
      },
    ])
    .then((answers) => {
      db.query(
        "INSERT INTO roles (title) VALUES (?)",
        [answers.addRole],
        (err, rows) => {
          if (err) {
            throw err;
          }
          console.log(rows);
        }
      );
      db.query(
        "INSERT INTO roles (salary) VALUES (?)",
        [answers.salary],
        (err, rows) => {
          if (err) {
            throw err;
          }
          console.log(rows);
        }
      );
      db.query(
        "INSERT INTO roles (department_id) VALUES (?)",
        [answers.department],
        (err, rows) => {
          if (err) {
            throw err;
          }
          console.log(rows);
        }
      );
    });
}

addRole();

// const sql = `INSERT INTO departments (department_name)
//     VALUES (?)`;
// const params = [body.department_name];

// db.query(sql, params, (err, result) => {
//   if (err) {
//     res.status(400).json({ error: err.message });
//     return;
//   }
//   res.json({
//     message: "success",
//     data: body,
//   });
// });

// const sql = `DELETE FROM departments WHERE id = ?`;
// const params = [req.params.id];

// db.query(sql, params, (err, result) => {
//   if (err) {
//     res.statusMessage(400).json({ error: res.message });
//   } else if (!result.affectedRows) {
//     res.json({
//       message: "Department not found",
//     });
//   } else {
//     res.json({
//       message: "deleted",
//       changes: result.affectedRows,
//       id: req.params.id,
//     });
//   }
// });

// const sql = `SELECT departments.department_name AS departments, role.role FROM role LEFT JOIN departments ON role.department_id = departments.id ORDER BY departments.department_name;`;
// db.query(sql, (err, rows) => {
//   if (err) {
//     res.status(500).json({ error: err.message });
//     return;
//   }
//   res.json({
//     message: "success",
//     data: rows,
//   });
// });
