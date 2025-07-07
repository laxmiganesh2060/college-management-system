const baseUrl = "http://127.0.0.1:3000";

document.getElementById('studentForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  
  try {
    const response = await fetch(`${baseUrl}/api/admin/students`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    
    const result = await response.json();
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
});
