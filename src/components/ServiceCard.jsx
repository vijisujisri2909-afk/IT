function ServiceCard({ service }) {
  return (
    <article className="group rounded-[1.5rem] border border-[#e3e8e3] bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-[#c5d5c8] hover:shadow-[0_18px_40px_-28px_rgba(27,51,36,0.35)] sm:p-8">
      <div className="flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8eee8] text-2xl text-[#416e50] transition group-hover:bg-[#d8eadc]" aria-hidden="true">
          {service.icon}
        </span>
        <span className="text-xs font-medium tracking-widest text-[#9aa49c]">{service.number}</span>
      </div>
      <h3 className="mt-8 text-xl font-semibold tracking-tight text-[#263a2d]">{service.title}</h3>
      <p className="mt-3 min-h-12 text-sm leading-6 text-[#68736d]">{service.description}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-[#f1f4f1] px-3 py-1.5 text-xs font-medium text-[#59675e]">{tag}</span>
        ))}
      </div>
    </article>
  )
}

export default ServiceCard
