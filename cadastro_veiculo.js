let currentPage = 1;
const totalPages = 4;
let driver = {};
let route = {};
let product = {};

document.addEventListener('DOMContentLoaded', loadPage);

document.getElementById('prevPage').addEventListener('click', prevPage);
document.getElementById('nextPage').addEventListener('click', nextPage);

function loadPage() {
    for (let i = 1; i <= totalPages; i++) {
        document.getElementById(`step${i}`).style.display = (i === currentPage) ? 'block' : 'none';
    }
    document.getElementById('prevPage').style.display = (currentPage > 1) ? 'inline' : 'none';
    document.getElementById('nextPage').style.display = (currentPage < totalPages) ? 'inline' : 'none';
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        loadPage();
    }
}

function nextPage() {
    if (currentPage < totalPages) {
        if (currentPage === 1) {
            const driverForm = document.getElementById('driverForm');
            if (!validateForm(driverForm)) return;
            driver = {
                name: driverForm.driverName.value,
                licenseNumber: driverForm.licenseNumber.value,
                phone: driverForm.phone.value,
                vehicle: driverForm.vehicle.value
            };
            driverForm.reset();
        } else if (currentPage === 2) {
            const routeForm = document.getElementById('routeForm');
            if (!validateForm(routeForm)) return;
            route = {
                origin: routeForm.origin.value,
                destination: routeForm.destination.value,
                distance: routeForm.distance.value
            };
            routeForm.reset();
        } else if (currentPage === 3) {
            const productForm = document.getElementById('productForm');
            if (!validateForm(productForm)) return;
            product = {
                name: productForm.productName.value,
                description: productForm.description.value,
                weight: productForm.weight.value
            };
            productForm.reset();
            document.getElementById('driverInfo').textContent = driver.name;
            document.getElementById('routeInfo').textContent = `${route.origin} para ${route.destination}`;
            document.getElementById('productInfo').textContent = product.name;
        }
        currentPage++;
        loadPage();
    } else {
        generateTrackingCode();
    }
}

function validateForm(form) {
    return form.checkValidity();
}

function generateTrackingCode() {
    const trackingCode = `BLC${Date.now()}`;
    const trackingData = {
        trackingCode,
        driver,
        route,
        product,
        status: 'Em trânsito'
    };

    localStorage.setItem(trackingCode, JSON.stringify(trackingData));

    document.getElementById('trackingCode').textContent = trackingCode;
    console.log('Código de rastreamento gerado:', trackingCode);
}
