# CampusShop GT

## :pencil: Descripción
CampusShop es una plataforma de comercio electrónico para la comunidad Campuslands, con
productos de tecnología, vestimenta y accesorios. Este proyecto simula un entorno real de
e-commerce, integrando diseño responsivo, navegación intuitiva y un flujo de compra completo
que guarda la información en el navegador mediante `LocalStorage`.

## :rocket: Vista previa
:point_right: https://canuxantonio502.github.io/campusshop/index.html

## :hammer_and_wrench: Tecnologías utilizadas
- HTML5
- CSS3
- JavaScript
- LocalStorage
- Git & GitHub

## :sparkles: Características
- **Catálogo dinámico:** los productos se generan desde un solo archivo de datos.
- **Búsqueda y filtros:** búsqueda sin importar tildes ni mayúsculas, filtro de ofertas y orden por más vendidos o precio.
- **Categorías:** Tecnología, Vestimenta y Accesorios.
- **Página de producto:** detalle por `producto.html?id=`, selector de cantidad según el stock y productos relacionados.
- **Carrito de compras:** agregar, cambiar cantidades, quitar productos y vaciar el carrito, con contador en el encabezado.
- **Checkout:** validación de datos de envío, selección del método de pago y creación del pedido.
- **Historial de compras:** lista de pedidos y detalle de cada uno.
- **Comparador:** compara dos productos cualquiera.
- **Perfil de usuario:** los cambios se guardan y se reutilizan en el checkout y el contacto.
- **Contacto:** formulario con validación que guarda los mensajes.
- **Tema claro y oscuro:** botón en el encabezado que recuerda la elección; si no hay una guardada, usa el tema del sistema.
- **Diseño responsivo** con menú lateral.

## :floppy_disk: Datos en LocalStorage
| Llave | Contenido |
| :--- | :--- |
| `cart` | Productos del carrito (`id` y `cantidad`) |
| `orders` | Pedidos realizados |
| `profile` | Datos del perfil |
| `messages` | Mensajes enviados desde contacto |
| `theme` | Tema elegido (`light` o `dark`) |

## :bone: Estructura del proyecto
```text
campusshop/
│
├── index.html          # Inicio, búsqueda y productos destacados
├── catalogo.html       # Catálogo completo
├── tecnologia.html     # Categorías
├── vestimenta.html
├── accesorios.html
├── producto.html       # Detalle de producto (?id=)
├── comparador.html     # Comparador de productos
├── carrito.html
├── checkout.html
├── historial.html
├── pedidopasado.html   # Detalle de pedido (?id=)
├── perfil.html
├── contacto.html
│
├── CSS/
│   ├── base.css
│   ├── componentes.css
│   ├── layout.css
│   └── responsive.css
│
├── JS/
│   ├── productos.js    # Datos de los productos
│   ├── storage.js      # Carrito, pedidos, perfil y mensajes
│   ├── ui.js           # Utilidades y componentes compartidos
│   ├── tema.js         # Tema claro / oscuro
│   ├── catalogo.js
│   ├── producto.js
│   ├── carrito.js
│   ├── checkout.js
│   ├── historial.js
│   ├── pedido.js
│   ├── comparador.js
│   ├── perfil.js
│   └── contacto.js
│
└── img/
```

## :gear: Instalación y uso
1. Clona este repositorio
   ```bash
   git clone https://github.com/canuxantonio502/campusshop.git
   ```
2. Abre el archivo `index.html` en tu navegador (o usa la extensión Live Server).

## Objetivo del proyecto
Este proyecto fue desarrollado como práctica para fortalecer habilidades en:
- Desarrollo web Front-End
- Diseño UI/UX
- Manipulación del DOM con JavaScript
- Estructuración de proyectos reales
- Simulación de un sistema E-commerce

## :wrench: Futuras Mejoras
- Integración con Back-End
- Sistema de autenticación real
- Base de datos de productos
- Métodos de pagos reales
- Panel de administración

## :feather: Autores
He aquí los responsables de que este proyecto se haya podido llevar a cabo:

* **Antonio Canux** - *Único colaborador* - [canuxantonio502](https://github.com/canuxantonio502)
