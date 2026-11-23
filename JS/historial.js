const ordersList = document.getElementById("ordersList")
const ordersEmpty = document.getElementById("ordersEmpty")

// Contamos las unidades de un pedido
function countOrderItems(order) {
    return order.items.reduce((total, item) =>
        total + item.cantidad, 0
    )
}

function renderOrders() {
    const orders = getOrders()

    ordersEmpty.hidden = orders.length > 0

    ordersList.innerHTML = orders.map(order => `
        <article class="card">
            <div class="card_body">
                <span class="badge">${formatDate(order.fecha)}</span>
                <h2>Pedido #${order.id}</h2>
                <p>${countOrderItems(order)} producto(s) · ${escapeHTML(order.metodo)}</p>
                <div class="precio_total">
                    <p>${formatPrice(order.total)}</p>
                    <a class="btn" href="pedidopasado.html?id=${order.id}">Ver compra</a>
                </div>
            </div>
        </article>
    `).join("")
}

//Iniciamos
renderOrders()
