import * as tmi from 'tmi.js'

export type Client = tmi.Client;
export type CommandFunction = (client: Client, channel: string, tags: tmi.ChatUserstate, ...args: string[]) => Promise<any>;
export type CommandFunction2 = (channel: string, tags: tmi.ChatUserstate, ...args: string[]) => Promise<any>;
export type Commands = { [command: string]: CommandFunction };

export interface Usernames {
    user_name: string;
}

// todo: import from /DiabloRun/diablorun-api-server/blob/master/src/collections/characters.ts, remove when we can import from a types in that project
export interface Character {
    id: number;
    name: string;
    hero: 'ama' | 'asn' | 'nec' | 'bar' | 'pal' | 'sor' | 'dru';
    hc: boolean;
    dead: boolean;
  
    level: number;
    experience: number;
    strength: number;
    dexterity: number;
    vitality: number;
    energy: number;
  
    fire_res: number;
    cold_res: number;
    light_res: number;
    poison_res: number;
  
    fcr: number;
    frw: number;
    fhr: number;
    ias: number;
    mf: number;
  
    gold: number;
    gold_stash: number;
    gold_total: number;
    inventory_tab: number;
  
    life: number;
    life_max: number;
    mana: number;
    mana_max: number;
  
    area: number;
    difficulty: 'normal' | 'nightmare' | 'hell';
    players: number;
  
    // computed stats
    start_time: number;
    update_time: number;
    in_game_time: number;
    seconds_played: number;
  
    deaths: number;
    town_visits: number;
  
    total_kills: number;
    undead_kills: number;
    demon_kills: number;
    unique_kills: number;
    champion_kills: number;
    animal_kills: number;
  
    finished_normal_quests: number;
    finished_nightmare_quests: number;
    finished_hell_quests: number;
  
    // race stats
    race_id: number;
    points: number;
    disqualified: boolean;
    preliminary: boolean;
    finish_time: number | null;
  
    // hireling stats
    hireling_name: string | null;
    hireling_class: number | null;
    hireling_level: number | null;
    hireling_experience: number | null;
    hireling_strength: number | null;
    hireling_dexterity: number | null;
    hireling_fire_res: number | null;
    hireling_cold_res: number | null;
    hireling_light_res: number | null;
    hireling_poison_res: number | null;
    hireling_skill_ids: string | null;
  
    // system
    lod: boolean;
    seed: number;
    seed_is_arg: boolean;
  
    // process
    d2_mod: string;
    d2_version: string;
    d2_args: string;
    
    // user info
    user_id: number;
    user_name: string;
    user_country_code: string;
    user_color: string;
    user_profile_image_url: string;
  }
  
  export interface CharacterQuest {
    character_id: number;
    difficulty: Character["difficulty"];
    quest_id: number;
    update_time: number;
  }
  
  export interface CharacterItem {
    character_id: number;
    item_id: number;
    item_hash: number;
    update_time: number;
    
    item_class: number;
    name: string;
    base_name: string;
    quality: 'white' | 'blue' | 'yellow' | 'orange' | 'gold' | 'green' | 'none';
    properties: string;
  
    container:  'character' | 'hireling'| 'inventory' | 'stash' | 'cube' | 'belt';
    slot: 'head' | 'amulet' | 'body_armor' | 'primary_left' | 'primary_right' | 'ring_left' | 'ring_right' | 'belt' | 'boots' | 'gloves' | 'secondary_left' | 'secondary_right' | null;
    x: number | null;
    y: number | null;
    width: number | null;
    height: number | null;
  }
  
  export interface CharacterSnapshot {
    character: Character;
    quests: CharacterQuest[];
    items: CharacterItem[];
  }