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
    const sql = `SELECT role.id, role.title, role.salary, department.department_name AS department 
    FROM role
    INNER JOIN department ON role.department_id = department.id`;

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

employeeTracker();