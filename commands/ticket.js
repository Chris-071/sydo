const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var geenCat = new discord.MessageEmbed()
        .setDescription(`<:error:748888270850621451> Kan de categorie **Tickets** niet vinden. Vraag aan een owner om dit kanaal aantemaken. [LET OP, Hoofdletter **T**]`)
        .setColor("#14e378");

    var geenSTR = new discord.MessageEmbed()
        .setDescription(`<:error:748888270850621451> Kan de rol **Support Team** niet vinden. Vraag aan een owner om deze rol aantemaken. [LET OP, Hoofdletter **S & T**]`)
        .setColor("#14e378");

    var boolTicket = new discord.MessageEmbed()
        .setDescription(`<:fout:748888271853191168> Je hebt al een ticket aangemaakt.`)
        .setColor("#14e378");


    var reden = args.join(" ");

    var supportTeamRole = message.guild.roles.cache.find(x => x.name === 'Support Team');
    if (!supportTeamRole) return message.channel.send(geenSTR);


    var cat = message.guild.channels.cache.find(category => category.name === "Tickets");
    if (!cat) return message.channel.send(geenCat);

    var username = message.author.username;

    var bool = false

    message.guild.channels.cache.forEach(channel => {

        if (channel.name == "ticket" + "-" + username.toLowerCase()) {
            bool = true

            message.channel.send(boolTicket);

            return;
        }

    });

    if (bool) return;


    var createEmbed1 = new discord.MessageEmbed()
        .setDescription(`<:Succesvol:748888270930444394> ${message.author} Je ticket word aangemaakt.`)
        .setColor("#14e378");

    message.channel.send(createEmbed1);

    var errorEmbed = new discord.MessageEmbed()
        .setDescription(`<:error:748888270850621451> Er is iets fout gegaan. Errorcode: 004`)
        .setColor("#14e378");



    message.guild.channels.create("ticket" + "-" + username.toLowerCase(), { type: 'text' }).then(
        (createdChannel) => {
            createdChannel.setParent(cat).then(
                (settedParent) => {

                    settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '@everyone'), {
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: false
                    });

                    settedParent.updateOverwrite(message.author.id, {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true,
                        READ_MESSAGES: true,
                        CREATE_INSTANT_INVITE: false,
                        ATTACH_FILES: true

                    });

                    settedParent.updateOverwrite(supportTeamRole, {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true,
                        READ_MESSAGES: true,
                        CREATE_INSTANT_INVITE: false,
                        ATTACH_FILES: true

                    });

                    var ticketEmbed = new discord.MessageEmbed()
                        .setColor("#14e378")
                        .setTitle(`Ticket`)
                        .setDescription(`Welkom in je ticket ${username}, Vertel hier je vraag/klacht.`)
                        .addField("Ticket van:", message.author)
                        .addField("Ticket Reden:", reden || "Niet Opgegeven.");

                    settedParent.send(`${supportTeamRole} ${message.author},`).then(settedParent.send(ticketEmbed));


                }
            ).catch(err => {
                message.channel.send(errorEmbed);
            });
        }
    ).catch(err => {
        message.channel.send(errorEmbed);
    });





}

module.exports.help = {
    name: "new"
}