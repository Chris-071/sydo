const discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (client, message, args) => {


    var geenLogsChan = new discord.MessageEmbed()
        .setDescription(`<:error:748888270850621451> Kan het kanaal **logs** niet vinden, Vraag aan een owner om deze aantemaken.`)
        .setColor("#14e378");

    var geenMuteRole = new discord.MessageEmbed()
        .setDescription(`<:error:748888270850621451> Kan de rol **MUTED** niet vinden, Vraag aan een owner om deze aantemaken.`)
        .setColor("#14e378");

    var logChannel = message.guild.channels.cache.find(channel => channel.name === 'logs');
    if (!logChannel) return message.channel.send(geenLogsChan);

    var muteRole = message.guild.roles.cache.find(x => x.name === 'MUTED');
    if (!muteRole) return message.channel.send(geenMuteRole);

    var geenUser = new discord.MessageEmbed()
        .setDescription(`<:fout:748888271853191168> Kan deze gebruiker niet vinden.`)
        .setColor("#14e378");

    var geenTijd = new discord.MessageEmbed()
        .setDescription(`<:fout:748888271853191168> Geef een tijd op. [Bijvoorbeeld: 10s/m/h]`)
        .setColor("#14e378");

    var geenPerms = new discord.MessageEmbed()
        .setDescription(`<:fout:748888271853191168> Jij hebt hier geen permissions voor.`)
        .setColor("#14e378");

    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send(geenPerms);


    if (!args[0]) return message.channel.send(geenUser);
    if (!args[1]) return message.channel.send(geenTijd);


    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
    var tijd = args[1];

    if (!user) return message.channel.send(geenUser);
    if (!tijd) return message.channel.send(geenReden);

    message.delete()

    var logEmbed = new discord.MessageEmbed()
        .setTitle("Mute")
        .setColor("#14e378")
        .addField("Gebruiker:", user)
        .addField("Moderator:", message.author)
        .addField("Tijd", tijd);

    logChannel.send(logEmbed);

    var errorEmbed = new discord.MessageEmbed()
        .setDescription(`<:error:748888270850621451> Error, Er is een fout opgetreden. Errorcode: 002`)
        .setColor("#14e378");

    var logEmbed2 = new discord.MessageEmbed()
        .setDescription(`<:Succesvol:748888270930444394> ${user} succesvol gemute.`)
        .setColor("#14e378");

    message.channel.send(logEmbed2);

    var unmuteEmbed = new discord.MessageEmbed()
        .setDescription(`<:Succesvol:748888270930444394> ${user} succesvol geunmute.`)
        .setColor("#14e378");

    var unmuteLog = new discord.MessageEmbed()
        .setTitle("Unmute")
        .setColor("#14e378")
        .addField("Gebruiker:", user)
        .addField("Moderator:", message.author)
        .addField("Tijd", tijd);


    await (user.roles.add(muteRole));

    setTimeout(() => {

        user.roles.remove(muteRole);

        logChannel.send(unmuteLog);
        message.channel.send(unmuteEmbed);


    }, ms(tijd));



}

module.exports.help = {
    name: "mute"
}