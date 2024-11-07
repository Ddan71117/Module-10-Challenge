import inquirer from "inquirer";
import { pool } from "./connection.js";
function addDept() {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'dept',
            message: 'What do you want to call your new department?',
        },
    ])
        .then((answers) => {
        const dept = answers.dept;
        pool.query(`INSERT INTO department (dept_name) VALUES ('${dept}')`, (err, result) => {
            if (err) {
                console.log(err);
            }
            else if (result) {
                console.table(result.rows);
            }
        });
    });
}
export default addDept;
