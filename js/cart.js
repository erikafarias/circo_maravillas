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

    let selectedObra = null;
    let quantity = 1;
    const pricePerItem = 15000;
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Cargar desde localStorage
    let itemToDeleteIndex = null;

    function updateQuantityAndPrice() {
        quantityEl.textContent = quantity;
        priceEl.textContent = `$${pricePerItem * quantity}`;
    }

    function checkFormCompletion() {
        const location = document.getElementById('location').value;
        const dateTime = document.getElementById('date-time').value;
        const seat = document.getElementById('seat').value;

        if (selectedObra && location && dateTime && seat) {
            addCartBtn.disabled = false;
        } else {
            addCartBtn.disabled = false; // Asegúrate de que el botón no se deshabilite
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

    obras.forEach(obra => {
        obra.addEventListener('click', () => {
            obras.forEach(o => o.classList.remove('border-primary', 'selected-obra'));
            obra.classList.add('border-primary', 'selected-obra');
            selectedObra = obra.dataset.title;
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

    document.getElementById('location').addEventListener('change', checkFormCompletion);
    document.getElementById('date-time').addEventListener('change', checkFormCompletion);
    document.getElementById('seat').addEventListener('change', checkFormCompletion);

    addCartBtn.addEventListener('click', () => {
        const location = document.getElementById('location').value;
        const dateTime = document.getElementById('date-time').value;
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

        // Resetear los ítems seleccionados
        selectedObra = null;
        quantity = 1;
        document.getElementById('location').value = '';
        document.getElementById('date-time').value = '';
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
        const location = document.getElementById('location').value;
        const dateTime = document.getElementById('date-time').value;
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
        });
    });
    updateCartCount();
});