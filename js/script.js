const products = [
{
id:2,
name:"Футболка Белая",
price:1600,
category:"tshirt",
image:"images/shirt.jpg"
},

{
id:2,
name:"Футболка черная",
price:1600,
category:"tshirt",
image:"images/shirt1.jpg"
},

{
id:3,
name:"Футболка oversize",
price:1700,
category:"tshirt",
image:"images/shirt2.jpg"
},

{
id:4,
name:"Куртка зимняя",
price:4500,
category:"jacket",
image:"images/jacket.jpg"
},

{
id:5,
name:"Куртка демисезонная",
price:4200,
category:"jacket",
image:"images/jacket1.jpg"
},

{
id:6,
name:"Куртка кожаная",
price:5200,
category:"jacket",
image:"images/jacket2.jpg"
},

{
id:7,
name:"Джинсы синие",
price:3000,
category:"jeans",
image:"images/jeans.jpg"
},

{
id:8,
name:"Джинсы черные",
price:3100,
category:"jeans",
image:"images/jeans1.jpg"
},

{
id:9,
name:"Джинсы широкие",
price:3300,
category:"jeans",
image:"images/jeans2.jpg"
},

{
id:10,
name:"Худи серое",
price:3500,
category:"hoodie",
image:"images/hoodie.jpg"
},

{
id:11,
name:"Худи черное",
price:3600,
category:"hoodie",
image:"images/hoodie1.jpg"
},

{
id:12,
name:"Худи oversize",
price:3800,
category:"hoodie",
image:"images/hoodie2.jpg"
},

{
id:13,
name:"Спортивные штаны",
price:2800,
category:"pants",
image:"images/jeans3.jpg"
},

{
id:14,
name:"Шорты летние",
price:2000,
category:"pants",
image:"images/jeans4.jpg"
},

{
id:15,
name:"Свитшот",
price:3200,
category:"hoodie",
image:"images/hoodie3.jpg"
},

{
id:16,
name:"Пуховик",
price:6500,
category:"jacket",
image:"images/jacket3.jpg"
}


];

function displayProducts(products){

const container = document.getElementById("products");

container.innerHTML = "";

products.forEach(function(product){

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

let isFavorite = favorites.includes(Number(product.id));

container.innerHTML +=

'<div class="product">' +

'<div class="product-image">' +

'<img src="' + product.image + '" alt="' + product.name + '">' +

'<div class="product-actions">' +
'<button onclick="addToCart(' + product.id + ')">🛒</button>' +
'<button onclick="toggleFavorite(this,' + product.id + ')" class="fav-btn ' + (isFavorite ? 'active' : '') + '">❤</button>' +
'</div>' +

'</div>' +

'<h3>' + product.name + '</h3>' +
'<p>' + product.price + ' ₽</p>' +

'</div>';

});

}

if(document.getElementById("products")){
displayProducts(products);
}


const searchInput = document.getElementById("search");

if(searchInput){

searchInput.addEventListener("input", function(){

let value = this.value.toLowerCase();

let filtered = products.filter(function(p){
return p.name.toLowerCase().includes(value);
});

displayProducts(filtered);

});

}


const filter = document.getElementById("filter");

if(filter){

filter.addEventListener("change", function(){

let category = this.value;

if(category === "all"){
displayProducts(products);
}else{

let filtered = products.filter(function(p){
return p.category === category;
});

displayProducts(filtered);

}

});

}


function addToCart(id){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.push(id);

localStorage.setItem("cart", JSON.stringify(cart));

updateCartCount();

showNotification("Товар добавлен в корзину");

}


function updateCartCount(){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let element = document.getElementById("cart-count");

if(element){
element.textContent = cart.length;
}

}

updateCartCount();

function displayCart(){

const cartItems = document.getElementById("cart-items");

if(!cartItems) return;

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cartItems.innerHTML = "";

let total = 0;

cart.forEach(function(id){

let product = products.find(p => p.id === id);

if(product){

total += product.price;

cartItems.innerHTML +=
'<div class="cart-item">' +
'<span>' + product.name + '</span>' +
'<span>' + product.price + ' ₽</span>' +
'<button onclick="removeFromCart(' + product.id + ')">Удалить</button>' +
'</div>';

}

});

const totalElement = document.getElementById("total");

if(totalElement){
totalElement.textContent = total + " ₽";
}

}


function removeFromCart(id){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let index = cart.indexOf(id);

if(index > -1){
cart.splice(index,1);
}

localStorage.setItem("cart", JSON.stringify(cart));

updateCartCount();

}

displayCart();
function displayCart(){

const cartItems = document.getElementById("cart-items");

if(!cartItems) return;

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cartItems.innerHTML = "";
if(cart.length === 0){

cartItems.innerHTML =
'<div class="empty-favorites">' +
'<h3>🛒 Ваша корзина пуста</h3>' +
'<p>Добавляйте товары из каталога</p>' +
'<a href="catalog.html" class="go-shopping">Перейти в каталог</a>' +
'</div>';

return;

}

let total = 0;

let counts = {};

cart.forEach(function(id){
counts[id] = (counts[id] || 0) + 1;
});

for(let id in counts){

let product = products.find(p => p.id == id);

let quantity = counts[id];

let sum = product.price * quantity;

total += sum;

cartItems.innerHTML +=
'<div class="cart-item">' +
'<span>' + product.name + '</span>' +
'<div>' +
'<button onclick="decreaseItem(' + id + ')">-</button>' +
' ' + quantity + ' ' +
'<button onclick="increaseItem(' + id + ')">+</button>' +
'</div>' +
'<span>' + sum + ' ₽</span>' +
'</div>';

}

const totalElement = document.getElementById("total");

if(totalElement){
totalElement.textContent = total + " ₽";
}

}


function increaseItem(id){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.push(Number(id));

localStorage.setItem("cart", JSON.stringify(cart));

displayCart();
updateCartCount();

}


function decreaseItem(id){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let index = cart.indexOf(Number(id));

if(index > -1){
cart.splice(index,1);
}

localStorage.setItem("cart", JSON.stringify(cart));

displayCart();
updateCartCount();

}


function clearCart(){

localStorage.removeItem("cart");

displayCart();
updateCartCount();

}

displayCart();
function showOrderForm(){

const form = document.getElementById("order-form");

if(form){
form.style.display = "block";
}

}

function sendOrder(event){

event.preventDefault();

alert("Заказ оформлен! Мы скоро свяжемся с вами.");

localStorage.removeItem("cart");

updateCartCount();
displayCart();

document.getElementById("order-form").style.display = "none";

}
// =============================
// ДОБАВИТЬ ТОВАР В ИЗБРАННОЕ
// =============================

function addToFavorites(id){

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// чтобы товар не добавлялся дважды
if(!favorites.includes(id)){

favorites.push(id);

localStorage.setItem("favorites", JSON.stringify(favorites));

alert("❤️ Товар добавлен в избранное");

}

updateFavoritesCount();

}


// =============================
// УДАЛИТЬ ИЗ ИЗБРАННОГО
// =============================

function removeFavorite(id){

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

favorites = favorites.filter(function(item){
return item != id;
});

localStorage.setItem("favorites", JSON.stringify(favorites));

loadFavorites();
updateFavoritesCount();

}


// =============================
// СЧЕТЧИК ИЗБРАННОГО
// =============================

function updateFavoritesCount(){

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

let counter = document.getElementById("fav-count");

if(counter){
counter.textContent = favorites.length;
}

}

// запускаем счетчик
// запускаем счетчик
updateFavoritesCount();


// =============================
// ЗАГРУЗКА СТРАНИЦЫ ИЗБРАННОГО
// =============================

function loadFavorites(){

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

let container = document.getElementById("favorites-container");

if(!container) return;

container.innerHTML = "";

// если избранных товаров нет
if(favorites.length === 0){

container.innerHTML =
'<div class="empty-favorites">' +
'<h3>❤️ Товары пока не добавлены в избранное</h3>' +
'<p>Добавляйте товары из каталога</p>' +
'<a href="catalog.html" class="go-shopping">Перейти в каталог</a>' +
'</div>';

return;

}

// вывод товаров
favorites.forEach(function(id){

let product = products.find(function(p){
return p.id == id;
});

if(!product) return;

container.innerHTML +=
'<div class="product">' +
'<img src="' + product.image + '" alt="' + product.name + '">' +
'<h3>' + product.name + '</h3>' +
'<p>' + product.price + ' ₽</p>' +
'<button onclick="addToCart(' + product.id + ')">🛒 В корзину</button>' +
'<button onclick="removeFavorite(' + product.id + ')">❌ Удалить</button>' +
'</div>';

});

}


// запуск загрузки страницы избранного
loadFavorites();

function toggleFavorite(button, id){

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

id = Number(id);

if(favorites.includes(id)){

favorites = favorites.filter(item => item != id);
button.classList.remove("active");

}else{

favorites.push(id);
button.classList.add("active");

}

localStorage.setItem("favorites", JSON.stringify(favorites));

updateFavoritesCount();

// если мы на странице избранного — обновить список
loadFavorites();

}
function showNotification(text){

let n = document.getElementById("notification");

if(!n) return;

n.textContent = text;
n.style.opacity = "1";

setTimeout(function(){
n.style.opacity = "0";
},2000);

}
function showNotification(text){

let n = document.getElementById("notification");

if(!n) return;

n.textContent = text;
n.classList.add("show");

setTimeout(function(){
n.classList.remove("show");
},2000);

}
document.addEventListener("DOMContentLoaded", function(){

const supportButton = document.getElementById("support-button");
const supportChat = document.getElementById("support-chat");
const closeBtn = document.getElementById("close-chat");

// открыть чат
if(supportButton){
supportButton.onclick = function(){
supportChat.classList.add("active");
};
}

// закрыть чат
if(closeBtn){
closeBtn.onclick = function(){
supportChat.classList.remove("active");
};
}

});


// отправка сообщения
function sendMessage(){

let input = document.getElementById("chat-message");
let text = input.value;

if(text.trim() === "") return;

let body = document.querySelector(".chat-body");

// сообщение пользователя
body.innerHTML += `<div class="msg user">${text}</div>`;

// печатает...
let typing = document.createElement("div");
typing.className = "msg bot typing";
typing.innerHTML = "Печатает...";
body.appendChild(typing);

body.scrollTop = body.scrollHeight;

// ответ
setTimeout(function(){

typing.remove();

let reply = getBotReply(text);

body.innerHTML += `<div class="msg bot">${reply}</div>`;

body.scrollTop = body.scrollHeight;

},1500);

input.value = "";
}


// умный ответ
function getBotReply(text){

text = text.toLowerCase();

if(text.includes("доставка")){
return "🚚 Доставка занимает 2-5 дней";
}

if(text.includes("цена")){
return "💰 Все цены указаны в каталоге";
}

if(text.includes("заказ")){
return "📦 Вы можете оформить заказ через корзину";
}

if(text.includes("привет")){
return "👋 Здравствуйте! Чем могу помочь?";
}

return "Спасибо! Мы скоро ответим 😊";
}
function quickMsg(text){
document.getElementById("chat-message").value = text;
sendMessage();
}