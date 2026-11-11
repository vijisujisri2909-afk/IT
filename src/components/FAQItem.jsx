import { useState } from 'react'

function FAQItem({ faq }) {
  const [isOpen, setIsOpen] = useState(false)
  const answerId = `faq-answer-${faq.question.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

  return (
    <article className="py-5 sm:py-6">
      <h3>
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="flex w-full items-center justify-between gap-5 text-left text-base font-semibold text-[#263a2d] sm:text-lg"
          aria-expanded={isOpen}
          aria-controls={answerId}
        >
          {faq.question}
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#dfe5df] text-lg font-normal text-[#416e50]" aria-hidden="true">
            {isOpen ? '−' : '+'}
          </span>
        </button>
      </h3>
      {isOpen && (
        <p id={answerId} className="mt-4 max-w-2xl pr-10 text-sm leading-6 text-[#68736d] sm:text-base sm:leading-7">
          {faq.answer}
        </p>
      )}
    </article>
  )
}

export default FAQItem
