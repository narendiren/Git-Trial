import ScrollReveal from "./ScrollReveal";

const secondaryServices = [
  {
    name: "Smarter Ad Campaigns",
    description: "AI-generated ad creative and copy, tuned to your offer and audience.",
  },
  {
    name: "Workflow Automation",
    description: "Custom workflow automation built around how your business actually runs.",
  },
];

export default function Services() {
  return (
    <section id="services" className="px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="mb-12 text-sm font-medium tracking-[0.2em] text-accent uppercase">
            Services
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="border-t border-border pt-6">
            <h3 className="font-heading text-3xl font-semibold text-fg sm:text-5xl">
              Website Design
            </h3>
            <p className="mt-4 max-w-2xl text-lg text-fg-muted">
              Custom, conversion-focused websites built around your exact
              customer, not a template. This is the core of what I do.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-8">
          {secondaryServices.map((service, i) => (
            <ScrollReveal key={service.name} delay={i * 0.1}>
              <div className="border-t border-border pt-6">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-heading text-xl font-semibold text-fg sm:text-2xl">
                    {service.name}
                  </h3>
                  <span className="rounded-full border border-border px-2.5 py-1 text-[11px] font-medium tracking-wide text-fg-muted uppercase">
                    Coming Soon
                  </span>
                </div>
                <p className="mt-3 text-sm text-fg-muted">{service.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
