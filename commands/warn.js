const discord = require("discord.js");
const fs = require("fs");
const { warn } = require("console");
const warns = JSON.parse(fs.readFileSync("./data/warnings.json", "utf8"));

module.exports.run = async (client, message, args) => {

    //embeds\\

    var geenPerms = new discord.MessageEmbed()
        .setDescription(`<:fout:748888271853191168> ${message.author}, Jij hebt hier geen permissions voor.`)
        .setColor("#14e378")

    var geenLogsChan = new discord.MessageEmbed()
        .setDescription(`<:error:748888270850621451> Kan het kanaal **logs** niet vinden, Vraag aan een owner om deze aantemaken.`)
        .setColor("#14e378");

    var geenUser = new discord.MessageEmbed()
        .setDescription(`<:fout:748888271853191168> Geef een gebruiker op.`)
        .setColor("#14e378");

    var geenReden = new discord.MessageEmbed()
        .setDescription(`<:fout:748888271853191168> ${message.author}, Geef een reden op.`)
        .setColor("#14e378");


    //Embeds\\

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(geenPerms);

    if (!args[0]) return message.channel.send(geenUser);
    if (!args[1]) return message.channel.send(geenReden);

    var warnUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    var reason = args.slice(1).join(" ");

    if (!warnUser) return message.channel.send(geenUser);
    if (!reason) return message.channel.send(geenReden);

    var logChannel = message.guild.channels.cache.find(channel => channel.name === 'logs');
    if (!logChannel) return message.channel.send(geenLogsChan);



    if (!warns[warnUser.id]) warns[warnUser.id] = {
        warns: 0
    };

    warns[warnUser.id].warns++;


    fs.writeFile("./data/warnings.json", JSON.stringify(warns), (err) => {
        if(err) console.log(err);
    });

    var warnEmbed1 = new discord.MessageEmbed()
    .setTitle("Warn")
    .setColor("#14e378")
    .addField("Gebruiker:", warnUser)
    .addField("Moderator:", message.author)
    .addField("Reden", reason)
    .addField("Aantal Warns:", warns[warnUser.id].warns);

    var warnEmbed2 = new discord.MessageEmbed()
    .setTitle(`Je bent gewarnd in ${message.guild.name}`)
    .setColor("#14e378")
    .addField("Moderator:", message.author)
    .addField("Reden", reason)
    .addField("Aantal Warns:", warns[warnUser.id].warns);


    var warnEmbed3 = new discord.MessageEmbed()
    .setDescription(`<:Succesvol:748888270930444394> ${message.author} Je hebt succesvol *${warnUser}* gewarnd.`)
    .setColor("#14e378");

    logChannel.send(warnEmbed1);
    warnUser.send(warnEmbed2);
    message.channel.send(warnEmbed3);


}

module.exports.help = {
    name: "warn"
}