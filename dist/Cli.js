import inquirer from "inquirer";
import { pool } from "./connection.js";
import { addDept, addRole, addEmployee, updateEmployee } from "./addToTable.js";
class Cli {
    runCli() {
        inquirer
            .prompt([
            {
                type: 'list',
                name: 'manage',
                message: 'Welcome to the Employee Management Console. What would you like to do?',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
            },
        ])
            .then((answers) => {
            switch (answers.manage) {
                case 'View all departments':
                    pool.query('SELECT id, dept_name AS department FROM department', (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        else if (result) {
                            console.table(result.rows);
                        }
                        this.runCli();
                    });
                    break;
                case 'View all roles':
                    pool.query(`SELECT role.id, role.title, department.dept_name AS department, role.salary FROM role 
            JOIN department ON role.department_id = department.id`, (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        else if (result) {
                            console.table(result.rows);
                        }
                        this.runCli();
                    });
                    break;
                case 'View all employees':
                    pool.query(`--sql
            SELECT employee.id, 
            employee.first_name AS first, 
            employee.last_name AS last, 
            role.title, 
            department.dept_name AS department, 
            role.salary, 
            manager.last_name AS manager
            FROM employee
            JOIN role ON employee.role_id = role.id
            JOIN department ON role.department_id = department.id
            LEFT JOIN employee AS manager ON employee.manager_id = manager.id`, (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        else if (result) {
                            console.table(result.rows);
                        }
                        this.runCli();
                    });
                    break;
                case 'Add a department':
                    addDept();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployee();
                    break;
                default:
                    this.runCli();
            }
            ;
        });
    }
    ;
}
export const cli = new Cli();
