const urlSearchParams = new URLSearchParams(window.location.search);
const keyword = urlSearchParams.get('keyword');

const searchInput = document.getElementById('search-input');
searchInput.value = keyword;

var timer = null;

searchInput.addEventListener('input', function (event) {
	if (timer) clearTimeout(timer);

	timer = setTimeout(() => {
		console.log(this.value);
		loadList(this.value);
	}, 500);
});

function tagItem(tags) {
	if (tags == null) return '';
	var result = '';

	tags.split(',').forEach((element) => {
		result += `<span class="bg-orange-500/40 text-white px-3 py-0.5 rounded-full text-xs backdrop-blur-sm">${element}</span>`;
	});

	return result;
}

function recipeItem(item) {
	return `
		<a href="detail.html?id=${item.idMeal}" class="flex flex-col bg-white rounded-xl overflow-hidden">
            <div class="w-full aspect-square relative">
                <img
                    src="${item.strMealThumb}"
                    class="object-scale-down" loading="lazy" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 flex flex-col justify-end text-white p-5">
                    <h2 class="text-3xl font-bold">${item.strMeal}</h2>
                    
                    <div class="flex flex-wrap gap-1 mt-1">${tagItem(
                        item.strTags
                    )}</div>
                </div>
            </div>

		</a>
	`;
}

async function loadList(keyword) {
	if (!keyword) keyword = "";
	const response = await fetch(
		'https://www.themealdb.com/api/json/v1/1/search.php?s=' + keyword
	);
	const ingredients = await response.json();

	const container = document.getElementById('search-container');
	container.innerHTML = '';
	ingredients?.meals?.slice(0, 50).forEach((element) => {
		container.innerHTML += recipeItem(element);
	});
}

loadList(keyword);
