import { tmiClient } from './tmi_client';
import { api } from './api';
import { commands } from './commands';
import * as dotenv from 'dotenv';

dotenv.config();

async function joinChannels() {
    const client = await tmiClient.getTmiClient();
    const currentChannels = client.getChannels();
    const activeChannels = await api.getActiveChannels();

    await Promise.all(activeChannels.map(async channel => {
        if (!currentChannels.includes(channel)) {
            await client.join(channel);
            console.log(`Joined ${channel}`);
        }
    }));
}

async function run() {
    // Stay in channels of users that have opted to use the bot
    await joinChannels();
    setInterval(() => joinChannels(), 30000);

    const client = await tmiClient.getTmiClient();

    client.on('message', async (channel, tags, message) => {
        if (message[0] !== '!') {
            return;
        }

        console.log(channel, tags.username, tags.mod, message);

        const lowercaseMessage = message.toLowerCase().substr(1);

        for (const command in commands) {
            if (lowercaseMessage.substr(0, command.length) === command) {
                // Commands can accept any of arguments which are separated in the message by spaces
                const args = message.substr(1 + command.length).trim().split(' ');
                await commands[command](client, channel, tags, ...args);
                break;
            }
        }
    });
}

run();
