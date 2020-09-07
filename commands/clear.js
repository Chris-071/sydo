const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var geenPerms = new discord.MessageEmbed()
        .setDescription(`<:fout:748888271853191168> ${message.author}, Jij hebt hier geen permissions voor.`)
        .setColor("#14e378");

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(geenPerms);

    var geenLogsChan = new discord.MessageEmbed()
        .setDescription(`<:error:748888270850621451> Kan het kanaal **logs** niet vinden, Vraag aan een owner om deze aantemaken.`)
        .setColor("#14e378");

    var logChannel = message.guild.channels.cache.find(channel => channel.name === 'logs');
    if (!logChannel) return message.channel.send(geenLogsChan);


    var geenArgs = new discord.MessageEmbed()
        .setDescription(`Geef een geldig aantal berichten op. [1/99]`)
        .setColor("#14e378");

    if (!args[0]) return message.channel.send(geenArgs);

    if (Number.isInteger(parseInt(args[0]))) {

        var aantal = parseInt(args[0]) + 1;

        var argsOnder0 = new discord.MessageEmbed()
            .setDescription(`<:fout:748888271853191168> Ik kan geen _0_ of _minder_ berichten verwijderen.`)
            .setColor("#14e378");

        var argsBoven99 = new discord.MessageEmbed()
            .setDescription(`<:fout:748888271853191168> Ik kan geen _100_ of _meer_ berichten verwijderen.`)
            .setColor("#14e378");

        var args1 = new discord.MessageEmbed()
            .setDescription(`<:Succesvol:748888270930444394> Ik heb 1 bericht verwijderd.`)
            .setColor("#14e378");

        var logEmbed2 = new discord.MessageEmbed()
            .setDescription(`<:Succesvol:748888270930444394> Ik heb ${args[0]} berichten vewijderd.`)
            .setColor("#14e378");

            var logEmbed = new discord.MessageEmbed()
            .setColor("#14e378")
            .setTitle("Clear")
            .addField("Moderator:", message.author)
            .addField("Kanaal:", message.channel)
            .addField("Aantal:", `${args[0]} Berichten`);



        message.channel.bulkDelete(aantal).then(() => {

            if (args[0] <= 0) {
                 message.channel.send(argsOnder0).then(msg => msg.delete({ timeout: 3000 }));
            } else if (args[0] == 1) {
                 message.channel.send(args1).then(msg => msg.delete({ timeout: 3000 }));
            } else if (args[0] >= 100) {
                 message.channel.send(argsBoven99).then(msg => msg.delete({ timeout: 3000 }));
            } else {
                 message.channel.send(logEmbed2).then(msg => msg.delete({ timeout: 3000 }));
            }

        })


    } else {
        message.channel.send(geenArgs);
    }

    message.delete()
    logChannel.send(logEmbed);

}

module.exports.help = {
    name: "clear"
}

// var emb = new discord.MessageEmbed()
// .setDescription(``)
// .setColor("#14e378");