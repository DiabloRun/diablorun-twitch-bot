import { getRecipeCommands, getRunewordCommands } from './data_commands';
import { Commands } from './tmi_client';

const commands: Commands = {
    ...getRunewordCommands(),
    ...getRecipeCommands(),

    async gear(client, channel) {
        await client.say(channel, `diablo.run/${channel.substr(1)}/@`)
    },

    async exp(client, channel, _username, interval) {
        await client.say(channel, `TODO: calculate exp within last ${interval}`);
    }
};

export default commands;
