# Employee Maintenance and Records Management System (EMRMS)

A web-based Employee Maintenance and Records Management System developed as part of the Web Systems and Technologies course. The system allows users to manage employee records, monitor workforce statistics, search employee information, and maintain data through a Node.js and Express backend with JSON file storage.

## Features

# Features
- Employee Management
- Create Employee Records
- View Employee Records
- Update Employee Records
- Delete Employee Records
- Auto-Generated Employee IDs
- Employee Search and Filtering

# Dashboard Analytics
- Total Employees
- On Boarding Employees
- Active Employees
- On Leave Employees
- Resigned Employees
- Regular Employees
- Probationary Employees
- Contractual Employees

# Validation
- Required Field Validation
- Real-Time Validation
- Input Sanitization
- Email Validation
- Phone Number Validation
- Duplicate Employee ID Checking
- Field-Level Error Messages

# Backend Features
- RESTful API using Express.js
- JSON File Data Persistence
- Employee Search API
- Lookup API for Employment Types and Statuses
- Health Check API
- Backend Validation and Error Handling

# User Interface
- Responsive Design
- Dynamic Dashboard Updates
- Dynamic Employment Type Loading
- Dynamic Employment Status Loading
- Validation Highlighting
- Safe DOM Rendering

## Technologies Used

# Frontend
- HTML5
- CSS3
- JavaScript (ES6)

# Backend
- Node.js
- Express.js
- CORS

# Data Storage
- JSON File Storage

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/mmdc-mamanzanares/MMDC-WST_EMRM.git
```

2. Navigate to the Backend directory:

```bash
cd MMDC-WST_EMRM/backend
```

3. Install Dependencies

```bash
npm install
```

4. Start Backend Server

```bash
npm start
```
 Server URL:
    http://localhost:3000

5. Launch Frontend

```bash
frontend/login.html
```
or
```bash
frontend/index.html
```

## Project Structure

``````````````text
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
│       └── lookups.json
│       └── users.json
│
└── README.md
````````````````
## API Endpoints

# Health Check
- GET /api/health
    Returns API status information.

# Employee Records
- GET /api/employees
    Retrieve all employee records.
- POST /api/employees
    Create a new employee record.
- PUT /api/employees/:id
    Update an existing employee record.
- DELETE /api/employees/:id
    Delete an employee record.

# Search Employees
- GET /api/employees/search?keyword=value
    Search employees by:
        - Employee ID
        - Employee Name
        - Department
        - Position

# Lookup Values
- GET /api/lookups
    Returns:
        - Employment Types
        - Employment Statuses

## Validation Rules

Employee Information
- Employee Name: Letters and spaces only

Contact Information
- Phone Number: Exactly 11 digits
- Email Address: Valid email format

Employment Information
- Department: Letters and spaces only
- Position: Letters and spaces only
- Employment Type: Required
- Employment Status: Required

## Future Enhancements

- Employee Photo Upload
- Excel/PDF Export
- Reporting and Analytics

## Author

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
