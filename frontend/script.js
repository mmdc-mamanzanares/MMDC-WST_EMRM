// Stores all employee records retrieved from backend
let employees = [];
let selectedEmployeeIndex = -1;

// ========================================
// Display Field Error
// ========================================

function showError(
    fieldId,
    errorId,
    message
) {

    const field =
        document.getElementById(
            fieldId
        );

    const error =
        document.getElementById(
            errorId
        );

    error.textContent =
        message;

    field.classList.add(
        "input-error"
    );

    field.classList.remove(
        "input-valid"
    );

}

// ========================================
// Clear Field Error
// ========================================

function clearError(
    fieldId,
    errorId
) {

    const field =
        document.getElementById(
            fieldId
        );

    const error =
        document.getElementById(
            errorId
        );

    error.textContent = "";

    field.classList.remove(
        "input-error"
    );

    field.classList.add(
        "input-valid"
    );

}

// ========================================
// Employee Name Validation
// ========================================

function validateEmployeeName() {

    const value =
        document.getElementById("empName")
            .value
            .trim();

    if (value === "") {

        showError(
            "empName",
            "empNameError",
            "Employee Name is required."
        );

        return false;

    }

    if (!/^[A-Za-z\s]+$/.test(value)) {

        showError(
            "empName",
            "empNameError",
            "Letters and spaces only."
        );

        return false;

    }

    clearError(
        "empName",
        "empNameError"
    );

    return true;

}

// ========================================
// Phone Validation
// ========================================

function validatePhone() {

    const value =
        document.getElementById("phone")
            .value
            .trim();

    if (value === "") {

        showError(
            "phone",
            "phoneError",
            "Phone Number is required."
        );

        return false;

    }

    if (!/^\d{11}$/.test(value)) {

        showError(
            "phone",
            "phoneError",
            "Phone Number must contain exactly 11 digits."
        );

        return false;

    }

    clearError(
        "phone",
        "phoneError"
    );

    return true;

}

// ========================================
// Email Validation
// ========================================

function validateEmail() {

    const value =
        document.getElementById("email")
            .value
            .trim();

    if (value === "") {

        showError(
            "email",
            "emailError",
            "Email Address is required."
        );

        return false;

    }

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!pattern.test(value)) {

        showError(
            "email",
            "emailError",
            "Enter a valid Email Address."
        );

        return false;

    }

    clearError(
        "email",
        "emailError"
    );

    return true;

}

// ========================================
// Department Validation
// ========================================

function validateDepartment() {

    const value =
        document.getElementById(
            "department"
        ).value.trim();

    if (value === "") {

        showError(
            "department",
            "departmentError",
            "Department is required."
        );

        return false;

    }

    if (!/^[A-Za-z\s]+$/.test(value)) {

        showError(
            "department",
            "departmentError",
            "Letters and spaces only."
        );

        return false;

    }

    clearError(
        "department",
        "departmentError"
    );

    return true;

}

// ========================================
// Position Validation
// ========================================

function validatePosition() {

    const value =
        document.getElementById(
            "position"
        ).value.trim();

    if (value === "") {

        showError(
            "position",
            "positionError",
            "Position is required."
        );

        return false;

    }

    if (!/^[A-Za-z\s]+$/.test(value)) {

        showError(
            "position",
            "positionError",
            "Letters and spaces only."
        );

        return false;

    }

    clearError(
        "position",
        "positionError"
    );

    return true;

}

// ========================================
// Validate Entire Form
// ========================================

function validateAllFields() {

    if (!validateEmployeeName()) {

        document
            .getElementById("empName")
            .focus();

        return false;

    }

    if (!validatePhone()) {

        document
            .getElementById("phone")
            .focus();

        return false;

    }

    if (!validateEmail()) {

        document
            .getElementById("email")
            .focus();

        return false;

    }

    if (!validateDepartment()) {

        document
            .getElementById("department")
            .focus();

        return false;

    }

    if (!validatePosition()) {

        document
            .getElementById("position")
            .focus();

        return false;

    }

    return true;

}




// Auto Generate Employee ID
function generateEmployeeId() {

    // Don't generate a new ID when editing
    if (selectedEmployeeIndex !== -1) {
        return;
    }

    const currentYear = new Date().getFullYear();

    let nextNumber = 1;

    if (employees.length > 0) {

        let highestNumber = 0;

        employees.forEach(employee => {

            let employeeNumber =
                parseInt(employee.empId.split("-")[1]);

            if (employeeNumber > highestNumber) {
                highestNumber = employeeNumber;
            }

        });

        nextNumber = highestNumber + 1;
    }

    let employeeId =
        currentYear +
        "-" +
        String(nextNumber).padStart(4, "0");

    document.getElementById("empId").value =
        employeeId;
}


// ========================================
// ADD EMPLOYEE
// Creates a new employee record
// ========================================

async function addEmployee() {

    // Create employee object from form
    let employee = {

        empId: document.getElementById("empId").value,
        empName: document.getElementById("empName").value,
        dateBirth: document.getElementById("dateBirth").value,
        address: document.getElementById("address").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        department: document.getElementById("department").value,
        position: document.getElementById("position").value,
        dateHired: document.getElementById("dateHired").value,
        type: document.getElementById("type").value,
        status: document.getElementById("status").value

    };

    // Validate required fields
    if (

        employee.empName === "" ||

        employee.dateBirth === "" ||

        employee.phone === "" ||

        employee.email === "" ||

        employee.department === "" ||

        employee.position === "" ||

        employee.dateHired === "" ||

        employee.type === "" ||

        employee.status === ""

    ) {

        document
            .getElementById("formError").textContent =
            "Please complete all required fields.";

        return;

    } 

    // Validate field format
    if (!validateAllFields()) {

        return;

    }

    try {

        // Send employee record to backend
        await fetch(
            "http://localhost:3000/api/employees",
            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(employee)

            }
        );

        // Reload employee list
        await loadEmployees();

        clearForm();

        alert(
            "Employee added successfully."
        );

    } catch(error) {

        console.error(error);

    }

}


/**
 * Retrieve employee records
 * from backend API
 */

// ========================================
// LOAD LOOKUP DATA
// Retrieves dropdown values from backend
// ========================================
async function loadLookups() {
	try {
    	// Request lookup values from backend API
    	const response =
        	await fetch(
            	"http://localhost:3000/api/lookups"
        	);
    	// Convert JSON response
    	const data =
        	await response.json();
    	// Load Employment Types
    	populateEmploymentTypes(
        	data.employmentTypes
    	);
    	// Load Employment Statuses
    	populateEmploymentStatuses(
        	data.employmentStatuses
    	);
	}
	catch (error) {
    	// Display error in browser console
    	console.error(
        	"Error loading lookups:",
        	error
    	);
	}
}
// ========================================
// POPULATE EMPLOYMENT TYPES
// Creates dropdown options dynamically
// ========================================
function populateEmploymentTypes(types) {
	// Retrieve Employment Type dropdown
	const typeDropdown =
    	document.getElementById(
        	"Type"
    	);

	// Clear existing options
	typeDropdown.innerHTML = "";
	
// Create default option
	const defaultOption =
    	document.createElement(
        	"option"
    	);
	
defaultOption.value = "";
	defaultOption.textContent =
    	"Select Type";
	
// Add default option
	typeDropdown.appendChild(
    	defaultOption
	);
	
// Create option for each type
	types.forEach(type => {
    	const option =
        	document.createElement(
            	"option"
        	);
    	
option.value = type;

    	option.textContent = type;

    	typeDropdown.appendChild(
        		option
    	);
	});
}
// ========================================
// POPULATE EMPLOYMENT STATUSES
// Creates dropdown options dynamically
// ========================================

function populateEmploymentStatuses(statuses) {

    // Retrieve Employment Status dropdown
    const statusDropdown =
        document.getElementById(
            "status"
        );

    // Remove current options
    statusDropdown.innerHTML = "";

    // Create default option
    const defaultOption =
        document.createElement(
            "option"
        );

    defaultOption.value = "";

    defaultOption.textContent =
        "Select Status";

    // Add default option
    statusDropdown.appendChild(
        defaultOption
    );

    // Create options from backend data
    statuses.forEach(status => {

        const option =
            document.createElement(
                "option"
            );

        option.value = status;

        option.textContent = status;

        statusDropdown.appendChild(
            option
        );

    });

}

async function loadEmployees() {

    try {

        // Request employee list
        const response =
        await fetch(
            "http://localhost:3000/api/employees"
        );

        // Convert response to JSON
        employees =
        await response.json();

        // Refresh UI
        displayEmployees();

        updateDashboard();

    } catch(error) {

        console.error(
            "Error loading employees:",
            error
        );

    }

}

// ========================================
// DISPLAY EMPLOYEES
// Creates employee table rows safely
// ========================================

// RENDER EMPLOYEE TABLE Safely renders employee records

function renderEmployeeTable(employeeList) {

    const tableBody =
        document.getElementById(
            "employeeTableBody"
        );

    // Clear existing table rows
    tableBody.innerHTML = "";

    employeeList.forEach(
        employee => {

            // Create table row
            const row =
                document.createElement(
                    "tr"
                );

            // Employee ID
            const idCell =
                document.createElement(
                    "td"
                );

            idCell.textContent =
                employee.empId;

            row.appendChild(idCell);

            // Employee Name
            const nameCell =
                document.createElement(
                    "td"
                );

            nameCell.textContent =
                employee.empName;

            row.appendChild(nameCell);

            // Department
            const departmentCell =
                document.createElement(
                    "td"
                );

            departmentCell.textContent =
                employee.department;

            row.appendChild(
                departmentCell
            );

            // Position
            const positionCell =
                document.createElement(
                    "td"
                );

            positionCell.textContent =
                employee.position;

            row.appendChild(
                positionCell
            );

            // Date Hired
            const hiredCell =
                document.createElement(
                    "td"
                );

            hiredCell.textContent =
                employee.dateHired;

            row.appendChild(
                hiredCell
            );

            // Employment Type
            const typeCell =
                document.createElement(
                    "td"
                );

            typeCell.textContent =
                employee.type;

            row.appendChild(typeCell);

            // Employment Status
            const statusCell =
                document.createElement(
                    "td"
                );

            statusCell.textContent =
                employee.status;

            row.appendChild(statusCell);

            // Action Buttons
            const actionCell =
                document.createElement(
                    "td"
                );

            const editButton =
                document.createElement(
                    "button"
                );

            editButton.textContent =
                "Edit";

            editButton.addEventListener(
                "click",
                () => {

                    const originalIndex =
                        employees.findIndex(
                            emp =>
                            emp.empId ===
                            employee.empId
                        );

                    selectEmployee(
                        originalIndex
                    );

                }
            );

            const deleteButton =
                document.createElement(
                    "button"
                );

            deleteButton.textContent =
                "Delete";

            deleteButton.addEventListener(
                "click",
                () => {

                    const originalIndex =
                        employees.findIndex(
                            emp =>
                            emp.empId ===
                            employee.empId
                        );

                    deleteEmployee(
                        originalIndex
                    );

                }
            );

            actionCell.appendChild(
                editButton
            );

            actionCell.appendChild(
                deleteButton
            );

            row.appendChild(
                actionCell
            );

            tableBody.appendChild(
                row
            );

        }
    );

}


// ========================================
// DISPLAY EMPLOYEES
// Display complete employee list
// ========================================

function displayEmployees() {

    renderEmployeeTable(
        employees
    );

}


// Load Employee into Form for Editing
function selectEmployee(index) {

    selectedEmployeeIndex = index;

    let employee = employees[index];

    document.getElementById("editBtn").disabled = false;
document.getElementById("addBtn").disabled = true;

    document.getElementById("empId").value = employee.empId;
    document.getElementById("empName").value = employee.empName;
    document.getElementById("dateBirth").value = employee.dateBirth;
    document.getElementById("address").value = employee.address;
    document.getElementById("phone").value = employee.phone;
    document.getElementById("email").value = employee.email;
    document.getElementById("department").value = employee.department;
    document.getElementById("position").value = employee.position;
    document.getElementById("dateHired").value = employee.dateHired;
    document.getElementById("type").value = employee.type;
    document.getElementById("status").value = employee.status;
}

// ========================================
// UPDATE EMPLOYEE
// Updates selected employee record
// ========================================

async function updateEmployee() {

    if (
        selectedEmployeeIndex === -1
    ) {

        alert(
            "Select an employee first."
        );

        return;

    }

    let updatedEmployee = {

        empId: document.getElementById("empId").value,
        empName: document.getElementById("empName").value,
        dateBirth: document.getElementById("dateBirth").value,
        address: document.getElementById("address").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        department: document.getElementById("department").value,
        position: document.getElementById("position").value,
        dateHired: document.getElementById("dateHired").value,
        type: document.getElementById("type").value,
        status: document.getElementById("status").value

    };

    if (
        !validateAllFields()
    ) {

        return;

    }

    try {

        await fetch(

            `http://localhost:3000/api/employees/${updatedEmployee.empId}`,

            {

                method: "PUT",

                headers: {

                    "Content-Type":
                    "application/json"

                },

                body:
                JSON.stringify(updatedEmployee)

            }

        );

        await loadEmployees();

        clearForm();

        alert(
            "Employee updated successfully."
        );

    } catch(error) {

        console.error(error);

    }

}


// ========================================
// DELETE EMPLOYEE
// Removes employee from backend
// ========================================

async function deleteEmployee(index) {

    const answer = confirm(
        "Are you sure you want to delete this employee?"
    );

    if (!answer) {

        return;

    }

    try {

        // Get Employee ID
        const empId =
            employees[index].empId;

        await fetch(

            `http://localhost:3000/api/employees/${empId}`,

            {

                method: "DELETE"

            }

        );

        await loadEmployees();

        clearForm();

    } catch(error) {

        console.error(error);

    }

}

// ========================================
// SEARCH EMPLOYEE
// Filter employees and render results
// ========================================

function searchEmployee() {

    const keyword =
        document
            .getElementById(
                "searchBox"
            )
            .value
            .toLowerCase()
            .trim();

    const filteredEmployees =
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

    renderEmployeeTable(
        filteredEmployees
    );

}

// Dashboard Counters
function updateDashboard() {

    document.getElementById("totalEmployees").innerText =
        employees.length;

    document.getElementById("onBoardingEmployees").innerText =
        employees.filter(emp =>
            emp.status === "On Boarding"
        ).length;

    document.getElementById("activeEmployees").innerText =
        employees.filter(emp =>
            emp.status === "Active"
        ).length;

    document.getElementById("onLeaveEmployees").innerText =
        employees.filter(emp =>
            emp.status === "On Leave"
        ).length;

    document.getElementById("resignedEmployees").innerText =
        employees.filter(emp =>
            emp.status === "Resigned"
        ).length;

    document.getElementById("regularEmployees").innerText =
        employees.filter(emp =>
            emp.type === "Regular"
        ).length;

    document.getElementById("probationaryEmployees").innerText =
        employees.filter(emp =>
            emp.type === "Probationary"
        ).length;

    document.getElementById("contractualEmployees").innerText =
        employees.filter(emp =>
            emp.type === "Contractual"
        ).length;
}

// Clear Form
function clearForm() {

    document.getElementById("empId").value = "";
    document.getElementById("empName").value = "";
    document.getElementById("dateBirth").value = "";
    document.getElementById("address").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("department").value = "";
    document.getElementById("position").value = "";
    document.getElementById("dateHired").value = "";
    document.getElementById("type").value = "";
    document.getElementById("status").value = "";

    // Generate next employee ID
    generateEmployeeId();

    // Reset button states
    document.getElementById("editBtn").disabled = true;
    document.getElementById("addBtn").disabled = false;

    // Exit edit mode
    selectedEmployeeIndex = -1;

        // Clear validation messages

    document
        .querySelectorAll(".error")
        .forEach(error => {

            error.textContent = "";

        });

    // Remove validation styling

    document
        .querySelectorAll(
            ".input-error, .input-valid"
        )
        .forEach(field => {

            field.classList.remove(
                "input-error"
            );

            field.classList.remove(
                "input-valid"
            );

        });
}

// Clear All Employees in the Table and Local Storage
function clearAllEmployees() {

    let answer = confirm(
        "Are you sure you want to delete all employee records?"
    );

    if (answer) {
        employees = [];
        alert( "Clear All Employees feature not yet connected to backend.");

        displayEmployees();
        updateDashboard();
        generateEmployeeId();

        alert("All employee records have been deleted.");
    }
}

// ========================================
// Real-Time Validation Events
// ========================================

document
    .getElementById("empName")
    .addEventListener(
        "blur",
        validateEmployeeName
    );

document
    .getElementById("phone")
    .addEventListener(
        "blur",
        validatePhone
    );

document
    .getElementById("email")
    .addEventListener(
        "blur",
        validateEmail
    );

document
    .getElementById("department")
    .addEventListener(
        "blur",
        validateDepartment
    );

document
    .getElementById("position")
    .addEventListener(
        "blur",
        validatePosition
    );

document
    .getElementById("empName")
    .addEventListener(
        "input",
        validateEmployeeName
    );

document
    .getElementById("phone")
    .addEventListener(
        "input",
        validatePhone
    );

document
    .getElementById("email")
    .addEventListener(
        "input",
        validateEmail
    );

document
    .getElementById("department")
    .addEventListener(
        "input",
        validateDepartment
    );

document
    .getElementById("position")
    .addEventListener(
        "input",
        validatePosition
    );


// ========================================
// APPLICATION STARTUP
// Runs when page loads
// ========================================

window.onload = async function () {

    // Load dropdown values
    await loadLookups();

    // Load employee records
    await loadEmployees();

    // Generate next employee ID
    generateEmployeeId();

};