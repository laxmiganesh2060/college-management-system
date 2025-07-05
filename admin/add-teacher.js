    const form = document.getElementById('teacherForm');
    const imageInput = document.getElementById('teacherImage');
    const imagePreview = document.getElementById('imagePreview');

    imageInput.addEventListener('change', function () {
      const file = this.files[0];
      if (file) {
        imagePreview.style.display = 'block';
        imagePreview.src = URL.createObjectURL(file);
      } else {
        imagePreview.style.display = 'none';
        imagePreview.src = "";
      }
    });

    form.addEventListener('submit', function(event) {
      const errors = form.querySelectorAll('.error-message');
      errors.forEach(error => error.style.display = 'none');
      let valid = true;

      const teacherId = form.teacherId.value.trim();
      if (teacherId === '') {
        document.getElementById('teacherIdError').style.display = 'block';
        valid = false;
      }

      const fullName = form.fullName.value.trim();
      if (fullName === '') {
        document.getElementById('fullNameError').style.display = 'block';
        valid = false;
      }

      const email = form.email.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        document.getElementById('emailError').style.display = 'block';
        valid = false;
      }

      const phone = form.phone.value.trim();
      const phonePattern = /^[0-9]{7,15}$/;
      if (!phonePattern.test(phone)) {
        document.getElementById('phoneError').style.display = 'block';
        valid = false;
      }

      const department = form.department.value;
      if (department === '') {
        document.getElementById('departmentError').style.display = 'block';
        valid = false;
      }

      const password = form.password.value;
      if (password.length < 6) {
        document.getElementById('passwordError').style.display = 'block';
        valid = false;
      }

      const confirmPassword = form.confirmPassword.value;
      if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').style.display = 'block';
        valid = false;
      }

      const image = imageInput.files[0];
      if (!image) {
        document.getElementById('imageError').style.display = 'block';
        valid = false;
      }

      if (!valid) {
        event.preventDefault();
      }
    });