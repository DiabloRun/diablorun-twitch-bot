import fetch from 'node-fetch';

export async function get(path: string) {
    const res = await fetch(process.env.API_URL + path, {
        method: 'GET'
    });

    return await res.json();
}

export async function post(path: string, body: any) {
    const res = await fetch(process.env.API_URL + path, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return await res.json();
}

export async function getActiveUsers(): Promise<{ user_name: string }[]> {
    return await get('/active-users');
}

export async function getActiveChannels(): Promise<string[]> {
    let usernames: string[];

    if (process.env.CHANNELS) {
        usernames = process.env.CHANNELS.split(',')
    } else {
        const res: { channels: string[] } = await get('/twitch-bot');
        usernames = res.channels;
    }

    return usernames.map(username => `#${username.toLowerCase()}`);
}
