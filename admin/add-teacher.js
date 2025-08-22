// const form = document.getElementById("teacherForm");
// const imageInput = document.getElementById("teacherImage");
// const imagePreview = document.getElementById("imagePreview");

// imageInput.addEventListener("change", function () {
//   const file = this.files[0];
//   if (file) {
//     imagePreview.style.display = "block";
//     imagePreview.src = URL.createObjectURL(file);
//   } else {
//     imagePreview.style.display = "none";
//     imagePreview.src = "";
//   }
// });

// form.addEventListener("submit", function (event) {
//   const errors = form.querySelectorAll(".error-message");
//   errors.forEach((error) => (error.style.display = "none"));
//   let valid = true;

//   const teacherId = form.teacherId.value.trim();
//   if (teacherId === "") {
//     document.getElementById("teacherIdError").style.display = "block";
//     valid = false;
//   }

//   const fullName = form.fullName.value.trim();
//   if (fullName === "") {
//     document.getElementById("fullNameError").style.display = "block";
//     valid = false;
//   }

//   const email = form.email.value.trim();
//   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailPattern.test(email)) {
//     document.getElementById("emailError").style.display = "block";
//     valid = false;
//   }

//   const phone = form.phone.value.trim();
//   const phonePattern = /^[0-9]{7,15}$/;
//   if (!phonePattern.test(phone)) {
//     document.getElementById("phoneError").style.display = "block";
//     valid = false;
//   }

//   const department = form.department.value;
//   if (department === "") {
//     document.getElementById("departmentError").style.display = "block";
//     valid = false;
//   }

//   const password = form.password.value;
//   if (password.length < 6) {
//     document.getElementById("passwordError").style.display = "block";
//     valid = false;
//   }

//   const confirmPassword = form.confirmPassword.value;
//   if (password !== confirmPassword) {
//     document.getElementById("confirmPasswordError").style.display = "block";
//     valid = false;
//   }

//   const image = imageInput.files[0];
//   if (!image) {
//     document.getElementById("imageError").style.display = "block";
//     valid = false;
//   }

//   if (!valid) {
//     event.preventDefault();
//   }
// });


const baseUrl = "http://127.0.0.1:3000";

const loader = document.getElementById('loaderOverlay');
const snackbar = document.getElementById('snackbar');

function showLoader() {
  loader.style.display = 'flex';
}
function hideLoader() {
  loader.style.display = 'none';
}

function showSnackbar(message, type = 'success') {
  snackbar.textContent = message;
  snackbar.className = ''; // reset
  snackbar.classList.add('show', type);
  
  setTimeout(() => {
    snackbar.classList.remove('show');
  }, 3000);
}

document.getElementById('teacherForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const formData = new FormData(this);

  try {
    showLoader();
    const response = await fetch(`${baseUrl}/api/admin/teachers`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    const result = await response.json();
    hideLoader();

    if (response.ok) {
      showSnackbar('Teacher created successfully!', 'success');
      this.reset();
    } else {
      console.log("Error: " + result
      );
      showSnackbar(result.message || 'Failed to create teacher', 'error');
    }
  } catch (error) {
    hideLoader();
    console.log("Error: " + error
      )
    showSnackbar('Error: ' + error.message, 'error');
  }
});