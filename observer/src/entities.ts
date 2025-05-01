
// Subject
export interface DeliveryNotificationSystem {
	subscribe(observer: DeliveryObserver): void;
	unsubscribe(observer: DeliveryObserver): void;
	notifyAll(): void;
}

// Observer
export interface DeliveryObserver {
	notify(status: DeliveryStatus): void;
	// the following method was added just for testing goal
	getId(): string;
}

export enum DeliveryStatus {
	AWAITING = 'Awaiting',
	TRANSFERRED_TO_DELIVERY_SERVICE = "Transferred to Delivery Service",
	IN_TRANSIT = 'In Transit',
	OUT_FOR_DELIVERY = 'Out for Delivery by Courier',
	DELIVERED = 'Delivered'
}

export class Delivery implements DeliveryNotificationSystem {
	private observers: DeliveryObserver[] = [];
	private currentStatus: DeliveryStatus = DeliveryStatus.AWAITING;

	constructor() {
		console.log('Delivery object was created!');
	}

	updateStatus(newStatus: DeliveryStatus): void {
		this.currentStatus = newStatus;
		console.log(`\nDelivery status was updated: ${newStatus}`);
		this.notifyAll();
	}

	subscribe(observer: DeliveryObserver): void {
		this.observers.push(observer);
		console.log(`   ${observer.getId()} was subscibed!`);
	}

	unsubscribe(observer: DeliveryObserver): void {
		this.observers.filter(entity => entity !== observer);
		console.log(`   ${observer.getId()} was unsubscibed!`);
	}

	notifyAll(): void {
		this.observers.forEach(observer => {
			observer.notify(this.currentStatus);
		});
	}
}

export class CourierApplication implements DeliveryObserver {
	private readonly id = 'Courier Observer';

	constructor() {
		console.log(`${this.id} object was created!`);
	}

	getId(): string {
		return this.id;
	}

	notify(status: DeliveryStatus): void {
		console.log(`[${this.id}]: got delivery status update, the new status is: ${status}`);
	}
}

export class CustomerApplication implements DeliveryObserver {
	private readonly id = 'Customer Observer';

	constructor() {
		console.log(`${this.id} object was created!`);
	}

	getId(): string {
		return this.id;
	}

	notify(status: DeliveryStatus): void {
		console.log(`[${this.id}]: got delivery status update, the new status is: ${status}`);
	}
}

export function getStatus(index: number): DeliveryStatus | undefined {
	switch (index) {
		case 0:
			return DeliveryStatus.AWAITING;
		case 1:
			return DeliveryStatus.TRANSFERRED_TO_DELIVERY_SERVICE;
		case 2:
			return DeliveryStatus.IN_TRANSIT;
		case 3:
			return DeliveryStatus.OUT_FOR_DELIVERY;
		case 4:
			return DeliveryStatus.DELIVERED;
		default:
			return undefined;
	}
}
