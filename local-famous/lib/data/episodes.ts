import type { Episode } from "@/lib/types";

// Short public-domain / CC0 audio you can replace with real episodes.
const SAMPLE_AUDIO =
  "https://cdn.pixabay.com/audio/2022/03/15/audio_1718d13e2e.mp3";

export const episodes: Episode[] = [
  {
    slug: "maya-okafor-supper-club-empire",
    number: 42,
    title: "The Supper Club That Became an Empire",
    subtitle: "Maya Okafor on building a restaurant the city couldn't stop talking about.",
    description:
      "Maya tells the real story behind the two-bedroom supper club that sold out for 18 months straight, the investors she turned down, and why every neighborhood now wants one of her restaurants.",
    publishedAt: "2026-04-22T09:00:00Z",
    duration: 3840,
    audioUrl: SAMPLE_AUDIO,
    artwork:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80",
    category: "local-businesses",
    tags: ["Food", "Entrepreneurship", "Westside"],
    guests: ["maya-okafor"],
    featured: true,
    chapters: [
      { t: 0, title: "Cold open: the night the line went around the block" },
      { t: 180, title: "Leaving a kitchen job with two weeks of savings" },
      { t: 720, title: "Why she turned down the first big investor" },
      { t: 1560, title: "The city's most-criticized opening month" },
      { t: 2640, title: "Opening a second location nobody expected" },
      { t: 3360, title: "What she tells every young chef now" },
    ],
    transcript: [
      {
        t: 0,
        end: 6,
        speaker: "Host",
        text: "Welcome back to Local Famous. The show about the people, places, drama, and businesses everyone is talking about.",
      },
      {
        t: 6,
        end: 14,
        speaker: "Host",
        text: "Today's guest built one of the most talked-about restaurants in the city out of her apartment. Maya Okafor.",
      },
      {
        t: 14,
        end: 22,
        speaker: "Maya",
        text: "Thanks for having me. I still can't believe we're the place people line up for. Three years ago it was me, two burners, and a spreadsheet.",
      },
      {
        t: 22,
        end: 32,
        speaker: "Host",
        text: "Let's rewind. What does your Sunday look like right before the first supper club pops off?",
      },
      {
        t: 32,
        end: 48,
        speaker: "Maya",
        text: "I'm terrified. I've prepped for 40 people, I've got 60 coming, and my roommate is asking why the fridge smells like smoked paprika at 7am. I remember thinking, if this fails, I go back to line cooking Monday.",
      },
      {
        t: 48,
        end: 60,
        speaker: "Host",
        text: "And then you sell out the next four Sundays. What changed?",
      },
      {
        t: 60,
        end: 78,
        speaker: "Maya",
        text: "The city found out. One clip, one food writer DMs me, and suddenly I'm getting investor emails at 2am. But I said no to all of them, and that's the part people always ask about.",
      },
      {
        t: 78,
        end: 94,
        speaker: "Host",
        text: "So let's get into that. Why turn down the money when most people in your position would grab it?",
      },
      {
        t: 94,
        end: 120,
        speaker: "Maya",
        text: "Because the money wanted my name, not my food. I saw the menu they wanted. I saw the neighborhood they wanted. It wasn't mine. And the thing that made Local Famous call me wasn't their idea, it was mine.",
      },
    ],
  },
  {
    slug: "devin-cross-barbershop-power",
    number: 41,
    title: "Why the Barbershop Still Runs This City",
    subtitle: "Devin Cross on building a real civic institution from one chair.",
    description:
      "Devin breaks down how his shop became the room where candidates, activists, and neighborhood kids all show up on the same Saturday.",
    publishedAt: "2026-04-15T09:00:00Z",
    duration: 3120,
    audioUrl: SAMPLE_AUDIO,
    artwork:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&q=80",
    category: "popular-people",
    tags: ["Community", "Business", "Eastside"],
    guests: ["devin-cross"],
    chapters: [
      { t: 0, title: "Why politicians keep showing up on Saturdays" },
      { t: 540, title: "The argument that made the news" },
      { t: 1320, title: "Building trust nobody can buy" },
      { t: 2400, title: "What the next generation of shops needs" },
    ],
    transcript: [
      {
        t: 0,
        end: 8,
        speaker: "Host",
        text: "You've had three city council candidates in your chair this month. What are they coming in for?",
      },
      {
        t: 8,
        end: 20,
        speaker: "Devin",
        text: "A haircut, officially. Honestly? They're coming to hear what the neighborhood actually thinks. My chair is the most honest focus group in the city.",
      },
    ],
  },
  {
    slug: "lena-park-nightlife-kingmaker",
    number: 40,
    title: "The DJ Who Made the City's Biggest Artists",
    subtitle: "Lena Park on the underground scene that changed everything.",
    description:
      "Lena on gatekeeping, ten-year overnight successes, the club that refused to book her, and the names she put on before anyone knew them.",
    publishedAt: "2026-04-08T09:00:00Z",
    duration: 2940,
    audioUrl: SAMPLE_AUDIO,
    artwork:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&q=80",
    category: "food-nightlife",
    tags: ["Music", "Nightlife", "Downtown"],
    guests: ["lena-park"],
    chapters: [
      { t: 0, title: "The night the crowd broke the fire code" },
      { t: 720, title: "Who she said no to" },
      { t: 1800, title: "The real economics of a warehouse party" },
    ],
    transcript: [
      {
        t: 0,
        end: 10,
        speaker: "Host",
        text: "Lena, you've had more sold-out nights than any promoter in the city. How does it start for you?",
      },
      {
        t: 10,
        end: 22,
        speaker: "Lena",
        text: "Three people dancing, bad speakers, a basement. That's it. That's every story. Anybody who tells you different is lying or forgetting.",
      },
    ],
  },
  {
    slug: "jamal-reyes-state-champs",
    number: 39,
    title: "From Worst to State Champs in Four Years",
    subtitle: "Coach Jamal Reyes on turning around a program nobody believed in.",
    description:
      "The Friday night lights story that took over the city. How one coach rebuilt a team, a building, and a neighborhood's belief in itself.",
    publishedAt: "2026-04-01T09:00:00Z",
    duration: 3420,
    audioUrl: SAMPLE_AUDIO,
    artwork:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&q=80",
    category: "events-culture",
    tags: ["Sports", "High School", "Northside"],
    guests: ["jamal-reyes"],
    chapters: [
      { t: 0, title: "Year one: the locker room nobody wanted" },
      { t: 960, title: "The parent meeting that changed everything" },
      { t: 2160, title: "The final drive" },
    ],
    transcript: [
      {
        t: 0,
        end: 8,
        speaker: "Host",
        text: "Coach, when you took the job they were 1 and 9. What did you see that nobody else saw?",
      },
      {
        t: 8,
        end: 22,
        speaker: "Jamal",
        text: "Kids who'd never been told the truth. Some of them had never been told they were good. Some had never been told they were wrong. Both of those were hurting them.",
      },
    ],
  },
  {
    slug: "sofia-marin-insurgent-campaign",
    number: 38,
    title: "The Campaign Everyone Is Arguing About",
    subtitle: "Sofia Marin on the race that's split the city into two group chats.",
    description:
      "A former teacher runs for city council with no money, no machine, and the most talked-about campaign in a decade. Sofia gets honest about the pressure.",
    publishedAt: "2026-03-25T09:00:00Z",
    duration: 3660,
    audioUrl: SAMPLE_AUDIO,
    artwork:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&q=80",
    category: "social-drama",
    tags: ["Politics", "Citywide"],
    guests: ["sofia-marin"],
    chapters: [
      { t: 0, title: "The moment she decided to run" },
      { t: 840, title: "First week, zero dollars" },
      { t: 2040, title: "The debate clip" },
    ],
    transcript: [
      {
        t: 0,
        end: 10,
        speaker: "Host",
        text: "Sofia, the clip of you from last week's forum has 4 million views. Did you know it was going to hit like that?",
      },
      {
        t: 10,
        end: 24,
        speaker: "Sofia",
        text: "Absolutely not. I said what I said because it was true. I didn't know the room was ready to hear it, honestly.",
      },
    ],
  },
  {
    slug: "ty-richardson-sneaker-empire",
    number: 37,
    title: "The Sneaker Plug Every Rapper Calls First",
    subtitle: "Ty Richardson on resale, access, and the culture economy.",
    description:
      "From mom's garage to seven figures. Ty breaks down the real mechanics of resale, why trust is the actual product, and how the culture pays for itself.",
    publishedAt: "2026-03-18T09:00:00Z",
    duration: 2820,
    audioUrl: SAMPLE_AUDIO,
    artwork:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80",
    category: "national-conversations",
    tags: ["Sneakers", "Culture", "Southside"],
    guests: ["ty-richardson"],
    chapters: [
      { t: 0, title: "The first $40 flip" },
      { t: 660, title: "Why trust is the product" },
      { t: 1680, title: "The athlete phone call" },
    ],
    transcript: [
      {
        t: 0,
        end: 10,
        speaker: "Host",
        text: "Ty, you've got a seven-figure business running out of what used to be your mom's garage. How?",
      },
      {
        t: 10,
        end: 24,
        speaker: "Ty",
        text: "One rule. I never lie about a pair. Not once. That's it. Everybody else is trying to run up the price. I'm trying to run up the relationship.",
      },
    ],
  },
];

export function getEpisode(slug: string) {
  return episodes.find((e) => e.slug === slug);
}

export function getFeaturedEpisode() {
  return episodes.find((e) => e.featured) ?? episodes[0];
}

export function getLatestEpisodes(count = 6) {
  return [...episodes]
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .slice(0, count);
}
