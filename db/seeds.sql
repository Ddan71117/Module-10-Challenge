TRUNCATE TABLE department, role, employee RESTART IDENTITY CASCADE;

INSERT INTO department (dept_name)
VALUES ('Parts'),
       ('Sales'),
       ('Marketing');

INSERT INTO role (title, salary, department_id)
VALUES ('Part Organizer', 30000, 1),
       ('Floor Manager', 80000, 2),
       ('Customer Support', 40000, 2),
       ('Sales Representative', 70000, 2),
       ('Warehouse Manager', 60000, 1),
       ('Social Media Coordinator', 50000, 3);
  
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Slim', 'Shady', 1, 1),
       ('Larry', 'King', 2, NULL), --Manager of Sales
       ('Flava', 'Flave', 6, 2),
       ('Susan', 'Sarandon', 4, 2),
       ('Carrie', 'Fisher', 3, 2),
       ('Mick', 'Lovin', 5, NULL); --Warehouse manager
