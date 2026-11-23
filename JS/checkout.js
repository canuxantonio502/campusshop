const checkoutForm = document.getElementById("checkoutForm")
const checkoutItems = document.getElementById("checkoutItems")
const checkoutTotal = document.getElementById("checkoutTotal")
const checkoutMessage = document.getElementById("checkoutMessage")
const paymentMethods = document.getElementById("paymentMethods")
const payBtn = document.getElementById("payBtn")

const shippingInputs = {
    nombre: document.getElementById("shippingName"),
    direccion: document.getElementById("shippingAddress"),
    ciudad: document.getElementById("shippingCity")
}

// Sin productos no hay nada que pagar
if (getCartItems().length === 0) {
    window.location.replace("carrito.html")
}

// ================= RESUMEN =================
function renderSummary() {
    const items = getCartItems()
    const total = formatPrice(getCartTotal())

    checkoutItems.innerHTML = items.map(item => `
        <div class="item">
            <img src="${item.imagen}" alt="${item.nombre}" loading="lazy">
            <div>
                <p>${item.nombre}</p>
                <span>Cantidad ${item.cantidad}</span>
            </div>
            <strong>${formatPrice(item.subtotal)}</strong>
        </div>
    `).join("")

    checkoutTotal.textContent = total
    payBtn.textContent = `Pagar ${total}`
}

// Usamos el nombre del perfil como valor inicial
shippingInputs.nombre.value = getProfile().nombre

// ================= MÉTODO DE PAGO =================
paymentMethods.addEventListener("change", e => {
    paymentMethods.querySelectorAll(".payment").forEach(method => {
        method.classList.toggle(
            "active",
            method.contains(e.target)
        )
    })
})

// ================= PAGAR =================
checkoutForm.addEventListener("submit", e => {
    e.preventDefault()

    let isValid = true
    Object.values(shippingInputs).forEach(input => {
        const empty = input.value.trim() === ""
        input.classList.toggle("invalid", empty)
        if (empty) isValid = false
    })

    if (!isValid) {
        checkoutMessage.className = "form-message error"
        checkoutMessage.textContent = "Completa los datos de envío"
        return
    }

    const envio = {
        nombre: shippingInputs.nombre.value.trim(),
        direccion: shippingInputs.direccion.value.trim(),
        ciudad: shippingInputs.ciudad.value.trim()
    }
    const metodo = checkoutForm.elements.metodo.value
    const order = createOrder(envio, metodo)

    if (!order) {
        window.location.href = "carrito.html"
        return
    }

    payBtn.disabled = true
    checkoutMessage.className = "form-message success"
    checkoutMessage.textContent = "Procesando pago..."
    setTimeout(() => {
        window.location.href = `pedidopasado.html?id=${order.id}&nuevo=1`
    }, 1000)
})

//Iniciamos
renderSummary()
