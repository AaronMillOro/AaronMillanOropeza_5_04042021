const validateForm = (ids_list) => {
  document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault()
    const contact = {
      "firstName": document.querySelector("#user-name").value,
      "lastName": document.querySelector("#user-lastname").value,
      "address": document.querySelector("#user-address").value,
      "city": document.querySelector("#user-city").value,
      "email": document.querySelector("#user-email").value,
    }
    console.log(contact, ids_list)
  })
}

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
      $item_details.querySelector("#total").textContent = `${Math.trunc((Number(product[0].price) / 1000) * (Number(product[2])) * 100) / 100} €`
      
      $item_details.querySelector("#addition").setAttribute("id", `addition-${index}`)
      $item_details.querySelector("#img-cam").setAttribute("id", `image-${product[0].name}-${index}`)
      $item_details.querySelector("#selected-option").setAttribute("id", `options-${index}`)
      $item_details.querySelector("#number-items").setAttribute("id", `qty-${index}`)
      $item_details.querySelector("#prix-article").setAttribute("id", `prix-unit-${index}`)
      $item_details.querySelector("#total").setAttribute("id", `prix-total-${index}`)
      
      $all_items.appendChild($item_details)
    })

    calculateArticles(all_products)
    calculateTotal(all_products)

    document.querySelector("#empty-cart").addEventListener("click", event => {
      emptyCart()
      document.location.reload()
    })
    document.querySelector("#checkout-btn").addEventListener("click", event => {
      validateForm(generateIdList(all_products))
    })

  } else {

    const $node = document.createElement("h2")
    $node.className = "text-center text-danger"
    var $msg = document.createTextNode("Pas de produits sélectionés")
    $node.appendChild($msg)
    document.querySelector("#cart-block").replaceWith($node)

  }
}


const calculateArticles = (all_products) => {
  let total_items = 0
  all_products.forEach(product => { total_items += Number(product[2]) })
  if (total_items == 1) {
    document.querySelector("#total-articles").textContent = `pour ${total_items} article`
  } else {
    document.querySelector("#total-articles").textContent = `pour ${total_items} articles`
  }
}


const generateIdList = (all_products) => {
  let idList = []
  all_products.forEach(product => { 
    for (let counter = 1; counter <= product[2]; counter++) {
      idList.push(product[0]._id) 
    }
  })
  return idList
}


const calculateTotal = (all_products) => {
  let total_amount = 0
  all_products.forEach(product => { total_amount += Number(product[0].price) * Number(product[2]) })
  document.querySelector("#checkout").textContent = `Total: ${Number(total_amount) / 1000} €`
}


showBasket()