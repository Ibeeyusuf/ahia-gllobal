import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-heading font-bold text-2xl">A</span>
          </div>
          <h1 className="font-heading font-bold text-3xl text-neutral-900">AhiaGlobal</h1>
          <p className="text-neutral-400 mt-2 text-sm">Select your portal to continue</p>
        </div>

        <div className="space-y-3">
          {[
            { href: "/admin", label: "Super Admin", desc: "Manage companies, deliveries & platform settings", emoji: "🔐", bg: "bg-neutral-900", text: "text-white" },
            { href: "/company", label: "Company Dashboard", desc: "Manage orders, riders & company earnings", emoji: "🏢", bg: "bg-primary-600", text: "text-white" },
            { href: "/rider", label: "Rider Portal", desc: "View active orders, earnings & profile", emoji: "🏍", bg: "bg-white border border-neutral-200", text: "text-neutral-900" },
          ].map((p) => (
            <Link key={p.href} href={p.href}
              className={`flex items-center gap-4 p-5 rounded-xl2 shadow-card transition-all hover:shadow-hover hover:-translate-y-0.5 ${p.bg} ${p.text}`}>
              <span className="text-2xl">{p.emoji}</span>
              <div>
                <p className="font-heading font-bold">{p.label}</p>
                <p className={`text-xs mt-0.5 ${p.text === "text-white" ? "opacity-70" : "text-neutral-400"}`}>{p.desc}</p>
              </div>
              <span className="ml-auto opacity-60">→</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
