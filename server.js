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

db.connect(function (err) {
  if (err) throw err;
  manageTeam();
});

function manageTeam() {
  return inquirer
    .prompt({
      type: "list",
      name: "choices",
      message: "What would you like to do?",
      choices: [
        "View Departments",
        "Add Department",
        "View Roles",
        "Add Role",
        "View Employees",
        "Add Employee",
        "Finished",
      ],
    })
    .then(async (response) => {
      switch (response.choices) {
        case "View Departments":
          await viewDepartments();
          manageTeam();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "View Roles":
          viewRoles();
          break;

        case "Add Role":
          addRole();
          break;

        case "View Employees":
          viewEmployees();
          break;

        case "Add Employee":
          addEmployee();
          break;
        default:
          finished();
      }
    });
}

function viewDepartments() {
  new Promise((resolve, reject) => {
    db.query(`SELECT id, department_name FROM departments`, (err, rows) => {
      if (err) {
        throw err;
      }
      console.log(rows);
    });
    resolve();
  });
}

function viewRoles() {
  new Promise((resolve, reject) => {
    db.query(
      `SELECT id, title, salary, department_id FROM roles`,
      (err, rows) => {
        if (err) {
          throw err;
        }
        console.log(rows);
      }
    );
    resolve();
  });
}

function viewEmployees() {
  new Promise((resolve, reject) => {
    db.query(
      `SELECT id, first_name, last_name, role_id, manager_id FROM employees`,
      (err, rows) => {
        if (err) {
          throw err;
        }
        console.log(rows);
      }
    );
    resolve();
  });
}

function addDepartment() {
  new Promise((resolve, reject) => {
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
    resolve();
  });
}

function addRole() {
  new Promise((resolve, reject) => {
    db.query(
      `SELECT id, title, salary, department_id FROM roles`,
      (err, rows) => {
        if (err) {
          throw err;
        }
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
              name: "title",
              message: "What is the name of the role?",
            },
            {
              type: "input",
              name: "salary",
              message: "What is the salary for this role?",
            },
            {
              type: "list",
              name: "department_id",
              message: "Which department does this role belong to?",
              choices: departmentChoices,
            },
          ])
          .then((answers) => {
            db.query(
              "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
              [answers.title, answers.salary, answers.department_id],
              (err, rows) => {
                if (err) {
                  throw err;
                }
              }
            );
          });
      }
    );
    resolve();
  });
}

function addEmployee() {
  new Promise((resolve, reject) => {
    db.query(
      `SELECT id, first_name, last_name, role_id, manager_id FROM employees`,
      (err, rows) => {
        if (err) {
          throw err;
        }
        let roleChoices = rows.map((role) => {
          return {
            name: role.role_name,
            value: role.id,
          };
        });
        inquirer
          .prompt([
            {
              type: "input",
              name: "first_name",
              message: "What is the first name of this employee?",
            },
            {
              type: "input",
              name: "last_name",
              message: "What is the last name of this employee?",
            },
            {
              type: "list",
              name: "role_id",
              message: "Which role does this employee have to?",
              choices: roleChoices,
            },
            {
              type: "input",
              name: "manager_id",
              message: "What's their manager Id?",
            },
          ])
          .then((answers) => {
            db.query(
              "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?)",
              [
                answers.firstName,
                answers.last_name,
                answers.role_id,
                answers.manager_id,
              ],
              (err, rows) => {
                if (err) {
                  throw err;
                }
              }
            );
          });
      }
    );
    resolve();
  });
}

const finished = () => {
  console.log("Finished");
  process.exit();
};
