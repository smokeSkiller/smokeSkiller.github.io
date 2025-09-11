//! DOM
const checkbox = document.querySelector('.session-box-checkbox');
const checkboxField = document.querySelector('.session-box-checkbox-field input');
const emailField = document.querySelector('.session-box-checkbox-email');
const errorMsg = document.querySelector('.session-box-checkbox-error-msg');

//* Скрытие/Показ email поля
checkboxField.addEventListener('click', function () {
    emailField.classList.toggle('opened');
    checkbox.classList.remove('error');
    errorMsg.textContent = '';
});

//* Email валидация
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

emailField.addEventListener('blur', function () {
    const value = emailField.value.trim();

    if(validateEmail(value)) {
        errorMsg.textContent = '';
        checkbox.classList.remove('error');
    } else {
        errorMsg.textContent = 'Не корректно введен e-mail';
        checkbox.classList.add('error');
    }
});

emailField.addEventListener('input', function () {
    const value = emailField.value.trim();

    // Валидация на заполненность
    if(!value) {
        errorMsg.textContent = 'Введите свой e-mail';
        checkbox.classList.add('error');
    }
});