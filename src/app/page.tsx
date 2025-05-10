// app/page.tsx
import ChatBox from '../components/ChatBox'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center py-6 text-[#000000]">🤖 Funny Story Bot</h1>
      <ChatBox />
    </main>
  )
}
