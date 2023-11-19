// document.addEventListener('click', function (e) {
// 	const targetElement = e.target;

// 	if (targetElement.closest('.menu__icon')) {
// 		 document.documentElement.classList.toggle('menu-open');
// 		 e.preventDefault();
// 	}
// });
const burgerMenu = document.querySelector('.menu__icon');

burgerMenu.addEventListener('click', () => {
	document.documentElement.classList.toggle('menu-open');
});

//========================================================================================================================================================

const search = document.querySelector('.header__search'),
 modal = document.querySelector('.modal'),
 modalClose = document.querySelector('.modal__close');

search.addEventListener('click', () => {
	modal.classList.add('modal-open');
});
modalClose.addEventListener('click', () => {
	modal.classList.remove('modal-open')
});

document.body.addEventListener('click', (e) => {
	if (e.target.classList.contains('modal')) {
		modal.classList.remove('modal-open')
	}
});

//========================================================================================================================================================
