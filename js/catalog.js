// window.addEventListener('DOMContentLoaded', () => {

// 	async function getLocalData() {
// 		try {
// 			const response = await fetch('/data.json');
// 			const data = await response.json();
	
// 			data.map((item) => {
				
// 				const article = document.createElement('article');
// 				article.classList.add('item')
// 				article.innerHTML = 
// 				`
// 				<article class="catalog-home__item">
// 				  <a href="#" class="catalog-home__image">
// 					 <img src="${item.image}" alt="Image" />
// 				  </a>
// 				  <div class="catalog-home__discount">${item.discount}</div>
// 				  <div class="catalog-home__info">
// 					 <h4 class="catalog-home__title">${item.title}</h4>
// 					 <a href="#" class="catalog-home__text">${item.text}</a>
// 					 <div class="catalog-home__price price">
// 						<div class="price__actual price__actual_color">${item.price-actual}</div>
// 						<div class="price__discount">${item.price-discount}</div>
// 					 </div>
// 				  </div>
// 				</article>
// 				`
// 				document.body.appendChild(article);
// 			})

// 		} catch (error) {
// 			console.log(error);
// 		}
// 	}

// 	getLocalData()
// })
window.addEventListener('DOMContentLoaded', async () => {

	const itemsContainer = document.querySelector('.catalog-home__items');
	const loadMoreButton = document.querySelector('.catalog-home__button');
	let itemsToShow = 4; // Начальное количество элементов
 
	async function getLocalData() {
	  try {
		 const response = await fetch('data.json');
		 const data = await response.json();
 
		 renderItems(data);
		 
		 // Добавляем обработчик события на кнопку "Load more"
		 loadMoreButton.addEventListener('click', () => {
			itemsToShow += 4; // Увеличиваем количество элементов при каждом нажатии
			renderItems(data);
		 });
 
	  } catch (error) {
		 console.log(error);
	  }
	}
 
	function renderItems(data) {
	  itemsContainer.innerHTML = ''; // Очищаем контейнер перед добавлением новых элементов
 
	  // Выбираем только определенное количество элементов из массива data
	  const itemsToRender = data.slice(0, itemsToShow);
 
	  itemsToRender.forEach((item) => {
		 const article = document.createElement('article');
		 article.classList.add('catalog-home__item');
		 article.innerHTML = 
		 `
		 <a href="#" class="catalog-home__image">
			<img src="${item.image}" alt="Image" />
		 </a>
		 ${item.discount ? `<div class="catalog-home__discount">${item.discount}</div>` : ''}
		 <div class="catalog-home__info">
			<h4 class="catalog-home__title">${item.title}</h4>
			<a href="#" class="catalog-home__text">${item.text}</a>
			<div class="catalog-home__price price">
			  <div class="price__actual ${item.priceActualColor ? 'price__actual_color' : ''}">${item.priceActual}</div>
			  <div class="price__discount">${item.priceDiscount || ''}</div>
			</div>
		 </div>
		 `;
 
		 itemsContainer.appendChild(article);
	  });
 
	  // Показываем или скрываем кнопку "Load more" в зависимости от количества элементов
	  loadMoreButton.style.display = itemsToShow < data.length ? 'block' : 'none';
	}
 
	getLocalData();
 });
