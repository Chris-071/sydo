const discord = require("discord.js");

module.exports.run = async(client, message, args) => {

    var cId = '421717020288221186'


    var status = args.join(" ")


var embed = new discord.MessageEmbed()
    .setTitle("Status " + client.user.username)
    .setDescription(status)
    .setColor("#14e378");

    message.delete()


    if(message.author.id === cId){
        
        message.channel.send(embed);

    } else {

        var geenPermsEmbed = new discord.MessageEmbed()
        .setDescription("<:fout:730747907480748082> Geen permissions.")
        .setColor("#14e378");

        message.channel.send(geenPermsEmbed).then(msg => msg.delete({ timeout: 3000 }));
    }



}

module.exports.help = {
    name: "status"
}
