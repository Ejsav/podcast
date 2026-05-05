import type { Business } from "@/lib/types";

export const businesses: Business[] = [
  {
    slug: "okafor-kitchen",
    name: "Okafor Kitchen",
    tagline: "The restaurant everyone's trying to get a seat at.",
    category: "Restaurant",
    neighborhood: "Westside",
    photo: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    rating: 4.9,
    featured: true,
    description:
      "West African cuisine reimagined through a neighborhood lens. Tasting menu only. 6-week waitlist.",
    website: "#",
    address: "1420 Westside Ave",
  },
  {
    slug: "cross-cuts",
    name: "Cross Cuts",
    tagline: "More than a barbershop. The room where the neighborhood happens.",
    category: "Barbershop",
    neighborhood: "Eastside",
    photo: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80",
    rating: 4.8,
    featured: true,
    description:
      "Three chairs, two decades, one culture. Open mics Thursday, politics every Saturday.",
    address: "88 Eastside Blvd",
  },
  {
    slug: "park-after-dark",
    name: "Park After Dark",
    tagline: "The city's loudest-kept secret.",
    category: "Nightlife",
    neighborhood: "Downtown",
    photo: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
    rating: 4.7,
    featured: true,
    description:
      "Warehouse residency that's launched more careers than any venue in the city. Bring earplugs.",
    address: "Warehouse 12, Downtown",
  },
  {
    slug: "southside-sole",
    name: "Southside Sole",
    tagline: "The sneaker shop rappers call first.",
    category: "Retail",
    neighborhood: "Southside",
    photo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    rating: 4.9,
    description:
      "Authenticated grails, no BS. If you can't find it, Ty can.",
    address: "714 Southside St",
  },
  {
    slug: "blue-hour-coffee",
    name: "Blue Hour Coffee",
    tagline: "The morning room of the neighborhood.",
    category: "Coffee",
    neighborhood: "Northside",
    photo: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80",
    rating: 4.8,
    description:
      "Single-origin espresso, 6am open. Where the local council has its pre-meeting meetings.",
    address: "22 Northside Row",
  },
  {
    slug: "marin-tailor",
    name: "Marin & Son Tailor",
    tagline: "Three generations, one needle.",
    category: "Tailor",
    neighborhood: "Eastside",
    photo: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80",
    rating: 5.0,
    description:
      "The tailor every local athlete, politician, and groom ends up at eventually.",
    address: "4 Marin Lane",
  },
  {
    slug: "reyes-fieldhouse",
    name: "Reyes Fieldhouse",
    tagline: "Where the state champs train.",
    category: "Gym",
    neighborhood: "Northside",
    photo: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    rating: 4.7,
    description:
      "Youth athletics, community programming, open gym Fridays.",
    address: "Fieldhouse Rd",
  },
  {
    slug: "westside-flowers",
    name: "Westside Flowers",
    tagline: "The florist every wedding photo you've saved used.",
    category: "Florist",
    neighborhood: "Westside",
    photo: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&q=80",
    rating: 4.9,
    description:
      "Seasonal arrangements, studio work, and the weekly stand that started it all.",
    address: "201 Westside Ave",
  },
];

export function getFeaturedBusiness() {
  return businesses.find((b) => b.featured) ?? businesses[0];
}
