// students.js

const serverUrl = 'http://127.0.0.1:3000/';

// Configuration
const API_CONFIG = {
    baseUrl: 'http://127.0.0.1:3000/api/admin', // Change this to your actual API URL
    endpoints: {
        students: '/students',
        deleteStudent: '/students', // Will append /{id} for DELETE
        updateStudent: '/students'  // Will append /{id} for PUT
    }
};

// DOM Elements
const loadingElement = document.getElementById('loading');
const studentsGrid = document.getElementById('studentsGrid');
const emptyState = document.getElementById('emptyState');
const statsElement = document.getElementById('stats');
const totalStudentsElement = document.getElementById('totalStudents');

// State
let students = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    fetchStudents();
});

// Fetch students from API
async function fetchStudents() {
    try {
        showLoading();
        
        const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.students}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Handle different response structures
        students = Array.isArray(data) ? data : (data.students || data.data || []);
        
        hideLoading();
        displayStudents();
        updateStats();
        
    } catch (error) {
        hideLoading();
        showError(`Error fetching students: ${error.message}`);
        console.error('Fetch error:', error);
    }
}

// Display students in the grid
function displayStudents() {
    studentsGrid.innerHTML = '';
    
    if (students.length === 0) {
        showEmptyState();
        return;
    }

    hideEmptyState();
    
    students.forEach(student => {
        const studentCard = createStudentCard(student);
        studentsGrid.appendChild(studentCard);
    });
}

// Create individual student card
function createStudentCard(student) {
    const card = document.createElement('div');
    card.className = 'student-card';
    card.setAttribute('data-student-id', student.id);

    // Handle different possible field names
    const name = `${student.user.firstName} ${student.user.lastName}`;
    const address = student.address || student.location || student.city || 'Address not provided';
    const email = student.user.email;
    const image = `${serverUrl}${student.user.image}`;

    card.innerHTML = `
        <img src="${image}" alt="${name}" class="student-image" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=667eea&color=fff&size=80'">
        <div class="student-info">
            <div class="student-name">${name}</div>
            <div class="student-address">${address}</div>
            ${email ? `<div class="student-email">${email}</div>` : ''}
        </div>
        <div class="student-actions">
            <button class="action-btn edit-btn" onclick="editStudent(${student.id})">Edit</button>
            <button class="action-btn delete-btn" onclick="deleteStudent(${student.id})">Delete</button>
        </div>
    `;

    return card;
}

// Edit student function
async function editStudent(studentId) {
    const student = students.find(s => s.id === studentId);
    if (!student) {
        alert('Student not found!');
        return;
    }

    // Simple prompt-based editing (you can replace this with a modal)
    const name = prompt('Enter student name:', student.name || '');
    const address = prompt('Enter student address:', student.address || '');
    const email = prompt('Enter student email:', student.email || '');

    if (name === null) return; // User cancelled

    const updatedStudent = {
        ...student,
        name: name,
        address: address,
        email: email
    };

    try {
        const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.updateStudent}/${studentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(updatedStudent)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Update local data
        const index = students.findIndex(s => s.id === studentId);
        if (index !== -1) {
            students[index] = updatedStudent;
            displayStudents();
        }

        alert('Student updated successfully!');
        
    } catch (error) {
        alert(`Error updating student: ${error.message}`);
        console.error('Update error:', error);
    }
}

// Delete student function
async function deleteStudent(studentId) {
    const student = students.find(s => s.id === studentId);
    if (!student) {
        alert('Student not found!');
        return;
    }

    const confirmDelete = confirm(`Are you sure you want to delete ${student.name || 'this student'}?`);
    if (!confirmDelete) return;

    try {
        const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.deleteStudent}/${studentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Remove from local data
        students = students.filter(s => s.id !== studentId);
        displayStudents();
        updateStats();

        alert('Student deleted successfully!');
        
    } catch (error) {
        alert(`Error deleting student: ${error.message}`);
        console.error('Delete error:', error);
    }
}

// Update statistics
function updateStats() {
    totalStudentsElement.textContent = students.length;
    
    if (students.length > 0) {
        statsElement.style.display = 'flex';
    } else {
        statsElement.style.display = 'none';
    }
}

// Show loading state
function showLoading() {
    loadingElement.style.display = 'block';
    studentsGrid.style.display = 'none';
    emptyState.style.display = 'none';
    statsElement.style.display = 'none';
}

// Hide loading state
function hideLoading() {
    loadingElement.style.display = 'none';
    studentsGrid.style.display = 'grid';
}

// Show empty state
function showEmptyState() {
    emptyState.style.display = 'block';
    studentsGrid.style.display = 'none';
}

// Hide empty state
function hideEmptyState() {
    emptyState.style.display = 'none';
}

// Show error message
function showError(message) {
    // Remove existing error
    const existingError = document.querySelector('.error');
    if (existingError) existingError.remove();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    
    const container = document.querySelector('.container');
    container.appendChild(errorDiv);
    
    // Auto-remove error after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Refresh students data
function refreshStudents() {
    fetchStudents();
}

// Export functions for global access (if needed)
window.editStudent = editStudent;
window.deleteStudent = deleteStudent;
window.refreshStudents = refreshStudents;