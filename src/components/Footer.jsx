const currentYear = new Date().getFullYear()

function Footer({ links }) {
  return (
    <footer className="border-t border-[#e2e7e2] px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <a href="#hero" className="text-sm font-semibold tracking-tight text-[#20352a]">Northstar<span className="text-[#5b8968]">.</span></a>
        <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-xs text-[#68736d] transition hover:text-[#20352a]">
              {link.label}
            </a>
          ))}
        </nav>
        <p className="text-xs text-[#89928c]">© {currentYear} Northstar. Made for what&apos;s next.</p>
      </div>
    </footer>
  )
}

export default Footer
