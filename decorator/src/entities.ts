
// Component
export abstract class Pizza {
	protected composition: string = "basic pizza";
	getComposition(): string {
		return this.composition;
	}
	abstract getCost(): number
}

// Concrete Component
export class AmericanoPizza extends Pizza {
	constructor() {
		super();
		this.composition = "Americano Pizza"

		console.log(`   ${this.composition} is created `);
	}

	getCost(): number {
		return 200;
	}
}

// Concrete Component
export class ItalianaPizza extends Pizza {
	constructor() {
		super();
		this.composition = "Italiana Pizza"

		console.log(`   ${this.composition} is created `);
	}

	getCost(): number {
		return 100;
	}
}

// Decorator
export abstract class ToppingDecorator extends Pizza {
	abstract getComposition(): string;
}

// Concrete Decorator
export class CheeseTopping extends ToppingDecorator {
	pizza: Pizza;
	constructor(pizza: Pizza) {
		super();
		this.pizza = pizza;

		console.log('   +++ Add cheese to the pizza');
	}

	getComposition(): string {
		return this.pizza.getComposition() + ' + cheese';
	}
	getCost(): number {
		return this.pizza.getCost() + 10;
	}
}

// Concrete Decorator
export class TomatoTopping extends ToppingDecorator {
	pizza: Pizza;
	constructor(pizza: Pizza) {
		super();
		this.pizza = pizza;

		console.log('   +++ Add tomato to the pizza');

	}

	getComposition(): string {
		return this.pizza.getComposition() + ' + tomato';
	}
	getCost(): number {
		return this.pizza.getCost() + 20;
	}
}

// Concrete Decorator
export class PepperTopping extends ToppingDecorator {
	pizza: Pizza;
	constructor(pizza: Pizza) {
		super();
		this.pizza = pizza;

		console.log('   +++ Add pepper to the pizza');
	}

	getComposition(): string {
		return this.pizza.getComposition() + ' + pepper';
	}
	getCost(): number {
		return this.pizza.getCost() + 30;
	}
}
