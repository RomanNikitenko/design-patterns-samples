import { PaymentStrategy } from "./paymentStrategy";
export class Bill {
	private orderItem: string;
	private cost: number;
	private count: number;

	constructor(item: string, cost: number, count: number) {
		this.orderItem = item;
		this.cost = cost;
		this.count = count;
	}

	async performPayment(paymentStrategy: PaymentStrategy): Promise<boolean> {
		return paymentStrategy.pay(this.cost * this.count);
	}

	async displayBill() {
		const total = this.cost * this.count;
		const bill = {
			DRINKS: { ITEM: this.orderItem, QUANTITY: this.count, COST: this.cost, TOTAL: total }
		};
		console.log('\nYour order is:');
		console.table(bill);
	}
}

export class Menu {
	private availableItems: string[] = ['Water', 'Juice', 'Wine', 'Coffee'];

	isAvailable(item: string): boolean {
		return this.availableItems.some(entity => entity.toLowerCase() === item.toLowerCase());
	}

	getMenuItems(): string[] {
		return this.availableItems;
	}

	getCost(item: string): number | undefined {
		switch (item.toLowerCase()) {
			case 'water':
				return 5;
			case 'wine':
				return 15;
			case 'juice':
				return 10;
			case 'coffee':
				return 12;
			default:
				return undefined;
		}
	}
}
