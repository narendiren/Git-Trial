import ScrollReveal from "./ScrollReveal";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-28 sm:px-10 sm:py-40">
      <div className="mx-auto max-w-xl">
        <ScrollReveal>
          <h2 className="text-center font-heading text-3xl font-semibold leading-tight tracking-tight text-fg sm:text-5xl">
            What if the next project
            <br /> was yours?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-12">
            <ContactForm />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
