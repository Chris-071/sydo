const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var item = "";
    var time;
    var winnerCount;

    var geenPerms = new discord.MessageEmbed()
        .setDescription(`<:fout:748888271853191168> ${message.author}, Jij hebt hier geen permissions voor.`)
        .setColor("#14e378");

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(geenPerms);

    var geenArgs = new discord.MessageEmbed()
        .setDescription(`<:fout:748888271853191168> !giveaway [Aantal Winnaars] [Tijd] [Prijs]`)
        .setColor("#14e378");

    if (!winnerCount) return message.channel.send(geenArgs);
    if (!winnerCount) return message.channel.send(geenArgs);
    if (!winnerCount) return message.channel.send(geenArgs);

    winnerCount = args[0];
    time = args[1];
    item = args.splice(2, args, length);

    message.delete()

    var date = new Date().getTime();
    var dateEnd = new Date(date + time * 1000)

    var giveawayEmbed = new discord.MessageEmbed()
        .setTitle("**🎉 Giveaway! 🎉**")
        .addField("Prijs:", item)
        .addField("Verloopt:", dateEnd)
        .setAuthor(`Hosted By ${message.author} || Winnaars: ${winnerCount} || Reageer met 🎉 om mee te doen.`)
        .setColor("#14e378");

    var embedSend = await message.channel.send(giveawayEmbed);
    embedSend.react("🎉");


    setTimeout(function () {

        var random = 0;
        var winners = [];
        var inList = false;

        var peopleReacted = embedSend.reactions.cache.get("🎉").users.cache.array();

        for (let i = 0; i < peopleReacted.length; i++) {
            
            if(peopleReacted[i].id == client.user.id){
                peopleReacted.splice(i,1);
                continue;
            }
            
        }

        var teWeinig = new discord.MessageEmbed()
        .setDescription(`Er zijn te weinig mensen die hebben mee gedaan aan de giveaway. (**${item}**)`)
        .setColor("#14e378");

        if(peopleReacted.length == 0){

            return message.channel.send(teWeinig);

        }

        if(peopleReacted < winnerCount){
            return message.channel.send(teWeinig);
        }

        for (let y = 0; y < winnerCount; y++) {
            
            inList = false;

            random = Math.floor(Math.random() * peopleReacted.length);

            for (let o = 0; o < winners.length; o++) {
                
                if(winners[o] == peopleReacted[random]){
                    inList = true;
                    y--;
                    break;
                }
                
            }

            if(!inList){
                winners.push(peopleReacted[random]);
            }
            
        }

        for (let y = 0; y < winners.length; y++) {
          
            var giveawayEnded = new discord.MessageEmbed()
            .setTitle("**🎉 Giveaway! 🎉**")
            .addField("Prijs:", item)
            .addField("Verloopt:", "VERLOPEN")
            .setAuthor(`Hosted By ${message.author} || Winnaars: ${winners[y].username}`)
            .setColor("#14e378");

            
            embedSend.edit(giveawayEnded);

            message.channel.send("Gefeliciteerd " + winners[i].username + ``)
            
        }


    }, time * 1000)



}

module.exports.help = {
    name: "giveaway"
}