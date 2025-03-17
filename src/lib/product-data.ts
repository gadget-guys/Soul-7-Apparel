
export interface ProductVariant {
  id: string;
  color: string;
  colorCode: string;
  images: string[];
  sizes: SizeOption[];
}

export interface SizeOption {
  id: string;
  size: string;
  inStock: boolean;
}

export interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  title: string;
  content: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  currency: string;
  rating: number;
  reviewCount: number;
  images: string[];
  variants: ProductVariant[];
  features: string[];
  details: { [key: string]: string };
  reviews: Review[];
}

export const featuredProduct: Product = {
  id: "product-001",
  name: "Premium Wireless Headphones",
  description: "Experience superior sound quality with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and a comfortable over-ear design for extended listening sessions.",
  price: 299.99,
  discountPrice: 249.99,
  currency: "USD",
  rating: 4.8,
  reviewCount: 156,
  images: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1524678714210-9917a6c619c2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  ],
  variants: [
    {
      id: "variant-001",
      color: "Space Gray",
      colorCode: "#333333",
      images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"],
      sizes: [
        { id: "size-001", size: "Standard", inStock: true }
      ]
    },
    {
      id: "variant-002",
      color: "Silver",
      colorCode: "#DDDDDD",
      images: ["https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"],
      sizes: [
        { id: "size-002", size: "Standard", inStock: true }
      ]
    },
    {
      id: "variant-003",
      color: "Midnight Blue",
      colorCode: "#000080",
      images: ["https://images.unsplash.com/photo-1524678714210-9917a6c619c2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"],
      sizes: [
        { id: "size-003", size: "Standard", inStock: true }
      ]
    },
    {
      id: "variant-004",
      color: "Rose Gold",
      colorCode: "#B76E79",
      images: ["https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"],
      sizes: [
        { id: "size-004", size: "Standard", inStock: false }
      ]
    }
  ],
  features: [
    "Active Noise Cancellation",
    "Transparency mode",
    "30-hour battery life",
    "High-fidelity audio",
    "Bluetooth 5.2 connectivity",
    "Comfortable over-ear design",
    "Built-in microphone",
    "Touch controls",
    "Quick charge capability"
  ],
  details: {
    "Dimensions": "7.9 x 6.1 x 3.5 inches",
    "Weight": "250 grams",
    "Connectivity": "Bluetooth 5.2, 3.5mm audio jack",
    "Battery": "30 hours with ANC, 40 hours without",
    "Charging": "USB-C, 2 hours full charge",
    "Warranty": "1-year limited warranty"
  },
  reviews: [
    {
      id: "review-001",
      author: "Alex J.",
      date: "October 12, 2023",
      rating: 5,
      title: "Best headphones I've ever owned",
      content: "The sound quality is incredible, and the noise cancellation is top-notch. I can wear these for hours without any discomfort. Battery life is amazing too - I only need to charge them once a week with daily use!",
      verified: true
    },
    {
      id: "review-002",
      author: "Morgan T.",
      date: "September 28, 2023",
      rating: 4,
      title: "Great quality but took time to break in",
      content: "Sound quality is excellent, especially for classical music. The build quality feels premium. They were a bit tight at first but became more comfortable after a few weeks of use.",
      verified: true
    },
    {
      id: "review-003",
      author: "Sam L.",
      date: "August 15, 2023",
      rating: 5,
      title: "Worth every penny",
      content: "Perfect balance between bass and treble. The noise cancellation is perfect for my daily commute on the subway. Touch controls are intuitive and responsive.",
      verified: true
    }
  ]
};

export const relatedProducts: Product[] = [
  {
    id: "product-002",
    name: "Wireless Earbuds Pro",
    description: "Compact wireless earbuds with active noise cancellation and crystal-clear sound.",
    price: 159.99,
    currency: "USD",
    rating: 4.6,
    reviewCount: 98,
    images: [
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    variants: [],
    features: [],
    details: {},
    reviews: []
  },
  {
    id: "product-003",
    name: "Premium Headphone Stand",
    description: "Elegant aluminum stand to display and store your premium headphones.",
    price: 49.99,
    currency: "USD",
    rating: 4.9,
    reviewCount: 42,
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    variants: [],
    features: [],
    details: {},
    reviews: []
  },
  {
    id: "product-004",
    name: "Carrying Case",
    description: "Hard-shell protective case for your headphones with accessory pockets.",
    price: 39.99,
    currency: "USD",
    rating: 4.7,
    reviewCount: 76,
    images: [
      "https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    variants: [],
    features: [],
    details: {},
    reviews: []
  },
  {
    id: "product-005",
    name: "Replacement Ear Cushions",
    description: "Memory foam ear cushions for maximum comfort during long listening sessions.",
    price: 29.99,
    currency: "USD",
    rating: 4.5,
    reviewCount: 64,
    images: [
      "https://images.unsplash.com/photo-1585298723682-7115561c51b7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    variants: [],
    features: [],
    details: {},
    reviews: []
  }
];
