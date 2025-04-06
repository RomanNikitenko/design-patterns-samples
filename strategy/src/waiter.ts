import { Bill, Menu } from "./entities";
import readline from 'readline';
import { getStrategyInstance, PaymentStrategy } from "./paymentStrategy";

export class Waiter {
	private menu: Menu;
	private readlineInstance;

	constructor() {
		this.menu = new Menu();
		this.readlineInstance = getreadlineInstance();
	}

	async serve() {
		console.info('Please do your order - What would you like to drink?');

		try {
			const choice = await this.geVisitorChoice();
			const count = await this.getCount();
			const cost = this.menu.getCost(choice);
			if (!cost) {
				console.error(`Can not get cost for the ${choice}`);
				throw new Error(`Can not get cost for the ${choice}`);
			}

			const bill = new Bill(choice, cost, count);
			bill.displayBill();

			const paymentStrategy = await this.getPaymentStrategy();
			if (!paymentStrategy) {
				console.error('Can not get payment strategy');
				throw new Error('Can not get payment strategy');
			}

			bill.performPayment(paymentStrategy);

		} catch (error) {
			console.error('An error happenned - please restart');
		} finally {
			this.readlineInstance.close();
		}
	}

	private async geVisitorChoice(promise?: Promise<string>): Promise<string> {
		const menuItems = this.menu.getMenuItems();
		console.info(`Menu: ${menuItems.join(' ')}\n`);

		return new Promise((resolve, reject) => {
			this.readlineInstance.question('Enter drink: ', drink => {
				if (!this.menu.isAvailable(drink)) {
					console.error(`${drink} is not available`);
					reject();
					return;
				}
				resolve(drink);
			});
		});
	}

	private async getCount(promise?: Promise<string>): Promise<number> {
		const menuItems = this.menu.getMenuItems();
		return new Promise((resolve, reject) => {
			this.readlineInstance.question('Enter count: ', countStr => {
				const count = Number(countStr.trim());
				if (Number.isNaN(count)) {
					console.error('Invalid number entered.');
					reject();
					return;
				}
				resolve(count);
			});
		});
	}

	private async getPaymentStrategy(): Promise<PaymentStrategy | undefined> {
		console.info('Please select payment method')
		console.info('Card, PayPal, EasyPay payment strategies are available');

		return new Promise<PaymentStrategy | undefined>(resolve => {
			this.readlineInstance.question('Enter strategy you want to use: ', strategyName => {
				console.info(`${strategyName} payment was selected, handling your choice...`);

				const strategy = getStrategyInstance(strategyName);
				resolve(strategy);
			}
			);
		});
	}
}

function getreadlineInstance() {
	return readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
}
