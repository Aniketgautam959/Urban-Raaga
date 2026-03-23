export interface Artist {
  id: string;
  slug: string;
  name: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  badges: string[];
  rating: number;
  totalBookings: string;
  genres: string[];
  location: string;
  availableIn: string[];
  bestFor: {
    category: string;
    events: string[];
  }[];
  pricing: {
    type: string;
    price: number;
  }[];
  priceIndicator: string;
  images: string[];
  videos?: string[];
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

export const artists: Artist[] = [
  {
    id: "1",
    slug: "devashish-music",
    name: "Devashish Music",
    title: "Wedding Singer in Bangalore",
    shortDescription: "Book Devashish Music, a professional wedding singer in Bangalore, known for delivering powerful live performances across India and international stages.",
    fullDescription: "With experience of 1000+ live shows, Devashish has performed for renowned personalities like Kajol and Aashish Chaudhary, along with multiple international shows in the UAE.\n\nHis expertise in Bollywood, Sufi, and retro music makes him a perfect choice for weddings, corporate events, and private parties.",
    badges: ["Top Performer", "Established Artist"],
    rating: 4.9,
    totalBookings: "1000+",
    genres: ["Bollywood", "Hindi Romantic", "Sufi", "Retro Classics", "Party Hits"],
    location: "Bangalore",
    availableIn: ["Indiranagar", "Whitefield", "Koramangala", "HSR Layout", "Sarjapur Road"],
    bestFor: [
      {
        category: "Weddings (Primary Focus)",
        events: ["Sangeet & Mehendi", "Reception & Cocktail", "Bridal entry performances"]
      },
      {
        category: "Corporate Events",
        events: ["Office parties", "Brand events", "Formal gatherings"]
      },
      {
        category: "Private Parties",
        events: ["House parties", "Birthday celebrations"]
      }
    ],
    pricing: [
      { type: "Solo", price: 30000 },
      { type: "Duo", price: 40000 },
      { type: "Trio", price: 50000 }
    ],
    priceIndicator: "starts from ₹30,000",
    images: [
      "/artists/devashish/1.png",
      "/artists/devashish/2.png",
      "/artists/devashish/3.png",
      "/artists/devashish/4.png",
      "/artists/devashish/5.jpg",
      "/artists/devashish/6.jpg",
      "/artists/devashish/7.jpg",
      "/artists/devashish/8.jpg"
    ],
    videos: [
      "https://www.youtube.com/embed/yzfW4Wnji2I",
      "https://www.youtube.com/embed/SU9O7CPasPw",
      "https://www.youtube.com/embed/JQHKu5PMs9Y"
    ],
    seo: {
      title: "Wedding Singer in Bangalore | Devashish Music | Urban Raaga",
      description: "Book Devashish Music, a professional wedding singer in Bangalore for live performances at weddings, parties, and corporate events. Solo, duo & band available.",
      keywords: "wedding singer in Bangalore, live singer Bangalore, Bollywood singer Bangalore, sangeet singer Bangalore"
    }
  }
];

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find(artist => artist.slug === slug);
}
