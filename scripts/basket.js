import { product } from "./productCard.js"

let basket = document.querySelector('.basket')

let basketButton = document.querySelector('#basket-button').addEventListener('click', () => {
    basket.classList.add('show')
})

let basketCloseButton = document.querySelector('.basket-close-button').addEventListener('click', () => {
    basket.classList.remove('show')
})

const basketData = []
let basketCard = document.querySelector('.basket-card')
let totalPrice = document.querySelector('.basket-change-price')
let basketPrice = document.querySelector('.basket-price')

function addProduct(productName) {
    const prod = product.find(item => item.name === productName);
        if(prod) {
            const newProduct = {
                image: prod.img,
                name: prod.name,
                price: prod.price
            }
            basketData.push(newProduct)
            updateProduct()
        }
}

function updateProduct() {
    let output = ``
    let basketPrice = 0

    for(let basket of basketData) {
        output += `
            <div class="basket-item">
                <div class="basket-image">
                    <img src="${basket.image}">
                </div>
                <div class="basket-description">
                    <h4>${basket.name}</h4>
                    <p>${basket.price} ₸</p>
                    <button class="basket-delete" data-name="${basket.name}"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                </div>
            </div>
        `
        basketPrice += basket.price
    }


    totalPrice.innerHTML = basketPrice + ' ₸'
    basketCard.innerHTML = output
    
    isBasketEmpty ()
    deleteItemFromBasket()
    console.log(basketPrice);
    
}

function attachBuyButtonHandlers() {
    document.querySelectorAll('.buy-button').forEach(button => {
        button.addEventListener('click', () => {
            let productName = button.closest('.product-description').querySelector('h4').textContent;
            addProduct(productName)
            console.log(basketData)
        })
    })
}

function isBasketEmpty () {
    let basketEmpty = document.querySelector('.basket-empty')
    if(basketData.length > 0) {
        basketEmpty.style.display = 'none'
        basketPrice.style.display = 'flex'
    }else{
        basketEmpty.style.display = 'flex'
        basketPrice.style.display = 'none'
    }
}

function deleteItemFromBasket() {
    let basketDelete = document.querySelectorAll('.basket-delete').forEach(button => {
        button.addEventListener('click', () => {
            let deleteItem = button.getAttribute('data-name');
            for(let i = 0; i < basketData.length; i++) {
                if(basketData[i].name === deleteItem) {
                    basketData.splice(i, 1)
                }
            }
            updateProduct()
        })
    })
    
}

export {attachBuyButtonHandlers, addProduct};
export {basketData};