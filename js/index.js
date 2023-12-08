document.addEventListener('DOMContentLoaded', () => {
// document.addEventListener('click', function (e) {
// 	const targetElement = e.target;

// 	if (targetElement.closest('.menu__icon')) {
// 		 document.documentElement.classList.toggle('menu-open');
// 		 e.preventDefault();
// 	}
// });
//=========================Burger===============================================================================================================================
const burgerMenu = document.querySelector('.menu__icon');

burgerMenu.addEventListener('click', () => {
	document.documentElement.classList.toggle('menu-open');
});

//====================Modal Search====================================================================================================================================

	const search = document.querySelector('.header__search'),
		modal = document.querySelector('.modal'),
		modalClose = document.querySelector('.modal__close');

search.addEventListener('click', () => {
	// modal.classList.add('modal-open');
	document.documentElement.classList.add('modal-open');
	// document.documentElement.style.overflow = "hidden"; 
});
modalClose.addEventListener('click', () => {
	// modal.classList.remove('modal-open');
	document.documentElement.classList.remove('modal-open');
	// document.documentElement.style.overflow = "visible"; 
});

document.body.addEventListener('click', (e) => {
	if (e.target.classList.contains('modal')) {
		document.documentElement.classList.remove('modal-open')
		// document.documentElement.style.overflow = "visible"; 
	}
});
//==============Sign-In-Popup==========================================================================================================================================
const signIn = document.querySelector('.auth-header__link_popup');
const signInPopup = document.querySelector('.sign-in-popup');
const signInPopupClose = document.querySelector('.form-sign-in__close-button');

		signIn.addEventListener('click', () => {
		// e.preventDefault();
		// document.body.style.overflow = 'hidden';
		signInPopup.classList.add('sign-in-open');
	});
	signInPopupClose.addEventListener('click', () => {
		signInPopup.classList.remove('sign-in-open');
		// document.body.style.overflow = '';
	});


//=======================Dynamic adapt=================================================================================================================================
(function () {
	let original_positions = [];
	let da_elements = document.querySelectorAll('[data-da]');
	let da_elements_array = [];
	let da_match_media = [];

	// Заполняем массивы
	if (da_elements.length > 0) {
		 let number = 0;
		 for (let index = 0; index < da_elements.length; index++) {
			  const da_element = da_elements[index];
			  const da_move = da_element.getAttribute('data-da');
			  const da_array = da_move.split(',');

			  if (da_array.length === 3) {
					da_element.setAttribute('data-da-index', number);

					// Заполняем массив первоначальных позиций
					original_positions[number] = {
						 "parent": da_element.parentNode,
						 "index": index_in_parent(da_element)
					};

					// Заполняем массив элементов
					da_elements_array[number] = {
						 "element": da_element,
						 "destination": document.querySelector('.' + da_array[0].trim()),
						 "place": da_array[1].trim(),
						 "breakpoint": da_array[2].trim()
					};

					number++;
			  }
		 }

		 dynamic_adapt_sort(da_elements_array);

		 // Создаем события в точке брейкпоинта
		 for (let index = 0; index < da_elements_array.length; index++) {
			  const el = da_elements_array[index];
			  const da_breakpoint = el.breakpoint;
			  const da_type = "max"; // Для MobileFirst поменять на min

			  da_match_media.push(window.matchMedia("(" + da_type + "-width: " + da_breakpoint + "px)"));
			  da_match_media[index].addEventListener('change', dynamic_adapt);
		 }
	}

	// Основная функция
	function dynamic_adapt() {
		 for (let index = 0; index < da_elements_array.length; index++) {
			  const el = da_elements_array[index];
			  const da_element = el.element;
			  const da_destination = el.destination;
			  const da_place = el.place;
			  const da_breakpoint = el.breakpoint;
			  const da_classname = "_dynamic_adapt_" + da_breakpoint;

			  if (da_match_media[index].matches) {
					// Перебрасываем элементы
					if (!da_element.classList.contains(da_classname)) {
						 let actual_index;
						 if (da_place === 'first') {
							  actual_index = index_of_elements(da_destination)[0];
						 } else if (da_place === 'last') {
							  actual_index = index_of_elements(da_destination).length;
						 } else {
							  actual_index = index_of_elements(da_destination)[da_place];
						 }

						 da_destination.insertBefore(da_element, da_destination.children[actual_index]);
						 da_element.classList.add(da_classname);
					}
			  } else {
					// Возвращаем на место
					if (da_element.classList.contains(da_classname)) {
						 dynamic_adapt_back(da_element);
						 da_element.classList.remove(da_classname);
					}
			  }
		 }

		 custom_adapt();
	}

	// Вызов основной функции
	dynamic_adapt();

	// Функция возврата на место
	function dynamic_adapt_back(el) {
		 const da_index = el.getAttribute('data-da-index');
		 const original_place = original_positions[da_index];
		 const parent_place = original_place['parent'];
		 const index_place = original_place['index'];
		 const actual_index = index_of_elements(parent_place, true)[index_place];
		 parent_place.insertBefore(el, parent_place.children[actual_index]);
	}

	// Функция получения индекса внутри родителя
	function index_in_parent(el) {
		 var children = Array.prototype.slice.call(el.parentNode.children);
		 return children.indexOf(el);
	}

	// Функция получения массива индексов элементов внутри родителя
	function index_of_elements(parent, back) {
		 const children = parent.children;
		 const children_array = [];
		 for (let i = 0; i < children.length; i++) {
			  const children_element = children[i];
			  if (back) {
					children_array.push(i);
			  } else {
					// Исключая перенесенный элемент
					if (children_element.getAttribute('data-da') == null) {
						 children_array.push(i);
					}
			  }
		 }
		 return children_array;
	}

	// Сортировка объекта
	function dynamic_adapt_sort(arr) {
			arr.sort(function (a, b) {
				if (a.breakpoint > b.breakpoint) { return - 1 } else { return - 1 }//Для MobileFirst поменять
			});
			arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return 1 }
			});
	}

	// Дополнительные сценарии адаптива
	function custom_adapt() {
		 const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		 // Дополнительные действия при адаптации
	}
	})();
	//========================================================================================================================================================
	const spollersArray = document.querySelectorAll("[data-spollers]");

	if (spollersArray.length > 0) {
	  // Получение обычных спойлеров
	  const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
		 return !item.dataset.spollers.split(",")[0];
	  });
 
	  // Инициализация обычных спойлеров
	  if (spollersRegular.length > 0) {
		 initSpollers(spollersRegular);
	  }
 
	  // Получение спойлеров с медиа запросами
	  const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
		 return item.dataset.spollers.split(",")[0];
	  });
 
	  // Инициализация спойлеров с медиа запросами
	  if (spollersMedia.length > 0) {
		 const breakpointsArray = [];
 
		 spollersMedia.forEach((item) => {
			const params = item.dataset.spollers;
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		 });
 
		 // Получаем уникальные брейкпоинты
		 let mediaQueries = breakpointsArray.map(function (item) {
			return `(${item.type}-width: ${item.value}px),${item.value},${item.type}`;
		 });
 
		 mediaQueries = mediaQueries.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		 });
 
		 // Работаем с каждым брейкпоинтом
		 mediaQueries.forEach((breakpoint) => {
			const paramsArray = breakpoint.split(",");
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);
 
			// Объекты с нужными условиями
			const spollersArrayFiltered = breakpointsArray.filter(function (item) {
			  return item.value === mediaBreakpoint && item.type === mediaType;
			});
 
			// Событие
			matchMedia.addEventListener("change", function () {
			  initSpollers(spollersArrayFiltered, matchMedia);
			});
 
			initSpollers(spollersArrayFiltered, matchMedia);
		 });
	  }
 
	  // Инициализация
	  function initSpollers(spollersArray, matchMedia = false) {
		 spollersArray.forEach((spollersBlock) => {
			spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
 
			if (matchMedia.matches || !matchMedia) {
			  spollersBlock.classList.add("_init");
			  initSpollerBody(spollersBlock);
			  spollersBlock.addEventListener("click", setSpollerAction);
			} else {
			  spollersBlock.classList.remove("_init");
			  initSpollerBody(spollersBlock, false);
			  spollersBlock.removeEventListener("click", setSpollerAction);
			}
		 });
	  }
 
	  // Работа с контентом
	  function initSpollerBody(spollersBlock, hideSpollerBody = true) {
		 const spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
 
		 if (spollerTitles.length > 0) {
			spollerTitles.forEach((spollerTitle) => {
			  if (hideSpollerBody) {
				 spollerTitle.removeAttribute("tabindex");
 
				 if (!spollerTitle.classList.contains("_active")) {
					spollerTitle.nextElementSibling.hidden = true;
				 }
			  } else {
				 spollerTitle.setAttribute("tabindex", "-1");
				 spollerTitle.nextElementSibling.hidden = false;
			  }
			});
		 }
	  }
 
	  function setSpollerAction(e) {
		 const el = e.target;
 
		 if (el.hasAttribute("data-spoller") || el.closest("[data-spoller]")) {
			const spollerTitle = el.hasAttribute("data-spoller") ? el : el.closest("[data-spoller]");
			const spollersBlock = spollerTitle.closest("[data-spollers]");
			const oneSpoller = spollersBlock.hasAttribute("data-one-spoller") ? true : false;
 
			if (!spollersBlock.querySelectorAll("._slide").length) {
			  if (oneSpoller && !spollerTitle.classList.contains("_active")) {
				 hideSpollerBody(spollersBlock);
			  }
 
			  spollerTitle.classList.toggle("_active");
			  _slideToggle(spollerTitle.nextElementSibling, 500);
			}
 
			e.preventDefault();
		 }
	  }
 
	  function hideSpollerBody(spollersBlock) {
		 const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._active");
 
		 if (spollerActiveTitle) {
			spollerActiveTitle.classList.remove("_active");
			_slideUp(spollerActiveTitle.nextElementSibling, 500);
		 }
	  }
	}
 
	function _slideUp(target, duration = 500) {
	  if (!target.classList.contains('_slide')) {
		 target.classList.add('_slide');
		 target.style.transitionProperty = 'height, margin, padding';
		 target.style.transitionDuration = duration + 'ms';
		 target.style.height = target.offsetHeight + 'px';
		 target.offsetHeight;
		 target.style.overflow = 'hidden';
		 target.style.height = 0;
		 target.style.paddingTop = 0;
		 target.style.paddingBottom = 0;
		 target.style.marginTop = 0;
		 target.style.marginBottom = 0;
 
		 window.setTimeout(() => {
			target.hidden = true;
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		 }, duration);
	  }
	}
 
	function _slideDown(target, duration = 500) {
	  if (!target.classList.contains('_slide')) {
		 target.classList.add('_slide');
 
		 if (target.hidden) {
			target.hidden = false;
		 }
 
		 let height = target.offsetHeight;
		 target.style.overflow = 'hidden';
		 target.style.height = 0;
		 target.style.paddingTop = 0;
		 target.style.paddingBottom = 0;
		 target.style.marginTop = 0;
		 target.style.marginBottom = 0;
		 target.offsetHeight;
		 target.style.transitionProperty = 'height, margin, padding';
		 target.style.transitionDuration = duration + 'ms';
		 target.style.height = height + 'px';
		 target.style.removeProperty('padding-top');
		 target.style.removeProperty('padding-bottom');
		 target.style.removeProperty('margin-top');
		 target.style.removeProperty('margin-bottom');
 
		 window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		 }, duration);
	  }
	}
 
	function _slideToggle(target, duration = 500) {
	  if (target.hidden) {
		 return _slideDown(target, duration);
	  } else {
		 return _slideUp(target, duration);
	  }
	}
	//========================================================================================================================================================
	const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
	if (menuLinks.length > 0) {
		menuLinks.forEach(menuLink => {
			menuLink.addEventListener('click', oneMenuLinkClick);
		});
		function oneMenuLinkClick(e) {
			const menuLink = e.target;
			if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
				const gotoBlock = document.querySelector(menuLink.dataset.goto);
				const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;

				window.scrollTo({
					top: gotoBlockValue,
					behavior:"smooth"
				});
				e.preventDefault();
			}
		}
	}
	//========================================================================================================================================================
	window.addEventListener('scroll', function () {
		const header = document.querySelector('.header');
		const scrolly = window.scrollY;
		const value = 116;
		if (scrolly >= value) {
		  header.classList.add('header__scroll');
		} else {
		  header.classList.remove('header__scroll');
		}
	 });
});
