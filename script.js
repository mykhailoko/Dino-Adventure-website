document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('.arrow a, .header a[href^="#"], .footer a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            } else if (targetId === "#header") {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Флаг для отслеживания начала генерирования текста
    let aboutUsTextGenerated = false;
    function typeEffect(element, speed) {
        const originalText = element.textContent; // Сохраняем исходный текст
        const originalDisplay = getComputedStyle(element).display; // Получаем текущее значение display
    
        // Очищаем содержимое элемента
        element.textContent = '';
    
        // Создаем новый элемент span для каждого символа текста
        for (let i = 0; i < originalText.length; i++) {
            const charSpan = document.createElement('span');
            charSpan.textContent = originalText.charAt(i);
            charSpan.style.opacity = '0'; // Устанавливаем начальную непрозрачность 0
            charSpan.style.transition = `opacity ${speed / 1000}s`; // Добавляем анимацию появления
            element.appendChild(charSpan);
        }
    
        // Задаем небольшую задержку перед запуском анимации появления каждого символа
        let charIndex = 0;
        const revealText = () => {
            const charSpans = element.querySelectorAll('span');
            if (charIndex < charSpans.length) {
                charSpans[charIndex].style.opacity = '1';
                charIndex++;
                setTimeout(revealText, speed);
            }
        };
    
        // Начинаем анимацию появления текста
        revealText();
    }    
    
    // Добавляем событие прокрутки, чтобы начать генерирование текста при достижении секции ABOUT US
    window.addEventListener('scroll', function() {
        const aboutUsSection = document.getElementById('aboutus');
        const distanceToAboutUs = aboutUsSection.getBoundingClientRect().top;

        if (!aboutUsTextGenerated && distanceToAboutUs < window.innerHeight * 0.5 && distanceToAboutUs > -aboutUsSection.offsetHeight * 0.5) {
            const aboutUsTexts = document.querySelectorAll('#aboutus .aboutustext');
            aboutUsTexts.forEach(text => typeEffect(text, 50));
            aboutUsTextGenerated = true; // Устанавливаем флаг, чтобы генерирование текста произошло только один раз
        }
    });

    // Анимация изображений при прокрутке
    const animateImages = document.querySelectorAll('.animate-img');

    function checkVisibility() {
        animateImages.forEach(img => {
            const rect = img.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;

            // Проверяем, если изображение видно хотя бы частично
            if (rect.top <= windowHeight * 0.75 && rect.bottom >= 0) {
                img.style.opacity = 1; // Плавно отображаем изображение
            }
        });
    }

    // Вызываем функцию проверки видимости при загрузке страницы и при прокрутке
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
});
