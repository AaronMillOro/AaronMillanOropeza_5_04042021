const validateSelection = ($button, product) =>{
  // Retrieves the selected option per article and returns the given option and the quantity of articles
  const $parent = $button.parentElement
  const $quantity = $parent.querySelector("input[type='number']").value
  const $option = $parent.querySelector("input[type='radio']:checked")
  if ($option !== null) {
    const selection = [product, $option.value, $quantity]
    console.log(selection)
    // add to cart
    return selection 
  } else {
    alert("Choissisez le type de lentilles")
  }
}

const generateProductDetails = product => {
  // Generates the template information of each product to be filled on HTML code
  const $template = document.querySelector("#product-template").content.cloneNode(true)

  // Logic to loop through the possible options per article and generate different values of 'id', 'for' and 'value'
  let $options_block = []
  product.lenses.forEach(option => {
    let $option = `<div class="form-check">
                     <input class="form-check-input" type="radio" name="gridRadios" id="${option}-${product.name}" value="${option}" checked>
                     <label class="form-check-label" for="${option}-${product.name}">${option}</label>
                   </div>`
    $options_block += $option
  })
  $template.querySelector("#options-template").innerHTML = $options_block
  $template.querySelector("#product-img").src = product.imageUrl
  $template.querySelector("#product-img").alt = product.name
  $template.querySelector(".card-title").textContent = product.name
  $template.querySelector("#description").textContent = product.description
  $template.querySelector("#price").textContent = `${product.price / 1000} € / article`
  $template.querySelector("#qtyField").setAttribute("id", `${product.name}-qty`)
  $template.querySelector("#qtyLabel").htmlFor = `${product.name}-qty`

  $template.querySelector("#button-add").addEventListener("click", event => {
    validateSelection(event.target, product)
  })
  
  return $template
}

const displayElements = elements => {
  // Appends the HTML code generated by the function "generateProductDetails" into the block "items"
  const $products = document.querySelector("#items")
  elements.forEach(element => { $products.appendChild(generateProductDetails(element)) })
}

const getElements = async ()  => {
  // Extracts the data from the backend
  return await fetch("http://localhost:3000/api/cameras")
    .then(response => response.json())
    .then(response => displayElements(response))
}

getElements()