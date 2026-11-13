// =====================================================
// Employee Management Record System (EMRMS)
// Backend API using Node.js and Express
// =====================================================

// -----------------------------------------------------
// Import Required Modules
// -----------------------------------------------------

// Express framework for creating APIs
const express = require("express");

// File System module for reading and writing files
const fs = require("fs");

// Path module for handling file paths safely
const path = require("path");

// CORS middleware to allow frontend access
const cors = require("cors");

// -----------------------------------------------------vd
// Create Express Application
// -----------------------------------------------------

const app = express();

// Server Port Number
const PORT = 3000;

// -----------------------------------------------------
// Middleware
// -----------------------------------------------------

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Allow JSON data in requests
app.use(express.json());

// -----------------------------------------------------
// Database File Location
// -----------------------------------------------------

const DATA_FILE = path.join(
    __dirname,
    "data",
    "employees.json"
);

// -----------------------------------------------------
// Helper Functions
// -----------------------------------------------------

/**
 * Sanitize employee input
 * Removes unnecessary whitespace and ensures string values.
 */
function sanitizeEmployee(employee) {
    const fields = [
        "empId",
        "empName",
        "dateBirth",
        "address",
        "phone",
        "email",
        "department",
        "position",
        "dateHired",
        "type",
        "status"
    ];

    const sanitized = {};

    fields.forEach(field => {
        sanitized[field] = String(employee[field] ?? "").trim();
    });

    return sanitized;
}

/**
 * Validate employee information
 * Returns an object containing validation errors.
 */
function validateEmployee(employee) {
    const errors = {};

    if (!/^[A-Za-z\s]+$/.test(employee.empName)) {
        errors.empName =
            "Employee Name may contain letters only.";
    }

    if (!/^\d{11}$/.test(employee.phone)) {
        errors.phone =
            "Phone Number must contain 11 digits.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employee.email)) {
        errors.email =
            "Invalid email format.";
    }

    return errors;
}

/**
 * Read employee records from JSON file
 * @returns {Array}
 */
function getEmployees() {

    try {

        // Read file contents
        const data = fs.readFileSync(
            DATA_FILE,
            "utf8"
        );

        // Convert JSON text to JavaScript object
        return JSON.parse(data);

    } catch (error) {

        console.error(
            "Error reading employee file:",
            error.message
        );

        return [];

    }

}

/**
 * Save employee records to JSON file
 * @param {Array} employees
 */
function saveEmployees(employees) {

    try {

        fs.writeFileSync(
            DATA_FILE,
            JSON.stringify(
                employees,
                null,
                2
            )
        );

    } catch (error) {
        console.error(
            "Error saving employee file:",
            error.message
        );

        throw error;
    }

}

// -----------------------------------------------------
// API Health Check
// -----------------------------------------------------

/**
 * Verify backend service is running
 */
app.get(
    "/api/health",
    (req, res) => {

        res.status(200).json({

            status: "Online",

            service:
                "Employee Management Record System API"

        });

    }
);

// -----------------------------------------------------
// GET ALL EMPLOYEES
// -----------------------------------------------------

/**
 * Retrieve all employee records
 */
app.get("/api/employees", (req, res) => {

        try {

            const employees =
                getEmployees();

            res.status(200).json(
                employees
            );

        } catch (error) {

            res.status(500).json({

                message:
                    "Failed to retrieve employee records.",

                error:
                    error.message

            });

        }

    }
);

// ========================================
// SEARCH EMPLOYEES
// ========================================

app.get(
    "/api/employees/search",
    (req, res) => {

        try {

            // Get keyword from query string
            const keyword =
                String(
                    req.query.keyword || ""
                ).toLowerCase();

            // Load employee records
            const employees =
                getEmployees();

            // Search matching records
            const results =
                employees.filter(
                    employee =>

                        employee.empId
                            .toLowerCase()
                            .includes(keyword)

                        ||

                        employee.empName
                            .toLowerCase()
                            .includes(keyword)

                        ||

                        employee.department
                            .toLowerCase()
                            .includes(keyword)

                        ||

                        employee.position
                            .toLowerCase()
                            .includes(keyword)
                );

            // Return matching records
            res.status(200).json(
                results
            );

        } catch (error) {

            res.status(500).json({

                message:
                    "Search failed.",

                error:
                    error.message

            });

        }

    }
);

// -----------------------------------------------------
// CREATE EMPLOYEE
// -----------------------------------------------------

/**
 * Add a new employee record
 */
app.post(
    "/api/employees",
    (req, res) => {

        try {

            // Load existing employees
            const employees =
                getEmployees();

            // Employee data received from frontend
            const newEmployee =
                sanitizeEmployee(
                    req.body
                );
            
            const validationErrors =
                validateEmployee(
                    newEmployee
                );

            if (
                Object.keys(
                    validationErrors
                ).length > 0
            ) {

                return res.status(400).json({

                    message:
                        "Validation failed.",

                    errors:
                        validationErrors

                });

            }

            // Validate required fields
            if (
                !newEmployee.empId ||
                !newEmployee.empName ||
                !newEmployee.phone ||
                !newEmployee.email
            ) {

                return res.status(400).json({

                    message:
                        "Required fields are missing."

                });

            }

            // Check duplicate Employee ID
            const duplicateEmployee =
                employees.find(
                    employee =>
                        employee.empId ===
                        newEmployee.empId
                );

            if (duplicateEmployee) {

                return res.status(400).json({

                    message:
                        "Employee ID already exists."

                });

            }

            // Add employee to collection
            employees.push(
                newEmployee
            );

            // Save changes
            saveEmployees(
                employees
            );

            // ========================================
            // Validation and Sanitization Functions
            // ========================================

            res.status(201).json({

                message:
                    "Employee added successfully.",

                employee:
                    newEmployee

            });

        } catch (error) {

            res.status(500).json({

                message:
                    "Failed to create employee.",

                error:
                    error.message

            });

        }

    }
);

// -----------------------------------------------------
// UPDATE EMPLOYEE
// -----------------------------------------------------

/**
 * Update an existing employee record
 */
app.put("/api/employees/:id", (req, res) => {

    try {

        // Employee ID from URL
        const empId = req.params.id;

        // Ensure request body is a valid object
        if (
            !req.body ||
            typeof req.body !== "object" ||
            Array.isArray(req.body)
        ) {
            return res.status(400).json({
                message: "Invalid employee data."
            });
        }

        // Load employee records
        const employees = getEmployees();

        // Find employee index
        const employeeIndex = employees.findIndex(
            employee => employee.empId === empId
        );

        // Employee not found
        if (employeeIndex === -1) {
            return res.status(404).json({
                message: "Employee not found."
            });
        }

        // Check whether the submitted ID differs
        const submittedEmpId = String(
            req.body.empId ?? ""
        ).trim();

        if (
            submittedEmpId &&
            submittedEmpId !== empId
        ) {
            return res.status(400).json({
                message: "Employee ID cannot be changed."
            });
        }

        // Sanitize employee information
        const updatedEmployee = sanitizeEmployee({
            ...req.body,
            empId: empId
        });

        // Apply shared validation
        const errors = validateEmployee(updatedEmployee);

        // Reject invalid employee information
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                message: "Please correct the employee information.",
                errors: errors
            });
        }

        // Replace existing employee record
        employees[employeeIndex] = updatedEmployee;

        // Save changes
        saveEmployees(employees);

        // Return success response
        return res.status(200).json({
            message: "Employee updated successfully.",
            employee: updatedEmployee
        });

    } catch (error) {

        return res.status(500).json({
            message: "Failed to update employee.",
            error: error.message
        });

    }

});

// -----------------------------------------------------
// CLEAR ALL EMPLOYEES
// -----------------------------------------------------

app.delete("/api/employees", (req, res) => {
    try {
        // Replace all employee records with an empty array
        saveEmployees([]);

        return res.status(200).json({
            message: "All employee records deleted successfully."
        });

    } catch (error) {
        console.error(
            "Error clearing employee records:",
            error.message
        );

        return res.status(500).json({
            message: "Failed to clear employee records.",
            error: error.message
        });
    }
});


// -----------------------------------------------------
// DELETE EMPLOYEE
// -----------------------------------------------------

/**
 * Remove employee record
 */
app.delete(
    "/api/employees/:id",
    (req, res) => {

        try {

            // Employee ID from URL
            const empId =
                req.params.id;

            // Load employee records
            let employees =
                getEmployees();

            // Verify employee exists
            const employeeExists =
                employees.some(
                    employee =>
                        employee.empId === empId
                );

            if (!employeeExists) {

                return res.status(404).json({

                    message:
                        "Employee not found."

                });

            }

            // Remove employee
            employees =
                employees.filter(
                    employee =>
                        employee.empId !== empId
                );

            // Save changes
            saveEmployees(
                employees
            );

            res.status(200).json({

                message:
                    "Employee deleted successfully."

            });

        } catch (error) {

            res.status(500).json({

                message:
                    "Failed to delete employee.",

                error:
                    error.message

            });

        }

    }
);

// ========================================
// GET LOOKUP VALUES
// Returns dropdown values used by frontend
// ========================================
app.get(
	"/api/lookups",
	(req, res) => {
    	try {
        	// Define lookup file location
        	const LOOKUP_FILE =
            	path.join(
                	__dirname,
                	"data",
                	"lookups.json"
            	);
        	// Read lookup data from file
        	const lookups =
            	JSON.parse(
                	fs.readFileSync(
                    	LOOKUP_FILE,
                    	"utf8"
                	)
            	);
        	// Return lookup values
        	res.status(200).json(
            	lookups
        	);
    	}
    	catch (error) {
        	// Return server error if file cannot be loaded
        	res.status(500).json({
            	message:
                	"Unable to load lookup values.",
            	error:
                	error.message
        	});
    	}
	}
);


// ========================================
// LOGIN USER
// Validates username and password
// ========================================

app.post(
    "/api/login",
    (req, res) => {

        const {
            username,
            password
        } = req.body;

        if (
            username === "admin" &&
            password === "admin123"
        ) {

            return res.status(200).json({

                message:
                    "Login successful.",

                username:
                    username

            });

        }

        res.status(401).json({

            message:
                "Invalid username or password."

        });

    }
);

// -----------------------------------------------------
// START SERVER
// -----------------------------------------------------

/**
 * Start Express server
 */
app.listen(PORT, () => {

    console.log(
        `EMRMS Backend Server Running: http://localhost:${PORT}`
    );

});
