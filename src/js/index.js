import Search from './models/Search';
import * as searchView from './views/searchView.js';
import {elements,renderLoader,clearLoader} from './views/base.js';


const state = {};

const controlSearch = async function(){
	const query = searchView.getInput();

	if(query){
		state.search = new Search(query);

		searchView.clearInput();
		searchView.clearResults();
		renderLoader(elements.searchResultContain);

		await state.search.getResults();

		clearLoader();

		searchView.renderResults(state.search.result);
	}
};

elements.searchForm.addEventListener('submit', function(e){
	e.preventDefault();
	controlSearch();
});

elements.searchResultPages.addEventListener('click', function(e){
	const btn = e.target.closest('.btn-inline');

	if(btn) {
		const goToPage = parseInt(btn.dataset.goto, 10);
		searchView.clearResults();
		searchView.renderResults(state.search.result, goToPage);
	}
});

/* const search = new Search('pizza')
search.getResults().then(data => console.log(data)).catch(e => alert(e)) */