module.exports = {

    // The name of your event
    name: 'ready',
    // Should the event only be called once per runtime
    once: true,

    // The code executed once the event is called
    async execute(client) {
        console.log(`\nBOT: Ready! Logged in as ${client.user.tag}\n`);
    },
};