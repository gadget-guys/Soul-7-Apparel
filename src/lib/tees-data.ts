
import { Product } from '@/lib/product-data';

export interface TeeProduct extends Product {
  soldOut?: boolean;
  new?: boolean;
  isExclusive?: boolean;
}

export const teesProducts: TeeProduct[] = [
  {
    id: "tee-001",
    name: "POP-TYE GRAPHIC TEE",
    description: "Make a statement with our POP-TYE Graphic Tee. This playful design features a cartoon sailor enjoying his favorite greens, blending nostalgia with modern streetwear aesthetics. Crafted from premium cotton for exceptional comfort and durability, this tee's bold graphics and vibrant colors ensure you'll stand out in any crowd.",
    price: 39.99,
    currency: "USD",
    rating: 4.7,
    reviewCount: 122,
    images: [
      "/lovable-uploads/b68d2fbc-a863-497f-af88-8184e771e655.png",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    variants: [
      {
        id: "variant-tee-001-1",
        color: "White",
        colorCode: "#FFFFFF",
        images: ["/lovable-uploads/b68d2fbc-a863-497f-af88-8184e771e655.png"],
        sizes: [
          { id: "size-tee-001-1-s", size: "S", inStock: true },
          { id: "size-tee-001-1-m", size: "M", inStock: true },
          { id: "size-tee-001-1-l", size: "L", inStock: true },
          { id: "size-tee-001-1-xl", size: "XL", inStock: true },
          { id: "size-tee-001-1-xxl", size: "XXL", inStock: true },
          { id: "size-tee-001-1-xxxl", size: "XXXL", inStock: true }
        ]
      },
      {
        id: "variant-tee-001-2",
        color: "Black",
        colorCode: "#000000",
        images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"],
        sizes: [
          { id: "size-tee-001-2-s", size: "S", inStock: true },
          { id: "size-tee-001-2-m", size: "M", inStock: true },
          { id: "size-tee-001-2-l", size: "L", inStock: true },
          { id: "size-tee-001-2-xl", size: "XL", inStock: true },
          { id: "size-tee-001-2-xxl", size: "XXL", inStock: true },
          { id: "size-tee-001-2-xxxl", size: "XXXL", inStock: true }
        ]
      }
    ],
    features: [
      "100% premium cotton",
      "Regular fit",
      "Reinforced seams",
      "Pre-shrunk fabric"
    ],
    details: {
      "SIZE": "100% PREMIUM COTTON BODY",
      "COLOR": "WHITE",
      "COMPOSITION": "100% COTTON",
      "FIT": "REGULAR",
      "ORIGIN": "ETHICALLY MADE"
    },
    new: true,
    isExclusive: true,
    reviews: [
      {
        id: "review-001",
        author: "Alex J.",
        date: "October 12, 2023",
        rating: 5,
        title: "Best t-shirt I've ever owned",
        content: "The quality is incredible, and the fit is perfect. I can wear this all day without any discomfort. Fabric is amazing too - I've washed it multiple times and it still looks brand new!",
        verified: true
      },
      {
        id: "review-002",
        author: "Morgan T.",
        date: "September 28, 2023",
        rating: 4,
        title: "Great quality basic tee",
        content: "Simple but perfect execution. The material feels premium and the stitching is solid. The fit is exactly as advertised.",
        verified: true
      },
      {
        id: "review-003",
        author: "Sam L.",
        date: "August 15, 2023",
        rating: 5,
        title: "Worth every penny",
        content: "Perfect balance between durability and comfort. This is my go-to t-shirt now for both casual and slightly dressier occasions.",
        verified: true
      }
    ]
  },
  {
    id: "tee-002",
    name: "KUNG FU THEATER TEE",
    description: "Channel the energy of classic martial arts cinema with our KUNG FU THEATER Tee. This shirt pays homage to the golden era of kung fu films with its bold, striking graphic featuring two masters in dynamic combat poses. Perfect for film buffs and martial arts enthusiasts alike, this conversation-starting design is printed on our ultra-soft premium cotton for all-day comfort.",
    price: 45.99,
    discountPrice: 39.99,
    currency: "USD",
    rating: 4.8,
    reviewCount: 94,
    images: [
      "/lovable-uploads/346d4c47-2765-4114-a22a-08a3c7e3eecd.png"
    ],
    variants: [
      {
        id: "variant-tee-002-1",
        color: "White",
        colorCode: "#FFFFFF",
        images: ["/lovable-uploads/346d4c47-2765-4114-a22a-08a3c7e3eecd.png"],
        sizes: [
          { id: "size-tee-002-1-s", size: "S", inStock: true },
          { id: "size-tee-002-1-m", size: "M", inStock: true },
          { id: "size-tee-002-1-l", size: "L", inStock: true },
          { id: "size-tee-002-1-xl", size: "XL", inStock: true },
          { id: "size-tee-002-1-xxl", size: "XXL", inStock: true },
          { id: "size-tee-002-1-xxxl", size: "XXXL", inStock: true }
        ]
      }
    ],
    features: [
      "100% organic cotton",
      "Regular fit",
      "High-quality screen printing",
      "Sustainable production"
    ],
    details: {
      "Material": "100% Organic Cotton",
      "Care": "Machine wash cold, tumble dry low",
      "Origin": "Made with pride"
    },
    new: true,
    reviews: []
  },
  {
    id: "tee-003",
    name: "SOULFUL SPACES BLUE DROP TEE",
    description: "Find your center with our SOULFUL SPACES Blue Drop Tee. This minimalist design features a serene water drop emblem surrounded by flowing lines that represent the harmony of natural elements. Made from ultra-soft, breathable cotton, this tee embodies tranquility and mindful living while offering premium comfort for your everyday journey.",
    price: 42.99,
    currency: "USD",
    rating: 4.9,
    reviewCount: 156,
    images: [
      "/lovable-uploads/a9d73d46-05f7-4265-9d98-9c04e8c83895.png"
    ],
    variants: [
      {
        id: "variant-tee-003-1",
        color: "White",
        colorCode: "#FFFFFF",
        images: ["/lovable-uploads/a9d73d46-05f7-4265-9d98-9c04e8c83895.png"],
        sizes: [
          { id: "size-tee-003-1-s", size: "S", inStock: true },
          { id: "size-tee-003-1-m", size: "M", inStock: true },
          { id: "size-tee-003-1-l", size: "L", inStock: true },
          { id: "size-tee-003-1-xl", size: "XL", inStock: true },
          { id: "size-tee-003-1-xxl", size: "XXL", inStock: true },
          { id: "size-tee-003-1-xxxl", size: "XXXL", inStock: false }
        ]
      }
    ],
    features: [
      "Premium cotton blend",
      "Regular fit",
      "Reinforced seams",
      "Pre-shrunk fabric"
    ],
    details: {
      "Material": "95% Cotton, 5% Elastane",
      "Care": "Machine wash cold, tumble dry low",
      "Origin": "Responsibly sourced"
    },
    reviews: []
  },
  {
    id: "tee-004",
    name: "SOULFUL SPACES RAINBOW DROP TEE",
    description: "Express your vibrant spirit with our SOULFUL SPACES Rainbow Drop Tee. This eye-catching design features a water droplet filled with a spectrum of colors, symbolizing the full range of human emotion and experience. Crafted from our signature soft cotton blend, this shirt combines meaningful symbolism with uncompromising comfort for the perfect premium casual wear.",
    price: 45.99,
    currency: "USD",
    rating: 4.7,
    reviewCount: 118,
    images: [
      "/lovable-uploads/81669a2d-26d3-499a-ac17-0ff4482d6e12.png"
    ],
    variants: [
      {
        id: "variant-tee-004-1",
        color: "White",
        colorCode: "#FFFFFF",
        images: ["/lovable-uploads/81669a2d-26d3-499a-ac17-0ff4482d6e12.png"],
        sizes: [
          { id: "size-tee-004-1-s", size: "S", inStock: true },
          { id: "size-tee-004-1-m", size: "M", inStock: true },
          { id: "size-tee-004-1-l", size: "L", inStock: true },
          { id: "size-tee-004-1-xl", size: "XL", inStock: true },
          { id: "size-tee-004-1-xxl", size: "XXL", inStock: true },
          { id: "size-tee-004-1-xxxl", size: "XXXL", inStock: true }
        ]
      }
    ],
    features: [
      "Premium cotton blend",
      "Regular fit",
      "High-quality print that won't fade",
      "Versatile styling options"
    ],
    details: {
      "Material": "95% Cotton, 5% Elastane",
      "Care": "Machine wash cold, hang dry",
      "Origin": "Ethically produced"
    },
    isExclusive: true,
    reviews: []
  },
  {
    id: "tee-005",
    name: "SOULFUL SPACES RETRO SUNSET TEE",
    description: "Embrace nostalgic vibes with our SOULFUL SPACES Retro Sunset Tee. This design brings together vintage aesthetics and modern sensibility with its gradient sunset colors and iconic droplet silhouette. The retro-inspired horizontal stripes evoke the calm of a perfect sunset by the water, while our premium cotton construction ensures this tee feels as good as it looks.",
    price: 47.99,
    currency: "USD",
    rating: 4.9,
    reviewCount: 87,
    images: [
      "/lovable-uploads/9a0a6587-ff0b-4bfe-8b42-3ce0faef2604.png"
    ],
    variants: [
      {
        id: "variant-tee-005-1",
        color: "White",
        colorCode: "#FFFFFF",
        images: ["/lovable-uploads/9a0a6587-ff0b-4bfe-8b42-3ce0faef2604.png"],
        sizes: [
          { id: "size-tee-005-1-s", size: "S", inStock: true },
          { id: "size-tee-005-1-m", size: "M", inStock: true },
          { id: "size-tee-005-1-l", size: "L", inStock: true },
          { id: "size-tee-005-1-xl", size: "XL", inStock: true },
          { id: "size-tee-005-1-xxl", size: "XXL", inStock: true },
          { id: "size-tee-005-1-xxxl", size: "XXXL", inStock: true }
        ]
      }
    ],
    features: [
      "100% premium cotton",
      "Regular fit",
      "Vintage wash finish",
      "Superior durability"
    ],
    details: {
      "Material": "100% Premium Cotton",
      "Care": "Machine wash cold, tumble dry low",
      "Origin": "Sustainably made"
    },
    new: true,
    reviews: []
  },
  {
    id: "tee-006",
    name: "BASIC HEAVYWEIGHT T-SHIRT",
    description: "A heavyweight t-shirt designed for durability and comfort with a classic silhouette.",
    price: 44.99,
    currency: "USD",
    rating: 4.7,
    reviewCount: 118,
    images: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    variants: [
      {
        id: "variant-tee-006-1",
        color: "Cream",
        colorCode: "#F5F5DC",
        images: ["https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"],
        sizes: [
          { id: "size-tee-006-1-s", size: "S", inStock: true },
          { id: "size-tee-006-1-m", size: "M", inStock: true },
          { id: "size-tee-006-1-l", size: "L", inStock: true },
          { id: "size-tee-006-1-xl", size: "XL", inStock: true },
          { id: "size-tee-006-1-xxl", size: "XXL", inStock: true },
          { id: "size-tee-006-1-xxxl", size: "XXXL", inStock: true }
        ]
      }
    ],
    features: [
      "Heavyweight cotton fabric",
      "Classic fit",
      "Reinforced collar",
      "Double-stitched seams"
    ],
    details: {
      "Material": "100% Heavy Cotton",
      "Care": "Machine wash cold, tumble dry low",
      "Origin": "Made in Portugal"
    },
    reviews: []
  },
  {
    id: "tee-007",
    name: "CORE CLASS LONGSLEEVE T-SHIRT",
    description: "A modern long sleeve t-shirt with clean lines and premium construction.",
    price: 54.99,
    currency: "USD",
    rating: 4.8,
    reviewCount: 97,
    images: [
      "https://images.unsplash.com/photo-1511746315387-c4a76990fdce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    variants: [
      {
        id: "variant-tee-007-1",
        color: "Black",
        colorCode: "#000000",
        images: ["https://images.unsplash.com/photo-1511746315387-c4a76990fdce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"],
        sizes: [
          { id: "size-tee-007-1-s", size: "S", inStock: true },
          { id: "size-tee-007-1-m", size: "M", inStock: true },
          { id: "size-tee-007-1-l", size: "L", inStock: true },
          { id: "size-tee-007-1-xl", size: "XL", inStock: true },
          { id: "size-tee-007-1-xxl", size: "XXL", inStock: true },
          { id: "size-tee-007-1-xxxl", size: "XXXL", inStock: true }
        ]
      }
    ],
    features: [
      "100% combed cotton",
      "Regular fit",
      "Ribbed cuffs",
      "Tagless design for comfort"
    ],
    details: {
      "Material": "100% Combed Cotton",
      "Care": "Machine wash cold, tumble dry low",
      "Origin": "Made in Portugal"
    },
    reviews: []
  },
  {
    id: "tee-008",
    name: "CORE CROSS LONGSLEEVE T-SHIRT",
    description: "A sophisticated long sleeve t-shirt with cross-stitch detailing and premium fabric.",
    price: 59.99,
    currency: "USD",
    rating: 4.9,
    reviewCount: 76,
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    variants: [
      {
        id: "variant-tee-008-1",
        color: "White",
        colorCode: "#FFFFFF",
        images: ["https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"],
        sizes: [
          { id: "size-tee-008-1-s", size: "S", inStock: true },
          { id: "size-tee-008-1-m", size: "M", inStock: true },
          { id: "size-tee-008-1-l", size: "L", inStock: true },
          { id: "size-tee-008-1-xl", size: "XL", inStock: true },
          { id: "size-tee-008-1-xxl", size: "XXL", inStock: true },
          { id: "size-tee-008-1-xxxl", size: "XXXL", inStock: true }
        ]
      }
    ],
    features: [
      "Premium cotton blend",
      "Relaxed fit",
      "Cross-stitch detail",
      "Extended length"
    ],
    details: {
      "Material": "95% Cotton, 5% Elastane",
      "Care": "Machine wash cold, lay flat to dry",
      "Origin": "Made in Portugal"
    },
    reviews: []
  },
];
