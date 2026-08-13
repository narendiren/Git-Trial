import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section id="about" className="px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <p className="mb-10 text-sm font-medium tracking-[0.2em] text-accent uppercase">
            About
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <p className="font-heading text-2xl font-medium leading-snug text-fg sm:text-3xl">
            Anyone can spin up a website in a minute now. Most of it&rsquo;s
            a template wearing someone else&rsquo;s logo.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-8 text-fg-muted">
            Mine&rsquo;s built by hand, decision by decision, for your
            business specifically. One person, fully accountable, not a
            support queue, not a preset. That&rsquo;s the part a hundred
            thousand designers and a hundred AI builders can&rsquo;t give
            you.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
