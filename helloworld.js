const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();
const commandPrefix ="?";

client.on('ready', () =>{
    console.log("ready to bot");
    client.api.applications(client.user.id).guilds(process.env.SERVER_ID).commands.post({
        data: {
            name: "hello",
            description: "Replies with Hello World!"
        }
    });

    client.ws.on('INTERACTION_CREATE', async interaction => {
        const command = interaction.data.name.toLowerCase();


        if(command == 'hello') {
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "Hello World!"
                    }
                }
            });
        }
        });
 });



client.login(process.env.BOT_TOKEN);



client.on('message', (msg) => {

    if(!msg.content.startsWith(commandPrefix)) {return;
    }else{
    let command = (msg.content.replace(commandPrefix, "")).toLowerCase();
    let response ="";
    switch (command) {
        case 'hello':
          response ='Hello World!';
          break;
        case 'hello world':
          response= 'hello world';
          break;
       default:
       response= 'try again, with a different command: ?hello or ?hello world';

      }
        msg.reply(response);}


});
