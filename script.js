function loginUser() {
    const role = document.getElementById('role').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Fake check (Replace with real validation)
    if (username && password) {
        if (role === 'student') {
            window.location.href = "dashboard.html?role=student";
        } else {
            window.location.href = "dashboard.html?role=teacher";
        }
    } else {
        alert("Enter valid credentials");
    }
    return false;
}
