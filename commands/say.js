const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var geenPerms = new discord.MessageEmbed()
        .setDescription(`<:fout:748888271853191168> Jij hebt hier geen permissions voor.`)
        .setColor("#14e378");

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(geenPerms);

    var geenBericht = new discord.MessageEmbed()
    .setDescription(`<:fout:748888271853191168> !say [Bericht]`)
    .setColor("#14e378");

    var bericht = args.join(" ");
    if(!bericht) return message.channel.send(geenBericht)

    var embed = new discord.MessageEmbed()
        .setDescription(bericht)
        .setColor("#14e378");

        message.channel.send(embed);
        message.delete()


}

module.exports.help = {
    name: "say"
}