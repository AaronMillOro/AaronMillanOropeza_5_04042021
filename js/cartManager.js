const showToast = (message) => {
  const msg = document.querySelector(".toast-body")
  msg.textContent = message
  $(".toast").toast("show")
}


const saveCart = products => {
  // stores an array of selected products into the localStorage key "cart" as a string
  localStorage.setItem("cart", JSON.stringify(products))
} 


const loadCart = () => {
  // retrieves the key "cart" as a JS object
  const cart = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : []
  return cart
}


const emptyCart = () => {
  // removes the key "cart" from localStorage
  localStorage.removeItem("cart")
}


const addToCart = selection => {
  // adds a selected product to the key "cart" in localStorage. When "cart" is parsed it is an array of arrays 
  let all_products = loadCart()
  all_products.push(selection)
  saveCart(all_products)
  showToast(`La caméra ${selection[0].name} a été ajouté au panier`)
  setTimeout(function(){ document.location.reload() }, 3000)
}


const showNumberItems = () => {
  // displays the number of items added to the cart in the nav bar
  const all_products = loadCart()
  const $indicator = document.querySelector("#basket-items")
  let $number_items = 0
  all_products.forEach(product => { $number_items += parseInt(product[2])})
  if ($number_items) {
    $indicator.textContent = $number_items 
  }
}

showNumberItems()