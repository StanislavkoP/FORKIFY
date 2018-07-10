async function getResults (query) {
	const data = await fetch(query);
	const result = await data.json();
	return result
}
console.log('asd')
getResults('http://food2fork.com/api/search?key={13863b7be6d8daad385272eddc18a01e}&q=shredded%20chicken').then(data => console.log(data))