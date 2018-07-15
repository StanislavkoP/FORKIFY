import {
	key,
	proxy
} from '../config'

export default class Recipe {
	constructor(id) {
		this.id = id;
	}

	async getRecipe() {
		try {
			const data = await fetch(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`);
			this.result = await data.json();
		} catch (e) {
			console.log(e);
		}
	}

	calcTime() {
		const numIngrid = this.result.recipe.ingredients.length;
		const periods = Math.ceil(numIngrid / 3);
		this.time = periods * 15;
	}

	calcServings() {
		this.servings = 4;
	}

	renderIngredients() {
		const unitsLong = ['tablerspoons', 'tabletspoon', 'onces', 'once', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
		const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
		const units = [...unitsShort, 'kg', 'g']

		const newIngredients = this.result.recipe.ingredients.map(el => {

			let ingredient = el.toLowerCase();
			unitsLong.forEach((unit, i) => {
			
				ingredient = ingredient.replace(unit, unitsShort[i]);
				
				
			});

			ingredient = ingredient.replace(/ *\([^]*\) */g, ' ');
			
			const arrIng = ingredient.split(' ');
			
			const unitIndex = arrIng.findIndex(el2 => units.includes(el2));
			
			let objIng;
			if (unitIndex > -1) {

				const arrCount = arrIng.slice(0, unitIndex);
				
				let count;
				if (arrCount.length === 1) {
					count = eval(arrIng[0].replace('-', '+'))

				} else {
					count = eval(arrIng.slice(0, unitIndex).join('+'))
	
				};

				objIng = {
					count: count,
					unit: arrIng[unitIndex],
					ingredient: arrIng.slice(unitIndex + 1).join(' '),
				};

			} else if (parseInt(arrIng[0], 10)) {
				objIng = {
					count: parseInt(arrIng[0], 10),
					unit: '',
					ingredient: arrIng.slice(1).join(' ')
				};

			} else if (unitIndex === -1) {
				objIng = {
					count: 1,
					unit: '',
					ingredient
				};
			};
			return objIng;
		});
		this.result.recipe.ingredients = newIngredients;
	}

	updateServings (type) {
		const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

		this.result.recipe.ingredients.forEach(ing => {
			ing.count *= (newServings / this.servings);
		});

		this.servings = newServings;
	}
}