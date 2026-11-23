const cartSection = document.getElementById("cartSection")
const cartEmpty = document.getElementById("cartEmpty")
const cartItemsContainer = document.getElementById("cartItems")
const cartTotal = document.getElementById("cartTotal")
const clearCartBtn = document.getElementById("clearCartBtn")

// ================= RENDER =================
function renderCart() {
    const items = getCartItems()
    const isEmpty = items.length === 0

    cartSection.hidden = isEmpty
    cartEmpty.hidden = !isEmpty
    updateCartBadge()

    if (isEmpty) return

    cartItemsContainer.innerHTML = items.map(item => `
        <article class="card cart-item">
            <a href="producto.html?id=${item.id}">
                <img src="${item.imagen}" alt="${item.nombre}" loading="lazy">
            </a>
            <div>
                <h3>${item.nombre}</h3>
                <p>${formatPrice(item.precio)} c/u</p>
                <p><strong>Subtotal: ${formatPrice(item.subtotal)}</strong></p>
            </div>
            <div class="cart-item-actions">
                <div class="quantity">
                    <button type="button" data-action="decrease" data-id="${item.id}" aria-label="Disminuir cantidad">−</button>
                    <span>${item.cantidad}</span>
                    <button type="button" data-action="increase" data-id="${item.id}" aria-label="Aumentar cantidad" ${item.cantidad >= item.stock ? "disabled" : ""}>+</button>
                </div>
                <button class="remove-btn" type="button" data-action="remove" data-id="${item.id}">
                    Quitar producto
                </button>
            </div>
        </article>
    `).join("")

    cartTotal.textContent = formatPrice(getCartTotal())
}

// ================= ACCIONES =================
// Un solo listener para los botones de cantidad y quitar
cartItemsContainer.addEventListener("click", e => {
    const button = e.target.closest("[data-action]")
    if (!button) return

    const id = button.dataset.id
    const item = getCart().find(item => item.id === id)
    if (!item) return

    if (button.dataset.action === "increase") {
        updateCartQuantity(id, item.cantidad + 1)
    } else if (button.dataset.action === "decrease") {
        updateCartQuantity(id, item.cantidad - 1)
    } else if (button.dataset.action === "remove") {
        removeFromCart(id)
        showToast("Producto eliminado del carrito")
    }
    renderCart()
})

clearCartBtn.addEventListener("click", () => {
    if (!confirm("¿Deseas vaciar el carrito?")) return
    clearCart()
    renderCart()
})

//Iniciamos
renderCart()
