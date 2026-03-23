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
  originalPriceIndicator?: string;
  bookingAmount?: string;
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
    badges: ["Top Performer", "Established Artist", "Urban Raaga's Choice"],
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
    originalPriceIndicator: "₹35,000",
    bookingAmount: "₹9,000",
    images: [
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
      description: "Book Devashish Music, the best wedding singer in Bangalore. Known for amazing Bollywood and Sufi performances at weddings and corporate events across India.",
      keywords: "wedding singer in bangalore, live performer, sufi singer, bollywood singer, devashish music"
    }
  },
  {
    id: "2",
    slug: "rahul-acoustic",
    name: "Rahul",
    title: "UR Acoustic Singer",
    shortDescription: "Book Rahul, a versatile English singer in Bangalore, Kannada singer in Bangalore, and Bollywood singer in Bangalore, known for delivering engaging live performances across multiple genres and events.",
    fullDescription: "As a Bangalore-based artist, Rahul performs seamlessly in Hindi, English, and Kannada, making him an ideal choice for weddings, corporate events, and private parties.\n\nRahul is a multi-talented live singer in Bangalore who adapts his performance based on the audience and event vibe.\n\nWhether it’s a romantic Bollywood set, an energetic English performance, or a local Kannada music experience, Rahul brings versatility and professionalism to every stage.\n\nHe also plays multiple instruments including guitar, bass guitar, and piano, making his performances more dynamic and engaging.",
    badges: ["Top Performer", "Multi-Language Performer", "Urban Raaga's Choice"],
    rating: 4.5,
    totalBookings: "52+",
    genres: ["English", "Kannada", "Bollywood", "Acoustic", "Pop"],
    location: "Bangalore",
    availableIn: ["Indiranagar", "Koramangala", "Whitefield", "HSR Layout", "JP Nagar"],
    bestFor: [
      { category: "House Parties", events: ["Intimate Gatherings", "Lively Gatherings"] },
      { category: "Corporate Events", events: ["Cocktail Nights", "Formal Gatherings"] },
      { category: "Weddings", events: ["Receptions", "Sangeet", "Light Music"] }
    ],
    pricing: [
      { type: "Solo", price: 11500 },
      { type: "Duo", price: 22500 },
      { type: "Trio", price: 32500 }
    ],
    priceIndicator: "starts from ₹11,500",
    originalPriceIndicator: "₹15,000",
    bookingAmount: "₹3,450",
    images: [
      "/artists/rahul/1.png",
      "/artists/rahul/2.png"
    ],
    videos: [
      "https://drive.google.com/file/d/1ujrWkBiIZRkApotXr_pWdZZqPV1VgxTY/preview",
      "https://drive.google.com/file/d/1F2mW7p9XW8ZyKzbplIXhUvZaGLCxDD5I/preview",
      "https://drive.google.com/file/d/1CyY3WPjlg0Xe_Rx4NF3yTLAApJm4e_mK/preview"
    ],
    seo: {
      title: "Rahul - Acoustic English & Bollywood Singer in Bangalore",
      description: "Book Rahul for house parties, corporate events, and weddings in Bangalore. He sings in English, Kannada, and Hindi.",
      keywords: "english singer in bangalore, kannada singer, bollywood singer, live acoustic music"
    }
  }
];

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find(artist => artist.slug === slug);
}
