const discord = require("discord.js");

module.exports.run = async(client, message, args) => {

    var geenArgs = new discord.MessageEmbed()
    .setDescription(`<:fout:748888271853191168> !suggestie [Suggestie]`)
    .setColor("#14e378");

    var geenChan = new discord.MessageEmbed()
    .setDescription(`<:error:748888270850621451> Kan het kanaal **suggesties** niet vinden. Vraag aan een owner om dit kanaal aantemaken.`)
    .setColor("#14e378");

    var suggestion = args.join(" ");
    if(!suggestion) return message.channel.send(geenArgs)

    var chan = message.guild.channels.cache.find(channel => channel.name === "suggesties");
    if(!chan) return message.channel.send(geenChan);

    var embed = new discord.MessageEmbed()
    .setTitle("Suggestion")
    .setColor("#14e378")
    .addField("Suggestie Van", message.author)
    .addField("Suggestie",suggestion);

    chan.send(embed).then(embedMessage => {

        embedMessage.react("👍");
        embedMessage.react("👎");

    })

    var embedSucces = new discord.MessageEmbed()
    .setColor("#14e378")
    .setDescription(`<:Succesvol:748888270930444394> ${message.author} Bedankt voor je suggestie!`);

    message.channel.send(embedSucces);
    



}

module.exports.help = {
    name: "suggestie"
}