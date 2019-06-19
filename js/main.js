const budget = 250000,
      goods = {},
      money = document.getElementsByClassName('money')[0],
      goodElements = document.getElementsByClassName('good'),
      cart = document.getElementsByClassName('cart')[0],
      cartItem = document.getElementsByClassName('cart__goods-container')[0];
	 
let cartPrice = 0;


money.textContent = budget;

for (const goodElement of goodElements) {
    goodElement.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData(
            'application/json',
            JSON.stringify([event.target.children[3].dataset.price, event.target.id]),
        );
    });
}

cart.addEventListener('drop', (event) => {
    const data = event.dataTransfer.getData('application/json');
    if (data) {
        const [price, goodId] = JSON.parse(data);

        cart.dispatchEvent(new CustomEvent('order', { detail: { price, goodId } }));
    }
});

cart.addEventListener('dragover', event => event.preventDefault());

cart.addEventListener('order', ({ detail: { price: stringPrice, goodId } }) => {
    const price = +stringPrice;

    if (cartPrice + price > budget) {
        alert('На вашем счете недостаточно денег :(');
    } else {
        const orderedGoodElement = document.getElementById(goodId).cloneNode(true);
        let count = 1;

        if (goods[orderedGoodElement.id]) {
            count = ++goods[orderedGoodElement.id];
            const countElement = [...cartItem.children]
                                 .filter(goodElement => goodElement.children[0].dataset.id === `${goodId}-count`)[0];
            countElement.children[0].textContent = count;
        } else {
            goods[orderedGoodElement.id] = count;
            const counterElement = orderedGoodElement.children[0];

            counterElement.dataset.id = counterElement.id;
            counterElement.removeAttribute('id');
		    orderedGoodElement.id = orderedGoodElement.id + '_added';
            orderedGoodElement.setAttribute('draggable', false);
            counterElement.textContent = count;
            cartItem.appendChild(orderedGoodElement);
       }

        cartPrice += price;
        const fullness = budget - cartPrice;
		money.textContent = fullness;
		
		let btn = document.createElement('button');//создаём нашу кнопку
        let textInBtn = document.createTextNode('X');//создаем текст для кнопки
        btn.appendChild(textInBtn);//добавляем текст в кнопку
		orderedGoodElement.appendChild(btn);
		

    }
});
       cartItem.addEventListener('click', function (e) {
    if (e.target.localName == 'button') {
	const orderedGoodElementDel = document.getElementById(e.target.parentNode.id);
		cartItem.removeChild(orderedGoodElementDel);
        const fullness2 = Number(money.textContent) + cartPrice;
		money.textContent = fullness2;
	}
      }, false);