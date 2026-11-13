# Employee Maintenance and Records Management System (EMRMS)

A web-based Employee Maintenance and Records Management System developed as part of the Web Systems and Technologies course. The system allows users to manage employee records, monitor workforce statistics, search employee information, and maintain data through a Node.js and Express.js backend with JSON file storage.

## Features

### Employee Management
- Create Employee Records
- View Employee Records
- Update Employee Records
- Delete Employee Records
- Delete All Employee Records
- Auto-Generated Employee IDs
- Employee Search and Filtering

### Dashboard Analytics
- Total Employees
- Onboarding Employees
- Active Employees
- On Leave Employees
- Resigned Employees
- Regular Employees
- Probationary Employees
- Contractual Employees

### Validation
- Required Field Validation
- Real-Time Validation
- Input Sanitization
- Email Validation
- Phone Number Validation
- Duplicate Employee ID Checking
- Field-Level Error Messages
- Backend Input Validation

### Backend Features
- RESTful API using Express.js
- JSON File Data Persistence
- Employee Search API
- Lookup API for Employment Types and Statuses
- Health Check API
- Backend Validation and Error Handling
- Employee Record Management through API Requests

### User Interface
- Responsive Design
- Dynamic Dashboard Updates
- Dynamic Employment Type Loading
- Dynamic Employment Status Loading
- Validation Highlighting
- Safe DOM Rendering

## Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript (ES6)

### Backend
- Node.js
- Express.js
- CORS

### Data Storage
- JSON File Storage

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mmdc-mamanzanares/MMDC-WST_EMRM.git
```

### 2. Navigate to the Backend Directory

```bash
cd MMDC-WST_EMRM/backend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Backend Server

```bash
npm start
```

The backend server will run at:

`http://localhost:3000`

### 5. Launch the Frontend

Open the project folder in Visual Studio Code and launch the frontend using the Live Server extension, or open the following HTML files in your browser:

- `frontend/login.html` – Login page
- `frontend/index.html` – Main employee management interface

## Login Credentials

The system includes a login feature for demonstration and academic purposes.

**Demo Account**

| Field | Value |
|---|---|
| Username | `[Enter demo username]` |
| Password | `[Enter demo password]` |

**Credential Storage**

User account information is maintained in:

`backend/data/users.json`

**Important:** The login functionality is a prototype for demonstration purposes and is not intended to represent a complete production authentication system. Do not publish actual passwords, private credentials, or sensitive account information in a public repository. Use designated demo credentials for testing and demonstrations.

## Project Structure

```text
MMDC-WST_EMRM/
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── script.js
│   ├── login.js
│   └── style.css
│
├── backend/
│   ├── app.js
│   ├── package.json
│   ├── package-lock.json
│   │
│   └── data/
│       ├── employees.json
│       ├── lookups.json
│       └── users.json
│
└── README.md
```

## API Endpoints

### Health Check

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Returns API status information. |

### Employee Records

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/employees` | Retrieves all employee records. |
| POST | `/api/employees` | Creates a new employee record. |
| PUT | `/api/employees/:id` | Updates an existing employee record. |
| DELETE | `/api/employees/:id` | Deletes a specific employee record. |
| DELETE | `/api/employees` | Deletes all employee records. |

### Search Employees

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/employees/search?keyword=value` | Searches employees by Employee ID, Employee Name, Department, or Position. |

### Lookup Values

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/lookups` | Returns available Employment Types and Employment Statuses. |

## Validation Rules

### Employee Information
- Employee Name: Letters and spaces only.
- Required fields must not be empty.

### Contact Information
- Phone Number: Exactly 11 digits.
- Email Address: Must follow a valid email format.

### Employment Information
- Department: Letters and spaces only.
- Position: Letters and spaces only.
- Employment Type: Required.
- Employment Status: Required.

### Employee Record Management
- Employee IDs must be unique.
- Employee IDs cannot be changed during an update.
- Employee information is validated before backend updates are saved.

## Data Persistence

The system uses JSON file storage to maintain employee records through the Node.js and Express.js backend.

Employee information is stored in:

`backend/data/employees.json`

The backend processes employee management requests and saves changes to the JSON file. This allows employee records to persist even after refreshing the browser or restarting the backend server.

## Future Enhancements

- Employee Photo Upload
- Excel/PDF Export
- Additional Reporting and Analytics

## Authors

**Mark Anthony Manzanares**  
BSIT Major in Network and Cybersecurity

**Clark Kent Santos**  
BSIT Major in Network and Cybersecurity

**Alleriza Jamsuli**  
BSIT Major in Software Development

**Jovy Ambongan**  
BSIT Major in Data Analytics

## Academic Disclaimer

This project was developed for educational and academic purposes as part of the Web Systems and Technologies course requirements.

## License

This project was developed for academic purposes.