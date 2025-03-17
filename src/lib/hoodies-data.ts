
import { type Product } from "./product-data";

// Extended type for Tee specific properties
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
    name: "Essential Pullover Hoodie",
    description: "A comfortable pullover hoodie made from premium cotton blend.",
    price: 69.99,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    rating: 4.8,
    reviewCount: 124,
    new: true,
    material: "80% Cotton, 20% Polyester",
    variants: [
      {
        id: "hoodie-001-black",
        color: "Black",
        colorCode: "#000000",
        images: [
          "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        ],
        sizes: [
          { size: "S", stock: 15 },
          { size: "M", stock: 20 },
          { size: "L", stock: 10 },
          { size: "XL", stock: 5 }
        ]
      },
      {
        id: "hoodie-001-gray",
        color: "Gray",
        colorCode: "#808080",
        images: [
          "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        ],
        sizes: [
          { size: "S", stock: 8 },
          { size: "M", stock: 15 },
          { size: "L", stock: 12 },
          { size: "XL", stock: 7 }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-h-001",
        user: "Alex",
        rating: 5,
        date: "2023-11-15",
        title: "Perfect hoodie",
        comment: "This hoodie is exactly what I was looking for. Excellent quality and very comfortable."
      },
      {
        id: "rev-h-002",
        user: "Jordan",
        rating: 4,
        date: "2023-10-28",
        title: "Great but runs small",
        comment: "Love the quality but it runs a bit small. Should have sized up."
      }
    ]
  },
  {
    id: "hoodie-002",
    name: "Oversized Logo Hoodie",
    description: "Oversized fit hoodie with embroidered logo on chest.",
    price: 79.99,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    rating: 4.6,
    reviewCount: 87,
    variants: [
      {
        id: "hoodie-002-white",
        color: "White",
        colorCode: "#ffffff",
        images: [
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        ],
        sizes: [
          { size: "S", stock: 10 },
          { size: "M", stock: 18 },
          { size: "L", stock: 15 },
          { size: "XL", stock: 8 }
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
          { size: "S", stock: 5 },
          { size: "M", stock: 10 },
          { size: "L", stock: 8 },
          { size: "XL", stock: 3 }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-h-003",
        user: "Taylor",
        rating: 5,
        date: "2023-09-20",
        title: "Love the oversized fit",
        comment: "Perfect oversized fit without being too baggy. Material is super soft!"
      }
    ]
  },
  {
    id: "hoodie-003",
    name: "Premium Zip-Up Hoodie",
    description: "Luxury zip-up hoodie with minimal design and premium feel.",
    price: 89.99,
    discountPrice: 74.99,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1643584549095-8a866d936f2f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1605400791536-fff5681bdc96?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    rating: 4.9,
    reviewCount: 156,
    isExclusive: true,
    variants: [
      {
        id: "hoodie-003-black",
        color: "Black",
        colorCode: "#000000",
        images: [
          "https://images.unsplash.com/photo-1643584549095-8a866d936f2f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        ],
        sizes: [
          { size: "S", stock: 12 },
          { size: "M", stock: 25 },
          { size: "L", stock: 18 },
          { size: "XL", stock: 10 }
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
          { size: "S", stock: 8 },
          { size: "M", stock: 15 },
          { size: "L", stock: 10 },
          { size: "XL", stock: 5 }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-h-004",
        user: "Morgan",
        rating: 5,
        date: "2023-12-05",
        title: "Worth every penny",
        comment: "The quality of this hoodie is exceptional. The zipper is smooth and the fabric is amazing."
      },
      {
        id: "rev-h-005",
        user: "Casey",
        rating: 5,
        date: "2023-11-18",
        title: "Best hoodie I own",
        comment: "This is now my go-to hoodie. Perfect for layering and stays comfortable all day."
      }
    ]
  },
  {
    id: "hoodie-004",
    name: "Athletic Performance Hoodie",
    description: "Technical hoodie designed for workouts and active lifestyles.",
    price: 84.99,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1551854838-212c9a5926fe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1571781565036-d3f759be73e4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    rating: 4.7,
    reviewCount: 93,
    isSustainable: true,
    material: "75% Recycled Polyester, 25% Elastane",
    variants: [
      {
        id: "hoodie-004-blue",
        color: "Blue",
        colorCode: "#1e3a8a",
        images: [
          "https://images.unsplash.com/photo-1551854838-212c9a5926fe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        ],
        sizes: [
          { size: "S", stock: 15 },
          { size: "M", stock: 22 },
          { size: "L", stock: 18 },
          { size: "XL", stock: 10 }
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
          { size: "S", stock: 8 },
          { size: "M", stock: 14 },
          { size: "L", stock: 12 },
          { size: "XL", stock: 6 }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-h-006",
        user: "Riley",
        rating: 5,
        date: "2023-10-15",
        title: "Perfect for workouts",
        comment: "Great for running in colder weather. Wicks away sweat and keeps me at the perfect temperature."
      },
      {
        id: "rev-h-007",
        user: "Jamie",
        rating: 4,
        date: "2023-09-28",
        title: "Good for the gym",
        comment: "I use this for my morning workouts and it's been excellent. Durable and comfortable."
      }
    ]
  },
  {
    id: "hoodie-005",
    name: "Vintage Washed Hoodie",
    description: "Pre-washed for a lived-in feel and vintage aesthetic.",
    price: 74.99,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    rating: 4.5,
    reviewCount: 78,
    soldOut: true,
    variants: [
      {
        id: "hoodie-005-green",
        color: "Green",
        colorCode: "#2e8b57",
        images: [
          "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        ],
        sizes: [
          { size: "S", stock: 0 },
          { size: "M", stock: 0 },
          { size: "L", stock: 0 },
          { size: "XL", stock: 0 }
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
          { size: "S", stock: 0 },
          { size: "M", stock: 0 },
          { size: "L", stock: 0 },
          { size: "XL", stock: 0 }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-h-008",
        user: "Quinn",
        rating: 5,
        date: "2023-08-10",
        title: "Amazing vintage feel",
        comment: "This hoodie feels like I've had it for years from day one. Super comfortable!"
      }
    ]
  }
];
