import readline from 'readline';
import { Pizza, PizzaFactory } from './entities';

export class Waiter {
	private readlineInstance;

	constructor() {
		this.readlineInstance = getReadlineInstance();
	}

	async serve() {
		try {
			const choice = await this.getPizzaVisitorChoice();
			const factory = new PizzaFactory();
			const pizza: Pizza = factory.createPizza(choice);

			console.log(`\nYour order is: ${pizza.getName()} pizza`);
			console.log(`\nThe composition is: ${pizza.getComposition()}`);
			console.log('The order cost is: ', pizza.getCost(), 'USD');

		} catch (error) {
			console.error('An error happenned - please restart');
		} finally {
			this.readlineInstance.close();
		}
	}

	private async getPizzaVisitorChoice(promise?: Promise<string>): Promise<string> {
		console.info('What pizza would you like?');
		console.log('Margherita, Pepperoni, Hawaiian and Four Cheese are available');

		return new Promise((resolve, reject) => {
			this.readlineInstance.question('\nEnter first letter of your choice.\nFor example: p - if your choice is Pepperoni\n             h - if your choice is Hawaiian\n', choice => {
				choice = choice.toLowerCase();
				const available = ['m', 'p', 'h', 'f'];
				if (!available.includes(choice)) {
					console.error(`${choice} is not available`);
					reject();
					return;
				}
				resolve(choice);
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
