const urlSearchParams = new URLSearchParams(window.location.search);
const id = urlSearchParams.get('id');

function ingredientItem(img, name, measure) {
	return `<tr>
        <td class="p-5 flex gap-3 items-center">
            <img class="w-10" src="${img}" />
            <span>${name}</span>
        </td>
        <td class="p-5">${measure}</td>
    </tr>`;
}

async function loadData() {
	const response = await fetch(
		'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id
	);
	const data = await response.json();

	const currentData = data.meals[0];

	document.getElementById('recipe-name').innerHTML = currentData.strMeal;
	document.getElementById('category').innerHTML = currentData.strCategory;
	document.getElementById('area').innerHTML = currentData.strArea;
	document.getElementById('img-thumbnail').src = currentData.strMealThumb;
	document.getElementById('img-bg').src = currentData.strMealThumb;
	document.getElementById('instruction').innerHTML =
		currentData.strInstructions;

	document.getElementById(
		'yt-video'
	).src = `https://www.youtube.com/embed/${getId(currentData.strYoutube)}`;

	const ingredientContainer = document.getElementById('ingredient');
	for (let index = 1; index <= 20; index++) {
		const name = currentData['strIngredient' + index];
		const measure = currentData['strMeasure' + index];

		if (!name || !measure) continue;

		ingredientContainer.innerHTML += ingredientItem(
			`https://www.themealdb.com/images/ingredients/${name}-Small.png`,
			name,
			measure
		);
	}
}

function getId(url) {
	const regExp =
		/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
	const match = url.match(regExp);

	return match && match[2].length === 11 ? match[2] : null;
}

loadData();
