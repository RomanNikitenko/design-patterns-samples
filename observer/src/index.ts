import readline from 'readline';
import { CourierApplication, CustomerApplication, Delivery, DeliveryStatus, getStatus } from "./entities";

console.info('      === Test Observer (Dependents or Publish-Subscribe) Pattern ===\n');
const delivery = new Delivery();

const customerObserver = new CustomerApplication();
delivery.subscribe(customerObserver);

const courierObserver = new CourierApplication();
delivery.subscribe(courierObserver);

console.log('\nWould you like to change delivery status?\n');
const allStatuses: string[] = Object.values(DeliveryStatus);
console.table(allStatuses);

const readlineInstance = getReadlineInstance();
readlineInstance.question('Enter Index of Status: ', indexStr => {
	const index = Number(indexStr.trim());
	if (Number.isNaN(index)) {
		readlineInstance.close();
		console.error('Invalid number entered!');
		return;
	}

	const newStatus = getStatus(index);
	if (newStatus) {
		delivery.updateStatus(newStatus)
	} else {
		console.error('Incorrect status entered!');
	}
	readlineInstance.close();
});



function getReadlineInstance() {
	return readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
}


