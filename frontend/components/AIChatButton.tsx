"use client";

import { useState } from 'react';
import AIChatBot from './AIChatBot';

export default function AIChatButton() {
    const [chatBoxOpen, setChatBoxOpen] = useState(false);

    return (
        <>
        <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none" onClick={() => setChatBoxOpen(true)}>
            Chat with AI
        </button>
        <AIChatBot open={chatBoxOpen} onClose={() => setChatBoxOpen(false)} />
        </>
    )
}