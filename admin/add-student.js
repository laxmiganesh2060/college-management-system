
document.getElementById('studentForm').addEventListener('submit', async function(e) {
  e.preventDefault(); // Prevent default form submission
  
  const formData = new FormData(this);
  
  try {
    const response = await fetch(`${baseUrl}/api/admin/students`, {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
});
