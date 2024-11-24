document.addEventListener('DOMContentLoaded', () => {
    const decreaseBtn = document.getElementById('decrease');
    const increaseBtn = document.getElementById('increase');
    const quantityEl = document.getElementById('quantity');
    const priceEl = document.getElementById('price');
    const viewCartBtn = document.getElementById('view-cart');
    const buyNowBtn = document.getElementById('buy-now');
    const addCartBtn = document.getElementById('add-cart');
    const cartModal = document.getElementById('cart-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const backToCartBtn = document.getElementById('back-to-cart');
    const cartItemsEl = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout');
    const purchaseModal = document.getElementById('purchase-modal');
    const closePurchaseModalBtn = document.getElementById('close-purchase-modal');
    const cancelPurchaseBtn = document.getElementById('cancel-purchase');
    const purchaseForm = document.getElementById('purchase-form');
    const successAnimationEl = document.getElementById('success-animation');
    const alertModal = document.getElementById('alert-modal');
    const alertMessage = document.getElementById('alert-message');
    const closeAlertModalBtn = document.getElementById('close-alert-modal');
    const confirmModal = document.getElementById('confirm-modal');
    const confirmCancelBtn = document.getElementById('confirm-cancel');
    const confirmDeleteBtn = document.getElementById('confirm-delete');
    const deleteAnimationEl = document.getElementById('delete-animation');
    const addCartAnimationEl = document.getElementById('add-cart-animation');
    const purchaseModalTitle = document.getElementById('purchase-modal-title');
    const cardImage = document.getElementById('card-image');
    const cartIcon = document.getElementById('cart-icon');
    const cartCount = document.getElementById('cart-count');
    const obras = document.querySelectorAll('.obra');
    const locationSelect = document.getElementById('location');
    const dateTimeSelect = document.getElementById('date-time');

    let selectedObra = null;
    let quantity = 1;
    const pricePerItem = 15000;
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; 
    let itemToDeleteIndex = null;
    let funcionesData = null;

    function updateQuantityAndPrice() {
        quantityEl.textContent = quantity;
        priceEl.textContent = `$${pricePerItem * quantity}`;
    }

    function checkFormCompletion() {
        const location = locationSelect.value;
        const dateTime = dateTimeSelect.value;
        const seat = document.getElementById('seat').value;

        if (selectedObra && location && dateTime && seat) {
            addCartBtn.disabled = false;
        } else {
            addCartBtn.disabled = false;
        }
    }

    function showAlert(message, animationPath = null) {
        alertMessage.textContent = message;
        alertModal.classList.remove('hidden');
        if (animationPath) {
            addCartAnimationEl.innerHTML = ''; 
            addCartAnimationEl.classList.remove('hidden');
            lottie.loadAnimation({
                container: addCartAnimationEl,
                renderer: 'svg',
                loop: false,
                autoplay: true,
                path: animationPath
            }).addEventListener('complete', () => {
                addCartAnimationEl.classList.add('hidden');
            });
        }
    }

    function showConfirmModal(index) {
        itemToDeleteIndex = index;
        confirmModal.classList.remove('hidden');
    }

    function removeCartItem(index) {
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); 
        updateCartCount();
        if (cartItems.length === 0) {
            cartModal.classList.add('hidden');
        } else {
            viewCartBtn.click(); 
        }
    }

    function updateCartCount() {
        cartCount.textContent = cartItems.length;
        if (cartItems.length > 0) {
            cartIcon.classList.remove('hidden');
        } else {
            cartIcon.classList.add('hidden');
        }
    }

    function getRandomTime() {
        const hours = Math.floor(Math.random() * 24);
        const minutes = Math.floor(Math.random() * 60);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
    
    function getMonthName(monthIndex) {
        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        return monthNames[monthIndex];
    }
    
    function formatFecha(fecha) {
        console.log(`Formatting fecha: ${fecha}`);
        const [location, datePart] = fecha.split(' ');
        if (!datePart) {
            console.error(`Invalid date format: ${fecha}`);
            return null;
        }
        const [day, month] = datePart.split('/').map(Number);
        if (isNaN(day) || isNaN(month)) {
            console.error(`Invalid date format: ${fecha}`);
            return null;
        }
        const monthName = getMonthName(month - 1); 
        const randomTime = getRandomTime();
        return `${day} de ${monthName}, ${randomTime}`;
    }
    
function populateLocationAndDateTime() {
    locationSelect.innerHTML = '<option value="" disabled selected>Seleccione ciudad</option>';
    dateTimeSelect.innerHTML = '<option value="" disabled selected>Seleccione función</option>';

    if (selectedObra && funcionesData) {
        const funcion = funcionesData.funciones.find(f => f.nombre === selectedObra);
        if (funcion) {
           const locationPlaceholder = locationSelect.querySelector('option[value="adver"]');
            const dateTimePlaceholder = dateTimeSelect.querySelector('option[value="adver"]');
            if (locationPlaceholder) locationPlaceholder.remove();
            if (dateTimePlaceholder) dateTimePlaceholder.remove();

            const uniqueLocations = [...new Set(funcion.fechas.map(fecha => fecha.match(/^[^\d]+/)[0].trim()))];
            uniqueLocations.forEach(location => {
                const option = document.createElement('option');
                option.value = location;
                option.textContent = location;
                locationSelect.appendChild(option);
            });

            funcion.fechas.forEach(fecha => {
                const formattedFecha = formatFecha(fecha);
                if (formattedFecha) {
                    const option = document.createElement('option');
                    option.value = fecha;
                    option.textContent = formattedFecha;
                    dateTimeSelect.appendChild(option);
                }
            });
        }
    }
}

    obras.forEach(obra => {
        obra.addEventListener('click', () => {
            obras.forEach(o => o.classList.remove('border-primary', 'selected-obra'));
            obra.classList.add('border-primary', 'selected-obra');
            selectedObra = obra.dataset.title;
            populateLocationAndDateTime();
            checkFormCompletion();
        });
    });

    decreaseBtn.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            updateQuantityAndPrice();
        }
    });

    increaseBtn.addEventListener('click', () => {
        quantity++;
        updateQuantityAndPrice();
    });

    locationSelect.addEventListener('change', checkFormCompletion);
    dateTimeSelect.addEventListener('change', checkFormCompletion);
    document.getElementById('seat').addEventListener('change', checkFormCompletion);

    cartIcon.addEventListener('click', () => {
        viewCartBtn.click(); 
    });

    addCartBtn.addEventListener('click', () => {
        const location = locationSelect.value;
        const dateTime = dateTimeSelect.value;
        const seat = document.getElementById('seat').value;

        if (!selectedObra) {
            showAlert('Por favor, selecciona una obra.');
            return;
        }
        if (!location) {
            showAlert('Por favor, selecciona una ciudad.');
            return;
        }
        if (!dateTime) {
            showAlert('Por favor, selecciona una fecha y hora.');
            return;
        }
        if (!seat) {
            showAlert('Por favor, selecciona una ubicación.');
            return;
        }

        const cartItem = {
            obra: selectedObra,
            quantity,
            location,
            dateTime,
            seat,
            price: pricePerItem * quantity
        };

        cartItems.push(cartItem);
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); 
        showAlert('Item agregado al carrito.', './animation/addCart.json');
        viewCartBtn.disabled = false;


        selectedObra = null;
        quantity = 1;
        locationSelect.value = '';
        dateTimeSelect.value = '';
        document.getElementById('seat').value = '';
        obras.forEach(o => o.classList.remove('border-primary', 'selected-obra'));
        updateQuantityAndPrice();
        updateCartCount();
    });

    viewCartBtn.addEventListener('click', () => {
        if (cartItems.length === 0) {
            showAlert('El carrito está vacío.');
            return;
        }

        cartItemsEl.innerHTML = cartItems.map((item, index) => `
            <div class="flex flex-col space-y-4 p-4 bg-gray-100 rounded-lg mb-4">
                <div class="flex justify-between h-2">
                    <span class="font-bold">Obra:</span>
                    <span>${item.obra}</span>
                </div>
                <div class="flex justify-between h-2">
                    <span class="font-bold">Cantidad:</span>
                    <span>${item.quantity}</span>
                </div>
                <div class="flex justify-between h-2">
                    <span class="font-bold">Ubicación:</span>
                    <span>${item.seat}</span>
                </div>
                <div class="flex justify-between h-2">
                    <span class="font-bold">Fecha y Hora:</span>
                    <span>${item.dateTime}</span>
                </div>
                <div class="flex justify-between h-2">
                    <span class="font-bold">Precio:</span>
                    <span>$${item.price}</span>
                </div>
                <button class="bg-red-500 text-white py-2 px-4 rounded font-bold remove-cart-item" data-index="${index}">Eliminar</button>
            </div>
        `).join('');

        document.querySelectorAll('.remove-cart-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                showConfirmModal(index);
            });
        });

        cartModal.classList.remove('hidden');
    });

    closeModalBtn.addEventListener('click', () => {
        cartModal.classList.add('hidden');
    });

    backToCartBtn.addEventListener('click', () => {
        cartModal.classList.add('hidden');
    });

    checkoutBtn.addEventListener('click', () => {
        if (cartItems.length === 0) {
            showAlert('El carrito está vacío.');
            return;
        }

        cartModal.classList.add('hidden');
        purchaseModal.classList.remove('hidden');
    });

    buyNowBtn.addEventListener('click', () => {
        const location = locationSelect.value;
        const dateTime = dateTimeSelect.value;
        const seat = document.getElementById('seat').value;

        if (!selectedObra) {
            showAlert('Por favor, selecciona una obra.');
            return;
        }
        if (!location) {
            showAlert('Por favor, selecciona una ciudad.');
            return;
        }
        if (!dateTime) {
            showAlert('Por favor, selecciona una fecha y hora.');
            return;
        }
        if (!seat) {
            showAlert('Por favor, selecciona una ubicación.');
            return;
        }

        purchaseModal.classList.remove('hidden');
    });

    closePurchaseModalBtn.addEventListener('click', () => {
        purchaseModal.classList.add('hidden');
    });

    cancelPurchaseBtn.addEventListener('click', () => {
        purchaseModal.classList.add('hidden');
    });

    purchaseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        purchaseForm.classList.add('hidden');
        purchaseModalTitle.textContent = 'Compra Realizada';
        cardImage.classList.add('hidden');
        successAnimationEl.innerHTML = '';
        successAnimationEl.classList.remove('hidden');
        lottie.loadAnimation({
            container: successAnimationEl,
            renderer: 'svg',
            loop: false,
            autoplay: true,
            path: './animation/success.json'
        }).addEventListener('complete', () => {
            purchaseModal.classList.add('hidden');
            window.location.href = './index.html';
        });
    });

    closeAlertModalBtn.addEventListener('click', () => {
        alertModal.classList.add('hidden');
    });

    confirmCancelBtn.addEventListener('click', () => {
        confirmModal.classList.add('hidden');
    });

    confirmDeleteBtn.addEventListener('click', () => {
        deleteAnimationEl.innerHTML = '';
        deleteAnimationEl.classList.remove('hidden');
        confirmDeleteBtn.setAttribute('disabled', true);
        lottie.loadAnimation({
            container: deleteAnimationEl,
            renderer: 'svg',
            loop: false,
            autoplay: true,
            path: './animation/deleted.json'
        }).addEventListener('complete', () => {
            deleteAnimationEl.classList.add('hidden');
            removeCartItem(itemToDeleteIndex);
            confirmModal.classList.add('hidden');
            confirmDeleteBtn.removeAttribute('disabled');
        });
    });

    fetch('funciones.json')
        .then(response => response.json())
        .then(data => {
            funcionesData = data;
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));

    updateCartCount();
});