const inquirer = require("inquirer");
// const cTable = require('console.table');


var employeeTracker = () => {
    return inquirer
        .prompt([
            {
                type: "list",
                name: "toDo",
                message: "What would you like to do?",
                choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update employee role"],
            }]).then(userChoice => {
                switch (userChoice.toDo) {
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

employeeTracker();