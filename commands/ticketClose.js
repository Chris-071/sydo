const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var channelLogs = message.guild.channels.cache.find(channel => channel.name === 'ticket-logs');

    var geenPermsEmbed = new discord.MessageEmbed()
        .setDescription(`<:fout:748888271853191168> ${message.author} Alleen mensen met de role **Support Team** kunnen tickets closen.`)
        .setColor("#14e378");

    var geenChannel = new discord.MessageEmbed()
        .setDescription(`<:fout:748888271853191168> ${message.author} Ik kan het kanaal **ticket-logs** niet vinden, Vraag aan een owner om deze aantemaken.`)
        .setColor("#14e378");

    var geenTicket = new discord.MessageEmbed()
        .setDescription(`<:fout:748888271853191168> ${message.author} Je kunt alleen tickets closen.`)
        .setColor("#14e378");

    if (!message.member.roles.cache.find(x => x.name === 'Support Team')) return message.channel.send(geenPermsEmbed).then(msg => msg.delete({ timeout: 3000 })).then(message.delete());

    var reden = args.join(" ");


    var logsEmbed = new discord.MessageEmbed()
        .setTitle("Ticket gesloten")
        .setColor("#14e378")
        .addField("Ticket:", message.channel.name)
        .addField("Gesloten op:", message.createdAt)
        .addField("Gesloten Door:", message.author)
        .addField("Reden", reden || "Niet opgegeven.");

    var username = message.author.username;

    message.delete()

    if (message.guild.channels.cache.find(category => category.name === 'Tickets')) {

        if (!channelLogs) return message.channel.send(geenChannel).then(msg => msg.delete({ timeout: 3000 }));
        message.channel.delete()

        channelLogs.send(logsEmbed);

    } else {
        message.channel.send(geenTicket).then(msg => msg.delete({ timeout: 3000 }));
    }


}

module.exports.help = {
    name: "close"
}