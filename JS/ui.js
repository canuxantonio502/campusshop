// ================= UTILIDADES =================
// Formateamos un número como precio en quetzales (Q.1,500.00)
function formatPrice(amount) {
    return "Q." + amount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
}

// Formateamos una fecha ISO como dd/mm/aaaa
function formatDate(isoDate) {
    return new Date(isoDate).toLocaleDateString("es-GT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    })
}

// Escapamos el texto ingresado por el usuario antes de mostrarlo
function escapeHTML(text) {
    const div = document.createElement("div")
    div.textContent = text
    return div.innerHTML
}

// Leemos un parámetro de la URL (?id=...)
function getParam(name) {
    return new URLSearchParams(window.location.search).get(name)
}

// ================= COMPONENTES =================
// Tarjeta de producto para catálogos e inicio
function renderProductCard(product) {
    const badge = product.precioAnterior
        ? `<span class="badge2">Oferta</span>`
        : `<span class="badge">${CATEGORIES[product.categoria]}</span>`

    const oldPrice = product.precioAnterior
        ? `<s class="old-price">${formatPrice(product.precioAnterior)}</s>`
        : ""

    return `
        <article class="card product-card">
            <a class="product-card-image" href="producto.html?id=${product.id}">
                <img class="product_image" src="${product.imagen}" alt="${product.nombre}" loading="lazy" decoding="async">
            </a>
            <div class="card_body">
                ${badge}
                <h2>${product.nombre}</h2>
                <p class="product-price">${oldPrice} ${formatPrice(product.precio)}</p>
                <div class="card-actions">
                    <a class="btn" href="producto.html?id=${product.id}">Ver producto</a>
                    <button
                        class="btn btn-outline"
                        type="button"
                        data-add-to-cart="${product.id}"
                        aria-label="Agregar ${product.nombre} al carrito">
                        Agregar
                    </button>
                </div>
            </div>
        </article>
    `
}

// Contador de productos en el ícono del carrito
function updateCartBadge() {
    const badge = document.getElementById("cartCount")
    if (!badge) return

    const count = getCartCount()
    badge.textContent = count
    badge.hidden = count === 0
}

// Notificación temporal en pantalla
function showToast(message, type = "success") {
    let toast = document.getElementById("toast")

    if (!toast) {
        toast = document.createElement("div")
        toast.id = "toast"
        toast.className = "toast"
        toast.setAttribute("role", "status")
        document.body.appendChild(toast)
    }

    toast.textContent = message
    toast.classList.toggle("toast-error", type === "error")
    toast.classList.add("toast-visible")

    clearTimeout(toast.timeoutId)
    toast.timeoutId = setTimeout(() => {
        toast.classList.remove("toast-visible")
    }, 2500)
}

// ================= EVENTOS GENERALES =================
// Cualquier botón con data-add-to-cart agrega el producto al carrito
document.addEventListener("click", e => {
    const button = e.target.closest("[data-add-to-cart]")
    if (!button) return

    const product = findProduct(button.dataset.addToCart)
    if (!product) return

    if (addToCart(product.id)) {
        updateCartBadge()
        showToast(`${product.nombre} agregado al carrito`)
    } else {
        showToast("No hay más unidades disponibles", "error")
    }
})

// Cerramos el menú lateral con Escape
// (el clic fuera del menú lo maneja el fondo .menu-overlay)
const menuToggle = document.getElementById("menu-toggle")

document.addEventListener("keydown", e => {
    if (e.key === "Escape" && menuToggle) {
        menuToggle.checked = false
    }
})

//Iniciamos
updateCartBadge()
