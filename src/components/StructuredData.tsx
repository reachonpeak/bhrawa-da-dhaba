import { business } from "@/lib/business";
import { menu } from "@/lib/menu";

export function StructuredData() {
  const restaurant = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: business.name,
    alternateName: business.nameGurmukhi,
    image: "https://bharawan-dhaba.vercel.app/og.jpg",
    telephone: business.phone.tel,
    email: business.email,
    url: "https://bharawan-dhaba.vercel.app",
    priceRange: "$$",
    servesCuisine: ["Indian", "Punjabi", "South Indian", "Vegetarian"],
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.line1,
      addressLocality: business.address.suburb,
      addressRegion: business.address.state,
      postalCode: business.address.postcode,
      addressCountry: "AU",
    },
    openingHoursSpecification: business.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${
        { Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday", Fri: "Friday", Sat: "Saturday", Sun: "Sunday" }[h.day]
      }`,
      opens: h.open,
      closes: h.close,
    })),
    hasMenu: {
      "@type": "Menu",
      hasMenuSection: menu.map((cat) => ({
        "@type": "MenuSection",
        name: cat.title,
        description: cat.subtitle,
        hasMenuItem: cat.items.map((it) => ({
          "@type": "MenuItem",
          name: it.name,
          description: it.description,
          offers: { "@type": "Offer", price: it.price, priceCurrency: "AUD" },
          suitableForDiet: "https://schema.org/VegetarianDiet",
        })),
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurant) }}
    />
  );
}
