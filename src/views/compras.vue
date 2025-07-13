<template>
  <div class="container">
    <div class="column-container">
      <div class="column">
        <h1>Productos disponibles</h1>
        <hr />
        <ul v-for="producto in productos" :key="producto.id">
          <li class="product-item">
            <img :src="producto.imagen">
            <div class="product-info">
              <span class="product-name">{{producto.nombre}}</span>
              <span class="product-price">Precio $: {{producto.precio}}</span>
              <button class="boton" @click="annadealcarrito(producto)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                </svg>
                Agregar al carrito
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div class="column">
        <h1>Productos en el carrito</h1>
        <hr />
        <ul v-for="item in carrito" :key="item.producto.id">
          <li class="product-item">
            <img :src="item.producto.imagen">
            <div class="product-info">
              <span class="product-name">{{item.producto.nombre}}</span>
              <span class="product-quantity">Cantidad: {{item.cantidad}}</span>
              <button class="boton" @click="eliminarDelCarrito(item)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                </svg>
                Remover del carrito
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="total-container">
      <h2>Total a pagar: ${{ total }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productos: [
        { id:1, nombre:"Audifono", precio: 30000, stock: 3, imagen: "src/assets/img/audifono.jpg" },
        { id:2, nombre:"Mouse", precio: 20000, stock: 5, imagen: "src/assets/img/mouse.jpg" },
        { id:3, nombre:"Teclado", precio: 15000, stock: 10, imagen: "src/assets/img/teclado.jpg" },
        { id:4, nombre:"Gabinete", precio: 35000, stock: 4, imagen: "src/assets/img/gabinete.jpg" },
        { id:5, nombre:"Pantalla", precio: 175000, stock: 3, imagen: "src/assets/img/pantalla.jpg" },
        { id:6, nombre:"Silla", precio: 150000, stock: 2, imagen: "src/assets/img/silla.jpg" }
      ],
      carrito: []
    };
  },
  computed: {
    total() {
      return this.carrito.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0);
    }
  },
  methods: {
    annadealcarrito(producto) {
      let carritoItem = this.carrito.find(item => item.producto.id === producto.id);
      if (carritoItem) {
        if (carritoItem.cantidad < producto.stock) {
          carritoItem.cantidad++;
        } else {
          alert("No hay más unidades disponibles en stock");
        }
      } else {
        this.carrito.push({ producto, cantidad: 1 });
      }
    },
    eliminarDelCarrito(item) {
      let index = this.carrito.indexOf(item);
      if (item.cantidad > 1) {
        item.cantidad--;
      } else {
        this.carrito.splice(index, 1);
      }
    }
  }
}
</script>

<style scoped>
.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.column-container {
  display: flex;
  gap: 40px;
  margin-bottom: 30px;
}

.column {
  flex: 1;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
  text-align: center;
}

hr {
  border: none;
  border-top: 2px solid #ddd;
  margin-bottom: 20px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.product-item {
  display: flex;
  align-items: flex-start;
  padding: 15px;
  margin-bottom: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.product-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 15px;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.product-name {
  font-weight: bold;
  font-size: 16px;
  color: #333;
}

.product-price, .product-quantity {
  color: #666;
  font-size: 14px;
}

.boton {
  background-color: #6c5ce7;
  color: white;
  font-size: 12px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  align-self: flex-start;
  margin-top: 5px;
}

.boton:hover {
  background-color: #5a4fcf;
}

.boton svg {
  width: 14px;
  height: 14px;
  margin-right: 6px;
}

.total-container {
  text-align: center;
  background: #2d3436;
  color: white;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

.total-container h2 {
  margin: 0;
  font-size: 28px;
  font-weight: bold;
}

@media (max-width: 768px) {
  .column-container {
    flex-direction: column;
    gap: 20px;
  }

  .product-item {
    flex-direction: column;
    text-align: center;
  }

  .product-item img {
    margin-right: 0;
    margin-bottom: 10px;
  }
}
</style>