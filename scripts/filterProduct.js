import {product} from './productCard.js';
import {cutText} from './cutText.js';
import { attachBuyButtonHandlers } from './basket.js';




let topContent = document.querySelector('.menu-button')
let categories = []
for(let item of product){
    categories.push(item.category)
}
categories = [...new Set(categories)]

let output = `<button class="menu-btn" data-category="все">Меню</button><button class="menu-btn" data-category="скидка">Скидки</button>`

for(let category of categories){
    output += `<button class="menu-btn" data-category="${category}">${category}</button>`
}

topContent.innerHTML = output

document.querySelectorAll('.menu-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const category = event.target.getAttribute('data-category');
        filterItem(category)
    })
})


let productCard = document.querySelector('.product')
let describe = ``
for (let prod of product) {
    describe += `
        <div class="product-card">
            <div class="product-image">
                <img src = "${prod.img}">
            </div>
            <div class="product-description">
                <div class="product-discount">
                    ${prod.discount > 0 ? `<p>-${prod.discount}%</p>` : ''}
                </div>
                <h4>${prod.name}</h4>
                <p class="product-text">${prod.describe}</p>
                <p class="product-price">${prod.price} ₸</p>
                <div>
                    <button class="buy-button" data-name="${prod.name}">+ корзину</button>
                </div>
            </div>
        </div>`
}
productCard.innerHTML = describe
cutText('.product-text', 35);
attachBuyButtonHandlers();

function filterItem (categ) {
    let outputFilter = ``;
    for (let prod of product) {
        if (prod.category === categ || categ === 'все') {
            outputFilter += `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${prod.img}">
                    </div>
                    <div class="product-description">
                        <div class="product-discount">
                            ${prod.discount > 0 ? `<p>-${prod.discount}%</p>` : ''}
                        </div>
                        <h4>${prod.name}</h4>
                        <p class="product-text">${prod.describe}</p>
                        <p class="product-price">${prod.price} ₸</p>
                        <div>
                            <button class="buy-button">+ корзину</button>
                        </div>
                    </div>
                </div>`;
        } else if (categ === 'скидка' && prod.discount > 0) {
            outputFilter += `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${prod.img}">
                    </div>
                    <div class="product-description">
                        <div class="product-discount">
                            <p>-${prod.discount}%</p>
                        </div>
                        <h4>${prod.name}</h4>
                        <p class="product-text">${prod.describe}</p>
                        <p class="product-price">${prod.price} ₸</p>
                        <div>
                            <button class="buy-button">+ корзину</button>
                        </div>
                    </div>
                </div>`;
        }
    }

    productCard.innerHTML = outputFilter;
    cutText('.product-text', 35);
    attachBuyButtonHandlers();
}

