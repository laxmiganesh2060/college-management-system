
      const sidebar = document.getElementById("sidebar");
      const main = document.getElementById("main");
      document.getElementById("toggleSidebar").addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
        main.classList.toggle("collapsed");
      });
      const profile = document.getElementById("profileDropdown");
      profile.addEventListener("click", () => profile.classList.toggle("open"));
      function showSection(sectionId) {
        [
          "dashboardContent",
          "attendanceSection",
          "scheduleSection",
          "profileSection",
          "editprofile",
        ].forEach((id) => {
          document.getElementById(id).style.display = "none";
        });
        document.getElementById(sectionId).style.display = "block";

        // Sync sidebar height when content changes
        syncSidebarHeight();
      }

      function syncSidebarHeight() {
        const sidebar = document.getElementById("sidebar");
        const main = document.getElementById("main");
        const mainHeight = main.scrollHeight;
        const viewportHeight = window.innerHeight;
        sidebar.style.minHeight = Math.max(mainHeight, viewportHeight) + "px";
      }

      // Run on page load
      window.addEventListener("load", syncSidebarHeight);
      // Run on window resize
      window.addEventListener("resize", syncSidebarHeight);