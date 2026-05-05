import type { Guest } from "@/lib/types";

export const guests: Guest[] = [
  {
    slug: "maya-okafor",
    name: "Maya Okafor",
    role: "Chef + Restaurant Owner",
    bio: "Built the city's most-talked-about supper club out of a two-bedroom apartment before opening her flagship. Known for fusing West African flavors with neighborhood storytelling.",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
    location: "Westside",
    links: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "Restaurant", href: "#" },
    ],
  },
  {
    slug: "devin-cross",
    name: "Devin Cross",
    role: "Barbershop Owner + Organizer",
    bio: "Turned a one-chair shop into a cultural hub hosting open mics, city council meetings, and the loudest Sunday debates in town.",
    photo: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=800&q=80",
    location: "Eastside",
  },
  {
    slug: "lena-park",
    name: "Lena Park",
    role: "DJ + Nightlife Promoter",
    bio: "Runs the city's longest-running underground party. Booked every major touring act that now sells out arenas.",
    photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80",
    location: "Downtown",
  },
  {
    slug: "jamal-reyes",
    name: "Jamal Reyes",
    role: "High School Football Coach",
    bio: "Went from the city's worst program to state champions in four seasons. Became a civic figure after the parade.",
    photo: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800&q=80",
    location: "Northside",
  },
  {
    slug: "sofia-marin",
    name: "Sofia Marin",
    role: "City Council Candidate",
    bio: "Former teacher running the insurgent campaign everyone is arguing about on timelines, stoops, and group chats.",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
    location: "Citywide",
  },
  {
    slug: "ty-richardson",
    name: "Ty Richardson",
    role: "Sneaker Plug + Resale Legend",
    bio: "The guy every rapper, athlete, and high school kid calls first. Built a seven-figure resale business out of his mom's garage.",
    photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&q=80",
    location: "Southside",
  },
];

export function getGuest(slug: string) {
  return guests.find((g) => g.slug === slug);
}
