import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { products } from "@/lib/data/products";
import { productImages } from "@/lib/data/product-images";
import { liveGetBySlug, liveRelatedFor } from "@/lib/catalog";
import { siteUrl } from "@/lib/site";
import { ProductDetail } from "@/components/product/product-detail";

// ISR: product pages refresh every 10s + on-demand via admin save.
// Short window ensures image/price edits on Vercel appear on refresh.
export const revalidate = 10;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const product = await liveGetBySlug(params.slug);
    if (!product) return { title: "Product not found" };
    const cleanDesc = String(product.description ?? "").replace(/<[^>]+>/g, " ").trim();
    const price = Number(product.price ?? 0);
    const stock = Number(product.stock ?? 0);
    const rating = Number(product.rating ?? 0);
    const reviews = Number(product.reviews ?? 0);
    const title = `Buy ${product.name} — ${product.brand} in Kenya | KimSafety`;
    const description = `${cleanDesc.slice(0, 120)} — KES ${price.toLocaleString()} · ${stock > 0 ? `${stock} in stock` : "Out of stock"} · ${rating}★ (${reviews} reviews) · Same-day Nairobi delivery & bulk discounts.`;
    const mainImageRaw =
      (product.image as string) ||
      productImages[product.sku] ||
      `/images/products/${product.sku}.jpg`;
    const mainImage = String(mainImageRaw).startsWith("http") ? String(mainImageRaw) : `${siteUrl}${String(mainImageRaw).startsWith("/") ? "" : "/"}${mainImageRaw}`;
    const images = [{ url: mainImage, width: 1200, height: 630, alt: String(product.name) }];
    return {
      title,
      description: description.slice(0, 160),
      keywords: [
        String(product.name),
        `${product.brand} ${product.name}`,
        `${product.categoryName} Kenya`,
        `${product.sku} KimSafety`,
        `${product.brand} Kenya`,
        `buy ${product.name} Nairobi`,
      ],
      alternates: { canonical: `${siteUrl}/product/${product.slug}` },
      openGraph: {
        title,
        description: description.slice(0, 160),
        type: "website",
        url: `${siteUrl}/product/${product.slug}`,
        siteName: "KimSafety",
        images,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description: description.slice(0, 160),
        images: [mainImage],
      },
    };
  } catch {
    return { title: "Product not found" };
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  let product: Awaited<ReturnType<typeof liveGetBySlug>>;
  try {
    product = await liveGetBySlug(params.slug);
  } catch {
    return notFound();
  }
  if (!product) return notFound();

  let related: Awaited<ReturnType<typeof liveRelatedFor>> = [];
  try {
    related = await liveRelatedFor(product);
  } catch {
    related = [];
  }
  const mainImageRaw =
    (product.image as string) ||
    productImages[product.sku] ||
    `/images/products/${product.sku}.jpg`;
  const mainImage = String(mainImageRaw).startsWith("http") ? String(mainImageRaw) : `${siteUrl}${String(mainImageRaw).startsWith("/") ? "" : "/"}${mainImageRaw}`;
  const cleanDesc = String(product.description ?? "").replace(/<[^>]+>/g, " ").trim();
  const priceNum = Number(product.price ?? 0);
  const oldPriceNum = product.oldPrice != null ? Number(product.oldPrice) : undefined;
  const stockNum = Number(product.stock ?? 0);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${siteUrl}/product/${String(product.slug)}#product`,
    name: String(product.name),
    sku: String(product.sku),
    mpn: String(product.sku),
    image: [mainImage],
    url: `${siteUrl}/product/${String(product.slug)}`,
    brand: { "@type": "Brand", name: String(product.brand) },
    description: cleanDesc,
    category: String(product.categoryName),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: Number(product.rating ?? 0),
      reviewCount: Number(product.reviews ?? 0),
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/product/${String(product.slug)}`,
      priceCurrency: "KES",
      price: priceNum,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().split("T")[0],
      availability: stockNum > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: "KimSafety", url: siteUrl },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${siteUrl}/search` },
      { "@type": "ListItem", position: 3, name: String(product.categoryName), item: `${siteUrl}/category/${String(product.category)}` },
      { "@type": "ListItem", position: 4, name: String(product.name), item: `${siteUrl}/product/${String(product.slug)}` },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the price of ${String(product.name)} in Kenya?`,
        acceptedAnswer: { "@type": "Answer", text: `${String(product.name)} costs KES ${priceNum.toLocaleString()} ${oldPriceNum && oldPriceNum > priceNum ? `(was KES ${oldPriceNum.toLocaleString()})` : ""} at KimSafety. Bulk discounts apply for 10+ units.` },
      },
      {
        "@type": "Question",
        name: `Is ${String(product.name)} in stock?`,
        acceptedAnswer: { "@type": "Answer", text: stockNum > 0 ? `Yes — ${stockNum} units in stock at KimSafety's Nairobi warehouse. Same-day dispatch in Nairobi on orders before 3 PM, 24–72 hours countrywide.` : `Currently out of stock. Join the restock notification on the product page to be emailed when ${String(product.name)} is back.` },
      },
      {
        "@type": "Question",
        name: "Do you provide certification and bulk pricing?",
        acceptedAnswer: { "@type": "Answer", text: "Every KimSafety product ships with certification documentation (CE, KEBS, EN, ISO as applicable) and a datasheet PDF. Tiered bulk pricing: 1–9 standard, 10–49, 50–199, 200+ with up to ~17% off. Corporate quotations at /quote or /corporate/purchase." },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <BreadcrumbTrail product={product} />
      <ProductDetail product={product} related={related} />
    </>
  );
}

function BreadcrumbTrail({ product }: { product: (typeof products)[number] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-line bg-white">
      <div className="mx-auto max-w-shell px-4 py-3 lg:px-8">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-400">
          <li>
            <Link href="/" className="font-medium transition-colors hover:text-safety-600">
              Home
            </Link>
          </li>
          <li aria-hidden>
            <ChevronRight className="h-3 w-3" />
          </li>
          <li>
            <Link href="/search" className="font-medium transition-colors hover:text-safety-600">
              Shop
            </Link>
          </li>
          <li aria-hidden>
            <ChevronRight className="h-3 w-3" />
          </li>
          <li>
            <Link
              href={`/category/${product.category}`}
              className="font-medium transition-colors hover:text-safety-600"
            >
              {product.categoryName}
            </Link>
          </li>
          <li aria-hidden>
            <ChevronRight className="h-3 w-3" />
          </li>
          <li className="max-w-[40ch] truncate font-semibold text-navy-900" aria-current="page">
            {product.name}
          </li>
        </ol>
      </div>
    </nav>
  );
}
