// localhost
// const serverUrl = "http://localhost:3000";

// hosting
const serverUrl = "https://cms-backend-w9vz.onrender.com";


// Configuration
const API_CONFIG = {
    baseUrl: 'http://127.0.0.1:3000/api/admin', 
    endpoints: {
        teachers: '/teachers',
        deleteTeacher: '/teachers', // Will append /{id} for DELETE
        updateTeacher: '/teachers'  // Will append /{id} for PUT
    }
};

// DOM Elements
const loadingElement = document.getElementById('loading');
const teachersGrid = document.getElementById('teachersGrid');
const emptyState = document.getElementById('emptyState');
const statsElement = document.getElementById('stats');
const totalTeachersElement = document.getElementById('totalTeachers');

// State
let teachers = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    fetchTeachers();
});

// Fetch teachers from API
async function fetchTeachers() {
    try {
        showLoading();
        
        const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.teachers}`, {
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
        teachers = Array.isArray(data) ? data : (data.teachers || data.data || []);
        
        hideLoading();
        displayTeachers();
        updateStats();
        
    } catch (error) {
        hideLoading();
        showError(`Error fetching teachers: ${error.message}`);
        console.error('Fetch error:', error);
    }
}

// Display teachers in the grid
function displayTeachers() {
    teachersGrid.innerHTML = '';
    
    if (teachers.length === 0) {
        showEmptyState();
        return;
    }

    hideEmptyState();
    
    teachers.forEach(teacher => {
        const teacherCard = createTeacherCard(teacher);
        teachersGrid.appendChild(teacherCard);
    });
}

// Create individual teacher card
function createTeacherCard(teacher) {
    const card = document.createElement('div');
    card.className = 'teacher-card';
    card.setAttribute('data-teacher-id', teacher.id);

    const name = `${teacher.user.firstName} ${teacher.user.lastName}`;
    const address = teacher.address || teacher.location || teacher.city || 'Address not provided';
    const email = teacher.user.email;
    const image = `${serverUrl}${teacher.user.image}`;



    card.innerHTML = `
        <img src="${image}" alt="${name}" class="teacher-image" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=667eea&color=fff&size=80' origin='anonymous'">
        <div class="teacher-info">
            <div class="teacher-name">${name}</div>
            <div class="teacher-address">${address}</div>
            ${email ? `<div class="teacher-email">${email}</div>` : ''}
        </div>
        <div class="teacher-actions">
            <button class="action-btn edit-btn" onclick="editTeacher(${teacher.id})">Edit</button>
            <button class="action-btn delete-btn" onclick="deleteTeacher(${teacher.id})">Delete</button>
        </div>
    `;

    return card;
}

// Edit teacher function
async function editTeacher(teacherId) {
    const teacher = teachers.find(t => t.id === teacherId);
    if (!teacher) {
        alert('Teacher not found!');
        return;
    }

    const name = prompt('Enter teacher name:', teacher.name || '');
    const address = prompt('Enter teacher address:', teacher.address || '');
    const email = prompt('Enter teacher email:', teacher.email || '');

    if (name === null) return;

    const updatedTeacher = {
        ...teacher,
        name: name,
        address: address,
        email: email
    };

    try {
        const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.updateTeacher}/${teacherId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(updatedTeacher)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const index = teachers.findIndex(t => t.id === teacherId);
        if (index !== -1) {
            teachers[index] = updatedTeacher;
            displayTeachers();
        }

        alert('Teacher updated successfully!');
        
    } catch (error) {
        alert(`Error updating teacher: ${error.message}`);
        console.error('Update error:', error);
    }
}

// Delete teacher function
async function deleteTeacher(teacherId) {
    const teacher = teachers.find(t => t.id === teacherId);
    if (!teacher) {
        alert('Teacher not found!');
        return;
    }

    const confirmDelete = confirm(`Are you sure you want to delete ${teacher.name || 'this teacher'}?`);
    if (!confirmDelete) return;

    try {
        const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.deleteTeacher}/${teacherId}`, {
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

        teachers = teachers.filter(t => t.id !== teacherId);
        displayTeachers();
        updateStats();

        alert('Teacher deleted successfully!');
        
    } catch (error) {
        alert(`Error deleting teacher: ${error.message}`);
        console.error('Delete error:', error);
    }
}

// Update statistics
function updateStats() {
    totalTeachersElement.textContent = teachers.length;
    
    if (teachers.length > 0) {
        statsElement.style.display = 'flex';
    } else {
        statsElement.style.display = 'none';
    }
}

// Show loading state
function showLoading() {
    loadingElement.style.display = 'block';
    teachersGrid.style.display = 'none';
    emptyState.style.display = 'none';
    statsElement.style.display = 'none';
}

// Hide loading state
function hideLoading() {
    loadingElement.style.display = 'none';
    teachersGrid.style.display = 'grid';
}

// Show empty state
function showEmptyState() {
    emptyState.style.display = 'block';
    teachersGrid.style.display = 'none';
}

// Hide empty state
function hideEmptyState() {
    emptyState.style.display = 'none';
}

// Show error message
function showError(message) {
    const existingError = document.querySelector('.error');
    if (existingError) existingError.remove();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    
    const container = document.querySelector('.container');
    container.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Refresh teachers data
function refreshTeachers() {
    fetchTeachers();
}

// Export functions for global access
window.editTeacher = editTeacher;
window.deleteTeacher = deleteTeacher;
window.refreshTeachers = refreshTeachers;
