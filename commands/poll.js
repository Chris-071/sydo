const discord = require("discord.js");

module.exports.run = async(client, message, args) => {
 
    var geenPerms = new discord.MessageEmbed()
        .setDescription(`<:fout:748888271853191168> Jij hebt hier geen permissions voor.`)
        .setColor("#14e378");

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(geenPerms);

    var geenChanEmbed = new discord.MessageEmbed()
    .setDescription(`<:error:748888270850621451> Kan het kanaal **polls** niet vinden, Vraag aan een owner om deze aantemaken.`)
    .setColor("#14e378");

    var geenPoll = new discord.MessageEmbed()
    .setDescription(`<:fout:748888271853191168> !poll [Poll]`)
    .setColor("#14e378");

    var succes = new discord.MessageEmbed()
    .setDescription(`<:Succesvol:748888270930444394> Poll succesvol aangemaakt.`)
    .setColor("#14e378");

    var channel = message.guild.channels.cache.find(channel => channel.name === 'polls');
    if(!channel) return message.channel.send(geenChanEmbed);

    var poll = args.join(" ");
    if(!poll) return message.channel.send(geenPoll);
    
    var pollEmbed = new discord.MessageEmbed()
    .setTitle("Nieuwe Poll")
    .setDescription(`📊Poll - ${poll}`)
    .setFooter(`Poll van ${message.author.username}`)
    .setColor("#14e378");


    channel.send(pollEmbed).then(embedMessage => {
        embedMessage.react('👍');
        embedMessage.react('👎');
    });
    message.channel.send(succes).then(msg => msg.delete({ timeout: 3000 }));

    message.delete()


}

module.exports.help = {
    name: "poll"
}