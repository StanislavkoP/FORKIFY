import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView.js';
import * as recipeView from './views/recipeView.js';
import {
	elements,
	renderLoader,
	clearLoader
} from './views/base.js';


const state = {};

const controlSearch = async function () {
	const query = searchView.getInput();

	if (query) {
		state.search = new Search(query);

		searchView.clearInput();
		searchView.clearResults();
		renderLoader(elements.searchResultContain);

		try {
			await state.search.getResults();
			clearLoader();
			searchView.renderResults(state.search.result);

		} catch (e) {
			alert('Something wrong')
		}
	}
};

elements.searchForm.addEventListener('submit', function (e) {
	e.preventDefault();
	controlSearch();
});

elements.searchResultPages.addEventListener('click', function (e) {
	const btn = e.target.closest('.btn-inline');

	if (btn) {
		const goToPage = parseInt(btn.dataset.goto, 10);
		searchView.clearResults();
		searchView.renderResults(state.search.result, goToPage);
	}
});

const controlRecipe = async function () {
	const id = window.location.hash.replace('#', '');

	if (id) {

		renderLoader(elements.recipe);

 		if (state.search) searchView.highlightSelected(id) 

		try {
			state.recipe = new Recipe(id);
	


			await state.recipe.getRecipe();


			state.recipe.calcTime();
			state.recipe.calcServings();
			state.recipe.renderIngredients();

			recipeView.clearRecipe();
			clearLoader(elements.recipe);

			recipeView.renderRecipe(state.recipe)

			console.log(state.recipe)
		} catch (e) {
			alert('Something wrong')
			console.log(e)
		}
	}
};

elements.recipe.addEventListener('click', function(e)  {
	if(e.target.matches('.btn-decrease, .btn-decrease *')){

		if(state.recipe.servings > 1){
			state.recipe.updateServings('dec');
			recipeView.updateIngredientsServings(state.recipe);
			
		}

	} else if (e.target.matches('.btn-increase, .btn-increase *')) {
		state.recipe.updateServings('inc');
		recipeView.updateIngredientsServings(state.recipe);

	}


});


['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));