import { useState } from 'react'

function Navbar({ links }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-[#e5e9e5] bg-[#f7f8f6]/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12" aria-label="Main navigation">
        <a href="#hero" className="inline-flex items-center gap-2.5 rounded-lg text-[#20352a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4d8664]">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#20352a] text-lg text-[#d8eadc]" aria-hidden="true">✳</span>
          <span className="text-base font-semibold tracking-tight sm:text-lg">Northstar<span className="text-[#5b8968]">.</span></span>
        </a>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#dfe5df] bg-white text-lg text-[#263a2d] md:hidden"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? '×' : '☰'}
        </button>

        <div className={`${isMenuOpen ? 'flex' : 'hidden'} absolute left-0 right-0 top-full flex-col gap-1 border-b border-[#e5e9e5] bg-[#f7f8f6] px-5 py-4 md:static md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0`}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-[#59675e] transition hover:bg-[#e8eee8] hover:text-[#20352a] md:px-0 md:py-1 md:hover:bg-transparent"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsMenuOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#20352a] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#31523d] md:mt-0"
          >
            Start a project <span aria-hidden="true">↗</span>
          </a>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
