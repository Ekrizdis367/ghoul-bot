/* ============================================================== */
//     NAME: VtM Ghoul Bot
//   AUTHOR: Ekrizdis#3957
/* ============================================================== */
const Discord       = require('discord.js');
const BotSettings   = require('./package.json');
const Disciplines   = require('./disciplines.json');
const Rules         = require('./rules.json');
const fetch         = require('cross-fetch');
/* ============================================================== */
const client        = new Discord.Client();
/* ============================================================== */
const nGif          = 'https://pa1.narvii.com/6684/e31330938879c53a7dd01c94d7efc370de02831f_hq.gif';
const dGif          = 'https://media1.tenor.com/images/375325e6b2912a2b35ee27d62cfc31a1/tenor.gif';
const vtmSymbol     = 'https://vignette.wikia.nocookie.net/whitewolf/images/6/6d/Vampire5thAnkh.png/revision/latest/scale-to-width-down/340?cb=20180728213205.png';
const darkpack      = 'https://static.wixstatic.com/media/05da39_90f7efee7d7243a09d9374e948e47b40~mv2_d_5500_3559_s_4_2.png/v1/fill/w_668,h_432,al_c,q_85,usm_0.66_1.00_0.01/05da39_90f7efee7d7243a09d9374e948e47b40~mv2_d_5500_3559_s_4_2.webp';
const privacy       = 'Portions of the materials are the copyrights and trademarks of Paradox Interactive AB, and are used with permission. All rights reserved. For more information please visit white-wolf.com.';
const annCategories = ['633108161103921152','633487625809821696','633113410103672842'];
/* ============================================================== */
/* ============================================================== */
/* ASYNC FUNCTIONS                                                */
/* ============================================================== */
async function getWeather() {
    let weather = await fetch('https://api.weather.gov/gridpoints/HGX/64,96/forecast');
    weather = await weather.json();
    weather = weather.properties.periods;
    return weather;
}

async function getDisciplines() {
    let disciplines = await Disciplines.disciplines;
    return disciplines;
}

async function getCompulsions() {
    let compulsions = await Rules.compulsions;
    return compulsions;
}

async function getBloodPotency() {
    let potency = await Rules.blood_potency;
    return potency;
}
/* ============================================================== */
/* ============================================================== */
/* EVENT: Client Startup                                          */
/* ============================================================== */
client.on('ready', () => {
    // Set the client user's activity
    client.user.setActivity('VtM | !ghoul', { type: 'WATCHING' })
        .catch(console.error);
    console.log('\nServers:');
    let bots = 0;
    client.guilds.cache.forEach(guild => {
        console.log(" - " + guild.name);
        bots++;
    });
    console.log('\n' + client.user.username + ' is now connected to ' + bots + ' servers!');
    console.log('\n');
});
/* ============================================================== */
/* ============================================================== */
/* EVENT: Server Message                                          */
/* ============================================================== */
client.on('message', (msg) => {

    if (msg.author.bot) { return; }

    /* ============================================================== */
    // Command: !sunrise
    /* ============================================================== */
    /* This is a private command for Lonestar by Night.               */
    /* ============================================================== */
    if (msg.content.includes('!sunrise') && msg.member.roles.cache.find(r => r.name === "Fate" || r.name === "Adjudicator") && msg.guild.name === "Lonestar by Night") {

        let annChannel = msg.guild.channels.cache.find(channel => channel.name === 'announcements');
        let date = msg.content.substring(9);

        getWeather().then( data => {

            data.forEach( forecast => {
                if (forecast.number === 1) {
                    dTemp = forecast.temperature;
                    dWindS = forecast.windSpeed;
                    dWindD = forecast.windDirection;
                    dDescription = forecast.shortForecast;
                }
            });

            if (dTemp < 49) {temperature = "Cold";}
            else if (dTemp > 50 && 89 > dTemp) {temperature = "Moderate";}
            else if (dTemp > 90) {temperature = "Hot";}
            else {temperature = "Normal";}

            dayTime = new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle('Announcement: Day')
                .setDescription('\
                \nHello Kindred of Houston. Thank you for the awesome scenes and developing plots this week.  \
                \n \
                \nHowever, the night comes to an end now, which means in the next 48 hours there will only be roleplay from Ghouls, Mortals, and Daywalker Thin-Bloods. \
                \n \
                \nEveryone else rest up and get ready for the night to come next Tuesday (RL) 12pm CST. \
                \nExperience, News, SI attention, and similar will be calculated by the mods during this downtime. \
                \nIf you have running scenes make sure to slowly finish them up and not start new ones! \
                \n \
                \nStay excellent everyone! :hearts: ')
                .setThumbnail(vtmSymbol)
                .addFields(
                    { name: 'In-Game Date', value: date },
                    { name: 'Weather', value: '\
                    \n**Description:** '+ dDescription +'\
                    \n**Wind Speed:** '+ dWindS +'\
                    \n**Temperature:** '+ temperature +'\
                    \n**Wind Direction:** '+ dWindD +'\
                    \n**Day High:** '+ dTemp +'°F\
                    ' },
                )
                .setImage(dGif)
                .setFooter('Lonestar by Night VtM', vtmSymbol);

            annChannel.send(dayTime);
            annChannel.send("@everyone");

        }).catch(error => {

            console.error(error);
    
        });

        client.channels.cache.forEach( channel => {
            if (annCategories.includes(channel.parentID)) {
                day = new Discord.MessageEmbed().setImage(dGif);
                channel.send(day);
            }
        });

    } // END Command: !sunrise

    /* ============================================================== */
    // Command: !sunset
    /* ============================================================== */
    /* This is a private command for Lonestar by Night.               */
    /* ============================================================== */
    if (msg.content.includes('!sunset') && msg.member.roles.cache.find(r => r.name === "Fate" || r.name === "Adjudicator") && msg.guild.name === "Lonestar by Night") {

        let annChannel = msg.guild.channels.cache.find(channel => channel.name === 'announcements');
        let date = msg.content.substring(8);

        getWeather().then( data => {

            data.forEach( forecast => {
                if (forecast.number === 2) {
                    nTemp = forecast.temperature;
                    nWindS = forecast.windSpeed;
                    nWindD = forecast.windDirection;
                    nDescription = forecast.shortForecast;
                }
            });

            if (nTemp < 49) {temperature = "Cold"}
            else if (nTemp > 50 && 89 > nTemp) {temperature = "Moderate"}
            else if(nTemp > 90) {temperature = "Hot"}
            else {temperature = "Normal"}
            
            nightTime = new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle('Announcement: Night')
                .setDescription('\
                \nLet the creatures of the night rise!  \
                \n  \
                \nFeel free to make your wake-up rouse checks, refill your Willpower, roll out any accumulated Stains and then get to RP!  \
                \n \
                \nHave fun everyone! Be excellent to each other and enjoy the drama! \
                \n \
                \nStay excellent everyone! :hearts: ')
                .setThumbnail(vtmSymbol)
                .addFields(
                    { name: 'In-Game Date', value: date },
                    { name: 'Weather', value: '\
                    \n**Description:** '+ nDescription +'\
                    \n**Wind Speed:** '+ nWindS +'\
                    \n**Temperature:** '+ temperature +'\
                    \n**Wind Direction:** '+ nWindD +'\
                    \n**Night Low:** '+ nTemp +'°F\
                    ' },
                )
                .setImage(nGif)
                .setFooter('Lonestar by Night VtM', vtmSymbol);
            
            annChannel.send(nightTime);
            annChannel.send("@everyone");

        }).catch(error => {

            console.error(error);
    
        }); 

        client.channels.cache.forEach( channel => {
            if (annCategories.includes(channel.parentID)) {
                night = new Discord.MessageEmbed().setImage(nGif);
                channel.send(night);
            }
        });

    } // END Command: !sunset

    /* ============================================================== */
    // Command: !p
    /* ============================================================== */
    if (msg.content.includes('!p ')) {
        let message = msg.content.substring(3).toUpperCase();
        getDisciplines().then( disciplines => {
            disciplines.forEach( discipline => {
                let abilities = discipline.abilities;
                abilities.forEach( ability => {
                    if (ability.power.toUpperCase() === message) {
                        if (discipline.name === 'Rituals') {
                            let process = " ";
                            if (ability.process) { process = ability.process; }
                            let ritualCard = new Discord.MessageEmbed()
                                .setColor('RED')
                                .setTitle(ability.power)
                                .setDescription(process)
                                .addFields(
                                    {name: 'Level', value: ability.level},
                                    {name: 'Ingredients', value: ability.ingredients},
                                    {name: 'Summary', value: ability.summary}
                                )
                                .setThumbnail(vtmSymbol)
                                .setFooter(ability.reference);
                            msg.channel.send(ritualCard);
                        }
                        else {
                            let powerCard = new Discord.MessageEmbed()
                                .setColor('RED')
                                .setTitle(ability.power)
                                .addFields(
                                    {name: 'Level', value: ability.level, inline: true},
                                    {name: 'Cost', value: ability.cost, inline: true},
                                    {name: 'Duration', value: ability.length, inline: true}
                                )
                                .setThumbnail(vtmSymbol)
                                .setFooter(ability.reference);
                            if (ability.prerequisite) { powerCard.addField('Prerequisite', ability.prerequisite); }
                            if (ability.dice) { powerCard.addField('Dice Pools', ability.dice); }
                            powerCard.addField('Summary', ability.description);
                            msg.channel.send(powerCard);
                        }
                    }
                })
            })
        })
    } // END Command: !p

    /* ============================================================== */
    // Command: !disciplines
    /* ============================================================== */
    if (msg.content === '!disciplines') {
        getDisciplines().then( disciplines => {
            var names = [];
            disciplines.forEach( discipline => { names.push(discipline.name); })
            names = names.sort();
            let sortedNames = "";
            names.forEach( name => { sortedNames += name + "\n"; })
            let disciplinesCard = new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle('Disciplines')
                .setDescription(sortedNames);
            msg.channel.send(disciplinesCard);
        })
    } // END Command: !d

    /* ============================================================== */
    // Command: !d
    /* ============================================================== */
    if (msg.content.includes('!d ')) {
        let message = msg.content.substring(3).toUpperCase();
        getDisciplines().then( disciplines => {
            disciplines.forEach( discipline => {
                if (message === discipline.name.toUpperCase()) {
                    let abilities = discipline.abilities;
                    let one = "";
                    let two = "";
                    let three = "";
                    let four = "";
                    let five = "";
                    abilities.forEach( ability => {
                        if (ability.level === '1') { one += ability.power + "\n"; }
                        if (ability.level === '2') { two += ability.power + "\n"; }
                        if (ability.level === '3') { three += ability.power + "\n"; }
                        if (ability.level === '4') { four += ability.power + "\n"; }
                        if (ability.level === '5') { five += ability.power + "\n"; }
                    })
                    let disciplineCard = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setTitle(discipline.name)
                        .addFields(
                            {name: 'Level 1', value: one},
                            {name: 'Level 2', value: two},
                            {name: 'Level 3', value: three},
                            {name: 'Level 4', value: four},
                            {name: 'Level 5', value: five}
                        )
                    msg.channel.send(disciplineCard);
                }
            })
        })
    } // END Command: !d

    /* ============================================================== */
    // Command: !compulsions
    /* ============================================================== */
    if (msg.content === '!compulsions') {
        let compulsionsCard = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Compulsions')
            .addFields(
                {name: 'Roll 1-3', value: 'Hunger'},
                {name: 'Roll 4-5', value: 'Dominance'},
                {name: 'Roll 6-7', value: 'Harm'},
                {name: 'Roll 8-9', value: 'Paranoia'},
                {name: 'Roll 0', value: 'Clan Compulsion'}
            )
            .setFooter('Corebook, 208');
        msg.channel.send(compulsionsCard);
    } // END Command: !compulsions

    /* ============================================================== */
    // Command: !c
    /* ============================================================== */
    if (msg.content.includes('!c ')) {
        let message = msg.content.substring(3,5);
        if (message > 9) { return; }
        getCompulsions().then( compulsions => {
            compulsions.forEach( compulsion => {
                if (message === '0' && compulsion.name === 'Clan Compulsion') {
                    var clansList = [];
                    let clans = compulsion.clan;
                    clans.forEach( clan => { clansList.push(clan.name); })
                    clansList = clansList.sort();
                    let messageReply = "That is a Clan Compulsion! Type your clan like so: *!brujah*\n**Clans:** [ ";
                    clansList.forEach( clan => { messageReply += "!" + clan + " | "; })
                    messageReply = messageReply.substring(0,messageReply.length-3);
                    messageReply += " ]";
                    msg.reply(messageReply);
                    let collector = new Discord.MessageCollector(msg.channel, m => m.author === msg.author, 4)
                    collector.on('collect', (message, col) => {
                        let mClan = message.content.substring(1);
                        let clans = compulsion.clan;
                        clans.forEach( clan => {
                            if (clan.name.toLowerCase() === mClan.toLowerCase()) {
                                let clanCard = new Discord.MessageEmbed()
                                    .setColor('RED')
                                    .setTitle(clan.name + " Compulsion")
                                    .addFields(
                                        {name: clan.compulsion, value: clan.description}
                                    )
                                    .setFooter(clan.reference)
                                msg.channel.send(clanCard);
                                collector.stop();
                            }
                        })
                    })
                }
                else if (message > 0 && message < 10) {
                    let dice = compulsion.dice;
                    dice.forEach( die => {
                        if (message === die) {
                            let compulsionCard = new Discord.MessageEmbed()
                                .setColor('RED')
                                .setTitle(compulsion.name)
                                .setDescription(compulsion.description)
                                .setFooter(compulsion.reference);
                            msg.channel.send(compulsionCard);
                        }
                    })
                }
                else { return; }
            })
        })        
    } // END Command: !c

    /* ============================================================== */
    // Command: !social
    /* ============================================================== */
    if (msg.content === '!social') {
        let socialCard = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Social Modifiers')
            .setDescription('Apply the following modifiers to your successes for countering social rolls.')
            .addFields(
                {name: 'Loyal', value: '-1', inline: true},
                {name: 'Friendly', value: '+/- 0', inline: true},
                {name: 'Indifferent', value: '+1', inline: true},
                {name: 'Suspicious', value: '+2', inline: true},
                {name: 'Aggressive', value: '+3', inline: true},
                {name: 'Hostile', value: '+5', inline: true}
            )
            .setFooter('Corebook, 413');
        msg.channel.send(socialCard);
    } // END Command: !social

    /* ============================================================== */
    // Command: !bp
    /* ============================================================== */
    if (msg.content.includes('!bp')) {
        let level = msg.content.substring(4,6);
        getBloodPotency().then( bloodPotency => {
            bloodPotency.forEach( potency => {
                if (level === potency.level) {
                    let bloodPotencyCard = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setTitle('Blood Potency')
                        .addFields(
                            {name: 'Level', value: potency.level, inline: true},
                            {name: 'Surge', value: potency.surge, inline: true},
                            {name: 'Bonus', value: potency.bonus, inline: true},
                            {name: 'Severity', value: potency.severity, inline: true},
                            {name: 'Reroll', value: potency.reroll, inline: true},
                            {name: 'Mended', value: potency.mended, inline: true},
                            {name: 'Penalty', value: potency.penalty, inline: true}
                        )
                        .setFooter('Corebook, 216');
                    msg.channel.send(bloodPotencyCard);
                }
            })
        })
    } // END Command: !bp

    /* ============================================================== */
    // Command: !copyright
    /* ============================================================== */
    if (msg.content === '!copyright') {
        let copyright = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Copyright and Trademark Notice')
            .setDescription(privacy)
            .addField('Disclaimer', 'The Ghoul is intended as an easily-accessible digital reference for products you already own.')
            .setThumbnail(darkpack);
        msg.channel.send(copyright);
    } // END Command: !copyright
    
    /* ============================================================== */
    // Command: !ghoul
    /* ============================================================== */
    if (msg.content === '!ghoul') {
        let card = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('The Ghoul')
            .setURL('https://github.com/Ekrizdis367/ghoul-bot')
            .setDescription('Hello, Master - I provide useful commands meant to make things easier for the players. Below are a list of all possible commands:')
            .addFields(
                {name: '!d [discipline]', value: 'This command calls on a list of all powers under the provided discipline.\n*Ex: !d Obfuscate*'},
                {name: '!p [power]', value: 'This command provides relevant information on the power provided.\n*Ex: !p Shadow Cloak*'},
                {name: '!c [number]', value: 'This command provides information on the compulsion based on a provided dice roll.\n*Ex: !c 3*'},
                {name: '!bp [number]', value: 'This command provides information on the blood potency table.\n*Ex: !bp 3*'},
                {name: '!disciplines', value: 'This command provides a lost of the disciplines in alphabetical order.'},
                {name: '!compulsions', value: 'This command provides a list of the randomized compulsions and their die rolls.'},
                {name: '!social', value: 'This command provides a list of the social modifiers for countering social rolls.'},
                {name: '!copyright', value: 'This command provides the copyright and trademark notice of Dark Pack.'}
            )
            .setThumbnail(vtmSymbol)
            .setFooter('The Ghoul Discord Bot', darkpack);
        msg.channel.send(card);
    } // END Command: !ghoul

}); // END EVENT: Server Message
/* ============================================================== */
client.login(BotSettings.token);
/* ============================================================== */