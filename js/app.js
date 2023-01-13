const cart = document.querySelector('#cart');
const containerCart = document.querySelector('#list-cart tbody');
const emptyCart = document.querySelector('#empty-cart');
const listItem = document.querySelector('#list-items');
const acountTotal = document.querySelector('#amonutTotal');
let totalItem = 0;
let itemsCart = [];

addEvents();
function addEvents(){
    listItem.addEventListener('click', addItem);
    emptyCart.addEventListener('click', () => {
        deleteAcount();
        itemsCart = [];
        cleanHTML();
    })
}

function addItem(e){
    addAcount();
    e.preventDefault();
    if(e.target.classList.contains('add-cart')){
        const selectItem = e.target.parentElement.parentElement;
        readData(selectItem);
    }
}

function readData(item){
    const infoItem = {
        image: item.querySelector('img').src,
        title: item.querySelector('h3').textContent,
        price: item.querySelector('.item-price .realPrice').textContent,
        id: item.querySelector('a').getAttribute('data-id'),
        amount: 1,
    }

    const exists = itemsCart.some(item => item.id === infoItem.id);
    if(exists){
        const items = itemsCart.map(item => {
            if(item.id === infoItem.id){
                item.amount++;
                return item;
            }else{
                return item;
            }
        });
        itemsCart = [...items];
    }else{
        itemsCart = [...itemsCart, infoItem];
    }

    cartHTML();
}

function cartHTML(){
    //clean HTML
    cleanHTML();

    itemsCart.forEach( article => {
        const row = document.createElement('tr');
        const {image, title, price, amount, id} = article;
        row.innerHTML = `
        <td> <img src="${image}" width="100"> </td>
        <td> ${title} </td>  
        <td> ${price} </td>
        <td> ${amount} </td>
        `;
        containerCart.appendChild(row);
    })
}

function cleanHTML(){
    //containerCart.innerHTML = '';
    while(containerCart.firstChild){
        containerCart.removeChild(containerCart.firstChild);
    }
}

function addAcount(){
    totalItem++;
    acountTotal.innerHTML = totalItem;
}
function deleteAcount(){
    totalItem = 0;
    acountTotal.innerHTML = totalItem;
}
