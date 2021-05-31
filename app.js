const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const fs = require("fs");
const config = JSON.parse(fs.readFileSync("./config.json"));
let guild;
let channel;
let announceChannel;
let message = config.message;

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    guild = client.guilds.cache.find(guild => guild.id === config.guild);
    channel = guild.channels.cache.find(channel => channel.id === config.channel);
    announceChannel = guild.channels.cache.find(channel => channel.id === config.announceChannel);
    if (config.message === "") {
        const message = await channel.send("Jの人は:regional_indicator_j:，Sの方は:regional_indicator_j:を押してください．");
        //await message.react("regional_indicator_j");
        //await message.react("regional_indicator_s");
    } else {
        console.log(`message id is set to ${message}`);
    }
});

client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.error('Something went wrong when fetching the message: ', error);
            return;
        }
    }
    if (reaction.emoji.name === "🇸" || reaction.emoji.name === "🇯") {
        const role = guild.roles.cache.find(role => role.name === (reaction.emoji.name === "🇯" ? "4J" : "4S"));
        const member = guild.members.cache.find(member => member.id === user.id );
        member.roles.add(role);
        announceChannel.send(`${(reaction.emoji.name === "🇯" ? "J" : "S")}科の${user.username}さん，**4SJ合同クラス企画へようこそ！**`);
        user.send("https://tenor.com/view/praying-cat-please-thank-you-thanks-gif-16119732");
        user.send(`${(reaction.emoji.name === "🇯" ? "J" : "S")}科の${user.username}さん，**4SJ合同クラス企画Discord鯖に参加してくださりありがとうございます！！**\nこれからクラス企画を盛り上げるためにみんなで頑張りましょう💪💪💪\n\nもし間違えて押してしまった場合は4JすずきにLINE，Discordでお知らせください．`);
    }
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

client.login(config.token);