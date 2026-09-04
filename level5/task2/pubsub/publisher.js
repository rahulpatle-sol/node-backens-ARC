import Redis from 'ioredis';

const pub = new Redis();

// order placed event
await pub.publish('order-placed', JSON.stringify({
    orderId: 'ORD-001',
    userId: 'USR-123',
    amount: 1500,
    items: ['laptop', 'mouse']
}));
console.log('Order placed event published!');

// thoda wait karo
await new Promise(r => setTimeout(r, 1000));

// order cancelled event
await pub.publish('order-cancelled', JSON.stringify({
    orderId: 'ORD-001',
    reason: 'Out of stock'
}));
console.log('Order cancelled event published!');

await pub.quit();


