document.getElementById('trackForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const trackingCode = document.getElementById('trackingCodeInput').value;
    const trackingData = localStorage.getItem(trackingCode);

    if (trackingData) {
        const data = JSON.parse(trackingData);
        document.getElementById('resultDriver').textContent = data.driver.name;
        document.getElementById('resultRoute').textContent = `${data.route.origin} para ${data.route.destination}`;
        document.getElementById('resultProduct').textContent = data.product.name;
        document.getElementById('resultStatus').textContent = data.status;
        document.getElementById('trackingResult').style.display = 'block';
    } else {
        alert('Código de rastreamento não encontrado.');
    }
});
