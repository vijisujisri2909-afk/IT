import { useCallback, useEffect, useState } from 'react'
import Chatbot from './components/Chatbot.jsx'
import FAQItem from './components/FAQItem.jsx'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import ServiceCard from './components/ServiceCard.jsx'
import { generateFaqs, sendChatPrompt } from './lib/gemini.js'

const services = [
  {
    number: '01',
    icon: '⌘',
    title: 'Custom software',
    description:
      'Digital products and internal tools designed around the way your team actually works.',
    tags: ['Web apps', 'Product design'],
  },
  {
    number: '02',
    icon: '↗',
    title: 'Cloud & infrastructure',
    description:
      'Secure, scalable foundations that keep your systems dependable as your business grows.',
    tags: ['Cloud migration', 'DevOps'],
  },
  {
    number: '03',
    icon: '✳',
    title: 'Data & AI',
    description:
      'Turn disconnected data into useful insights and thoughtful AI-powered experiences.',
    tags: ['Analytics', 'AI integration'],
  },
]

const staticFaqs = [
  {
    question: 'What kind of companies do you work with?',
    answer:
      'We partner with growing businesses, established teams, and founders who need a reliable technology partner.',
  },
  {
    question: 'How does a project get started?',
    answer:
      'We begin with a conversation about your goals, users, and constraints, then share a clear scope and delivery plan.',
  },
  {
    question: 'Can you support a product after launch?',
    answer:
      'Yes. We can stay involved after launch to monitor, maintain, and improve your product as your needs evolve.',
  },
]

const navigation = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [faqContent, setFaqContent] = useState([])
  const [isFaqLoading, setIsFaqLoading] = useState(true)
  const [faqError, setFaqError] = useState('')

  useEffect(() => {
    let isCurrent = true

    async function loadFaqs() {
      try {
        const faqs = await generateFaqs()
        if (isCurrent) setFaqContent(faqs)
      } catch (error) {
        if (isCurrent) {
          setFaqError(error.message)
          setFaqContent(staticFaqs)
        }
      } finally {
        if (isCurrent) setIsFaqLoading(false)
      }
    }

    loadFaqs()
    return () => {
      isCurrent = false
    }
  }, [])

  const handleChatMessage = useCallback(async (prompt, history) => {
    return sendChatPrompt(prompt, history)
  }, [])

  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f8f6] text-[#18201d]">
      <Navbar links={navigation} />

      <main>
        <section
          id="hero"
          className="relative scroll-mt-24 px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24 lg:px-12 lg:pt-28"
        >
          <div className="pointer-events-none absolute -right-36 -top-32 h-[28rem] w-[28rem] rounded-full bg-[#dcece3] opacity-70 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#d8e2dc] bg-white/80 px-4 py-2 text-xs font-semibold tracking-wide text-[#416653] shadow-sm sm:text-sm">
                <span className="h-2 w-2 rounded-full bg-[#4e9a6d]" />
                YOUR PARTNER IN WHAT&apos;S NEXT
              </p>
              <h1 className="max-w-3xl text-5xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                Technology that moves your business <span className="text-[#4d8664]">forward.</span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-[#68736d] sm:text-lg sm:leading-8">
                We turn big ideas into dependable digital experiences, with a
                team that makes the complex feel simple.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-[#1d3025] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#31523d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4d8664]"
                >
                  Let&apos;s talk <span aria-hidden="true">↗</span>
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center rounded-full border border-[#d7dfd9] bg-white px-6 py-3.5 text-sm font-semibold text-[#26342b] transition hover:border-[#9db3a3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4d8664]"
                >
                  Explore what we do
                </a>
              </div>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[#e1e6e2] pt-6 text-sm text-[#68736d]">
                <span><strong className="text-[#1d3025]">Thoughtful</strong> by design</span>
                <span><strong className="text-[#1d3025]">Built</strong> to scale</span>
                <span><strong className="text-[#1d3025]">People-first</strong> always</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
              <div className="absolute -left-7 top-12 h-24 w-24 rounded-full border border-[#adc9b5] sm:-left-10 sm:h-32 sm:w-32" />
              <div className="relative rounded-[2rem] border border-white bg-[#e8eee8] p-3 shadow-[0_35px_80px_-40px_rgba(27,51,36,0.42)] sm:p-5">
                <div className="overflow-hidden rounded-[1.5rem] bg-[#20352a] p-6 text-white sm:p-9">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#b8cdbd]">A clearer path</p>
                      <p className="mt-2 text-2xl font-medium tracking-tight sm:text-3xl">From idea to impact.</p>
                    </div>
                    <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-[#d3e2d7]">01 — 03</span>
                  </div>
                  <div className="mt-9 space-y-3">
                    {[
                      ['Discover', 'Find the right problem to solve', '100%'],
                      ['Design', 'Make the best idea feel simple', '72%'],
                      ['Deliver', 'Build, launch, and keep improving', '48%'],
                    ].map(([title, detail, width], index) => (
                      <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#c4ddcb] text-sm font-semibold text-[#20352a]">
                            0{index + 1}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-medium">{title}</p>
                              <span className="text-xs text-[#c4d4c9]">{width}</span>
                            </div>
                            <p className="mt-1 text-xs text-[#bdcbbf] sm:text-sm">{detail}</p>
                          </div>
                        </div>
                        <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full rounded-full bg-[#9fcca9]" style={{ width }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between px-3 pb-1 pt-4 text-xs text-[#68736d] sm:px-4">
                  <span>Good work starts with good questions.</span>
                  <span aria-hidden="true">✳</span>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-3 rounded-2xl border border-[#e4e9e4] bg-white px-4 py-3 shadow-lg sm:-right-8 sm:px-5">
                <p className="text-xs text-[#68736d]">A partner, not just a provider</p>
                <p className="mt-1 text-sm font-semibold text-[#263a2d]">Better, together <span className="text-[#4d8664]">↗</span></p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#e6eae6] bg-white px-5 py-8 sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-[#68736d]">A considered approach across every step.</p>
            <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold tracking-tight text-[#3d4d43] sm:gap-x-10">
              <span>STRATEGY</span><span>DESIGN</span><span>ENGINEERING</span><span>PARTNERSHIP</span>
            </div>
          </div>
        </section>

        <section id="services" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#578264]">What we do</p>
                <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">The right expertise for your next move.</h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-[#68736d] sm:text-base">
                From first sketch to long-term support, we bring the people and
                perspective to make progress real.
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {services.map((service) => <ServiceCard key={service.number} service={service} />)}
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-24 bg-[#e8eee8] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-24">
            <div className="relative min-h-72 overflow-hidden rounded-[2rem] bg-[#21362b] p-7 sm:min-h-96 sm:p-10">
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/20" />
              <div className="absolute -right-5 -top-5 h-44 w-44 rounded-full border border-white/20" />
              <div className="absolute bottom-8 left-7 right-7 sm:bottom-10 sm:left-10 sm:right-10">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#b8cdbd]">Our point of view</p>
                <p className="mt-4 max-w-sm text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl">
                  The best technology feels like a natural next step.
                </p>
                <span className="mt-6 inline-block text-4xl text-[#9fcca9]" aria-hidden="true">✳</span>
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#578264]">About us</p>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">Good technology starts with listening.</h2>
              <p className="mt-6 text-base leading-7 text-[#59675e]">
                We are a close-knit team of strategists, designers, and
                engineers who care about the details and the difference they
                make. We work alongside your people to turn real challenges
                into tools that are useful, resilient, and ready for what comes next.
              </p>
              <div className="mt-9 grid grid-cols-2 gap-6 border-t border-[#ccd8ce] pt-7">
                <div>
                  <p className="text-2xl font-semibold tracking-tight text-[#263a2d]">One team</p>
                  <p className="mt-1 text-sm text-[#68736d]">Working with you, not around you</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold tracking-tight text-[#263a2d]">Clear steps</p>
                  <p className="mt-1 text-sm text-[#68736d]">Honest plans, thoughtful delivery</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#578264]">Good to know</p>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">A few things you might be wondering.</h2>
              <p className="mt-5 text-sm leading-6 text-[#68736d] sm:text-base">
                Have another question? We&apos;re always happy to talk it through.
              </p>
              <a href="#contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#416e50] hover:text-[#20352a]">
                Ask us directly <span aria-hidden="true">↗</span>
              </a>
              {faqError && (
                <p className="mt-5 rounded-xl border border-[#eadfcb] bg-[#fffaf0] p-3 text-xs leading-5 text-[#735b32]" role="status">
                  Showing our sample FAQs. {faqError}
                </p>
              )}
            </div>
            <div className="divide-y divide-[#e2e7e2] border-y border-[#e2e7e2]">
              {isFaqLoading ? (
                <p className="py-8 text-sm text-[#68736d]" role="status">Putting together a few helpful answers…</p>
              ) : (
                faqContent.map((faq, index) => (
                  <FAQItem key={`${faq.question}-${index}`} faq={faq} />
                ))
              )}
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#20352a] px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-16">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#b8cdbd]">Start a conversation</p>
                <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">Have a good idea? Let&apos;s make it happen.</h2>
                <p className="mt-5 max-w-xl text-sm leading-6 text-[#d0dcd2] sm:text-base">
                  Tell us what you&apos;re working on. We&apos;ll help you find a practical next step.
                </p>
              </div>
              <a
                href="mailto:hello@yourcompany.com"
                className="inline-flex items-center justify-center gap-3 self-start rounded-full bg-[#d8eadc] px-6 py-3.5 text-sm font-semibold text-[#20352a] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:self-auto"
              >
                hello@yourcompany.com <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer links={navigation} />

      {isChatbotOpen && (
        <Chatbot
          onClose={() => setIsChatbotOpen(false)}
          onSendMessage={handleChatMessage}
        />
      )}
      <button
        type="button"
        onClick={() => setIsChatbotOpen((open) => !open)}
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#20352a] px-5 py-3.5 text-sm font-semibold text-white shadow-xl transition hover:bg-[#31523d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4d8664] sm:bottom-8 sm:right-8"
        aria-label={isChatbotOpen ? 'Close assistant' : 'Open AI assistant'}
        aria-expanded={isChatbotOpen}
      >
        <span aria-hidden="true">{isChatbotOpen ? '×' : '✳'}</span>
        <span>{isChatbotOpen ? 'Close' : 'Ask us'}</span>
      </button>
    </div>
  )
}

export default App
