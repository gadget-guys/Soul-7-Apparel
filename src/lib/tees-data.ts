import { Product } from '@/lib/product-data';

export interface TeeProduct extends Product {
  soldOut?: boolean;
  new?: boolean;
  isExclusive?: boolean;
}

export const teesProducts: TeeProduct[] = [
  {
    id: "tee-001",
    name: "MAJOR T-SHIRT",
    description: "Here it's coming: the world's best t-shirt. Major d'Amore (pronounce 'dashmore'), surely named 'the Major Tee' like that for a purpose hidden inside while referencing a luxury design that doesn't go to the worn way 'everybody's fit on everyone would be a mother-demands hand level' only a classic. It, like in the type of shirt people hold onto for years.",
    price: 39.99,
    currency: "USD",
    rating: 4.7,
    reviewCount: 122,
    images: [
      "/lovable-uploads/cef185b6-a8ec-41e0-8dd2-d202755fe016.png",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    variants: [
      {
        id: "variant-tee-001-1",
        color: "Black",
        colorCode: "#000000",
        sizes: [
          { id: "size-tee-001-1-s", size: "S", inStock: true },
          { id: "size-tee-001-1-m", size: "M", inStock: true },
          { id: "size-tee-001-1-l", size: "L", inStock: true },
          { id: "size-tee-001-1-xl", size: "XL", inStock: true }
        ]
      },
      {
        id: "variant-tee-001-2",
        color: "White",
        colorCode: "#FFFFFF",
        sizes: [
          { id: "size-tee-001-2-s", size: "S", inStock: true },
          { id: "size-tee-001-2-m", size: "M", inStock: true },
          { id: "size-tee-001-2-l", size: "L", inStock: true },
          { id: "size-tee-001-2-xl", size: "XL", inStock: true }
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
      "SIZE": "105% TRUE ORGANIC COTTON BODY",
      "COLOR": "BLACK",
      "COMPOSITION": "95% COTTON/5% EL",
      "FIT": "REGULAR",
      "ORIGIN": "ITALY"
    },
    new: true,
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
    name: "Box Fit T-Shirt - Ready To Dye",
    description: "Oversized fit t-shirt with a boxy silhouette, perfect for a relaxed look.",
    price: 45.99,
    currency: "USD",
    rating: 4.5,
    reviewCount: 87,
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    variants: [
      {
        id: "variant-tee-002-1",
        color: "Light Grey",
        colorCode: "#D3D3D3",
        sizes: [
          { id: "size-tee-002-1-s", size: "S", inStock: true },
          { id: "size-tee-002-1-m", size: "M", inStock: true },
          { id: "size-tee-002-1-l", size: "L", inStock: true },
          { id: "size-tee-002-1-xl", size: "XL", inStock: true }
        ]
      }
    ],
    features: [
      "100% organic cotton",
      "Boxy, oversized fit",
      "Drop shoulder",
      "Sustainable production"
    ],
    details: {
      "Material": "100% Organic Cotton",
      "Care": "Machine wash cold, tumble dry low",
      "Origin": "Made in Portugal"
    },
    isExclusive: true,
    reviews: []
  },
  {
    id: "tee-003",
    name: "Major T-Shirt",
    description: "A premium t-shirt featuring a classic design with superior comfort and quality.",
    price: 42.99,
    currency: "USD",
    rating: 4.8,
    reviewCount: 156,
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    variants: [
      {
        id: "variant-tee-003-1",
        color: "Black",
        colorCode: "#000000",
        sizes: [
          { id: "size-tee-003-1-s", size: "S", inStock: true },
          { id: "size-tee-003-1-m", size: "M", inStock: true },
          { id: "size-tee-003-1-l", size: "L", inStock: true },
          { id: "size-tee-003-1-xl", size: "XL", inStock: true }
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
      "Origin": "Made in USA"
    },
    reviews: []
  },
  {
    id: "tee-004",
    name: "Ready-To-Dye Muscle T-Shirt",
    description: "Sleeveless muscle tee with a versatile design, perfect for layering or wearing on its own.",
    price: 39.99,
    currency: "USD",
    rating: 4.6,
    reviewCount: 92,
    images: [
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    variants: [
      {
        id: "variant-tee-004-1",
        color: "White",
        colorCode: "#FFFFFF",
        sizes: [
          { id: "size-tee-004-1-s", size: "S", inStock: true },
          { id: "size-tee-004-1-m", size: "M", inStock: true },
          { id: "size-tee-004-1-l", size: "L", inStock: true },
          { id: "size-tee-004-1-xl", size: "XL", inStock: true }
        ]
      }
    ],
    features: [
      "100% premium cotton",
      "Muscle fit",
      "Raw cut sleeves",
      "Versatile styling options"
    ],
    details: {
      "Material": "100% Premium Cotton",
      "Care": "Machine wash cold, hang dry",
      "Origin": "Made in Portugal"
    },
    reviews: []
  },
  {
    id: "tee-005",
    name: "Luxurious T-Shirt",
    description: "A premium quality t-shirt crafted from the finest materials for exceptional comfort.",
    price: 49.99,
    currency: "USD",
    rating: 4.9,
    reviewCount: 143,
    images: [
      "https://images.unsplash.com/photo-1521498542256-5aeb47ba2b36?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    variants: [
      {
        id: "variant-tee-005-1",
        color: "White",
        colorCode: "#FFFFFF",
        sizes: [
          { id: "size-tee-005-1-s", size: "S", inStock: true },
          { id: "size-tee-005-1-m", size: "M", inStock: true },
          { id: "size-tee-005-1-l", size: "L", inStock: true },
          { id: "size-tee-005-1-xl", size: "XL", inStock: true }
        ]
      }
    ],
    features: [
      "Luxury cotton blend",
      "Relaxed fit",
      "Hand-finished details",
      "Superior durability"
    ],
    details: {
      "Material": "98% Pima Cotton, 2% Elastane",
      "Care": "Hand wash or gentle machine cycle",
      "Origin": "Made in Italy"
    },
    reviews: []
  },
  {
    id: "tee-006",
    name: "Basic 14 Dye Heavyweight T-Shirt",
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
        sizes: [
          { id: "size-tee-006-1-s", size: "S", inStock: true },
          { id: "size-tee-006-1-m", size: "M", inStock: true },
          { id: "size-tee-006-1-l", size: "L", inStock: true },
          { id: "size-tee-006-1-xl", size: "XL", inStock: true }
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
    name: "Core Class Longsleeve T-Shirt",
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
        sizes: [
          { id: "size-tee-007-1-s", size: "S", inStock: true },
          { id: "size-tee-007-1-m", size: "M", inStock: true },
          { id: "size-tee-007-1-l", size: "L", inStock: true },
          { id: "size-tee-007-1-xl", size: "XL", inStock: true }
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
    name: "Ready-To-Dye Core Cross Longsleeve T-Shirt",
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
        sizes: [
          { id: "size-tee-008-1-s", size: "S", inStock: true },
          { id: "size-tee-008-1-m", size: "M", inStock: true },
          { id: "size-tee-008-1-l", size: "L", inStock: true },
          { id: "size-tee-008-1-xl", size: "XL", inStock: true }
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
