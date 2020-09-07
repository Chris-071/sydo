const discord = require("discord.js");

module.exports.run = async(client, message, args) => {

    var geenArgs = new discord.MessageEmbed()
    .setDescription(`<:fout:748888271853191168> !bug [Bug]`)
    .setColor("#14e378");

    var geenChan = new discord.MessageEmbed()
    .setDescription(`<:error:748888270850621451> Kan het kanaal **bugs** niet vinden. Vraag aan een owner om dit kanaal aantemaken.`)
    .setColor("#14e378");

    var bug = args.join(" ");
    if(!bug) return message.channel.send(geenArgs)

    var chan = message.guild.channels.cache.find(channel => channel.name === "bugs");
    if(!chan) return message.channel.send(geenChan);

    var embed = new discord.MessageEmbed()
    .setTitle("Bug")
    .setColor("#14e378")
    .addField("Bug Van", message.author)
    .addField("Bug",bug);

    chan.send(embed)

    var embedSucces = new discord.MessageEmbed()
    .setColor("#14e378")
    .setDescription(`<:Succesvol:748888270930444394> ${message.author} Bedankt voor je bug!`);

    message.channel.send(embedSucces);
    



}

module.exports.help = {
    name: "bug"
}