document.addEventListener("DOMContentLoaded", function () {
  const profileDropdown = document.getElementById("profileDropdown");

  profileDropdown.addEventListener("click", function (event) {
    event.stopPropagation();
    profileDropdown.classList.toggle("open");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function () {
    profileDropdown.classList.remove("open");
  });
});
