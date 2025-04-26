/** Adaptee */
export class MemoryCard {
	async insert(): Promise<void> {
		console.log('        === Memory Card === the card was inserted!');
	}

	async readData(): Promise<void> {
		console.log('        === Memory Card === the data was read!');
	}
}
