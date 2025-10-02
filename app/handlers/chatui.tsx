import { useEffect, useRef, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { useLoaderData, useParams, Link } from 'react-router';
import { DefaultChatTransport } from "ai";
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Chat() {
    const [input, setInput] = useState('');
    const role = useLoaderData() as { role: string }
    const params = useParams()

    const { messages, sendMessage, status } = useChat({
        transport: new DefaultChatTransport({
            api: `/chat/${params.role}`,
        }),
    });



    return (
        <div className="fixed flex  flex-col items-center bg-black h-full">
            <div className="flex items-center w-screen border-b-2 h-20">
                <div className="flex flex-row items-center">
                    <div className="relative font-gossip font-size: text-4xl text-center text-white p-5">lovebot
                        <img src="/images/lips.svg" className="absolute w-10 h-10 bottom-2 -right-5 rotate-25"></img>
                    </div>
                    <div className="relative font-gossip  text-center text-white p-5">insights</div>
                    <Link to="/welcome" className="relative font-gossip  text-center text-white p-5">home</Link>



                </div>




            </div>
            <div className="w-120 h-250 transform scale-80  -translate-y-30 border-1 m-10">
                <div className="flex flex-row items-center w-120 h-20 border-1">
                    <div className="text-white">Joey</div>


                </div>
                <ScrollArea className="h-200 w-120 ">
                    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
                        {messages.map(message => (
                            <div key={message.id} className="whitespace-pre-wrap text-white ">
                                {message.role === 'user' ? 'You: ' : `${params.role}: `}
                                <div className="bg-pink-400 p-5  border rounded-md text-black">
                                    {message.parts.map((part, i) => {
                                        switch (part.type) {
                                            case 'text':
                                                return <div key={`${message.id}-${i}`}>{part.text}</div>;
                                        }
                                    })}
                                </div>

                            </div>
                        ))}

                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                sendMessage({ text: input });
                                setInput('');
                            }}
                        >
                            <input
                                className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-14 border border-zinc-300 dark:border-zinc-800 rounded shadow-xlb text-white"
                                value={input}
                                placeholder="Whats on your mind?"
                                onChange={e => setInput(e.currentTarget.value)}
                            />
                        </form>
                    </div>

                </ScrollArea>
            </div>
        </div>




    );
}