import type { Market, PriceLever, Social } from "@/lib/demo-store";

export type ShopRow = {
  id: string;
  exposed: number;
  viewed: number;
  cart: number;
  purchase: number;
};

export type SeedRow = {
  id: Social;
  exposed: number;
  opened: number;
  click: number;
};

/** Scripted showcase cohort. Not a class log and not a pilot result. */
export const SHOP: Record<Market, Record<PriceLever, ShopRow[]>> = {
  HK: {
    frame: [
      { id: "allin", exposed: 24, viewed: 22, cart: 9, purchase: 6 },
      { id: "partitioned", exposed: 24, viewed: 21, cart: 14, purchase: 11 },
    ],
    anchor: [
      { id: "absent", exposed: 20, viewed: 18, cart: 6, purchase: 4 },
      { id: "present", exposed: 20, viewed: 19, cart: 11, purchase: 8 },
    ],
  },
  ML: {
    frame: [
      { id: "allin", exposed: 22, viewed: 19, cart: 8, purchase: 8 },
      { id: "partitioned", exposed: 22, viewed: 18, cart: 7, purchase: 6 },
    ],
    anchor: [
      { id: "absent", exposed: 20, viewed: 16, cart: 7, purchase: 5 },
      { id: "present", exposed: 20, viewed: 17, cart: 8, purchase: 5 },
    ],
  },
};

export const SEED: Record<Market, SeedRow[]> = {
  HK: [
    { id: "baseline", exposed: 20, opened: 11, click: 4 },
    { id: "proof", exposed: 20, opened: 16, click: 9 },
    { id: "kol", exposed: 18, opened: 14, click: 7 },
  ],
  ML: [
    { id: "baseline", exposed: 18, opened: 8, click: 3 },
    { id: "proof", exposed: 18, opened: 12, click: 5 },
    { id: "kol", exposed: 16, opened: 13, click: 8 },
  ],
};

export const PRICE = 268;
export const PART_ITEM = 228;
export const PART_FEE = 40;
export const ANCHOR_REF = 420;

export const COURSES: { code: string; title: string; level: string; note: string }[] = [
  { code: "MKT3603", title: "Consumer Behavior", level: "Undergraduate", note: "" },
  { code: "MKT5611", title: "Consumer/Buyer Behaviour", level: "MSc", note: "" },
  { code: "MKT4681", title: "Data Strategy for Marketing", level: "Undergraduate", note: "" },
  { code: "MKT5650", title: "Data Strategy in Marketing", level: "MSc", note: "" },
  { code: "MKT4604", title: "Marketing in China", level: "Undergraduate", note: "" },
  { code: "MKT5641", title: "Chinese Business Culture and Marketing", level: "MSc", note: "" },
  { code: "CB3043", title: "Business Case Analysis and Communication", level: "Undergraduate", note: "" },
  { code: "MKT5651", title: "Business Case Analysis and Communication", level: "MSc", note: "" },
  { code: "FB5601", title: "Principles of Marketing", level: "MBA", note: "40 × 2" },
  { code: "FB6880P", title: "Global Marketing", level: "EMBA", note: "30–40" },
];
