import { create } from "zustand";

export interface Appliance {
  id: string;
  name: string;
  wattage: number;
  quantity: number;
  iconName: string;
}

interface LoadCalculatorState {
  appliances: Appliance[];
  backupHours: number;
  updateApplianceQuantity: (id: string, quantity: number) => void;
  setBackupHours: (hours: number) => void;
  resetCalculator: () => void;

  // Calculation getters
  getTotalWattage: () => number;
  getRecommendedInverterVA: () => number;
  getRecommendedBatteryAh: () => number;
  getSuggestedComboName: () => string;
}

const DEFAULT_APPLIANCES: Appliance[] = [
  { id: "fan", name: "Ceiling Fan", wattage: 75, quantity: 3, iconName: "Fan" },
  { id: "led", name: "LED Bulb / Tube", wattage: 15, quantity: 4, iconName: "Lightbulb" },
  { id: "tv", name: "Smart LED TV (43\")", wattage: 100, quantity: 1, iconName: "Tv" },
  { id: "fridge", name: "Refrigerator (Single Door)", wattage: 200, quantity: 0, iconName: "Refrigerator" },
  { id: "laptop", name: "Laptop / Wi-Fi Router", wattage: 65, quantity: 1, iconName: "Laptop" },
  { id: "cooler", name: "Air Cooler", wattage: 180, quantity: 0, iconName: "Wind" },
];

export const useLoadCalculatorStore = create<LoadCalculatorState>((set, get) => ({
  appliances: DEFAULT_APPLIANCES,
  backupHours: 4,

  updateApplianceQuantity: (id, quantity) => {
    set((state) => ({
      appliances: state.appliances.map((app) =>
        app.id === id ? { ...app, quantity: Math.max(0, quantity) } : app
      ),
    }));
  },

  setBackupHours: (hours) => {
    set({ backupHours: Math.max(1, Math.min(12, hours)) });
  },

  resetCalculator: () => {
    set({ appliances: DEFAULT_APPLIANCES, backupHours: 4 });
  },

  getTotalWattage: () => {
    return get().appliances.reduce((sum, item) => sum + item.wattage * item.quantity, 0);
  },

  getRecommendedInverterVA: () => {
    const totalWattage = get().getTotalWattage();
    if (totalWattage === 0) return 700;
    // Power factor 0.8 with 20% safety headroom
    const va = Math.ceil((totalWattage / 0.8) * 1.2);
    if (va <= 700) return 700;
    if (va <= 900) return 900;
    if (va <= 1100) return 1100;
    if (va <= 1500) return 1500;
    if (va <= 2000) return 2000;
    return Math.ceil(va / 500) * 500;
  },

  getRecommendedBatteryAh: () => {
    const totalWattage = get().getTotalWattage();
    const hours = get().backupHours;
    if (totalWattage === 0) return 150;
    // Formula: (Wattage * Hours) / (12V * 0.8 Efficiency)
    const requiredAh = (totalWattage * hours) / (12 * 0.8);
    if (requiredAh <= 100) return 100;
    if (requiredAh <= 150) return 150;
    if (requiredAh <= 200) return 200;
    if (requiredAh <= 240) return 220;
    return 240;
  },

  getSuggestedComboName: () => {
    const va = get().getRecommendedInverterVA();
    const ah = get().getRecommendedBatteryAh();
    return `${va}VA Pure Sine Wave Inverter + ${ah}Ah Tall Tubular Battery`;
  },
}));
