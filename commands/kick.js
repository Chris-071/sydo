const discord = require("discord.js");

module.exports.run = async (client, message, args) => {


    var geenLogsChan = new discord.MessageEmbed()
        .setDescription(`<:error:748888270850621451> Kan het kanaal **logs** niet vinden, Vraag aan een owner om deze aantemaken.`)
        .setColor("#14e378");

    var logChannel = message.guild.channels.cache.find(channel => channel.name === 'logs');
    if (!logChannel) return message.channel.send(geenLogsChan);

    var geenUser = new discord.MessageEmbed()
        .setDescription(`<:fout:748888271853191168> Kan deze gebruiker niet vinden.`)
        .setColor("#14e378");

    var geenReden = new discord.MessageEmbed()
        .setDescription(`<:fout:748888271853191168> Geef een reden op.`)
        .setColor("#14e378");

    var geenPerms = new discord.MessageEmbed()
        .setDescription(`<:fout:748888271853191168> Jij hebt hier geen permissions voor.`)
        .setColor("#14e378");

    var perms = new discord.MessageEmbed()
        .setDescription(`<:fout:748888271853191168> Je kan deze gebruiker niet kicken.`)
        .setColor("#14e378");

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(geenPerms);

    if (!args[0]) return message.channel.send(geenUser);
    if (!args[1]) return message.channel.send(geenReden);


    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
    var reden = args.slice(1).join(" ");

    if (!user) return message.channel.send(geenUser);
    if (!reden) return message.channel.send(geenReden);

    message.delete()

    var logEmbed = new discord.MessageEmbed()
        .setTitle("Kick")
        .setColor("#14e378")
        .addField("Gebruiker:", user)
        .addField("Moderator:", message.author)
        .addField("Reden", reden);

    logChannel.send(logEmbed);

    var errorEmbed = new discord.MessageEmbed()
        .setDescription(`<:error:748888270850621451> Error, Er is een fout opgetreden. Errorcode: 002`)
        .setColor("#14e378");


    var logEmbedUser = new discord.MessageEmbed()
        .setTitle("Je bent gekickt in " + message.guild.name)
        .setColor("#14e378")
        .addField("Moderator:", message.author)
        .addField("Reden", reden);

    user.send(logEmbedUser)

    var logEmbed2 = new discord.MessageEmbed()
        .setDescription(`<:Succesvol:748888270930444394> ${user} succesvol gekickt.`)
        .setColor("#14e378");

    message.channel.send(logEmbed2).then(user.kick(reden).catch(err => {
        if (err) return message.channel.send(errorEmbed);
    }));







}

module.exports.help = {
    name: "kick"
}