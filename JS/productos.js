// Catálogo de productos de CampusShop
const PRODUCTS = [
    // ================= TECNOLOGÍA =================
    {
        id: "audifonos-bluetooth",
        nombre: "Audífonos Bluetooth",
        categoria: "tecnologia",
        precio: 199,
        precioAnterior: 249,
        descripcion: "Audífonos inalámbricos con sonido envolvente, almohadillas cómodas y batería de larga duración.",
        imagen: "./img/auriculares_bluetooth.webp",
        stock: 12,
        vendidos: 48,
        destacado: true
    },
    {
        id: "laptop-lenovo",
        nombre: "Laptop Lenovo",
        categoria: "tecnologia",
        precio: 9190,
        descripcion: "Laptop de 15.6\" ideal para estudiar y programar, con buen rendimiento y diseño ligero.",
        imagen: "./img/laptop_campus.jpg",
        stock: 5,
        vendidos: 9,
        destacado: false
    },
    {
        id: "lenovo-legion-pro-7",
        nombre: "Laptop Lenovo Legion Pro 7",
        categoria: "tecnologia",
        precio: 45389,
        descripcion: "Laptop gamer de alto rendimiento con gráfica dedicada, pantalla de alta frecuencia y teclado RGB.",
        imagen: "./img/lenovo.jpg",
        stock: 2,
        vendidos: 3,
        destacado: false
    },
    {
        id: "mouse-campuslands",
        nombre: "Mouse Campuslands",
        categoria: "tecnologia",
        precio: 140,
        precioAnterior: 175,
        descripcion: "Mouse inalámbrico con buena precisión, baja latencia y muy buen rendimiento.",
        imagen: "./img/mouse_campus.webp",
        stock: 25,
        vendidos: 64,
        destacado: true
    },
    {
        id: "ssd-campuslands",
        nombre: "SSD Campuslands",
        categoria: "tecnologia",
        precio: 1500,
        descripcion: "Unidad de estado sólido de alta velocidad para que tu equipo arranque y cargue en segundos.",
        imagen: "./img/ssd_campus.webp",
        stock: 8,
        vendidos: 21,
        destacado: false
    },
    {
        id: "parlante-mars-pro",
        nombre: "Parlante Mars Pro",
        categoria: "tecnologia",
        precio: 2750,
        descripcion: "Parlante con diseño espacial, sonido potente y conexión Bluetooth.",
        imagen: "./img/mars-pro.jpg",
        stock: 4,
        vendidos: 11,
        destacado: false
    },

    // ================= VESTIMENTA =================
    {
        id: "gorra-unisex",
        nombre: "Gorra Unisex Campuslands",
        categoria: "vestimenta",
        precio: 120,
        precioAnterior: 150,
        descripcion: "Gorra de algodón, cómoda y con diseño único.",
        imagen: "./img/gorra_campus.webp",
        stock: 30,
        vendidos: 57,
        destacado: true
    },
    {
        id: "sudadera-pro",
        nombre: "Sudadera Pro Campuslands",
        categoria: "vestimenta",
        precio: 200,
        descripcion: "Sudadera negra, con temática Campuslands, material de buena calidad, cómoda y resistente, con efecto fluorescente en la oscuridad.",
        imagen: "./img/sudadera_pro.avif",
        stock: 3,
        vendidos: 40,
        destacado: false
    },
    {
        id: "sudadera-campuslands",
        nombre: "Sudadera Campuslands",
        categoria: "vestimenta",
        precio: 175,
        descripcion: "Sudadera beige, con temática Campuslands, material de buena calidad, cómoda y resistente.",
        imagen: "./img/sudadera_campus.webp",
        stock: 15,
        vendidos: 33,
        destacado: false
    },
    {
        id: "playera-campuslands",
        nombre: "Playera Campuslands",
        categoria: "vestimenta",
        precio: 125,
        descripcion: "Playera de algodón con el logo de Campuslands, fresca y cómoda para el día a día.",
        imagen: "./img/playera-campus.webp",
        stock: 20,
        vendidos: 29,
        destacado: false
    },
    {
        id: "jogger-nasa",
        nombre: "Jogger Nasa Campuslands",
        categoria: "vestimenta",
        precio: 150,
        precioAnterior: 190,
        descripcion: "Jogger con diseño único, material de alta calidad y comodidad en cada movimiento.",
        imagen: "./img/jogger-nasa.webp",
        stock: 18,
        vendidos: 36,
        destacado: true
    },

    // ================= ACCESORIOS =================
    {
        id: "funda-iphone-16-pro-max",
        nombre: "Funda de iPhone 16 Pro Max",
        categoria: "accesorios",
        precio: 180,
        descripcion: "Funda resistente a golpes con diseño Campuslands para iPhone 16 Pro Max.",
        imagen: "./img/funda_campus.webp",
        stock: 14,
        vendidos: 19,
        destacado: false
    },
    {
        id: "llavero-campuslands",
        nombre: "Llavero Campuslands",
        categoria: "accesorios",
        precio: 50,
        precioAnterior: 65,
        descripcion: "Llavero metálico con el logo de Campuslands.",
        imagen: "./img/llavero_campus.jpg",
        stock: 40,
        vendidos: 52,
        destacado: false
    },
    {
        id: "mini-powerbank",
        nombre: "Mini PowerBank Campuslands",
        categoria: "accesorios",
        precio: 350,
        descripcion: "Batería portátil compacta para cargar tu teléfono en cualquier lugar.",
        imagen: "./img/mini-bank.avif",
        stock: 10,
        vendidos: 24,
        destacado: false
    },
    {
        id: "powerward",
        nombre: "Powerward Campuslands",
        categoria: "accesorios",
        precio: 1550,
        descripcion: "Estación de carga de alta capacidad con varios puertos para tus dispositivos.",
        imagen: "./img/powerward.avif",
        stock: 6,
        vendidos: 7,
        destacado: false
    }
]

// Nombres visibles de cada categoría
const CATEGORIES = {
    tecnologia: "Tecnología",
    vestimenta: "Vestimenta",
    accesorios: "Accesorios"
}

// Buscamos un producto por su id
function findProduct(id) {
    return PRODUCTS.find(product => product.id === id) || null
}
