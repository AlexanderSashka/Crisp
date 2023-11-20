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
const parent_original = document.querySelector('.header__actions'),
	parent = document.querySelector('.menu__body'),
	item = document.querySelector('.actions-header__auth');

window.addEventListener('resize', function (event) {
	const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	if (viewport_width < 767.98) {
		if (!item.classList.contains('done')) {
			parent.insertBefore(item, parent.children[2]);
			item.classList.add('done');
		}
	} else {
		if (item.classList.contains('done')) {
			parent_original.insertBefore(item, parent_original.children[2]);
			item.classList.remove('done');
		}
	}
	})