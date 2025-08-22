const baseUrl = "http://localhost:3000";

// function showSection(id) {
//   document.querySelectorAll('.section').forEach(section => {
//     section.classList.remove('active');
//   });
//   document.getElementById(id).classList.add('active');
// }

// // Default to dashboard
// showSection('dashboard');

// document.getElementById('loginForm').addEventListener('submit', async function (event) {
//   event.preventDefault();

//   const formData = new FormData(this);
//   const json = Object.fromEntries(formData);      // → {firstName: "...", age: "..."}

//   try {
//     const response = await fetch(`${baseUrl}/api/auth/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(json),
//       credentials: 'include'
//     });

//     const result = (await response.json())['data'];

//     console.log('Success:', result);

//     if(result['status'] === 'error') {
//       alert(result['message'] ?? "Cannot login");
//       return;
//     }

//     document.cookie = `accessToken=${result["accessToken"]}`;
//     document.cookie = `refreshToken=${result['refreshToken']}`;
//     document.cookie = `email=${result['user']["email"]}`;
//     document.cookie = `profile=${result['user']["image"]}`;
//     document.cookie = `firstName=${result['user']["firstName"]}`;
//     document.cookie = `lastName=${result['user']["lastName"]}`;

//     switch (result.user.role) {
//       case 'ADMIN':
//         window.location.href = '/admin/adminpanel.html';
//         break;
//       case 'STUDENT':
//         window.location.href = '/student/studentlastpanel.html';
//         break;
//       case 'TEACHER':
//         window.location.href = '/teacher/teacherpanel.html';
//         break;
//       default:
//         console.error('Unknown role:', result.data.user.role);
//         throw new Error('Invalid user role');
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     alert(result);
//   }

// });

const loader = document.getElementById("loaderOverlay");
const snackbar = document.getElementById("snackbar");

function showLoader() {
  loader.style.display = "flex";
}
function hideLoader() {
  loader.style.display = "none";
}

function showSnackbar(message, type = "success") {
  snackbar.textContent = message;
  snackbar.className = ""; // reset
  snackbar.classList.add("show", type);

  setTimeout(() => {
    snackbar.classList.remove("show");
  }, 3000);
}

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const json = Object.fromEntries(formData);

    try {
      showLoader();

      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(json),
        credentials: "include",
      });

      if (!response.ok) {
        hideLoader();
        showSnackbar("Invalid Credential!", "error");
        return;
      }

      const result = (await response.json())["data"];

      console.log(result);

      hideLoader();

      if (result["status"] === "error") {
        showSnackbar(result["message"] ?? "Cannot login", "error");
        return;
      }

      // Store cookies
      document.cookie = `accessToken=${result["accessToken"]}`;
      document.cookie = `refreshToken=${result["refreshToken"]}`;
      document.cookie = `email=${result["user"]["email"]}`;
      document.cookie = `profile=${result["user"]["image"]}`;
      document.cookie = `firstName=${result["user"]["firstName"]}`;
      document.cookie = `lastName=${result["user"]["lastName"]}`;

      showSnackbar("Login successful!", "success");

      // Redirect based on role
      setTimeout(() => {
        switch (result.user.role) {
          case "ADMIN":
            window.location.href = "/admin/adminpanel.html";
            break;
          case "STUDENT":
            window.location.href = "/student/studentlastpanel.html";
            break;
          case "TEACHER":
            window.location.href = "/teacher/teacherpanel.html";
            break;
          default:
            console.error("Unknown role:", result.user.role);
            throw new Error("Invalid user role");
        }
      }, 1000);
    } catch (error) {
      hideLoader();
      console.error("Error:", error);
      showSnackbar("Error: " + error.message, "error");
    }
  });

// If fetching from backend later:
// const studentData = { name: "Bishika Chaudhary", photo: "your-photo-url.jpg" };
// document.getElementById('student-name').textContent = studentData.name;
// document.getElementById('student-photo').src = studentData.photo;
