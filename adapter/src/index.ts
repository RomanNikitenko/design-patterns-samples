import { Client } from "./client";

console.info('      === Test Adapter (Wrapper) Pattern ===\n');
const client = new Client();
client.readDataUsingUSB();
