import { ShieldCheck, Truck, Lock, Building2 } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "Genuine Products",
    text: "100% authentic, certified stock from authorized distributors — never counterfeits.",
    accent: "text-emerald-600 bg-emerald-50 border-emerald-200",
    count: "1,200+ Orgs",
  },
  {
    icon: Truck,
    title: "Fast Nationwide Delivery",
    text: "Same-day in Nairobi, 24–72 hours to all 47 counties via our logistics partners.",
    accent: "text-amber-600 bg-amber-50 border-amber-200",
    count: "47 Counties",
  },
  {
    icon: Lock,
    title: "Secure Payments",
    text: "M-Pesa, cards and purchase orders — protected transactions.",
    accent: "text-navy-700 bg-navy-50 border-navy-100",
    count: "100% Secure",
  },
  {
    icon: Building2,
    title: "Corporate Procurement Support",
    text: "Quotations, negotiated pricing, tax invoices and tender documentation.",
    accent: "text-safety-600 bg-safety-50 border-safety-200",
    count: "24h Quotes",
  },
];

export function TrustBar() {
  return (
    <section className="border-y border-line bg-gradient-to-r from-white via-surface to-white" aria-label="Why shop with SafetyPro">
      <div className="mx-auto grid max-w-shell grid-cols-1 gap-4 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {items.map(({ icon: Icon, title, text, accent, count }) => (
          <div
            key={title}
            className="group flex items-start gap-4 rounded-2xl border-2 border-line bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover"
          >
            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 ${accent} transition-transform group-hover:scale-110`}>
              <Icon className="h-6 w-6" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-sm font-extrabold text-navy-900">{title}</h3>
                <span className="rounded-full bg-navy-900 px-2 py-0.5 text-[10px] font-bold text-white">{count}</span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-gray-500">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
