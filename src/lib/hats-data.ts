
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
    variants: [
      {
        id: "hat-001-black",
        color: "Black",
        colorCode: "#000000",
        images: [
          "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        ],
        sizes: [
          { size: "One Size", stock: 25 }
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
          { size: "One Size", stock: 18 }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-hat-001",
        user: "Chris",
        rating: 5,
        date: "2023-11-20",
        title: "Perfect fit",
        comment: "The adjustable back makes this hat fit perfectly. Great quality and looks exactly as pictured."
      },
      {
        id: "rev-hat-002",
        user: "Pat",
        rating: 4,
        date: "2023-10-15",
        title: "Great everyday cap",
        comment: "I wear this almost daily now. The structure holds up well even after multiple wears."
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
    variants: [
      {
        id: "hat-002-tan",
        color: "Tan",
        colorCode: "#d2b48c",
        images: [
          "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        ],
        sizes: [
          { size: "S/M", stock: 15 },
          { size: "L/XL", stock: 12 }
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
          { size: "S/M", stock: 10 },
          { size: "L/XL", stock: 8 }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-hat-003",
        user: "Jordan",
        rating: 5,
        date: "2023-09-18",
        title: "Stylish and practical",
        comment: "Love this bucket hat! It's great for sun protection and completes my outfit perfectly."
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
    variants: [
      {
        id: "hat-003-gray",
        color: "Gray",
        colorCode: "#808080",
        images: [
          "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        ],
        sizes: [
          { size: "One Size", stock: 20 }
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
          { size: "One Size", stock: 15 }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-hat-004",
        user: "Taylor",
        rating: 5,
        date: "2023-12-05",
        title: "So warm and comfortable",
        comment: "This beanie is incredibly soft and keeps me warm in freezing temperatures. Worth every penny."
      },
      {
        id: "rev-hat-005",
        user: "Alex",
        rating: 5,
        date: "2023-11-30",
        title: "Perfect winter essential",
        comment: "The merino wool is so much better than my previous beanies. Not itchy at all and very warm."
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
    variants: [
      {
        id: "hat-004-blue",
        color: "Blue",
        colorCode: "#1e3a8a",
        images: [
          "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        ],
        sizes: [
          { size: "One Size", stock: 18 }
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
          { size: "One Size", stock: 14 }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-hat-006",
        user: "Jamie",
        rating: 5,
        date: "2023-10-20",
        title: "Great for summer",
        comment: "The mesh back keeps my head cool even on hot days. The adjustable snap back fits perfectly."
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
    variants: [
      {
        id: "hat-005-straw",
        color: "Natural",
        colorCode: "#deb887",
        images: [
          "https://images.unsplash.com/photo-1565839751975-2281c7d2a587?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        ],
        sizes: [
          { size: "S/M", stock: 12 },
          { size: "L/XL", stock: 9 }
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
          { size: "S/M", stock: 8 },
          { size: "L/XL", stock: 6 }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-hat-007",
        user: "Morgan",
        rating: 5,
        date: "2023-08-15",
        title: "Perfect beach accessory",
        comment: "This hat saved me during my beach vacation. Great sun protection and still looks fashionable."
      },
      {
        id: "rev-hat-008",
        user: "Casey",
        rating: 5,
        date: "2023-07-28",
        title: "Chic and functional",
        comment: "I get so many compliments on this hat. It's sturdy enough to hold its shape but still packable."
      }
    ]
  }
];
