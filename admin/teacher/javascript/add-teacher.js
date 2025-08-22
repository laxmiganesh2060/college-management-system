// localhost
// const baseUrl = "http://localhost:3000";

// hosting
const baseUrl = "https://cms-backend-w9vz.onrender.com";


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