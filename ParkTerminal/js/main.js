//! DOM
const hasDropdowns = document.querySelectorAll('.has-dropdown')

//* Equipments
// Slave controller
// Detection Sensors
const detectionSensors = document.getElementById('detection-sensors')
const detectionSensorsCheckbox = detectionSensors.querySelector('.checkbox input')
const detectionSensorsBtns = detectionSensors.querySelectorAll('button')
// Barrier
const barrier = document.getElementById('barrier')
const barrierBtns = barrier.querySelectorAll('button')
// Trafic lights
const trafficLights = document.getElementById('traffic-lights')
const trafficLightsBtns = trafficLights.querySelectorAll('button')
// Button
const button = document.getElementById('button')
const buttonCheckbox = button.querySelector('.checkbox input')
const buttonPressed = button.querySelectorAll('button')
// Block
const block = document.getElementById('block')
const blockBtns = block.querySelectorAll('button')

// Reader internal
const readerInternal = document.getElementById('reader-internal')
const readerInternalCheckbox = readerInternal.querySelector('.checkbox input')
const readerInternalField = readerInternal.querySelector('.field')
const readerInternalBtns = readerInternal.querySelectorAll('.dropdown button')

// Reader external
const readerExternal = document.getElementById('reader-external')
const readerExternalCheckbox = readerExternal.querySelector('.checkbox input')
const readerExternalField = readerExternal.querySelector('.field')
const readerExternalBtns = readerExternal.querySelectorAll('.dropdown button')

// Dispenser
const dispenser = document.getElementById('dispenser')
const dispenserDropdownBtns = dispenser.querySelectorAll('.dropdown button')

// Collector
const collector = document.getElementById('collector')
const collectorDropdownBtns = collector.querySelectorAll('.dropdown button')

//! Events
//* Slave controller
// Detection Sensors
detectionSensorsCheckbox.addEventListener('change', () => {
    disableButtonsOnCheck(detectionSensorsCheckbox, detectionSensorsBtns)
})
disableButtonsOnCheck(detectionSensorsCheckbox, detectionSensorsBtns)
selectSingleButton(detectionSensorsBtns)

// Barrier
selectSingleButton(barrierBtns)

// Trafic lights
selectSingleButton(trafficLightsBtns)

// Button
buttonCheckbox.addEventListener('change', () => {
    disableButtonsOnCheck(buttonCheckbox, buttonPressed)
})
disableButtonsOnCheck(buttonCheckbox, buttonPressed)

// Block
selectSingleButton(blockBtns)

//* Reader internal
selectSingleButton(readerInternalBtns)

readerInternalCheckbox.addEventListener('change', () => {
    disableFieldOnCheck(readerInternalCheckbox, readerInternalField)
})

disableFieldOnCheck(readerInternalCheckbox, readerInternalField)

//* Reader external
selectSingleButton(readerExternalBtns)

readerExternalCheckbox.addEventListener('change', () => {
    disableFieldOnCheck(readerExternalCheckbox, readerExternalField)
})

disableFieldOnCheck(readerExternalCheckbox, readerExternalField)

//* Dispenser
selectSingleButton(dispenserDropdownBtns)

//* Collector
selectSingleButton(collectorDropdownBtns)

//* All Dropdowns
hasDropdowns.forEach((dropdown) => {
    dropdown.addEventListener('click', (e) => {
        e.stopPropagation()
        dropdown.classList.toggle('active')
    })
})

document.querySelector('body').addEventListener('click', () => {
    hasDropdowns.forEach((dropdown) => {
        dropdown.classList.remove('active')
    })
})

//! Methods
// Select single button
function selectSingleButton (buttons) {
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const dataValue = button.getAttribute('data-value')
            const equipment = button.closest('.equipment')

            // Удаляем класс btn-filled со всех кнопок
            buttons.forEach((btn) => {
                btn.classList.remove('btn-filled')
            })

            // Добавляем класс btn-filled к нажатой кнопке
            button.classList.add('btn-filled')

            // Добавляем значение кнопки в поле
            equipment.querySelector('.value').textContent = dataValue

            // Если кнопки находятся в dropdown
            if(equipment.querySelector('.selected-btn')) {
                equipment.querySelector('.selected-btn').textContent = button.textContent
            }
        })
    })
}

// Disabling buttons on check
function disableButtonsOnCheck(checkbox, btns) {
    // Если чекбокс не выбран, то блокируем все кнопки
    if (!checkbox.checked) {
        btns.forEach((btn) => {
            btn.disabled = true
        })
    } else {
        btns.forEach((btn) => {
            btn.disabled = false
        })
    }
}

// Disabling fields on check
function disableFieldOnCheck(checkbox, field) {
    const okBtn = field.parentElement.querySelector('.ok-btn')

    if (!checkbox.checked) {
        field.disabled = true
        okBtn.disabled = true
        okBtn.classList.remove('show')
    } else {
        field.disabled = false
        okBtn.disabled = false
        okBtn.classList.add('show')
    }
}