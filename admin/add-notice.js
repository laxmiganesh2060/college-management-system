const baseUrl = "http://localhost:3000";

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

document.getElementById('noticeForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const formData = new FormData(this);

  try {
    showLoader();
    const response = await fetch(`${baseUrl}/api/admin/notices`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    const result = await response.json();
    hideLoader();

    if (response.ok) {
      showSnackbar('Notice created successfully!', 'success');
      this.reset();
    } else {
      showSnackbar(result.message || 'Failed to create notice', 'error');
    }
  } catch (error) {
    hideLoader();
    showSnackbar('Error: ' + error.message, 'error');
  }
});
