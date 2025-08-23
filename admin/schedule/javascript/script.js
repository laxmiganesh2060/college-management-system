const departmentSelect = document.getElementById('department');
const yearSemSelect = document.getElementById('yearSem');
const form = document.getElementById('scheduleForm');

const semesters = [
  "1st Semester", "2nd Semester", "3rd Semester", "4th Semester",
  "5th Semester", "6th Semester", "7th Semester", "8th Semester"
];
const years = [
  "1st Year", "2nd Year", "3rd Year", "4th Year"
];

departmentSelect.addEventListener('change', function () {
  const selected = departmentSelect.value;
  yearSemSelect.innerHTML = '<option value="">Select Year or Semester</option>';
  const options = selected === "BCA" ? semesters : years;

  options.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item;
    opt.textContent = item;
    yearSemSelect.appendChild(opt);
  });
});

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Clear all previous errors
  const errors = form.querySelectorAll('.error-message');
  errors.forEach(err => err.style.display = 'none');

  let valid = true;

  // Validate teacher name
  if (!form.teacher.value.trim()) {
    document.getElementById('teacherError').style.display = 'block';
    valid = false;
  }

  // Validate day
  if (!form.day.value) {
    document.getElementById('dayError').style.display = 'block';
    valid = false;
  }

  // Validate times
  const startTime = form.startTime.value;
  const endTime = form.endTime.value;
  if (!startTime || !endTime || startTime >= endTime) {
    document.getElementById('timeError').style.display = 'block';
    valid = false;
  }

  // Validate department
  if (!departmentSelect.value) {
    document.getElementById('departmentError').style.display = 'block';
    valid = false;
  }

  // Validate year/semester
  if (!yearSemSelect.value) {
    document.getElementById('yearSemError').style.display = 'block';
    valid = false;
  }

  // Validate subject
  if (!form.subject.value.trim()) {
    document.getElementById('subjectError').style.display = 'block';
    valid = false;
  }

  if (!valid) return;

  // Save to localStorage
  const schedule = {
    teacher: form.teacher.value.trim(),
    day: form.day.value,
    time: `${startTime} - ${endTime}`,
    department: departmentSelect.value,
    yearSem: yearSemSelect.value,
    subject: form.subject.value.trim()
  };

  let schedules = JSON.parse(localStorage.getItem('classSchedules') || '[]');
  schedules.push(schedule);
  localStorage.setItem('classSchedules', JSON.stringify(schedules));

  alert("Class schedule saved successfully!");
  form.reset();
  yearSemSelect.innerHTML = '<option value="">Select Year or Semester</option>';
});
