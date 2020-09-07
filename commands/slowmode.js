const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var tijd = args[1];

    var geenPerms = new discord.MessageEmbed()
        .setDescription(`${message.author}, Jij hebt hier geen permissions voor.`)
        .setColor("#14e378");

    var geenArgs = new discord.MessageEmbed()
        .setDescription(`Geef een geldige slowmode tijd op.`)
        .setColor("#14e378");

    var embed = new discord.MessageEmbed()
        .setDescription(`Slowmode van ${message.channel.name} gezet op ${tijd}`)
        .setColor("#14e378");

    var logEmbed = new discord.MessageEmbed()
        .setColor("#14e378")
        .setTitle("Slowmode")
        .addField("Moderator:", message.author)
        .addField("Kanaal:", message.channel)
        .addField("Slowmode Tijd", tijd);


    var geenLogsChan = new discord.MessageEmbed()
        .setDescription(`<:error:748888270850621451> Kan het kanaal **logs** niet vinden, Vraag aan een owner om deze aantemaken.`)
        .setColor("#14e378");

    var logChannel = message.guild.channels.cache.find(channel => channel.name === 'logs');
    if (!logChannel) return message.channel.send(geenLogsChan);

    if (!args[1]) return message.channel.send(geenArgs);
    if (isNaN(parseInt(args[1]))) return message.channel.send(geenArgs);

    if(!tijd) return message.channel.send(geenArgs);

    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(geenPerms);

    message.channel.setRateLimitPerUser(tijd);
    message.channel.send(embed);
    logChannel.send(logEmbed);


}

module.exports.help = {
    name: "slowmode"
}