const discord = require("discord.js");

module.exports.run = async(client, message, args) => {

    var embed = new discord.MessageEmbed()
    .setTitle(`${client.user.username}'s badges`)
    .setColor("#14e378")
    .addField("<:dev:746127138050015362> - Bot Developers", "gevuldenkoek")
    .addField("<:staff:746127138054471781> - Bot Staff", "N/A")
    .addField("<:verifyed:746126936954241084> - Verifyed Server", "Bot Test - Moo6")
    .addField("<:partner:746130743830249494> - Partners", "-PatatAppelmoes \n -Jona ")
    .addField("<:BugHunter:746130743599824916> - Bug Hunters", "N/A")
    .addField("<:gamedev:746130743389847660> - Verifyed games", "N/A");

    message.channel.send(embed)


}

module.exports.help = {
    name: "badges"
}