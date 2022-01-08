# Employee Tracker

[![License](https://img.shields.io/badge/License-Apache_2.0-yellowgreen.svg)](https://opensource.org/licenses/Apache-2.0) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)

## Description

The Employee Tracker is a simple example of a command-line content management system for a business. It uses the Inquirer package to allow the user to navigate a main menu leading to views of departments, roles, and employees. It also allows the creation of additional departments, roles, and employees, and the updating of an employee's information. The app uses the console.table package to display the data nicely in the terminal.

For this project, I themed the example data after the crew of the *Nostromo* from Ridley Scott's *Alien (1979)*. Just to keep things interesting.


---

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Contributing](#contributing)
4. [Tests](#tests)
5. [License](#license)
6. [Questions](#questions)

---

## Installation

1. Install dependencies with `npm i`.

2. Open MySQL shell and enter `SOURCE db/schema.sql` to create the example database. `SOURCE db/seeds.sql` will seed the example data.

3. Close MySQL shell and run the application with `npm start`.


---

## Usage

At the main menu, the user will be given the options to:

1. View all departments

2. View all roles

3. View all employees

4. Add a department

5. Add a role

6. Add an employee

7. Update an employee role

Choosing to view departments, roles, or employees will render a table showing the respective data points.

"Add a department" will prompt the user for a department name, then the new department will be added to the database. 

"Add a role" will prompt the user for the role's name, salary, and the existing department that the new role belongs to.

"Add an employee" will prompt the user for the new employee's first name, last name, role, and manager (out of the list of existing employees).

"Update an employee role" will prompt the user to select an existing employee and then the new role for that employee.

Users will be returned to the main menu after every completed action.  


---

## Contributing

Any contributions that conform to the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/) are welcome!


---

## Tests

There are no tests included with this application.


---

## License

Copyright 2022 Christian Sadler

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

---

## Questions

If you have questions, contact me on [GitHub](https://github.com/Chrisaeus) or send me an e-mail at <christian.sadler@yahoo.com>.