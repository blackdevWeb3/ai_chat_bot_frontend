// components/ChatBox.tsx
'use client'

import { useState } from 'react'
import axios from 'axios'

type Message = {
    role: 'user' | 'assistant'
    content: string
}

export default function ChatBox() {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)

    const sendMessage = async () => {
        if (!input.trim()) return

        const newMessage: Message = { role: 'user', content: input }
        setMessages((prev) => [...prev, newMessage])
        setInput('')
        setLoading(true)

        try {
            const res = await axios.post('http://localhost:8000/api/chat/', {
                message: input,
            })

            const reply = res.data.reply
            setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
        } catch (err) {
            setMessages((prev) => [...prev, { role: 'assistant', content: 'Error: Unable to get a reply.' }])
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="bg-white rounded shadow p-4 h-96 overflow-y-auto text-[#000000]">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`mb-3 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                        <div
                            className={`inline-block px-4 py-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-200' : 'bg-gray-200'
                                }`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="text-left">
                        <div className="inline-block px-4 py-2 bg-gray-200 rounded-lg animate-pulse">
                            Bot is typing...
                        </div>
                    </div>
                )}
            </div>

            <div className="flex mt-4">
                <input
                    type="text"
                    className="flex-grow border border-gray-300 px-4 py-2 rounded text-[#000000]"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Ask me to tell a funny story..."
                />
                <button
                    onClick={sendMessage}
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Send
                </button>
            </div>
        </div>
    )
}
