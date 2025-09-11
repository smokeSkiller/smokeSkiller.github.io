    // Начальное время (в секундах)
    let totalSeconds = document.getElementById('timer').getAttribute('data-total-seconds'); // 12 минут 25 секунд

    const min1 = document.getElementById('min1');
    const min2 = document.getElementById('min2');
    const sec1 = document.getElementById('sec1');
    const sec2 = document.getElementById('sec2');

    function updateTimer() {
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            min1.textContent = '0';
            min2.textContent = '0';
            sec1.textContent = '0';
            sec2.textContent = '0';
            alert("Время истекло! Начинается платная парковка.");
            return;
        }

        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        // Обновляем цифры
        min1.textContent = Math.floor(minutes / 10);
        min2.textContent = minutes % 10;
        sec1.textContent = Math.floor(seconds / 10);
        sec2.textContent = seconds % 10;

        totalSeconds--;
    }

    // Запускаем таймер каждую секунду
    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer(); // Инициализация