
      // Sidebar Toggle
      document
        .getElementById("toggleSidebar")
        .addEventListener("click", function () {
          document.getElementById("sidebar").classList.toggle("collapsed");
          document.getElementById("main").classList.toggle("collapsed");
        });

      // Profile Dropdown
      const profile = document.getElementById("profileDropdown");
      profile.addEventListener("click", function () {
        profile.classList.toggle("open");
      });

      // Section Switcher
      function showSection(sectionId) {
        const sections = [
          "adminDashboard",
          "manageStudents",
          "manageTeachers",
          "manageNotices",
          "adminProfile",
        ];
        sections.forEach((id) => {
          document.getElementById(id).style.display = "none";
        });
        document.getElementById(sectionId).style.display = "block";
      }

      // Toggle submenu visibility
      function toggleSubmenu(id) {
        const submenu = document.getElementById(id);
        submenu.style.display =
          submenu.style.display === "block" ? "none" : "block";
      }