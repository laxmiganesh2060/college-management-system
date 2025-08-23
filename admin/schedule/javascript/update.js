const loadDepartment = document.getElementById('loadDepartment');
const loadLevel = document.getElementById('loadLevel');
const loadYearSem = document.getElementById('loadYearSem');
const loadScheduleBtn = document.getElementById('loadScheduleBtn');
const updateForm = document.getElementById('updateForm');

const departmentInput = document.getElementById('department');
const levelInput = document.getElementById('level');
const yearSemInput = document.getElementById('yearSem');

const semesters = [
  "1st Semester", "2nd Semester", "3rd Semester", "4th Semester",
  "5th Semester", "6th Semester", "7th Semester", "8th Semester"
];
const years = [
  "1st Year", "2nd Year", "3rd Year", "4th Year"
];

// Populate yearSem options based on department and level selection
function populateYearSemOptions() {
  const dep = loadDepartment.value;
  const lvl = loadLevel.value;

  loadYearSem.innerHTML = '<option value="">Select Year or Semester</option>';
  if (!dep || !lvl) return;

  if(dep === 'BCA') {
    semesters.forEach(s => {
      const option = document.createElement('option');
      option.value = s;
      option.textContent = s;
      loadYearSem.appendChild(option);
    });
  } else {
    if(years.includes(lvl)) {
      const option = document.createElement('option');
      option.value = lvl;
      option.textContent = lvl;
      loadYearSem.appendChild(option);
    }
  }
}

loadDepartment.addEventListener('change', () => {
  populateYearSemOptions();
  updateForm.style.display = 'none';
});
loadLevel.addEventListener('change', () => {
  populateYearSemOptions();
  updateForm.style.display = 'none';
});
loadYearSem.addEventListener('change', () => {
  updateForm.style.display = 'none';
});

// Load schedule matching dept, level, yearSem from localStorage
loadScheduleBtn.addEventListener('click', () => {
  document.querySelectorAll('.error-message').forEach(e => e.style.display = 'none');

  let valid = true;
  if (!loadDepartment.value) {
    document.getElementById('loadDepartmentError').style.display = 'block';
    valid = false;
  }
  if (!loadLevel.value) {
    document.getElementById('loadLevelError').style.display = 'block';
    valid = false;
  }
  if (!loadYearSem.value) {
    document.getElementById('loadYearSemError').style.display = 'block';
    valid = false;
  }
  if (!valid) return;

  const schedules = JSON.parse(localStorage.getItem('classSchedules') || '[]');

  const sched = schedules.find(s => 
    s.department === loadDepartment.value &&
    s.level === loadLevel.value &&
    s.yearSem === loadYearSem.value
  );

  if (!sched) {
    alert('No schedule found for the selected Department, Level, and Year/Semester.');
    updateForm.style.display = 'none';
    return;
  }

  updateForm.style.display = 'block';

  document.getElementById('teacher').value = sched.teacher || '';
  document.getElementById('day').value = sched.day || '';
  document.getElementById('startTime').value = sched.startTime || '';
  document.getElementById('endTime').value = sched.endTime || '';
  document.getElementById('subject').value = sched.subject || '';

  departmentInput.value = sched.department || '';
  levelInput.value = sched.level || '';
  yearSemInput.value = sched.yearSem || '';
});

updateForm.addEventListener('submit', e => {
  e.preventDefault();

  updateForm.querySelectorAll('.error-message').forEach(e => e.style.display = 'none');

  let valid = true;

  if (!updateForm.teacher.value.trim()) {
    document.getElementById('teacherError').style.display = 'block';
    valid = false;
  }

  if (!updateForm.day.value) {
    document.getElementById('dayError').style.display = 'block';
    valid = false;
  }

  const startTime = updateForm.startTime.value;
  const endTime = updateForm.endTime.value;
  if (!startTime || !endTime || startTime >= endTime) {
    document.getElementById('timeError').style.display = 'block';
    valid = false;
  }

  if (!updateForm.subject.value.trim()) {
    document.getElementById('subjectError').style.display = 'block';
    valid = false;
  }

  if (!valid) return;

  const schedules = JSON.parse(localStorage.getItem('classSchedules') || '[]');

  const index = schedules.findIndex(s =>
    s.department === departmentInput.value &&
    s.level === levelInput.value &&
    s.yearSem === yearSemInput.value
  );

  if (index === -1) {
    alert('Schedule not found. Please load a schedule first.');
    return;
  }

  schedules[index] = {
    teacher: updateForm.teacher.value.trim(),
    day: updateForm.day.value,
    startTime,
    endTime,
    department: departmentInput.value,
    level: levelInput.value,
    yearSem: yearSemInput.value,
    subject: updateForm.subject.value.trim()
  };

  localStorage.setItem('classSchedules', JSON.stringify(schedules));

  alert('Schedule updated successfully!');
  updateForm.style.display = 'none';
  loadDepartment.value = '';
  loadLevel.value = '';
  loadYearSem.innerHTML = '<option value="">Select Year or Semester</option>';
});
