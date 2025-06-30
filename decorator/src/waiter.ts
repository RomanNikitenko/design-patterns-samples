import readline from 'readline';
import { AmericanoPizza, CheeseTopping, ItalianaPizza, PepperTopping, Pizza, TomatoTopping } from "./entities";

export class Waiter {
	private readlineInstance;

	constructor() {
		this.readlineInstance = getReadlineInstance();
	}

	async serve() {
		try {
			const choice = await this.getPizzaVisitorChoice();
			const topping = await this.getToppingVisitorChoice();

			let pizza: Pizza;
			if (choice === 'a') {
				pizza = new AmericanoPizza();
			} else {
				pizza = new ItalianaPizza();
			}

			let toppingDetected: boolean = false;
			[...topping].forEach(char => {
				if (char === 'c') {
					pizza = new CheeseTopping(pizza);
					toppingDetected = true;
				}

				if (char === 't') {
					pizza = new TomatoTopping(pizza);
					toppingDetected = true;
				}

				if (char === 'p') {
					pizza = new PepperTopping(pizza);
					toppingDetected = true;
				}
			});

			if (!toppingDetected) {
				console.log('Topping was not recognized');
			}

			console.log('\nYour order is: ', pizza.getComposition());
			console.log('The order cost is: ', pizza.getCost(), 'USD');

		} catch (error) {
			console.error('An error happenned - please restart');
		} finally {
			this.readlineInstance.close();
		}
	}

	private async getPizzaVisitorChoice(promise?: Promise<string>): Promise<string> {
		console.info('What pizza would you like?');
		console.log('Americano and Italiana are available');

		return new Promise((resolve, reject) => {
			this.readlineInstance.question('Enter first letter of your choice.\nFor example: a - if your choice is Americana\n             i - if your choice is italiana\n', choice => {
				choice = choice.toLowerCase();
				if (choice !== 'a' && choice !== 'i') {
					console.error(`${choice} is not available`);
					reject();
					return;
				}
				resolve(choice);
			});
		});
	}

	private async getToppingVisitorChoice(promise?: Promise<string>): Promise<string> {
		console.info('\nWhat topping you would like to add?\nCheese, tomato and pepper are available\n');

		return new Promise((resolve) => {
			this.readlineInstance.question('Enter first letter of your choice.\nFor example: ctp - means cheese tomato pepper\n', choice => {
				resolve(choice.toLowerCase());
			});
		});
	}
}

function getReadlineInstance() {
	return readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
}
