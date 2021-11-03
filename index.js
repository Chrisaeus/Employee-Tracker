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
                    inquirer
                        .prompt(
                            {
                                type: "input",
                                name: "department",
                                message: "What is the name of the department?"
                            }
                        )
                        .then(response => {
                            db.query("INSERT INTO department (name) VALUES (?)", response.department, (err, result) => {
                                console.log(response.department + ` added to Departments.`);
                                mainMenu();
                            });
                        })
                        .catch(err => console.log(err));
                    break;
                case "Add a role":
                    db.query("SELECT * FROM department", (err, depResult) => {
                        let depChoices = [];
                        for (let i = 0; i < depResult.length; i++) {
                            depChoices.push(depResult[i].name);
                        }
                        inquirer
                            .prompt([
                                {
                                    type: "input",
                                    name: "title",
                                    message: "What is the name of the role?"
                                },
                                {
                                    type: "input",
                                    name: "salary",
                                    message: "What is the salary of the role?"
                                },
                                {
                                    type: "list",
                                    name: "department",
                                    message: "Which department does the role belong to?",
                                    choices: depChoices,
                                }
                            ])
                            .then(response => {
                                db.query("SELECT * FROM department WHERE name = ?", response.department, (err, result) => {
                                    db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [response.title, response.salary, result[0].id], (err, result) => {
                                        err ? console.log(err) : console.log(`${response.title} added to Roles.`);
                                        mainMenu();
                                    });
                                });
                            })
                            .catch(err => console.log(err));
                    });
                    break;
                case "Add an employee":
                    db.query("SELECT * FROM role", (err, roleResult) => {
                        let roleChoices = [];
                        for (let i = 1; i < roleResult.length; i++) {
                            roleChoices.push(roleResult[i].title);
                        }
                        db.query("SELECT * FROM employee", (err, managerResult) => {
                            let managerChoices = [];
                            for (let i = 0; i < managerResult.length; i++) {
                                let fullName = [managerResult[i].first_name, managerResult[i].last_name];
                                managerChoices.push(fullName.join(" "));
                            }
                            inquirer
                                .prompt([
                                    {
                                        type: "input",
                                        name: "firstname",
                                        message: "What is the employee's first name?"
                                    },
                                    {
                                        type: "input",
                                        name: "lastname",
                                        message: "What is the employee's last name?"
                                    },
                                    {
                                        type: "list",
                                        name: "role",
                                        message: "What is the employee's role?",
                                        choices: roleChoices
                                    },
                                    {
                                        type: "list",
                                        name: "manager",
                                        message: "Who is the employee's manager?",
                                        choices: managerChoices
                                    }
                                ])
                                .then(response => {
                                    db.query("SELECT * FROM role WHERE title = ?", response.role, (err, roleResponse) => {
                                        db.query("SELECT * FROM employee WHERE first_name = ? AND last_name = ?", [response.manager.split(" ")[0], response.manager.split(" ")[1]], (err, managerResponse) => {
                                            console.log(managerResponse);
                                            db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [response.firstname, response.lastname, roleResponse[0].id, managerResponse[0].id], (err, result) => {
                                                err ? console.log(err) : console.log(`${response.firstname} ${response.lastname} added to Employees.`);
                                                mainMenu();
                                            });
                                        });
                                    });
                                })
                                .catch(err => console.log(err));
                        });
                    });
                    break;
                case "Update an employee role":
                    db.query("SELECT * FROM department", (err, result) => {
                        console.log(result);
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