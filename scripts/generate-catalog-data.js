const fs = require("fs");
const path = require("path");

const rawCsv = `image_url,Category / Status,Brand Series,BrandName,Model / SKU,Capacity (Ah / VA),Voltage (V),Plate Technology / Metallurgy,Total Warranty (Mos),FOC (Mos),Pro-Rata (Mos),Approx MRP (₹),"Detailed Layout, Engineering Specs & Application Compatibility"
downloaded_images/EPIQ35L.jpg,Passenger Car,Exide Epiq,Exide,EPIQ35L,35 Ah,12V,Penta Alloy Advanced,77,42,35,"₹6,250","Left (L) | Maruti Alto 800/K10, WagonR Petrol, Swift Petrol, Celerio, Ignis, S-Presso"
downloaded_images/EPIQ35R.jpg,Passenger Car,Exide Epiq,Exide,EPIQ35R,35 Ah,12V,Penta Alloy Advanced,77,42,35,"₹6,250","Right (R) | Hyundai Santro, Eon, i10 Petrol, Datsun Go, Renault Kwid 0.8"
downloaded_images/EPIQ45L.jpg,Passenger Car,Exide Epiq,Exide,EPIQ45L,45 Ah,12V,Penta Alloy Advanced,77,42,35,"₹7,600","Left (L) | Honda City i-VTEC, Amaze Petrol, Hyundai Elite i20, Venue Petrol, Kia Sonet"
downloaded_images/EPIQ45R.jpg,Passenger Car,Exide Epiq,Exide,EPIQ45R,45 Ah,12V,Penta Alloy Advanced,77,42,35,"₹7,600","Right (R) | Maruti SX4 Petrol, Mitsubishi Lancer, Older Hyundai Accent/Verna"
downloaded_images/EPIQ55L.jpg,Passenger Car,Exide Epiq,Exide,EPIQ55L,55 Ah,12V,Penta Alloy Advanced,77,42,35,"₹8,950","Left (L) | Hyundai Creta Diesel, Kia Seltos Diesel, Brezza Diesel, Tata Nexon Diesel"
downloaded_images/EPIQ55R.jpg,Passenger Car,Exide Epiq,Exide,EPIQ55R,55 Ah,12V,Penta Alloy Advanced,77,42,35,"₹8,950","Right (R) | Tata Indigo Diesel, Tata Bolt Diesel, Fiat Punto Diesel, Linea"
downloaded_images/EPIQ65D26L.jpg,Passenger Car,Exide Epiq,Exide,EPIQ65D26L,65 Ah,12V,Penta Alloy Advanced,77,42,35,"₹10,500","Left (L) | Toyota Innova Crysta Petrol/Diesel, Mahindra Scorpio, Safari, Harrier"
downloaded_images/EPIQ65D26R.jpg,Passenger Car,Exide Epiq,Exide,EPIQ65D26R,65 Ah,12V,Penta Alloy Advanced,77,42,35,"₹10,500","Right (R) | Mahindra Bolero, Xylo, Tata Sumo Grande, Scorpio M2Di"
downloaded_images/EPIQDIN50.jpg,Passenger Car,Exide Epiq,Exide,EPIQDIN50,50 Ah,12V,European DIN Penta Alloy,77,42,35,"₹9,400","DIN Left | VW Polo Petrol, Vento Petrol, Skoda Rapid Petrol, Ford Figo Petrol"
downloaded_images/EPIQDIN55.jpg,Passenger Car,Exide Epiq,Exide,EPIQDIN55,55 Ah,12V,European DIN Penta Alloy,77,42,35,"₹10,800","DIN Left | VW Polo Diesel, Skoda Rapid Diesel, Fiat Linea, Jeep Compass Petrol"
downloaded_images/EPIQDIN60.jpg,Passenger Car,Exide Epiq,Exide,EPIQDIN60,60 Ah,12V,European DIN Penta Alloy,77,42,35,"₹11,900","DIN Left | Hyundai Creta SX(O), Skoda Kushaq, VW Taigun, MG Hector Petrol"
downloaded_images/EPIQDIN65.jpg,Passenger Car,Exide Epiq,Exide,EPIQDIN65,65 Ah,12V,European DIN Penta Alloy,77,42,35,"₹12,800","DIN Left | Jeep Compass Diesel, Tata Harrier Automatic, Safari Gold"
downloaded_images/EPIQDIN74L.jpg,Passenger Car,Exide Epiq,Exide,EPIQDIN74L,74 Ah,12V,European DIN Penta Alloy,77,42,35,"₹14,650","DIN Left | Skoda Octavia, Superb, VW Passat, Audi A3/A4, BMW 1-Series"
downloaded_images/MT35L.jpg,Passenger Car,Exide Matrix,Exide,MT35L,35 Ah,12V,Sealed MF (Silver Calcium Alloy),72,36,36,"₹5,600","Left (L) | Maruti Swift, Ignis, Baleno, Dzire Petrol, S-Presso"
downloaded_images/MT35R.jpg,Passenger Car,Exide Matrix,Exide,MT35R,35 Ah,12V,Sealed MF (Silver Calcium Alloy),72,36,36,"₹5,600","Right (R) | Hyundai Grand i10, Nios, Tata Nano, Accent, Eon"
downloaded_images/MT45L.jpg,Passenger Car,Exide Matrix,Exide,MT45L,45 Ah,12V,Sealed MF (Silver Calcium Alloy),72,36,36,"₹6,950","Left (L) | Honda Jazz, WR-V, City, Hyundai i20, Venue"
downloaded_images/MT45R.jpg,Passenger Car,Exide Matrix,Exide,MT45R,45 Ah,12V,Sealed MF (Silver Calcium Alloy),72,36,36,"₹6,950","Right (R) | Toyota Etios Petrol, Liva Petrol, Maruti SX4"
downloaded_images/MT55L.jpg,Passenger Car,Exide Matrix,Exide,MT55L,55 Ah,12V,Sealed MF (Silver Calcium Alloy),72,36,36,"₹8,300","Left (L) | Ford EcoSport, Maruti S-Cross, Renault Duster, Nissan Kicks"
downloaded_images/MT55R.jpg,Passenger Car,Exide Matrix,Exide,MT55R,55 Ah,12V,Sealed MF (Silver Calcium Alloy),72,36,36,"₹8,300","Right (R) | Mahindra Quanto, NuvoSport, Tata Indigo XL"
downloaded_images/MT65L.jpg,Passenger Car,Exide Matrix,Exide,MT65L,65 Ah,12V,Sealed MF (Silver Calcium Alloy),72,36,36,"₹9,800","Left (L) | Mahindra XUV500, Scorpio-N, Tata Hexa, Toyota Fortuner Petrol"
downloaded_images/MT65R.jpg,Passenger Car,Exide Matrix,Exide,MT65R,65 Ah,12V,Sealed MF (Silver Calcium Alloy),72,36,36,"₹9,800","Right (R) | Mahindra Bolero Camper, Tata Sumo Victa"
downloaded_images/MTDIN50.jpg,Passenger Car,Exide Matrix,Exide,MTDIN50,50 Ah,12V,Sealed MF European DIN,72,36,36,"₹8,800","DIN Left | VW Polo Petrol, Skoda Fabia, Fiat Grande Punto"
downloaded_images/MTDIN55.jpg,Passenger Car,Exide Matrix,Exide,MTDIN55,55 Ah,12V,Sealed MF European DIN,72,36,36,"₹9,900","DIN Left | Skoda Rapid, VW Vento Diesel, Ford Figo Aspire Diesel"
downloaded_images/MTDIN65.jpg,Passenger Car,Exide Matrix,Exide,MTDIN65,65 Ah,12V,Sealed MF European DIN,72,36,36,"₹11,800","DIN Left | Jeep Compass, Tata Harrier, MG Hector Diesel"
downloaded_images/MTDIN74.jpg,Passenger Car,Exide Matrix,Exide,MTDIN74,74 Ah,12V,Sealed MF European DIN,72,36,36,"₹13,900","DIN Left | Skoda Octavia, Superb, VW Jetta, Audi Q3"
downloaded_images/MTREDDIN100.jpg,Passenger Car,Exide Matrix,Exide,MTREDDIN100,100 Ah,12V,Sealed MF European DIN,72,36,36,"₹22,300","DIN Left | Audi Q7, BMW X5, Mercedes GLS, Land Rover Discovery"
downloaded_images/MTRED35L.jpg,Passenger Car,Exide Matrix Red,Exide,MTRED35L,35 Ah,12V,Sealed Maintenance Free Silver Alloy,66,36,30,"₹5,400","Left (L) | Maruti Swift, WagonR, Ritz, Alto K10"
downloaded_images/MTRED35R.jpg,Passenger Car,Exide Matrix Red,Exide,MTRED35R,35 Ah,12V,Sealed Maintenance Free Silver Alloy,66,36,30,"₹5,400","Right (R) | Hyundai Santro, i10, Getz Prime"
downloaded_images/MTRED45L.jpg,Passenger Car,Exide Matrix Red,Exide,MTRED45L,45 Ah,12V,Sealed Maintenance Free Silver Alloy,66,36,30,"₹6,600","Left (L) | Honda City Type-2/3, Jazz, Hyundai i20"
downloaded_images/MTRED45R.jpg,Passenger Car,Exide Matrix Red,Exide,MTRED45R,45 Ah,12V,Sealed Maintenance Free Silver Alloy,66,36,30,"₹6,600","Right (R) | Toyota Etios, Corolla Altis Petrol"
downloaded_images/MTRED55L.jpg,Passenger Car,Exide Matrix Red,Exide,MTRED55L,55 Ah,12V,Sealed Maintenance Free Silver Alloy,66,36,30,"₹7,900","Left (L) | Renault Duster, Ford Figo Diesel, Skoda Fabia"
downloaded_images/MTRED65L.jpg,Passenger Car,Exide Matrix Red,Exide,MTRED65L,65 Ah,12V,Sealed Maintenance Free Silver Alloy,66,36,30,"₹9,400","Left (L) | Mahindra Scorpio, Safari Dicor, Innova D-4D"
downloaded_images/MTREDDIN60.jpg,Passenger Car,Exide Matrix Red,Exide,MTREDDIN60,60 Ah,12V,Sealed Maintenance Free Silver Alloy,66,36,30,"₹9,100","DIN Left | Fiat Linea, Punto, Skoda Rapid Diesel"
downloaded_images/MTREDDIN74.jpg,Passenger Car,Exide Matrix Red,Exide,MTREDDIN74,74 Ah,12V,Sealed Maintenance Free Silver Alloy,66,36,30,"₹13,200","DIN Left | VW Passat, Skoda Laura, Audi A4"
downloaded_images/ML35L.jpg,Passenger Car,Exide Mileage,Exide,ML35L,35 Ah,12V,Side-Vented Ca-Ca Alloy,60,30,30,"₹4,850","Left (L) | Maruti Alto 800/K10, Celerio Petrol, WagonR 1.0, Ignis, S-Presso"
downloaded_images/ML35R.jpg,Passenger Car,Exide Mileage,Exide,ML35R,35 Ah,12V,Side-Vented Ca-Ca Alloy,60,30,30,"₹4,850","Right (R) | Hyundai Santro Xing, Eon 0.8/1.0, i10 Petrol, Renault Kwid 0.8"
downloaded_images/ML38B20L.jpg,Passenger Car,Exide Mileage,Exide,ML38B20L,35 Ah,12V,Japanese JIS Slim Terminal,60,30,30,"₹5,100","Left (L) | Honda Brio, Amaze Petrol (Type 1), Jazz i-VTEC (Older JIS tray)"
downloaded_images/ML38B20R.jpg,Passenger Car,Exide Mileage,Exide,ML38B20R,35 Ah,12V,Japanese JIS Slim Terminal,60,30,30,"₹5,100","Right (R) | Maruti Zen, Older WagonR, Maruti 800 (Thin post configuration)"
downloaded_images/ML45L.jpg,Passenger Car,Exide Mileage,Exide,ML45L,45 Ah,12V,Side-Vented Ca-Ca Alloy,60,30,30,"₹6,150","Left (L) | Tata Tiago Petrol, Tigor, Maruti Swift Diesel, Baleno Diesel, Ritz"
downloaded_images/ML45R.jpg,Passenger Car,Exide Mileage,Exide,ML45R,45 Ah,12V,Side-Vented Ca-Ca Alloy,60,30,30,"₹6,150","Right (R) | Toyota Etios Petrol, Liva Petrol, Maruti SX4 Petrol, Esteem"
downloaded_images/ML50L.jpg,Passenger Car,Exide Mileage,Exide,ML50L,50 Ah,12V,Side-Vented Ca-Ca Alloy,60,30,30,"₹6,800","Left (L) | Tata Altroz Diesel, Honda WR-V i-DTEC, Hyundai i20 CRDi"
downloaded_images/ML55L.jpg,Passenger Car,Exide Mileage,Exide,ML55L,55 Ah,12V,Side-Vented Ca-Ca Alloy,60,30,30,"₹7,400","Left (L) | Renault Duster 85PS/110PS, Nissan Terrano, Nissan Kicks Diesel"
downloaded_images/ML55R.jpg,Passenger Car,Exide Mileage,Exide,ML55R,55 Ah,12V,Side-Vented Ca-Ca Alloy,60,30,30,"₹7,400","Right (R) | Tata Indigo Manza Diesel, Tata Vista Quadrajet"
downloaded_images/ML65L.jpg,Passenger Car,Exide Mileage,Exide,ML65L,65 Ah,12V,Side-Vented Ca-Ca Alloy,60,30,30,"₹8,900","Left (L) | Toyota Innova Crysta Petrol/Diesel, Fortuner Petrol, Mahindra Thar CRDe"
downloaded_images/ML65R.jpg,Passenger Car,Exide Mileage,Exide,ML65R,65 Ah,12V,Side-Vented Ca-Ca Alloy,60,30,30,"₹8,900","Right (R) | Mahindra Bolero Power+, Bolero Neo, Scorpio M2DiCR"
downloaded_images/MLDIN50.jpg,Passenger Car,Exide Mileage,Exide,MLDIN50,50 Ah,12V,European DIN Format Side-Vented,60,30,30,"₹7,900","DIN Left | VW Polo 1.0/1.2 TSI, Vento Petrol, Skoda Rapid 1.6 MPI, Ford Figo Petrol"
downloaded_images/MLDIN55.jpg,Passenger Car,Exide Mileage,Exide,MLDIN55,55 Ah,12V,European DIN Format Side-Vented,60,30,30,"₹8,900","DIN Left | VW Polo 1.5 TDI, Skoda Rapid 1.5 TDI, Ford Aspire TDCi, Fiat Punto Evo"
downloaded_images/MLDIN60.jpg,Passenger Car,Exide Mileage,Exide,MLDIN60,60 Ah,12V,European DIN Format Side-Vented,60,30,30,"₹9,400","DIN Left | Renault Captur, Skoda Kushaq 1.0 TSI, VW Taigun 1.0 TSI, MG Hector Petrol"
downloaded_images/MLDIN65.jpg,Passenger Car,Exide Mileage,Exide,MLDIN65,65 Ah,12V,European DIN Format Side-Vented,60,30,30,"₹10,800","DIN Left | Tata Harrier Manual, Tata Safari Storme, Jeep Compass 1.4 Multiair"
downloaded_images/MLDIN74.jpg,Passenger Car,Exide Mileage,Exide,MLDIN74,74 Ah,12V,European DIN Format Side-Vented,60,30,30,"₹12,900","DIN Left | Skoda Octavia 2.0 TDI, VW Passat, VW Jetta 2.0 TDI, Audi A4 2.0 TDI"
downloaded_images/MLRED35L.jpg,Passenger Car,Exide Mileage Red,Exide,MLRED35L,35 Ah,12V,Low Maintenance Ca-Ca Grid,45,24,21,"₹4,600","Left (L) | Maruti Alto, WagonR, Swift, A-Star"
downloaded_images/MLRED35R.jpg,Passenger Car,Exide Mileage Red,Exide,MLRED35R,35 Ah,12V,Low Maintenance Ca-Ca Grid,45,24,21,"₹4,600","Right (R) | Hyundai Santro Xing, i10, Eon"
downloaded_images/MLRED45L.jpg,Passenger Car,Exide Mileage Red,Exide,MLRED45L,45 Ah,12V,Low Maintenance Ca-Ca Grid,45,24,21,"₹5,800","Left (L) | Honda City Type 3, Tata Indica V2, Swift Diesel"
downloaded_images/MLRED45R.jpg,Passenger Car,Exide Mileage Red,Exide,MLRED45R,45 Ah,12V,Low Maintenance Ca-Ca Grid,45,24,21,"₹5,800","Right (R) | Toyota Etios, Maruti Esteem, Accent"
downloaded_images/MLRED55L.jpg,Passenger Car,Exide Mileage Red,Exide,MLRED55L,55 Ah,12V,Low Maintenance Ca-Ca Grid,45,24,21,"₹7,100","Left (L) | Renault Duster, Ford Figo Diesel, Skoda Fabia"
downloaded_images/MLRED65L.jpg,Passenger Car,Exide Mileage Red,Exide,MLRED65L,65 Ah,12V,Low Maintenance Ca-Ca Grid,45,24,21,"₹8,400","Left (L) | Mahindra Scorpio, Safari, Tavera"
downloaded_images/MLREDDIN50.jpg,Passenger Car,Exide Mileage Red,Exide,MLREDDIN50,50 Ah,12V,Low Maintenance European DIN,45,24,21,"₹7,400","DIN Left | VW Polo, Vento Petrol, Skoda Fabia"
downloaded_images/MLREDDIN60.jpg,Passenger Car,Exide Mileage Red,Exide,MLREDDIN60,60 Ah,12V,Low Maintenance European DIN,45,24,21,"₹8,900","DIN Left | Skoda Laura, VW Jetta Petrol, Fiat Linea"
downloaded_images/ML-ISS-45.jpg,Micro-Hybrid / ISS,Exide Mileage ISS,Exide,ML-ISS-45,45 Ah,12V,Enhanced Flooded Battery (EFB),60,36,24,"₹8,900","Left (L) | Maruti Swift Smart Hybrid (DualJet), Baleno SHVS, Ignis ISS"
downloaded_images/ML-ISS-55.jpg,Micro-Hybrid / ISS,Exide Mileage ISS,Exide,ML-ISS-55,55 Ah,12V,Enhanced Flooded Battery (EFB),60,36,24,"₹10,100","Left (L) | Maruti Ciaz Smart Hybrid Diesel/Petrol, S-Cross Smart Hybrid"
downloaded_images/ML-ISS-65.jpg,Micro-Hybrid / ISS,Exide Mileage ISS,Exide,ML-ISS-65,65 Ah,12V,Enhanced Flooded Battery (EFB),60,36,24,"₹11,200","Left (L) | Maruti Brezza Smart Hybrid, Grand Vitara Smart Hybrid, Ertiga & XL6 SHVS"
downloaded_images/ML-ISS-DIN60.jpg,Micro-Hybrid / ISS,Exide Mileage ISS,Exide,ML-ISS-DIN60,60 Ah,12V,Enhanced Flooded Battery (EFB),60,36,24,"₹12,200","DIN Left | Hyundai Creta Smart Auto-Stop, Kia Seltos ISG, Skoda Kushaq 1.5 TSI"
downloaded_images/ML-ISS-DIN70.jpg,Micro-Hybrid / ISS,Exide Mileage ISS,Exide,ML-ISS-DIN70,70 Ah,12V,Enhanced Flooded Battery (EFB),60,36,24,"₹13,800","DIN Left | Mahindra XUV700 ISS, Scorpio-N Start-Stop, Jeep Compass Mild-Hybrid"
downloaded_images/EZ35L.jpg,Passenger Car,Exide Eezy,Exide,EZ35L,35 Ah,12V,Hybrid Low Maintenance Alloy,48,24,24,"₹4,350","Left (L) | Maruti Alto, WagonR, Celerio, Datsun Go"
downloaded_images/EZ35R.jpg,Passenger Car,Exide Eezy,Exide,EZ35R,35 Ah,12V,Hybrid Low Maintenance Alloy,48,24,24,"₹4,350","Right (R) | Hyundai Santro, Eon, Datsun Redi-Go"
downloaded_images/EZ38B20L.jpg,Passenger Car,Exide Eezy,Exide,EZ38B20L,35 Ah,12V,Japanese JIS Slim Hybrid,48,24,24,"₹4,600","Left (L) | Honda Brio, Amaze Petrol, Older Japanese Fitments"
downloaded_images/EZ45L.jpg,Passenger Car,Exide Eezy,Exide,EZ45L,45 Ah,12V,Hybrid Low Maintenance Alloy,48,24,24,"₹5,450","Left (L) | Honda Amaze, Brio, Tata Bolt, Indigo Petrol"
downloaded_images/EZ45R.jpg,Passenger Car,Exide Eezy,Exide,EZ45R,45 Ah,12V,Hybrid Low Maintenance Alloy,48,24,24,"₹5,450","Right (R) | Toyota Etios Petrol, Older Maruti Models"
downloaded_images/EZ55L.jpg,Passenger Car,Exide Eezy,Exide,EZ55L,55 Ah,12V,Hybrid Low Maintenance Alloy,48,24,24,"₹6,650","Left (L) | Ford EcoSport, Figo Diesel, Skoda Rapid"
downloaded_images/EZ65L.jpg,Passenger Car,Exide Eezy,Exide,EZ65L,65 Ah,12V,Hybrid Low Maintenance Alloy,48,24,24,"₹7,900","Left (L) | Mahindra Bolero, Thar, Tata Sumo"
downloaded_images/EZDIN50.jpg,Passenger Car,Exide Eezy,Exide,EZDIN50,50 Ah,12V,European DIN Hybrid,48,24,24,"₹7,200","DIN Left | VW Polo, Vento Petrol, Ford Freestyle"
downloaded_images/EZDIN60.jpg,Passenger Car,Exide Eezy,Exide,EZDIN60,60 Ah,12V,European DIN Hybrid,48,24,24,"₹8,500","DIN Left | Renault Duster, Fiat Linea, Skoda Rapid Diesel"
downloaded_images/DRIVE35L.jpg,Commercial Fleet,Exide Drive,Exide,DRIVE35L,35 Ah,12V,Spill-Proof Commercial Fleet,36,18,18,"₹4,100","Left (L) | Maruti WagonR Taxi, Swift Dzire Tour (Petrol/CNG)"
downloaded_images/DRIVE35R.jpg,Commercial Fleet,Exide Drive,Exide,DRIVE35R,35 Ah,12V,Spill-Proof Commercial Fleet,36,18,18,"₹4,100","Right (R) | Hyundai Santro Commercial Cabs, Regional Taxi Fleets"
downloaded_images/DRIVE45L.jpg,Commercial Fleet,Exide Drive,Exide,DRIVE45L,45 Ah,12V,Spill-Proof Commercial Fleet,36,18,18,"₹4,950","Left (L) | Toyota Etios Cab, Tata Indica Vista Taxi, Dzire Tour Diesel"
downloaded_images/DRIVE55L.jpg,Commercial Fleet,Exide Drive,Exide,DRIVE55L,55 Ah,12V,Spill-Proof Commercial Fleet,36,18,18,"₹5,950","Left (L) | Commercial Innova Fleet, Chevrolet Tavera Cabs"
downloaded_images/DRIVE65L.jpg,Commercial Fleet,Exide Drive,Exide,DRIVE65L,65 Ah,12V,Spill-Proof Commercial Fleet,36,18,18,"₹7,200","Left (L) | Tour & Travel Bolero, Innova Diesel Fleet, Sumo Gold"
downloaded_images/CABBY35L.jpg,Taxi Specific,Exide Cabby,Exide,CABBY35L,35 Ah,12V,Extra Electrolyte Commercial Taxi,24,12,12,"₹3,850","Left (L) | Heavy-run aggregator cabs (Ola/Uber WagonR, Celerio CNG)"
downloaded_images/CABBY45L.jpg,Taxi Specific,Exide Cabby,Exide,CABBY45L,45 Ah,12V,Extra Electrolyte Commercial Taxi,24,12,12,"₹4,650","Left (L) | Aggregator Sedans (Dzire Tour, Etios Commercial)"
downloaded_images/CABBY55L.jpg,Taxi Specific,Exide Cabby,Exide,CABBY55L,55 Ah,12V,Extra Electrolyte Commercial Taxi,24,12,12,"₹5,450",Left (L) | High-mileage commercial MPVs and shared cabs
downloaded_images/RIDE35L.jpg,Budget Passenger,Exide Ride,Exide,RIDE35L,35 Ah,12V,Standard Lead-Acid Robust Grid,24,12,12,"₹3,650","Left (L) | Budget Hatchbacks, Rural entry-level passenger cars"
downloaded_images/RIDE45L.jpg,Budget Passenger,Exide Ride,Exide,RIDE45L,45 Ah,12V,Standard Lead-Acid Robust Grid,24,12,12,"₹4,400","Left (L) | Budget Sedans, Private economy vehicles"
downloaded_images/RIDE65L.jpg,Budget Passenger,Exide Ride,Exide,RIDE65L,65 Ah,12V,Standard Lead-Acid Robust Grid,24,12,12,"₹6,900",Left (L) | Rural passenger utility vehicles and regional jeeps
downloaded_images/LC35L.jpg,Vintage / Legacy,Exide Little Champ,Exide,LC35L,35 Ah,12V,Conventional Flooded Antique Line,18,12,6,"₹3,200","Left (L) | Vintage Maruti 800, Maruti Omni, Zen (Discontinued line)"
downloaded_images/LC35R.jpg,Vintage / Legacy,Exide Little Champ,Exide,LC35R,35 Ah,12V,Conventional Flooded Antique Line,18,12,6,"₹3,200","Right (R) | Classic Premier Padmini, Ambassador Petrol"
downloaded_images/GOLD35L.jpg,Vintage / Legacy,Exide Gold (Car),Exide,GOLD35L,35 Ah,12V,Heavy Duty Commercial Flooded,18,12,6,"₹3,400",Left (L) | Legacy Yellow-Top Taxi cabs and vintage commercial fleets
downloaded_images/GOLD45L.jpg,Vintage / Legacy,Exide Gold (Car),Exide,GOLD45L,45 Ah,12V,Heavy Duty Commercial Flooded,18,12,6,"₹4,200","Left (L) | Ambassador Diesel, Tata Indica (Gen 1)"
downloaded_images/ADV35L.jpg,Vintage / Legacy,Exide Advanz,Exide,ADV35L,35 Ah,12V,Factory Sealed Maintenance Free,36,18,18,"₹4,800",Left (L) | Early sealed MF generation for luxury sedans (Discontinued)
downloaded_images/ADV45L.jpg,Vintage / Legacy,Exide Advanz,Exide,ADV45L,45 Ah,12V,Factory Sealed Maintenance Free,36,18,18,"₹5,900","Left (L) | Honda Accord (Gen 1/2), Hyundai Sonata V6"
downloaded_images/AGM60.png,Luxury Automotive,Exide AGMi,Exide,AGM60,60 Ah,12V,Absorbent Glass Mat (AGM VRLA),48,36,12,"₹13,800","DIN Left | Mini Cooper, VW Beetle, Audi A1/A3, BMW 1-Series"
downloaded_images/AGM70.png,Luxury Automotive,Exide AGMi,Exide,AGM70,70 Ah,12V,Absorbent Glass Mat (AGM VRLA),48,36,12,"₹15,500","DIN Left | BMW 3-Series (320d/330i), Audi A4, Mercedes C-Class, VW Tiguan"
downloaded_images/AGM80.png,Luxury Automotive,Exide AGMi,Exide,AGM80,80 Ah,12V,Absorbent Glass Mat (AGM VRLA),48,36,12,"₹18,200","DIN Left | BMW 5-Series (520d/530d), Audi A6, Audi Q5, Mercedes E-Class, Volvo XC60"
downloaded_images/AGM95.png,Luxury Automotive,Exide AGMi,Exide,AGM95,95 Ah,12V,Absorbent Glass Mat (AGM VRLA),48,36,12,"₹21,500","DIN Left | BMW X5, Audi Q7, Mercedes GLE, Porsche Macan, Jaguar XF"
downloaded_images/AGM105.png,Luxury Automotive,Exide AGMi,Exide,AGM105,105 Ah,12V,Absorbent Glass Mat (AGM VRLA),48,36,12,"₹24,000","DIN Left | BMW 7-Series, Mercedes S-Class, Audi A8L, Range Rover Vogue, Porsche Cayenne"
downloaded_images/12XL2.5L-C.jpg,Two Wheeler,Exide Xplore,Exide,12XL2.5L-C,2.5 Ah,12V,Factory-Charged AGM VRLA,48,24,24,"₹1,150","Left | Hero Splendor Kick Start, Passion, CD-Dawn, HF Deluxe (Kick)"
downloaded_images/12XL4L-B.jpg,Two Wheeler,Exide Xplore,Exide,12XL4L-B,4.0 Ah,12V,Factory-Charged AGM VRLA,48,24,24,"₹1,350","Right | Hero Splendor iSmart, Glamour Self, Passion Pro, TVS Sport"
downloaded_images/12XL5L-B.jpg,Two Wheeler,Exide Xplore,Exide,12XL5L-B,5.0 Ah,12V,Factory-Charged AGM VRLA,48,24,24,"₹1,550","Right | Honda Activa (3G/4G/5G/6G), Dio, Hero Maestro, Pleasure, TVS Jupiter"
downloaded_images/12XL7L-B.jpg,Two Wheeler,Exide Xplore,Exide,12XL7L-B,7.0 Ah,12V,Factory-Charged AGM VRLA,48,24,24,"₹2,100","Right | Bajaj Pulsar 150/180/220, Avenger 220, Yamaha FZ-S, MT-15, R15 V3/V4"
downloaded_images/12XL7B-B.jpg,Two Wheeler,Exide Xplore,Exide,12XL7B-B,7.0 Ah,12V,Factory-Charged AGM VRLA,48,24,24,"₹2,150","Left | Yamaha Fazer, Older Pulsar 200 NS, Suzuki Gixxer 155"
downloaded_images/12XL9-B.jpg,Two Wheeler,Exide Xplore,Exide,12XL9-B,9.0 Ah,12V,Factory-Charged AGM VRLA,48,24,24,"₹2,450","Left | Royal Enfield Bullet 350/500, Classic 350, Thunderbird, Bajaj Dominar 400"
downloaded_images/12XL14L-A2.jpg,Two Wheeler,Exide Xplore,Exide,12XL14L-A2,14.0 Ah,12V,Factory-Charged AGM VRLA,48,24,24,"₹3,400","Right | Royal Enfield Interceptor 650, Continental GT 650, KTM Duke 390, Super Meteor 650"
downloaded_images/BKRZ-2.5L.jpg,Two Wheeler,Exide Bikerz,Exide,BKRZ-2.5L,2.5 Ah,12V,Sealed Spill-Proof VRLA,36,18,18,"₹1,050","Left | Bajaj CT100, Platina 100 Kick Start, Discover 100"
downloaded_images/BKRZ-4L-B.jpg,Two Wheeler,Exide Bikerz,Exide,BKRZ-4L-B,4.0 Ah,12V,Sealed Spill-Proof VRLA,36,18,18,"₹1,250","Right | TVS Star City Plus, Victor, Suzuki Hayate, Hero HF Deluxe Self"
downloaded_images/BKRZ-5L-B.jpg,Two Wheeler,Exide Bikerz,Exide,BKRZ-5L-B,5.0 Ah,12V,Sealed Spill-Proof VRLA,36,18,18,"₹1,450","Right | TVS Jupiter, TVS Ntorq 125, Suzuki Access 125, Burgman Street 125"
downloaded_images/BKRZ-7L-B.jpg,Two Wheeler,Exide Bikerz,Exide,BKRZ-7L-B,7.0 Ah,12V,Sealed Spill-Proof VRLA,36,18,18,"₹1,950","Right | TVS Apache RTR 160/180/200 4V, Bajaj Pulsar NS200, RS200"
downloaded_images/BKRZ-9-B.jpg,Two Wheeler,Exide Bikerz,Exide,BKRZ-9-B,9.0 Ah,12V,Sealed Spill-Proof VRLA,36,18,18,"₹2,300","Left | Royal Enfield Electra 350, Classic 500 EFI, Himalayan 411"
downloaded_images/ZOOM-2.5L-C.jpg,Two Wheeler,Exide Zoom,Exide,ZOOM-2.5L-C,2.5 Ah,12V,Conventional Flooded Lead-Acid,24,12,12,₹950,"Left | Kick start commuter bikes, Bajaj Boxer, KB4S"
downloaded_images/ZOOM-4L-B.jpg,Two Wheeler,Exide Zoom,Exide,ZOOM-4L-B,4.0 Ah,12V,Conventional Flooded Lead-Acid,24,12,12,"₹1,100",Right | Budget commuter motorcycles (100-110cc Kick/Self)
downloaded_images/ZOOM-5L-B.jpg,Two Wheeler,Exide Zoom,Exide,ZOOM-5L-B,5.0 Ah,12V,Conventional Flooded Lead-Acid,24,12,12,"₹1,280",Right | Standard scooters and commuter step-throughs
downloaded_images/ZOOM-9-B.jpg,Two Wheeler,Exide Zoom,Exide,ZOOM-9-B,9.0 Ah,12V,Conventional Flooded Lead-Acid,24,12,12,"₹2,050",Left | Vintage Royal Enfield Cast Iron Bullet 350 (Heavy kick/self)
downloaded_images/BOSS-2.5L.jpg,Two Wheeler,Exide Boss (2W),Exide,BOSS-2.5L,2.5 Ah,12V,Vintage Low-Cost Flooded,18,12,6,₹880,"Left | Vintage Bajaj Chetak, Super, Priya Scooters (Discontinued)"
downloaded_images/BOSS-5L-B.jpg,Two Wheeler,Exide Boss (2W),Exide,BOSS-5L-B,5.0 Ah,12V,Vintage Low-Cost Flooded,18,12,6,"₹1,150","Right | Kinetic Honda DX/ZX 2-Stroke Scooters, Bajaj Legend 4S"
downloaded_images/EKO-32L.jpg,Three Wheeler,Exide Eko,Exide,EKO-32L,32 Ah,12V,Heavy Duty Flooded 3W,36,18,18,"₹4,200","Left | Bajaj RE Compact 4S Petrol/CNG, TVS King Deluxe"
downloaded_images/EKO-35L.jpg,Three Wheeler,Exide Eko,Exide,EKO-35L,35 Ah,12V,Heavy Duty Flooded 3W,36,18,18,"₹4,600","Left | Mahindra Alfa Passenger/Cargo, Piaggio Ape City Diesel"
downloaded_images/EKO-40L.jpg,Three Wheeler,Exide Eko,Exide,EKO-40L,40 Ah,12V,Heavy Duty Flooded 3W,36,18,18,"₹5,100","Left | Piaggio Ape Extra LDX Cargo, Atul Shakti, High payload auto rickshaws"
downloaded_images/DRIVE3W-32L.jpg,Three Wheeler,Exide Drive 3W,Exide,DRIVE3W-32L,32 Ah,12V,Commercial Taxi Duty 3W,24,12,12,"₹3,800","Left | High-mileage CNG Auto-Rickshaws (Bajaj Optima, Maxima)"
downloaded_images/IT_500.jpg,Inverter Battery,Exide InvaTubular,Exide,IT 500,150 Ah,12V,High-Pressure HADI Spine (1200 Cycles),66,48,18,"₹21,500",Tall Tubular | Flagship residential deep-cycle backup; severe 6-8 hr daily power outages
downloaded_images/IT_750.jpg,Inverter Battery,Exide InvaTubular,Exide,IT 750,200 Ah,12V,High-Pressure HADI Spine (1200 Cycles),66,48,18,"₹27,800","Tall Tubular | Extended capacity tall tubular battery for 3-4 BHK homes, small offices, dental clinics"
downloaded_images/IT_850.jpg,Inverter Battery,Exide InvaTubular,Exide,IT 850,220 Ah,12V,High-Pressure HADI Spine (1200 Cycles),66,48,18,"₹29,800",Tall Tubular | Heavy-duty domestic backup for high-load residential suites
downloaded_images/IT_900.jpg,Inverter Battery,Exide InvaTubular,Exide,IT 900,230 Ah,12V,High-Pressure HADI Spine (1200 Cycles),66,48,18,"₹31,500",Tall Tubular | Maximum tall tubular capacity for prolonged 10-14 hour blackout regions
downloaded_images/IT_1000.jpg,Inverter Battery,Exide InvaTubular,Exide,IT 1000,260 Ah,12V,High-Pressure HADI Spine (1200 Cycles),66,48,18,"₹35,500",Tall Tubular | Ultra high capacity tall tubular bank for commercial establishments & clinics
downloaded_images/IMTT_1500.jpg,Inverter Battery,Exide InvaMaster,Exide,IMTT 1500,150 Ah,12V,Standard Spine Tubular (1000 Cycles),60,36,24,"₹18,200",Tall Tubular | Mainstream tall tubular inverter battery with ceramic level indicators
downloaded_images/IMTT_1800.jpg,Inverter Battery,Exide InvaMaster,Exide,IMTT 1800,180 Ah,12V,Standard Spine Tubular (1000 Cycles),60,36,24,"₹21,200",Tall Tubular | Mid-size tall tubular battery for 3-BHK flats with smart TVs & coolers
downloaded_images/IMTT_2000.jpg,Inverter Battery,Exide InvaMaster,Exide,IMTT 2000,200 Ah,12V,Standard Spine Tubular (1000 Cycles),60,36,24,"₹23,900","Tall Tubular | High-demand residential battery for air coolers, entertainment sets, and LED lights"
downloaded_images/IMTT2300.jpg,Inverter Battery,Exide InvaMaster,Exide,IMTT2300,230 Ah,12V,Standard Spine Tubular (1000 Cycles),60,36,24,"₹26,800",Tall Tubular | Extended tall tubular capacity for high inductive loads
downloaded_images/IMST_1500.jpg,Inverter Battery,Exide InvaMaster,Exide,IMST 1500,150 Ah,12V,Short Compact Tubular (1000 Cycles),60,36,24,"₹17,500",Short Tubular | Compact height design tailored for low-profile inverter trolleys and modular cabinets
downloaded_images/IMST_1800.jpg,Inverter Battery,Exide InvaMaster,Exide,IMST 1800,180 Ah,12V,Short Compact Tubular (1000 Cycles),60,36,24,"₹20,400",Short Tubular | High Ah short tubular battery for space-constrained apartment cabinets
downloaded_images/IZTT_1500.jpg,Inverter Battery,Exide InvaZen,Exide,IZTT 1500,150 Ah,12V,Standard Spine Tubular (900 Cycles),60,36,24,"₹16,800",Tall Tubular | Cost-effective tall tubular series for tier-2/3 cities and standard home UPS setups
downloaded_images/IZTT_2000HL.jpg,Inverter Battery,Exide InvaZen,Exide,IZTT 2000HL,200 Ah,12V,Standard Spine Tubular (900 Cycles),60,36,24,"₹22,400",Tall Tubular | Heavy-duty electrolyte volume with high heat and thermal overcharge resistance
downloaded_images/MGTT_1500.jpg,Inverter Battery,Exide InvaMagic,Exide,MGTT 1500,150 Ah,12V,Standard Tubular (800 Cycles),48,30,18,"₹15,200",Tall Tubular | Value-segment tall tubular inverter battery for light-to-moderate power cut frequency
downloaded_images/MGTT_2000.jpg,Inverter Battery,Exide InvaMagic,Exide,MGTT 2000,200 Ah,12V,Standard Tubular (800 Cycles),48,30,18,"₹19,800",Tall Tubular | Budget 200Ah deep cycle tubular battery for extended home emergency backup
downloaded_images/PBTT_1500.jpg,Inverter Battery,Exide PowerBox,Exide,PBTT 1500,150 Ah,12V,Economy Tubular (700 Cycles),36,18,18,"₹13,900",Tall Tubular | Entry level tall tubular battery for low budget residential installations
downloaded_images/PBTT_2000.jpg,Inverter Battery,Exide PowerBox,Exide,PBTT 2000,200 Ah,12V,Economy Tubular (700 Cycles),36,18,18,"₹17,500",Tall Tubular | High capacity economy tubular battery for commercial shops and budget homes
downloaded_images/EL-ULTRA-150.jpg,Inverter Battery,Exide EL Ultra,Exide,EL-ULTRA-150,150 Ah,12V,Heavy Duty C10 Tubular (1400 Cycles),72,54,18,"₹24,500",Tall Tubular C10 | Industry leading 6-year warranty; C10 rating for rapid recharge and continuous cycling
downloaded_images/EL-ULTRA-200.jpg,Inverter Battery,Exide EL Ultra,Exide,EL-ULTRA-200,200 Ah,12V,Heavy Duty C10 Tubular (1400 Cycles),72,54,18,"₹32,000",Tall Tubular C10 | Heavy commercial C10 tubular battery for continuous deep discharge and solar pairing
downloaded_images/IKTT_1500.jpg,Vintage Inverter,Exide InvaKing,Exide,IKTT 1500,150 Ah,12V,Legacy Heavy Spine Tubular,54,36,18,"₹16,900",Tall Tubular | Popular early 2010s deep-cycle tall tubular inverter series (Discontinued)
downloaded_images/IP_1500.jpg,Vintage Inverter,Exide InvaPlus,Exide,IP 1500,150 Ah,12V,Heavy Flat Plate Inverter Line,36,24,12,"₹12,500",Flat Plate Flooded | Early flat-plate residential inverter line (Discontinued in favor of tubular)
downloaded_images/TM_1500.jpg,Vintage Inverter,Exide Tubemaster,Exide,TM 1500,150 Ah,12V,Heavy Short Tubular Plate,48,30,18,"₹15,500",Short Tubular | Classic short-tubular inverter battery from 2008-2016 period
downloaded_images/STAR_12V_700.jpg,Home Inverter UPS,Exide Home Star,Exide,STAR 12V 700,700 VA,12V,Pure Sine Wave DSP Microcontroller,24,24,0,"₹5,400","Cabinet Desktop | Powers 2 Fans, 3 LED Bulbs, 1 TV, 1 Wi-Fi Router (Small 1-BHK / Studio)"
downloaded_images/STAR_12V_900.jpg,Home Inverter UPS,Exide Home Star,Exide,STAR 12V 900,900 VA,12V,Pure Sine Wave DSP Microcontroller,24,24,0,"₹6,200","Cabinet Desktop | Powers 3 Fans, 5 LED Bulbs, 1 Smart TV, 1 Laptop, 1 Set Top Box (2-BHK)"
downloaded_images/STAR_12V_1125.jpg,Home Inverter UPS,Exide Home Star,Exide,STAR 12V 1125,1125 VA,12V,Pure Sine Wave DSP Microcontroller,24,24,0,"₹7,100","Cabinet Desktop | Powers 4 Fans, 6 LEDs, 1 TV, 1 Refrigerator (under 250L), Desktop PC (3-BHK)"
downloaded_images/STAR_12V_1375.jpg,Home Inverter UPS,Exide Home Star,Exide,STAR 12V 1375,1375 VA,12V,Pure Sine Wave DSP Microcontroller,24,24,0,"₹8,400",Cabinet Desktop | Heavy single-battery 12V UPS; supports domestic water pump / mixer grinder briefly
downloaded_images/GQP_12V_1125.jpg,Home Inverter UPS,Exide Home GQP,Exide,GQP 12V 1125,1125 VA,12V,Heavy Copper Wound Transformer Sine,36,36,0,"₹8,200",Cabinet Desktop | Heavy copper transformer topology; superior surge protection against grid spikes
downloaded_images/GQP_24V_1500.jpg,Home/Office UPS,Exide Home GQP,Exide,GQP 24V 1500,1500 VA,24V,Heavy Copper Wound Transformer Sine,36,36,0,"₹11,500","Cabinet Desktop | 24V dual battery system for duplexes, pathology labs, and retail billing counters"
downloaded_images/GQP_24V_2500.jpg,Commercial UPS,Exide Home GQP,Exide,GQP 24V 2500,2500 VA,24V,Heavy Copper Wound Transformer Sine,36,36,0,"₹16,800",Cabinet Desktop | High capacity commercial pure sine wave system for dental clinics and IT server racks
downloaded_images/GQP_36V_3500.jpg,Commercial UPS,Exide Home GQP,Exide,GQP 36V 3500,3500 VA,36V,Heavy 3-Battery Industrial Sine Wave,36,36,0,"₹24,500","Tower Cabinet | Offices with 10+ PCs, photocopiers, laser printers, medical diagnostic equipment"
downloaded_images/GQP_48V_5000.jpg,Commercial UPS,Exide Home GQP,Exide,GQP 48V 5000,5000 VA,48V,Heavy 4-Battery Commercial Sine Wave,36,36,0,"₹34,000","Tower Cabinet | Small commercial banks, petrol pumps, boutique hospitals, lifts"
downloaded_images/INTEGRA_700.png,Lithium Smart UPS,Exide Integra,Exide,INTEGRA 700,720 Wh,25.6V,Integrated LiFePO4 Battery + BMS,60,60,0,"₹28,500",Wall Mounted | Sleek wall-mounted design; 3x faster charging; 2500+ life cycles; zero floor space
downloaded_images/INTEGRA_1000.png,Lithium Smart UPS,Exide Integra,Exide,INTEGRA 1000,1024 Wh,25.6V,Integrated LiFePO4 Battery + BMS,60,60,0,"₹38,000",Wall Mounted | High energy LiFePO4 wall inverter with real-time digital LCD and silent operation
downloaded_images/SMART_850.jpg,Vintage UPS,Exide InvaSmart,Exide,SMART 850,850 VA,12V,Square Wave Domestic Inverter,24,24,0,"₹4,100",Cabinet Desktop | Early entry-level square-wave home inverter (Discontinued)
downloaded_images/SMART_1050.jpg,Vintage UPS,Exide InvaSmart,Exide,SMART 1050,1050 VA,12V,Square Wave Domestic Inverter,24,24,0,"₹4,900",Cabinet Desktop | Early generation quasi-sine residential backup unit
downloaded_images/XP880.jpg,Commercial (Truck),Exide Xpress,Exide,XP880,88 Ah,12V,Heavy Duty Hybrid Alloy,36,18,18,"₹8,200","Left | Light Commercial Vehicles (LCV): Tata 407, Tata 709, Eicher Pro 1049, Ashok Leyland Dost"
downloaded_images/XP1000.jpg,Commercial (Truck),Exide Xpress,Exide,XP1000,100 Ah,12V,Heavy Duty Hybrid Alloy,36,18,18,"₹9,400","Left | Medium Commercial Vehicles (MCV): Tata 1109, Eicher Pro 11.10, Ashok Leyland Partner"
downloaded_images/XP1300.jpg,Commercial (Truck),Exide Xpress,Exide,XP1300,130 Ah,12V,Heavy Duty Hybrid Alloy,36,18,18,"₹11,800","Left | Heavy Commercial Vehicles (HCV): Tata Signa 2818, Ashok Leyland 1616, City/Intercity Buses"
downloaded_images/XP1500.jpg,Commercial (Truck),Exide Xpress,Exide,XP1500,150 Ah,12V,Heavy Duty Hybrid Alloy,36,18,18,"₹13,400","Left | Multi-Axle Heavy Trucks & Tippers: Tata Prima, BharatBenz 2823, Ashok Leyland 2820"
downloaded_images/XP1800.jpg,Commercial (Truck),Exide Xpress,Exide,XP1800,180 Ah,12V,Heavy Duty Hybrid Alloy,36,18,18,"₹15,900","Left | Heavy Long-Haul Trailers, Mining Tippers, Volvo 9400 Intercity Luxury Coaches"
downloaded_images/XP2000.jpg,Commercial (Truck),Exide Xpress,Exide,XP2000,200 Ah,12V,Heavy Duty Hybrid Alloy,36,18,18,"₹17,800","Left | Ultra heavy cranes, construction equipment, earthmovers (JCB, CAT Heavy Loaders)"
downloaded_images/GOLD800.jpg,Vintage Commercial,Exide Gold Commercial,Exide,GOLD800,80 Ah,12V,Traditional Hard Rubber Container,18,12,6,"₹6,800","Left | Legacy Tata 407, Swaraj Mazda (Discontinued hard-rubber series)"
downloaded_images/GOLD1300.jpg,Vintage Commercial,Exide Gold Commercial,Exide,GOLD1300,130 Ah,12V,Traditional Hard Rubber Container,18,12,6,"₹9,900","Left | Vintage Ashok Leyland Comet, Tata 1210 / 1512 Trucks"
downloaded_images/LM1500.jpg,Vintage Commercial,Exide Loadmax,Exide,LM1500,150 Ah,12V,Commercial Flooded Transport Line,24,12,12,"₹11,200",Left | Fleet commercial haulage battery from 2005-2015 period
downloaded_images/JK75.jpg,Agri (Tractor),Exide Jai Kisan,Exide,JK75,75 Ah,12V,Vibration-Resistant Agri Flooded,36,18,18,"₹7,200","Left | Mahindra 275 DI / 475 DI, Swaraj 735 FE, Eicher 242 / 380, Tafe 241 DI"
downloaded_images/JK80.jpg,Agri (Tractor),Exide Jai Kisan,Exide,JK80,80 Ah,12V,Vibration-Resistant Agri Flooded,36,18,18,"₹7,600","Left | Sonalika DI 35, Swaraj 843 XM, Mahindra 575 DI"
downloaded_images/JK88.jpg,Agri (Tractor),Exide Jai Kisan,Exide,JK88,88 Ah,12V,Vibration-Resistant Agri Flooded,36,18,18,"₹8,100","Left | John Deere 5105 / 5050, Sonalika DI 745, New Holland 3600-2, Farmtrac 45"
downloaded_images/JK100.jpg,Agri (Tractor),Exide Jai Kisan,Exide,JK100,100 Ah,12V,Vibration-Resistant Agri Flooded,36,18,18,"₹9,300","Left | Heavy 60HP+ 4WD Tractors: John Deere 5310, New Holland 5620, Preet 6049, Combine Harvesters"
downloaded_images/GP75.jpg,Genset Battery,Exide Genplus,Exide,GP75,75 Ah,12V,Instant High-CCA Genset Flooded,24,24,0,"₹7,600","Left | 10 kVA to 25 kVA Diesel Generator Sets (Kirloskar, Mahindra Powerol)"
downloaded_images/GP88.jpg,Genset Battery,Exide Genplus,Exide,GP88,88 Ah,12V,Instant High-CCA Genset Flooded,24,24,0,"₹8,600",Left | 25 kVA to 40 kVA DG Sets (Ashok Leyland Power Solutions)
downloaded_images/GP100.jpg,Genset Battery,Exide Genplus,Exide,GP100,100 Ah,12V,Instant High-CCA Genset Flooded,24,24,0,"₹9,800","Left | 30 kVA to 62.5 kVA Diesel Generator Sets (Cummins, Ashok Leyland Gensets)"
downloaded_images/GP120.jpg,Genset Battery,Exide Genplus,Exide,GP120,120 Ah,12V,Instant High-CCA Genset Flooded,24,24,0,"₹11,500","Left | 82.5 kVA to 125 kVA Industrial Diesel Gensets (Caterpillar, Cummins India)"
downloaded_images/GP150.jpg,Genset Battery,Exide Genplus,Exide,GP150,150 Ah,12V,Instant High-CCA Genset Flooded,24,24,0,"₹13,800",Left | 125 kVA to 200 kVA Cummins / Kirloskar Silent Canopy Gensets
downloaded_images/GP180.jpg,Genset Battery,Exide Genplus,Exide,GP180,180 Ah,12V,Instant High-CCA Genset Flooded,24,24,0,"₹16,200",Left | 160 kVA to 500 kVA Heavy Industrial Backup Power Generators
downloaded_images/NEO_100.png,E-Rickshaw,Exide Neo,Exide,NEO 100,100 Ah,12V,Deep-Cycle Tubular E-Rickshaw,12,9,3,"₹7,900",Standard | Standard 4-passenger commercial electric rickshaws (Pack of 4 = 48V bank)
downloaded_images/DURALIFE_130.png,E-Rickshaw,Exide Duralife,Exide,DURALIFE 130,130 Ah,12V,Deep-Cycle Tubular E-Rickshaw,15,12,3,"₹9,800",Standard | Long-range passenger electric rickshaws for higher daily running kilometers
downloaded_images/E-RIDE_PLUS_140.png,E-Rickshaw,Exide E-Ride Plus,Exide,E-RIDE PLUS 140,140 Ah,12V,Heavy Duty Deep-Cycle Tubular,18,12,6,"₹10,800",Standard | Heavy-duty electric cargo delivery loaders and multi-shift e-rickshaws
downloaded_images/E-RIDE_100.png,E-Rickshaw,Exide E-Ride,Exide,E-RIDE 100,100 Ah,12V,Tubular E-Rickshaw Baseline,12,9,3,"₹7,400",Standard | Baseline passenger e-rickshaws (Early generation E-Ride model)
downloaded_images/SOLARBLITZ_40.jpg,Solar Tubular,Exide Solarblitz,Exide,SOLARBLITZ 40,40 Ah,12V,Solar Deep-Cycle C10 (PSoC Compliant),60,60,0,"₹5,800","Solar Tall Tubular C10 | Solar street lights, solar LED blinkers, telemetry units"
downloaded_images/SOLARBLITZ_75.jpg,Solar Tubular,Exide Solarblitz,Exide,SOLARBLITZ 75,75 Ah,12V,Solar Deep-Cycle C10 (PSoC Compliant),60,60,0,"₹8,400",Solar Tall Tubular C10 | Small 300W-500W rural off-grid home lighting kits
downloaded_images/SOLARBLITZ_100.jpg,Solar Tubular,Exide Solarblitz,Exide,SOLARBLITZ 100,100 Ah,12V,Solar Deep-Cycle C10 (PSoC Compliant),60,60,0,"₹10,900","Solar Tall Tubular C10 | Off-Grid Solar Rooftop Systems, Solar Street Lights, Remote Telemetry"
downloaded_images/SOLARBLITZ_150.jpg,Solar Tubular,Exide Solarblitz,Exide,SOLARBLITZ 150,150 Ah,12V,Solar Deep-Cycle C10 (PSoC Compliant),60,60,0,"₹15,800",Solar Tall Tubular C10 | Residential 1kW - 3kW Off-Grid and Hybrid Solar PV Inverter installations
downloaded_images/SOLARBLITZ_200.jpg,Solar Tubular,Exide Solarblitz,Exide,SOLARBLITZ 200,200 Ah,12V,Solar Deep-Cycle C10 (PSoC Compliant),60,60,0,"₹20,900","Solar Tall Tubular C10 | Heavy Solar PV Banks for agricultural solar pumps, off-grid farmhouses, and microgrids"
downloaded_images/SOL-6LMS150.jpg,Solar Tubular,Exide Solar Tubular (C10),Exide,SOL-6LMS150,150 Ah,12V,Heavy Duty Low Maintenance Solar C10,60,60,0,"₹16,500",Solar Tall Tubular C10 | Industrial & Institutional Solar Rooftops (MNRE approved classic spec)
downloaded_images/SOL-6LMS200.jpg,Solar Tubular,Exide Solar Tubular (C10),Exide,SOL-6LMS200,200 Ah,12V,Heavy Duty Low Maintenance Solar C10,60,60,0,"₹21,800","Solar Tall Tubular C10 | Solar telecom towers, large off-grid solar mini-grids"
downloaded_images/EP-7-12.jpg,Industrial VRLA,Exide Powersafe,Exide,EP-7-12,7.2 Ah,12V,Compact SMF VRLA Standby,12,12,0,"₹1,150","F2 Tab Faston | Desktop UPS (600VA / 1000VA), burglar alarms, emergency emergency lanterns"
downloaded_images/EP-12-12.jpg,Industrial VRLA,Exide Powersafe,Exide,EP-12-12,12 Ah,12V,Compact SMF VRLA Standby,12,12,0,"₹1,950","F2 Tab Faston | Medical monitors, electric toys, weighing scales, 1kVA line-interactive UPS"
downloaded_images/EP-18-12.jpg,Industrial VRLA,Exide Powersafe,Exide,EP-18-12,18 Ah,12V,AGM SMF VRLA Standby,24,24,0,"₹3,200","Threaded Post | Portable medical equipment, small online UPS banks"
downloaded_images/EP-26-12.jpg,Industrial VRLA,Exide Powersafe,Exide,EP-26-12,26 Ah,12V,AGM SMF VRLA Standby,24,24,0,"₹4,800","Threaded Post | Fire alarm systems, medical equipment, small online UPS banks"
downloaded_images/EP-42-12.jpg,Industrial VRLA,Exide Powersafe,Exide,EP-42-12,42 Ah,12V,AGM SMF VRLA Standby,24,24,0,"₹7,100","Threaded Post | Elevator emergency landing devices (ARD), medium online UPS"
downloaded_images/EP-65-12.jpg,Industrial VRLA,Exide Powersafe,Exide,EP-65-12,65 Ah,12V,AGM SMF VRLA Standby,24,24,0,"₹9,400","Threaded Post | Telecom towers, railway signaling, banking server room UPS"
downloaded_images/EP-100-12.jpg,Industrial VRLA,Exide Powersafe,Exide,EP-100-12,100 Ah,12V,AGM SMF VRLA Standby (UL94-V0),24,24,0,"₹13,200","Threaded Post | Data centers, central enterprise UPS, banking headquarters, hospital critical power"
downloaded_images/EP-120-12.jpg,Industrial VRLA,Exide Powersafe,Exide,EP-120-12,120 Ah,12V,AGM SMF VRLA Standby (UL94-V0),24,24,0,"₹15,800","Threaded Post | Large 3-phase online UPS installations, broadcasting hubs"
downloaded_images/EP-150-12.jpg,Industrial VRLA,Exide Powersafe,Exide,EP-150-12,150 Ah,12V,AGM SMF VRLA Standby (UL94-V0),24,24,0,"₹18,900","Threaded Post | Power plant substations, industrial SCADA systems, telecom central offices"
downloaded_images/EP-200-12.jpg,Industrial VRLA,Exide Powersafe,Exide,EP-200-12,200 Ah,12V,AGM SMF VRLA Standby (UL94-V0),24,24,0,"₹24,500",Threaded Post | High rate discharge VRLA for heavy industrial 3-phase online UPS installations
downloaded_images/EP-2V-200.jpg,Industrial 2V VRLA,Exide Powersafe (2V Cell),Exide,EP-2V-200,200 Ah,2V,2V VRLA Deep Standby Cell,36,36,0,"₹6,800","Heavy Lead Post | Power substation 110V/220V DC battery banks, telecom central switching"
downloaded_images/EP-2V-500.jpg,Industrial 2V VRLA,Exide Powersafe (2V Cell),Exide,EP-2V-500,500 Ah,2V,2V VRLA Deep Standby Cell,36,36,0,"₹14,200","Heavy Lead Post | Thermal power generation switchyards, central railway traction substations"
downloaded_images/EP-2V-1000.jpg,Industrial 2V VRLA,Exide Powersafe (2V Cell),Exide,EP-2V-1000,1000 Ah,2V,2V VRLA Deep Standby Cell,36,36,0,"₹27,500","Heavy Lead Post | Nuclear power plant backup systems, metro rail signaling networks"
downloaded_images/YKP-17___YKP-21.png,Industrial Plante,Exide Plante Cell (2V),Exide,YKP-17 / YKP-21,200 - 1200 Ah,2V,Pure Lead Plante High-Reliability,60,60,0,"₹38,000",Solid Copper Post | Critical 25+ year lifespan nuclear and thermal electrical grid trip circuits`;

// Parse CSV lines cleanly handling quotes
function parseCsv(text) {
  const rows = [];
  const lines = text.trim().split("\n");
  const headers = parseCsvLine(lines[0]);

  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i]);
    const row = {};
    headers.forEach((h, index) => {
      row[h.trim()] = values[index] ? values[index].trim() : "";
    });
    rows.push(row);
  }
  return rows;
}

function parseCsvLine(line) {
  const result = [];
  let current = "";
  let insideQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (insideQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === "," && !insideQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

// Category Mapping Function
function mapCategory(rawCat, brandSeries, capacity, tech) {
  const cat = (rawCat || "").toLowerCase();
  const series = (brandSeries || "").toLowerCase();
  const capLow = (capacity || "").toLowerCase();

  if (cat.includes("inverter battery") || cat.includes("vintage inverter")) {
    return {
      id: "b0000000-0000-0000-0000-000000000001",
      slug: "inverter-batteries",
      name: "Inverter Tubular Batteries",
    };
  }

  if (
    cat.includes("home inverter ups") ||
    cat.includes("home/office ups") ||
    cat.includes("commercial ups") ||
    cat.includes("lithium smart ups") ||
    cat.includes("vintage ups") ||
    capLow.includes("va") ||
    capLow.includes("wh")
  ) {
    return {
      id: "b0000000-0000-0000-0000-000000000002",
      slug: "inverters-ups",
      name: "Inverters & Home UPS",
    };
  }

  if (cat.includes("two wheeler") || series.includes("xplore") || series.includes("bikerz") || series.includes("zoom") || series.includes("boss")) {
    return {
      id: "b0000000-0000-0000-0000-000000000004",
      slug: "two-wheeler-batteries",
      name: "Two Wheeler Batteries",
    };
  }

  if (cat.includes("three wheeler") || cat.includes("e-rickshaw")) {
    return {
      id: "b0000000-0000-0000-0000-000000000006",
      slug: "e-rickshaw-batteries",
      name: "Three Wheeler & E-Rickshaw Batteries",
    };
  }

  if (cat.includes("commercial (truck)") || cat.includes("agri (tractor)") || cat.includes("commercial fleet") || cat.includes("taxi specific") || cat.includes("vintage commercial")) {
    return {
      id: "b0000000-0000-0000-0000-000000000005",
      slug: "commercial-batteries",
      name: "Commercial & Heavy Vehicle Batteries",
    };
  }

  if (cat.includes("genset") || cat.includes("solar tubular") || series.includes("solar") || series.includes("genplus")) {
    return {
      id: "b0000000-0000-0000-0000-000000000007",
      slug: "solar-batteries",
      name: "Genset & Solar Batteries",
    };
  }

  if (cat.includes("industrial") || cat.includes("plante") || cat.includes("vrla")) {
    return {
      id: "b0000000-0000-0000-0000-000000000008",
      slug: "industrial-batteries",
      name: "Industrial & Standby Power",
    };
  }

  // Default to Car & Passenger Vehicle Batteries
  return {
    id: "b0000000-0000-0000-0000-000000000003",
    slug: "car-batteries",
    name: "Car & Passenger Vehicle Batteries",
  };
}

const rawRows = parseCsv(rawCsv);
console.log(`Parsed ${rawRows.length} rows.`);

const usedSlugs = new Set();

const transformedProducts = rawRows.map((row, idx) => {
  const imgFile = path.basename(row["image_url"]);
  const imageUrl = `/products/${imgFile}`;
  const brandName = "Exide";
  const brandSeries = row["Brand Series"] || "Exide Series";
  const modelSku = row["Model / SKU"];
  const capacity = row["Capacity (Ah / VA)"] || null;
  const voltage = row["Voltage (V)"] || "12V";
  const plateTech = row["Plate Technology / Metallurgy"] || "Lead-Acid Technology";
  const totalWarranty = parseInt(row["Total Warranty (Mos)"] || "36", 10);
  const foc = parseInt(row["FOC (Mos)"] || "0", 10);
  const proRata = parseInt(row["Pro-Rata (Mos)"] || "0", 10);
  const approxMrp = parseFloat(String(row["Approx MRP (₹)"]).replace(/[^0-9.]/g, "") || "0");

  const layoutSpecRaw = row["Detailed Layout, Engineering Specs & Application Compatibility"] || "";
  let layoutType = "Standard";
  let applicationText = layoutSpecRaw;
  let compatibleApps = [];

  if (layoutSpecRaw.includes("|")) {
    const parts = layoutSpecRaw.split("|");
    layoutType = parts[0].trim();
    applicationText = parts.slice(1).join("|").trim();
    compatibleApps = applicationText.split(/[,;]/).map(s => s.trim()).filter(Boolean);
  } else {
    compatibleApps = [layoutSpecRaw];
  }

  // Determine category
  const catObj = mapCategory(row["Category / Status"], brandSeries, capacity, plateTech);

  // Generate unique clean slug
  let rawSlug = `exide-${brandSeries.replace(/[^a-zA-Z0-9]+/g, "-")}-${modelSku.replace(/[^a-zA-Z0-9]+/g, "-")}`.toLowerCase();
  rawSlug = rawSlug.replace(/-+/g, "-").replace(/^-+|-+$/g, "");
  let slug = rawSlug;
  let c = 1;
  while (usedSlugs.has(slug)) {
    slug = `${rawSlug}-${c++}`;
  }
  usedSlugs.add(slug);

  const uuid = `d0000000-0000-0000-0000-${String(idx + 100).padStart(12, "0")}`;

  return {
    id: uuid,
    link: slug,
    image_url: imageUrl,
    category_id: catObj.id,
    status: "active",
    brand_series: brandSeries,
    brand_name: brandName,
    model_sku: modelSku,
    capacity: capacity,
    voltage: voltage,
    plate_technology: plateTech,
    total_warranty_months: totalWarranty,
    foc_months: foc,
    pro_rata_months: proRata,
    approx_mrp: approxMrp,
    is_in_stock: true,
    created_at: "2026-08-28T00:00:00.000Z",
    updated_at: "2026-08-28T00:00:00.000Z",
    detailed_layout: {
      layout_type: layoutType,
      application: applicationText,
      compatible_applications: compatibleApps,
      features: [
        `${plateTech} metallurgy & engineering`,
        `${totalWarranty} Months Total Warranty (${foc}M Free Replacement + ${proRata}M Pro-Rata)`,
        `Layout / Form Factor: ${layoutType}`,
        `Application: ${applicationText}`
      ]
    }
  };
});

const categoriesList = [
  {
    id: "b0000000-0000-0000-0000-000000000001",
    category_name: "Inverter Tubular Batteries",
    description: "Heavy duty deep-cycle tall tubular & short tubular backup batteries",
    status: "active",
    created_at: "2026-08-28T00:00:00.000Z",
  },
  {
    id: "b0000000-0000-0000-0000-000000000002",
    category_name: "Inverters & Home UPS",
    description: "Pure sine wave inverters, copper transformer systems & lithium smart UPS",
    status: "active",
    created_at: "2026-08-28T00:00:00.000Z",
  },
  {
    id: "b0000000-0000-0000-0000-000000000003",
    category_name: "Car & Passenger Vehicle Batteries",
    description: "Passenger cars, luxury AGM, micro-hybrid ISS, and taxi fleet batteries",
    status: "active",
    created_at: "2026-08-28T00:00:00.000Z",
  },
  {
    id: "b0000000-0000-0000-0000-000000000004",
    category_name: "Two Wheeler Batteries",
    description: "Factory-charged AGM VRLA motorcycle & scooter starter batteries",
    status: "active",
    created_at: "2026-08-28T00:00:00.000Z",
  },
  {
    id: "b0000000-0000-0000-0000-000000000005",
    category_name: "Commercial & Heavy Vehicle Batteries",
    description: "Multi-axle trucks, trailers, buses, earthmovers, and farm tractors",
    status: "active",
    created_at: "2026-08-28T00:00:00.000Z",
  },
  {
    id: "b0000000-0000-0000-0000-000000000006",
    category_name: "Three Wheeler & E-Rickshaw Batteries",
    description: "Auto-rickshaws, cargo loaders, and deep-cycle tubular e-rickshaws",
    status: "active",
    created_at: "2026-08-28T00:00:00.000Z",
  },
  {
    id: "b0000000-0000-0000-0000-000000000007",
    category_name: "Genset & Solar Batteries",
    description: "Diesel generator instant high-CCA starting and Solar C10 deep-cycle storage",
    status: "active",
    created_at: "2026-08-28T00:00:00.000Z",
  },
  {
    id: "b0000000-0000-0000-0000-000000000008",
    category_name: "Industrial & Standby Power",
    description: "Powersafe SMF VRLA, 2V deep standby power cells, and Plante battery banks",
    status: "active",
    created_at: "2026-08-28T00:00:00.000Z",
  },
];

const fileContent = `import { Product, Category } from "@/types/database";

export const EXIDE_CATEGORIES: Category[] = ${JSON.stringify(categoriesList, null, 2)};

export const EXIDE_PRODUCTS: Product[] = ${JSON.stringify(transformedProducts, null, 2)};
`;

const outputPath = path.join(__dirname, "../src/lib/constants/exide-products-data.ts");
fs.writeFileSync(outputPath, fileContent, "utf8");

const jsonPath = path.join(__dirname, "../src/lib/constants/exide-products.json");
fs.writeFileSync(
  jsonPath,
  JSON.stringify({ categories: categoriesList, products: transformedProducts }, null, 2),
  "utf8"
);

console.log("Successfully generated " + transformedProducts.length + " products to " + outputPath + " and " + jsonPath);

