# Frizerski Salon App

This is a web application for managing appointments at a hair salon. It provides endpoints for retrieving treatment information, employee details, client data, appointment schedules, and more.

## Installation

1. Make sure you have Node.js installed. If not, download and install it from [here](https://nodejs.org/).
2. Clone this repository to your local machine.
3. Navigate to the project directory in your terminal.
4. Run the following command to install dependencies:
   ```bash
   npm install

## Database Setup

1. Make sure you have MSSQL installed and running on your local machine.
2. Copy the `.bak` file to a directory accessible by your SQL Server instance.
3. Open SQL Server Management Studio (SSMS) and connect to your SQL Server instance.
4. Right-click on `Databases` in the Object Explorer and select `Restore Database...`.
5. In the `General` tab of the Restore Database window, enter a name for the database (e.g., `FrizerskiSalon`).
6. In the `Source` section, select `Device` and click on the ellipsis (`...`) to browse for the `.bak` file.
7. Select your `.bak` file and click `OK` to close the Select backup devices window.
8. Click `OK` in the Restore Database window to start the restoration process.
9. Once the database is restored, you can proceed with configuring the database connection in the code.

## Configuration

1. Open the `app.js` file located in the `HairSalon_GLOW` folder.
2. Scroll to the end of the file to find the database configuration code.
3. Update the `config` object with your MSSQL database credentials and server information.
   ```javascript
	const config = {
  	user: 'your_username',
  	password: 'your_password',
  	server: 'your_server',
  	database: 'FrizerskiSalon',
  	options: {
    	encrypt: false,
  	},
	};

## Starting the server
1. Open your terminal/command prompt and navigate to the HairSalon_GLOW folder.
2. Run the following command to start the server:
   ```bash
   npm run start
3. This command will start the server, and you should see a message indicating that the server is running.

## Access to home webpage
Once the server is running, open a web browser and enter the following URL to access the application "http://localhost:5500/pocetna.html"




