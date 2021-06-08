import { getLastUpdatedCharacter } from './api';
import { getRecipeCommands, getRunewordCommands } from './data_commands';
import { Commands } from './tmi_client';

const commands: Commands = {
    ...getRunewordCommands(),
    ...getRecipeCommands(),

    async gear(client, channel) {
        await client.say(channel, `diablo.run/${channel.substr(1)}/@`)
    },

    async character(client, channel) {
        const username = channel.substr(1);
        const { character } = await getLastUpdatedCharacter(username);
        
        await client.say(channel, `diablo.run/${username}/${character.name}${character.id}`);
    },

    async exp(client, channel, _tags, interval='hour') {
        await client.say(channel, `TODO: calculate exp within last ${interval}`);
    },

    async forge(client, channel) {
        await client.say(channel, 'Up to Amn in normal, Sol to Um in nightmare and Hel to Gul in hell.');
    }
};

export default commands;
