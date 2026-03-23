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
    badges: ["Top Performer", "Multi-Language Performer", "Emerging Artist"],
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
  },
  {
    id: "3",
    slug: "hashtag-band",
    name: "HASHTAG Band",
    title: "Live Band in Bangalore",
    shortDescription: "Book HASHTAG Band, a high-energy live band in Bangalore known for delivering dynamic performances across multiple languages including Hindi, Kannada, English, Tamil, and Telugu.",
    fullDescription: "HASHTAG Band is a versatile live music group based in Bangalore, specializing in multi-language performances that connect with every audience.\n\nWith expertise across Bollywood, regional, and international music, the band delivers powerful stage performances tailored to different event types.\n\nTheir ability to seamlessly switch between languages and genres makes them one of the most flexible and in-demand live bands in Bangalore.",
    badges: ["Seasoned Artist", "Budget Friendly", "Multi-Language Performer"],
    rating: 4.8,
    totalBookings: "22",
    genres: ["Hindi", "Kannada", "English", "Tamil", "Telugu", "Bollywood"],
    location: "Bangalore",
    availableIn: ["Indiranagar", "Koramangala", "Whitefield", "HSR Layout", "JP Nagar"],
    bestFor: [
      { category: "Weddings", events: ["Receptions", "Sangeet", "Main Event"] },
      { category: "Corporate Events", events: ["Annual Day", "Gala Dinners"] },
      { category: "Large Celebrations", events: ["Concerts", "Festivals"] }
    ],
    pricing: [
      { type: "Duo Performance", price: 20000 },
      { type: "Trio Performance", price: 30000 }
    ],
    priceIndicator: "starts from ₹20,000",
    originalPriceIndicator: "₹25,000",
    bookingAmount: "₹6,000",
    images: [
      "/artists/hashtag/1.jpg"
    ],
    videos: [
      "/artists/hashtag/vid1.mp4",
      "/artists/hashtag/vid2.mp4",
      "/artists/hashtag/vid3.mp4"
    ],
    seo: {
      title: "HASHTAG Band - Live Band in Bangalore | Urban Raaga",
      description: "Book HASHTAG Band, a high-energy live band in Bangalore delivering dynamic performances across Hindi, Kannada, English, Tamil, and Telugu.",
      keywords: "live band in Bangalore, Bollywood band Bangalore, Kannada band Bangalore, English band Bangalore, wedding band Bangalore"
    }
  },
  {
    id: "4",
    slug: "overtune-rhythms",
    name: "Overtune Rhythms",
    title: "English & Bollywood Singer",
    shortDescription: "Book Overtune Rhythms, a professional English singer in Bangalore and Bollywood singer in Bangalore, known for delivering soulful and expressive live performances.",
    fullDescription: "With over 8 years of experience, Overtune Rhythms creates music that connects deeply with audiences — making him a perfect choice for weddings, corporate events, and premium private gatherings.\n\nHe specializes in Acoustic, Soft Rock, Pop, and Light Music across English and Bollywood genres, delivering emotional and classy performances that elevate the ambiance of any premium event.",
    badges: ["Soulful", "Top Performer", "Premium Performer"],
    rating: 4.8,
    totalBookings: "443",
    genres: ["English", "Bollywood", "Acoustic", "Soft Rock", "Pop", "Light Music"],
    location: "Bangalore",
    availableIn: ["Indiranagar", "Whitefield", "Koramangala", "HSR Layout", "Sarjapur Road"],
    bestFor: [
      { category: "Weddings", events: ["Reception performances", "Cocktail evenings", "Romantic live sets"] },
      { category: "Corporate Events", events: ["Premium gatherings", "Networking events", "Formal evenings"] },
      { category: "Private Events", events: ["House parties", "Intimate celebrations"] }
    ],
    pricing: [
      { type: "Solo", price: 25000 },
      { type: "Duo", price: 35000 },
      { type: "Trio", price: 45000 }
    ],
    priceIndicator: "starts from ₹25,000",
    originalPriceIndicator: "₹30,000",
    bookingAmount: "₹7,500",
    images: [
      "/artists/overtune/1.jpg",
      "/artists/overtune/2.jpg",
      "/artists/overtune/3.png"
    ],
    videos: [
      "/artists/overtune/vid1.mp4",
      "/artists/overtune/vid2.mp4",
      "/artists/overtune/vid3.mp4"
    ],
    seo: {
      title: "Overtune Rhythms - Premium English & Bollywood Singer in Bangalore",
      description: "Book Overtune Rhythms, a premium English and Bollywood singer in Bangalore with 8+ years experience for weddings, corporate and private events.",
      keywords: "english singer in bangalore, bollywood singer in bangalore, soulful performer, premium event singer"
    }
  },
  {
    id: "5",
    slug: "pallavi-singer",
    name: "Pallavi",
    title: "Female Singer in Bangalore",
    shortDescription: "Book Pallavi, a highly experienced female singer in Bangalore specializing in Bollywood, Kannada, Tamil, Telugu, and English music.",
    fullDescription: "With over 23 years of professional experience, Pallavi is known for her soulful voice, powerful stage presence, and emotionally rich performances — making her a perfect choice for weddings, corporate events, and premium celebrations.\n\nPallavi is a versatile and accomplished singer with expertise across multiple genres including Bollywood, rock, folk, and Sufi music. Her ability to connect with audiences through emotion and authenticity makes every performance memorable.\n\nWhether it’s a romantic wedding set or a high-energy celebration, Pallavi brings unmatched passion and professionalism to the stage.",
    badges: ["Premium Performer", "Multilingual", "23+ Years Experience"],
    rating: 4.8,
    totalBookings: "109",
    genres: ["Bollywood", "Kannada", "Tamil", "Telugu", "English", "Sufi", "Rock", "Folk"],
    location: "Bangalore",
    availableIn: ["Indiranagar", "Whitefield", "Koramangala", "HSR Layout", "JP Nagar"],
    bestFor: [
      { category: "Weddings", events: ["Bridal entry", "Sangeet & Mehendi", "Reception & cocktail nights"] },
      { category: "Corporate Events", events: ["Premium corporate gatherings", "Formal events", "Cultural shows"] },
      { category: "Private Events", events: ["House parties", "Anniversary celebrations", "Special occasions"] }
    ],
    pricing: [
      { type: "Solo Performance", price: 25000 },
      { type: "Semi-Acoustic Band", price: 35000 },
      { type: "Full Band (Full Piece)", price: 45000 }
    ],
    priceIndicator: "starts from ₹25,000",
    originalPriceIndicator: "₹35,000",
    bookingAmount: "₹7,500",
    images: [
      "/artists/pallavi/1.jpg",
      "/artists/pallavi/2.jpg",
      "/artists/pallavi/3.jpg",
      "/artists/pallavi/4.jpg"
    ],
    videos: [
      "/artists/pallavi/vid1.mp4",
      "/artists/pallavi/vid2.mp4"
    ],
    seo: {
      title: "Female Singer in Bangalore | Pallavi | Bollywood & Multilingual Singer",
      description: "Book Pallavi, a female singer in Bangalore with 23+ years experience performing Bollywood, Kannada, Tamil, Telugu and English songs for weddings and events.",
      keywords: "female singer in Bangalore, Bollywood singer Bangalore, Kannada singer Bangalore, Tamil singer Bangalore, Telugu singer Bangalore, English singer Bangalore"
    }
  }
];

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find(artist => artist.slug === slug);
}
