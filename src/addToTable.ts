import inquirer from "inquirer";
import { QueryResult } from 'pg';
import { pool } from "./connection.js";
import { cli } from "./Cli.js";



export async function addDept(): Promise<void> {

  return inquirer
  .prompt([
      {
        type: 'input',
        name: 'dept',
        message: 'What do you want to call your new department?',
      },
  ])
  .then((answers) => {
    const dept: string = answers.dept;
    pool.query(`INSERT INTO department (dept_name) VALUES ('${dept}')`,
      (err: Error, result: QueryResult) => {
        if (err) {
          console.log(err);
        } else if (result) {
          console.table('Department successfully added.');
        }
      }
    );
  });
}

async function deptArray() {
  try {
    const deptQuery = `--sql
      SELECT id, dept_name from department`;
    const res = await pool.query(deptQuery)
    const department = res.rows.map(row => ({
      idNum: row.id,
      name: row.dept_name,
    }));
    return department;
  } catch (err) {
    console.error('There was an error retrieving departments:', err);
    return [];
  }
}

export async function addRole(): Promise<void> {

  const depts = await deptArray();
  const deptMap: any = {}
  for(let i=0; i<depts.length; i++) {
    const { idNum, name } = depts[i];
    deptMap[name] = idNum;
  }

  return inquirer
  .prompt([
      {
        type: 'input',
        name: 'roleName',
        message: 'What do you want to call your new role?',
      },
      {
        type: 'input',
        name: 'roleSalary',
        message: 'What is the salary for the new role?',
      },
      {
        type: 'list',
        name: 'roleDept',
        message: 'What department is the new role apart of?',
        choices: depts,
      },
  ])
  .then((answers) => {
    switch (answers.roleDept) { //this is some of the logic a TA was helping me with to assign a manager to certain roles, but we ran out of time
      case 1:
        answers.manager_id = 1;
        console.log("--->", answers);
      break;
      case 2:
        answers.manager.id = 2;
        console.log("--->", answers);
      break;
      default:
    }
    answers.manager = {}
    const { roleName, roleSalary, roleDept } = answers;
    return pool.query(`INSERT INTO role (title, salary, department_id, manager_id) VALUES ($1, $2, $3)`,
      [roleName, roleSalary, deptMap[roleDept]],
      (err: Error, result: any) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Role successfully added.');
          cli.runCli();
        }
      }
    );
  });
}

async function roleArray() {
  try {
    const roleQuery = `--sql
      SELECT id, title from role`;
    const res = await pool.query(roleQuery)
    const role = res.rows.map(row => ({
      idNum: row.id,
      name: row.title,
    }));
    return role;
  } catch (err) {
    console.error('There was an error retrieving roles:', err);
    return [];
  }
}

export async function addEmployee(): Promise<void> {

  const roles = await roleArray();
  const roleMap: any = {}
  for(let i=0; i<roles.length; i++) {
    const { idNum, name } = roles[i];
    roleMap[name] = idNum;
  }

  return inquirer
  .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'What is the first name of the new employee?',
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'What is the last name of the new employee?',
      },
      {
        type: 'list',
        name: 'roleId',
        message: 'What role is the employee associated with?',
        choices: roles,
      },
  ])
  .then((answers) => {
    const { firstName, lastName, roleId } = answers;
    pool.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ($1, $2, $3)`,
      [firstName, lastName, roleMap[roleId]],
      (err: Error, result: QueryResult) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Employee successfully added.');
          cli.runCli();
        }
      }
    );
  });
}

async function employeeArray() {
  try {
    const employeeQuery = `--sql
      SELECT id, last_name from employee`;
    const res = await pool.query(employeeQuery)
    const role = res.rows.map(row => ({
      idNum: row.id,
      name: row.last_name,
    }));
    return role;
  } catch (err) {
    console.error('There was an error retrieving employees:', err);
    return [];
  }
}


export async function updateEmployee(): Promise<void> {

  const employees = await employeeArray();

  const employeeMap: any = {}
  for(let i=0; i<employees.length; i++) {
    const { idNum, name } = employees[i];
    employeeMap[name] = idNum;
  }

  const roles = await roleArray();
  const roleMap: any = {}
  for(let i=0; i<roles.length; i++) {
    const { idNum, name } = roles[i];
    roleMap[name] = idNum;
  }

  return inquirer
  .prompt([
      {
        type: 'list',
        name: 'employee',
        message: 'Which employee would you like to update?',
        choices: employees,
      },
      {
        type: 'list',
        name: 'newRole',
        message: 'What is the employees new role?',
        choices: roles,
      }
  ])
  .then((answers) => {
    const { employee, newRole } = answers;
    pool.query(`UPDATE employee SET role_id=$1 WHERE id=$2`,
      [roleMap[newRole], employeeMap[employee]],
      (err: Error) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Employee successfully updated.');
          cli.runCli();
        }
      }
    );
  });
}