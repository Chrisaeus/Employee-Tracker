const mysql = require("mysql2");
const inquirer = require("inquirer");

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "password",
        database: "nostromo_db"
    },
    console.log(`Connected to MU/TH/UR.`)
);

const mainMenu = () => {
    inquirer
        .prompt(
            {
                type: "list",
                name: "mainMenu",
                message: "What would you like to do?",
                choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"],
            }
        )
        .then(response => {
            //  if (response.mainMenu == "View all departments") {

            //  } else if ()
            switch (response.mainMenu) {
                case "View all departments":
                    db.query("SELECT id AS 'Department ID', name AS 'Department Name' FROM department", (err, result) => {
                        err ? console.log(err) : console.table(result);
                        mainMenu();
                    });
                    break;
                case "View all roles":
                    db.query("SELECT role.id AS 'Role ID', role.title AS 'Job Title', department.name AS 'Department', role.salary AS 'Salary' FROM role JOIN department ON role.department_id = department.id ORDER BY role.id", (err, result) => {
                        err ? console.log(err) : console.table(result);
                        mainMenu();
                    });
                    break;
                case "View all employees":
                    db.query("SELECT e.id AS 'Employee ID', e.first_name AS 'First Name', e.last_name AS 'Last Name', role.title AS 'Job Title', department.name AS 'Department', role.salary AS 'Salary', CONCAT(m.first_name, ' ', m.last_name) AS 'Manager' FROM employee e JOIN role ON role.id = e.role_id JOIN department ON role.department_id = department.id LEFT JOIN employee m ON m.id = e.manager_id ORDER BY e.id", (err, result) => {
                        err ? console.log(err) : console.table(result);
                        mainMenu();
                    });
                    break;
                case "Add a department":
                    db.query("", (err, result) => {

                        mainMenu();
                    });
                    break;
                case "Add a role":
                    db.query("", (err, result) => {

                        mainMenu();
                    });
                    break;
                case "Add an employee":
                    db.query("", (err, result) => {

                        mainMenu();
                    });
                    break;
                case "Update an employee role":
                    db.query("", (err, result) => {

                        mainMenu();
                    });
                    break;
                default:
                    mainMenu();
            }
        })
        .catch(err => console.log(err));
}

mainMenu();