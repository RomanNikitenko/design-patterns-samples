import { USB } from "./client";
import { MemoryCard } from "./memoryCard";

/** Adapter */
export class CardReader implements USB {
	protected readonly memoryCard: MemoryCard;

	constructor(memoryCard: MemoryCard) {
		this.memoryCard = memoryCard;
	}

	async readDataUsingUSB(): Promise<void> {
		console.log('    === Card Reader === reading data using USB...');

		await this.memoryCard.insert();
		await this.memoryCard.readData();

		console.log('    === Card Reader === the data was read using USB!');
	}
}
