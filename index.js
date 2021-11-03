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
                });
                break;
            default:
                console.log("Choose an option");
        }
    })
    .catch(err => console.log(err));
