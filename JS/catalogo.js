const featuredProducts = document.getElementById("featuredProducts")
const productGrid = document.getElementById("productGrid")
const searchInput = document.getElementById("searchInput")
const sortSelect = document.getElementById("sortSelect")
const resultsCount = document.getElementById("resultsCount")
const emptyMessage = document.getElementById("emptyMessage")

// Normalizamos el texto para buscar sin importar mayúsculas ni tildes
function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
}

// ================= INICIO: PRODUCTOS DESTACADOS =================
function renderFeatured() {
    const featured = PRODUCTS.filter(product => product.destacado)
    featuredProducts.innerHTML = featured
        .map(renderProductCard)
        .join("")
}

// ================= CATÁLOGO: BÚSQUEDA Y FILTROS =================
function getFilteredProducts() {
    const category = productGrid.dataset.categoria
    const search = normalizeText(searchInput.value.trim())
    const sort = sortSelect.value

    let products = PRODUCTS.filter(product => {
        const matchesCategory = !category || product.categoria === category
        const searchableText = normalizeText(
            `${product.nombre} ${product.descripcion} ${CATEGORIES[product.categoria]}`
        )
        return matchesCategory && searchableText.includes(search)
    })

    if (sort === "oferta") {
        products = products.filter(product => product.precioAnterior)
    } else if (sort === "vendidos") {
        products = [...products].sort((a, b) => b.vendidos - a.vendidos)
    } else if (sort === "precio-asc") {
        products = [...products].sort((a, b) => a.precio - b.precio)
    } else if (sort === "precio-desc") {
        products = [...products].sort((a, b) => b.precio - a.precio)
    }

    return products
}

function renderCatalog() {
    const products = getFilteredProducts()

    productGrid.innerHTML = products
        .map(renderProductCard)
        .join("")

    resultsCount.textContent = `${products.length} producto(s)`
    emptyMessage.hidden = products.length > 0
}

//Iniciamos
if (featuredProducts) {
    renderFeatured()
}

if (productGrid) {
    // Búsqueda enviada desde el inicio (?buscar=...)
    searchInput.value = getParam("buscar") || ""

    searchInput.addEventListener("input", renderCatalog)
    sortSelect.addEventListener("change", renderCatalog)
    renderCatalog()
}
