import Link from "next/link";

const PORTALS = [
  {
    href: "/admin",
    emoji: "🔐",
    label: "Super Admin",
    desc: "Manage companies, deliveries & platform settings",
    bg: "bg-neutral-900",
    text: "text-white",
    sub: "opacity-60",
    accent: "bg-white/10",
  },
  {
    href: "/company",
    emoji: "🏢",
    label: "Company Dashboard",
    desc: "Manage orders, riders & company earnings",
    bg: "bg-primary-600",
    text: "text-white",
    sub: "opacity-70",
    accent: "bg-white/10",
  },
  {
    href: "/vendor",
    emoji: "🛍️",
    label: "Vendor / Seller",
    desc: "List products, manage orders & track earnings",
    bg: "bg-amber-500",
    text: "text-white",
    sub: "opacity-70",
    accent: "bg-white/10",
  },
  {
    href: "/rider",
    emoji: "🏍",
    label: "Rider Portal",
    desc: "View active orders, earnings & profile",
    bg: "bg-white border border-neutral-200",
    text: "text-neutral-900",
    sub: "text-neutral-400",
    accent: "bg-neutral-100",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ boxShadow: "0 8px 24px rgba(234,88,12,.35)" }}>
            <span className="text-white font-heading font-bold text-3xl">A</span>
          </div>
          <h1 className="font-heading font-bold text-3xl text-neutral-900">AhiaGlobal</h1>
          <p className="text-neutral-400 mt-2 text-sm">Select your portal to continue</p>
        </div>

        {/* Portal cards */}
        <div className="space-y-3">
          {PORTALS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className={`flex items-center gap-4 px-5 py-4 rounded-xl2 shadow-card transition-all hover:shadow-hover hover:-translate-y-0.5 ${p.bg} ${p.text}`}
            >
              <div className={`w-10 h-10 ${p.accent} rounded-xl flex items-center justify-center text-xl flex-shrink-0`}>
                {p.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading font-bold text-[0.95rem]">{p.label}</p>
                <p className={`text-xs mt-0.5 truncate ${p.sub}`}>{p.desc}</p>
              </div>
              <svg className="w-4 h-4 opacity-40 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>

        <p className="text-center text-[0.72rem] text-neutral-300 mt-8">
          AhiaGlobal Logistics Platform · v1.0
        </p>
      </div>
    </main>
  );
}
