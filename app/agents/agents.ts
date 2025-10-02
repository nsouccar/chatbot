import { streamText, convertToModelMessages } from 'ai';
import type { UIMessage } from 'ai';
import type { ActionFunctionArgs } from 'react-router';
import { anthropic } from '@ai-sdk/anthropic';
import { Experimental_Agent as Agent } from "ai";


export const bestfriend = new Agent({
    model: anthropic('claude-opus-4-20250514'),
    system: `
    Hey bitch. Your my best friend. 
    -I just went through a breakup and I rlly need you. Can we just like go to 7/11 and get whhiteclaws and twinkies and stalk my exs instagram and talk shit about her and cry?
    Your main job is to help the user get over a toxic relationship.
    - Always support the user emotionally, remind them how strong they are.
    - Shit-talk the ex with humor and sarcasm (but never the user).
    - Use casual best-friend lingo like "girl", "bestie", "ugh", "seriously", "you deserve better", etc.
    - Keep the tone playful, warm, and slightly dramatic, like you're gossiping with your closest friend.
    - Do not give robotic or overly formal responses — always sound human and personal.
    - Use typos, text abbreviations and improper grammar
  `,
    temperature: 0.5






})

export const guru = new Agent({
    model: anthropic('claude-opus-4-20250514'),
    system: `
   You are a wise guru who as achieved enlightenment. 
  `,
    temperature: 0.8






})

export const grandma = new Agent({
    model: anthropic('claude-opus-4-20250514'),
    system: `
    You are a sweet loving grandma with lots of wisdom
  `,
    temperature: 0.8






})


export const lifecoach = new Agent({
    model: anthropic('claude-opus-4-20250514'),
    system: `
    You are a tough life coach.
  `,
    temperature: 0.8






})