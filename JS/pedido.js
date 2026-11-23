const orderDetail = document.getElementById("orderDetail")
const orderSuccess = document.getElementById("orderSuccess")

const order = findOrder(getParam("id"))

function renderOrder() {
    const { envio } = order

    document.title = `Pedido #${order.id} - CampusShop GT`

    // Mensaje de confirmación al venir del checkout
    orderSuccess.hidden = getParam("nuevo") !== "1"

    orderDetail.innerHTML = `
        <section class="content-section">
            <h2 class="section-title">Productos del pedido #${order.id}</h2>
            <div class="grid-products">
                ${order.items.map(item => `
                    <article class="card product-card">
                        <img class="product_image" src="${item.imagen}" alt="${item.nombre}" loading="lazy">
                        <div class="card_body">
                            <span class="badge">Cantidad ${item.cantidad}</span>
                            <h2>${item.nombre}</h2>
                            <div class="precio_total">
                                <p>${formatPrice(item.precio * item.cantidad)}</p>
                                <a class="btn" href="producto.html?id=${item.id}">Ver producto</a>
                            </div>
                        </div>
                    </article>
                `).join("")}
            </div>
        </section>
        <hr>
        <section class="content-section">
            <article class="card">
                <div class="card_body order-info">
                    <span class="badge">${formatDate(order.fecha)}</span>
                    <h2>Pedido #${order.id}</h2>
                    <p><strong>Envío:</strong> ${escapeHTML(envio.nombre)}, ${escapeHTML(envio.direccion)}, ${escapeHTML(envio.ciudad)}</p>
                    <p><strong>Método de pago:</strong> ${escapeHTML(order.metodo)}</p>
                    <div class="precio_total"><p>Total: ${formatPrice(order.total)}</p></div>
                </div>
            </article>
        </section>
    `
}

function renderNotFound() {
    orderDetail.innerHTML = `
        <section class="card">
            <div class="card_body">
                <h2 class="title">Pedido no encontrado</h2>
                <p>El pedido que buscas no existe.</p>
                <a class="btn" href="historial.html">Ver historial</a>
            </div>
        </section>
    `
}

//Iniciamos
if (order) {
    renderOrder()
} else {
    renderNotFound()
}
