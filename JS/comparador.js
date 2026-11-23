const compareA = document.getElementById("compareA")
const compareB = document.getElementById("compareB")
const compareHead = document.getElementById("compareHead")
const compareBody = document.getElementById("compareBody")

// Llenamos los selects agrupando por categoría
function fillSelect(select) {
    select.innerHTML = Object.entries(CATEGORIES).map(([key, name]) => `
        <optgroup label="${name}">
            ${PRODUCTS
                .filter(product => product.categoria === key)
                .map(product => `<option value="${product.id}">${product.nombre}</option>`)
                .join("")}
        </optgroup>
    `).join("")
}

// Producto inicial: el de la URL (?a=) o la Sudadera Pro
function getInitialProducts() {
    const first = findProduct(getParam("a")) || findProduct("sudadera-pro")
    const second = findProduct(getParam("b")) ||
        PRODUCTS.find(product =>
            product.categoria === first.categoria &&
            product.id !== first.id
        )
    return [first, second]
}

// Fila de la tabla con una etiqueta y el valor de cada producto
function compareRow(label, valueA, valueB) {
    return `
        <tr>
            <td><span class="row-label">${label}</span>${valueA}</td>
            <td><span class="row-label">${label}</span>${valueB}</td>
        </tr>
    `
}

function getAvailability(product) {
    return product.stock <= 5
        ? `<span class="badge2">Últimas ${product.stock} unidades</span>`
        : `<span class="badge">En stock</span>`
}

function renderComparison() {
    const a = findProduct(compareA.value)
    const b = findProduct(compareB.value)

    compareHead.innerHTML = `
        <tr>
            ${[a, b].map(product => `
                <th>
                    <a href="producto.html?id=${product.id}">
                        <img src="${product.imagen}" alt="${product.nombre}" class="product_image">
                        <p>${product.nombre}</p>
                    </a>
                </th>
            `).join("")}
        </tr>
    `

    compareBody.innerHTML = [
        compareRow("Precio", `<strong>${formatPrice(a.precio)}</strong>`, `<strong>${formatPrice(b.precio)}</strong>`),
        compareRow("Categoría", CATEGORIES[a.categoria], CATEGORIES[b.categoria]),
        compareRow("Descripción", a.descripcion, b.descripcion),
        compareRow("Disponibilidad", getAvailability(a), getAvailability(b)),
        compareRow("Vendidos", a.vendidos, b.vendidos),
        compareRow(
            "",
            `<button class="btn" type="button" data-add-to-cart="${a.id}">Agregar al carrito</button>`,
            `<button class="btn" type="button" data-add-to-cart="${b.id}">Agregar al carrito</button>`
        )
    ].join("")
}

//Iniciamos
fillSelect(compareA)
fillSelect(compareB)

const [initialA, initialB] = getInitialProducts()
compareA.value = initialA.id
compareB.value = initialB.id

compareA.addEventListener("change", renderComparison)
compareB.addEventListener("change", renderComparison)
renderComparison()
