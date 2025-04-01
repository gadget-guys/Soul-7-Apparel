
import { type Product } from "./product-data";

// Extended type for Hoodie specific properties
export interface HoodieProduct extends Product {
  material?: string;
  isSustainable?: boolean;
  isExclusive?: boolean;
  soldOut?: boolean;
  new?: boolean;
}

export const hoodiesProducts: HoodieProduct[] = [
  {
    id: "hoodie-001",
    name: "Soul 7 Graphic Hoodie",
    description: "Express your unique spirit with this vibrant Soul 7 hoodie. Featuring an eye-catching typographic design with splashes of color against a neutral base, this premium hoodie combines artistic style with unbeatable comfort.",
    price: 79.99,
    currency: "USD",
    images: [
      "public/lovable-uploads/a902ba07-8f64-4fef-a504-57f5d4b46b1e.png",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    rating: 4.9,
    reviewCount: 142,
    new: true,
    isExclusive: true,
    material: "80% Cotton, 20% Polyester",
    features: [
      "Premium cotton blend fabric",
      "Vibrant graphic print",
      "Regular fit",
      "Drawstring hood",
      "Kangaroo pocket",
      "Ribbed cuffs and hem"
    ],
    details: {
      "Material": "80% Cotton, 20% Polyester",
      "Care": "Machine wash cold, tumble dry low",
      "Fit": "Regular fit",
      "Origin": "Imported",
      "Print": "High-quality digital print"
    },
    variants: [
      {
        id: "hoodie-001-gray",
        color: "Gray",
        colorCode: "#808080",
        images: [
          "public/lovable-uploads/a902ba07-8f64-4fef-a504-57f5d4b46b1e.png"
        ],
        sizes: [
          { id: "size-h-001-gray-s", size: "S", inStock: true },
          { id: "size-h-001-gray-m", size: "M", inStock: true },
          { id: "size-h-001-gray-l", size: "L", inStock: true },
          { id: "size-h-001-gray-xl", size: "XL", inStock: true },
          { id: "size-h-001-gray-xxl", size: "XXL", inStock: true },
          { id: "size-h-001-gray-xxxl", size: "XXXL", inStock: true }
        ]
      },
      {
        id: "hoodie-001-black",
        color: "Black",
        colorCode: "#000000",
        images: [
          "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        ],
        sizes: [
          { id: "size-h-001-black-s", size: "S", inStock: true },
          { id: "size-h-001-black-m", size: "M", inStock: true },
          { id: "size-h-001-black-l", size: "L", inStock: true },
          { id: "size-h-001-black-xl", size: "XL", inStock: true },
          { id: "size-h-001-black-xxl", size: "XXL", inStock: true },
          { id: "size-h-001-black-xxxl", size: "XXXL", inStock: true }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-h-001",
        author: "Alex",
        date: "2023-11-15",
        rating: 5,
        title: "Stands out in a crowd",
        content: "This hoodie gets me so many compliments whenever I wear it. The design is even better in person and the quality is excellent.",
        verified: true
      },
      {
        id: "rev-h-002",
        author: "Jordan",
        date: "2023-10-28",
        rating: 5,
        title: "Perfect fit and amazing design",
        content: "Absolutely love the Soul 7 design - it's unique and the print quality is outstanding. Comfortable and warm too!",
        verified: true
      }
    ]
  },
  {
    id: "hoodie-002",
    name: "Cosmic Explorer Hoodie",
    description: "Take a journey through the cosmos with our Cosmic Explorer hoodie. This otherworldly design features a mesmerizing space-themed pattern with planets, stars, and cosmic patterns in vibrant neon colors against a dark background.",
    price: 89.99,
    currency: "USD",
    images: [
      "public/lovable-uploads/83acd325-b580-4355-9a31-d03b85bce0b9.png",
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    rating: 4.8,
    reviewCount: 97,
    features: [
      "Premium heavyweight fabric",
      "All-over cosmic print design",
      "Regular fit",
      "Double-layered hood",
      "Kangaroo pocket",
      "Soft inner fleece lining"
    ],
    details: {
      "Material": "70% Cotton, 30% Polyester",
      "Care": "Machine wash cold, tumble dry low",
      "Fit": "Regular fit",
      "Origin": "Imported",
      "Print": "Durable sublimation print"
    },
    variants: [
      {
        id: "hoodie-002-cosmic",
        color: "Cosmic",
        colorCode: "#000080",
        images: [
          "public/lovable-uploads/83acd325-b580-4355-9a31-d03b85bce0b9.png"
        ],
        sizes: [
          { id: "size-h-002-cosmic-s", size: "S", inStock: true },
          { id: "size-h-002-cosmic-m", size: "M", inStock: true },
          { id: "size-h-002-cosmic-l", size: "L", inStock: true },
          { id: "size-h-002-cosmic-xl", size: "XL", inStock: true },
          { id: "size-h-002-cosmic-xxl", size: "XXL", inStock: true },
          { id: "size-h-002-cosmic-xxxl", size: "XXXL", inStock: true }
        ]
      },
      {
        id: "hoodie-002-navy",
        color: "Navy",
        colorCode: "#000080",
        images: [
          "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        ],
        sizes: [
          { id: "size-h-002-navy-s", size: "S", inStock: true },
          { id: "size-h-002-navy-m", size: "M", inStock: true },
          { id: "size-h-002-navy-l", size: "L", inStock: true },
          { id: "size-h-002-navy-xl", size: "XL", inStock: true },
          { id: "size-h-002-navy-xxl", size: "XXL", inStock: true },
          { id: "size-h-002-navy-xxxl", size: "XXXL", inStock: false }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-h-003",
        author: "Taylor",
        date: "2023-09-20",
        rating: 5,
        title: "Like wearing art",
        content: "The cosmic design is absolutely stunning. I get compliments every time I wear this. The fabric is thick and warm too.",
        verified: true
      },
      {
        id: "rev-h-009",
        author: "Morgan",
        date: "2023-12-12",
        rating: 4,
        title: "Great design, runs slightly large",
        content: "The print is fantastic and the colors are vibrant. Just be aware it runs a bit large, so consider sizing down.",
        verified: true
      }
    ]
  },
  {
    id: "hoodie-003",
    name: "Inspire Love & Live Hoodie",
    description: "Spread positivity with our Inspire hoodie, featuring uplifting words like 'Love', 'Live', and 'Smile' in vibrant typography. This colorful pullover hoodie combines an artistic design with comfortable fabric, perfect for making a statement.",
    price: 89.99,
    discountPrice: 74.99,
    currency: "USD",
    images: [
      "public/lovable-uploads/c4706b23-156a-4d6a-9f52-a3c9fca5ab49.png",
      "https://images.unsplash.com/photo-1605400791536-fff5681bdc96?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    rating: 4.9,
    reviewCount: 156,
    isExclusive: true,
    features: [
      "Premium heavyweight fabric",
      "Vibrant motivational design",
      "Relaxed fit",
      "Double-layered hood",
      "Split kangaroo pocket",
      "Soft brushed inner"
    ],
    details: {
      "Material": "90% Cotton, 10% Polyester",
      "Care": "Machine wash cold, hang dry",
      "Fit": "Relaxed fit",
      "Origin": "Imported",
      "Weight": "400 GSM"
    },
    variants: [
      {
        id: "hoodie-003-multicolor",
        color: "Multicolor",
        colorCode: "#ff80cc",
        images: [
          "public/lovable-uploads/c4706b23-156a-4d6a-9f52-a3c9fca5ab49.png"
        ],
        sizes: [
          { id: "size-h-003-multicolor-s", size: "S", inStock: true },
          { id: "size-h-003-multicolor-m", size: "M", inStock: true },
          { id: "size-h-003-multicolor-l", size: "L", inStock: true },
          { id: "size-h-003-multicolor-xl", size: "XL", inStock: true },
          { id: "size-h-003-multicolor-xxl", size: "XXL", inStock: true },
          { id: "size-h-003-multicolor-xxxl", size: "XXXL", inStock: true }
        ]
      },
      {
        id: "hoodie-003-beige",
        color: "Beige",
        colorCode: "#f5f5dc",
        images: [
          "https://images.unsplash.com/photo-1605400791536-fff5681bdc96?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        ],
        sizes: [
          { id: "size-h-003-beige-s", size: "S", inStock: true },
          { id: "size-h-003-beige-m", size: "M", inStock: true },
          { id: "size-h-003-beige-l", size: "L", inStock: true },
          { id: "size-h-003-beige-xl", size: "XL", inStock: true },
          { id: "size-h-003-beige-xxl", size: "XXL", inStock: true },
          { id: "size-h-003-beige-xxxl", size: "XXXL", inStock: false }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-h-004",
        author: "Morgan",
        date: "2023-12-05",
        rating: 5,
        title: "Brings joy every time I wear it",
        content: "The colors are so vibrant and the positive messages really do brighten my day. The hoodie is super comfortable too.",
        verified: true
      },
      {
        id: "rev-h-005",
        author: "Casey",
        date: "2023-11-18",
        rating: 5,
        title: "Perfect for spreading positivity",
        content: "This hoodie is exactly what I needed - comfortable, eye-catching, and full of good vibes. The design is even better in person.",
        verified: true
      }
    ]
  },
  {
    id: "hoodie-004",
    name: "Positive Vibes Dance Hoodie",
    description: "Celebrate life with our Positive Vibes Dance hoodie, featuring an artistic silhouette surrounded by uplifting words and vibrant splashes of color. This statement piece combines comfort with a powerful message of joy and positivity.",
    price: 84.99,
    currency: "USD",
    images: [
      "public/lovable-uploads/9b387197-7b54-4484-917c-68c3fb08641a.png",
      "https://images.unsplash.com/photo-1571781565036-d3f759be73e4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    rating: 4.7,
    reviewCount: 93,
    isSustainable: true,
    material: "75% Organic Cotton, 25% Recycled Polyester",
    features: [
      "Eco-friendly materials",
      "Colorful positive message design",
      "Unisex relaxed fit",
      "Adjustable drawstring hood",
      "Front kangaroo pocket",
      "Ribbed cuffs and hem"
    ],
    details: {
      "Material": "75% Organic Cotton, 25% Recycled Polyester",
      "Care": "Machine wash cold, hang dry",
      "Fit": "Relaxed fit",
      "Origin": "Ethically manufactured",
      "Features": "Eco-friendly inks"
    },
    variants: [
      {
        id: "hoodie-004-rainbow",
        color: "Rainbow",
        colorCode: "#ff80cc",
        images: [
          "public/lovable-uploads/9b387197-7b54-4484-917c-68c3fb08641a.png"
        ],
        sizes: [
          { id: "size-h-004-rainbow-s", size: "S", inStock: true },
          { id: "size-h-004-rainbow-m", size: "M", inStock: true },
          { id: "size-h-004-rainbow-l", size: "L", inStock: true },
          { id: "size-h-004-rainbow-xl", size: "XL", inStock: true },
          { id: "size-h-004-rainbow-xxl", size: "XXL", inStock: true },
          { id: "size-h-004-rainbow-xxxl", size: "XXXL", inStock: true }
        ]
      },
      {
        id: "hoodie-004-gray",
        color: "Gray",
        colorCode: "#808080",
        images: [
          "https://images.unsplash.com/photo-1571781565036-d3f759be73e4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        ],
        sizes: [
          { id: "size-h-004-gray-s", size: "S", inStock: true },
          { id: "size-h-004-gray-m", size: "M", inStock: true },
          { id: "size-h-004-gray-l", size: "L", inStock: true },
          { id: "size-h-004-gray-xl", size: "XL", inStock: true },
          { id: "size-h-004-gray-xxl", size: "XXL", inStock: true },
          { id: "size-h-004-gray-xxxl", size: "XXXL", inStock: false }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-h-006",
        author: "Riley",
        date: "2023-10-15",
        rating: 5,
        title: "A burst of positivity",
        content: "Love this hoodie so much! The colors are vibrant, the message is uplifting, and it's so comfortable. Worth every penny.",
        verified: true
      },
      {
        id: "rev-h-007",
        author: "Jamie",
        date: "2023-09-28",
        rating: 4,
        title: "Beautiful and comfortable",
        content: "The design is even more eye-catching in person. I appreciate that it's made with sustainable materials too.",
        verified: true
      }
    ]
  },
  {
    id: "hoodie-005",
    name: "Soul Vibes Portrait Hoodie",
    description: "Make a statement with our Soul Vibes Portrait hoodie, featuring a striking artistic face design surrounded by vibrant 'Love', 'Live', and 'Smile' typography. This bold, eye-catching hoodie combines urban art with supreme comfort.",
    price: 94.99,
    currency: "USD",
    images: [
      "public/lovable-uploads/068e168e-5a19-427b-8e71-e960f703fc9a.png",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    rating: 4.9,
    reviewCount: 78,
    new: true,
    features: [
      "Premium heavyweight fleece",
      "Artistic portrait design",
      "Neon color accents",
      "Relaxed, street-style fit",
      "Double-lined hood",
      "Reinforced kangaroo pocket"
    ],
    details: {
      "Material": "100% Premium Cotton",
      "Care": "Machine wash cold, tumble dry low",
      "Fit": "Relaxed fit",
      "Origin": "Imported",
      "Process": "Advanced digital printing"
    },
    variants: [
      {
        id: "hoodie-005-black",
        color: "Black",
        colorCode: "#000000",
        images: [
          "public/lovable-uploads/068e168e-5a19-427b-8e71-e960f703fc9a.png"
        ],
        sizes: [
          { id: "size-h-005-black-s", size: "S", inStock: true },
          { id: "size-h-005-black-m", size: "M", inStock: true },
          { id: "size-h-005-black-l", size: "L", inStock: true },
          { id: "size-h-005-black-xl", size: "XL", inStock: true },
          { id: "size-h-005-black-xxl", size: "XXL", inStock: true },
          { id: "size-h-005-black-xxxl", size: "XXXL", inStock: true }
        ]
      },
      {
        id: "hoodie-005-orange",
        color: "Orange",
        colorCode: "#ff8c00",
        images: [
          "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        ],
        sizes: [
          { id: "size-h-005-orange-s", size: "S", inStock: true },
          { id: "size-h-005-orange-m", size: "M", inStock: true },
          { id: "size-h-005-orange-l", size: "L", inStock: true },
          { id: "size-h-005-orange-xl", size: "XL", inStock: true },
          { id: "size-h-005-orange-xxl", size: "XXL", inStock: false },
          { id: "size-h-005-orange-xxxl", size: "XXXL", inStock: false }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-h-008",
        author: "Quinn",
        date: "2023-11-10",
        rating: 5,
        title: "Coolest hoodie I've ever owned",
        content: "The design is absolutely incredible - so vibrant and detailed. The hoodie itself is heavyweight and keeps me warm. Love it!",
        verified: true
      },
      {
        id: "rev-h-010",
        author: "Avery",
        date: "2023-10-25",
        rating: 5,
        title: "Art you can wear",
        content: "This hoodie is like wearing an art gallery. The print quality is phenomenal and hasn't faded after several washes.",
        verified: true
      }
    ]
  },
  {
    id: "hoodie-006",
    name: "Soul Queen Energy Hoodie",
    description: "Celebrate vibrant energy with our Soul Queen hoodie, featuring a striking portrait surrounded by the words 'Love', 'Live', and 'Soul' in neon colors. This premium hoodie combines eye-catching artwork with exceptional comfort.",
    price: 94.99,
    discountPrice: 84.99,
    currency: "USD",
    images: [
      "public/lovable-uploads/c4706b23-156a-4d6a-9f52-a3c9fca5ab49.png",
      "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    rating: 4.8,
    reviewCount: 112,
    isExclusive: true,
    features: [
      "Heavyweight premium fabric",
      "Vibrant portrait artwork",
      "Neon color accents",
      "Relaxed, comfortable fit",
      "Lined hood with drawstrings",
      "Spacious kangaroo pocket"
    ],
    details: {
      "Material": "85% Cotton, 15% Polyester",
      "Care": "Machine wash cold, tumble dry low",
      "Fit": "Relaxed fit",
      "Origin": "Imported",
      "Print": "High-definition digital print"
    },
    variants: [
      {
        id: "hoodie-006-gray",
        color: "Gray",
        colorCode: "#808080",
        images: [
          "public/lovable-uploads/c4706b23-156a-4d6a-9f52-a3c9fca5ab49.png"
        ],
        sizes: [
          { id: "size-h-006-gray-s", size: "S", inStock: true },
          { id: "size-h-006-gray-m", size: "M", inStock: true },
          { id: "size-h-006-gray-l", size: "L", inStock: true },
          { id: "size-h-006-gray-xl", size: "XL", inStock: true },
          { id: "size-h-006-gray-xxl", size: "XXL", inStock: true },
          { id: "size-h-006-gray-xxxl", size: "XXXL", inStock: true }
        ]
      },
      {
        id: "hoodie-006-green",
        color: "Green",
        colorCode: "#2e8b57",
        images: [
          "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        ],
        sizes: [
          { id: "size-h-006-green-s", size: "S", inStock: true },
          { id: "size-h-006-green-m", size: "M", inStock: true },
          { id: "size-h-006-green-l", size: "L", inStock: true },
          { id: "size-h-006-green-xl", size: "XL", inStock: true },
          { id: "size-h-006-green-xxl", size: "XXL", inStock: true },
          { id: "size-h-006-green-xxxl", size: "XXXL", inStock: false }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-h-011",
        author: "Jordan",
        date: "2024-01-05",
        rating: 5,
        title: "Absolutely stunning design",
        content: "I get compliments every time I wear this hoodie. The colors are vibrant, and the quality of both the print and the fabric is top-notch.",
        verified: true
      },
      {
        id: "rev-h-012",
        author: "Blake",
        date: "2023-12-18",
        rating: 4,
        title: "Bold, beautiful and warm",
        content: "Love the design and the material is thick and warm. Great for making a statement during colder months.",
        verified: true
      }
    ]
  }
];
