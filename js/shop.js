// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
  {
    id: 1,
    name: "cooking oil",
    price: 10.5,
    type: "grocery",
    offer: {
      number: 3,
      percent: 20,
    },
  },
  {
    id: 2,
    name: "Pasta",
    price: 6.25,
    type: "grocery",
  },
  {
    id: 3,
    name: "Instant cupcake mixture",
    price: 5,
    type: "grocery",
    offer: {
      number: 10,
      percent: 30,
    },
  },
  {
    id: 4,
    name: "All-in-one",
    price: 260,
    type: "beauty",
  },
  {
    id: 5,
    name: "Zero Make-up Kit",
    price: 20.5,
    type: "beauty",
  },
  {
    id: 6,
    name: "Lip Tints",
    price: 12.75,
    type: "beauty",
  },
  {
    id: 7,
    name: "Lawn Dress",
    price: 15,
    type: "clothes",
  },
  {
    id: 8,
    name: "Lawn-Chiffon Combo",
    price: 19.99,
    type: "clothes",
  },
  {
    id: 9,
    name: "Toddler Frock",
    price: 9.99,
    type: "clothes",
  },
];

// => Reminder, it's extremely important that you debug your code.
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster.
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

// Exercise 1
function buy(id) {
  // 1. Loop for to the array products to get the item to add to cart
  // 2. Add found product to the cart array
  const producto = products.find((element) => element.id == id);

  if (cart.includes(producto)) {
    producto.cantidad += 1;
    if (
      producto.offer &&
      producto.cantidad &&
      producto.offer.number <= producto.cantidad
    ) {
      producto.total = applyPromotionsCart(producto);
    } else {
      producto.total = Number((producto.cantidad * producto.price).toFixed(2));
    }
  } else {
    producto.cantidad = 1;
    producto.total = Number((producto.cantidad * producto.price).toFixed(2));
    cart.push(producto);
  }

  countProducts();
  calculateTotal();
  countProduct(id);
}

// Exercise 2
function cleanCart() {
  cart.splice(0);
  printCart();
  countProducts();
  calculateTotal();
  resetProduct();
}

// Exercise 3
function calculateTotal() {
  // Calculate total price of the cart using the "cartList" array
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].total;
  }

  let total_price = document.getElementById("total_price");
  total_price.innerHTML = total.toFixed(2);
}

// Exercise 4
function applyPromotionsCart(item) {
  // Apply promotions to each item in the array "cart"
  return Number(
    (
      (item.price - (item.price * item.offer.percent) / 100) *
      item.cantidad
    ).toFixed(2)
  );
}

// Exercise 5
function printCart() {
  // Fill the shopping cart modal manipulating the shopping cart dom
  let cartHtml = "";

  cart.forEach((item) => {
    cartHtml += `<tr>
					<th scope="row">${item.name}</th>
					<td>$${item.price} un</td>
					<td>${item.cantidad}</td>
					<td>${item.total.toFixed(2)}</td>
				</tr>`;
  });

  const cart_list = document.getElementById("cart_list");
  cart_list.innerHTML = cartHtml;
}

// ** Nivell II **

// Exercise 7
function removeFromCart(id) {
  const producto = products.find((element) => element.id == id);

  if (!cart.includes(producto)) {
    alert(`No hay "${producto.name}" en el carrito`);
    return;
  }

  if (cart.includes(producto) && producto.cantidad >= 1) {
    producto.cantidad -= 1;
    if (
      producto.offer &&
      producto.cantidad &&
      producto.offer.number <= producto.cantidad
    ) {
      producto.total = applyPromotionsCart(producto);
    } else {
      producto.total = Number((producto.cantidad * producto.price).toFixed(2));
    }
  }
  if (cart.includes(producto) && producto.cantidad <= 0) {
    cart = cart.filter((item) => item != producto);
  }

  countProducts();
  calculateTotal();
  countProduct(id);
}

function open_modal() {
  printCart();
}

// BONUS Implementacion para modificar la cantidad de productos en el carrito
function countProducts() {
  let cantidadProductos = 0;
  for (let i = 0; i < cart.length; i++) {
    cantidadProductos += cart[i].cantidad;
  }
  const count_product = document.getElementById("count_product");
  count_product.innerHTML = cantidadProductos;
}

function countProduct(id) {
  const count_product = document.getElementById(`count_product_${id}`);

  let cantidad = 0;
  cart.forEach((item) => {
    if (item.id === id) {
      cantidad = item.cantidad;
    }
  });
  count_product.innerHTML = cantidad;
}

function resetProduct() {
  products.forEach((item) => {
    const count_product = document.getElementById(`count_product_${item.id}`);
    count_product.innerHTML = 0;
  });
}
