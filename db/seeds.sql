INSERT INTO department(department_name)
VALUES("Production"), ("Quality"), ("Purchasing"), ("IT"), ("Accounting");

INSERT INTO roles(title, employee_salary, department_id)
VALUES("Software Developer", 93000, 1), ("Quality Assurance Technician", 67000, 2), ("Sales Manager", 175000, 3), ("Forensic Accountant", 200000, 5);

INSERT INTO employee(first_name, last_name, job_title, manager_name, department_name, salary)
VALUES ('Betty', 'White', "Software Developer", "Manager 1", "Production", 93000), ('Elvis', 'Presley', "Quality Assurance Technician", "Manager 2", "Quality", 67000);