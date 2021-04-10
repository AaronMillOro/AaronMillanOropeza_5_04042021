const showBasket = () => {
  // displays the details for each product in the cart if they exist
  const all_products = loadCart()
  if (all_products.length > 0){

    let index = 0
    let $all_items = document.querySelector("tbody")
    all_products.forEach(product => {
      index ++
      let $item_details = document.querySelector("#basket-item").content.cloneNode(true)
      $item_details.querySelector("#addition").textContent = index
      $item_details.querySelector("#product-name").textContent = product[0].name
      $item_details.querySelector("#img-cam").src = product[0].imageUrl
      $item_details.querySelector("#img-cam").alt = product[0].name + "-" + index
      $item_details.querySelector("#selected-option").textContent = product[1]
      $item_details.querySelector("#number-items").textContent = product[2]
      $item_details.querySelector("#prix-article").textContent = `${(Number(product[0].price) / 1000)} €`
      $item_details.querySelector("#total").textContent = `${(Number(product[0].price) / 1000) * Number(product[2])} €`
      
      $item_details.querySelector("#addition").setAttribute("id", `addition-${index}`)
      $item_details.querySelector("#img-cam").setAttribute("id", `image-${product[0].name}-${index}`)
      $item_details.querySelector("#selected-option").setAttribute("id", `options-${index}`)
      $item_details.querySelector("#number-items").setAttribute("id", `qty-${index}`)
      $item_details.querySelector("#prix-article").setAttribute("id", `prix-unit-${index}`)
      $item_details.querySelector("#total").setAttribute("id", `prix-total-${index}`)
      
      $all_items.appendChild($item_details)
    })

  } else {

    const $node = document.createElement("h2")
    $node.className = "text-center text-danger"
    var $msg = document.createTextNode("Pas de produits sélectionés")
    $node.appendChild($msg)
    document.querySelector("#cart-block").replaceWith($node)

  }
}

showBasket()