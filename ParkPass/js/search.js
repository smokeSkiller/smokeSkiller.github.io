//! DOM
const autoCompleteField = document.getElementById('autoComplete');

if(autoCompleteField) {
    //! Маска ввода
    function formatLicensePlate(input) {
        // Убираем всё кроме букв и цифр
        let value = input.value.replace(/[^A-Za-zА-Яа-я0-9]/g, '');

        // Форматируем по маске
        let formatted = '';
        for (let i = 0; i < value.length; i++) {
            if (i === 1) formatted += ' ';
            if (i === 4) formatted += ' ';
            if (i === 6) formatted += ' ';
            formatted += value[i];
        }

        // Приводим к верхнему регистру
        input.value = formatted.toUpperCase();
    }

    //* Вешаем обработчик
    autoCompleteField.addEventListener('input', function(e) {
        // Маска
        formatLicensePlate(this);

        // Лимит символов - 12
        const value = this.value;

        if (value.length > 12) {
            this.value = value.substring(0, 12);
            return;
        }
    });

    // Фикс фокуса
    autoCompleteField.addEventListener('focusin', function () {
        document.querySelector('body').scrollIntoView({
            behavior: 'smooth',
        });
    });

    //! Авто заполнение
    const autoCompleteJS = new autoComplete({ 
        placeHolder: "A 000 AA 777",
        data: {
            src: ["С 556 ЕН 74", "С 558 МК 102", "С 550 ОХ 99", "С 558 МК 131"]
        },
        resultsList: {
            class: "search-box-results",
            destination: '.search-box-bottom',
            position: 'afterbegin',
            maxResults: 3,
            noResults: true,
            element: (list, data) => {
                // Не найдено сессий
                if (!data.results.length) {
                    const message = document.createElement("div");
                    message.setAttribute("class", "search-box-no-results");
                    message.innerHTML = '<span class="icon">!</span><span class="text">Сессии с таким госномером не найдено</span>';
                    list.appendChild(message);
                }

                // Фикс клавиатуры на мобилках
                if (data.results.length > 0) {
                    // Ждем немного пока отрендерятся результаты
                    setTimeout(() => {
                        const lastResult = list.lastElementChild;
                        if (lastResult) {
                            // Прокручиваем к последнему результату
                            lastResult.scrollIntoView({ 
                                behavior: 'smooth',
                                block: 'nearest'
                            });
                        }
                    }, 100);
                } else {
                    setTimeout(() => {
                        document.querySelector('body').scrollIntoView({
                            behavior: 'smooth',
                        });
                    }, 100);
                }
            },
        },
        events: {
            input: {
                selection: (event) => {
                    const feedback = event.detail;
                    // Переходим на страницу при выборе
                    window.location.href = `search-load.html`;
                }
            }
        }
    });
}

//! Загрузка сессий
document.addEventListener("DOMContentLoaded", function() {
    const img = document.querySelector('.search-msg .message-img img');
    const imgMark = document.querySelector('.search-msg-mark');
    const title = document.querySelector('.search-msg h1');
    const text = document.querySelector('.search-msg .message-text');

    if(img) {
        setTimeout(() => {
            img.setAttribute('src', 'img/car.png');
            imgMark.style.display = "block";
            title.innerHTML = "Есть! Сессия найдена!";
            text.style.display = "none";
        }, 4000);
    }
});