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
                    db.query("SELECT * FROM department", (err, result) => {
                        err ? console.log(err) : console.table(result);
                        mainMenu();
                    });
                    break;
                case "View all roles":
                    db.query("SELECT * FROM role", (err, result) => {
                        err ? console.log(err) : console.table(result);
                        mainMenu();
                    });
                    break;
                case "View all employees":
                    db.query("SELECT * FROM employee", (err, result) => {
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