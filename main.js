document.addEventListener('DOMContentLoaded', () => {
    const numberTable = document.getElementById('numberTable');
    const selectedNumber = document.getElementById('selectedNumber');
    const playerNameInput = document.getElementById('playerName');
    const submitButton = document.getElementById('submitButton');
    const result = document.getElementById('result');
    const symbols = ['♦', '♥', '♠', '♣'];

    // Generar la tabla de números 11x11
    for (let row = 0; row < 11; row++) {
        const newRow = numberTable.insertRow();
        for (let col = 0; col < 11; col++) {
            const cell = newRow.insertCell();
            if (row === 10 && col === 10) {
                cell.textContent = '100';
                cell.addEventListener('click', () => {
                    selectNumber(100);
                });
            } else if (row < 10 && col < 10) {
                const number = row * 10 + col;
                cell.textContent = number;
                cell.addEventListener('click', () => {
                    selectNumber(number);
                });
            } else {
                // Coloca los símbolos de cartas en los cuadros restantes
                const symbolIndex = (row + col) % 4;
                cell.textContent = symbols[symbolIndex];
            }
        }
    }

    // Función para seleccionar un número
    function selectNumber(number) {
        selectedNumber.textContent = number;
    }

    // Manejar el envío del formulario
    const playerForm = document.getElementById('playerForm');
    playerForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita la recarga de la página

        const playerName = playerNameInput.value;
        const selectedNumberValue = selectedNumber.textContent;
        enviarDatosAGoogleAppsScript(playerName, selectedNumberValue);
    });

    // Función para enviar los datos a la aplicación web de Google Apps Script
    function enviarDatosAGoogleAppsScript(playerName, selectedNumber) {
        const apiUrl = 'https://script.google.com/macros/s/AKfycbzLwpPm1UpkILWPMqpOz5MRtS44wvUx9kvW_VbFGhGqcSZXfyjh7Hp8KY7Absv5pAQkJg/exec'; // Reemplaza con la URL de tu aplicación web

        const data = {
            playerName: playerName,
            selectedNumber: selectedNumber
        };

        fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.text())
        .then(responseText => {
            // Manejar la respuesta de la aplicación web (puede ser un mensaje de confirmación)
            console.log(responseText);
            // Puedes mostrar un mensaje de confirmación en la página web
            result.textContent = 'Resultado enviado a Google Sheets';
        })
        .catch(error => {
            console.error('Error al enviar los datos:', error);
            // Puedes mostrar un mensaje de error en la página web
            result.textContent = 'Error al enviar el resultado';
        });
    }
});
