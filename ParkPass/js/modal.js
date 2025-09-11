//! DOM
// Модалки
const modals = document.querySelectorAll('.modal');
const modalInners = document.querySelectorAll('.modal-inner');
const openModalBtns = document.querySelectorAll('.open-modal-btn');
const closeModalBtns = document.querySelectorAll('.modal-close-btn');
// Попапы
const popups = document.querySelectorAll('.popup');

//! Модалки
//* Открытие модалки по кнопке
openModalBtns.forEach(function (openModalBtn) {
    openModalBtn.addEventListener('click', function () {
        const targetModal = document.querySelector(this.getAttribute('target-modal'));

        targetModal.classList.add('opened');
        
        setTimeout(function (params) {
            targetModal.firstElementChild.style.transform = "translateY(65%)";
        }, 50);
    });
});

//* Закрытие модалки по кнопке
closeModalBtns.forEach(function (closeModalBtn) {
    closeModalBtn.addEventListener('click', function () {
        closeModal();
    });
});

//* Закрытие модалки
function closeModal() {
    modals.forEach(modal => {
        modal.classList.remove('opened');
        modal.firstElementChild.style.transform = "translateY(100%)";
    });
}

modals.forEach(modal=> {
    modal.addEventListener('click', function () {
        closeModal();
    });
});

modalInners.forEach(modalInner => {
    modalInner.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    //* Перетаскивание окна пальцем
    // Инициализация Hammer.js
    const hammer = new Hammer(modalInner);
    hammer.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });

    let startY = 0;
    let isOpened = false;

    hammer.on('panstart', (e) => {
        startY = e.deltaY;
    });

    hammer.on('pandown', (e) => {
        const deltaY = (e.deltaY - startY);

        modalInner.style.transform = `translateY(calc(${deltaY}px + 65%))`;
    });

    hammer.on('panend', (e) => {
        if (e.deltaY > 0) {
            closeModal();
        }
    });
});

//! Попапы
// Открытие
function openPopup(popup) {
    document.querySelector(popup).classList.add('opened');
}

// Закрытие
function closePopup() {
    popups.forEach(popup => {
        popup.classList.remove('opened');
    });
}

popups.forEach(popup => {
    popup.addEventListener('click', function (params) {
        closePopup();
    });
});