export interface PaymentStrategy {
	pay(amount: number): Promise<boolean>;
}

export class CreditCardPayment implements PaymentStrategy {

	pay(amount: number): Promise<boolean> {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.info(`\nPayment of ${amount} USD was successful using Credit Card way!\n`);
				resolve(true);
			}, 1000);
		});
	}
}

export class PayPalPayment implements PaymentStrategy {

	pay(amount: number): Promise<boolean> {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.info(`\nPayment of ${amount} USD was successful using PayPal way!\n`);
				resolve(true);
			}, 1000);
		});
	}
}

export class EasyPayPayment implements PaymentStrategy {

	pay(amount: number): Promise<boolean> {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.info(`\nPayment of ${amount} USD was successful using EasyPay way!\n`);
				resolve(true);
			}, 1000);
		});
	}
}

export function getStrategyInstance(strategyName: string): PaymentStrategy | undefined {
	switch (strategyName.toLowerCase()) {
		case "card":
			return new CreditCardPayment();
		case "paypal":
			return new PayPalPayment();
		case "easypay":
			return new EasyPayPayment();
		default:
			console.info(`Error: Unsupported payment strategy`);
	}
}