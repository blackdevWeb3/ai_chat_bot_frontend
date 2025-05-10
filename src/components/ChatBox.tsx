'use client';

import { useState } from 'react';
import axios from 'axios';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatBox() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newUserMessage: Message = { role: 'user', content: input };
        setMessages([...messages, newUserMessage]);
        setInput('');

        try {
            const res = await axios.post('http://localhost:8000/api/chat/', {
                message: input,
            });

            const reply = res.data.reply;
            setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
        } catch (err) {
            console.error('Chat error:', err);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="h-96 overflow-y-auto bg-white border border-[#000000] shadow rounded p-4 mb-4 text-[#000000]">
                {messages.map((msg, i) => (
                    <div key={i} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                        <span className={`inline-block px-3 py-2 rounded ${msg.role === 'user' ? 'bg-blue-200' : 'bg-gray-200'}`}>
                            {msg.content}
                        </span>
                    </div>
                ))}
            </div>
            <div className="flex">
                <input
                    className="flex-grow border border-gray-300 rounded px-4 py-2 text-[#000000]"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button
                    onClick={sendMessage}
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
