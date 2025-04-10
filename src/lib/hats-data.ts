import { type Product } from "./product-data";

// Extended type for Hat specific properties
export interface HatProduct extends Product {
  material?: string;
  isSustainable?: boolean;
  isExclusive?: boolean;
  soldOut?: boolean;
  new?: boolean;
  style?: string;
}

export const hatsProducts: HatProduct[] = [
  {
    id: "hat-001",
    name: "Classic Structured Cap",
    description: "A timeless structured cap with embroidered logo.",
    price: 34.99,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    rating: 4.7,
    reviewCount: 89,
    new: true,
    style: "Structured Cap",
    features: [
      "6-panel structured design",
      "Embroidered logo",
      "Adjustable snapback closure",
      "Premium cotton twill",
      "Moisture-wicking sweatband"
    ],
    details: {
      "Material": "100% Cotton Twill",
      "Care": "Spot clean only",
      "Origin": "Imported"
    },
    variants: [
      {
        id: "hat-001-black",
        color: "Black",
        colorCode: "#000000",
        images: [
          "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        ],
        sizes: [
          { id: "size-hat-001-os", size: "One Size", inStock: true }
        ]
      },
      {
        id: "hat-001-navy",
        color: "Navy",
        colorCode: "#000080",
        images: [
          "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        ],
        sizes: [
          { id: "size-hat-001-navy-os", size: "One Size", inStock: true }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-hat-001",
        author: "Chris",
        date: "2023-11-20",
        rating: 5,
        title: "Perfect fit",
        content: "The adjustable back makes this hat fit perfectly. Great quality and looks exactly as pictured.",
        verified: true
      },
      {
        id: "rev-hat-002",
        author: "Pat",
        date: "2023-10-15",
        rating: 4,
        title: "Great everyday cap",
        content: "I wear this almost daily now. The structure holds up well even after multiple wears.",
        verified: true
      }
    ]
  },
  {
    id: "hat-002",
    name: "Bucket Hat",
    description: "Trendy bucket hat made from durable cotton twill.",
    price: 29.99,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1582791694770-cbdc9dda338f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    rating: 4.5,
    reviewCount: 64,
    style: "Bucket Hat",
    features: [
      "All-around brim design",
      "Lightweight cotton fabric",
      "Breathable eyelets",
      "Packable design",
      "Casual, relaxed fit"
    ],
    details: {
      "Material": "100% Cotton Twill",
      "Care": "Machine wash cold, hang dry",
      "Origin": "Imported"
    },
    variants: [
      {
        id: "hat-002-tan",
        color: "Tan",
        colorCode: "#d2b48c",
        images: [
          "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        ],
        sizes: [
          { id: "size-hat-002-tan-sm", size: "S/M", inStock: true },
          { id: "size-hat-002-tan-lxl", size: "L/XL", inStock: true }
        ]
      },
      {
        id: "hat-002-black",
        color: "Black",
        colorCode: "#000000",
        images: [
          "https://images.unsplash.com/photo-1582791694770-cbdc9dda338f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        ],
        sizes: [
          { id: "size-hat-002-black-sm", size: "S/M", inStock: true },
          { id: "size-hat-002-black-lxl", size: "L/XL", inStock: true }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-hat-003",
        author: "Jordan",
        date: "2023-09-18",
        rating: 5,
        title: "Stylish and practical",
        content: "Love this bucket hat! It's great for sun protection and completes my outfit perfectly.",
        verified: true
      }
    ]
  },
  {
    id: "hat-003",
    name: "Premium Beanie",
    description: "Ultra-soft beanie with ribbed cuff for a secure fit.",
    price: 27.99,
    discountPrice: 22.99,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1576063892887-ae8e2b28f1d0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    rating: 4.8,
    reviewCount: 112,
    material: "100% Merino Wool",
    style: "Beanie",
    features: [
      "Premium merino wool construction",
      "Ribbed knit pattern",
      "Fold-over cuff design",
      "Extra stretch for comfort",
      "Temperature regulating material"
    ],
    details: {
      "Material": "100% Merino Wool",
      "Care": "Hand wash cold, lay flat to dry",
      "Origin": "Imported",
      "Warmth Level": "Medium-Heavy"
    },
    variants: [
      {
        id: "hat-003-gray",
        color: "Gray",
        colorCode: "#808080",
        images: [
          "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        ],
        sizes: [
          { id: "size-hat-003-gray-os", size: "One Size", inStock: true }
        ]
      },
      {
        id: "hat-003-red",
        color: "Red",
        colorCode: "#cc0000",
        images: [
          "https://images.unsplash.com/photo-1576063892887-ae8e2b28f1d0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        ],
        sizes: [
          { id: "size-hat-003-red-os", size: "One Size", inStock: true }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-hat-004",
        author: "Taylor",
        date: "2023-12-05",
        rating: 5,
        title: "So warm and comfortable",
        content: "This beanie is incredibly soft and keeps me warm in freezing temperatures. Worth every penny.",
        verified: true
      },
      {
        id: "rev-hat-005",
        author: "Alex",
        date: "2023-11-30",
        rating: 5,
        title: "Perfect winter essential",
        content: "The merino wool is so much better than my previous beanies. Not itchy at all and very warm.",
        verified: true
      }
    ]
  },
  {
    id: "hat-004",
    name: "Trucker Cap",
    description: "Classic trucker cap with mesh back for breathability.",
    price: 32.99,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    rating: 4.6,
    reviewCount: 76,
    style: "Trucker Cap",
    features: [
      "Structured front panels",
      "Breathable mesh back",
      "Snapback closure",
      "Slightly curved brim",
      "Embroidered eyelets"
    ],
    details: {
      "Material": "65% Polyester, 35% Cotton",
      "Care": "Spot clean only",
      "Origin": "Imported"
    },
    variants: [
      {
        id: "hat-004-blue",
        color: "Blue",
        colorCode: "#1e3a8a",
        images: [
          "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        ],
        sizes: [
          { id: "size-hat-004-blue-os", size: "One Size", inStock: true }
        ]
      },
      {
        id: "hat-004-black",
        color: "Black",
        colorCode: "#000000",
        images: [
          "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        ],
        sizes: [
          { id: "size-hat-004-black-os", size: "One Size", inStock: true }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-hat-006",
        author: "Jamie",
        date: "2023-10-20",
        rating: 5,
        title: "Great for summer",
        content: "The mesh back keeps my head cool even on hot days. The adjustable snap back fits perfectly.",
        verified: true
      }
    ]
  },
  {
    id: "hat-005",
    name: "Wide Brim Sun Hat",
    description: "Stylish wide brim hat offering excellent sun protection.",
    price: 39.99,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1565839751975-2281c7d2a587?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1587063690577-26711d52184e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    rating: 4.9,
    reviewCount: 54,
    isExclusive: true,
    style: "Sun Hat",
    features: [
      "Wide 3.5-inch brim",
      "UPF 50+ sun protection",
      "Interior adjustable drawstring",
      "Decorative band detail",
      "Packable design"
    ],
    details: {
      "Material": "Paper Straw",
      "Care": "Spot clean only",
      "Origin": "Imported",
      "Brim Width": "3.5 inches"
    },
    variants: [
      {
        id: "hat-005-straw",
        color: "Natural",
        colorCode: "#deb887",
        images: [
          "https://images.unsplash.com/photo-1565839751975-2281c7d2a587?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        ],
        sizes: [
          { id: "size-hat-005-straw-sm", size: "S/M", inStock: true },
          { id: "size-hat-005-straw-lxl", size: "L/XL", inStock: true }
        ]
      },
      {
        id: "hat-005-black",
        color: "Black",
        colorCode: "#000000",
        images: [
          "https://images.unsplash.com/photo-1587063690577-26711d52184e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        ],
        sizes: [
          { id: "size-hat-005-black-sm", size: "S/M", inStock: true },
          { id: "size-hat-005-black-lxl", size: "L/XL", inStock: true }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-hat-007",
        author: "Morgan",
        date: "2023-08-15",
        rating: 5,
        title: "Perfect beach accessory",
        content: "This hat saved me during my beach vacation. Great sun protection and still looks fashionable.",
        verified: true
      },
      {
        id: "rev-hat-008",
        author: "Casey",
        date: "2023-07-28",
        rating: 5,
        title: "Chic and functional",
        content: "I get so many compliments on this hat. It's sturdy enough to hold its shape but still packable.",
        verified: true
      }
    ]
  }
];
