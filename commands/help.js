const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var embed = new discord.MessageEmbed()
        .setDescription(`<:Succesvol:730747906331770900> Welke info wil je? <commands/botinfo/serverinfo/erroinfo> \n Reageer onder dit bericht.`)
        .setColor("#14e378");

    message.reply(embed);

    var p = "!"
    var general = `${p}help, ${p}suggestion, ${p}bug, ${p}badges`
    var moderation = `${p}ban, ${p}kick, ${p}warn, ${p}mute, ${p}unmute, ${p}say, ${p}purge, ${p}slowmode, ${p}poll, ${p}giveaway`
    var ticket = `${p}new, ${p}claim, ${p}unclaim, ${p}close`
    var music = `SOON`
    var levels = `SOON`


    var commands = new discord.MessageEmbed()
        .setTitle("Commands")
        .setColor("#14e378")
        .setDescription(`[Moo6 Support Server](https://discord.gg/YbtjSpm) \n [Moo6 Invite](https://discord.com/api/oauth2/authorize?client_id=747761381360664586&permissions=8&scope=bot)`)
        .addField("General", general)
        .addField("Moderation", moderation)
        .addField("Ticket", ticket)
        .addField("Music", music)
        .addField("Levels", levels);

        var ledenTotal = message.guild.memberCount;
        var bots = message.guild.members.cache.filter(m => m.user.bot).size;
        var people = ledenTotal - bots;
        var online = message.guild.members.cache.filter(m => m.user.presence.status == "online").size;
        var idle = message.guild.members.cache.filter(m => m.user.presence.status == "idle").size;
        var dnd = message.guild.members.cache.filter(m => m.user.presence.status == "dnd").size;
        var offline = message.guild.members.cache.filter(m => m.user.presence.status == "offline").size;

        var serverInfo = new discord.MessageEmbed()
        .setTitle("Server Info")
        .setColor("#14e378")
        .addField("Kanalen:", message.guild.channels.cache.size)
        .addField("Rollen:", message.guild.roles.cache.size)
        .addField("Members:", ` 👥 ${ledenTotal} \n 👤 ${people} \n 🤖 ${bots} \n <:online:752252560445931601> ${online} \n <:dnd:752252559611396287> ${dnd} \n <:idle:752252561720868915> ${idle} \n <:offline:752255883572150353> ${offline} `)
        .addField("Owner", message.guild.owner)

        var botInfo = new discord.MessageEmbed()
        .setTitle("Bot Info")
        .setColor("#14e378")
        .addField("Owner:", "Chris071_")
        .addField("Commands:", client.commands.size)
        .addField("Servers:", client.guilds.cache.size.toLocaleString())
        .addField("Gemaakt:", client.user.createdAt)
        .addField("Node.js:", process.version)
        .addField("Versie:", "v" + discord.version)

  

        var errorInfo = new discord.MessageEmbed()
        .setTitle("Error Info")
        .setColor("#14e378")
        .addField("<:error:748888270850621451>001","Embed Error.")
        .addField("<:error:748888270850621451>002","Moderation Error")
        .addField("<:error:748888270850621451>003","General Error")
        .addField("<:error:748888270850621451>004","Ticket Error");



        var errorEmbed = new discord.MessageEmbed()
        .setDescription(`<:error:748888270850621451> Error, Er is een fout opgetreden. Errorcode: 001`)
        .setColor("#14e378");



    message.channel.awaitMessages(m => m.author.id == message.author.id,
        { max: 1, time: 30000 }).then(collected => {

            if (collected.first().content.toLowerCase() == 'commands') {

                message.channel.send(commands);


            } else if (collected.first().content.toLowerCase() == 'botinfo') {

                message.channel.send(botInfo);

            } else if (collected.first().content.toLowerCase() == 'serverinfo') {

                message.channel.send(serverInfo);

            } else if (collected.first().content.toLowerCase() == 'errorinfo') {

                message.channel.send(errorInfo);

            }


        }).catch(err => {
            message.reply(errorEmbed)
        });









}

module.exports.help = {
    name: "help"
}