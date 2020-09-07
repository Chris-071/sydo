const discord = require("discord.js");
const config = require("./Config.json");
const client = new discord.Client();
client.commands = new discord.Collection();
client.login(procces.env.token)
const fs = require("fs");

const activiteiten = [
    `!help || SOON`,
    `SOON`,
    `!help`
];


client.on("ready", async () => {
    console.log(`Bot is online`);
    var i = 0;
    setInterval(() => client.user.setActivity(`${activiteiten[i++ % activiteiten.length]}`, { type: 'WATCHING'}), 10000);
});



fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Files niet gevonden");
        return;
    };

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`${f} is geladen`)

        client.commands.set(fileGet.help.name, fileGet);
    });

});

client.on("guildMemberAdd", member => {

    var role = member.guild.roles.cache.find(x => x.name === 'Member');
    if (!role) return;

    var channel = member.guild.channels.cache.find(channel => channel.name === 'general');
    if (!channel) return;

    member.roles.add(role);

    var joinEmbed = new discord.MessageEmbed()
        .setDescription(`Welkom in ${member.guild.name}, ${member}.`)
        .setColor("#14e378");

    channel.send(joinEmbed);


})



client.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefix = config.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    if (!message.content.startsWith(prefix)) return;

    var arguments = messageArray.slice(1);

    var commands = client.commands.get(command.slice(prefix.length));

    if (commands) commands.run(client, message, arguments);

    var msg = message.content.toLowerCase();



});