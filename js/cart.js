document.addEventListener('DOMContentLoaded', () => {
    const decreaseBtn = document.getElementById('decrease');
    const increaseBtn = document.getElementById('increase');
    const quantityEl = document.getElementById('quantity');
    const priceEl = document.getElementById('price');
    const viewCartBtn = document.getElementById('view-cart');
    const buyNowBtn = document.getElementById('buy-now');
    const cartModal = document.getElementById('cart-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const backToCartBtn = document.getElementById('back-to-cart');
    const cartItemsEl = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout');
    const obras = document.querySelectorAll('.obra');

    let selectedObra = null;
    let quantity = 1;
    const pricePerItem = 99999;

    obras.forEach(obra => {
        obra.addEventListener('click', () => {
            obras.forEach(o => o.classList.remove('border-primary', 'selected-obra'));
            obra.classList.add('border-primary', 'selected-obra');
            selectedObra = obra.dataset.title;
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

    viewCartBtn.addEventListener('click', () => {
        const location = document.getElementById('location').value;
        const dateTime = document.getElementById('date-time').value;
        const seat = document.getElementById('seat').value;

        if (!selectedObra) {
            alert('Por favor, selecciona una obra.');
            return;
        }
        if (!location) {
            alert('Por favor, selecciona una ciudad.');
            return;
        }
        if (!dateTime) {
            alert('Por favor, selecciona una fecha y hora.');
            return;
        }
        if (!seat) {
            alert('Por favor, selecciona una ubicación.');
            return;
        }

        cartItemsEl.innerHTML = `
               <div class="flex flex-col space-y-4 p-4 bg-gray-100 rounded-lg">
                    <div class="flex justify-between">
                        <span class="font-bold">Obra:</span>
                        <span>${selectedObra}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-bold">Cantidad:</span>
                        <span>${quantity}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-bold">Ubicación:</span>
                        <span>${seat}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-bold">Fecha y Hora:</span>
                        <span>${dateTime}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-bold">Precio:</span>
                        <span>$${pricePerItem * quantity}</span>
                    </div>
                </div>
        `;
        cartModal.classList.remove('hidden');
    });

    closeModalBtn.addEventListener('click', () => {
        cartModal.classList.add('hidden');
    });

    backToCartBtn.addEventListener('click', () => {
        cartModal.classList.add('hidden');
    });

    checkoutBtn.addEventListener('click', () => {
        alert('Compra realizada con éxito!');
        cartModal.classList.add('hidden');
    });

    function updateQuantityAndPrice() {
        quantityEl.textContent = quantity;
        priceEl.textContent = `$${pricePerItem * quantity}`;
    }
});