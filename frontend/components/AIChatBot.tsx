'use client'

import { useChat, useCompletion } from 'ai/react';
import { Bot, User, XCircle } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Input } from '@/primitives/Input'
import { Button } from '@nextui-org/react';

interface AIChatBotProps {
    open: boolean;
    onClose: () => void;
}

export default function AIChatBot({open, onClose}: AIChatBotProps) {
    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        setMessages,
        isLoading,
        error
    } = useChat();

    const userMessageClasses = 'bg-blue-100'; 
    const aiMessageClasses = 'bg-green-100'; 

    return (
    <div className={twMerge(clsx("bottom-0 left-0 z-0 w-full max-w-[500px] p-1 xl:right-36", open ? "fixed" : "hidden",))}>
        <button onClick={onClose} className="mb-1 ms-auto block">
            <XCircle size={30} color="black" />
        </button>
        <div className="flex h-[600px] flex-col rounded bg-background border shadow-xl">
            <div className="h-full mt-5 px-5 overflow-y-auto" style={{ color: 'black' }}>
                {messages.map((m) => (
                    <div className={`mb-4 flex items-center ${
                        m.role === 'user' ? 'me-5 justify-end' : 'me-5 justify-start'
                    }`} key={m.id}
                    >
                    {m.role != 'user' && <Bot className='mr-2 shrink-0'/>}
                    <p
                    className={twMerge(
                        clsx('whitespace-pre-line rounded-md border px-3 py-2'),
                        m.role === 'user' ? userMessageClasses : aiMessageClasses
                        )}
                    >
                    {m.content}
                    </p>
                    {m.role == 'user' && <User className='mr-2 shrink-0'/>}
                    </div>
                ))} 
            </div>
            <form onSubmit={handleSubmit} className='m-3 flex gap-1'>
                <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder='Say something...'
                    style={{color: 'black'}}
                /> 
                <Button type="submit">Send</Button>
            </form> 
        </div>
    </div>);
}