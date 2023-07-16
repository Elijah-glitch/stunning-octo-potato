// Item data
const items = [
  { id: 1, name: 'Item 1', price: 10, image: 'item1.jpg' },
  { id: 2, name: 'Item 2', price: 15, image: 'item2.jpg' },
  { id: 3, name: 'Item 3', price: 20, image: 'item3.jpg' },
];

// Accessory data
const accessories = [
  { id: 1, name: 'Accessory 1', price: 5 },
  { id: 2, name: 'Accessory 2', price: 8 },
  { id: 3, name: 'Accessory 3', price: 12 },
];

// Function to render item cards
function renderItems() {
  const itemList = document.getElementById('item-list');
  itemList.innerHTML = '';

  items.forEach(item => {
    const itemCard = document.createElement('div');
    itemCard.classList.add('item-card');

    const itemImage = document.createElement('img');
    itemImage.src = item.image;
    itemImage.alt = item.name;

    const itemName = document.createElement('h3');
    itemName.textContent = item.name;

    const itemPrice = document.createElement('p');
    itemPrice.textContent = `$${item.price}`;

    const addToCartBtn = document.createElement('button');
    addToCartBtn.textContent = 'Add to Cart';
    addToCartBtn.addEventListener('click', () => addToCart(item));

    itemCard.appendChild(itemImage);
    itemCard.appendChild(itemName);
    itemCard.appendChild(itemPrice);
    itemCard.appendChild(addToCartBtn);

    itemList.appendChild(itemCard);
  });
}

// Function to render accessory checkboxes
function renderAccessories() {
  const accessoryList = document.getElementById('accessory-list');
  accessoryList.innerHTML = '';

  accessories.forEach(accessory => {
    const accessoryCheckbox = document.createElement('input');
    accessoryCheckbox.type = 'checkbox';
    accessoryCheckbox.id = `accessory-${accessory.id}`;

    const accessoryLabel = document.createElement('label');
    accessoryLabel.textContent = accessory.name;
    accessoryLabel.htmlFor = `accessory-${accessory.id}`;

    accessoryList.appendChild(accessoryCheckbox);
    accessoryList.appendChild(accessoryLabel);
  });
}

// Function to handle adding items to the cart
function addToCart(item) {
  const cart = document.getElementById('cart');

  const cartItem = document.createElement('div');
  cartItem.classList.add('cart-item');

  const itemName = document.createElement('p');
  itemName.textContent = item.name;

  const itemPrice = document.createElement('p');
  itemPrice.textContent = `$${item.price}`;

  cartItem.appendChild(itemName);
  cartItem.appendChild(itemPrice);

  cart.appendChild(cartItem);
}

// Call the render functions to populate the website
renderItems();
renderAccessories();
