import ScrollReveal from "./ScrollReveal";

const capabilities = [
  "Lead Generation Sites",
  "Online Booking & Scheduling",
  "E-Commerce Stores",
  "Service Business Websites",
  "Portfolio & Personal Brand Sites",
  "Product Launch Pages",
  "Show Up on Google Search",
  "Reviews & Testimonials Display",
  "Smarter Ad Campaigns",
  "Workflow Automation",
];

const differentiators = [
  "Built by one person who actually looked at your business, not a pattern that happened to fit your industry, and not a prompt that guessed at it.",
  "Built to grow with your business, not something that breaks the moment you need to add something new.",
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="mb-12 text-sm font-medium tracking-[0.2em] text-accent uppercase">
            What I bring
          </p>
        </ScrollReveal>

        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-3 sm:gap-x-7">
          {capabilities.map((label, i) => (
            <ScrollReveal key={label} delay={i * 0.03}>
              <span className="font-heading text-2xl font-medium tracking-tight text-fg transition-colors hover:text-accent sm:text-3xl md:text-4xl">
                {label}
              </span>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.1}>
          <div className="mt-16 grid gap-8 border-t border-border pt-10 sm:grid-cols-2">
            {differentiators.map((point) => (
              <div key={point} className="flex gap-4">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <p className="text-base text-fg-muted sm:text-lg">{point}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
