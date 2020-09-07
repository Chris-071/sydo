const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var username = message.author.username;

    var geenPermsEmbed = new discord.MessageEmbed()
        .setDescription(`<:fout:748888271853191168> ${message.author} Alleen mensen met de role **Support Team** kunnen tickets unclaimen.`)
        .setColor("#14e378");

    if (!message.member.roles.cache.find(x => x.name === 'Support Team')) return message.channel.send(geenPermsEmbed).then(msg => msg.delete({timeout: 3000})).then(message.delete());

    var unclaimed = new discord.MessageEmbed()
        .setDescription(`<:Succesvol:730747906331770900> Ticket succesvol geunclaimd door ${message.author}.`)
        .setColor("#14e378");


    message.delete()

    var geenTicket = new discord.MessageEmbed()
        .setDescription(`<:fout:748888271853191168> ${message.author} Je kunt alleen tickets unclaimen.`)
        .setColor("#14e378");


    if (message.guild.channels.cache.find(category => category.name === 'Tickets')) {
        message.channel.send(unclaimed)
    } else {
        message.channel.send(geenTicket).then(msg => msg.delete({timeout: 3000}));
    }




}

module.exports.help = {
    name: "unclaim"
}