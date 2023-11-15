'use client'

import { useChat, useCompletion } from 'ai/react';
import { Bot, User, XCircle } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Input } from '@/primitives/Input'
import { Button } from '@nextui-org/react';

interface AIHintProps {
    open: boolean;
    onClose: () => void;
}

export default function AIHint({open, onClose}: AIHintProps) {
     const {
        completion,
        input,
        stop,
        isLoading,
        handleInputChange,
        handleSubmit,
    } = useCompletion({
        api: '/api/hint',
    });

    return (
    <div className={twMerge(clsx("bottom-0 left-0 z-0 w-full max-w-[500px] p-1 xl:right-36", open ? "fixed" : "hidden",))}>
        <button onClick={onClose} className="mb-1 ms-auto block">
            <XCircle size={30} color="black" />
        </button>
        <div className="flex flex-col rounded bg-background border shadow-xl">
            <form onSubmit={handleSubmit} className='m-3 flex gap-1'>
                <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder='Get a hint for...'
                    style={{color: 'black'}}
                /> 
        <Button type="button" onClick={stop}>
          Stop
        </Button>
        <Button disabled={isLoading} type="submit">
          Send
        </Button>
            </form> 
            <div className="mt-5 px-5 overflow-y-auto" style={{ color: 'black' }}>
                <output className = "mb-4 flex items-center whitespace-pre-wrap rounded-md border px-3 py-2 bg-green-100" style={{ color: 'black'}}>Hint: {completion}</output>
            </div>
        </div>
    </div>);
}