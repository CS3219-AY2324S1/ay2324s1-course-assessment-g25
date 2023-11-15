"use client";

import { useState } from 'react';
import AIHint from './AIHint';

export default function AIChatButton() {
    const [chatBoxOpen, setChatBoxOpen] = useState(false);

    return (
        <>
        <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-green-600 focus:outline-none" onClick={() => setChatBoxOpen(true)}>
            Get a hint
        </button>
        <AIHint open={chatBoxOpen} onClose={() => setChatBoxOpen(false)} />
        </>
    )
}