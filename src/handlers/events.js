const fs = require('fs');
const path = require('node:path');

module.exports = (client) => {
    let eventSize = 0;
    const eventsPath = path.join(__dirname, '../events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        eventSize++;
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if(event.once) client.once(event.name, (...args) => event.execute(...args));
        else client.on(event.name, (...args) => event.execute(...args));
    };
    console.log(`✅ And got ${eventSize} events on!`);
}