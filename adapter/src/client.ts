import { CardReader } from "./cardReader";
import { MemoryCard } from "./memoryCard";

export interface USB {
	readDataUsingUSB(): Promise<void>;
}

export class Client {
	protected readonly usbCompatibleDevice: USB;

	constructor() {
		/** CardReader - Adapter, MemoryCard - Adaptee */
		this.usbCompatibleDevice = new CardReader(new MemoryCard());
	}

	async readDataUsingUSB(): Promise<void> {
		console.log('=== Client === reading data using USB...');

		await this.usbCompatibleDevice.readDataUsingUSB();

		console.log('=== Client === the data was read using USB!');
	}
}
