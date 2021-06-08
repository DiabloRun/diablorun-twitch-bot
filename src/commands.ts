import { api } from './api';
import { dataCommands } from './data_commands';
import { Commands } from './types';

/**
 * Aggregates all bot commands here
 */
export const commands: Commands = {
    ...dataCommands.getRunewordCommands(),
    ...dataCommands.getRecipeCommands(),

    /**
     * Returns the url for the user Diablo.run current live run
     * @param client TMI Client
     * @param channel #channel
     */
    async gear(client, channel) {
        await client.say(channel, `diablo.run/${channel.substr(1)}/@`)
    },

    /**
     * Returns the url for the user character in Diablo.run
     * @param client TMI Client
     * @param channel #channel
     */
    async character(client, channel) {
        const username = channel.substr(1);
        const { character } = await api.getLastUpdatedCharacter(username);
        
        await client.say(channel, `diablo.run/${username}/${character.name}${character.id}`);
    },

    /**
     * Calculates the average XP the user is making
     * @param client TMI Client
     * @param channel #channel
     * @param interval the interval you want to get the XP of the user values {@link TIME_INTERVALS}.
     */
    async exp(client, channel, _tags, interval='hour') {
        await client.say(channel, `TODO: calculate exp within last ${interval}`);
    },

    /**
     * Returns the runes a player gets for each difficulty
     * @param client TMI Client
     * @param channel #channel
     */
    async forge(client, channel) {
        await client.say(channel, 'Up to Amn in normal, Sol to Um in nightmare and Hel to Gul in hell.');
    }
};
