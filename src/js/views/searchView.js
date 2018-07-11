import {
	elements
} from './base.js';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
	elements.searchInput.value = ''
}

export const clearResults = () => {
	elements.searchResultList.innerHTML = ''
	elements.searchResultPages.innerHTML = ''
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
};

const createButton = (page, type) => {
	return `
	<button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
		<span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
		<svg class="search__icon">
			<use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
		</svg>
	</button>
	`;
};

const renderButtons = (page, numResults, resPerPage) => {
	const pages = Math.ceil(numResults / resPerPage);
	
	let button;

	if (page === 1 && pages > 1){
		button = createButton(page, 'next')
	} else if(page < pages) {
		button = `
		${createButton(page, 'next')}
		${createButton(page, 'prev')}
		`;
	} else if (page === pages && pages > 1) {
		button = createButton(page, 'prev')
	}

	elements.searchResultPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
	const start = (page - 1) * resPerPage;
	const end = page * resPerPage;
	
	recipes.recipes.slice(start, end).forEach(recipe => {
		renderRecipe(recipe);
	});

	renderButtons(page, recipes.recipes.length, resPerPage);
};