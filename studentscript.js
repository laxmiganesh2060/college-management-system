function showSection(id) {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

// Default to dashboard
showSection('dashboard');

// If fetching from backend later:
// const studentData = { name: "Bishika Chaudhary", photo: "your-photo-url.jpg" };
// document.getElementById('student-name').textContent = studentData.name;
// document.getElementById('student-photo').src = studentData.photo;
