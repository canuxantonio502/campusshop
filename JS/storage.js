// Llaves utilizadas en LocalStorage
const STORAGE_KEYS = {
    cart: "cart",
    orders: "orders",
    profile: "profile",
    messages: "messages"
}

// Leemos y guardamos cualquier valor en LocalStorage
function readStorage(key, defaultValue) {
    try {
        const value = JSON.parse(localStorage.getItem(key))
        return value ?? defaultValue
    } catch {
        return defaultValue
    }
}

function writeStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

// ================= CARRITO =================
// El carrito guarda solo { id, cantidad } de cada producto
function getCart() {
    return readStorage(STORAGE_KEYS.cart, [])
}

function saveCart(cart) {
    writeStorage(STORAGE_KEYS.cart, cart)
}

// Agregamos un producto sin superar el stock disponible
function addToCart(id, cantidad = 1) {
    const product = findProduct(id)
    if (!product) return false

    const cart = getCart()
    const item = cart.find(item => item.id === id)
    const current = item ? item.cantidad : 0

    if (current >= product.stock) return false

    if (item) {
        item.cantidad = Math.min(current + cantidad, product.stock)
    } else {
        cart.push({
            id,
            cantidad: Math.min(cantidad, product.stock)
        })
    }
    saveCart(cart)
    return true
}

// Cambiamos la cantidad de un producto (si llega a 0 se elimina)
function updateCartQuantity(id, cantidad) {
    const product = findProduct(id)
    if (!product) return

    if (cantidad <= 0) {
        removeFromCart(id)
        return
    }

    const cart = getCart().map(item =>
        item.id === id
            ? { ...item, cantidad: Math.min(cantidad, product.stock) }
            : item
    )
    saveCart(cart)
}

function removeFromCart(id) {
    saveCart(
        getCart().filter(item => item.id !== id)
    )
}

function clearCart() {
    saveCart([])
}

// Unimos el carrito con los datos de cada producto
function getCartItems() {
    return getCart()
        .map(item => {
            const product = findProduct(item.id)
            if (!product) return null
            return {
                ...product,
                cantidad: item.cantidad,
                subtotal: product.precio * item.cantidad
            }
        })
        .filter(item => item !== null)
}

function getCartCount() {
    return getCartItems().reduce((total, item) =>
        total + item.cantidad, 0
    )
}

function getCartTotal() {
    return getCartItems().reduce((total, item) =>
        total + item.subtotal, 0
    )
}

// ================= PEDIDOS =================
function getOrders() {
    return readStorage(STORAGE_KEYS.orders, [])
}

function findOrder(id) {
    return getOrders().find(order => order.id === id) || null
}

// Creamos un pedido con el contenido actual del carrito
function createOrder(envio, metodo) {
    const items = getCartItems()
    if (items.length === 0) return null

    const order = {
        id: String(Date.now()).slice(-6),
        fecha: new Date().toISOString(),
        items: items.map(item => ({
            id: item.id,
            nombre: item.nombre,
            imagen: item.imagen,
            precio: item.precio,
            cantidad: item.cantidad
        })),
        total: getCartTotal(),
        envio,
        metodo
    }

    const orders = getOrders()
    orders.unshift(order)
    writeStorage(STORAGE_KEYS.orders, orders)
    clearCart()
    return order
}

// ================= PERFIL =================
const DEFAULT_PROFILE = {
    nombre: "Lucas Pérez",
    correo: "lucas@gmail.com",
    telefono: "1234 5678"
}

function getProfile() {
    return readStorage(STORAGE_KEYS.profile, DEFAULT_PROFILE)
}

function saveProfile(profile) {
    writeStorage(STORAGE_KEYS.profile, profile)
}

// ================= MENSAJES DE CONTACTO =================
function saveMessage(message) {
    const messages = readStorage(STORAGE_KEYS.messages, [])
    messages.push({
        ...message,
        fecha: new Date().toISOString()
    })
    writeStorage(STORAGE_KEYS.messages, messages)
}
