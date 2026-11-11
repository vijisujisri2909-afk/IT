import { useState } from 'react'

function Chatbot({ onClose, onSendMessage }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Hi there! I can help with questions about our services, process, or getting started.',
    },
  ])
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const prompt = input.trim()
    if (!prompt || isSending) return

    const conversation = messages
      .filter((message) => message.role !== 'error')
      .map(({ role, text }) => ({ role, text }))
    setMessages((current) => [...current, { role: 'user', text: prompt }])
    setInput('')
    setIsSending(true)
    setError('')

    try {
      const reply = await onSendMessage(prompt, conversation)
      setMessages((current) => [...current, { role: 'assistant', text: reply }])
    } catch (sendError) {
      setError(sendError.message)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section
      aria-label="AI assistant"
      className="fixed bottom-24 right-4 z-40 flex h-[min(34rem,calc(100dvh-8rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-[#dfe5df] bg-white shadow-[0_24px_70px_-20px_rgba(25,45,32,0.4)] sm:bottom-28 sm:right-8"
    >
      <div className="flex items-center justify-between bg-[#20352a] px-5 py-4 text-white">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d8eadc] text-[#20352a]" aria-hidden="true">✳</span>
          <div>
            <h2 className="text-sm font-semibold">Northstar assistant</h2>
            <p className="mt-0.5 text-xs text-[#c4d4c9]">Here to help</p>
          </div>
        </div>
        <button type="button" onClick={onClose} className="rounded-full px-2 py-1 text-xl leading-none text-[#d8eadc] hover:bg-white/10" aria-label="Close chat">×</button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto bg-[#f7f8f6] p-4" aria-live="polite">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${
              message.role === 'user'
                ? 'ml-auto rounded-br-md bg-[#20352a] text-white'
                : 'mr-auto rounded-bl-md border border-[#e3e8e3] bg-white text-[#35453a]'
            }`}
          >
            {message.text}
          </div>
        ))}
        {isSending && (
          <p className="mr-auto rounded-2xl rounded-bl-md border border-[#e3e8e3] bg-white px-4 py-3 text-sm text-[#68736d]" role="status">
            Thinking…
          </p>
        )}
        {error && (
          <p className="rounded-xl border border-[#eadfcb] bg-[#fffaf0] p-3 text-xs leading-5 text-[#735b32]" role="alert">
            {error}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 border-t border-[#e6eae6] bg-white p-3">
        <label className="sr-only" htmlFor="chat-message">Your message</label>
        <input
          id="chat-message"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask us anything…"
          className="min-w-0 flex-1 rounded-full border border-[#dfe5df] px-4 py-3 text-sm text-[#263a2d] outline-none placeholder:text-[#929b94] focus:border-[#7da488]"
          disabled={isSending}
        />
        <button
          type="submit"
          disabled={isSending || !input.trim()}
          className="rounded-full bg-[#20352a] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#31523d] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </section>
  )
}

export default Chatbot
