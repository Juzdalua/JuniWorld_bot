import { Client, Intents, Collection, Interaction } from "discord.js";
import CommandBot from "./deploy-commands";
import { thunder } from "./embed/thunder";
import { tengen } from "./embed/tengen";
import { lier } from "./embed/lier";
import { kko } from "./embed/kko";

export default async function Bot() {    
    // const client = new Client({intents: [Intents.FLAGS.GUILDS]});
    const client = new Client({intents: ['GUILDS', 'GUILD_MESSAGES']});
    
    CommandBot();
    // client.commands = new Collection();
    
    client.once('ready', () => {
      console.log(`🚀 Bot is Ready ~!`);
    });
        
    client.on("interactionCreate", async (interaction) => {
        if(!interaction.isCommand())
            return ;

        const { commandName } = interaction;
        
        if(commandName === 'ping'){
            await interaction.reply('pong')  
        } 
        
    });

    const prefix = "!";
    client.on("messageCreate", msg => {        
        if(!msg.content.startsWith(prefix) || msg.author.bot)
            return ;

        const args = msg.content.slice(prefix.length);
        
        if(args === "ping")
            msg.reply("pong");
        else if(args === "벽력일섬"){
            msg.channel.send({embeds: [thunder]})
        } else if(args === "김준"){
            msg.channel.send({embeds: [tengen]})
        } else if(args === "이민일"){
            msg.channel.send({embeds: [kko]})
        } else if(args === "이웅건"){
            msg.channel.send({embeds: [lier]})
        }


    });

   
    client.login(process.env.DISCORD_BOT_TOKEN);
};