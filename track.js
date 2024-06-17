document.getElementById('trackForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const trackingCode = document.getElementById('trackingCodeInput').value;
    const trackingData = localStorage.getItem(trackingCode);

    if (trackingData) {
        const data = JSON.parse(trackingData);
        document.getElementById('resultDriver').textContent = data.driver.name;
        document.getElementById('resultRoute').textContent = `De: ${data.route.origin} Para: ${data.route.destination}`;
        document.getElementById('resultProduct').textContent = data.product.name;
        document.getElementById('resultStatus').textContent = data.status;
        document.getElementById('trackingResult').style.display = 'block';
    } else {
        alert('Código de rastreamento não encontrado.');
    }
});

function showMap() {
    const mapContainer = document.getElementById('mapContainer');
    const mapFrame = document.getElementById('mapFrame');

    if (mapContainer.style.display === 'none') {
        mapContainer.style.display = 'block';
        mapFrame.src = "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d31137.50361449018!2d-38.3020687!3d-12.701152449999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1smaps%20que%20posso%20usar%20na%20minha%20aplica%C3%A7%C3%A3o%20gratis!5e0!3m2!1spt-BR!2sbr!4v1718627737916!5m2!1spt-BR!2sbr";
    } else {
        mapContainer.style.display = 'none';
        mapFrame.src = ""; // Limpar a URL do iframe para interromper a execução do mapa se estiver oculto
    }
}

