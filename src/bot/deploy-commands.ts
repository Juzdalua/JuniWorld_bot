import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import * as fs from "fs";

export default async function CommandBot(){
    const commands = [];
    const commandsPath = `${__dirname}/commands`;    
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); 
        
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`)
        commands.push(command.data.toJSON())
    }

    const rest = new REST({ version:'9' }).setToken(process.env.DISCORD_BOT_TOKEN);
            
    (async () => {
        try {
            // await rest.put(Routes.applicationCommands(process.env.DISCORD_ID), {body: commands})
            await rest.put(Routes.applicationGuildCommands(process.env.DISCORD_ID, process.env.DISCORD_GUILD_ID), {body: commands})
            console.log('Successfully registered application commands.');            
        } catch (error) {
            console.log(error)
        }
    })();
};
