
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
          { id: "size-h-001-s", size: "S", inStock: true },
          { id: "size-h-001-m", size: "M", inStock: true },
          { id: "size-h-001-l", size: "L", inStock: true },
          { id: "size-h-001-xl", size: "XL", inStock: true }
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
          { id: "size-h-001-gray-s", size: "S", inStock: true },
          { id: "size-h-001-gray-m", size: "M", inStock: true },
          { id: "size-h-001-gray-l", size: "L", inStock: true },
          { id: "size-h-001-gray-xl", size: "XL", inStock: true }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-h-001",
        author: "Alex",
        date: "2023-11-15",
        rating: 5,
        title: "Perfect hoodie",
        content: "This hoodie is exactly what I was looking for. Excellent quality and very comfortable.",
        verified: true
      },
      {
        id: "rev-h-002",
        author: "Jordan",
        date: "2023-10-28",
        rating: 4,
        title: "Great but runs small",
        content: "Love the quality but it runs a bit small. Should have sized up.",
        verified: true
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
          { id: "size-h-002-white-s", size: "S", inStock: true },
          { id: "size-h-002-white-m", size: "M", inStock: true },
          { id: "size-h-002-white-l", size: "L", inStock: true },
          { id: "size-h-002-white-xl", size: "XL", inStock: true }
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
          { id: "size-h-002-navy-xl", size: "XL", inStock: true }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-h-003",
        author: "Taylor",
        date: "2023-09-20",
        rating: 5,
        title: "Love the oversized fit",
        content: "Perfect oversized fit without being too baggy. Material is super soft!",
        verified: true
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
          { id: "size-h-003-black-s", size: "S", inStock: true },
          { id: "size-h-003-black-m", size: "M", inStock: true },
          { id: "size-h-003-black-l", size: "L", inStock: true },
          { id: "size-h-003-black-xl", size: "XL", inStock: true }
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
          { id: "size-h-003-beige-xl", size: "XL", inStock: true }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-h-004",
        author: "Morgan",
        date: "2023-12-05",
        rating: 5,
        title: "Worth every penny",
        content: "The quality of this hoodie is exceptional. The zipper is smooth and the fabric is amazing.",
        verified: true
      },
      {
        id: "rev-h-005",
        author: "Casey",
        date: "2023-11-18",
        rating: 5,
        title: "Best hoodie I own",
        content: "This is now my go-to hoodie. Perfect for layering and stays comfortable all day.",
        verified: true
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
          { id: "size-h-004-blue-s", size: "S", inStock: true },
          { id: "size-h-004-blue-m", size: "M", inStock: true },
          { id: "size-h-004-blue-l", size: "L", inStock: true },
          { id: "size-h-004-blue-xl", size: "XL", inStock: true }
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
          { id: "size-h-004-gray-xl", size: "XL", inStock: true }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-h-006",
        author: "Riley",
        date: "2023-10-15",
        rating: 5,
        title: "Perfect for workouts",
        content: "Great for running in colder weather. Wicks away sweat and keeps me at the perfect temperature.",
        verified: true
      },
      {
        id: "rev-h-007",
        author: "Jamie",
        date: "2023-09-28",
        rating: 4,
        title: "Good for the gym",
        content: "I use this for my morning workouts and it's been excellent. Durable and comfortable.",
        verified: true
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
          { id: "size-h-005-green-s", size: "S", inStock: false },
          { id: "size-h-005-green-m", size: "M", inStock: false },
          { id: "size-h-005-green-l", size: "L", inStock: false },
          { id: "size-h-005-green-xl", size: "XL", inStock: false }
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
          { id: "size-h-005-orange-s", size: "S", inStock: false },
          { id: "size-h-005-orange-m", size: "M", inStock: false },
          { id: "size-h-005-orange-l", size: "L", inStock: false },
          { id: "size-h-005-orange-xl", size: "XL", inStock: false }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-h-008",
        author: "Quinn",
        date: "2023-08-10",
        rating: 5,
        title: "Amazing vintage feel",
        content: "This hoodie feels like I've had it for years from day one. Super comfortable!",
        verified: true
      }
    ]
  }
];
