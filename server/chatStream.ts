
import { convertToModelMessages } from 'ai';
import type { UIMessage } from 'ai';
import { type LoaderFunctionArgs, type ActionFunctionArgs } from 'react-router';
import { anthropic } from '@ai-sdk/anthropic';


import { Experimental_Agent as Agent } from "ai";
import dotenv from "dotenv";
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';


dotenv.config({ path: "../.env.local" });
const elevenlabs = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY! });







export async function action({ request, params }: LoaderFunctionArgs) {
    const body = await request.json();
    const { message } = body



    let voice_id = "LrxAgHS1pMPAqK7yOgRi"

    if (params.role === "guru") {
        voice_id = "1U02n4nD6AdIZ9CjF053"
    } else if (params.role === "grandma") {
        voice_id = "DlgwGnU3Co0xgNbFf5U2"
    } else if (params.role === "lifecoach") {
        voice_id = "DZNb8SfEmwrIT8Zlytxl"
    }


    const audioResponse = await elevenlabs.textToSpeech.convert(
        voice_id, // Voice ID
        {
            text: message,
            modelId: "eleven_turbo_v2_5",
            outputFormat: "mp3_44100_128",
        }
    );


    const audioBuffer = await new Response(audioResponse).arrayBuffer();
    const base64Audio = Buffer.from(audioBuffer).toString("base64");

    return new Response(JSON.stringify({ audio: base64Audio }), {
        headers: { "Content-Type": "application/json" },
    });








}


