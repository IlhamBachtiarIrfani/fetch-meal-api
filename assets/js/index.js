function categoryItem(img, name, desc) {
	return `
		<div class="swiper-slide bg-white p-5 rounded-xl">
			<img
				src="${img}"
				class="w-full aspect-[4/3] object-scale-down" loading="lazy" />
			<h2 class="text-2xl font-bold text-center mt-1">${name}</h2>

			<div class="flex justify-center gap-0.5 mt-1">
				<img src="assets/img/star.svg" />
				<img src="assets/img/star.svg" />
				<img src="assets/img/star.svg" />
				<img src="assets/img/star.svg" />
				<img src="assets/img/star.svg" />
			</div>

			<p class="text-center text-gray-500 text-sm mt-3 line-clamp-2">
				${desc}
			</p>
		</div>
	`;
}

function ingredientItem(img, name) {
	return `
		<div class="swiper-slide">
			<img
				src="${img}"
				class="w-full aspect-[4/3] object-scale-down" loading="lazy"  />
			<h2 class="text-xl font-bold text-center mt-1">${name}</h2>
		</div>
	`;
}

async function loadCategories() {
	const swiper = new Swiper('#category-swiper', {
		autoplay: {
			delay: 3000,
		},
		slidesPerView: 2,
		spaceBetween: 20,
		breakpoints: {
			640: {
				slidesPerView: 2,
			},
			1024: {
				slidesPerView: 3,
			},
			1280: {
				slidesPerView: 4,
			},
		},
	});

	const response = await fetch(
		'https://www.themealdb.com/api/json/v1/1/categories.php'
	);
	const categories = await response.json();

	categories.categories.forEach((element) => {
		swiper.appendSlide(
			categoryItem(
				element.strCategoryThumb,
				element.strCategory,
				element.strCategoryDescription
			)
		);
	});
}

async function loadIngredient() {
	const swiper = new Swiper('#ingredient-swiper', {
		autoplay: {
			delay: 3000,
		},
		slidesPerView: 3,
		spaceBetween: 20,
		breakpoints: {
			640: {
				slidesPerView: 4,
			},
			1024: {
				slidesPerView: 5,
			},
			1280: {
				slidesPerView: 6,
			},
		},
	});

	const response = await fetch(
		'https://www.themealdb.com/api/json/v1/1/list.php?i=list'
	);
	const ingredients = await response.json();

	ingredients.meals.slice(0,14).forEach((element) => {
		swiper.appendSlide(
			ingredientItem(
				`https://www.themealdb.com/images/ingredients/${element.strIngredient}-Small.png`,
				element.strIngredient,
			)
		);
	});
}

loadCategories();
loadIngredient();
