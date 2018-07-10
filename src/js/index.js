import Search from './models/Search'


const state = {};

const controlSearch = async function(){
	const query = 'pizza';

	if(query){
		state.search = new Search(query);

		await state.search.getResults();

		console.log(state.search.result)
	}
};

document.querySelector('#search').addEventListener('submit', function(e){
	e.preventDefault();
	controlSearch();
});

/* const search = new Search('pizza')
search.getResults().then(data => console.log(data)).catch(e => alert(e)) */