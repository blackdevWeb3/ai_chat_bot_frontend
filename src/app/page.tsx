import ChatBox from '../components/ChatBox';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <h1 className="text-center text-3xl font-bold text-[#000000] pt-10">AI Chatbot</h1>
      <ChatBox />
    </main>
  );
}
