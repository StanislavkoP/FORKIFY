export default class Search {
	constructor(query) {
		this.query = query
	}

	async getResults() {
		const proxy = 'https://cors-anywhere.herokuapp.com/';
		const key = '13863b7be6d8daad385272eddc18a01e';
		try {
			const data = await fetch(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
			this.result = await data.json();
			return this.result
		} catch (e) {
			alert(e);
		}
	}
}