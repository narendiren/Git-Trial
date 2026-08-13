const CONTACT_EMAIL = "hello@plug.studio"; // [PLACEHOLDER] confirm this inbox exists before launch

const socials = [
  { label: "X / Twitter", href: "#" }, // [PLACEHOLDER] add real profile URL
  { label: "LinkedIn", href: "#" }, // [PLACEHOLDER] add real profile URL
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-heading text-base font-semibold text-fg">
          Plug.Studio
        </span>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-fg-muted">
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-fg">
            {CONTACT_EMAIL}
          </a>
          {socials.map((social) => (
            <a key={social.label} href={social.href} className="hover:text-fg">
              {social.label}
            </a>
          ))}
        </div>

        <span className="text-sm text-fg-muted">
          © {new Date().getFullYear()} Plug.Studio
        </span>
      </div>
    </footer>
  );
}
