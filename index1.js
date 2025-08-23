 function toggleMessage() {
            const preview = document.getElementById('message-preview');
            const full = document.getElementById('message-full');
            const btn = document.getElementById('toggleBtn');

            if (full.style.display === "none") {
                full.style.display = "block";
                preview.style.display = "none";
                btn.textContent = "Read Less";
            } else {
                full.style.display = "none";
                preview.style.display = "block";
                btn.textContent = "Read More";
            }
        }

        let slideIndex = 0;
        const slides = document.querySelectorAll('.carousel img');

        function showSlides() {
            slides.forEach((slide, index) => {
                slide.classList.remove('active');
            });
            slideIndex++;
            if (slideIndex > slides.length) slideIndex = 1;
            slides[slideIndex - 1].classList.add('active');
            setTimeout(showSlides, 3000);
        }

        window.onload = showSlides;