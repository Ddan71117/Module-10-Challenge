# Employee Tracker

![MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Table of Contents

1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Tests](#tests)
5. [Contributing](#contributing)
6. [Questions](#questions)
7. [License](#license)

## Description

This project is designed to log and track multiple company departments, department roles, and employees along with their salaries and their managers within a SQL database.

## Installation

To install this app, you will need to have VSCode, Node.js, and PostgreSQL installed and configured as well as command line software such as Git Bash or Terminal on your device. You will also need the "Inquirer" and "TypeScript" packages installed via the `npm install` command.

Copy the files from the GitHub repository, save them to a folder, and open them in VSCode. Afterwards, open up a new terminal and run the following commands while in the directory were the files are located:

`psql -U postgres`
`<*enter credentials*>`
`\i db/schema.sql`
`\i db/seeds.sql`
(The seeds.sql file is for example and testing purposes only and is not needed if a user is using their own data from scratch).

Once schema has been established, run the command `npm run start` and the app will be operational.

## Usage

Follow the prompts to view departments, department roles, and employees within a database. Adding to databases as well
as updating a department role is also available for customization.

The following link is a demonstration video:

https://drive.google.com/file/d/1t_5zZDiEBKsdEJU6BBe8SHIe2lxtYYcn/view

## Tests

All testing was done via the terminal and through Xpert Learning Assistant.

## Contributing

Daniel Drennen

Xpert Learning Assistant provided invaluable support with coding concepts, debugging, and resources throughout my project development.

## Questions

https://github.com/Ddan71117

For additional questions, please contact me at ddren024@gmail.com.

## License

[MIT](https://opensource.org/licenses/MIT)
