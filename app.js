const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const fs = require("fs");
const config = JSON.parse(fs.readFileSync("./config.json"));
let guild;
let channel;
let message = config.message;

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    guild = client.guilds.cache.find(guild => guild.id === config.guild);
    channel = guild.channels.cache.find(channel => channel.id === config.channel);
    if (config.message === "") {
        const message = await channel.send("Jの人は:regional_indicator_j:，Sの方は:regional_indicator_j:を押してください．");
        //await message.react("regional_indicator_j");
        //await message.react("regional_indicator_s");
        console.log(message.id);
    } else {
        console.log(`message id is set to ${message}`);
    }
});

client.on('messageReactionAdd', async (reaction, user) => {
    console.log("a");
    // When a reaction is received, check if the structure is partial
    if (reaction.partial) {
        // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
        try {
            await reaction.fetch();
        } catch (error) {
            console.error('Something went wrong when fetching the message: ', error);
            // Return as `reaction.message.author` may be undefined/null
            return;
        }
    }
    // Now the message has been cached and is fully available
    //console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
    //console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
    console.log(reaction.emoji.name)
    if (reaction.emoji.name === "🇸" || reaction.emoji.name === "🇯") {
        const role = guild.roles.cache.find(role => role.name === (reaction.emoji.name === "🇯" ? "4J" : "4S"));
        const delRole = guild.roles.cache.find(role => role.name === "未割り当て");
        const member = guild.members.cache.find(member => member.id === user.id );
        member.roles.add(role);
        member.roles.remove(delRole);
    }


    // The reaction is now also fully available and the properties will be reflected accurately:
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

client.login(config.token);