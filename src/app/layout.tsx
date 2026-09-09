import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { StorefrontChrome } from "@/components/layout/storefront-chrome";
import { siteUrl } from "@/lib/site";
import { getAllSettings } from "@/lib/db";
import { resolveLogoUrl, DEFAULT_LOGO } from "@/lib/logo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

// Branding comes from the `settings` table (Admin -> Settings) so a logo or
// site-name change reflects everywhere, including structured data. The DB call
// is guarded so a static build without a live database still falls back to the
// bundled defaults instead of failing.
async function loadBrand(): Promise<{ site_name: string; logo: string; email: string; phone: string }> {
  try {
    const s = await getAllSettings();
    return {
      site_name: (s.site_name || "SAFETYPRO AFRICA").trim(),
      logo: resolveLogoUrl(s),
      email: s.email || "info@safetypro.co.ke",
      phone: s.phone || "+254 729396174",
    };
  } catch {
    return {
      site_name: "SAFETYPRO AFRICA",
      logo: DEFAULT_LOGO,
      email: "info@safetypro.co.ke",
      phone: "+254 729396174",
    };
  }
}

const absoluteUrl = (p: string) => (p.startsWith("http") ? p : `${siteUrl}${p}`);

// Live product count so metadata never goes stale as the catalog grows.
const productCount = async () => {
  const { getProductCount } = await import("@/lib/catalog");
  return getProductCount();
};

function safeMetadataBase(): URL {
  try {
    return new URL(siteUrl);
  } catch {
    return new URL("https://www.safetypro.co.ke");
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const count = await productCount();
  return {
    metadataBase: safeMetadataBase(),
    title: {
      default: "SAFETYPRO AFRICA — Protecting People. Powering Safety. | PPE & Safety Equipment Kenya",
      template: "%s | SAFETYPRO AFRICA",
    },
    description: `SAFETYPRO AFRICA — Professional Safety Solutions for Safer Workplaces. PPE, Workwear, Fire Safety, Industrial Safety, Fall Protection, Respiratory Protection, Safety Training & Workplace Compliance. ${count} products, bulk discounts, nationwide delivery.`,
    keywords: [
      "SAFETYPRO AFRICA",
      "safety equipment Kenya",
      "PPE Kenya",
      "workwear Kenya",
      "fire safety Kenya",
      "industrial safety Nairobi",
      "fall protection Kenya",
      "respiratory protection Kenya",
      "safety training Kenya",
      "workplace compliance Kenya",
      "safety helmets Kenya",
      "safety boots Kenya",
      "safetypro.co.ke",
    ],
    alternates: {
      canonical: siteUrl,
      languages: {
        "en-KE": siteUrl,
        "en": siteUrl,
      },
    },
    verification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION }
      : undefined,
    category: "safety equipment",
    openGraph: {
      type: "website",
      locale: "en_KE",
      url: siteUrl,
      siteName: "SAFETYPRO AFRICA",
      title: "SAFETYPRO AFRICA — Protecting People. Powering Safety.",
      description: `Professional Safety Solutions for Safer Workplaces. PPE · Workwear · Fire Safety · Fall Protection · ${count} products.`,
      images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630, alt: "SAFETYPRO AFRICA — Protecting People. Powering Safety." }],
    },
    twitter: {
      card: "summary_large_image",
      title: "SAFETYPRO AFRICA — Protecting People. Powering Safety.",
      description: `Professional Safety Solutions for Safer Workplaces. PPE, Fire Safety, Fall Protection, Safety Training. ${count} products.`,
      images: [`${siteUrl}/og-image.jpg`],
    },
    icons: {
      icon: "/images/logo/fav.jpeg",
      apple: "/images/logo/fav.jpeg",
    },
    manifest: "/manifest.webmanifest",
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1, "max-snippet": -1 },
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#063B70",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [brand, count] = await Promise.all([loadBrand(), productCount()]);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: brand.site_name,
    url: siteUrl,
    logo: absoluteUrl(brand.logo),
    description:
      `SAFETYPRO AFRICA — Professional Safety Solutions for Safer Workplaces. PPE, Workwear, Fire Safety, Industrial Safety, Fall Protection, Respiratory Protection & Workplace Compliance. ${count} products, 15 categories, 40+ authorized brands.`,
    email: brand.email,
    telephone: brand.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Head Office",
      addressLocality: "Nairobi",
      addressRegion: "Nairobi",
      postalCode: "00100",
      addressCountry: "KE",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: brand.phone,
        contactType: "sales",
        email: "sales@safetypro.co.ke",
        availableLanguage: ["en"],
        areaServed: "KE",
      },
      {
        "@type": "ContactPoint",
        telephone: brand.phone,
        contactType: "customer service",
        email: "info@safetypro.co.ke",
        availableLanguage: ["en"],
      },
    ],
    sameAs: [
      "https://facebook.com/safetyproafrica",
      "https://instagram.com/safetyproafrica",
      "https://linkedin.com/company/safetyproafrica",
      "https://youtube.com/@safetyproafrica",
    ],
    areaServed: { "@type": "Country", name: "Kenya" },
    foundingDate: "2019",
    slogan: "Protecting People. Powering Safety.",
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: brand.site_name,
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: "en-KE",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/search?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <body className={`${inter.variable} ${jakarta.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {(() => {
          const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-3X3CZ6B428";
          return (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                strategy="afterInteractive"
              />
              <Script id="ga-init" strategy="afterInteractive">
                {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
              </Script>
            </>
          );
        })()}
        <StoreProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
          >
            Skip to main content
          </a>
          <StorefrontChrome>{children}</StorefrontChrome>
        </StoreProvider>
      </body>
    </html>
  );
}