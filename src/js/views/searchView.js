import {
	elements
} from './base.js';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
	elements.searchInput.value = ''
}

export const clearResults = () => {
	elements.searchResultList.innerHTML = ''
}

const limitRecipeTitle = (title, limit = 17) => {
	const newTitle = [];
	if(title.length > limit){
		title.split(' ').reduce((previous, current) => {
			if(previous + current.length <= limit) {
				newTitle.push([current]);
			}
			return previous + current.length
		}, 0);

		return `${newTitle.join(' ')} ...`
	}
}

const renderRecipe = recipe => {
	const murkup = `
		<li>
			<a class="results__link" href="#${recipe.recipe_id}">
				<figure class="results__fig">
					<img src="${recipe.image_url}" alt="${recipe.title}">
				</figure>
				<div class="results__data">
					<h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
					<p class="results__author">${recipe.publisher}</p>
				</div>
			</a>
		</li>
	`;
	elements.searchResultList.insertAdjacentHTML('beforeend', murkup);
}

export const renderResults = recipes => {
	recipes.recipes.forEach(recipe => {
		renderRecipe(recipe);
	});
}