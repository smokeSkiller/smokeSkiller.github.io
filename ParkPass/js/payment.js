//! DOM
// SBP
const sbpSearch = document.getElementById('sbp-search-field');
const sbpBoxTitles = document.querySelectorAll('.sbp-box-title');
const sbpItems = document.querySelectorAll('.sbp-box-lists li');
// Open card button
const openCardBtn = document.getElementById('another-payment-btn');
// Payment card
const paymentCard = document.querySelector('.payment-card');
const paymentCardFields = document.querySelectorAll('.payment-card-field input');
const cardNumber = document.getElementById('card-number');
const monthYear = document.getElementById('month-year');
const cvc = document.getElementById('cvc');
const paymentCardBtn = document.querySelector('.payment-card-btn');

//! SBP
sbpSearch.addEventListener('input', function () {
    const query = this.value.toLowerCase().trim();

    sbpItems.forEach(item => {
        const bankName = item.querySelector('.content h5').textContent.toLowerCase();
        if (bankName.includes(query)) {
            item.classList.remove('d-none');
        } else {
            item.classList.add('d-none');
        }
    });
});

//! Payment card
// Открытие карточки
openCardBtn.addEventListener('click', function () {
    this.closest('.modal-inner').style.transform = `translateY(45%)`;
    this.classList.add('d-none');
    paymentCard.classList.remove('d-none');
});

// Ввод всех полей
paymentCardFields.forEach(field =>
    // Проверка на заполненность всех полей
    field.addEventListener('blur', () => {
        if (cardNumber.value.length === cardNumber.maxLength &&
            monthYear.value.length === monthYear.maxLength &&
            cvc.value.length === cvc.maxLength) {
            paymentCardBtn.classList.add('gold');
        } else {
            paymentCardBtn.classList.remove('gold');
        }
    })
);

// Ввод номера карты
cardNumber.addEventListener('input', function (e) {
    let value = e.target.value;

    // Убираем всё, кроме цифр
    value = value.replace(/\D/g, '');

    // Разбиваем на группы по 4 цифры
    const groups = [];
    for (let i = 0; i < value.length; i += 4) {
        groups.push(value.slice(i, i + 4));
    }

    // Соединяем группы пробелами
    e.target.value = groups.join(' ');
});

// Месяц/Год
monthYear.addEventListener('input', function (e) {
    let value = e.target.value;

    // Удаляем всё, кроме цифр
    value = value.replace(/\D/g, '');

    // Если больше 4 цифр — обрезаем
    if (value.length > 4) {
        value = value.slice(0, 4);
    }

    // Проверяем и корректируем месяц (первые 2 цифры)
    if (value.length >= 2) {
        let month = value.slice(0, 2);

        // Если месяц больше 12 — корректируем
        if (parseInt(month, 10) > 12) {
            // Если первая цифра "0" или "1", оставляем как есть (например, 09, 12)
            // Если начинается с 2+, то заменяем на "0" + вторая цифра, если возможно
            if (month[0] === '0' || month[0] === '1' && month[1] < 3) {
                // Оставляем, если 01-12
                if (parseInt(month, 10) === 0) {
                    month = '01'; // 00 → 01
                }
            } else {
                // Например, 25 → 05, 37 → 07, 89 → 09
                const secondDigit = month[1] || '1';
                month = '0' + secondDigit;
                // Если получилось 00 — исправляем на 01
                if (month === '00') month = '01';
            }
            value = month + value.slice(2);
        }
    }

    // Форматируем как ММ/ГГ
    if (value.length >= 3) {
        value = value.slice(0, 2) + '/' + value.slice(2);
    }

    // Устанавливаем значение
    e.target.value = value;
});

// CVC/CVV
cvc.addEventListener('input', function (e) {
    let value = e.target.value;

    // Убираем всё, кроме цифр
    value = value.replace(/\D/g, '');

    // Максимальный ввод до 3х символов
    if (value.length > 3) {
        value = value.slice(0, 2);
    }

    // Устанавливаем значение
    e.target.value = value;
});