const qr = document.querySelector('.qr');
const openQrBtn = document.querySelector('.session-box-qr-btn');
const qrBackBtn = document.querySelector('.qr-back-btn');
const video = document.querySelector('.scan-video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const text = document.querySelector('.qr-text');

// Открытие при нажатии
openQrBtn.addEventListener('click', function () {
    // Открываем окно сканирование
    qr.classList.add('opened');

    // Получаем доступ к камере
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
    .then(stream => {
        video.srcObject = stream;
        video.setAttribute("playsinline", true); // Для iOS
        video.play();
        requestAnimationFrame(scan);
    })
    .catch(err => {
        text.textContent = "Камера не доступна: " + err;
        console.error("Камера не доступна:", err);
        qr.classList.remove('opened');
        openPopup('#error-qr');
    });

    function scan() {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: "dontInvert",
            });

            // Проверка на найден ли qr-код
            if (code) {
                alert("QR-код найден:" + code.data);
                qr.classList.remove('opened');
                openPopup('#success-qr');
                return;
            } else {
                text.textContent = "Наведите камеру на QR-код в чеке";
            }
        }
        requestAnimationFrame(scan);
    }
});

// Закрытие при нажитии на кнопку 
qrBackBtn.addEventListener('click', function () {
    qr.classList.remove('opened');
    return;
});