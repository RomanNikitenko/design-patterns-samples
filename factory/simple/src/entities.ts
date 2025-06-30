
export class PizzaFactory {

	createPizza(id: string): Pizza {
		switch (id) {
			case 'm':
				return new MargheritaPizza();
			case 'p':
				return new PepperoniPizza();
			case 'h':
				return new HawaiianPizza();
			case 'f':
				return new FourCheesePizza();
			default:
				return new MargheritaPizza();
		}
	}
}

export interface Pizza {
	getName(): string;
	getComposition(): string;
	getCost(): number;
}

export class MargheritaPizza implements Pizza {
	private name: string = 'Margherita';

	constructor() {
		console.log(`${this.name} pizza was created`);
	}
	getName(): string {
		return this.name;
	}

	getComposition(): string {
		return 'tomato sauce, mozzarella, fresh basil';
	}

	getCost(): number {
		return 200;
	}
}

export class PepperoniPizza implements Pizza {
	private name: string = 'Pepperoni';

	constructor() {
		console.log(`${this.name} pizza was created`);
	}

	getName(): string {
		return this.name;
	}

	getComposition(): string {
		return 'pepperoni slices, tomato sauce, mozzarella';
	}

	getCost(): number {
		return 250;
	}
}

export class HawaiianPizza implements Pizza {
	private name: string = 'Hawaiian';

	constructor() {
		console.log(`${this.name} pizza was created`);
	}

	getName(): string {
		return this.name;
	}

	getComposition(): string {
		return 'ham, pineapple, tomato sauce, mozzarella';
	}

	getCost(): number {
		return 270;
	}
}

export class FourCheesePizza implements Pizza {
	private name: string = 'Four Cheese';

	constructor() {
		console.log(`${this.name} pizza was created`);
	}

	getName(): string {
		return this.name;
	}

	getComposition(): string {
		return 'mozzarella, gorgonzola, parmesan, fontina';
	}

	getCost(): number {
		return 300;
	}
}
