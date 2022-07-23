const fs = require('fs');

module.exports = (client) => {
    client.eventHandler = async () => {
        const eventFolders = fs.readdirSync(`./src/events`);
        // Loop through every event file
        for (const folder of eventFolders) {
            const eventFiles = fs
                .readdirSync(`./src/events/${folder}`)
                .filter(file => file.endsWith('.js'));

            // Execute the file once the event is called
            switch (folder) {
                case "client":
                    for (const file of eventFiles) {
                        const event = require(`../../events/${folder}/${file}`);
                        if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
                        else client.on(event.name, (...args) => event.execute(...args, client));
                    }
                    break;
                default:
                    break;
            }
        }
    }
}