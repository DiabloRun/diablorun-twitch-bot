import { Commands, getTmiClient } from './tmi_client';
import { getActiveChannels } from './api';
import dotenv from 'dotenv';
import { getRecipeCommands, getRunewordCommands } from './data_commands';

dotenv.config();

async function joinChannels() {
    const client = await getTmiClient();
    const currentChannels = client.getChannels();
    const activeChannels = await getActiveChannels();

    await Promise.all(activeChannels.map(async channel => {
        if (!currentChannels.includes(channel)) {
            await client.join(channel);
            console.log(`Joined ${channel}`);
        }
    }));
}

async function runTwitchBot() {
    // Stay in channels of users that have opted to use the bot
    await joinChannels();
    setInterval(() => joinChannels(), 30000);

    //
    const commands: Commands = {
        'gear': async (client, channel) => await client.say(channel, `diablo.run/${channel.substr(1)}/@`),
        ...getRunewordCommands(),
        ...getRecipeCommands()
    };

    // 
    const client = await getTmiClient();

    client.on('message', async (channel, { username }, message) => {
        if (message[0] !== '!') {
            return;
        }

        console.log(channel, username, message);

        const lowercaseMessage = message.toLowerCase().substr(1);

        for (const command in commands) {
            if (lowercaseMessage.substr(0, command.length) === command) {
                // Commands can accept any of arguments which are separated in the message by spaces
                const args = message.substr(1 + command.length).trim().split(' ');
                await commands[command](client, channel, username, ...args);
                break;
            }
        }
    });
}

runTwitchBot();
