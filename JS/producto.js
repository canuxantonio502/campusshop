const productDetail = document.getElementById("productDetail")
const relatedSection = document.getElementById("relatedSection")
const relatedProducts = document.getElementById("relatedProducts")

const product = findProduct(getParam("id"))
let quantity = 1

// Etiqueta según las unidades disponibles
function getStockBadge(stock) {
    return stock <= 5
        ? `<span class="badge2">Últimas ${stock} unidades</span>`
        : `<span class="badge">En stock</span>`
}

// ================= DETALLE =================
function renderProduct() {
    const oldPrice = product.precioAnterior
        ? `<s class="old-price">${formatPrice(product.precioAnterior)}</s>`
        : ""

    document.title = `${product.nombre} - CampusShop GT`

    productDetail.innerHTML = `
        <img src="${product.imagen}" alt="${product.nombre}" class="product_image">
        <div class="card_body">
            <h1 class="title">${product.nombre}</h1>
            <p class="detail-price">${oldPrice} <strong>${formatPrice(product.precio)}</strong></p>
            <p>${product.descripcion}</p>
            <div class="detail-badges">
                <span class="badge">${CATEGORIES[product.categoria]}</span>
                <span class="badge">Garantía</span>
                ${getStockBadge(product.stock)}
            </div>
            <div class="detail-actions">
                <div class="quantity">
                    <button type="button" id="decreaseBtn" aria-label="Disminuir cantidad">−</button>
                    <span id="quantityValue">1</span>
                    <button type="button" id="increaseBtn" aria-label="Aumentar cantidad">+</button>
                </div>
                <button class="btn" type="button" id="addBtn">Agregar al carrito</button>
                <a class="btn btn-outline" href="comparador.html?a=${product.id}">Comparar</a>
            </div>
        </div>
    `

    document.getElementById("decreaseBtn").addEventListener("click", () => {
        changeQuantity(-1)
    })
    document.getElementById("increaseBtn").addEventListener("click", () => {
        changeQuantity(1)
    })
    document.getElementById("addBtn").addEventListener("click", addSelectedQuantity)
    updateQuantityControls()
}

// ================= CANTIDAD =================
function changeQuantity(step) {
    quantity = Math.min(
        Math.max(quantity + step, 1),
        product.stock
    )
    updateQuantityControls()
}

function updateQuantityControls() {
    document.getElementById("quantityValue").textContent = quantity
    document.getElementById("decreaseBtn").disabled = quantity <= 1
    document.getElementById("increaseBtn").disabled = quantity >= product.stock
}

function addSelectedQuantity() {
    const inCart = getCart().find(item => item.id === product.id)
    const available = product.stock - (inCart ? inCart.cantidad : 0)

    if (available <= 0) {
        showToast("Ya tienes todas las unidades disponibles", "error")
        return
    }

    const added = Math.min(quantity, available)
    addToCart(product.id, added)
    updateCartBadge()
    showToast(`${added} x ${product.nombre} agregado al carrito`)
}

// ================= RELACIONADOS =================
function renderRelated() {
    const related = PRODUCTS
        .filter(item =>
            item.categoria === product.categoria &&
            item.id !== product.id
        )
        .slice(0, 3)

    relatedProducts.innerHTML = related
        .map(renderProductCard)
        .join("")
    relatedSection.hidden = related.length === 0
}

// Producto inexistente o sin id
function renderNotFound() {
    productDetail.innerHTML = `
        <div class="card_body">
            <h1 class="title">Producto no encontrado</h1>
            <p>El producto que buscas no existe o ya no está disponible.</p>
            <a class="btn" href="catalogo.html">Ir al catálogo</a>
        </div>
    `
}

//Iniciamos
if (product) {
    renderProduct()
    renderRelated()
} else {
    renderNotFound()
}
