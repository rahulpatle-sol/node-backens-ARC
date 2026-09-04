import Redis from 'ioredis';

const sub = new Redis();

// channels subscribe karo
sub.subscribe('order-placed', 'order-cancelled', (err, count) => {
    if (err) console.error('Subscribe error:', err);
    console.log(`Listening on ${count} channels...`);
});

// message aaya
sub.on('message', (channel, message) => {
    const data = JSON.parse(message);
    
    if (channel === 'order-placed') {
        console.log(`✅ NEW ORDER — ID: ${data.orderId}, Amount: ₹${data.amount}, User: ${data.userId}`);
        // real app mein: email bhejo, inventory update karo
    }
    
    if (channel === 'order-cancelled') {
        console.log(`❌ ORDER CANCELLED — ID: ${data.orderId}, Reason: ${data.reason}`);
        // real app mein: refund karo
    }
});