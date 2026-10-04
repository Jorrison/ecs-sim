import { create } from "zustand";
import type { Lang } from "@/lib/tx";

export type Market = "HK" | "ML";
export type Lens = "student" | "teacher";
export type Role = "seller" | "buyer";
export type PriceLever = "frame" | "anchor";
export type Frame = "allin" | "partitioned";
export type Anchor = "absent" | "present";
export type Social = "baseline" | "proof" | "kol";
export type NextStep = "" | "keep" | "rewrite" | "stop";

export type EventKind =
  | "impression"
  | "price_view"
  | "cart"
  | "abandon"
  | "purchase"
  | "configure"
  | "note_open"
  | "like"
  | "comment"
  | "recommend"
  | "click_listing";

export type LiveEvent = {
  id: string;
  at: number;
  kind: EventKind;
  lab: "shop" | "seed";
  condition: string;
  market: Market;
};

type DemoState = {
  lang: Lang;
  lens: Lens;
  consent: boolean;
  market: Market;
  priceLever: PriceLever;
  armFrame: Frame;
  armAnchor: Anchor;
  armSocial: Social;
  role: Role;
  credits: number;
  inCart: boolean;
  purchased: boolean;
  configured: boolean;
  justification: string;
  liked: boolean;
  comment: string;
  recommended: boolean;
  noteOpened: boolean;
  nextStep: NextStep;
  limitClaim: string;
  diversityPick: string;
  diversityNote: string;
  showShowcase: boolean;
  events: LiveEvent[];
  setLang: (lang: Lang) => void;
  setLens: (lens: Lens) => void;
  acceptConsent: () => void;
  setMarket: (market: Market) => void;
  setPriceLever: (lever: PriceLever) => void;
  setArmFrame: (arm: Frame) => void;
  setArmAnchor: (arm: Anchor) => void;
  setArmSocial: (arm: Social) => void;
  setRole: (role: Role) => void;
  setJustification: (value: string) => void;
  setComment: (value: string) => void;
  setNextStep: (value: NextStep) => void;
  setLimitClaim: (value: string) => void;
  setDiversityPick: (value: string) => void;
  setDiversityNote: (value: string) => void;
  setShowShowcase: (value: boolean) => void;
  log: (partial: Omit<LiveEvent, "id" | "at" | "market"> & { market?: Market }) => void;
  viewPrice: () => void;
  addCart: () => void;
  removeCart: () => void;
  purchase: (cost: number) => boolean;
  configure: () => void;
  openNote: () => void;
  like: () => void;
  sendComment: () => void;
  recommend: () => void;
  resetSession: () => void;
};

const STORAGE_KEY = "ecs-sim-demonstrator";

const initial = {
  lang: "en" as Lang,
  lens: "student" as Lens,
  consent: false,
  market: "HK" as Market,
  priceLever: "frame" as PriceLever,
  armFrame: "partitioned" as Frame,
  armAnchor: "absent" as Anchor,
  armSocial: "baseline" as Social,
  role: "buyer" as Role,
  credits: 400,
  inCart: false,
  purchased: false,
  configured: false,
  justification: "",
  liked: false,
  comment: "",
  recommended: false,
  noteOpened: false,
  nextStep: "" as NextStep,
  limitClaim: "",
  diversityPick: "",
  diversityNote: "",
  showShowcase: true,
  events: [] as LiveEvent[],
};

function persist(state: DemoState) {
  const {
    setLang: _a,
    setLens: _b,
    acceptConsent: _c,
    setMarket: _d,
    setPriceLever: _e,
    setArmFrame: _f,
    setArmAnchor: _g,
    setArmSocial: _h,
    setRole: _i,
    setJustification: _j,
    setComment: _k,
    setNextStep: _l,
    setLimitClaim: _m,
    setDiversityPick: _n,
    setDiversityNote: _o,
    setShowShowcase: _p,
    log: _q,
    viewPrice: _r,
    addCart: _s,
    removeCart: _t,
    purchase: _u,
    configure: _v,
    openNote: _w,
    like: _x,
    sendComment: _y,
    recommend: _z,
    resetSession: _rs,
    ...data
  } = state;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* private mode */
  }
}

export const useDemo = create<DemoState>((set, get) => ({
  ...initial,
  setLang: (lang) => set({ lang }),
  setLens: (lens) => set({ lens }),
  acceptConsent: () => set({ consent: true }),
  setMarket: (market) => set({ market }),
  setPriceLever: (priceLever) => set({ priceLever }),
  setArmFrame: (armFrame) => set({ armFrame }),
  setArmAnchor: (armAnchor) => set({ armAnchor }),
  setArmSocial: (armSocial) => set({ armSocial }),
  setRole: (role) => set({ role }),
  setJustification: (justification) => set({ justification }),
  setComment: (comment) => set({ comment }),
  setNextStep: (nextStep) => set({ nextStep }),
  setLimitClaim: (limitClaim) => set({ limitClaim }),
  setDiversityPick: (diversityPick) => set({ diversityPick }),
  setDiversityNote: (diversityNote) => set({ diversityNote }),
  setShowShowcase: (showShowcase) => set({ showShowcase }),
  log: (partial) => {
    if (!get().consent) return;
    const event: LiveEvent = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      at: Date.now(),
      market: partial.market ?? get().market,
      kind: partial.kind,
      lab: partial.lab,
      condition: partial.condition,
    };
    set({ events: [event, ...get().events].slice(0, 40) });
  },
  viewPrice: () => {
    const { armFrame, armAnchor, priceLever, events } = get();
    const condition = priceLever === "frame" ? armFrame : armAnchor;
    const seen = events.some((e) => e.kind === "price_view" && e.condition === condition);
    if (seen) return;
    get().log({ kind: "price_view", lab: "shop", condition });
    get().log({ kind: "impression", lab: "shop", condition });
  },
  addCart: () => {
    if (get().purchased || get().inCart) return;
    const condition = shopCondition(get());
    set({ inCart: true });
    get().log({ kind: "cart", lab: "shop", condition });
  },
  removeCart: () => {
    if (!get().inCart || get().purchased) return;
    set({ inCart: false });
    get().log({ kind: "abandon", lab: "shop", condition: shopCondition(get()) });
  },
  purchase: (cost) => {
    const s = get();
    if (s.purchased || s.credits < cost) return false;
    set({ purchased: true, inCart: false, credits: s.credits - cost });
    get().log({ kind: "purchase", lab: "shop", condition: shopCondition(get()) });
    return true;
  },
  configure: () => {
    set({ configured: true });
    get().log({ kind: "configure", lab: "shop", condition: shopCondition(get()) });
  },
  openNote: () => {
    if (get().noteOpened) return;
    set({ noteOpened: true });
    get().log({ kind: "note_open", lab: "seed", condition: get().armSocial });
  },
  like: () => {
    if (get().liked) return;
    set({ liked: true });
    get().log({ kind: "like", lab: "seed", condition: get().armSocial });
  },
  sendComment: () => {
    if (!get().comment.trim()) return;
    if (get().events.some((e) => e.kind === "comment")) return;
    get().log({ kind: "comment", lab: "seed", condition: get().armSocial });
  },
  recommend: () => {
    if (get().recommended) return;
    set({ recommended: true });
    get().log({ kind: "recommend", lab: "seed", condition: get().armSocial });
  },
  resetSession: () =>
    set({
      ...initial,
      lang: get().lang,
      lens: get().lens,
      consent: get().consent,
      market: get().market,
      priceLever: get().priceLever,
      armFrame: get().armFrame,
      armAnchor: get().armAnchor,
      armSocial: get().armSocial,
    }),
}));

export function shopCondition(s: Pick<DemoState, "priceLever" | "armFrame" | "armAnchor">) {
  return s.priceLever === "frame" ? s.armFrame : s.armAnchor;
}

useDemo.subscribe((state) => {
  if (typeof window === "undefined") return;
  persist(state);
});

export function hydrateDemo() {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw) as Partial<DemoState>;
    useDemo.setState({
      ...initial,
      ...data,
      events: Array.isArray(data.events) ? data.events.slice(0, 40) : [],
    });
  } catch {
    /* ignore broken storage */
  }
}
