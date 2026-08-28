import { Product, Category } from "@/types/database";

export const EXIDE_CATEGORIES: Category[] = [
  {
    "id": "b0000000-0000-0000-0000-000000000001",
    "category_name": "Inverter Tubular Batteries",
    "description": "Heavy duty deep-cycle tall tubular & short tubular backup batteries",
    "status": "active",
    "created_at": "2026-08-28T00:00:00.000Z"
  },
  {
    "id": "b0000000-0000-0000-0000-000000000002",
    "category_name": "Inverters & Home UPS",
    "description": "Pure sine wave inverters, copper transformer systems & lithium smart UPS",
    "status": "active",
    "created_at": "2026-08-28T00:00:00.000Z"
  },
  {
    "id": "b0000000-0000-0000-0000-000000000003",
    "category_name": "Car & Passenger Vehicle Batteries",
    "description": "Passenger cars, luxury AGM, micro-hybrid ISS, and taxi fleet batteries",
    "status": "active",
    "created_at": "2026-08-28T00:00:00.000Z"
  },
  {
    "id": "b0000000-0000-0000-0000-000000000004",
    "category_name": "Two Wheeler Batteries",
    "description": "Factory-charged AGM VRLA motorcycle & scooter starter batteries",
    "status": "active",
    "created_at": "2026-08-28T00:00:00.000Z"
  },
  {
    "id": "b0000000-0000-0000-0000-000000000005",
    "category_name": "Commercial & Heavy Vehicle Batteries",
    "description": "Multi-axle trucks, trailers, buses, earthmovers, and farm tractors",
    "status": "active",
    "created_at": "2026-08-28T00:00:00.000Z"
  },
  {
    "id": "b0000000-0000-0000-0000-000000000006",
    "category_name": "Three Wheeler & E-Rickshaw Batteries",
    "description": "Auto-rickshaws, cargo loaders, and deep-cycle tubular e-rickshaws",
    "status": "active",
    "created_at": "2026-08-28T00:00:00.000Z"
  },
  {
    "id": "b0000000-0000-0000-0000-000000000007",
    "category_name": "Genset & Solar Batteries",
    "description": "Diesel generator instant high-CCA starting and Solar C10 deep-cycle storage",
    "status": "active",
    "created_at": "2026-08-28T00:00:00.000Z"
  },
  {
    "id": "b0000000-0000-0000-0000-000000000008",
    "category_name": "Industrial & Standby Power",
    "description": "Powersafe SMF VRLA, 2V deep standby power cells, and Plante battery banks",
    "status": "active",
    "created_at": "2026-08-28T00:00:00.000Z"
  }
];

export const EXIDE_PRODUCTS: Product[] = [
  {
    "id": "d0000000-0000-0000-0000-000000000100",
    "link": "exide-exide-epiq-epiq35l",
    "image_url": "/products/EPIQ35L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Epiq",
    "brand_name": "Exide",
    "model_sku": "EPIQ35L",
    "capacity": "35 Ah",
    "voltage": "12V",
    "plate_technology": "Penta Alloy Advanced",
    "total_warranty_months": 77,
    "foc_months": 42,
    "pro_rata_months": 35,
    "approx_mrp": 6250,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Maruti Alto 800/K10, WagonR Petrol, Swift Petrol, Celerio, Ignis, S-Presso",
      "compatible_applications": [
        "Maruti Alto 800/K10",
        "WagonR Petrol",
        "Swift Petrol",
        "Celerio",
        "Ignis",
        "S-Presso"
      ],
      "features": [
        "Penta Alloy Advanced metallurgy & engineering",
        "77 Months Total Warranty (42M Free Replacement + 35M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Maruti Alto 800/K10, WagonR Petrol, Swift Petrol, Celerio, Ignis, S-Presso"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000101",
    "link": "exide-exide-epiq-epiq35r",
    "image_url": "/products/EPIQ35R.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Epiq",
    "brand_name": "Exide",
    "model_sku": "EPIQ35R",
    "capacity": "35 Ah",
    "voltage": "12V",
    "plate_technology": "Penta Alloy Advanced",
    "total_warranty_months": 77,
    "foc_months": 42,
    "pro_rata_months": 35,
    "approx_mrp": 6250,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Right (R)",
      "application": "Hyundai Santro, Eon, i10 Petrol, Datsun Go, Renault Kwid 0.8",
      "compatible_applications": [
        "Hyundai Santro",
        "Eon",
        "i10 Petrol",
        "Datsun Go",
        "Renault Kwid 0.8"
      ],
      "features": [
        "Penta Alloy Advanced metallurgy & engineering",
        "77 Months Total Warranty (42M Free Replacement + 35M Pro-Rata)",
        "Layout / Form Factor: Right (R)",
        "Application: Hyundai Santro, Eon, i10 Petrol, Datsun Go, Renault Kwid 0.8"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000102",
    "link": "exide-exide-epiq-epiq45l",
    "image_url": "/products/EPIQ45L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Epiq",
    "brand_name": "Exide",
    "model_sku": "EPIQ45L",
    "capacity": "45 Ah",
    "voltage": "12V",
    "plate_technology": "Penta Alloy Advanced",
    "total_warranty_months": 77,
    "foc_months": 42,
    "pro_rata_months": 35,
    "approx_mrp": 7600,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Honda City i-VTEC, Amaze Petrol, Hyundai Elite i20, Venue Petrol, Kia Sonet",
      "compatible_applications": [
        "Honda City i-VTEC",
        "Amaze Petrol",
        "Hyundai Elite i20",
        "Venue Petrol",
        "Kia Sonet"
      ],
      "features": [
        "Penta Alloy Advanced metallurgy & engineering",
        "77 Months Total Warranty (42M Free Replacement + 35M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Honda City i-VTEC, Amaze Petrol, Hyundai Elite i20, Venue Petrol, Kia Sonet"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000103",
    "link": "exide-exide-epiq-epiq45r",
    "image_url": "/products/EPIQ45R.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Epiq",
    "brand_name": "Exide",
    "model_sku": "EPIQ45R",
    "capacity": "45 Ah",
    "voltage": "12V",
    "plate_technology": "Penta Alloy Advanced",
    "total_warranty_months": 77,
    "foc_months": 42,
    "pro_rata_months": 35,
    "approx_mrp": 7600,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Right (R)",
      "application": "Maruti SX4 Petrol, Mitsubishi Lancer, Older Hyundai Accent/Verna",
      "compatible_applications": [
        "Maruti SX4 Petrol",
        "Mitsubishi Lancer",
        "Older Hyundai Accent/Verna"
      ],
      "features": [
        "Penta Alloy Advanced metallurgy & engineering",
        "77 Months Total Warranty (42M Free Replacement + 35M Pro-Rata)",
        "Layout / Form Factor: Right (R)",
        "Application: Maruti SX4 Petrol, Mitsubishi Lancer, Older Hyundai Accent/Verna"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000104",
    "link": "exide-exide-epiq-epiq55l",
    "image_url": "/products/EPIQ55L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Epiq",
    "brand_name": "Exide",
    "model_sku": "EPIQ55L",
    "capacity": "55 Ah",
    "voltage": "12V",
    "plate_technology": "Penta Alloy Advanced",
    "total_warranty_months": 77,
    "foc_months": 42,
    "pro_rata_months": 35,
    "approx_mrp": 8950,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Hyundai Creta Diesel, Kia Seltos Diesel, Brezza Diesel, Tata Nexon Diesel",
      "compatible_applications": [
        "Hyundai Creta Diesel",
        "Kia Seltos Diesel",
        "Brezza Diesel",
        "Tata Nexon Diesel"
      ],
      "features": [
        "Penta Alloy Advanced metallurgy & engineering",
        "77 Months Total Warranty (42M Free Replacement + 35M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Hyundai Creta Diesel, Kia Seltos Diesel, Brezza Diesel, Tata Nexon Diesel"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000105",
    "link": "exide-exide-epiq-epiq55r",
    "image_url": "/products/EPIQ55R.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Epiq",
    "brand_name": "Exide",
    "model_sku": "EPIQ55R",
    "capacity": "55 Ah",
    "voltage": "12V",
    "plate_technology": "Penta Alloy Advanced",
    "total_warranty_months": 77,
    "foc_months": 42,
    "pro_rata_months": 35,
    "approx_mrp": 8950,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Right (R)",
      "application": "Tata Indigo Diesel, Tata Bolt Diesel, Fiat Punto Diesel, Linea",
      "compatible_applications": [
        "Tata Indigo Diesel",
        "Tata Bolt Diesel",
        "Fiat Punto Diesel",
        "Linea"
      ],
      "features": [
        "Penta Alloy Advanced metallurgy & engineering",
        "77 Months Total Warranty (42M Free Replacement + 35M Pro-Rata)",
        "Layout / Form Factor: Right (R)",
        "Application: Tata Indigo Diesel, Tata Bolt Diesel, Fiat Punto Diesel, Linea"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000106",
    "link": "exide-exide-epiq-epiq65d26l",
    "image_url": "/products/EPIQ65D26L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Epiq",
    "brand_name": "Exide",
    "model_sku": "EPIQ65D26L",
    "capacity": "65 Ah",
    "voltage": "12V",
    "plate_technology": "Penta Alloy Advanced",
    "total_warranty_months": 77,
    "foc_months": 42,
    "pro_rata_months": 35,
    "approx_mrp": 10500,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Toyota Innova Crysta Petrol/Diesel, Mahindra Scorpio, Safari, Harrier",
      "compatible_applications": [
        "Toyota Innova Crysta Petrol/Diesel",
        "Mahindra Scorpio",
        "Safari",
        "Harrier"
      ],
      "features": [
        "Penta Alloy Advanced metallurgy & engineering",
        "77 Months Total Warranty (42M Free Replacement + 35M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Toyota Innova Crysta Petrol/Diesel, Mahindra Scorpio, Safari, Harrier"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000107",
    "link": "exide-exide-epiq-epiq65d26r",
    "image_url": "/products/EPIQ65D26R.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Epiq",
    "brand_name": "Exide",
    "model_sku": "EPIQ65D26R",
    "capacity": "65 Ah",
    "voltage": "12V",
    "plate_technology": "Penta Alloy Advanced",
    "total_warranty_months": 77,
    "foc_months": 42,
    "pro_rata_months": 35,
    "approx_mrp": 10500,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Right (R)",
      "application": "Mahindra Bolero, Xylo, Tata Sumo Grande, Scorpio M2Di",
      "compatible_applications": [
        "Mahindra Bolero",
        "Xylo",
        "Tata Sumo Grande",
        "Scorpio M2Di"
      ],
      "features": [
        "Penta Alloy Advanced metallurgy & engineering",
        "77 Months Total Warranty (42M Free Replacement + 35M Pro-Rata)",
        "Layout / Form Factor: Right (R)",
        "Application: Mahindra Bolero, Xylo, Tata Sumo Grande, Scorpio M2Di"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000108",
    "link": "exide-exide-epiq-epiqdin50",
    "image_url": "/products/EPIQDIN50.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Epiq",
    "brand_name": "Exide",
    "model_sku": "EPIQDIN50",
    "capacity": "50 Ah",
    "voltage": "12V",
    "plate_technology": "European DIN Penta Alloy",
    "total_warranty_months": 77,
    "foc_months": 42,
    "pro_rata_months": 35,
    "approx_mrp": 9400,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "DIN Left",
      "application": "VW Polo Petrol, Vento Petrol, Skoda Rapid Petrol, Ford Figo Petrol",
      "compatible_applications": [
        "VW Polo Petrol",
        "Vento Petrol",
        "Skoda Rapid Petrol",
        "Ford Figo Petrol"
      ],
      "features": [
        "European DIN Penta Alloy metallurgy & engineering",
        "77 Months Total Warranty (42M Free Replacement + 35M Pro-Rata)",
        "Layout / Form Factor: DIN Left",
        "Application: VW Polo Petrol, Vento Petrol, Skoda Rapid Petrol, Ford Figo Petrol"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000109",
    "link": "exide-exide-epiq-epiqdin55",
    "image_url": "/products/EPIQDIN55.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Epiq",
    "brand_name": "Exide",
    "model_sku": "EPIQDIN55",
    "capacity": "55 Ah",
    "voltage": "12V",
    "plate_technology": "European DIN Penta Alloy",
    "total_warranty_months": 77,
    "foc_months": 42,
    "pro_rata_months": 35,
    "approx_mrp": 10800,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "DIN Left",
      "application": "VW Polo Diesel, Skoda Rapid Diesel, Fiat Linea, Jeep Compass Petrol",
      "compatible_applications": [
        "VW Polo Diesel",
        "Skoda Rapid Diesel",
        "Fiat Linea",
        "Jeep Compass Petrol"
      ],
      "features": [
        "European DIN Penta Alloy metallurgy & engineering",
        "77 Months Total Warranty (42M Free Replacement + 35M Pro-Rata)",
        "Layout / Form Factor: DIN Left",
        "Application: VW Polo Diesel, Skoda Rapid Diesel, Fiat Linea, Jeep Compass Petrol"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000110",
    "link": "exide-exide-epiq-epiqdin60",
    "image_url": "/products/EPIQDIN60.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Epiq",
    "brand_name": "Exide",
    "model_sku": "EPIQDIN60",
    "capacity": "60 Ah",
    "voltage": "12V",
    "plate_technology": "European DIN Penta Alloy",
    "total_warranty_months": 77,
    "foc_months": 42,
    "pro_rata_months": 35,
    "approx_mrp": 11900,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "DIN Left",
      "application": "Hyundai Creta SX(O), Skoda Kushaq, VW Taigun, MG Hector Petrol",
      "compatible_applications": [
        "Hyundai Creta SX(O)",
        "Skoda Kushaq",
        "VW Taigun",
        "MG Hector Petrol"
      ],
      "features": [
        "European DIN Penta Alloy metallurgy & engineering",
        "77 Months Total Warranty (42M Free Replacement + 35M Pro-Rata)",
        "Layout / Form Factor: DIN Left",
        "Application: Hyundai Creta SX(O), Skoda Kushaq, VW Taigun, MG Hector Petrol"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000111",
    "link": "exide-exide-epiq-epiqdin65",
    "image_url": "/products/EPIQDIN65.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Epiq",
    "brand_name": "Exide",
    "model_sku": "EPIQDIN65",
    "capacity": "65 Ah",
    "voltage": "12V",
    "plate_technology": "European DIN Penta Alloy",
    "total_warranty_months": 77,
    "foc_months": 42,
    "pro_rata_months": 35,
    "approx_mrp": 12800,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "DIN Left",
      "application": "Jeep Compass Diesel, Tata Harrier Automatic, Safari Gold",
      "compatible_applications": [
        "Jeep Compass Diesel",
        "Tata Harrier Automatic",
        "Safari Gold"
      ],
      "features": [
        "European DIN Penta Alloy metallurgy & engineering",
        "77 Months Total Warranty (42M Free Replacement + 35M Pro-Rata)",
        "Layout / Form Factor: DIN Left",
        "Application: Jeep Compass Diesel, Tata Harrier Automatic, Safari Gold"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000112",
    "link": "exide-exide-epiq-epiqdin74l",
    "image_url": "/products/EPIQDIN74L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Epiq",
    "brand_name": "Exide",
    "model_sku": "EPIQDIN74L",
    "capacity": "74 Ah",
    "voltage": "12V",
    "plate_technology": "European DIN Penta Alloy",
    "total_warranty_months": 77,
    "foc_months": 42,
    "pro_rata_months": 35,
    "approx_mrp": 14650,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "DIN Left",
      "application": "Skoda Octavia, Superb, VW Passat, Audi A3/A4, BMW 1-Series",
      "compatible_applications": [
        "Skoda Octavia",
        "Superb",
        "VW Passat",
        "Audi A3/A4",
        "BMW 1-Series"
      ],
      "features": [
        "European DIN Penta Alloy metallurgy & engineering",
        "77 Months Total Warranty (42M Free Replacement + 35M Pro-Rata)",
        "Layout / Form Factor: DIN Left",
        "Application: Skoda Octavia, Superb, VW Passat, Audi A3/A4, BMW 1-Series"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000113",
    "link": "exide-exide-matrix-mt35l",
    "image_url": "/products/MT35L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Matrix",
    "brand_name": "Exide",
    "model_sku": "MT35L",
    "capacity": "35 Ah",
    "voltage": "12V",
    "plate_technology": "Sealed MF (Silver Calcium Alloy)",
    "total_warranty_months": 72,
    "foc_months": 36,
    "pro_rata_months": 36,
    "approx_mrp": 5600,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Maruti Swift, Ignis, Baleno, Dzire Petrol, S-Presso",
      "compatible_applications": [
        "Maruti Swift",
        "Ignis",
        "Baleno",
        "Dzire Petrol",
        "S-Presso"
      ],
      "features": [
        "Sealed MF (Silver Calcium Alloy) metallurgy & engineering",
        "72 Months Total Warranty (36M Free Replacement + 36M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Maruti Swift, Ignis, Baleno, Dzire Petrol, S-Presso"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000114",
    "link": "exide-exide-matrix-mt35r",
    "image_url": "/products/MT35R.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Matrix",
    "brand_name": "Exide",
    "model_sku": "MT35R",
    "capacity": "35 Ah",
    "voltage": "12V",
    "plate_technology": "Sealed MF (Silver Calcium Alloy)",
    "total_warranty_months": 72,
    "foc_months": 36,
    "pro_rata_months": 36,
    "approx_mrp": 5600,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Right (R)",
      "application": "Hyundai Grand i10, Nios, Tata Nano, Accent, Eon",
      "compatible_applications": [
        "Hyundai Grand i10",
        "Nios",
        "Tata Nano",
        "Accent",
        "Eon"
      ],
      "features": [
        "Sealed MF (Silver Calcium Alloy) metallurgy & engineering",
        "72 Months Total Warranty (36M Free Replacement + 36M Pro-Rata)",
        "Layout / Form Factor: Right (R)",
        "Application: Hyundai Grand i10, Nios, Tata Nano, Accent, Eon"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000115",
    "link": "exide-exide-matrix-mt45l",
    "image_url": "/products/MT45L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Matrix",
    "brand_name": "Exide",
    "model_sku": "MT45L",
    "capacity": "45 Ah",
    "voltage": "12V",
    "plate_technology": "Sealed MF (Silver Calcium Alloy)",
    "total_warranty_months": 72,
    "foc_months": 36,
    "pro_rata_months": 36,
    "approx_mrp": 6950,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Honda Jazz, WR-V, City, Hyundai i20, Venue",
      "compatible_applications": [
        "Honda Jazz",
        "WR-V",
        "City",
        "Hyundai i20",
        "Venue"
      ],
      "features": [
        "Sealed MF (Silver Calcium Alloy) metallurgy & engineering",
        "72 Months Total Warranty (36M Free Replacement + 36M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Honda Jazz, WR-V, City, Hyundai i20, Venue"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000116",
    "link": "exide-exide-matrix-mt45r",
    "image_url": "/products/MT45R.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Matrix",
    "brand_name": "Exide",
    "model_sku": "MT45R",
    "capacity": "45 Ah",
    "voltage": "12V",
    "plate_technology": "Sealed MF (Silver Calcium Alloy)",
    "total_warranty_months": 72,
    "foc_months": 36,
    "pro_rata_months": 36,
    "approx_mrp": 6950,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Right (R)",
      "application": "Toyota Etios Petrol, Liva Petrol, Maruti SX4",
      "compatible_applications": [
        "Toyota Etios Petrol",
        "Liva Petrol",
        "Maruti SX4"
      ],
      "features": [
        "Sealed MF (Silver Calcium Alloy) metallurgy & engineering",
        "72 Months Total Warranty (36M Free Replacement + 36M Pro-Rata)",
        "Layout / Form Factor: Right (R)",
        "Application: Toyota Etios Petrol, Liva Petrol, Maruti SX4"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000117",
    "link": "exide-exide-matrix-mt55l",
    "image_url": "/products/MT55L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Matrix",
    "brand_name": "Exide",
    "model_sku": "MT55L",
    "capacity": "55 Ah",
    "voltage": "12V",
    "plate_technology": "Sealed MF (Silver Calcium Alloy)",
    "total_warranty_months": 72,
    "foc_months": 36,
    "pro_rata_months": 36,
    "approx_mrp": 8300,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Ford EcoSport, Maruti S-Cross, Renault Duster, Nissan Kicks",
      "compatible_applications": [
        "Ford EcoSport",
        "Maruti S-Cross",
        "Renault Duster",
        "Nissan Kicks"
      ],
      "features": [
        "Sealed MF (Silver Calcium Alloy) metallurgy & engineering",
        "72 Months Total Warranty (36M Free Replacement + 36M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Ford EcoSport, Maruti S-Cross, Renault Duster, Nissan Kicks"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000118",
    "link": "exide-exide-matrix-mt55r",
    "image_url": "/products/MT55R.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Matrix",
    "brand_name": "Exide",
    "model_sku": "MT55R",
    "capacity": "55 Ah",
    "voltage": "12V",
    "plate_technology": "Sealed MF (Silver Calcium Alloy)",
    "total_warranty_months": 72,
    "foc_months": 36,
    "pro_rata_months": 36,
    "approx_mrp": 8300,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Right (R)",
      "application": "Mahindra Quanto, NuvoSport, Tata Indigo XL",
      "compatible_applications": [
        "Mahindra Quanto",
        "NuvoSport",
        "Tata Indigo XL"
      ],
      "features": [
        "Sealed MF (Silver Calcium Alloy) metallurgy & engineering",
        "72 Months Total Warranty (36M Free Replacement + 36M Pro-Rata)",
        "Layout / Form Factor: Right (R)",
        "Application: Mahindra Quanto, NuvoSport, Tata Indigo XL"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000119",
    "link": "exide-exide-matrix-mt65l",
    "image_url": "/products/MT65L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Matrix",
    "brand_name": "Exide",
    "model_sku": "MT65L",
    "capacity": "65 Ah",
    "voltage": "12V",
    "plate_technology": "Sealed MF (Silver Calcium Alloy)",
    "total_warranty_months": 72,
    "foc_months": 36,
    "pro_rata_months": 36,
    "approx_mrp": 9800,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Mahindra XUV500, Scorpio-N, Tata Hexa, Toyota Fortuner Petrol",
      "compatible_applications": [
        "Mahindra XUV500",
        "Scorpio-N",
        "Tata Hexa",
        "Toyota Fortuner Petrol"
      ],
      "features": [
        "Sealed MF (Silver Calcium Alloy) metallurgy & engineering",
        "72 Months Total Warranty (36M Free Replacement + 36M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Mahindra XUV500, Scorpio-N, Tata Hexa, Toyota Fortuner Petrol"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000120",
    "link": "exide-exide-matrix-mt65r",
    "image_url": "/products/MT65R.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Matrix",
    "brand_name": "Exide",
    "model_sku": "MT65R",
    "capacity": "65 Ah",
    "voltage": "12V",
    "plate_technology": "Sealed MF (Silver Calcium Alloy)",
    "total_warranty_months": 72,
    "foc_months": 36,
    "pro_rata_months": 36,
    "approx_mrp": 9800,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Right (R)",
      "application": "Mahindra Bolero Camper, Tata Sumo Victa",
      "compatible_applications": [
        "Mahindra Bolero Camper",
        "Tata Sumo Victa"
      ],
      "features": [
        "Sealed MF (Silver Calcium Alloy) metallurgy & engineering",
        "72 Months Total Warranty (36M Free Replacement + 36M Pro-Rata)",
        "Layout / Form Factor: Right (R)",
        "Application: Mahindra Bolero Camper, Tata Sumo Victa"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000121",
    "link": "exide-exide-matrix-mtdin50",
    "image_url": "/products/MTDIN50.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Matrix",
    "brand_name": "Exide",
    "model_sku": "MTDIN50",
    "capacity": "50 Ah",
    "voltage": "12V",
    "plate_technology": "Sealed MF European DIN",
    "total_warranty_months": 72,
    "foc_months": 36,
    "pro_rata_months": 36,
    "approx_mrp": 8800,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "DIN Left",
      "application": "VW Polo Petrol, Skoda Fabia, Fiat Grande Punto",
      "compatible_applications": [
        "VW Polo Petrol",
        "Skoda Fabia",
        "Fiat Grande Punto"
      ],
      "features": [
        "Sealed MF European DIN metallurgy & engineering",
        "72 Months Total Warranty (36M Free Replacement + 36M Pro-Rata)",
        "Layout / Form Factor: DIN Left",
        "Application: VW Polo Petrol, Skoda Fabia, Fiat Grande Punto"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000122",
    "link": "exide-exide-matrix-mtdin55",
    "image_url": "/products/MTDIN55.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Matrix",
    "brand_name": "Exide",
    "model_sku": "MTDIN55",
    "capacity": "55 Ah",
    "voltage": "12V",
    "plate_technology": "Sealed MF European DIN",
    "total_warranty_months": 72,
    "foc_months": 36,
    "pro_rata_months": 36,
    "approx_mrp": 9900,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "DIN Left",
      "application": "Skoda Rapid, VW Vento Diesel, Ford Figo Aspire Diesel",
      "compatible_applications": [
        "Skoda Rapid",
        "VW Vento Diesel",
        "Ford Figo Aspire Diesel"
      ],
      "features": [
        "Sealed MF European DIN metallurgy & engineering",
        "72 Months Total Warranty (36M Free Replacement + 36M Pro-Rata)",
        "Layout / Form Factor: DIN Left",
        "Application: Skoda Rapid, VW Vento Diesel, Ford Figo Aspire Diesel"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000123",
    "link": "exide-exide-matrix-mtdin65",
    "image_url": "/products/MTDIN65.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Matrix",
    "brand_name": "Exide",
    "model_sku": "MTDIN65",
    "capacity": "65 Ah",
    "voltage": "12V",
    "plate_technology": "Sealed MF European DIN",
    "total_warranty_months": 72,
    "foc_months": 36,
    "pro_rata_months": 36,
    "approx_mrp": 11800,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "DIN Left",
      "application": "Jeep Compass, Tata Harrier, MG Hector Diesel",
      "compatible_applications": [
        "Jeep Compass",
        "Tata Harrier",
        "MG Hector Diesel"
      ],
      "features": [
        "Sealed MF European DIN metallurgy & engineering",
        "72 Months Total Warranty (36M Free Replacement + 36M Pro-Rata)",
        "Layout / Form Factor: DIN Left",
        "Application: Jeep Compass, Tata Harrier, MG Hector Diesel"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000124",
    "link": "exide-exide-matrix-mtdin74",
    "image_url": "/products/MTDIN74.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Matrix",
    "brand_name": "Exide",
    "model_sku": "MTDIN74",
    "capacity": "74 Ah",
    "voltage": "12V",
    "plate_technology": "Sealed MF European DIN",
    "total_warranty_months": 72,
    "foc_months": 36,
    "pro_rata_months": 36,
    "approx_mrp": 13900,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "DIN Left",
      "application": "Skoda Octavia, Superb, VW Jetta, Audi Q3",
      "compatible_applications": [
        "Skoda Octavia",
        "Superb",
        "VW Jetta",
        "Audi Q3"
      ],
      "features": [
        "Sealed MF European DIN metallurgy & engineering",
        "72 Months Total Warranty (36M Free Replacement + 36M Pro-Rata)",
        "Layout / Form Factor: DIN Left",
        "Application: Skoda Octavia, Superb, VW Jetta, Audi Q3"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000125",
    "link": "exide-exide-matrix-mtreddin100",
    "image_url": "/products/MTREDDIN100.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Matrix",
    "brand_name": "Exide",
    "model_sku": "MTREDDIN100",
    "capacity": "100 Ah",
    "voltage": "12V",
    "plate_technology": "Sealed MF European DIN",
    "total_warranty_months": 72,
    "foc_months": 36,
    "pro_rata_months": 36,
    "approx_mrp": 22300,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "DIN Left",
      "application": "Audi Q7, BMW X5, Mercedes GLS, Land Rover Discovery",
      "compatible_applications": [
        "Audi Q7",
        "BMW X5",
        "Mercedes GLS",
        "Land Rover Discovery"
      ],
      "features": [
        "Sealed MF European DIN metallurgy & engineering",
        "72 Months Total Warranty (36M Free Replacement + 36M Pro-Rata)",
        "Layout / Form Factor: DIN Left",
        "Application: Audi Q7, BMW X5, Mercedes GLS, Land Rover Discovery"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000126",
    "link": "exide-exide-matrix-red-mtred35l",
    "image_url": "/products/MTRED35L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Matrix Red",
    "brand_name": "Exide",
    "model_sku": "MTRED35L",
    "capacity": "35 Ah",
    "voltage": "12V",
    "plate_technology": "Sealed Maintenance Free Silver Alloy",
    "total_warranty_months": 66,
    "foc_months": 36,
    "pro_rata_months": 30,
    "approx_mrp": 5400,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Maruti Swift, WagonR, Ritz, Alto K10",
      "compatible_applications": [
        "Maruti Swift",
        "WagonR",
        "Ritz",
        "Alto K10"
      ],
      "features": [
        "Sealed Maintenance Free Silver Alloy metallurgy & engineering",
        "66 Months Total Warranty (36M Free Replacement + 30M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Maruti Swift, WagonR, Ritz, Alto K10"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000127",
    "link": "exide-exide-matrix-red-mtred35r",
    "image_url": "/products/MTRED35R.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Matrix Red",
    "brand_name": "Exide",
    "model_sku": "MTRED35R",
    "capacity": "35 Ah",
    "voltage": "12V",
    "plate_technology": "Sealed Maintenance Free Silver Alloy",
    "total_warranty_months": 66,
    "foc_months": 36,
    "pro_rata_months": 30,
    "approx_mrp": 5400,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Right (R)",
      "application": "Hyundai Santro, i10, Getz Prime",
      "compatible_applications": [
        "Hyundai Santro",
        "i10",
        "Getz Prime"
      ],
      "features": [
        "Sealed Maintenance Free Silver Alloy metallurgy & engineering",
        "66 Months Total Warranty (36M Free Replacement + 30M Pro-Rata)",
        "Layout / Form Factor: Right (R)",
        "Application: Hyundai Santro, i10, Getz Prime"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000128",
    "link": "exide-exide-matrix-red-mtred45l",
    "image_url": "/products/MTRED45L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Matrix Red",
    "brand_name": "Exide",
    "model_sku": "MTRED45L",
    "capacity": "45 Ah",
    "voltage": "12V",
    "plate_technology": "Sealed Maintenance Free Silver Alloy",
    "total_warranty_months": 66,
    "foc_months": 36,
    "pro_rata_months": 30,
    "approx_mrp": 6600,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Honda City Type-2/3, Jazz, Hyundai i20",
      "compatible_applications": [
        "Honda City Type-2/3",
        "Jazz",
        "Hyundai i20"
      ],
      "features": [
        "Sealed Maintenance Free Silver Alloy metallurgy & engineering",
        "66 Months Total Warranty (36M Free Replacement + 30M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Honda City Type-2/3, Jazz, Hyundai i20"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000129",
    "link": "exide-exide-matrix-red-mtred45r",
    "image_url": "/products/MTRED45R.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Matrix Red",
    "brand_name": "Exide",
    "model_sku": "MTRED45R",
    "capacity": "45 Ah",
    "voltage": "12V",
    "plate_technology": "Sealed Maintenance Free Silver Alloy",
    "total_warranty_months": 66,
    "foc_months": 36,
    "pro_rata_months": 30,
    "approx_mrp": 6600,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Right (R)",
      "application": "Toyota Etios, Corolla Altis Petrol",
      "compatible_applications": [
        "Toyota Etios",
        "Corolla Altis Petrol"
      ],
      "features": [
        "Sealed Maintenance Free Silver Alloy metallurgy & engineering",
        "66 Months Total Warranty (36M Free Replacement + 30M Pro-Rata)",
        "Layout / Form Factor: Right (R)",
        "Application: Toyota Etios, Corolla Altis Petrol"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000130",
    "link": "exide-exide-matrix-red-mtred55l",
    "image_url": "/products/MTRED55L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Matrix Red",
    "brand_name": "Exide",
    "model_sku": "MTRED55L",
    "capacity": "55 Ah",
    "voltage": "12V",
    "plate_technology": "Sealed Maintenance Free Silver Alloy",
    "total_warranty_months": 66,
    "foc_months": 36,
    "pro_rata_months": 30,
    "approx_mrp": 7900,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Renault Duster, Ford Figo Diesel, Skoda Fabia",
      "compatible_applications": [
        "Renault Duster",
        "Ford Figo Diesel",
        "Skoda Fabia"
      ],
      "features": [
        "Sealed Maintenance Free Silver Alloy metallurgy & engineering",
        "66 Months Total Warranty (36M Free Replacement + 30M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Renault Duster, Ford Figo Diesel, Skoda Fabia"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000131",
    "link": "exide-exide-matrix-red-mtred65l",
    "image_url": "/products/MTRED65L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Matrix Red",
    "brand_name": "Exide",
    "model_sku": "MTRED65L",
    "capacity": "65 Ah",
    "voltage": "12V",
    "plate_technology": "Sealed Maintenance Free Silver Alloy",
    "total_warranty_months": 66,
    "foc_months": 36,
    "pro_rata_months": 30,
    "approx_mrp": 9400,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Mahindra Scorpio, Safari Dicor, Innova D-4D",
      "compatible_applications": [
        "Mahindra Scorpio",
        "Safari Dicor",
        "Innova D-4D"
      ],
      "features": [
        "Sealed Maintenance Free Silver Alloy metallurgy & engineering",
        "66 Months Total Warranty (36M Free Replacement + 30M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Mahindra Scorpio, Safari Dicor, Innova D-4D"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000132",
    "link": "exide-exide-matrix-red-mtreddin60",
    "image_url": "/products/MTREDDIN60.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Matrix Red",
    "brand_name": "Exide",
    "model_sku": "MTREDDIN60",
    "capacity": "60 Ah",
    "voltage": "12V",
    "plate_technology": "Sealed Maintenance Free Silver Alloy",
    "total_warranty_months": 66,
    "foc_months": 36,
    "pro_rata_months": 30,
    "approx_mrp": 9100,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "DIN Left",
      "application": "Fiat Linea, Punto, Skoda Rapid Diesel",
      "compatible_applications": [
        "Fiat Linea",
        "Punto",
        "Skoda Rapid Diesel"
      ],
      "features": [
        "Sealed Maintenance Free Silver Alloy metallurgy & engineering",
        "66 Months Total Warranty (36M Free Replacement + 30M Pro-Rata)",
        "Layout / Form Factor: DIN Left",
        "Application: Fiat Linea, Punto, Skoda Rapid Diesel"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000133",
    "link": "exide-exide-matrix-red-mtreddin74",
    "image_url": "/products/MTREDDIN74.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Matrix Red",
    "brand_name": "Exide",
    "model_sku": "MTREDDIN74",
    "capacity": "74 Ah",
    "voltage": "12V",
    "plate_technology": "Sealed Maintenance Free Silver Alloy",
    "total_warranty_months": 66,
    "foc_months": 36,
    "pro_rata_months": 30,
    "approx_mrp": 13200,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "DIN Left",
      "application": "VW Passat, Skoda Laura, Audi A4",
      "compatible_applications": [
        "VW Passat",
        "Skoda Laura",
        "Audi A4"
      ],
      "features": [
        "Sealed Maintenance Free Silver Alloy metallurgy & engineering",
        "66 Months Total Warranty (36M Free Replacement + 30M Pro-Rata)",
        "Layout / Form Factor: DIN Left",
        "Application: VW Passat, Skoda Laura, Audi A4"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000134",
    "link": "exide-exide-mileage-ml35l",
    "image_url": "/products/ML35L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Mileage",
    "brand_name": "Exide",
    "model_sku": "ML35L",
    "capacity": "35 Ah",
    "voltage": "12V",
    "plate_technology": "Side-Vented Ca-Ca Alloy",
    "total_warranty_months": 60,
    "foc_months": 30,
    "pro_rata_months": 30,
    "approx_mrp": 4850,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Maruti Alto 800/K10, Celerio Petrol, WagonR 1.0, Ignis, S-Presso",
      "compatible_applications": [
        "Maruti Alto 800/K10",
        "Celerio Petrol",
        "WagonR 1.0",
        "Ignis",
        "S-Presso"
      ],
      "features": [
        "Side-Vented Ca-Ca Alloy metallurgy & engineering",
        "60 Months Total Warranty (30M Free Replacement + 30M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Maruti Alto 800/K10, Celerio Petrol, WagonR 1.0, Ignis, S-Presso"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000135",
    "link": "exide-exide-mileage-ml35r",
    "image_url": "/products/ML35R.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Mileage",
    "brand_name": "Exide",
    "model_sku": "ML35R",
    "capacity": "35 Ah",
    "voltage": "12V",
    "plate_technology": "Side-Vented Ca-Ca Alloy",
    "total_warranty_months": 60,
    "foc_months": 30,
    "pro_rata_months": 30,
    "approx_mrp": 4850,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Right (R)",
      "application": "Hyundai Santro Xing, Eon 0.8/1.0, i10 Petrol, Renault Kwid 0.8",
      "compatible_applications": [
        "Hyundai Santro Xing",
        "Eon 0.8/1.0",
        "i10 Petrol",
        "Renault Kwid 0.8"
      ],
      "features": [
        "Side-Vented Ca-Ca Alloy metallurgy & engineering",
        "60 Months Total Warranty (30M Free Replacement + 30M Pro-Rata)",
        "Layout / Form Factor: Right (R)",
        "Application: Hyundai Santro Xing, Eon 0.8/1.0, i10 Petrol, Renault Kwid 0.8"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000136",
    "link": "exide-exide-mileage-ml38b20l",
    "image_url": "/products/ML38B20L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Mileage",
    "brand_name": "Exide",
    "model_sku": "ML38B20L",
    "capacity": "35 Ah",
    "voltage": "12V",
    "plate_technology": "Japanese JIS Slim Terminal",
    "total_warranty_months": 60,
    "foc_months": 30,
    "pro_rata_months": 30,
    "approx_mrp": 5100,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Honda Brio, Amaze Petrol (Type 1), Jazz i-VTEC (Older JIS tray)",
      "compatible_applications": [
        "Honda Brio",
        "Amaze Petrol (Type 1)",
        "Jazz i-VTEC (Older JIS tray)"
      ],
      "features": [
        "Japanese JIS Slim Terminal metallurgy & engineering",
        "60 Months Total Warranty (30M Free Replacement + 30M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Honda Brio, Amaze Petrol (Type 1), Jazz i-VTEC (Older JIS tray)"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000137",
    "link": "exide-exide-mileage-ml38b20r",
    "image_url": "/products/ML38B20R.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Mileage",
    "brand_name": "Exide",
    "model_sku": "ML38B20R",
    "capacity": "35 Ah",
    "voltage": "12V",
    "plate_technology": "Japanese JIS Slim Terminal",
    "total_warranty_months": 60,
    "foc_months": 30,
    "pro_rata_months": 30,
    "approx_mrp": 5100,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Right (R)",
      "application": "Maruti Zen, Older WagonR, Maruti 800 (Thin post configuration)",
      "compatible_applications": [
        "Maruti Zen",
        "Older WagonR",
        "Maruti 800 (Thin post configuration)"
      ],
      "features": [
        "Japanese JIS Slim Terminal metallurgy & engineering",
        "60 Months Total Warranty (30M Free Replacement + 30M Pro-Rata)",
        "Layout / Form Factor: Right (R)",
        "Application: Maruti Zen, Older WagonR, Maruti 800 (Thin post configuration)"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000138",
    "link": "exide-exide-mileage-ml45l",
    "image_url": "/products/ML45L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Mileage",
    "brand_name": "Exide",
    "model_sku": "ML45L",
    "capacity": "45 Ah",
    "voltage": "12V",
    "plate_technology": "Side-Vented Ca-Ca Alloy",
    "total_warranty_months": 60,
    "foc_months": 30,
    "pro_rata_months": 30,
    "approx_mrp": 6150,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Tata Tiago Petrol, Tigor, Maruti Swift Diesel, Baleno Diesel, Ritz",
      "compatible_applications": [
        "Tata Tiago Petrol",
        "Tigor",
        "Maruti Swift Diesel",
        "Baleno Diesel",
        "Ritz"
      ],
      "features": [
        "Side-Vented Ca-Ca Alloy metallurgy & engineering",
        "60 Months Total Warranty (30M Free Replacement + 30M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Tata Tiago Petrol, Tigor, Maruti Swift Diesel, Baleno Diesel, Ritz"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000139",
    "link": "exide-exide-mileage-ml45r",
    "image_url": "/products/ML45R.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Mileage",
    "brand_name": "Exide",
    "model_sku": "ML45R",
    "capacity": "45 Ah",
    "voltage": "12V",
    "plate_technology": "Side-Vented Ca-Ca Alloy",
    "total_warranty_months": 60,
    "foc_months": 30,
    "pro_rata_months": 30,
    "approx_mrp": 6150,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Right (R)",
      "application": "Toyota Etios Petrol, Liva Petrol, Maruti SX4 Petrol, Esteem",
      "compatible_applications": [
        "Toyota Etios Petrol",
        "Liva Petrol",
        "Maruti SX4 Petrol",
        "Esteem"
      ],
      "features": [
        "Side-Vented Ca-Ca Alloy metallurgy & engineering",
        "60 Months Total Warranty (30M Free Replacement + 30M Pro-Rata)",
        "Layout / Form Factor: Right (R)",
        "Application: Toyota Etios Petrol, Liva Petrol, Maruti SX4 Petrol, Esteem"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000140",
    "link": "exide-exide-mileage-ml50l",
    "image_url": "/products/ML50L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Mileage",
    "brand_name": "Exide",
    "model_sku": "ML50L",
    "capacity": "50 Ah",
    "voltage": "12V",
    "plate_technology": "Side-Vented Ca-Ca Alloy",
    "total_warranty_months": 60,
    "foc_months": 30,
    "pro_rata_months": 30,
    "approx_mrp": 6800,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Tata Altroz Diesel, Honda WR-V i-DTEC, Hyundai i20 CRDi",
      "compatible_applications": [
        "Tata Altroz Diesel",
        "Honda WR-V i-DTEC",
        "Hyundai i20 CRDi"
      ],
      "features": [
        "Side-Vented Ca-Ca Alloy metallurgy & engineering",
        "60 Months Total Warranty (30M Free Replacement + 30M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Tata Altroz Diesel, Honda WR-V i-DTEC, Hyundai i20 CRDi"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000141",
    "link": "exide-exide-mileage-ml55l",
    "image_url": "/products/ML55L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Mileage",
    "brand_name": "Exide",
    "model_sku": "ML55L",
    "capacity": "55 Ah",
    "voltage": "12V",
    "plate_technology": "Side-Vented Ca-Ca Alloy",
    "total_warranty_months": 60,
    "foc_months": 30,
    "pro_rata_months": 30,
    "approx_mrp": 7400,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Renault Duster 85PS/110PS, Nissan Terrano, Nissan Kicks Diesel",
      "compatible_applications": [
        "Renault Duster 85PS/110PS",
        "Nissan Terrano",
        "Nissan Kicks Diesel"
      ],
      "features": [
        "Side-Vented Ca-Ca Alloy metallurgy & engineering",
        "60 Months Total Warranty (30M Free Replacement + 30M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Renault Duster 85PS/110PS, Nissan Terrano, Nissan Kicks Diesel"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000142",
    "link": "exide-exide-mileage-ml55r",
    "image_url": "/products/ML55R.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Mileage",
    "brand_name": "Exide",
    "model_sku": "ML55R",
    "capacity": "55 Ah",
    "voltage": "12V",
    "plate_technology": "Side-Vented Ca-Ca Alloy",
    "total_warranty_months": 60,
    "foc_months": 30,
    "pro_rata_months": 30,
    "approx_mrp": 7400,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Right (R)",
      "application": "Tata Indigo Manza Diesel, Tata Vista Quadrajet",
      "compatible_applications": [
        "Tata Indigo Manza Diesel",
        "Tata Vista Quadrajet"
      ],
      "features": [
        "Side-Vented Ca-Ca Alloy metallurgy & engineering",
        "60 Months Total Warranty (30M Free Replacement + 30M Pro-Rata)",
        "Layout / Form Factor: Right (R)",
        "Application: Tata Indigo Manza Diesel, Tata Vista Quadrajet"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000143",
    "link": "exide-exide-mileage-ml65l",
    "image_url": "/products/ML65L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Mileage",
    "brand_name": "Exide",
    "model_sku": "ML65L",
    "capacity": "65 Ah",
    "voltage": "12V",
    "plate_technology": "Side-Vented Ca-Ca Alloy",
    "total_warranty_months": 60,
    "foc_months": 30,
    "pro_rata_months": 30,
    "approx_mrp": 8900,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Toyota Innova Crysta Petrol/Diesel, Fortuner Petrol, Mahindra Thar CRDe",
      "compatible_applications": [
        "Toyota Innova Crysta Petrol/Diesel",
        "Fortuner Petrol",
        "Mahindra Thar CRDe"
      ],
      "features": [
        "Side-Vented Ca-Ca Alloy metallurgy & engineering",
        "60 Months Total Warranty (30M Free Replacement + 30M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Toyota Innova Crysta Petrol/Diesel, Fortuner Petrol, Mahindra Thar CRDe"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000144",
    "link": "exide-exide-mileage-ml65r",
    "image_url": "/products/ML65R.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Mileage",
    "brand_name": "Exide",
    "model_sku": "ML65R",
    "capacity": "65 Ah",
    "voltage": "12V",
    "plate_technology": "Side-Vented Ca-Ca Alloy",
    "total_warranty_months": 60,
    "foc_months": 30,
    "pro_rata_months": 30,
    "approx_mrp": 8900,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Right (R)",
      "application": "Mahindra Bolero Power+, Bolero Neo, Scorpio M2DiCR",
      "compatible_applications": [
        "Mahindra Bolero Power+",
        "Bolero Neo",
        "Scorpio M2DiCR"
      ],
      "features": [
        "Side-Vented Ca-Ca Alloy metallurgy & engineering",
        "60 Months Total Warranty (30M Free Replacement + 30M Pro-Rata)",
        "Layout / Form Factor: Right (R)",
        "Application: Mahindra Bolero Power+, Bolero Neo, Scorpio M2DiCR"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000145",
    "link": "exide-exide-mileage-mldin50",
    "image_url": "/products/MLDIN50.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Mileage",
    "brand_name": "Exide",
    "model_sku": "MLDIN50",
    "capacity": "50 Ah",
    "voltage": "12V",
    "plate_technology": "European DIN Format Side-Vented",
    "total_warranty_months": 60,
    "foc_months": 30,
    "pro_rata_months": 30,
    "approx_mrp": 7900,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "DIN Left",
      "application": "VW Polo 1.0/1.2 TSI, Vento Petrol, Skoda Rapid 1.6 MPI, Ford Figo Petrol",
      "compatible_applications": [
        "VW Polo 1.0/1.2 TSI",
        "Vento Petrol",
        "Skoda Rapid 1.6 MPI",
        "Ford Figo Petrol"
      ],
      "features": [
        "European DIN Format Side-Vented metallurgy & engineering",
        "60 Months Total Warranty (30M Free Replacement + 30M Pro-Rata)",
        "Layout / Form Factor: DIN Left",
        "Application: VW Polo 1.0/1.2 TSI, Vento Petrol, Skoda Rapid 1.6 MPI, Ford Figo Petrol"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000146",
    "link": "exide-exide-mileage-mldin55",
    "image_url": "/products/MLDIN55.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Mileage",
    "brand_name": "Exide",
    "model_sku": "MLDIN55",
    "capacity": "55 Ah",
    "voltage": "12V",
    "plate_technology": "European DIN Format Side-Vented",
    "total_warranty_months": 60,
    "foc_months": 30,
    "pro_rata_months": 30,
    "approx_mrp": 8900,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "DIN Left",
      "application": "VW Polo 1.5 TDI, Skoda Rapid 1.5 TDI, Ford Aspire TDCi, Fiat Punto Evo",
      "compatible_applications": [
        "VW Polo 1.5 TDI",
        "Skoda Rapid 1.5 TDI",
        "Ford Aspire TDCi",
        "Fiat Punto Evo"
      ],
      "features": [
        "European DIN Format Side-Vented metallurgy & engineering",
        "60 Months Total Warranty (30M Free Replacement + 30M Pro-Rata)",
        "Layout / Form Factor: DIN Left",
        "Application: VW Polo 1.5 TDI, Skoda Rapid 1.5 TDI, Ford Aspire TDCi, Fiat Punto Evo"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000147",
    "link": "exide-exide-mileage-mldin60",
    "image_url": "/products/MLDIN60.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Mileage",
    "brand_name": "Exide",
    "model_sku": "MLDIN60",
    "capacity": "60 Ah",
    "voltage": "12V",
    "plate_technology": "European DIN Format Side-Vented",
    "total_warranty_months": 60,
    "foc_months": 30,
    "pro_rata_months": 30,
    "approx_mrp": 9400,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "DIN Left",
      "application": "Renault Captur, Skoda Kushaq 1.0 TSI, VW Taigun 1.0 TSI, MG Hector Petrol",
      "compatible_applications": [
        "Renault Captur",
        "Skoda Kushaq 1.0 TSI",
        "VW Taigun 1.0 TSI",
        "MG Hector Petrol"
      ],
      "features": [
        "European DIN Format Side-Vented metallurgy & engineering",
        "60 Months Total Warranty (30M Free Replacement + 30M Pro-Rata)",
        "Layout / Form Factor: DIN Left",
        "Application: Renault Captur, Skoda Kushaq 1.0 TSI, VW Taigun 1.0 TSI, MG Hector Petrol"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000148",
    "link": "exide-exide-mileage-mldin65",
    "image_url": "/products/MLDIN65.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Mileage",
    "brand_name": "Exide",
    "model_sku": "MLDIN65",
    "capacity": "65 Ah",
    "voltage": "12V",
    "plate_technology": "European DIN Format Side-Vented",
    "total_warranty_months": 60,
    "foc_months": 30,
    "pro_rata_months": 30,
    "approx_mrp": 10800,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "DIN Left",
      "application": "Tata Harrier Manual, Tata Safari Storme, Jeep Compass 1.4 Multiair",
      "compatible_applications": [
        "Tata Harrier Manual",
        "Tata Safari Storme",
        "Jeep Compass 1.4 Multiair"
      ],
      "features": [
        "European DIN Format Side-Vented metallurgy & engineering",
        "60 Months Total Warranty (30M Free Replacement + 30M Pro-Rata)",
        "Layout / Form Factor: DIN Left",
        "Application: Tata Harrier Manual, Tata Safari Storme, Jeep Compass 1.4 Multiair"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000149",
    "link": "exide-exide-mileage-mldin74",
    "image_url": "/products/MLDIN74.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Mileage",
    "brand_name": "Exide",
    "model_sku": "MLDIN74",
    "capacity": "74 Ah",
    "voltage": "12V",
    "plate_technology": "European DIN Format Side-Vented",
    "total_warranty_months": 60,
    "foc_months": 30,
    "pro_rata_months": 30,
    "approx_mrp": 12900,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "DIN Left",
      "application": "Skoda Octavia 2.0 TDI, VW Passat, VW Jetta 2.0 TDI, Audi A4 2.0 TDI",
      "compatible_applications": [
        "Skoda Octavia 2.0 TDI",
        "VW Passat",
        "VW Jetta 2.0 TDI",
        "Audi A4 2.0 TDI"
      ],
      "features": [
        "European DIN Format Side-Vented metallurgy & engineering",
        "60 Months Total Warranty (30M Free Replacement + 30M Pro-Rata)",
        "Layout / Form Factor: DIN Left",
        "Application: Skoda Octavia 2.0 TDI, VW Passat, VW Jetta 2.0 TDI, Audi A4 2.0 TDI"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000150",
    "link": "exide-exide-mileage-red-mlred35l",
    "image_url": "/products/MLRED35L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Mileage Red",
    "brand_name": "Exide",
    "model_sku": "MLRED35L",
    "capacity": "35 Ah",
    "voltage": "12V",
    "plate_technology": "Low Maintenance Ca-Ca Grid",
    "total_warranty_months": 45,
    "foc_months": 24,
    "pro_rata_months": 21,
    "approx_mrp": 4600,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Maruti Alto, WagonR, Swift, A-Star",
      "compatible_applications": [
        "Maruti Alto",
        "WagonR",
        "Swift",
        "A-Star"
      ],
      "features": [
        "Low Maintenance Ca-Ca Grid metallurgy & engineering",
        "45 Months Total Warranty (24M Free Replacement + 21M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Maruti Alto, WagonR, Swift, A-Star"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000151",
    "link": "exide-exide-mileage-red-mlred35r",
    "image_url": "/products/MLRED35R.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Mileage Red",
    "brand_name": "Exide",
    "model_sku": "MLRED35R",
    "capacity": "35 Ah",
    "voltage": "12V",
    "plate_technology": "Low Maintenance Ca-Ca Grid",
    "total_warranty_months": 45,
    "foc_months": 24,
    "pro_rata_months": 21,
    "approx_mrp": 4600,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Right (R)",
      "application": "Hyundai Santro Xing, i10, Eon",
      "compatible_applications": [
        "Hyundai Santro Xing",
        "i10",
        "Eon"
      ],
      "features": [
        "Low Maintenance Ca-Ca Grid metallurgy & engineering",
        "45 Months Total Warranty (24M Free Replacement + 21M Pro-Rata)",
        "Layout / Form Factor: Right (R)",
        "Application: Hyundai Santro Xing, i10, Eon"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000152",
    "link": "exide-exide-mileage-red-mlred45l",
    "image_url": "/products/MLRED45L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Mileage Red",
    "brand_name": "Exide",
    "model_sku": "MLRED45L",
    "capacity": "45 Ah",
    "voltage": "12V",
    "plate_technology": "Low Maintenance Ca-Ca Grid",
    "total_warranty_months": 45,
    "foc_months": 24,
    "pro_rata_months": 21,
    "approx_mrp": 5800,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Honda City Type 3, Tata Indica V2, Swift Diesel",
      "compatible_applications": [
        "Honda City Type 3",
        "Tata Indica V2",
        "Swift Diesel"
      ],
      "features": [
        "Low Maintenance Ca-Ca Grid metallurgy & engineering",
        "45 Months Total Warranty (24M Free Replacement + 21M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Honda City Type 3, Tata Indica V2, Swift Diesel"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000153",
    "link": "exide-exide-mileage-red-mlred45r",
    "image_url": "/products/MLRED45R.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Mileage Red",
    "brand_name": "Exide",
    "model_sku": "MLRED45R",
    "capacity": "45 Ah",
    "voltage": "12V",
    "plate_technology": "Low Maintenance Ca-Ca Grid",
    "total_warranty_months": 45,
    "foc_months": 24,
    "pro_rata_months": 21,
    "approx_mrp": 5800,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Right (R)",
      "application": "Toyota Etios, Maruti Esteem, Accent",
      "compatible_applications": [
        "Toyota Etios",
        "Maruti Esteem",
        "Accent"
      ],
      "features": [
        "Low Maintenance Ca-Ca Grid metallurgy & engineering",
        "45 Months Total Warranty (24M Free Replacement + 21M Pro-Rata)",
        "Layout / Form Factor: Right (R)",
        "Application: Toyota Etios, Maruti Esteem, Accent"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000154",
    "link": "exide-exide-mileage-red-mlred55l",
    "image_url": "/products/MLRED55L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Mileage Red",
    "brand_name": "Exide",
    "model_sku": "MLRED55L",
    "capacity": "55 Ah",
    "voltage": "12V",
    "plate_technology": "Low Maintenance Ca-Ca Grid",
    "total_warranty_months": 45,
    "foc_months": 24,
    "pro_rata_months": 21,
    "approx_mrp": 7100,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Renault Duster, Ford Figo Diesel, Skoda Fabia",
      "compatible_applications": [
        "Renault Duster",
        "Ford Figo Diesel",
        "Skoda Fabia"
      ],
      "features": [
        "Low Maintenance Ca-Ca Grid metallurgy & engineering",
        "45 Months Total Warranty (24M Free Replacement + 21M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Renault Duster, Ford Figo Diesel, Skoda Fabia"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000155",
    "link": "exide-exide-mileage-red-mlred65l",
    "image_url": "/products/MLRED65L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Mileage Red",
    "brand_name": "Exide",
    "model_sku": "MLRED65L",
    "capacity": "65 Ah",
    "voltage": "12V",
    "plate_technology": "Low Maintenance Ca-Ca Grid",
    "total_warranty_months": 45,
    "foc_months": 24,
    "pro_rata_months": 21,
    "approx_mrp": 8400,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Mahindra Scorpio, Safari, Tavera",
      "compatible_applications": [
        "Mahindra Scorpio",
        "Safari",
        "Tavera"
      ],
      "features": [
        "Low Maintenance Ca-Ca Grid metallurgy & engineering",
        "45 Months Total Warranty (24M Free Replacement + 21M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Mahindra Scorpio, Safari, Tavera"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000156",
    "link": "exide-exide-mileage-red-mlreddin50",
    "image_url": "/products/MLREDDIN50.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Mileage Red",
    "brand_name": "Exide",
    "model_sku": "MLREDDIN50",
    "capacity": "50 Ah",
    "voltage": "12V",
    "plate_technology": "Low Maintenance European DIN",
    "total_warranty_months": 45,
    "foc_months": 24,
    "pro_rata_months": 21,
    "approx_mrp": 7400,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "DIN Left",
      "application": "VW Polo, Vento Petrol, Skoda Fabia",
      "compatible_applications": [
        "VW Polo",
        "Vento Petrol",
        "Skoda Fabia"
      ],
      "features": [
        "Low Maintenance European DIN metallurgy & engineering",
        "45 Months Total Warranty (24M Free Replacement + 21M Pro-Rata)",
        "Layout / Form Factor: DIN Left",
        "Application: VW Polo, Vento Petrol, Skoda Fabia"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000157",
    "link": "exide-exide-mileage-red-mlreddin60",
    "image_url": "/products/MLREDDIN60.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Mileage Red",
    "brand_name": "Exide",
    "model_sku": "MLREDDIN60",
    "capacity": "60 Ah",
    "voltage": "12V",
    "plate_technology": "Low Maintenance European DIN",
    "total_warranty_months": 45,
    "foc_months": 24,
    "pro_rata_months": 21,
    "approx_mrp": 8900,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "DIN Left",
      "application": "Skoda Laura, VW Jetta Petrol, Fiat Linea",
      "compatible_applications": [
        "Skoda Laura",
        "VW Jetta Petrol",
        "Fiat Linea"
      ],
      "features": [
        "Low Maintenance European DIN metallurgy & engineering",
        "45 Months Total Warranty (24M Free Replacement + 21M Pro-Rata)",
        "Layout / Form Factor: DIN Left",
        "Application: Skoda Laura, VW Jetta Petrol, Fiat Linea"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000158",
    "link": "exide-exide-mileage-iss-ml-iss-45",
    "image_url": "/products/ML-ISS-45.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Mileage ISS",
    "brand_name": "Exide",
    "model_sku": "ML-ISS-45",
    "capacity": "45 Ah",
    "voltage": "12V",
    "plate_technology": "Enhanced Flooded Battery (EFB)",
    "total_warranty_months": 60,
    "foc_months": 36,
    "pro_rata_months": 24,
    "approx_mrp": 8900,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Maruti Swift Smart Hybrid (DualJet), Baleno SHVS, Ignis ISS",
      "compatible_applications": [
        "Maruti Swift Smart Hybrid (DualJet)",
        "Baleno SHVS",
        "Ignis ISS"
      ],
      "features": [
        "Enhanced Flooded Battery (EFB) metallurgy & engineering",
        "60 Months Total Warranty (36M Free Replacement + 24M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Maruti Swift Smart Hybrid (DualJet), Baleno SHVS, Ignis ISS"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000159",
    "link": "exide-exide-mileage-iss-ml-iss-55",
    "image_url": "/products/ML-ISS-55.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Mileage ISS",
    "brand_name": "Exide",
    "model_sku": "ML-ISS-55",
    "capacity": "55 Ah",
    "voltage": "12V",
    "plate_technology": "Enhanced Flooded Battery (EFB)",
    "total_warranty_months": 60,
    "foc_months": 36,
    "pro_rata_months": 24,
    "approx_mrp": 10100,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Maruti Ciaz Smart Hybrid Diesel/Petrol, S-Cross Smart Hybrid",
      "compatible_applications": [
        "Maruti Ciaz Smart Hybrid Diesel/Petrol",
        "S-Cross Smart Hybrid"
      ],
      "features": [
        "Enhanced Flooded Battery (EFB) metallurgy & engineering",
        "60 Months Total Warranty (36M Free Replacement + 24M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Maruti Ciaz Smart Hybrid Diesel/Petrol, S-Cross Smart Hybrid"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000160",
    "link": "exide-exide-mileage-iss-ml-iss-65",
    "image_url": "/products/ML-ISS-65.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Mileage ISS",
    "brand_name": "Exide",
    "model_sku": "ML-ISS-65",
    "capacity": "65 Ah",
    "voltage": "12V",
    "plate_technology": "Enhanced Flooded Battery (EFB)",
    "total_warranty_months": 60,
    "foc_months": 36,
    "pro_rata_months": 24,
    "approx_mrp": 11200,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Maruti Brezza Smart Hybrid, Grand Vitara Smart Hybrid, Ertiga & XL6 SHVS",
      "compatible_applications": [
        "Maruti Brezza Smart Hybrid",
        "Grand Vitara Smart Hybrid",
        "Ertiga & XL6 SHVS"
      ],
      "features": [
        "Enhanced Flooded Battery (EFB) metallurgy & engineering",
        "60 Months Total Warranty (36M Free Replacement + 24M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Maruti Brezza Smart Hybrid, Grand Vitara Smart Hybrid, Ertiga & XL6 SHVS"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000161",
    "link": "exide-exide-mileage-iss-ml-iss-din60",
    "image_url": "/products/ML-ISS-DIN60.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Mileage ISS",
    "brand_name": "Exide",
    "model_sku": "ML-ISS-DIN60",
    "capacity": "60 Ah",
    "voltage": "12V",
    "plate_technology": "Enhanced Flooded Battery (EFB)",
    "total_warranty_months": 60,
    "foc_months": 36,
    "pro_rata_months": 24,
    "approx_mrp": 12200,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "DIN Left",
      "application": "Hyundai Creta Smart Auto-Stop, Kia Seltos ISG, Skoda Kushaq 1.5 TSI",
      "compatible_applications": [
        "Hyundai Creta Smart Auto-Stop",
        "Kia Seltos ISG",
        "Skoda Kushaq 1.5 TSI"
      ],
      "features": [
        "Enhanced Flooded Battery (EFB) metallurgy & engineering",
        "60 Months Total Warranty (36M Free Replacement + 24M Pro-Rata)",
        "Layout / Form Factor: DIN Left",
        "Application: Hyundai Creta Smart Auto-Stop, Kia Seltos ISG, Skoda Kushaq 1.5 TSI"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000162",
    "link": "exide-exide-mileage-iss-ml-iss-din70",
    "image_url": "/products/ML-ISS-DIN70.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Mileage ISS",
    "brand_name": "Exide",
    "model_sku": "ML-ISS-DIN70",
    "capacity": "70 Ah",
    "voltage": "12V",
    "plate_technology": "Enhanced Flooded Battery (EFB)",
    "total_warranty_months": 60,
    "foc_months": 36,
    "pro_rata_months": 24,
    "approx_mrp": 13800,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "DIN Left",
      "application": "Mahindra XUV700 ISS, Scorpio-N Start-Stop, Jeep Compass Mild-Hybrid",
      "compatible_applications": [
        "Mahindra XUV700 ISS",
        "Scorpio-N Start-Stop",
        "Jeep Compass Mild-Hybrid"
      ],
      "features": [
        "Enhanced Flooded Battery (EFB) metallurgy & engineering",
        "60 Months Total Warranty (36M Free Replacement + 24M Pro-Rata)",
        "Layout / Form Factor: DIN Left",
        "Application: Mahindra XUV700 ISS, Scorpio-N Start-Stop, Jeep Compass Mild-Hybrid"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000163",
    "link": "exide-exide-eezy-ez35l",
    "image_url": "/products/EZ35L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Eezy",
    "brand_name": "Exide",
    "model_sku": "EZ35L",
    "capacity": "35 Ah",
    "voltage": "12V",
    "plate_technology": "Hybrid Low Maintenance Alloy",
    "total_warranty_months": 48,
    "foc_months": 24,
    "pro_rata_months": 24,
    "approx_mrp": 4350,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Maruti Alto, WagonR, Celerio, Datsun Go",
      "compatible_applications": [
        "Maruti Alto",
        "WagonR",
        "Celerio",
        "Datsun Go"
      ],
      "features": [
        "Hybrid Low Maintenance Alloy metallurgy & engineering",
        "48 Months Total Warranty (24M Free Replacement + 24M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Maruti Alto, WagonR, Celerio, Datsun Go"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000164",
    "link": "exide-exide-eezy-ez35r",
    "image_url": "/products/EZ35R.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Eezy",
    "brand_name": "Exide",
    "model_sku": "EZ35R",
    "capacity": "35 Ah",
    "voltage": "12V",
    "plate_technology": "Hybrid Low Maintenance Alloy",
    "total_warranty_months": 48,
    "foc_months": 24,
    "pro_rata_months": 24,
    "approx_mrp": 4350,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Right (R)",
      "application": "Hyundai Santro, Eon, Datsun Redi-Go",
      "compatible_applications": [
        "Hyundai Santro",
        "Eon",
        "Datsun Redi-Go"
      ],
      "features": [
        "Hybrid Low Maintenance Alloy metallurgy & engineering",
        "48 Months Total Warranty (24M Free Replacement + 24M Pro-Rata)",
        "Layout / Form Factor: Right (R)",
        "Application: Hyundai Santro, Eon, Datsun Redi-Go"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000165",
    "link": "exide-exide-eezy-ez38b20l",
    "image_url": "/products/EZ38B20L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Eezy",
    "brand_name": "Exide",
    "model_sku": "EZ38B20L",
    "capacity": "35 Ah",
    "voltage": "12V",
    "plate_technology": "Japanese JIS Slim Hybrid",
    "total_warranty_months": 48,
    "foc_months": 24,
    "pro_rata_months": 24,
    "approx_mrp": 4600,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Honda Brio, Amaze Petrol, Older Japanese Fitments",
      "compatible_applications": [
        "Honda Brio",
        "Amaze Petrol",
        "Older Japanese Fitments"
      ],
      "features": [
        "Japanese JIS Slim Hybrid metallurgy & engineering",
        "48 Months Total Warranty (24M Free Replacement + 24M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Honda Brio, Amaze Petrol, Older Japanese Fitments"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000166",
    "link": "exide-exide-eezy-ez45l",
    "image_url": "/products/EZ45L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Eezy",
    "brand_name": "Exide",
    "model_sku": "EZ45L",
    "capacity": "45 Ah",
    "voltage": "12V",
    "plate_technology": "Hybrid Low Maintenance Alloy",
    "total_warranty_months": 48,
    "foc_months": 24,
    "pro_rata_months": 24,
    "approx_mrp": 5450,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Honda Amaze, Brio, Tata Bolt, Indigo Petrol",
      "compatible_applications": [
        "Honda Amaze",
        "Brio",
        "Tata Bolt",
        "Indigo Petrol"
      ],
      "features": [
        "Hybrid Low Maintenance Alloy metallurgy & engineering",
        "48 Months Total Warranty (24M Free Replacement + 24M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Honda Amaze, Brio, Tata Bolt, Indigo Petrol"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000167",
    "link": "exide-exide-eezy-ez45r",
    "image_url": "/products/EZ45R.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Eezy",
    "brand_name": "Exide",
    "model_sku": "EZ45R",
    "capacity": "45 Ah",
    "voltage": "12V",
    "plate_technology": "Hybrid Low Maintenance Alloy",
    "total_warranty_months": 48,
    "foc_months": 24,
    "pro_rata_months": 24,
    "approx_mrp": 5450,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Right (R)",
      "application": "Toyota Etios Petrol, Older Maruti Models",
      "compatible_applications": [
        "Toyota Etios Petrol",
        "Older Maruti Models"
      ],
      "features": [
        "Hybrid Low Maintenance Alloy metallurgy & engineering",
        "48 Months Total Warranty (24M Free Replacement + 24M Pro-Rata)",
        "Layout / Form Factor: Right (R)",
        "Application: Toyota Etios Petrol, Older Maruti Models"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000168",
    "link": "exide-exide-eezy-ez55l",
    "image_url": "/products/EZ55L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Eezy",
    "brand_name": "Exide",
    "model_sku": "EZ55L",
    "capacity": "55 Ah",
    "voltage": "12V",
    "plate_technology": "Hybrid Low Maintenance Alloy",
    "total_warranty_months": 48,
    "foc_months": 24,
    "pro_rata_months": 24,
    "approx_mrp": 6650,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Ford EcoSport, Figo Diesel, Skoda Rapid",
      "compatible_applications": [
        "Ford EcoSport",
        "Figo Diesel",
        "Skoda Rapid"
      ],
      "features": [
        "Hybrid Low Maintenance Alloy metallurgy & engineering",
        "48 Months Total Warranty (24M Free Replacement + 24M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Ford EcoSport, Figo Diesel, Skoda Rapid"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000169",
    "link": "exide-exide-eezy-ez65l",
    "image_url": "/products/EZ65L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Eezy",
    "brand_name": "Exide",
    "model_sku": "EZ65L",
    "capacity": "65 Ah",
    "voltage": "12V",
    "plate_technology": "Hybrid Low Maintenance Alloy",
    "total_warranty_months": 48,
    "foc_months": 24,
    "pro_rata_months": 24,
    "approx_mrp": 7900,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Mahindra Bolero, Thar, Tata Sumo",
      "compatible_applications": [
        "Mahindra Bolero",
        "Thar",
        "Tata Sumo"
      ],
      "features": [
        "Hybrid Low Maintenance Alloy metallurgy & engineering",
        "48 Months Total Warranty (24M Free Replacement + 24M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Mahindra Bolero, Thar, Tata Sumo"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000170",
    "link": "exide-exide-eezy-ezdin50",
    "image_url": "/products/EZDIN50.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Eezy",
    "brand_name": "Exide",
    "model_sku": "EZDIN50",
    "capacity": "50 Ah",
    "voltage": "12V",
    "plate_technology": "European DIN Hybrid",
    "total_warranty_months": 48,
    "foc_months": 24,
    "pro_rata_months": 24,
    "approx_mrp": 7200,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "DIN Left",
      "application": "VW Polo, Vento Petrol, Ford Freestyle",
      "compatible_applications": [
        "VW Polo",
        "Vento Petrol",
        "Ford Freestyle"
      ],
      "features": [
        "European DIN Hybrid metallurgy & engineering",
        "48 Months Total Warranty (24M Free Replacement + 24M Pro-Rata)",
        "Layout / Form Factor: DIN Left",
        "Application: VW Polo, Vento Petrol, Ford Freestyle"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000171",
    "link": "exide-exide-eezy-ezdin60",
    "image_url": "/products/EZDIN60.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Eezy",
    "brand_name": "Exide",
    "model_sku": "EZDIN60",
    "capacity": "60 Ah",
    "voltage": "12V",
    "plate_technology": "European DIN Hybrid",
    "total_warranty_months": 48,
    "foc_months": 24,
    "pro_rata_months": 24,
    "approx_mrp": 8500,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "DIN Left",
      "application": "Renault Duster, Fiat Linea, Skoda Rapid Diesel",
      "compatible_applications": [
        "Renault Duster",
        "Fiat Linea",
        "Skoda Rapid Diesel"
      ],
      "features": [
        "European DIN Hybrid metallurgy & engineering",
        "48 Months Total Warranty (24M Free Replacement + 24M Pro-Rata)",
        "Layout / Form Factor: DIN Left",
        "Application: Renault Duster, Fiat Linea, Skoda Rapid Diesel"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000172",
    "link": "exide-exide-drive-drive35l",
    "image_url": "/products/DRIVE35L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000005",
    "status": "active",
    "brand_series": "Exide Drive",
    "brand_name": "Exide",
    "model_sku": "DRIVE35L",
    "capacity": "35 Ah",
    "voltage": "12V",
    "plate_technology": "Spill-Proof Commercial Fleet",
    "total_warranty_months": 36,
    "foc_months": 18,
    "pro_rata_months": 18,
    "approx_mrp": 4100,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Maruti WagonR Taxi, Swift Dzire Tour (Petrol/CNG)",
      "compatible_applications": [
        "Maruti WagonR Taxi",
        "Swift Dzire Tour (Petrol/CNG)"
      ],
      "features": [
        "Spill-Proof Commercial Fleet metallurgy & engineering",
        "36 Months Total Warranty (18M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Maruti WagonR Taxi, Swift Dzire Tour (Petrol/CNG)"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000173",
    "link": "exide-exide-drive-drive35r",
    "image_url": "/products/DRIVE35R.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000005",
    "status": "active",
    "brand_series": "Exide Drive",
    "brand_name": "Exide",
    "model_sku": "DRIVE35R",
    "capacity": "35 Ah",
    "voltage": "12V",
    "plate_technology": "Spill-Proof Commercial Fleet",
    "total_warranty_months": 36,
    "foc_months": 18,
    "pro_rata_months": 18,
    "approx_mrp": 4100,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Right (R)",
      "application": "Hyundai Santro Commercial Cabs, Regional Taxi Fleets",
      "compatible_applications": [
        "Hyundai Santro Commercial Cabs",
        "Regional Taxi Fleets"
      ],
      "features": [
        "Spill-Proof Commercial Fleet metallurgy & engineering",
        "36 Months Total Warranty (18M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Right (R)",
        "Application: Hyundai Santro Commercial Cabs, Regional Taxi Fleets"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000174",
    "link": "exide-exide-drive-drive45l",
    "image_url": "/products/DRIVE45L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000005",
    "status": "active",
    "brand_series": "Exide Drive",
    "brand_name": "Exide",
    "model_sku": "DRIVE45L",
    "capacity": "45 Ah",
    "voltage": "12V",
    "plate_technology": "Spill-Proof Commercial Fleet",
    "total_warranty_months": 36,
    "foc_months": 18,
    "pro_rata_months": 18,
    "approx_mrp": 4950,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Toyota Etios Cab, Tata Indica Vista Taxi, Dzire Tour Diesel",
      "compatible_applications": [
        "Toyota Etios Cab",
        "Tata Indica Vista Taxi",
        "Dzire Tour Diesel"
      ],
      "features": [
        "Spill-Proof Commercial Fleet metallurgy & engineering",
        "36 Months Total Warranty (18M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Toyota Etios Cab, Tata Indica Vista Taxi, Dzire Tour Diesel"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000175",
    "link": "exide-exide-drive-drive55l",
    "image_url": "/products/DRIVE55L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000005",
    "status": "active",
    "brand_series": "Exide Drive",
    "brand_name": "Exide",
    "model_sku": "DRIVE55L",
    "capacity": "55 Ah",
    "voltage": "12V",
    "plate_technology": "Spill-Proof Commercial Fleet",
    "total_warranty_months": 36,
    "foc_months": 18,
    "pro_rata_months": 18,
    "approx_mrp": 5950,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Commercial Innova Fleet, Chevrolet Tavera Cabs",
      "compatible_applications": [
        "Commercial Innova Fleet",
        "Chevrolet Tavera Cabs"
      ],
      "features": [
        "Spill-Proof Commercial Fleet metallurgy & engineering",
        "36 Months Total Warranty (18M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Commercial Innova Fleet, Chevrolet Tavera Cabs"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000176",
    "link": "exide-exide-drive-drive65l",
    "image_url": "/products/DRIVE65L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000005",
    "status": "active",
    "brand_series": "Exide Drive",
    "brand_name": "Exide",
    "model_sku": "DRIVE65L",
    "capacity": "65 Ah",
    "voltage": "12V",
    "plate_technology": "Spill-Proof Commercial Fleet",
    "total_warranty_months": 36,
    "foc_months": 18,
    "pro_rata_months": 18,
    "approx_mrp": 7200,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Tour & Travel Bolero, Innova Diesel Fleet, Sumo Gold",
      "compatible_applications": [
        "Tour & Travel Bolero",
        "Innova Diesel Fleet",
        "Sumo Gold"
      ],
      "features": [
        "Spill-Proof Commercial Fleet metallurgy & engineering",
        "36 Months Total Warranty (18M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Tour & Travel Bolero, Innova Diesel Fleet, Sumo Gold"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000177",
    "link": "exide-exide-cabby-cabby35l",
    "image_url": "/products/CABBY35L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000005",
    "status": "active",
    "brand_series": "Exide Cabby",
    "brand_name": "Exide",
    "model_sku": "CABBY35L",
    "capacity": "35 Ah",
    "voltage": "12V",
    "plate_technology": "Extra Electrolyte Commercial Taxi",
    "total_warranty_months": 24,
    "foc_months": 12,
    "pro_rata_months": 12,
    "approx_mrp": 3850,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Heavy-run aggregator cabs (Ola/Uber WagonR, Celerio CNG)",
      "compatible_applications": [
        "Heavy-run aggregator cabs (Ola/Uber WagonR",
        "Celerio CNG)"
      ],
      "features": [
        "Extra Electrolyte Commercial Taxi metallurgy & engineering",
        "24 Months Total Warranty (12M Free Replacement + 12M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Heavy-run aggregator cabs (Ola/Uber WagonR, Celerio CNG)"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000178",
    "link": "exide-exide-cabby-cabby45l",
    "image_url": "/products/CABBY45L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000005",
    "status": "active",
    "brand_series": "Exide Cabby",
    "brand_name": "Exide",
    "model_sku": "CABBY45L",
    "capacity": "45 Ah",
    "voltage": "12V",
    "plate_technology": "Extra Electrolyte Commercial Taxi",
    "total_warranty_months": 24,
    "foc_months": 12,
    "pro_rata_months": 12,
    "approx_mrp": 4650,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Aggregator Sedans (Dzire Tour, Etios Commercial)",
      "compatible_applications": [
        "Aggregator Sedans (Dzire Tour",
        "Etios Commercial)"
      ],
      "features": [
        "Extra Electrolyte Commercial Taxi metallurgy & engineering",
        "24 Months Total Warranty (12M Free Replacement + 12M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Aggregator Sedans (Dzire Tour, Etios Commercial)"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000179",
    "link": "exide-exide-cabby-cabby55l",
    "image_url": "/products/CABBY55L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000005",
    "status": "active",
    "brand_series": "Exide Cabby",
    "brand_name": "Exide",
    "model_sku": "CABBY55L",
    "capacity": "55 Ah",
    "voltage": "12V",
    "plate_technology": "Extra Electrolyte Commercial Taxi",
    "total_warranty_months": 24,
    "foc_months": 12,
    "pro_rata_months": 12,
    "approx_mrp": 5450,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "High-mileage commercial MPVs and shared cabs",
      "compatible_applications": [
        "High-mileage commercial MPVs and shared cabs"
      ],
      "features": [
        "Extra Electrolyte Commercial Taxi metallurgy & engineering",
        "24 Months Total Warranty (12M Free Replacement + 12M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: High-mileage commercial MPVs and shared cabs"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000180",
    "link": "exide-exide-ride-ride35l",
    "image_url": "/products/RIDE35L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Ride",
    "brand_name": "Exide",
    "model_sku": "RIDE35L",
    "capacity": "35 Ah",
    "voltage": "12V",
    "plate_technology": "Standard Lead-Acid Robust Grid",
    "total_warranty_months": 24,
    "foc_months": 12,
    "pro_rata_months": 12,
    "approx_mrp": 3650,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Budget Hatchbacks, Rural entry-level passenger cars",
      "compatible_applications": [
        "Budget Hatchbacks",
        "Rural entry-level passenger cars"
      ],
      "features": [
        "Standard Lead-Acid Robust Grid metallurgy & engineering",
        "24 Months Total Warranty (12M Free Replacement + 12M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Budget Hatchbacks, Rural entry-level passenger cars"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000181",
    "link": "exide-exide-ride-ride45l",
    "image_url": "/products/RIDE45L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Ride",
    "brand_name": "Exide",
    "model_sku": "RIDE45L",
    "capacity": "45 Ah",
    "voltage": "12V",
    "plate_technology": "Standard Lead-Acid Robust Grid",
    "total_warranty_months": 24,
    "foc_months": 12,
    "pro_rata_months": 12,
    "approx_mrp": 4400,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Budget Sedans, Private economy vehicles",
      "compatible_applications": [
        "Budget Sedans",
        "Private economy vehicles"
      ],
      "features": [
        "Standard Lead-Acid Robust Grid metallurgy & engineering",
        "24 Months Total Warranty (12M Free Replacement + 12M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Budget Sedans, Private economy vehicles"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000182",
    "link": "exide-exide-ride-ride65l",
    "image_url": "/products/RIDE65L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Ride",
    "brand_name": "Exide",
    "model_sku": "RIDE65L",
    "capacity": "65 Ah",
    "voltage": "12V",
    "plate_technology": "Standard Lead-Acid Robust Grid",
    "total_warranty_months": 24,
    "foc_months": 12,
    "pro_rata_months": 12,
    "approx_mrp": 6900,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Rural passenger utility vehicles and regional jeeps",
      "compatible_applications": [
        "Rural passenger utility vehicles and regional jeeps"
      ],
      "features": [
        "Standard Lead-Acid Robust Grid metallurgy & engineering",
        "24 Months Total Warranty (12M Free Replacement + 12M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Rural passenger utility vehicles and regional jeeps"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000183",
    "link": "exide-exide-little-champ-lc35l",
    "image_url": "/products/LC35L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Little Champ",
    "brand_name": "Exide",
    "model_sku": "LC35L",
    "capacity": "35 Ah",
    "voltage": "12V",
    "plate_technology": "Conventional Flooded Antique Line",
    "total_warranty_months": 18,
    "foc_months": 12,
    "pro_rata_months": 6,
    "approx_mrp": 3200,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Vintage Maruti 800, Maruti Omni, Zen (Discontinued line)",
      "compatible_applications": [
        "Vintage Maruti 800",
        "Maruti Omni",
        "Zen (Discontinued line)"
      ],
      "features": [
        "Conventional Flooded Antique Line metallurgy & engineering",
        "18 Months Total Warranty (12M Free Replacement + 6M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Vintage Maruti 800, Maruti Omni, Zen (Discontinued line)"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000184",
    "link": "exide-exide-little-champ-lc35r",
    "image_url": "/products/LC35R.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Little Champ",
    "brand_name": "Exide",
    "model_sku": "LC35R",
    "capacity": "35 Ah",
    "voltage": "12V",
    "plate_technology": "Conventional Flooded Antique Line",
    "total_warranty_months": 18,
    "foc_months": 12,
    "pro_rata_months": 6,
    "approx_mrp": 3200,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Right (R)",
      "application": "Classic Premier Padmini, Ambassador Petrol",
      "compatible_applications": [
        "Classic Premier Padmini",
        "Ambassador Petrol"
      ],
      "features": [
        "Conventional Flooded Antique Line metallurgy & engineering",
        "18 Months Total Warranty (12M Free Replacement + 6M Pro-Rata)",
        "Layout / Form Factor: Right (R)",
        "Application: Classic Premier Padmini, Ambassador Petrol"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000185",
    "link": "exide-exide-gold-car-gold35l",
    "image_url": "/products/GOLD35L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Gold (Car)",
    "brand_name": "Exide",
    "model_sku": "GOLD35L",
    "capacity": "35 Ah",
    "voltage": "12V",
    "plate_technology": "Heavy Duty Commercial Flooded",
    "total_warranty_months": 18,
    "foc_months": 12,
    "pro_rata_months": 6,
    "approx_mrp": 3400,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Legacy Yellow-Top Taxi cabs and vintage commercial fleets",
      "compatible_applications": [
        "Legacy Yellow-Top Taxi cabs and vintage commercial fleets"
      ],
      "features": [
        "Heavy Duty Commercial Flooded metallurgy & engineering",
        "18 Months Total Warranty (12M Free Replacement + 6M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Legacy Yellow-Top Taxi cabs and vintage commercial fleets"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000186",
    "link": "exide-exide-gold-car-gold45l",
    "image_url": "/products/GOLD45L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Gold (Car)",
    "brand_name": "Exide",
    "model_sku": "GOLD45L",
    "capacity": "45 Ah",
    "voltage": "12V",
    "plate_technology": "Heavy Duty Commercial Flooded",
    "total_warranty_months": 18,
    "foc_months": 12,
    "pro_rata_months": 6,
    "approx_mrp": 4200,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Ambassador Diesel, Tata Indica (Gen 1)",
      "compatible_applications": [
        "Ambassador Diesel",
        "Tata Indica (Gen 1)"
      ],
      "features": [
        "Heavy Duty Commercial Flooded metallurgy & engineering",
        "18 Months Total Warranty (12M Free Replacement + 6M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Ambassador Diesel, Tata Indica (Gen 1)"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000187",
    "link": "exide-exide-advanz-adv35l",
    "image_url": "/products/ADV35L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Advanz",
    "brand_name": "Exide",
    "model_sku": "ADV35L",
    "capacity": "35 Ah",
    "voltage": "12V",
    "plate_technology": "Factory Sealed Maintenance Free",
    "total_warranty_months": 36,
    "foc_months": 18,
    "pro_rata_months": 18,
    "approx_mrp": 4800,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Early sealed MF generation for luxury sedans (Discontinued)",
      "compatible_applications": [
        "Early sealed MF generation for luxury sedans (Discontinued)"
      ],
      "features": [
        "Factory Sealed Maintenance Free metallurgy & engineering",
        "36 Months Total Warranty (18M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Early sealed MF generation for luxury sedans (Discontinued)"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000188",
    "link": "exide-exide-advanz-adv45l",
    "image_url": "/products/ADV45L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide Advanz",
    "brand_name": "Exide",
    "model_sku": "ADV45L",
    "capacity": "45 Ah",
    "voltage": "12V",
    "plate_technology": "Factory Sealed Maintenance Free",
    "total_warranty_months": 36,
    "foc_months": 18,
    "pro_rata_months": 18,
    "approx_mrp": 5900,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left (L)",
      "application": "Honda Accord (Gen 1/2), Hyundai Sonata V6",
      "compatible_applications": [
        "Honda Accord (Gen 1/2)",
        "Hyundai Sonata V6"
      ],
      "features": [
        "Factory Sealed Maintenance Free metallurgy & engineering",
        "36 Months Total Warranty (18M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Left (L)",
        "Application: Honda Accord (Gen 1/2), Hyundai Sonata V6"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000189",
    "link": "exide-exide-agmi-agm60",
    "image_url": "/products/AGM60.png",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide AGMi",
    "brand_name": "Exide",
    "model_sku": "AGM60",
    "capacity": "60 Ah",
    "voltage": "12V",
    "plate_technology": "Absorbent Glass Mat (AGM VRLA)",
    "total_warranty_months": 48,
    "foc_months": 36,
    "pro_rata_months": 12,
    "approx_mrp": 13800,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "DIN Left",
      "application": "Mini Cooper, VW Beetle, Audi A1/A3, BMW 1-Series",
      "compatible_applications": [
        "Mini Cooper",
        "VW Beetle",
        "Audi A1/A3",
        "BMW 1-Series"
      ],
      "features": [
        "Absorbent Glass Mat (AGM VRLA) metallurgy & engineering",
        "48 Months Total Warranty (36M Free Replacement + 12M Pro-Rata)",
        "Layout / Form Factor: DIN Left",
        "Application: Mini Cooper, VW Beetle, Audi A1/A3, BMW 1-Series"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000190",
    "link": "exide-exide-agmi-agm70",
    "image_url": "/products/AGM70.png",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide AGMi",
    "brand_name": "Exide",
    "model_sku": "AGM70",
    "capacity": "70 Ah",
    "voltage": "12V",
    "plate_technology": "Absorbent Glass Mat (AGM VRLA)",
    "total_warranty_months": 48,
    "foc_months": 36,
    "pro_rata_months": 12,
    "approx_mrp": 15500,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "DIN Left",
      "application": "BMW 3-Series (320d/330i), Audi A4, Mercedes C-Class, VW Tiguan",
      "compatible_applications": [
        "BMW 3-Series (320d/330i)",
        "Audi A4",
        "Mercedes C-Class",
        "VW Tiguan"
      ],
      "features": [
        "Absorbent Glass Mat (AGM VRLA) metallurgy & engineering",
        "48 Months Total Warranty (36M Free Replacement + 12M Pro-Rata)",
        "Layout / Form Factor: DIN Left",
        "Application: BMW 3-Series (320d/330i), Audi A4, Mercedes C-Class, VW Tiguan"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000191",
    "link": "exide-exide-agmi-agm80",
    "image_url": "/products/AGM80.png",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide AGMi",
    "brand_name": "Exide",
    "model_sku": "AGM80",
    "capacity": "80 Ah",
    "voltage": "12V",
    "plate_technology": "Absorbent Glass Mat (AGM VRLA)",
    "total_warranty_months": 48,
    "foc_months": 36,
    "pro_rata_months": 12,
    "approx_mrp": 18200,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "DIN Left",
      "application": "BMW 5-Series (520d/530d), Audi A6, Audi Q5, Mercedes E-Class, Volvo XC60",
      "compatible_applications": [
        "BMW 5-Series (520d/530d)",
        "Audi A6",
        "Audi Q5",
        "Mercedes E-Class",
        "Volvo XC60"
      ],
      "features": [
        "Absorbent Glass Mat (AGM VRLA) metallurgy & engineering",
        "48 Months Total Warranty (36M Free Replacement + 12M Pro-Rata)",
        "Layout / Form Factor: DIN Left",
        "Application: BMW 5-Series (520d/530d), Audi A6, Audi Q5, Mercedes E-Class, Volvo XC60"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000192",
    "link": "exide-exide-agmi-agm95",
    "image_url": "/products/AGM95.png",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide AGMi",
    "brand_name": "Exide",
    "model_sku": "AGM95",
    "capacity": "95 Ah",
    "voltage": "12V",
    "plate_technology": "Absorbent Glass Mat (AGM VRLA)",
    "total_warranty_months": 48,
    "foc_months": 36,
    "pro_rata_months": 12,
    "approx_mrp": 21500,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "DIN Left",
      "application": "BMW X5, Audi Q7, Mercedes GLE, Porsche Macan, Jaguar XF",
      "compatible_applications": [
        "BMW X5",
        "Audi Q7",
        "Mercedes GLE",
        "Porsche Macan",
        "Jaguar XF"
      ],
      "features": [
        "Absorbent Glass Mat (AGM VRLA) metallurgy & engineering",
        "48 Months Total Warranty (36M Free Replacement + 12M Pro-Rata)",
        "Layout / Form Factor: DIN Left",
        "Application: BMW X5, Audi Q7, Mercedes GLE, Porsche Macan, Jaguar XF"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000193",
    "link": "exide-exide-agmi-agm105",
    "image_url": "/products/AGM105.png",
    "category_id": "b0000000-0000-0000-0000-000000000003",
    "status": "active",
    "brand_series": "Exide AGMi",
    "brand_name": "Exide",
    "model_sku": "AGM105",
    "capacity": "105 Ah",
    "voltage": "12V",
    "plate_technology": "Absorbent Glass Mat (AGM VRLA)",
    "total_warranty_months": 48,
    "foc_months": 36,
    "pro_rata_months": 12,
    "approx_mrp": 24000,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "DIN Left",
      "application": "BMW 7-Series, Mercedes S-Class, Audi A8L, Range Rover Vogue, Porsche Cayenne",
      "compatible_applications": [
        "BMW 7-Series",
        "Mercedes S-Class",
        "Audi A8L",
        "Range Rover Vogue",
        "Porsche Cayenne"
      ],
      "features": [
        "Absorbent Glass Mat (AGM VRLA) metallurgy & engineering",
        "48 Months Total Warranty (36M Free Replacement + 12M Pro-Rata)",
        "Layout / Form Factor: DIN Left",
        "Application: BMW 7-Series, Mercedes S-Class, Audi A8L, Range Rover Vogue, Porsche Cayenne"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000194",
    "link": "exide-exide-xplore-12xl2-5l-c",
    "image_url": "/products/12XL2.5L-C.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000004",
    "status": "active",
    "brand_series": "Exide Xplore",
    "brand_name": "Exide",
    "model_sku": "12XL2.5L-C",
    "capacity": "2.5 Ah",
    "voltage": "12V",
    "plate_technology": "Factory-Charged AGM VRLA",
    "total_warranty_months": 48,
    "foc_months": 24,
    "pro_rata_months": 24,
    "approx_mrp": 1150,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left",
      "application": "Hero Splendor Kick Start, Passion, CD-Dawn, HF Deluxe (Kick)",
      "compatible_applications": [
        "Hero Splendor Kick Start",
        "Passion",
        "CD-Dawn",
        "HF Deluxe (Kick)"
      ],
      "features": [
        "Factory-Charged AGM VRLA metallurgy & engineering",
        "48 Months Total Warranty (24M Free Replacement + 24M Pro-Rata)",
        "Layout / Form Factor: Left",
        "Application: Hero Splendor Kick Start, Passion, CD-Dawn, HF Deluxe (Kick)"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000195",
    "link": "exide-exide-xplore-12xl4l-b",
    "image_url": "/products/12XL4L-B.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000004",
    "status": "active",
    "brand_series": "Exide Xplore",
    "brand_name": "Exide",
    "model_sku": "12XL4L-B",
    "capacity": "4.0 Ah",
    "voltage": "12V",
    "plate_technology": "Factory-Charged AGM VRLA",
    "total_warranty_months": 48,
    "foc_months": 24,
    "pro_rata_months": 24,
    "approx_mrp": 1350,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Right",
      "application": "Hero Splendor iSmart, Glamour Self, Passion Pro, TVS Sport",
      "compatible_applications": [
        "Hero Splendor iSmart",
        "Glamour Self",
        "Passion Pro",
        "TVS Sport"
      ],
      "features": [
        "Factory-Charged AGM VRLA metallurgy & engineering",
        "48 Months Total Warranty (24M Free Replacement + 24M Pro-Rata)",
        "Layout / Form Factor: Right",
        "Application: Hero Splendor iSmart, Glamour Self, Passion Pro, TVS Sport"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000196",
    "link": "exide-exide-xplore-12xl5l-b",
    "image_url": "/products/12XL5L-B.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000004",
    "status": "active",
    "brand_series": "Exide Xplore",
    "brand_name": "Exide",
    "model_sku": "12XL5L-B",
    "capacity": "5.0 Ah",
    "voltage": "12V",
    "plate_technology": "Factory-Charged AGM VRLA",
    "total_warranty_months": 48,
    "foc_months": 24,
    "pro_rata_months": 24,
    "approx_mrp": 1550,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Right",
      "application": "Honda Activa (3G/4G/5G/6G), Dio, Hero Maestro, Pleasure, TVS Jupiter",
      "compatible_applications": [
        "Honda Activa (3G/4G/5G/6G)",
        "Dio",
        "Hero Maestro",
        "Pleasure",
        "TVS Jupiter"
      ],
      "features": [
        "Factory-Charged AGM VRLA metallurgy & engineering",
        "48 Months Total Warranty (24M Free Replacement + 24M Pro-Rata)",
        "Layout / Form Factor: Right",
        "Application: Honda Activa (3G/4G/5G/6G), Dio, Hero Maestro, Pleasure, TVS Jupiter"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000197",
    "link": "exide-exide-xplore-12xl7l-b",
    "image_url": "/products/12XL7L-B.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000004",
    "status": "active",
    "brand_series": "Exide Xplore",
    "brand_name": "Exide",
    "model_sku": "12XL7L-B",
    "capacity": "7.0 Ah",
    "voltage": "12V",
    "plate_technology": "Factory-Charged AGM VRLA",
    "total_warranty_months": 48,
    "foc_months": 24,
    "pro_rata_months": 24,
    "approx_mrp": 2100,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Right",
      "application": "Bajaj Pulsar 150/180/220, Avenger 220, Yamaha FZ-S, MT-15, R15 V3/V4",
      "compatible_applications": [
        "Bajaj Pulsar 150/180/220",
        "Avenger 220",
        "Yamaha FZ-S",
        "MT-15",
        "R15 V3/V4"
      ],
      "features": [
        "Factory-Charged AGM VRLA metallurgy & engineering",
        "48 Months Total Warranty (24M Free Replacement + 24M Pro-Rata)",
        "Layout / Form Factor: Right",
        "Application: Bajaj Pulsar 150/180/220, Avenger 220, Yamaha FZ-S, MT-15, R15 V3/V4"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000198",
    "link": "exide-exide-xplore-12xl7b-b",
    "image_url": "/products/12XL7B-B.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000004",
    "status": "active",
    "brand_series": "Exide Xplore",
    "brand_name": "Exide",
    "model_sku": "12XL7B-B",
    "capacity": "7.0 Ah",
    "voltage": "12V",
    "plate_technology": "Factory-Charged AGM VRLA",
    "total_warranty_months": 48,
    "foc_months": 24,
    "pro_rata_months": 24,
    "approx_mrp": 2150,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left",
      "application": "Yamaha Fazer, Older Pulsar 200 NS, Suzuki Gixxer 155",
      "compatible_applications": [
        "Yamaha Fazer",
        "Older Pulsar 200 NS",
        "Suzuki Gixxer 155"
      ],
      "features": [
        "Factory-Charged AGM VRLA metallurgy & engineering",
        "48 Months Total Warranty (24M Free Replacement + 24M Pro-Rata)",
        "Layout / Form Factor: Left",
        "Application: Yamaha Fazer, Older Pulsar 200 NS, Suzuki Gixxer 155"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000199",
    "link": "exide-exide-xplore-12xl9-b",
    "image_url": "/products/12XL9-B.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000004",
    "status": "active",
    "brand_series": "Exide Xplore",
    "brand_name": "Exide",
    "model_sku": "12XL9-B",
    "capacity": "9.0 Ah",
    "voltage": "12V",
    "plate_technology": "Factory-Charged AGM VRLA",
    "total_warranty_months": 48,
    "foc_months": 24,
    "pro_rata_months": 24,
    "approx_mrp": 2450,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left",
      "application": "Royal Enfield Bullet 350/500, Classic 350, Thunderbird, Bajaj Dominar 400",
      "compatible_applications": [
        "Royal Enfield Bullet 350/500",
        "Classic 350",
        "Thunderbird",
        "Bajaj Dominar 400"
      ],
      "features": [
        "Factory-Charged AGM VRLA metallurgy & engineering",
        "48 Months Total Warranty (24M Free Replacement + 24M Pro-Rata)",
        "Layout / Form Factor: Left",
        "Application: Royal Enfield Bullet 350/500, Classic 350, Thunderbird, Bajaj Dominar 400"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000200",
    "link": "exide-exide-xplore-12xl14l-a2",
    "image_url": "/products/12XL14L-A2.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000004",
    "status": "active",
    "brand_series": "Exide Xplore",
    "brand_name": "Exide",
    "model_sku": "12XL14L-A2",
    "capacity": "14.0 Ah",
    "voltage": "12V",
    "plate_technology": "Factory-Charged AGM VRLA",
    "total_warranty_months": 48,
    "foc_months": 24,
    "pro_rata_months": 24,
    "approx_mrp": 3400,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Right",
      "application": "Royal Enfield Interceptor 650, Continental GT 650, KTM Duke 390, Super Meteor 650",
      "compatible_applications": [
        "Royal Enfield Interceptor 650",
        "Continental GT 650",
        "KTM Duke 390",
        "Super Meteor 650"
      ],
      "features": [
        "Factory-Charged AGM VRLA metallurgy & engineering",
        "48 Months Total Warranty (24M Free Replacement + 24M Pro-Rata)",
        "Layout / Form Factor: Right",
        "Application: Royal Enfield Interceptor 650, Continental GT 650, KTM Duke 390, Super Meteor 650"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000201",
    "link": "exide-exide-bikerz-bkrz-2-5l",
    "image_url": "/products/BKRZ-2.5L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000004",
    "status": "active",
    "brand_series": "Exide Bikerz",
    "brand_name": "Exide",
    "model_sku": "BKRZ-2.5L",
    "capacity": "2.5 Ah",
    "voltage": "12V",
    "plate_technology": "Sealed Spill-Proof VRLA",
    "total_warranty_months": 36,
    "foc_months": 18,
    "pro_rata_months": 18,
    "approx_mrp": 1050,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left",
      "application": "Bajaj CT100, Platina 100 Kick Start, Discover 100",
      "compatible_applications": [
        "Bajaj CT100",
        "Platina 100 Kick Start",
        "Discover 100"
      ],
      "features": [
        "Sealed Spill-Proof VRLA metallurgy & engineering",
        "36 Months Total Warranty (18M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Left",
        "Application: Bajaj CT100, Platina 100 Kick Start, Discover 100"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000202",
    "link": "exide-exide-bikerz-bkrz-4l-b",
    "image_url": "/products/BKRZ-4L-B.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000004",
    "status": "active",
    "brand_series": "Exide Bikerz",
    "brand_name": "Exide",
    "model_sku": "BKRZ-4L-B",
    "capacity": "4.0 Ah",
    "voltage": "12V",
    "plate_technology": "Sealed Spill-Proof VRLA",
    "total_warranty_months": 36,
    "foc_months": 18,
    "pro_rata_months": 18,
    "approx_mrp": 1250,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Right",
      "application": "TVS Star City Plus, Victor, Suzuki Hayate, Hero HF Deluxe Self",
      "compatible_applications": [
        "TVS Star City Plus",
        "Victor",
        "Suzuki Hayate",
        "Hero HF Deluxe Self"
      ],
      "features": [
        "Sealed Spill-Proof VRLA metallurgy & engineering",
        "36 Months Total Warranty (18M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Right",
        "Application: TVS Star City Plus, Victor, Suzuki Hayate, Hero HF Deluxe Self"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000203",
    "link": "exide-exide-bikerz-bkrz-5l-b",
    "image_url": "/products/BKRZ-5L-B.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000004",
    "status": "active",
    "brand_series": "Exide Bikerz",
    "brand_name": "Exide",
    "model_sku": "BKRZ-5L-B",
    "capacity": "5.0 Ah",
    "voltage": "12V",
    "plate_technology": "Sealed Spill-Proof VRLA",
    "total_warranty_months": 36,
    "foc_months": 18,
    "pro_rata_months": 18,
    "approx_mrp": 1450,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Right",
      "application": "TVS Jupiter, TVS Ntorq 125, Suzuki Access 125, Burgman Street 125",
      "compatible_applications": [
        "TVS Jupiter",
        "TVS Ntorq 125",
        "Suzuki Access 125",
        "Burgman Street 125"
      ],
      "features": [
        "Sealed Spill-Proof VRLA metallurgy & engineering",
        "36 Months Total Warranty (18M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Right",
        "Application: TVS Jupiter, TVS Ntorq 125, Suzuki Access 125, Burgman Street 125"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000204",
    "link": "exide-exide-bikerz-bkrz-7l-b",
    "image_url": "/products/BKRZ-7L-B.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000004",
    "status": "active",
    "brand_series": "Exide Bikerz",
    "brand_name": "Exide",
    "model_sku": "BKRZ-7L-B",
    "capacity": "7.0 Ah",
    "voltage": "12V",
    "plate_technology": "Sealed Spill-Proof VRLA",
    "total_warranty_months": 36,
    "foc_months": 18,
    "pro_rata_months": 18,
    "approx_mrp": 1950,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Right",
      "application": "TVS Apache RTR 160/180/200 4V, Bajaj Pulsar NS200, RS200",
      "compatible_applications": [
        "TVS Apache RTR 160/180/200 4V",
        "Bajaj Pulsar NS200",
        "RS200"
      ],
      "features": [
        "Sealed Spill-Proof VRLA metallurgy & engineering",
        "36 Months Total Warranty (18M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Right",
        "Application: TVS Apache RTR 160/180/200 4V, Bajaj Pulsar NS200, RS200"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000205",
    "link": "exide-exide-bikerz-bkrz-9-b",
    "image_url": "/products/BKRZ-9-B.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000004",
    "status": "active",
    "brand_series": "Exide Bikerz",
    "brand_name": "Exide",
    "model_sku": "BKRZ-9-B",
    "capacity": "9.0 Ah",
    "voltage": "12V",
    "plate_technology": "Sealed Spill-Proof VRLA",
    "total_warranty_months": 36,
    "foc_months": 18,
    "pro_rata_months": 18,
    "approx_mrp": 2300,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left",
      "application": "Royal Enfield Electra 350, Classic 500 EFI, Himalayan 411",
      "compatible_applications": [
        "Royal Enfield Electra 350",
        "Classic 500 EFI",
        "Himalayan 411"
      ],
      "features": [
        "Sealed Spill-Proof VRLA metallurgy & engineering",
        "36 Months Total Warranty (18M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Left",
        "Application: Royal Enfield Electra 350, Classic 500 EFI, Himalayan 411"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000206",
    "link": "exide-exide-zoom-zoom-2-5l-c",
    "image_url": "/products/ZOOM-2.5L-C.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000004",
    "status": "active",
    "brand_series": "Exide Zoom",
    "brand_name": "Exide",
    "model_sku": "ZOOM-2.5L-C",
    "capacity": "2.5 Ah",
    "voltage": "12V",
    "plate_technology": "Conventional Flooded Lead-Acid",
    "total_warranty_months": 24,
    "foc_months": 12,
    "pro_rata_months": 12,
    "approx_mrp": 950,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left",
      "application": "Kick start commuter bikes, Bajaj Boxer, KB4S",
      "compatible_applications": [
        "Kick start commuter bikes",
        "Bajaj Boxer",
        "KB4S"
      ],
      "features": [
        "Conventional Flooded Lead-Acid metallurgy & engineering",
        "24 Months Total Warranty (12M Free Replacement + 12M Pro-Rata)",
        "Layout / Form Factor: Left",
        "Application: Kick start commuter bikes, Bajaj Boxer, KB4S"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000207",
    "link": "exide-exide-zoom-zoom-4l-b",
    "image_url": "/products/ZOOM-4L-B.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000004",
    "status": "active",
    "brand_series": "Exide Zoom",
    "brand_name": "Exide",
    "model_sku": "ZOOM-4L-B",
    "capacity": "4.0 Ah",
    "voltage": "12V",
    "plate_technology": "Conventional Flooded Lead-Acid",
    "total_warranty_months": 24,
    "foc_months": 12,
    "pro_rata_months": 12,
    "approx_mrp": 1100,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Right",
      "application": "Budget commuter motorcycles (100-110cc Kick/Self)",
      "compatible_applications": [
        "Budget commuter motorcycles (100-110cc Kick/Self)"
      ],
      "features": [
        "Conventional Flooded Lead-Acid metallurgy & engineering",
        "24 Months Total Warranty (12M Free Replacement + 12M Pro-Rata)",
        "Layout / Form Factor: Right",
        "Application: Budget commuter motorcycles (100-110cc Kick/Self)"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000208",
    "link": "exide-exide-zoom-zoom-5l-b",
    "image_url": "/products/ZOOM-5L-B.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000004",
    "status": "active",
    "brand_series": "Exide Zoom",
    "brand_name": "Exide",
    "model_sku": "ZOOM-5L-B",
    "capacity": "5.0 Ah",
    "voltage": "12V",
    "plate_technology": "Conventional Flooded Lead-Acid",
    "total_warranty_months": 24,
    "foc_months": 12,
    "pro_rata_months": 12,
    "approx_mrp": 1280,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Right",
      "application": "Standard scooters and commuter step-throughs",
      "compatible_applications": [
        "Standard scooters and commuter step-throughs"
      ],
      "features": [
        "Conventional Flooded Lead-Acid metallurgy & engineering",
        "24 Months Total Warranty (12M Free Replacement + 12M Pro-Rata)",
        "Layout / Form Factor: Right",
        "Application: Standard scooters and commuter step-throughs"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000209",
    "link": "exide-exide-zoom-zoom-9-b",
    "image_url": "/products/ZOOM-9-B.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000004",
    "status": "active",
    "brand_series": "Exide Zoom",
    "brand_name": "Exide",
    "model_sku": "ZOOM-9-B",
    "capacity": "9.0 Ah",
    "voltage": "12V",
    "plate_technology": "Conventional Flooded Lead-Acid",
    "total_warranty_months": 24,
    "foc_months": 12,
    "pro_rata_months": 12,
    "approx_mrp": 2050,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left",
      "application": "Vintage Royal Enfield Cast Iron Bullet 350 (Heavy kick/self)",
      "compatible_applications": [
        "Vintage Royal Enfield Cast Iron Bullet 350 (Heavy kick/self)"
      ],
      "features": [
        "Conventional Flooded Lead-Acid metallurgy & engineering",
        "24 Months Total Warranty (12M Free Replacement + 12M Pro-Rata)",
        "Layout / Form Factor: Left",
        "Application: Vintage Royal Enfield Cast Iron Bullet 350 (Heavy kick/self)"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000210",
    "link": "exide-exide-boss-2w-boss-2-5l",
    "image_url": "/products/BOSS-2.5L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000004",
    "status": "active",
    "brand_series": "Exide Boss (2W)",
    "brand_name": "Exide",
    "model_sku": "BOSS-2.5L",
    "capacity": "2.5 Ah",
    "voltage": "12V",
    "plate_technology": "Vintage Low-Cost Flooded",
    "total_warranty_months": 18,
    "foc_months": 12,
    "pro_rata_months": 6,
    "approx_mrp": 880,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left",
      "application": "Vintage Bajaj Chetak, Super, Priya Scooters (Discontinued)",
      "compatible_applications": [
        "Vintage Bajaj Chetak",
        "Super",
        "Priya Scooters (Discontinued)"
      ],
      "features": [
        "Vintage Low-Cost Flooded metallurgy & engineering",
        "18 Months Total Warranty (12M Free Replacement + 6M Pro-Rata)",
        "Layout / Form Factor: Left",
        "Application: Vintage Bajaj Chetak, Super, Priya Scooters (Discontinued)"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000211",
    "link": "exide-exide-boss-2w-boss-5l-b",
    "image_url": "/products/BOSS-5L-B.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000004",
    "status": "active",
    "brand_series": "Exide Boss (2W)",
    "brand_name": "Exide",
    "model_sku": "BOSS-5L-B",
    "capacity": "5.0 Ah",
    "voltage": "12V",
    "plate_technology": "Vintage Low-Cost Flooded",
    "total_warranty_months": 18,
    "foc_months": 12,
    "pro_rata_months": 6,
    "approx_mrp": 1150,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Right",
      "application": "Kinetic Honda DX/ZX 2-Stroke Scooters, Bajaj Legend 4S",
      "compatible_applications": [
        "Kinetic Honda DX/ZX 2-Stroke Scooters",
        "Bajaj Legend 4S"
      ],
      "features": [
        "Vintage Low-Cost Flooded metallurgy & engineering",
        "18 Months Total Warranty (12M Free Replacement + 6M Pro-Rata)",
        "Layout / Form Factor: Right",
        "Application: Kinetic Honda DX/ZX 2-Stroke Scooters, Bajaj Legend 4S"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000212",
    "link": "exide-exide-eko-eko-32l",
    "image_url": "/products/EKO-32L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000006",
    "status": "active",
    "brand_series": "Exide Eko",
    "brand_name": "Exide",
    "model_sku": "EKO-32L",
    "capacity": "32 Ah",
    "voltage": "12V",
    "plate_technology": "Heavy Duty Flooded 3W",
    "total_warranty_months": 36,
    "foc_months": 18,
    "pro_rata_months": 18,
    "approx_mrp": 4200,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left",
      "application": "Bajaj RE Compact 4S Petrol/CNG, TVS King Deluxe",
      "compatible_applications": [
        "Bajaj RE Compact 4S Petrol/CNG",
        "TVS King Deluxe"
      ],
      "features": [
        "Heavy Duty Flooded 3W metallurgy & engineering",
        "36 Months Total Warranty (18M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Left",
        "Application: Bajaj RE Compact 4S Petrol/CNG, TVS King Deluxe"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000213",
    "link": "exide-exide-eko-eko-35l",
    "image_url": "/products/EKO-35L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000006",
    "status": "active",
    "brand_series": "Exide Eko",
    "brand_name": "Exide",
    "model_sku": "EKO-35L",
    "capacity": "35 Ah",
    "voltage": "12V",
    "plate_technology": "Heavy Duty Flooded 3W",
    "total_warranty_months": 36,
    "foc_months": 18,
    "pro_rata_months": 18,
    "approx_mrp": 4600,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left",
      "application": "Mahindra Alfa Passenger/Cargo, Piaggio Ape City Diesel",
      "compatible_applications": [
        "Mahindra Alfa Passenger/Cargo",
        "Piaggio Ape City Diesel"
      ],
      "features": [
        "Heavy Duty Flooded 3W metallurgy & engineering",
        "36 Months Total Warranty (18M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Left",
        "Application: Mahindra Alfa Passenger/Cargo, Piaggio Ape City Diesel"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000214",
    "link": "exide-exide-eko-eko-40l",
    "image_url": "/products/EKO-40L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000006",
    "status": "active",
    "brand_series": "Exide Eko",
    "brand_name": "Exide",
    "model_sku": "EKO-40L",
    "capacity": "40 Ah",
    "voltage": "12V",
    "plate_technology": "Heavy Duty Flooded 3W",
    "total_warranty_months": 36,
    "foc_months": 18,
    "pro_rata_months": 18,
    "approx_mrp": 5100,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left",
      "application": "Piaggio Ape Extra LDX Cargo, Atul Shakti, High payload auto rickshaws",
      "compatible_applications": [
        "Piaggio Ape Extra LDX Cargo",
        "Atul Shakti",
        "High payload auto rickshaws"
      ],
      "features": [
        "Heavy Duty Flooded 3W metallurgy & engineering",
        "36 Months Total Warranty (18M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Left",
        "Application: Piaggio Ape Extra LDX Cargo, Atul Shakti, High payload auto rickshaws"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000215",
    "link": "exide-exide-drive-3w-drive3w-32l",
    "image_url": "/products/DRIVE3W-32L.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000006",
    "status": "active",
    "brand_series": "Exide Drive 3W",
    "brand_name": "Exide",
    "model_sku": "DRIVE3W-32L",
    "capacity": "32 Ah",
    "voltage": "12V",
    "plate_technology": "Commercial Taxi Duty 3W",
    "total_warranty_months": 24,
    "foc_months": 12,
    "pro_rata_months": 12,
    "approx_mrp": 3800,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left",
      "application": "High-mileage CNG Auto-Rickshaws (Bajaj Optima, Maxima)",
      "compatible_applications": [
        "High-mileage CNG Auto-Rickshaws (Bajaj Optima",
        "Maxima)"
      ],
      "features": [
        "Commercial Taxi Duty 3W metallurgy & engineering",
        "24 Months Total Warranty (12M Free Replacement + 12M Pro-Rata)",
        "Layout / Form Factor: Left",
        "Application: High-mileage CNG Auto-Rickshaws (Bajaj Optima, Maxima)"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000216",
    "link": "exide-exide-invatubular-it-500",
    "image_url": "/products/IT_500.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000001",
    "status": "active",
    "brand_series": "Exide InvaTubular",
    "brand_name": "Exide",
    "model_sku": "IT 500",
    "capacity": "150 Ah",
    "voltage": "12V",
    "plate_technology": "High-Pressure HADI Spine (1200 Cycles)",
    "total_warranty_months": 66,
    "foc_months": 48,
    "pro_rata_months": 18,
    "approx_mrp": 21500,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Tall Tubular",
      "application": "Flagship residential deep-cycle backup; severe 6-8 hr daily power outages",
      "compatible_applications": [
        "Flagship residential deep-cycle backup",
        "severe 6-8 hr daily power outages"
      ],
      "features": [
        "High-Pressure HADI Spine (1200 Cycles) metallurgy & engineering",
        "66 Months Total Warranty (48M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Tall Tubular",
        "Application: Flagship residential deep-cycle backup; severe 6-8 hr daily power outages"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000217",
    "link": "exide-exide-invatubular-it-750",
    "image_url": "/products/IT_750.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000001",
    "status": "active",
    "brand_series": "Exide InvaTubular",
    "brand_name": "Exide",
    "model_sku": "IT 750",
    "capacity": "200 Ah",
    "voltage": "12V",
    "plate_technology": "High-Pressure HADI Spine (1200 Cycles)",
    "total_warranty_months": 66,
    "foc_months": 48,
    "pro_rata_months": 18,
    "approx_mrp": 27800,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Tall Tubular",
      "application": "Extended capacity tall tubular battery for 3-4 BHK homes, small offices, dental clinics",
      "compatible_applications": [
        "Extended capacity tall tubular battery for 3-4 BHK homes",
        "small offices",
        "dental clinics"
      ],
      "features": [
        "High-Pressure HADI Spine (1200 Cycles) metallurgy & engineering",
        "66 Months Total Warranty (48M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Tall Tubular",
        "Application: Extended capacity tall tubular battery for 3-4 BHK homes, small offices, dental clinics"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000218",
    "link": "exide-exide-invatubular-it-850",
    "image_url": "/products/IT_850.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000001",
    "status": "active",
    "brand_series": "Exide InvaTubular",
    "brand_name": "Exide",
    "model_sku": "IT 850",
    "capacity": "220 Ah",
    "voltage": "12V",
    "plate_technology": "High-Pressure HADI Spine (1200 Cycles)",
    "total_warranty_months": 66,
    "foc_months": 48,
    "pro_rata_months": 18,
    "approx_mrp": 29800,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Tall Tubular",
      "application": "Heavy-duty domestic backup for high-load residential suites",
      "compatible_applications": [
        "Heavy-duty domestic backup for high-load residential suites"
      ],
      "features": [
        "High-Pressure HADI Spine (1200 Cycles) metallurgy & engineering",
        "66 Months Total Warranty (48M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Tall Tubular",
        "Application: Heavy-duty domestic backup for high-load residential suites"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000219",
    "link": "exide-exide-invatubular-it-900",
    "image_url": "/products/IT_900.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000001",
    "status": "active",
    "brand_series": "Exide InvaTubular",
    "brand_name": "Exide",
    "model_sku": "IT 900",
    "capacity": "230 Ah",
    "voltage": "12V",
    "plate_technology": "High-Pressure HADI Spine (1200 Cycles)",
    "total_warranty_months": 66,
    "foc_months": 48,
    "pro_rata_months": 18,
    "approx_mrp": 31500,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Tall Tubular",
      "application": "Maximum tall tubular capacity for prolonged 10-14 hour blackout regions",
      "compatible_applications": [
        "Maximum tall tubular capacity for prolonged 10-14 hour blackout regions"
      ],
      "features": [
        "High-Pressure HADI Spine (1200 Cycles) metallurgy & engineering",
        "66 Months Total Warranty (48M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Tall Tubular",
        "Application: Maximum tall tubular capacity for prolonged 10-14 hour blackout regions"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000220",
    "link": "exide-exide-invatubular-it-1000",
    "image_url": "/products/IT_1000.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000001",
    "status": "active",
    "brand_series": "Exide InvaTubular",
    "brand_name": "Exide",
    "model_sku": "IT 1000",
    "capacity": "260 Ah",
    "voltage": "12V",
    "plate_technology": "High-Pressure HADI Spine (1200 Cycles)",
    "total_warranty_months": 66,
    "foc_months": 48,
    "pro_rata_months": 18,
    "approx_mrp": 35500,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Tall Tubular",
      "application": "Ultra high capacity tall tubular bank for commercial establishments & clinics",
      "compatible_applications": [
        "Ultra high capacity tall tubular bank for commercial establishments & clinics"
      ],
      "features": [
        "High-Pressure HADI Spine (1200 Cycles) metallurgy & engineering",
        "66 Months Total Warranty (48M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Tall Tubular",
        "Application: Ultra high capacity tall tubular bank for commercial establishments & clinics"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000221",
    "link": "exide-exide-invamaster-imtt-1500",
    "image_url": "/products/IMTT_1500.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000001",
    "status": "active",
    "brand_series": "Exide InvaMaster",
    "brand_name": "Exide",
    "model_sku": "IMTT 1500",
    "capacity": "150 Ah",
    "voltage": "12V",
    "plate_technology": "Standard Spine Tubular (1000 Cycles)",
    "total_warranty_months": 60,
    "foc_months": 36,
    "pro_rata_months": 24,
    "approx_mrp": 18200,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Tall Tubular",
      "application": "Mainstream tall tubular inverter battery with ceramic level indicators",
      "compatible_applications": [
        "Mainstream tall tubular inverter battery with ceramic level indicators"
      ],
      "features": [
        "Standard Spine Tubular (1000 Cycles) metallurgy & engineering",
        "60 Months Total Warranty (36M Free Replacement + 24M Pro-Rata)",
        "Layout / Form Factor: Tall Tubular",
        "Application: Mainstream tall tubular inverter battery with ceramic level indicators"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000222",
    "link": "exide-exide-invamaster-imtt-1800",
    "image_url": "/products/IMTT_1800.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000001",
    "status": "active",
    "brand_series": "Exide InvaMaster",
    "brand_name": "Exide",
    "model_sku": "IMTT 1800",
    "capacity": "180 Ah",
    "voltage": "12V",
    "plate_technology": "Standard Spine Tubular (1000 Cycles)",
    "total_warranty_months": 60,
    "foc_months": 36,
    "pro_rata_months": 24,
    "approx_mrp": 21200,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Tall Tubular",
      "application": "Mid-size tall tubular battery for 3-BHK flats with smart TVs & coolers",
      "compatible_applications": [
        "Mid-size tall tubular battery for 3-BHK flats with smart TVs & coolers"
      ],
      "features": [
        "Standard Spine Tubular (1000 Cycles) metallurgy & engineering",
        "60 Months Total Warranty (36M Free Replacement + 24M Pro-Rata)",
        "Layout / Form Factor: Tall Tubular",
        "Application: Mid-size tall tubular battery for 3-BHK flats with smart TVs & coolers"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000223",
    "link": "exide-exide-invamaster-imtt-2000",
    "image_url": "/products/IMTT_2000.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000001",
    "status": "active",
    "brand_series": "Exide InvaMaster",
    "brand_name": "Exide",
    "model_sku": "IMTT 2000",
    "capacity": "200 Ah",
    "voltage": "12V",
    "plate_technology": "Standard Spine Tubular (1000 Cycles)",
    "total_warranty_months": 60,
    "foc_months": 36,
    "pro_rata_months": 24,
    "approx_mrp": 23900,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Tall Tubular",
      "application": "High-demand residential battery for air coolers, entertainment sets, and LED lights",
      "compatible_applications": [
        "High-demand residential battery for air coolers",
        "entertainment sets",
        "and LED lights"
      ],
      "features": [
        "Standard Spine Tubular (1000 Cycles) metallurgy & engineering",
        "60 Months Total Warranty (36M Free Replacement + 24M Pro-Rata)",
        "Layout / Form Factor: Tall Tubular",
        "Application: High-demand residential battery for air coolers, entertainment sets, and LED lights"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000224",
    "link": "exide-exide-invamaster-imtt2300",
    "image_url": "/products/IMTT2300.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000001",
    "status": "active",
    "brand_series": "Exide InvaMaster",
    "brand_name": "Exide",
    "model_sku": "IMTT2300",
    "capacity": "230 Ah",
    "voltage": "12V",
    "plate_technology": "Standard Spine Tubular (1000 Cycles)",
    "total_warranty_months": 60,
    "foc_months": 36,
    "pro_rata_months": 24,
    "approx_mrp": 26800,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Tall Tubular",
      "application": "Extended tall tubular capacity for high inductive loads",
      "compatible_applications": [
        "Extended tall tubular capacity for high inductive loads"
      ],
      "features": [
        "Standard Spine Tubular (1000 Cycles) metallurgy & engineering",
        "60 Months Total Warranty (36M Free Replacement + 24M Pro-Rata)",
        "Layout / Form Factor: Tall Tubular",
        "Application: Extended tall tubular capacity for high inductive loads"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000225",
    "link": "exide-exide-invamaster-imst-1500",
    "image_url": "/products/IMST_1500.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000001",
    "status": "active",
    "brand_series": "Exide InvaMaster",
    "brand_name": "Exide",
    "model_sku": "IMST 1500",
    "capacity": "150 Ah",
    "voltage": "12V",
    "plate_technology": "Short Compact Tubular (1000 Cycles)",
    "total_warranty_months": 60,
    "foc_months": 36,
    "pro_rata_months": 24,
    "approx_mrp": 17500,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Short Tubular",
      "application": "Compact height design tailored for low-profile inverter trolleys and modular cabinets",
      "compatible_applications": [
        "Compact height design tailored for low-profile inverter trolleys and modular cabinets"
      ],
      "features": [
        "Short Compact Tubular (1000 Cycles) metallurgy & engineering",
        "60 Months Total Warranty (36M Free Replacement + 24M Pro-Rata)",
        "Layout / Form Factor: Short Tubular",
        "Application: Compact height design tailored for low-profile inverter trolleys and modular cabinets"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000226",
    "link": "exide-exide-invamaster-imst-1800",
    "image_url": "/products/IMST_1800.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000001",
    "status": "active",
    "brand_series": "Exide InvaMaster",
    "brand_name": "Exide",
    "model_sku": "IMST 1800",
    "capacity": "180 Ah",
    "voltage": "12V",
    "plate_technology": "Short Compact Tubular (1000 Cycles)",
    "total_warranty_months": 60,
    "foc_months": 36,
    "pro_rata_months": 24,
    "approx_mrp": 20400,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Short Tubular",
      "application": "High Ah short tubular battery for space-constrained apartment cabinets",
      "compatible_applications": [
        "High Ah short tubular battery for space-constrained apartment cabinets"
      ],
      "features": [
        "Short Compact Tubular (1000 Cycles) metallurgy & engineering",
        "60 Months Total Warranty (36M Free Replacement + 24M Pro-Rata)",
        "Layout / Form Factor: Short Tubular",
        "Application: High Ah short tubular battery for space-constrained apartment cabinets"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000227",
    "link": "exide-exide-invazen-iztt-1500",
    "image_url": "/products/IZTT_1500.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000001",
    "status": "active",
    "brand_series": "Exide InvaZen",
    "brand_name": "Exide",
    "model_sku": "IZTT 1500",
    "capacity": "150 Ah",
    "voltage": "12V",
    "plate_technology": "Standard Spine Tubular (900 Cycles)",
    "total_warranty_months": 60,
    "foc_months": 36,
    "pro_rata_months": 24,
    "approx_mrp": 16800,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Tall Tubular",
      "application": "Cost-effective tall tubular series for tier-2/3 cities and standard home UPS setups",
      "compatible_applications": [
        "Cost-effective tall tubular series for tier-2/3 cities and standard home UPS setups"
      ],
      "features": [
        "Standard Spine Tubular (900 Cycles) metallurgy & engineering",
        "60 Months Total Warranty (36M Free Replacement + 24M Pro-Rata)",
        "Layout / Form Factor: Tall Tubular",
        "Application: Cost-effective tall tubular series for tier-2/3 cities and standard home UPS setups"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000228",
    "link": "exide-exide-invazen-iztt-2000hl",
    "image_url": "/products/IZTT_2000HL.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000001",
    "status": "active",
    "brand_series": "Exide InvaZen",
    "brand_name": "Exide",
    "model_sku": "IZTT 2000HL",
    "capacity": "200 Ah",
    "voltage": "12V",
    "plate_technology": "Standard Spine Tubular (900 Cycles)",
    "total_warranty_months": 60,
    "foc_months": 36,
    "pro_rata_months": 24,
    "approx_mrp": 22400,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Tall Tubular",
      "application": "Heavy-duty electrolyte volume with high heat and thermal overcharge resistance",
      "compatible_applications": [
        "Heavy-duty electrolyte volume with high heat and thermal overcharge resistance"
      ],
      "features": [
        "Standard Spine Tubular (900 Cycles) metallurgy & engineering",
        "60 Months Total Warranty (36M Free Replacement + 24M Pro-Rata)",
        "Layout / Form Factor: Tall Tubular",
        "Application: Heavy-duty electrolyte volume with high heat and thermal overcharge resistance"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000229",
    "link": "exide-exide-invamagic-mgtt-1500",
    "image_url": "/products/MGTT_1500.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000001",
    "status": "active",
    "brand_series": "Exide InvaMagic",
    "brand_name": "Exide",
    "model_sku": "MGTT 1500",
    "capacity": "150 Ah",
    "voltage": "12V",
    "plate_technology": "Standard Tubular (800 Cycles)",
    "total_warranty_months": 48,
    "foc_months": 30,
    "pro_rata_months": 18,
    "approx_mrp": 15200,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Tall Tubular",
      "application": "Value-segment tall tubular inverter battery for light-to-moderate power cut frequency",
      "compatible_applications": [
        "Value-segment tall tubular inverter battery for light-to-moderate power cut frequency"
      ],
      "features": [
        "Standard Tubular (800 Cycles) metallurgy & engineering",
        "48 Months Total Warranty (30M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Tall Tubular",
        "Application: Value-segment tall tubular inverter battery for light-to-moderate power cut frequency"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000230",
    "link": "exide-exide-invamagic-mgtt-2000",
    "image_url": "/products/MGTT_2000.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000001",
    "status": "active",
    "brand_series": "Exide InvaMagic",
    "brand_name": "Exide",
    "model_sku": "MGTT 2000",
    "capacity": "200 Ah",
    "voltage": "12V",
    "plate_technology": "Standard Tubular (800 Cycles)",
    "total_warranty_months": 48,
    "foc_months": 30,
    "pro_rata_months": 18,
    "approx_mrp": 19800,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Tall Tubular",
      "application": "Budget 200Ah deep cycle tubular battery for extended home emergency backup",
      "compatible_applications": [
        "Budget 200Ah deep cycle tubular battery for extended home emergency backup"
      ],
      "features": [
        "Standard Tubular (800 Cycles) metallurgy & engineering",
        "48 Months Total Warranty (30M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Tall Tubular",
        "Application: Budget 200Ah deep cycle tubular battery for extended home emergency backup"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000231",
    "link": "exide-exide-powerbox-pbtt-1500",
    "image_url": "/products/PBTT_1500.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000001",
    "status": "active",
    "brand_series": "Exide PowerBox",
    "brand_name": "Exide",
    "model_sku": "PBTT 1500",
    "capacity": "150 Ah",
    "voltage": "12V",
    "plate_technology": "Economy Tubular (700 Cycles)",
    "total_warranty_months": 36,
    "foc_months": 18,
    "pro_rata_months": 18,
    "approx_mrp": 13900,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Tall Tubular",
      "application": "Entry level tall tubular battery for low budget residential installations",
      "compatible_applications": [
        "Entry level tall tubular battery for low budget residential installations"
      ],
      "features": [
        "Economy Tubular (700 Cycles) metallurgy & engineering",
        "36 Months Total Warranty (18M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Tall Tubular",
        "Application: Entry level tall tubular battery for low budget residential installations"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000232",
    "link": "exide-exide-powerbox-pbtt-2000",
    "image_url": "/products/PBTT_2000.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000001",
    "status": "active",
    "brand_series": "Exide PowerBox",
    "brand_name": "Exide",
    "model_sku": "PBTT 2000",
    "capacity": "200 Ah",
    "voltage": "12V",
    "plate_technology": "Economy Tubular (700 Cycles)",
    "total_warranty_months": 36,
    "foc_months": 18,
    "pro_rata_months": 18,
    "approx_mrp": 17500,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Tall Tubular",
      "application": "High capacity economy tubular battery for commercial shops and budget homes",
      "compatible_applications": [
        "High capacity economy tubular battery for commercial shops and budget homes"
      ],
      "features": [
        "Economy Tubular (700 Cycles) metallurgy & engineering",
        "36 Months Total Warranty (18M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Tall Tubular",
        "Application: High capacity economy tubular battery for commercial shops and budget homes"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000233",
    "link": "exide-exide-el-ultra-el-ultra-150",
    "image_url": "/products/EL-ULTRA-150.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000001",
    "status": "active",
    "brand_series": "Exide EL Ultra",
    "brand_name": "Exide",
    "model_sku": "EL-ULTRA-150",
    "capacity": "150 Ah",
    "voltage": "12V",
    "plate_technology": "Heavy Duty C10 Tubular (1400 Cycles)",
    "total_warranty_months": 72,
    "foc_months": 54,
    "pro_rata_months": 18,
    "approx_mrp": 24500,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Tall Tubular C10",
      "application": "Industry leading 6-year warranty; C10 rating for rapid recharge and continuous cycling",
      "compatible_applications": [
        "Industry leading 6-year warranty",
        "C10 rating for rapid recharge and continuous cycling"
      ],
      "features": [
        "Heavy Duty C10 Tubular (1400 Cycles) metallurgy & engineering",
        "72 Months Total Warranty (54M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Tall Tubular C10",
        "Application: Industry leading 6-year warranty; C10 rating for rapid recharge and continuous cycling"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000234",
    "link": "exide-exide-el-ultra-el-ultra-200",
    "image_url": "/products/EL-ULTRA-200.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000001",
    "status": "active",
    "brand_series": "Exide EL Ultra",
    "brand_name": "Exide",
    "model_sku": "EL-ULTRA-200",
    "capacity": "200 Ah",
    "voltage": "12V",
    "plate_technology": "Heavy Duty C10 Tubular (1400 Cycles)",
    "total_warranty_months": 72,
    "foc_months": 54,
    "pro_rata_months": 18,
    "approx_mrp": 32000,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Tall Tubular C10",
      "application": "Heavy commercial C10 tubular battery for continuous deep discharge and solar pairing",
      "compatible_applications": [
        "Heavy commercial C10 tubular battery for continuous deep discharge and solar pairing"
      ],
      "features": [
        "Heavy Duty C10 Tubular (1400 Cycles) metallurgy & engineering",
        "72 Months Total Warranty (54M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Tall Tubular C10",
        "Application: Heavy commercial C10 tubular battery for continuous deep discharge and solar pairing"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000235",
    "link": "exide-exide-invaking-iktt-1500",
    "image_url": "/products/IKTT_1500.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000001",
    "status": "active",
    "brand_series": "Exide InvaKing",
    "brand_name": "Exide",
    "model_sku": "IKTT 1500",
    "capacity": "150 Ah",
    "voltage": "12V",
    "plate_technology": "Legacy Heavy Spine Tubular",
    "total_warranty_months": 54,
    "foc_months": 36,
    "pro_rata_months": 18,
    "approx_mrp": 16900,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Tall Tubular",
      "application": "Popular early 2010s deep-cycle tall tubular inverter series (Discontinued)",
      "compatible_applications": [
        "Popular early 2010s deep-cycle tall tubular inverter series (Discontinued)"
      ],
      "features": [
        "Legacy Heavy Spine Tubular metallurgy & engineering",
        "54 Months Total Warranty (36M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Tall Tubular",
        "Application: Popular early 2010s deep-cycle tall tubular inverter series (Discontinued)"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000236",
    "link": "exide-exide-invaplus-ip-1500",
    "image_url": "/products/IP_1500.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000001",
    "status": "active",
    "brand_series": "Exide InvaPlus",
    "brand_name": "Exide",
    "model_sku": "IP 1500",
    "capacity": "150 Ah",
    "voltage": "12V",
    "plate_technology": "Heavy Flat Plate Inverter Line",
    "total_warranty_months": 36,
    "foc_months": 24,
    "pro_rata_months": 12,
    "approx_mrp": 12500,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Flat Plate Flooded",
      "application": "Early flat-plate residential inverter line (Discontinued in favor of tubular)",
      "compatible_applications": [
        "Early flat-plate residential inverter line (Discontinued in favor of tubular)"
      ],
      "features": [
        "Heavy Flat Plate Inverter Line metallurgy & engineering",
        "36 Months Total Warranty (24M Free Replacement + 12M Pro-Rata)",
        "Layout / Form Factor: Flat Plate Flooded",
        "Application: Early flat-plate residential inverter line (Discontinued in favor of tubular)"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000237",
    "link": "exide-exide-tubemaster-tm-1500",
    "image_url": "/products/TM_1500.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000001",
    "status": "active",
    "brand_series": "Exide Tubemaster",
    "brand_name": "Exide",
    "model_sku": "TM 1500",
    "capacity": "150 Ah",
    "voltage": "12V",
    "plate_technology": "Heavy Short Tubular Plate",
    "total_warranty_months": 48,
    "foc_months": 30,
    "pro_rata_months": 18,
    "approx_mrp": 15500,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Short Tubular",
      "application": "Classic short-tubular inverter battery from 2008-2016 period",
      "compatible_applications": [
        "Classic short-tubular inverter battery from 2008-2016 period"
      ],
      "features": [
        "Heavy Short Tubular Plate metallurgy & engineering",
        "48 Months Total Warranty (30M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Short Tubular",
        "Application: Classic short-tubular inverter battery from 2008-2016 period"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000238",
    "link": "exide-exide-home-star-star-12v-700",
    "image_url": "/products/STAR_12V_700.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000002",
    "status": "active",
    "brand_series": "Exide Home Star",
    "brand_name": "Exide",
    "model_sku": "STAR 12V 700",
    "capacity": "700 VA",
    "voltage": "12V",
    "plate_technology": "Pure Sine Wave DSP Microcontroller",
    "total_warranty_months": 24,
    "foc_months": 24,
    "pro_rata_months": 0,
    "approx_mrp": 5400,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Cabinet Desktop",
      "application": "Powers 2 Fans, 3 LED Bulbs, 1 TV, 1 Wi-Fi Router (Small 1-BHK / Studio)",
      "compatible_applications": [
        "Powers 2 Fans",
        "3 LED Bulbs",
        "1 TV",
        "1 Wi-Fi Router (Small 1-BHK / Studio)"
      ],
      "features": [
        "Pure Sine Wave DSP Microcontroller metallurgy & engineering",
        "24 Months Total Warranty (24M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Cabinet Desktop",
        "Application: Powers 2 Fans, 3 LED Bulbs, 1 TV, 1 Wi-Fi Router (Small 1-BHK / Studio)"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000239",
    "link": "exide-exide-home-star-star-12v-900",
    "image_url": "/products/STAR_12V_900.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000002",
    "status": "active",
    "brand_series": "Exide Home Star",
    "brand_name": "Exide",
    "model_sku": "STAR 12V 900",
    "capacity": "900 VA",
    "voltage": "12V",
    "plate_technology": "Pure Sine Wave DSP Microcontroller",
    "total_warranty_months": 24,
    "foc_months": 24,
    "pro_rata_months": 0,
    "approx_mrp": 6200,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Cabinet Desktop",
      "application": "Powers 3 Fans, 5 LED Bulbs, 1 Smart TV, 1 Laptop, 1 Set Top Box (2-BHK)",
      "compatible_applications": [
        "Powers 3 Fans",
        "5 LED Bulbs",
        "1 Smart TV",
        "1 Laptop",
        "1 Set Top Box (2-BHK)"
      ],
      "features": [
        "Pure Sine Wave DSP Microcontroller metallurgy & engineering",
        "24 Months Total Warranty (24M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Cabinet Desktop",
        "Application: Powers 3 Fans, 5 LED Bulbs, 1 Smart TV, 1 Laptop, 1 Set Top Box (2-BHK)"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000240",
    "link": "exide-exide-home-star-star-12v-1125",
    "image_url": "/products/STAR_12V_1125.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000002",
    "status": "active",
    "brand_series": "Exide Home Star",
    "brand_name": "Exide",
    "model_sku": "STAR 12V 1125",
    "capacity": "1125 VA",
    "voltage": "12V",
    "plate_technology": "Pure Sine Wave DSP Microcontroller",
    "total_warranty_months": 24,
    "foc_months": 24,
    "pro_rata_months": 0,
    "approx_mrp": 7100,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Cabinet Desktop",
      "application": "Powers 4 Fans, 6 LEDs, 1 TV, 1 Refrigerator (under 250L), Desktop PC (3-BHK)",
      "compatible_applications": [
        "Powers 4 Fans",
        "6 LEDs",
        "1 TV",
        "1 Refrigerator (under 250L)",
        "Desktop PC (3-BHK)"
      ],
      "features": [
        "Pure Sine Wave DSP Microcontroller metallurgy & engineering",
        "24 Months Total Warranty (24M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Cabinet Desktop",
        "Application: Powers 4 Fans, 6 LEDs, 1 TV, 1 Refrigerator (under 250L), Desktop PC (3-BHK)"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000241",
    "link": "exide-exide-home-star-star-12v-1375",
    "image_url": "/products/STAR_12V_1375.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000002",
    "status": "active",
    "brand_series": "Exide Home Star",
    "brand_name": "Exide",
    "model_sku": "STAR 12V 1375",
    "capacity": "1375 VA",
    "voltage": "12V",
    "plate_technology": "Pure Sine Wave DSP Microcontroller",
    "total_warranty_months": 24,
    "foc_months": 24,
    "pro_rata_months": 0,
    "approx_mrp": 8400,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Cabinet Desktop",
      "application": "Heavy single-battery 12V UPS; supports domestic water pump / mixer grinder briefly",
      "compatible_applications": [
        "Heavy single-battery 12V UPS",
        "supports domestic water pump / mixer grinder briefly"
      ],
      "features": [
        "Pure Sine Wave DSP Microcontroller metallurgy & engineering",
        "24 Months Total Warranty (24M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Cabinet Desktop",
        "Application: Heavy single-battery 12V UPS; supports domestic water pump / mixer grinder briefly"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000242",
    "link": "exide-exide-home-gqp-gqp-12v-1125",
    "image_url": "/products/GQP_12V_1125.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000002",
    "status": "active",
    "brand_series": "Exide Home GQP",
    "brand_name": "Exide",
    "model_sku": "GQP 12V 1125",
    "capacity": "1125 VA",
    "voltage": "12V",
    "plate_technology": "Heavy Copper Wound Transformer Sine",
    "total_warranty_months": 36,
    "foc_months": 36,
    "pro_rata_months": 0,
    "approx_mrp": 8200,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Cabinet Desktop",
      "application": "Heavy copper transformer topology; superior surge protection against grid spikes",
      "compatible_applications": [
        "Heavy copper transformer topology",
        "superior surge protection against grid spikes"
      ],
      "features": [
        "Heavy Copper Wound Transformer Sine metallurgy & engineering",
        "36 Months Total Warranty (36M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Cabinet Desktop",
        "Application: Heavy copper transformer topology; superior surge protection against grid spikes"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000243",
    "link": "exide-exide-home-gqp-gqp-24v-1500",
    "image_url": "/products/GQP_24V_1500.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000002",
    "status": "active",
    "brand_series": "Exide Home GQP",
    "brand_name": "Exide",
    "model_sku": "GQP 24V 1500",
    "capacity": "1500 VA",
    "voltage": "24V",
    "plate_technology": "Heavy Copper Wound Transformer Sine",
    "total_warranty_months": 36,
    "foc_months": 36,
    "pro_rata_months": 0,
    "approx_mrp": 11500,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Cabinet Desktop",
      "application": "24V dual battery system for duplexes, pathology labs, and retail billing counters",
      "compatible_applications": [
        "24V dual battery system for duplexes",
        "pathology labs",
        "and retail billing counters"
      ],
      "features": [
        "Heavy Copper Wound Transformer Sine metallurgy & engineering",
        "36 Months Total Warranty (36M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Cabinet Desktop",
        "Application: 24V dual battery system for duplexes, pathology labs, and retail billing counters"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000244",
    "link": "exide-exide-home-gqp-gqp-24v-2500",
    "image_url": "/products/GQP_24V_2500.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000002",
    "status": "active",
    "brand_series": "Exide Home GQP",
    "brand_name": "Exide",
    "model_sku": "GQP 24V 2500",
    "capacity": "2500 VA",
    "voltage": "24V",
    "plate_technology": "Heavy Copper Wound Transformer Sine",
    "total_warranty_months": 36,
    "foc_months": 36,
    "pro_rata_months": 0,
    "approx_mrp": 16800,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Cabinet Desktop",
      "application": "High capacity commercial pure sine wave system for dental clinics and IT server racks",
      "compatible_applications": [
        "High capacity commercial pure sine wave system for dental clinics and IT server racks"
      ],
      "features": [
        "Heavy Copper Wound Transformer Sine metallurgy & engineering",
        "36 Months Total Warranty (36M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Cabinet Desktop",
        "Application: High capacity commercial pure sine wave system for dental clinics and IT server racks"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000245",
    "link": "exide-exide-home-gqp-gqp-36v-3500",
    "image_url": "/products/GQP_36V_3500.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000002",
    "status": "active",
    "brand_series": "Exide Home GQP",
    "brand_name": "Exide",
    "model_sku": "GQP 36V 3500",
    "capacity": "3500 VA",
    "voltage": "36V",
    "plate_technology": "Heavy 3-Battery Industrial Sine Wave",
    "total_warranty_months": 36,
    "foc_months": 36,
    "pro_rata_months": 0,
    "approx_mrp": 24500,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Tower Cabinet",
      "application": "Offices with 10+ PCs, photocopiers, laser printers, medical diagnostic equipment",
      "compatible_applications": [
        "Offices with 10+ PCs",
        "photocopiers",
        "laser printers",
        "medical diagnostic equipment"
      ],
      "features": [
        "Heavy 3-Battery Industrial Sine Wave metallurgy & engineering",
        "36 Months Total Warranty (36M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Tower Cabinet",
        "Application: Offices with 10+ PCs, photocopiers, laser printers, medical diagnostic equipment"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000246",
    "link": "exide-exide-home-gqp-gqp-48v-5000",
    "image_url": "/products/GQP_48V_5000.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000002",
    "status": "active",
    "brand_series": "Exide Home GQP",
    "brand_name": "Exide",
    "model_sku": "GQP 48V 5000",
    "capacity": "5000 VA",
    "voltage": "48V",
    "plate_technology": "Heavy 4-Battery Commercial Sine Wave",
    "total_warranty_months": 36,
    "foc_months": 36,
    "pro_rata_months": 0,
    "approx_mrp": 34000,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Tower Cabinet",
      "application": "Small commercial banks, petrol pumps, boutique hospitals, lifts",
      "compatible_applications": [
        "Small commercial banks",
        "petrol pumps",
        "boutique hospitals",
        "lifts"
      ],
      "features": [
        "Heavy 4-Battery Commercial Sine Wave metallurgy & engineering",
        "36 Months Total Warranty (36M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Tower Cabinet",
        "Application: Small commercial banks, petrol pumps, boutique hospitals, lifts"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000247",
    "link": "exide-exide-integra-integra-700",
    "image_url": "/products/INTEGRA_700.png",
    "category_id": "b0000000-0000-0000-0000-000000000002",
    "status": "active",
    "brand_series": "Exide Integra",
    "brand_name": "Exide",
    "model_sku": "INTEGRA 700",
    "capacity": "720 Wh",
    "voltage": "25.6V",
    "plate_technology": "Integrated LiFePO4 Battery + BMS",
    "total_warranty_months": 60,
    "foc_months": 60,
    "pro_rata_months": 0,
    "approx_mrp": 28500,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Wall Mounted",
      "application": "Sleek wall-mounted design; 3x faster charging; 2500+ life cycles; zero floor space",
      "compatible_applications": [
        "Sleek wall-mounted design",
        "3x faster charging",
        "2500+ life cycles",
        "zero floor space"
      ],
      "features": [
        "Integrated LiFePO4 Battery + BMS metallurgy & engineering",
        "60 Months Total Warranty (60M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Wall Mounted",
        "Application: Sleek wall-mounted design; 3x faster charging; 2500+ life cycles; zero floor space"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000248",
    "link": "exide-exide-integra-integra-1000",
    "image_url": "/products/INTEGRA_1000.png",
    "category_id": "b0000000-0000-0000-0000-000000000002",
    "status": "active",
    "brand_series": "Exide Integra",
    "brand_name": "Exide",
    "model_sku": "INTEGRA 1000",
    "capacity": "1024 Wh",
    "voltage": "25.6V",
    "plate_technology": "Integrated LiFePO4 Battery + BMS",
    "total_warranty_months": 60,
    "foc_months": 60,
    "pro_rata_months": 0,
    "approx_mrp": 38000,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Wall Mounted",
      "application": "High energy LiFePO4 wall inverter with real-time digital LCD and silent operation",
      "compatible_applications": [
        "High energy LiFePO4 wall inverter with real-time digital LCD and silent operation"
      ],
      "features": [
        "Integrated LiFePO4 Battery + BMS metallurgy & engineering",
        "60 Months Total Warranty (60M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Wall Mounted",
        "Application: High energy LiFePO4 wall inverter with real-time digital LCD and silent operation"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000249",
    "link": "exide-exide-invasmart-smart-850",
    "image_url": "/products/SMART_850.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000002",
    "status": "active",
    "brand_series": "Exide InvaSmart",
    "brand_name": "Exide",
    "model_sku": "SMART 850",
    "capacity": "850 VA",
    "voltage": "12V",
    "plate_technology": "Square Wave Domestic Inverter",
    "total_warranty_months": 24,
    "foc_months": 24,
    "pro_rata_months": 0,
    "approx_mrp": 4100,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Cabinet Desktop",
      "application": "Early entry-level square-wave home inverter (Discontinued)",
      "compatible_applications": [
        "Early entry-level square-wave home inverter (Discontinued)"
      ],
      "features": [
        "Square Wave Domestic Inverter metallurgy & engineering",
        "24 Months Total Warranty (24M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Cabinet Desktop",
        "Application: Early entry-level square-wave home inverter (Discontinued)"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000250",
    "link": "exide-exide-invasmart-smart-1050",
    "image_url": "/products/SMART_1050.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000002",
    "status": "active",
    "brand_series": "Exide InvaSmart",
    "brand_name": "Exide",
    "model_sku": "SMART 1050",
    "capacity": "1050 VA",
    "voltage": "12V",
    "plate_technology": "Square Wave Domestic Inverter",
    "total_warranty_months": 24,
    "foc_months": 24,
    "pro_rata_months": 0,
    "approx_mrp": 4900,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Cabinet Desktop",
      "application": "Early generation quasi-sine residential backup unit",
      "compatible_applications": [
        "Early generation quasi-sine residential backup unit"
      ],
      "features": [
        "Square Wave Domestic Inverter metallurgy & engineering",
        "24 Months Total Warranty (24M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Cabinet Desktop",
        "Application: Early generation quasi-sine residential backup unit"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000251",
    "link": "exide-exide-xpress-xp880",
    "image_url": "/products/XP880.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000005",
    "status": "active",
    "brand_series": "Exide Xpress",
    "brand_name": "Exide",
    "model_sku": "XP880",
    "capacity": "88 Ah",
    "voltage": "12V",
    "plate_technology": "Heavy Duty Hybrid Alloy",
    "total_warranty_months": 36,
    "foc_months": 18,
    "pro_rata_months": 18,
    "approx_mrp": 8200,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left",
      "application": "Light Commercial Vehicles (LCV): Tata 407, Tata 709, Eicher Pro 1049, Ashok Leyland Dost",
      "compatible_applications": [
        "Light Commercial Vehicles (LCV): Tata 407",
        "Tata 709",
        "Eicher Pro 1049",
        "Ashok Leyland Dost"
      ],
      "features": [
        "Heavy Duty Hybrid Alloy metallurgy & engineering",
        "36 Months Total Warranty (18M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Left",
        "Application: Light Commercial Vehicles (LCV): Tata 407, Tata 709, Eicher Pro 1049, Ashok Leyland Dost"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000252",
    "link": "exide-exide-xpress-xp1000",
    "image_url": "/products/XP1000.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000005",
    "status": "active",
    "brand_series": "Exide Xpress",
    "brand_name": "Exide",
    "model_sku": "XP1000",
    "capacity": "100 Ah",
    "voltage": "12V",
    "plate_technology": "Heavy Duty Hybrid Alloy",
    "total_warranty_months": 36,
    "foc_months": 18,
    "pro_rata_months": 18,
    "approx_mrp": 9400,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left",
      "application": "Medium Commercial Vehicles (MCV): Tata 1109, Eicher Pro 11.10, Ashok Leyland Partner",
      "compatible_applications": [
        "Medium Commercial Vehicles (MCV): Tata 1109",
        "Eicher Pro 11.10",
        "Ashok Leyland Partner"
      ],
      "features": [
        "Heavy Duty Hybrid Alloy metallurgy & engineering",
        "36 Months Total Warranty (18M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Left",
        "Application: Medium Commercial Vehicles (MCV): Tata 1109, Eicher Pro 11.10, Ashok Leyland Partner"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000253",
    "link": "exide-exide-xpress-xp1300",
    "image_url": "/products/XP1300.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000005",
    "status": "active",
    "brand_series": "Exide Xpress",
    "brand_name": "Exide",
    "model_sku": "XP1300",
    "capacity": "130 Ah",
    "voltage": "12V",
    "plate_technology": "Heavy Duty Hybrid Alloy",
    "total_warranty_months": 36,
    "foc_months": 18,
    "pro_rata_months": 18,
    "approx_mrp": 11800,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left",
      "application": "Heavy Commercial Vehicles (HCV): Tata Signa 2818, Ashok Leyland 1616, City/Intercity Buses",
      "compatible_applications": [
        "Heavy Commercial Vehicles (HCV): Tata Signa 2818",
        "Ashok Leyland 1616",
        "City/Intercity Buses"
      ],
      "features": [
        "Heavy Duty Hybrid Alloy metallurgy & engineering",
        "36 Months Total Warranty (18M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Left",
        "Application: Heavy Commercial Vehicles (HCV): Tata Signa 2818, Ashok Leyland 1616, City/Intercity Buses"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000254",
    "link": "exide-exide-xpress-xp1500",
    "image_url": "/products/XP1500.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000005",
    "status": "active",
    "brand_series": "Exide Xpress",
    "brand_name": "Exide",
    "model_sku": "XP1500",
    "capacity": "150 Ah",
    "voltage": "12V",
    "plate_technology": "Heavy Duty Hybrid Alloy",
    "total_warranty_months": 36,
    "foc_months": 18,
    "pro_rata_months": 18,
    "approx_mrp": 13400,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left",
      "application": "Multi-Axle Heavy Trucks & Tippers: Tata Prima, BharatBenz 2823, Ashok Leyland 2820",
      "compatible_applications": [
        "Multi-Axle Heavy Trucks & Tippers: Tata Prima",
        "BharatBenz 2823",
        "Ashok Leyland 2820"
      ],
      "features": [
        "Heavy Duty Hybrid Alloy metallurgy & engineering",
        "36 Months Total Warranty (18M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Left",
        "Application: Multi-Axle Heavy Trucks & Tippers: Tata Prima, BharatBenz 2823, Ashok Leyland 2820"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000255",
    "link": "exide-exide-xpress-xp1800",
    "image_url": "/products/XP1800.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000005",
    "status": "active",
    "brand_series": "Exide Xpress",
    "brand_name": "Exide",
    "model_sku": "XP1800",
    "capacity": "180 Ah",
    "voltage": "12V",
    "plate_technology": "Heavy Duty Hybrid Alloy",
    "total_warranty_months": 36,
    "foc_months": 18,
    "pro_rata_months": 18,
    "approx_mrp": 15900,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left",
      "application": "Heavy Long-Haul Trailers, Mining Tippers, Volvo 9400 Intercity Luxury Coaches",
      "compatible_applications": [
        "Heavy Long-Haul Trailers",
        "Mining Tippers",
        "Volvo 9400 Intercity Luxury Coaches"
      ],
      "features": [
        "Heavy Duty Hybrid Alloy metallurgy & engineering",
        "36 Months Total Warranty (18M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Left",
        "Application: Heavy Long-Haul Trailers, Mining Tippers, Volvo 9400 Intercity Luxury Coaches"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000256",
    "link": "exide-exide-xpress-xp2000",
    "image_url": "/products/XP2000.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000005",
    "status": "active",
    "brand_series": "Exide Xpress",
    "brand_name": "Exide",
    "model_sku": "XP2000",
    "capacity": "200 Ah",
    "voltage": "12V",
    "plate_technology": "Heavy Duty Hybrid Alloy",
    "total_warranty_months": 36,
    "foc_months": 18,
    "pro_rata_months": 18,
    "approx_mrp": 17800,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left",
      "application": "Ultra heavy cranes, construction equipment, earthmovers (JCB, CAT Heavy Loaders)",
      "compatible_applications": [
        "Ultra heavy cranes",
        "construction equipment",
        "earthmovers (JCB",
        "CAT Heavy Loaders)"
      ],
      "features": [
        "Heavy Duty Hybrid Alloy metallurgy & engineering",
        "36 Months Total Warranty (18M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Left",
        "Application: Ultra heavy cranes, construction equipment, earthmovers (JCB, CAT Heavy Loaders)"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000257",
    "link": "exide-exide-gold-commercial-gold800",
    "image_url": "/products/GOLD800.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000005",
    "status": "active",
    "brand_series": "Exide Gold Commercial",
    "brand_name": "Exide",
    "model_sku": "GOLD800",
    "capacity": "80 Ah",
    "voltage": "12V",
    "plate_technology": "Traditional Hard Rubber Container",
    "total_warranty_months": 18,
    "foc_months": 12,
    "pro_rata_months": 6,
    "approx_mrp": 6800,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left",
      "application": "Legacy Tata 407, Swaraj Mazda (Discontinued hard-rubber series)",
      "compatible_applications": [
        "Legacy Tata 407",
        "Swaraj Mazda (Discontinued hard-rubber series)"
      ],
      "features": [
        "Traditional Hard Rubber Container metallurgy & engineering",
        "18 Months Total Warranty (12M Free Replacement + 6M Pro-Rata)",
        "Layout / Form Factor: Left",
        "Application: Legacy Tata 407, Swaraj Mazda (Discontinued hard-rubber series)"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000258",
    "link": "exide-exide-gold-commercial-gold1300",
    "image_url": "/products/GOLD1300.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000005",
    "status": "active",
    "brand_series": "Exide Gold Commercial",
    "brand_name": "Exide",
    "model_sku": "GOLD1300",
    "capacity": "130 Ah",
    "voltage": "12V",
    "plate_technology": "Traditional Hard Rubber Container",
    "total_warranty_months": 18,
    "foc_months": 12,
    "pro_rata_months": 6,
    "approx_mrp": 9900,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left",
      "application": "Vintage Ashok Leyland Comet, Tata 1210 / 1512 Trucks",
      "compatible_applications": [
        "Vintage Ashok Leyland Comet",
        "Tata 1210 / 1512 Trucks"
      ],
      "features": [
        "Traditional Hard Rubber Container metallurgy & engineering",
        "18 Months Total Warranty (12M Free Replacement + 6M Pro-Rata)",
        "Layout / Form Factor: Left",
        "Application: Vintage Ashok Leyland Comet, Tata 1210 / 1512 Trucks"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000259",
    "link": "exide-exide-loadmax-lm1500",
    "image_url": "/products/LM1500.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000005",
    "status": "active",
    "brand_series": "Exide Loadmax",
    "brand_name": "Exide",
    "model_sku": "LM1500",
    "capacity": "150 Ah",
    "voltage": "12V",
    "plate_technology": "Commercial Flooded Transport Line",
    "total_warranty_months": 24,
    "foc_months": 12,
    "pro_rata_months": 12,
    "approx_mrp": 11200,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left",
      "application": "Fleet commercial haulage battery from 2005-2015 period",
      "compatible_applications": [
        "Fleet commercial haulage battery from 2005-2015 period"
      ],
      "features": [
        "Commercial Flooded Transport Line metallurgy & engineering",
        "24 Months Total Warranty (12M Free Replacement + 12M Pro-Rata)",
        "Layout / Form Factor: Left",
        "Application: Fleet commercial haulage battery from 2005-2015 period"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000260",
    "link": "exide-exide-jai-kisan-jk75",
    "image_url": "/products/JK75.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000005",
    "status": "active",
    "brand_series": "Exide Jai Kisan",
    "brand_name": "Exide",
    "model_sku": "JK75",
    "capacity": "75 Ah",
    "voltage": "12V",
    "plate_technology": "Vibration-Resistant Agri Flooded",
    "total_warranty_months": 36,
    "foc_months": 18,
    "pro_rata_months": 18,
    "approx_mrp": 7200,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left",
      "application": "Mahindra 275 DI / 475 DI, Swaraj 735 FE, Eicher 242 / 380, Tafe 241 DI",
      "compatible_applications": [
        "Mahindra 275 DI / 475 DI",
        "Swaraj 735 FE",
        "Eicher 242 / 380",
        "Tafe 241 DI"
      ],
      "features": [
        "Vibration-Resistant Agri Flooded metallurgy & engineering",
        "36 Months Total Warranty (18M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Left",
        "Application: Mahindra 275 DI / 475 DI, Swaraj 735 FE, Eicher 242 / 380, Tafe 241 DI"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000261",
    "link": "exide-exide-jai-kisan-jk80",
    "image_url": "/products/JK80.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000005",
    "status": "active",
    "brand_series": "Exide Jai Kisan",
    "brand_name": "Exide",
    "model_sku": "JK80",
    "capacity": "80 Ah",
    "voltage": "12V",
    "plate_technology": "Vibration-Resistant Agri Flooded",
    "total_warranty_months": 36,
    "foc_months": 18,
    "pro_rata_months": 18,
    "approx_mrp": 7600,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left",
      "application": "Sonalika DI 35, Swaraj 843 XM, Mahindra 575 DI",
      "compatible_applications": [
        "Sonalika DI 35",
        "Swaraj 843 XM",
        "Mahindra 575 DI"
      ],
      "features": [
        "Vibration-Resistant Agri Flooded metallurgy & engineering",
        "36 Months Total Warranty (18M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Left",
        "Application: Sonalika DI 35, Swaraj 843 XM, Mahindra 575 DI"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000262",
    "link": "exide-exide-jai-kisan-jk88",
    "image_url": "/products/JK88.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000005",
    "status": "active",
    "brand_series": "Exide Jai Kisan",
    "brand_name": "Exide",
    "model_sku": "JK88",
    "capacity": "88 Ah",
    "voltage": "12V",
    "plate_technology": "Vibration-Resistant Agri Flooded",
    "total_warranty_months": 36,
    "foc_months": 18,
    "pro_rata_months": 18,
    "approx_mrp": 8100,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left",
      "application": "John Deere 5105 / 5050, Sonalika DI 745, New Holland 3600-2, Farmtrac 45",
      "compatible_applications": [
        "John Deere 5105 / 5050",
        "Sonalika DI 745",
        "New Holland 3600-2",
        "Farmtrac 45"
      ],
      "features": [
        "Vibration-Resistant Agri Flooded metallurgy & engineering",
        "36 Months Total Warranty (18M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Left",
        "Application: John Deere 5105 / 5050, Sonalika DI 745, New Holland 3600-2, Farmtrac 45"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000263",
    "link": "exide-exide-jai-kisan-jk100",
    "image_url": "/products/JK100.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000005",
    "status": "active",
    "brand_series": "Exide Jai Kisan",
    "brand_name": "Exide",
    "model_sku": "JK100",
    "capacity": "100 Ah",
    "voltage": "12V",
    "plate_technology": "Vibration-Resistant Agri Flooded",
    "total_warranty_months": 36,
    "foc_months": 18,
    "pro_rata_months": 18,
    "approx_mrp": 9300,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left",
      "application": "Heavy 60HP+ 4WD Tractors: John Deere 5310, New Holland 5620, Preet 6049, Combine Harvesters",
      "compatible_applications": [
        "Heavy 60HP+ 4WD Tractors: John Deere 5310",
        "New Holland 5620",
        "Preet 6049",
        "Combine Harvesters"
      ],
      "features": [
        "Vibration-Resistant Agri Flooded metallurgy & engineering",
        "36 Months Total Warranty (18M Free Replacement + 18M Pro-Rata)",
        "Layout / Form Factor: Left",
        "Application: Heavy 60HP+ 4WD Tractors: John Deere 5310, New Holland 5620, Preet 6049, Combine Harvesters"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000264",
    "link": "exide-exide-genplus-gp75",
    "image_url": "/products/GP75.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000007",
    "status": "active",
    "brand_series": "Exide Genplus",
    "brand_name": "Exide",
    "model_sku": "GP75",
    "capacity": "75 Ah",
    "voltage": "12V",
    "plate_technology": "Instant High-CCA Genset Flooded",
    "total_warranty_months": 24,
    "foc_months": 24,
    "pro_rata_months": 0,
    "approx_mrp": 7600,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left",
      "application": "10 kVA to 25 kVA Diesel Generator Sets (Kirloskar, Mahindra Powerol)",
      "compatible_applications": [
        "10 kVA to 25 kVA Diesel Generator Sets (Kirloskar",
        "Mahindra Powerol)"
      ],
      "features": [
        "Instant High-CCA Genset Flooded metallurgy & engineering",
        "24 Months Total Warranty (24M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Left",
        "Application: 10 kVA to 25 kVA Diesel Generator Sets (Kirloskar, Mahindra Powerol)"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000265",
    "link": "exide-exide-genplus-gp88",
    "image_url": "/products/GP88.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000007",
    "status": "active",
    "brand_series": "Exide Genplus",
    "brand_name": "Exide",
    "model_sku": "GP88",
    "capacity": "88 Ah",
    "voltage": "12V",
    "plate_technology": "Instant High-CCA Genset Flooded",
    "total_warranty_months": 24,
    "foc_months": 24,
    "pro_rata_months": 0,
    "approx_mrp": 8600,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left",
      "application": "25 kVA to 40 kVA DG Sets (Ashok Leyland Power Solutions)",
      "compatible_applications": [
        "25 kVA to 40 kVA DG Sets (Ashok Leyland Power Solutions)"
      ],
      "features": [
        "Instant High-CCA Genset Flooded metallurgy & engineering",
        "24 Months Total Warranty (24M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Left",
        "Application: 25 kVA to 40 kVA DG Sets (Ashok Leyland Power Solutions)"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000266",
    "link": "exide-exide-genplus-gp100",
    "image_url": "/products/GP100.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000007",
    "status": "active",
    "brand_series": "Exide Genplus",
    "brand_name": "Exide",
    "model_sku": "GP100",
    "capacity": "100 Ah",
    "voltage": "12V",
    "plate_technology": "Instant High-CCA Genset Flooded",
    "total_warranty_months": 24,
    "foc_months": 24,
    "pro_rata_months": 0,
    "approx_mrp": 9800,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left",
      "application": "30 kVA to 62.5 kVA Diesel Generator Sets (Cummins, Ashok Leyland Gensets)",
      "compatible_applications": [
        "30 kVA to 62.5 kVA Diesel Generator Sets (Cummins",
        "Ashok Leyland Gensets)"
      ],
      "features": [
        "Instant High-CCA Genset Flooded metallurgy & engineering",
        "24 Months Total Warranty (24M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Left",
        "Application: 30 kVA to 62.5 kVA Diesel Generator Sets (Cummins, Ashok Leyland Gensets)"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000267",
    "link": "exide-exide-genplus-gp120",
    "image_url": "/products/GP120.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000007",
    "status": "active",
    "brand_series": "Exide Genplus",
    "brand_name": "Exide",
    "model_sku": "GP120",
    "capacity": "120 Ah",
    "voltage": "12V",
    "plate_technology": "Instant High-CCA Genset Flooded",
    "total_warranty_months": 24,
    "foc_months": 24,
    "pro_rata_months": 0,
    "approx_mrp": 11500,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left",
      "application": "82.5 kVA to 125 kVA Industrial Diesel Gensets (Caterpillar, Cummins India)",
      "compatible_applications": [
        "82.5 kVA to 125 kVA Industrial Diesel Gensets (Caterpillar",
        "Cummins India)"
      ],
      "features": [
        "Instant High-CCA Genset Flooded metallurgy & engineering",
        "24 Months Total Warranty (24M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Left",
        "Application: 82.5 kVA to 125 kVA Industrial Diesel Gensets (Caterpillar, Cummins India)"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000268",
    "link": "exide-exide-genplus-gp150",
    "image_url": "/products/GP150.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000007",
    "status": "active",
    "brand_series": "Exide Genplus",
    "brand_name": "Exide",
    "model_sku": "GP150",
    "capacity": "150 Ah",
    "voltage": "12V",
    "plate_technology": "Instant High-CCA Genset Flooded",
    "total_warranty_months": 24,
    "foc_months": 24,
    "pro_rata_months": 0,
    "approx_mrp": 13800,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left",
      "application": "125 kVA to 200 kVA Cummins / Kirloskar Silent Canopy Gensets",
      "compatible_applications": [
        "125 kVA to 200 kVA Cummins / Kirloskar Silent Canopy Gensets"
      ],
      "features": [
        "Instant High-CCA Genset Flooded metallurgy & engineering",
        "24 Months Total Warranty (24M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Left",
        "Application: 125 kVA to 200 kVA Cummins / Kirloskar Silent Canopy Gensets"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000269",
    "link": "exide-exide-genplus-gp180",
    "image_url": "/products/GP180.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000007",
    "status": "active",
    "brand_series": "Exide Genplus",
    "brand_name": "Exide",
    "model_sku": "GP180",
    "capacity": "180 Ah",
    "voltage": "12V",
    "plate_technology": "Instant High-CCA Genset Flooded",
    "total_warranty_months": 24,
    "foc_months": 24,
    "pro_rata_months": 0,
    "approx_mrp": 16200,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Left",
      "application": "160 kVA to 500 kVA Heavy Industrial Backup Power Generators",
      "compatible_applications": [
        "160 kVA to 500 kVA Heavy Industrial Backup Power Generators"
      ],
      "features": [
        "Instant High-CCA Genset Flooded metallurgy & engineering",
        "24 Months Total Warranty (24M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Left",
        "Application: 160 kVA to 500 kVA Heavy Industrial Backup Power Generators"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000270",
    "link": "exide-exide-neo-neo-100",
    "image_url": "/products/NEO_100.png",
    "category_id": "b0000000-0000-0000-0000-000000000006",
    "status": "active",
    "brand_series": "Exide Neo",
    "brand_name": "Exide",
    "model_sku": "NEO 100",
    "capacity": "100 Ah",
    "voltage": "12V",
    "plate_technology": "Deep-Cycle Tubular E-Rickshaw",
    "total_warranty_months": 12,
    "foc_months": 9,
    "pro_rata_months": 3,
    "approx_mrp": 7900,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Standard",
      "application": "Standard 4-passenger commercial electric rickshaws (Pack of 4 = 48V bank)",
      "compatible_applications": [
        "Standard 4-passenger commercial electric rickshaws (Pack of 4 = 48V bank)"
      ],
      "features": [
        "Deep-Cycle Tubular E-Rickshaw metallurgy & engineering",
        "12 Months Total Warranty (9M Free Replacement + 3M Pro-Rata)",
        "Layout / Form Factor: Standard",
        "Application: Standard 4-passenger commercial electric rickshaws (Pack of 4 = 48V bank)"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000271",
    "link": "exide-exide-duralife-duralife-130",
    "image_url": "/products/DURALIFE_130.png",
    "category_id": "b0000000-0000-0000-0000-000000000006",
    "status": "active",
    "brand_series": "Exide Duralife",
    "brand_name": "Exide",
    "model_sku": "DURALIFE 130",
    "capacity": "130 Ah",
    "voltage": "12V",
    "plate_technology": "Deep-Cycle Tubular E-Rickshaw",
    "total_warranty_months": 15,
    "foc_months": 12,
    "pro_rata_months": 3,
    "approx_mrp": 9800,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Standard",
      "application": "Long-range passenger electric rickshaws for higher daily running kilometers",
      "compatible_applications": [
        "Long-range passenger electric rickshaws for higher daily running kilometers"
      ],
      "features": [
        "Deep-Cycle Tubular E-Rickshaw metallurgy & engineering",
        "15 Months Total Warranty (12M Free Replacement + 3M Pro-Rata)",
        "Layout / Form Factor: Standard",
        "Application: Long-range passenger electric rickshaws for higher daily running kilometers"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000272",
    "link": "exide-exide-e-ride-plus-e-ride-plus-140",
    "image_url": "/products/E-RIDE_PLUS_140.png",
    "category_id": "b0000000-0000-0000-0000-000000000006",
    "status": "active",
    "brand_series": "Exide E-Ride Plus",
    "brand_name": "Exide",
    "model_sku": "E-RIDE PLUS 140",
    "capacity": "140 Ah",
    "voltage": "12V",
    "plate_technology": "Heavy Duty Deep-Cycle Tubular",
    "total_warranty_months": 18,
    "foc_months": 12,
    "pro_rata_months": 6,
    "approx_mrp": 10800,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Standard",
      "application": "Heavy-duty electric cargo delivery loaders and multi-shift e-rickshaws",
      "compatible_applications": [
        "Heavy-duty electric cargo delivery loaders and multi-shift e-rickshaws"
      ],
      "features": [
        "Heavy Duty Deep-Cycle Tubular metallurgy & engineering",
        "18 Months Total Warranty (12M Free Replacement + 6M Pro-Rata)",
        "Layout / Form Factor: Standard",
        "Application: Heavy-duty electric cargo delivery loaders and multi-shift e-rickshaws"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000273",
    "link": "exide-exide-e-ride-e-ride-100",
    "image_url": "/products/E-RIDE_100.png",
    "category_id": "b0000000-0000-0000-0000-000000000006",
    "status": "active",
    "brand_series": "Exide E-Ride",
    "brand_name": "Exide",
    "model_sku": "E-RIDE 100",
    "capacity": "100 Ah",
    "voltage": "12V",
    "plate_technology": "Tubular E-Rickshaw Baseline",
    "total_warranty_months": 12,
    "foc_months": 9,
    "pro_rata_months": 3,
    "approx_mrp": 7400,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Standard",
      "application": "Baseline passenger e-rickshaws (Early generation E-Ride model)",
      "compatible_applications": [
        "Baseline passenger e-rickshaws (Early generation E-Ride model)"
      ],
      "features": [
        "Tubular E-Rickshaw Baseline metallurgy & engineering",
        "12 Months Total Warranty (9M Free Replacement + 3M Pro-Rata)",
        "Layout / Form Factor: Standard",
        "Application: Baseline passenger e-rickshaws (Early generation E-Ride model)"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000274",
    "link": "exide-exide-solarblitz-solarblitz-40",
    "image_url": "/products/SOLARBLITZ_40.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000007",
    "status": "active",
    "brand_series": "Exide Solarblitz",
    "brand_name": "Exide",
    "model_sku": "SOLARBLITZ 40",
    "capacity": "40 Ah",
    "voltage": "12V",
    "plate_technology": "Solar Deep-Cycle C10 (PSoC Compliant)",
    "total_warranty_months": 60,
    "foc_months": 60,
    "pro_rata_months": 0,
    "approx_mrp": 5800,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Solar Tall Tubular C10",
      "application": "Solar street lights, solar LED blinkers, telemetry units",
      "compatible_applications": [
        "Solar street lights",
        "solar LED blinkers",
        "telemetry units"
      ],
      "features": [
        "Solar Deep-Cycle C10 (PSoC Compliant) metallurgy & engineering",
        "60 Months Total Warranty (60M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Solar Tall Tubular C10",
        "Application: Solar street lights, solar LED blinkers, telemetry units"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000275",
    "link": "exide-exide-solarblitz-solarblitz-75",
    "image_url": "/products/SOLARBLITZ_75.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000007",
    "status": "active",
    "brand_series": "Exide Solarblitz",
    "brand_name": "Exide",
    "model_sku": "SOLARBLITZ 75",
    "capacity": "75 Ah",
    "voltage": "12V",
    "plate_technology": "Solar Deep-Cycle C10 (PSoC Compliant)",
    "total_warranty_months": 60,
    "foc_months": 60,
    "pro_rata_months": 0,
    "approx_mrp": 8400,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Solar Tall Tubular C10",
      "application": "Small 300W-500W rural off-grid home lighting kits",
      "compatible_applications": [
        "Small 300W-500W rural off-grid home lighting kits"
      ],
      "features": [
        "Solar Deep-Cycle C10 (PSoC Compliant) metallurgy & engineering",
        "60 Months Total Warranty (60M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Solar Tall Tubular C10",
        "Application: Small 300W-500W rural off-grid home lighting kits"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000276",
    "link": "exide-exide-solarblitz-solarblitz-100",
    "image_url": "/products/SOLARBLITZ_100.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000007",
    "status": "active",
    "brand_series": "Exide Solarblitz",
    "brand_name": "Exide",
    "model_sku": "SOLARBLITZ 100",
    "capacity": "100 Ah",
    "voltage": "12V",
    "plate_technology": "Solar Deep-Cycle C10 (PSoC Compliant)",
    "total_warranty_months": 60,
    "foc_months": 60,
    "pro_rata_months": 0,
    "approx_mrp": 10900,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Solar Tall Tubular C10",
      "application": "Off-Grid Solar Rooftop Systems, Solar Street Lights, Remote Telemetry",
      "compatible_applications": [
        "Off-Grid Solar Rooftop Systems",
        "Solar Street Lights",
        "Remote Telemetry"
      ],
      "features": [
        "Solar Deep-Cycle C10 (PSoC Compliant) metallurgy & engineering",
        "60 Months Total Warranty (60M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Solar Tall Tubular C10",
        "Application: Off-Grid Solar Rooftop Systems, Solar Street Lights, Remote Telemetry"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000277",
    "link": "exide-exide-solarblitz-solarblitz-150",
    "image_url": "/products/SOLARBLITZ_150.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000007",
    "status": "active",
    "brand_series": "Exide Solarblitz",
    "brand_name": "Exide",
    "model_sku": "SOLARBLITZ 150",
    "capacity": "150 Ah",
    "voltage": "12V",
    "plate_technology": "Solar Deep-Cycle C10 (PSoC Compliant)",
    "total_warranty_months": 60,
    "foc_months": 60,
    "pro_rata_months": 0,
    "approx_mrp": 15800,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Solar Tall Tubular C10",
      "application": "Residential 1kW - 3kW Off-Grid and Hybrid Solar PV Inverter installations",
      "compatible_applications": [
        "Residential 1kW - 3kW Off-Grid and Hybrid Solar PV Inverter installations"
      ],
      "features": [
        "Solar Deep-Cycle C10 (PSoC Compliant) metallurgy & engineering",
        "60 Months Total Warranty (60M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Solar Tall Tubular C10",
        "Application: Residential 1kW - 3kW Off-Grid and Hybrid Solar PV Inverter installations"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000278",
    "link": "exide-exide-solarblitz-solarblitz-200",
    "image_url": "/products/SOLARBLITZ_200.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000007",
    "status": "active",
    "brand_series": "Exide Solarblitz",
    "brand_name": "Exide",
    "model_sku": "SOLARBLITZ 200",
    "capacity": "200 Ah",
    "voltage": "12V",
    "plate_technology": "Solar Deep-Cycle C10 (PSoC Compliant)",
    "total_warranty_months": 60,
    "foc_months": 60,
    "pro_rata_months": 0,
    "approx_mrp": 20900,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Solar Tall Tubular C10",
      "application": "Heavy Solar PV Banks for agricultural solar pumps, off-grid farmhouses, and microgrids",
      "compatible_applications": [
        "Heavy Solar PV Banks for agricultural solar pumps",
        "off-grid farmhouses",
        "and microgrids"
      ],
      "features": [
        "Solar Deep-Cycle C10 (PSoC Compliant) metallurgy & engineering",
        "60 Months Total Warranty (60M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Solar Tall Tubular C10",
        "Application: Heavy Solar PV Banks for agricultural solar pumps, off-grid farmhouses, and microgrids"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000279",
    "link": "exide-exide-solar-tubular-c10-sol-6lms150",
    "image_url": "/products/SOL-6LMS150.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000007",
    "status": "active",
    "brand_series": "Exide Solar Tubular (C10)",
    "brand_name": "Exide",
    "model_sku": "SOL-6LMS150",
    "capacity": "150 Ah",
    "voltage": "12V",
    "plate_technology": "Heavy Duty Low Maintenance Solar C10",
    "total_warranty_months": 60,
    "foc_months": 60,
    "pro_rata_months": 0,
    "approx_mrp": 16500,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Solar Tall Tubular C10",
      "application": "Industrial & Institutional Solar Rooftops (MNRE approved classic spec)",
      "compatible_applications": [
        "Industrial & Institutional Solar Rooftops (MNRE approved classic spec)"
      ],
      "features": [
        "Heavy Duty Low Maintenance Solar C10 metallurgy & engineering",
        "60 Months Total Warranty (60M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Solar Tall Tubular C10",
        "Application: Industrial & Institutional Solar Rooftops (MNRE approved classic spec)"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000280",
    "link": "exide-exide-solar-tubular-c10-sol-6lms200",
    "image_url": "/products/SOL-6LMS200.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000007",
    "status": "active",
    "brand_series": "Exide Solar Tubular (C10)",
    "brand_name": "Exide",
    "model_sku": "SOL-6LMS200",
    "capacity": "200 Ah",
    "voltage": "12V",
    "plate_technology": "Heavy Duty Low Maintenance Solar C10",
    "total_warranty_months": 60,
    "foc_months": 60,
    "pro_rata_months": 0,
    "approx_mrp": 21800,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Solar Tall Tubular C10",
      "application": "Solar telecom towers, large off-grid solar mini-grids",
      "compatible_applications": [
        "Solar telecom towers",
        "large off-grid solar mini-grids"
      ],
      "features": [
        "Heavy Duty Low Maintenance Solar C10 metallurgy & engineering",
        "60 Months Total Warranty (60M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Solar Tall Tubular C10",
        "Application: Solar telecom towers, large off-grid solar mini-grids"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000281",
    "link": "exide-exide-powersafe-ep-7-12",
    "image_url": "/products/EP-7-12.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000008",
    "status": "active",
    "brand_series": "Exide Powersafe",
    "brand_name": "Exide",
    "model_sku": "EP-7-12",
    "capacity": "7.2 Ah",
    "voltage": "12V",
    "plate_technology": "Compact SMF VRLA Standby",
    "total_warranty_months": 12,
    "foc_months": 12,
    "pro_rata_months": 0,
    "approx_mrp": 1150,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "F2 Tab Faston",
      "application": "Desktop UPS (600VA / 1000VA), burglar alarms, emergency emergency lanterns",
      "compatible_applications": [
        "Desktop UPS (600VA / 1000VA)",
        "burglar alarms",
        "emergency emergency lanterns"
      ],
      "features": [
        "Compact SMF VRLA Standby metallurgy & engineering",
        "12 Months Total Warranty (12M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: F2 Tab Faston",
        "Application: Desktop UPS (600VA / 1000VA), burglar alarms, emergency emergency lanterns"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000282",
    "link": "exide-exide-powersafe-ep-12-12",
    "image_url": "/products/EP-12-12.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000008",
    "status": "active",
    "brand_series": "Exide Powersafe",
    "brand_name": "Exide",
    "model_sku": "EP-12-12",
    "capacity": "12 Ah",
    "voltage": "12V",
    "plate_technology": "Compact SMF VRLA Standby",
    "total_warranty_months": 12,
    "foc_months": 12,
    "pro_rata_months": 0,
    "approx_mrp": 1950,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "F2 Tab Faston",
      "application": "Medical monitors, electric toys, weighing scales, 1kVA line-interactive UPS",
      "compatible_applications": [
        "Medical monitors",
        "electric toys",
        "weighing scales",
        "1kVA line-interactive UPS"
      ],
      "features": [
        "Compact SMF VRLA Standby metallurgy & engineering",
        "12 Months Total Warranty (12M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: F2 Tab Faston",
        "Application: Medical monitors, electric toys, weighing scales, 1kVA line-interactive UPS"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000283",
    "link": "exide-exide-powersafe-ep-18-12",
    "image_url": "/products/EP-18-12.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000008",
    "status": "active",
    "brand_series": "Exide Powersafe",
    "brand_name": "Exide",
    "model_sku": "EP-18-12",
    "capacity": "18 Ah",
    "voltage": "12V",
    "plate_technology": "AGM SMF VRLA Standby",
    "total_warranty_months": 24,
    "foc_months": 24,
    "pro_rata_months": 0,
    "approx_mrp": 3200,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Threaded Post",
      "application": "Portable medical equipment, small online UPS banks",
      "compatible_applications": [
        "Portable medical equipment",
        "small online UPS banks"
      ],
      "features": [
        "AGM SMF VRLA Standby metallurgy & engineering",
        "24 Months Total Warranty (24M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Threaded Post",
        "Application: Portable medical equipment, small online UPS banks"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000284",
    "link": "exide-exide-powersafe-ep-26-12",
    "image_url": "/products/EP-26-12.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000008",
    "status": "active",
    "brand_series": "Exide Powersafe",
    "brand_name": "Exide",
    "model_sku": "EP-26-12",
    "capacity": "26 Ah",
    "voltage": "12V",
    "plate_technology": "AGM SMF VRLA Standby",
    "total_warranty_months": 24,
    "foc_months": 24,
    "pro_rata_months": 0,
    "approx_mrp": 4800,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Threaded Post",
      "application": "Fire alarm systems, medical equipment, small online UPS banks",
      "compatible_applications": [
        "Fire alarm systems",
        "medical equipment",
        "small online UPS banks"
      ],
      "features": [
        "AGM SMF VRLA Standby metallurgy & engineering",
        "24 Months Total Warranty (24M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Threaded Post",
        "Application: Fire alarm systems, medical equipment, small online UPS banks"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000285",
    "link": "exide-exide-powersafe-ep-42-12",
    "image_url": "/products/EP-42-12.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000008",
    "status": "active",
    "brand_series": "Exide Powersafe",
    "brand_name": "Exide",
    "model_sku": "EP-42-12",
    "capacity": "42 Ah",
    "voltage": "12V",
    "plate_technology": "AGM SMF VRLA Standby",
    "total_warranty_months": 24,
    "foc_months": 24,
    "pro_rata_months": 0,
    "approx_mrp": 7100,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Threaded Post",
      "application": "Elevator emergency landing devices (ARD), medium online UPS",
      "compatible_applications": [
        "Elevator emergency landing devices (ARD)",
        "medium online UPS"
      ],
      "features": [
        "AGM SMF VRLA Standby metallurgy & engineering",
        "24 Months Total Warranty (24M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Threaded Post",
        "Application: Elevator emergency landing devices (ARD), medium online UPS"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000286",
    "link": "exide-exide-powersafe-ep-65-12",
    "image_url": "/products/EP-65-12.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000008",
    "status": "active",
    "brand_series": "Exide Powersafe",
    "brand_name": "Exide",
    "model_sku": "EP-65-12",
    "capacity": "65 Ah",
    "voltage": "12V",
    "plate_technology": "AGM SMF VRLA Standby",
    "total_warranty_months": 24,
    "foc_months": 24,
    "pro_rata_months": 0,
    "approx_mrp": 9400,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Threaded Post",
      "application": "Telecom towers, railway signaling, banking server room UPS",
      "compatible_applications": [
        "Telecom towers",
        "railway signaling",
        "banking server room UPS"
      ],
      "features": [
        "AGM SMF VRLA Standby metallurgy & engineering",
        "24 Months Total Warranty (24M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Threaded Post",
        "Application: Telecom towers, railway signaling, banking server room UPS"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000287",
    "link": "exide-exide-powersafe-ep-100-12",
    "image_url": "/products/EP-100-12.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000008",
    "status": "active",
    "brand_series": "Exide Powersafe",
    "brand_name": "Exide",
    "model_sku": "EP-100-12",
    "capacity": "100 Ah",
    "voltage": "12V",
    "plate_technology": "AGM SMF VRLA Standby (UL94-V0)",
    "total_warranty_months": 24,
    "foc_months": 24,
    "pro_rata_months": 0,
    "approx_mrp": 13200,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Threaded Post",
      "application": "Data centers, central enterprise UPS, banking headquarters, hospital critical power",
      "compatible_applications": [
        "Data centers",
        "central enterprise UPS",
        "banking headquarters",
        "hospital critical power"
      ],
      "features": [
        "AGM SMF VRLA Standby (UL94-V0) metallurgy & engineering",
        "24 Months Total Warranty (24M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Threaded Post",
        "Application: Data centers, central enterprise UPS, banking headquarters, hospital critical power"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000288",
    "link": "exide-exide-powersafe-ep-120-12",
    "image_url": "/products/EP-120-12.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000008",
    "status": "active",
    "brand_series": "Exide Powersafe",
    "brand_name": "Exide",
    "model_sku": "EP-120-12",
    "capacity": "120 Ah",
    "voltage": "12V",
    "plate_technology": "AGM SMF VRLA Standby (UL94-V0)",
    "total_warranty_months": 24,
    "foc_months": 24,
    "pro_rata_months": 0,
    "approx_mrp": 15800,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Threaded Post",
      "application": "Large 3-phase online UPS installations, broadcasting hubs",
      "compatible_applications": [
        "Large 3-phase online UPS installations",
        "broadcasting hubs"
      ],
      "features": [
        "AGM SMF VRLA Standby (UL94-V0) metallurgy & engineering",
        "24 Months Total Warranty (24M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Threaded Post",
        "Application: Large 3-phase online UPS installations, broadcasting hubs"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000289",
    "link": "exide-exide-powersafe-ep-150-12",
    "image_url": "/products/EP-150-12.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000008",
    "status": "active",
    "brand_series": "Exide Powersafe",
    "brand_name": "Exide",
    "model_sku": "EP-150-12",
    "capacity": "150 Ah",
    "voltage": "12V",
    "plate_technology": "AGM SMF VRLA Standby (UL94-V0)",
    "total_warranty_months": 24,
    "foc_months": 24,
    "pro_rata_months": 0,
    "approx_mrp": 18900,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Threaded Post",
      "application": "Power plant substations, industrial SCADA systems, telecom central offices",
      "compatible_applications": [
        "Power plant substations",
        "industrial SCADA systems",
        "telecom central offices"
      ],
      "features": [
        "AGM SMF VRLA Standby (UL94-V0) metallurgy & engineering",
        "24 Months Total Warranty (24M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Threaded Post",
        "Application: Power plant substations, industrial SCADA systems, telecom central offices"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000290",
    "link": "exide-exide-powersafe-ep-200-12",
    "image_url": "/products/EP-200-12.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000008",
    "status": "active",
    "brand_series": "Exide Powersafe",
    "brand_name": "Exide",
    "model_sku": "EP-200-12",
    "capacity": "200 Ah",
    "voltage": "12V",
    "plate_technology": "AGM SMF VRLA Standby (UL94-V0)",
    "total_warranty_months": 24,
    "foc_months": 24,
    "pro_rata_months": 0,
    "approx_mrp": 24500,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Threaded Post",
      "application": "High rate discharge VRLA for heavy industrial 3-phase online UPS installations",
      "compatible_applications": [
        "High rate discharge VRLA for heavy industrial 3-phase online UPS installations"
      ],
      "features": [
        "AGM SMF VRLA Standby (UL94-V0) metallurgy & engineering",
        "24 Months Total Warranty (24M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Threaded Post",
        "Application: High rate discharge VRLA for heavy industrial 3-phase online UPS installations"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000291",
    "link": "exide-exide-powersafe-2v-cell-ep-2v-200",
    "image_url": "/products/EP-2V-200.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000008",
    "status": "active",
    "brand_series": "Exide Powersafe (2V Cell)",
    "brand_name": "Exide",
    "model_sku": "EP-2V-200",
    "capacity": "200 Ah",
    "voltage": "2V",
    "plate_technology": "2V VRLA Deep Standby Cell",
    "total_warranty_months": 36,
    "foc_months": 36,
    "pro_rata_months": 0,
    "approx_mrp": 6800,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Heavy Lead Post",
      "application": "Power substation 110V/220V DC battery banks, telecom central switching",
      "compatible_applications": [
        "Power substation 110V/220V DC battery banks",
        "telecom central switching"
      ],
      "features": [
        "2V VRLA Deep Standby Cell metallurgy & engineering",
        "36 Months Total Warranty (36M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Heavy Lead Post",
        "Application: Power substation 110V/220V DC battery banks, telecom central switching"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000292",
    "link": "exide-exide-powersafe-2v-cell-ep-2v-500",
    "image_url": "/products/EP-2V-500.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000008",
    "status": "active",
    "brand_series": "Exide Powersafe (2V Cell)",
    "brand_name": "Exide",
    "model_sku": "EP-2V-500",
    "capacity": "500 Ah",
    "voltage": "2V",
    "plate_technology": "2V VRLA Deep Standby Cell",
    "total_warranty_months": 36,
    "foc_months": 36,
    "pro_rata_months": 0,
    "approx_mrp": 14200,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Heavy Lead Post",
      "application": "Thermal power generation switchyards, central railway traction substations",
      "compatible_applications": [
        "Thermal power generation switchyards",
        "central railway traction substations"
      ],
      "features": [
        "2V VRLA Deep Standby Cell metallurgy & engineering",
        "36 Months Total Warranty (36M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Heavy Lead Post",
        "Application: Thermal power generation switchyards, central railway traction substations"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000293",
    "link": "exide-exide-powersafe-2v-cell-ep-2v-1000",
    "image_url": "/products/EP-2V-1000.jpg",
    "category_id": "b0000000-0000-0000-0000-000000000008",
    "status": "active",
    "brand_series": "Exide Powersafe (2V Cell)",
    "brand_name": "Exide",
    "model_sku": "EP-2V-1000",
    "capacity": "1000 Ah",
    "voltage": "2V",
    "plate_technology": "2V VRLA Deep Standby Cell",
    "total_warranty_months": 36,
    "foc_months": 36,
    "pro_rata_months": 0,
    "approx_mrp": 27500,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Heavy Lead Post",
      "application": "Nuclear power plant backup systems, metro rail signaling networks",
      "compatible_applications": [
        "Nuclear power plant backup systems",
        "metro rail signaling networks"
      ],
      "features": [
        "2V VRLA Deep Standby Cell metallurgy & engineering",
        "36 Months Total Warranty (36M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Heavy Lead Post",
        "Application: Nuclear power plant backup systems, metro rail signaling networks"
      ]
    }
  },
  {
    "id": "d0000000-0000-0000-0000-000000000294",
    "link": "exide-exide-plante-cell-2v-ykp-17-ykp-21",
    "image_url": "/products/YKP-17___YKP-21.png",
    "category_id": "b0000000-0000-0000-0000-000000000008",
    "status": "active",
    "brand_series": "Exide Plante Cell (2V)",
    "brand_name": "Exide",
    "model_sku": "YKP-17 / YKP-21",
    "capacity": "200 - 1200 Ah",
    "voltage": "2V",
    "plate_technology": "Pure Lead Plante High-Reliability",
    "total_warranty_months": 60,
    "foc_months": 60,
    "pro_rata_months": 0,
    "approx_mrp": 38000,
    "is_in_stock": true,
    "created_at": "2026-08-28T00:00:00.000Z",
    "updated_at": "2026-08-28T00:00:00.000Z",
    "detailed_layout": {
      "layout_type": "Solid Copper Post",
      "application": "Critical 25+ year lifespan nuclear and thermal electrical grid trip circuits",
      "compatible_applications": [
        "Critical 25+ year lifespan nuclear and thermal electrical grid trip circuits"
      ],
      "features": [
        "Pure Lead Plante High-Reliability metallurgy & engineering",
        "60 Months Total Warranty (60M Free Replacement + 0M Pro-Rata)",
        "Layout / Form Factor: Solid Copper Post",
        "Application: Critical 25+ year lifespan nuclear and thermal electrical grid trip circuits"
      ]
    }
  }
];
