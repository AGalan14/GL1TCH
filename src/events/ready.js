const { Events, ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`${client.user.tag} is ready, fellas! (⁠⌐⁠■⁠-⁠■⁠)`);

        const activities = [
            { name: `What are you looking at..? ಠ_ಠ`, type: ActivityType.Custom },
            { name: `🛏️ ZzZzz...`, type: ActivityType.Custom },
            { name: `Greetings, folks! ^-^`, type: ActivityType.Custom }
        ];

        const status = [
            'dnd',
            'idle',
            'online'
        ];

        let i = 0;
        setInterval(() => {
            if(i >= activities.length) i=0;
            client.user.setActivity(activities[i]);
            client.user.setStatus(status[i]);
            i++;
        }, 5000);
    }
};