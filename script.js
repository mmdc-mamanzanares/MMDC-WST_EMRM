let employees = JSON.parse(localStorage.getItem("employees")) || [];
let selectedEmployeeIndex = -1;

// Auto Generate Employee ID
function generateEmployeeId() {

    // Don't generate a new ID when editing
    if (selectedEmployeeIndex !== -1) {
        return;
    }

    const currentYear = new Date().getFullYear();

    let nextNumber = 1;

    if (employees.length > 0) {

        let lastEmployee =
            employees[employees.length - 1];

        let lastID =
            lastEmployee.empId;

        let lastNumber =
            parseInt(lastID.split("-")[1]);

        nextNumber = lastNumber + 1;
    }

    let employeeId =
        currentYear +
        "-" +
        String(nextNumber).padStart(4, "0");

    document.getElementById("empId").value =
        employeeId;
}


// Validate Form Entries
function validateForm(employee) {

    // Employee Name: letters and spaces only
    const namePattern = /^[A-Za-z\s]+$/;

    // Address: letters, numbers, spaces, . , # ( ) -
    const addressPattern = /^[A-Za-z0-9\s.,#()\-]+$/;

    // Phone: numbers only, 11 digits
    const phonePattern = /^\d{11}$/;

    // Email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Department: letters and spaces only
    const departmentPattern = /^[A-Za-z\s]+$/;

    // Position: letters and spaces only
    const positionPattern = /^[A-Za-z\s]+$/;

    if (!namePattern.test(employee.empName)) {
        alert("Employee Name must contain letters only.");
        return false;
    }

    if (
        employee.address !== "" &&
        !addressPattern.test(employee.address)
    ) {
        alert("Address contains invalid characters.");
        return false;
    }

    if (!phonePattern.test(employee.phone)) {
        alert("Phone Number must be exactly 11 digits.");
        return false;
    }

    if (!emailPattern.test(employee.email)) {
        alert("Enter a valid Email Address.");
        return false;
    }

    if (!departmentPattern.test(employee.department)) {
        alert("Department must contain letters only.");
        return false;
    }

    if (!positionPattern.test(employee.position)) {
        alert("Position must contain letters only.");
        return false;
    }

    return true;
}

// Add Employee
function addEmployee() {

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

    // Validation
    if (
        employee.empId === "" ||
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
        alert("Please complete all required fields.");
        return;
    }

    // Check for duplicate Employee ID
    let duplicate = employees.find(
        emp => emp.empId === employee.empId
    );

    if (duplicate) {
        alert("Employee ID already exists.");
        return;
    }

    if (!validateForm(employee)) {
        return;
    }

    employees.push(employee);

    // Converts the array into text and saves it in local storage
    localStorage.setItem("employees", JSON.stringify(employees));

    displayEmployees();
    updateDashboard();
    clearForm();

    alert("Employee added successfully!");
}

// Display Employees
function displayEmployees() {

    let tableBody = document.getElementById("employeeTableBody");

    tableBody.innerHTML = "";

    employees.forEach((employee, index) => {

        tableBody.innerHTML += `
            <tr>
                <td>${employee.empId}</td>
                <td>${employee.empName}</td>
                <td>${employee.department}</td>
                <td>${employee.position}</td>
                <td>${employee.dateHired}</td>
                <td>${employee.type}</td>
                <td>${employee.status}</td>
                <td>
                    <button onclick="selectEmployee(${index})">
                        Edit
                    </button>

                    <button onclick="deleteEmployee(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
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

// Update Employee
function updateEmployee() {

    if (selectedEmployeeIndex === -1) {
        alert("Select an employee first.");
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

    if (!validateForm(updatedEmployee)) {
        return;
    }

    employees[selectedEmployeeIndex] = updatedEmployee;

    employees[selectedEmployeeIndex] = {
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

    localStorage.setItem("employees", JSON.stringify(employees));

    displayEmployees();
    updateDashboard();

    selectedEmployeeIndex = -1;

    document.getElementById("editBtn").disabled = true;
    document.getElementById("addBtn").disabled = false;

    clearForm();

    alert("Employee updated successfully!");
}

// Delete Employee
function deleteEmployee(index) {

    let confirmDelete = confirm(
        "Are you sure you want to delete this employee?"
    );

    if (confirmDelete) {

        employees.splice(index, 1);
        selectedEmployeeIndex = -1;

        displayEmployees();
        updateDashboard();
        localStorage.setItem("employees", JSON.stringify(employees));
    }

    generateEmployeeId();

    document.getElementById("editBtn").disabled = true;
    document.getElementById("addBtn").disabled = false;
}

// Search Employee
function searchEmployee() {

    let keyword = document
        .getElementById("searchBox")
        .value
        .toLowerCase();

    let tableBody = document.getElementById("employeeTableBody");

    tableBody.innerHTML = "";

    employees.forEach((employee, index) => {

        if (
            employee.empId.toLowerCase().includes(keyword) ||
            employee.empName.toLowerCase().includes(keyword) ||
            employee.department.toLowerCase().includes(keyword) ||
            employee.position.toLowerCase().includes(keyword)
        ) {

            tableBody.innerHTML += `
                <tr>
                    <td>${employee.empId}</td>
                    <td>${employee.empName}</td>
                    <td>${employee.department}</td>
                    <td>${employee.position}</td>
                    <td>${employee.dateHired}</td>
                    <td>${employee.type}</td>
                    <td>${employee.status}</td>
                    <td>
                        <button onclick="selectEmployee(${index})">
                            Edit
                        </button>

                        <button onclick="deleteEmployee(${index})">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        }
    });
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

    generateEmployeeId();

    document.getElementById("editBtn").disabled = true;
    document.getElementById("addBtn").disabled = false;

    selectedEmployeeIndex = -1;
}

// Clear All Employees in the Table and Local Storage
function clearAllEmployees() {

    let answer = confirm(
        "Are you sure you want to delete all employee records?"
    );

    if (answer) {
        employees = [];
        localStorage.removeItem("employees");

        displayEmployees();
        updateDashboard();
        generateEmployeeId();

        alert("All employee records have been deleted.");
    }
}

/* Startup Initialization */
window.onload = function () {
    updateDashboard();
    displayEmployees();
    generateEmployeeId();
};