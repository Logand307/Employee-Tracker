const inquirer = require("inquirer");
const cTable = require('console.table');
const db = require('./config/connection');


let employeeTracker = () => {
    return inquirer
        .prompt([
            {
                type: "list",
                name: "options",
                message: "What would you like to do?",
                choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update employee role"],
            }]).then(userChoice => {
                switch (userChoice.options) {
                    case "View all departments":
                        viewAllDepartments();
                        break;
                    case "View all roles":
                        viewAllRoles();
                        break;
                    case "View all employees":
                        viewAllEmployees();
                        break;
                    case "Add a department":
                        addDepartment();
                        break;
                    case "Add a role":
                        addRole();
                        break;
                    case "Add an employee":
                        addEmployee();
                        break;
                    case "Update employee role":
                        updateEmployeeRole();
                        break;
                    default:

                };
            })
};

let viewAllDepartments = () => {
    const sql = `SELECT * FROM department;`;

    db.query(sql, (error, response) => {
        if (error) throw error;
        console.table(response);
        employeeTracker();
    })
}

let viewAllRoles = () => {
    const sql = `SELECT roles.id, roles.title, roles.employee_salary, department.department_name AS department 
    FROM roles
    INNER JOIN department ON roles.department_id = department.id`;

    db.query(sql, (error, response) => {
        if (error) throw error;
        console.table(response);
        employeeTracker();
    })
}

let viewAllEmployees = () => {
    const sql = `SELECT * FROM employee;`;


    db.query(sql, (error, response) => {
        if (error) throw error;
        console.table(response);
        employeeTracker();
    })
}

let addDepartment = () => {
    return inquirer
        .prompt([
            {
                name: 'newDepartment',
                type: 'input',
                message: 'What is the name of your new Department?'
            }
        ]).then((answer) => {

            const sql = `INSERT INTO department (department_name) VALUES (?);`;


            db.query(sql, answer.newDepartment, (error, response) => {
                if (error) throw error;
                viewAllDepartments();
                console.log(answer.newDepartment + ' department has been added successfully!')
            });
        });
};

let addRole = () => {
    inquirer
        .prompt([
            {
                name: 'newRoleTitle',
                type: 'input',
                message: 'What is the title of the new role?',
            },
            {
                name: 'newRoleSalary',
                type: 'input',
                message: 'What is the salary for this new role?',
            },
            {
                name: 'newRoleDepartment',
                type: 'input',
                message: 'Which department is this new role in?',
            }
        ]).then((answer) => {

            const sql = `INSERT INTO roles (title, employee_salary, department_id) VALUES ("${answer.newRoleTitle}", "${answer.newRoleSalary}", "${answer.newRoleDepartment}");`;


            db.query(sql, (error, response) => {
                if (error) throw error;
                viewAllRoles();
                console.log(answer.newRoleTitle + ' role has been added successfully!')
            });
        });
};


let addEmployee = () => {
    inquirer
        .prompt([
            {
                name: 'firstName',
                type: 'input',
                message: 'What is the first name of the new employee?',
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'What is last name of the new employee?',
            },
            {
                name: 'employeeRole',
                type: 'input',
                message: 'What will the role be for the new employee?',
            },
            {
                name: 'employeeManager',
                type: 'input',
                message: 'Who will the manager be for the new employee?',
            }
        ]).then((answer) => {

            const sql = `INSERT INTO employee (first_name, last_name, job_title, manager_name) VALUES ("${answer.firstName}", "${answer.lastName}", "${answer.employeeRole}", "${answer.employeeManager}");`;


            db.query(sql, (error, response) => {
                if (error) throw error;
                viewAllEmployees();
                console.log(answer.firstName + ' has been added successfully as a new employee!')
            });
        });
};

employeeTracker();