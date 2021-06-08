import fetch from 'node-fetch';
import { CharacterSnapshot, Usernames } from './types';

/**
 * The class that sends requests to the diablo.run api
 */
class ApiService {
    /**
     * Gets all active users using the Diablo.run desktop app
     * @returns Array of active usernames
     */
    public getActiveUsers = async(): Promise<Array<Usernames>> => {
        return await this.get('/active-users');
    }
    
    /**
     * Retrieves the channels that the bot should join based on a Diablo.run api
     * @returns Array of channels to join from Diablo.run
     */
    public getActiveChannels = async(): Promise<string[]> => {
        let channels: string[];
    
        if (process.env.CHANNELS) {
            channels = process.env.CHANNELS.split(',')
        } else {
            const res: { channels: string[] } = await this.get('/twitch-bot');
            channels = res.channels;
        }
    
        return channels.map(channel => `#${channel.toLowerCase()}`);
    }

    /**
     * Queries Diablo.run user api to fetch latest available data for a given user
     * @param username - user to query the api for data
     * @returns A full diablo run user object
     */
    public getLastUpdatedCharacter = async(username: string): Promise<CharacterSnapshot> => {
        return await this.get(`/users/${username}`);
    }

    /**
     * Generic GET method consumed by the actions
     * @param slug api slug to append to the url
     * @returns a promise of the response object
     */
    private get = async (slug: string): Promise<any> => {
        console.log('get', `${process.env.API_URL}${slug}`);
        const res = await fetch(`${process.env.API_URL}${slug}`, {
            method: 'GET'
        });
    
        return await res.json();
    }

    /**
     * Generic POST method consumed by the actions
     * @param slug api slug to append to the url
     * @param body request body
     * @returns  a promise of the response object
     */
    private post = async(slug: string, body: any): Promise<any> => {
        const res = await fetch(`${process.env.API_URL}${slug}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        return await res.json();
    }
}

export const api = new ApiService();
