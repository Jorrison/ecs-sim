import { createFileRoute } from "@tanstack/react-router";
import { LampDesk } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/button";
import { ProtocolCard } from "@/components/protocol";
import { Shell } from "@/components/shell";
import { shopCondition, useDemo, type EventKind } from "@/lib/demo-store";
import { ANCHOR_REF, PART_FEE, PART_ITEM, PRICE } from "@/lib/showcase";
import { tx } from "@/lib/tx";

export const Route = createFileRoute("/shop")({ component: ShopPage });

function ShopPage() {
  const lang = useDemo((s) => s.lang);
  const consent = useDemo((s) => s.consent);
  const accept = useDemo((s) => s.acceptConsent);
  const role = useDemo((s) => s.role);
  const setRole = useDemo((s) => s.setRole);
  const market = useDemo((s) => s.market);
  const lever = useDemo((s) => s.priceLever);
  const frame = useDemo((s) => s.armFrame);
  const anchor = useDemo((s) => s.armAnchor);
  const credits = useDemo((s) => s.credits);
  const inCart = useDemo((s) => s.inCart);
  const purchased = useDemo((s) => s.purchased);
  const configured = useDemo((s) => s.configured);
  const justification = useDemo((s) => s.justification);
  const setJustification = useDemo((s) => s.setJustification);
  const events = useDemo((s) => s.events);
  const viewPrice = useDemo((s) => s.viewPrice);
  const addCart = useDemo((s) => s.addCart);
  const removeCart = useDemo((s) => s.removeCart);
  const purchase = useDemo((s) => s.purchase);
  const configure = useDemo((s) => s.configure);

  const condition = shopCondition({ priceLever: lever, armFrame: frame, armAnchor: anchor });

  useEffect(() => {
    if (consent && role === "buyer") viewPrice();
  }, [consent, role, condition, viewPrice]);

  const feeLabel =
    market === "HK"
      ? tx(lang, "handling, shown with the price", "手續費，與價格一併顯示")
      : tx(lang, "shipping line, shown at the total", "運費行，在總額處顯示");

  return (
    <Shell>
      <p className="text-xs font-semibold tracking-widest text-burgundy">
        {tx(lang, "SHOPPING LABORATORY", "購物實驗室")}
      </p>
      <h1 className="mt-2 font-serif text-4xl">{tx(lang, "Online transaction", "網上交易")}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        {tx(
          lang,
          "Studio Lamp L2. The credit is internal to the exercise. It is not cash and it is not a grade. Seller G-07 is a class pseudonym.",
          "Studio Lamp L2。點數只在練習內有效。不是現金，也不是成績。賣家 G-07 是課堂代號。",
        )}
      </p>

      {!consent && (
        <div className="mt-6 border border-burgundy bg-card p-4">
          <h2 className="font-serif text-2xl">{tx(lang, "Consent before a log", "記錄之前的同意")}</h2>
          <p className="mt-2 text-sm leading-relaxed">
            {tx(
              lang,
              "Acts you take are stored in this browser only, under no name. The showcase cohort on the observatory is scripted and labelled. Nothing here is a classmate.",
              "你採取的行為只存在這個瀏覽器，沒有姓名。觀測台上的演示群體是編排的，並且會標明。這裡沒有同學。",
            )}
          </p>
          <Button className="mt-4" onClick={accept}>
            {tx(lang, "I understand — start the session", "我明白 — 開始這次操作")}
          </Button>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={role === "buyer"}
          onClick={() => setRole("buyer")}
          className={`min-h-11 px-4 text-sm font-semibold ${role === "buyer" ? "bg-ink text-paper" : "border border-line bg-card"}`}
        >
          {tx(lang, "Buyer", "買家")}
        </button>
        <button
          type="button"
          aria-pressed={role === "seller"}
          onClick={() => setRole("seller")}
          className={`min-h-11 px-4 text-sm font-semibold ${role === "seller" ? "bg-ink text-paper" : "border border-line bg-card"}`}
        >
          {tx(lang, "Seller", "賣家")}
        </button>
        <p className="inline-flex min-h-11 items-center px-2 text-sm text-muted">
          {tx(lang, "Campus points", "校園點數")} · {credits}
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <section className="border border-line bg-card">
          <div className="flex items-center gap-4 border-b border-line p-5">
            <span className="flex size-16 items-center justify-center bg-paper text-burgundy">
              <LampDesk aria-hidden className="size-8" />
            </span>
            <div>
              <p className="text-xs font-semibold tracking-widest text-muted">G-07 · Studio</p>
              <h2 className="font-serif text-3xl">Studio Lamp L2</h2>
              <p className="text-sm text-muted">
                {market === "HK"
                  ? tx(lang, "Hong Kong staging", "香港設定")
                  : tx(lang, "Mainland staging", "內地設定")}
              </p>
            </div>
          </div>

          <div className="p-5">
            <PriceBlock />
            {lever === "frame" && frame === "partitioned" && (
              <p className="mt-2 text-sm text-muted">
                {PART_ITEM} + {PART_FEE} {feeLabel}. {tx(lang, "Total", "合計")} {PRICE}.
              </p>
            )}
            {lever === "anchor" && anchor === "present" && (
              <p className="mt-2 text-sm text-muted">
                {tx(
                  lang,
                  `Reference ${ANCHOR_REF} is shown beside the offer. The offer is still ${PRICE}.`,
                  `參考價 ${ANCHOR_REF} 顯示在報價旁。報價仍是 ${PRICE}。`,
                )}
              </p>
            )}

            {role === "buyer" ? (
              <div className="mt-6 flex flex-wrap gap-2">
                <Button variant="line" disabled={!consent || purchased} onClick={addCart}>
                  {inCart ? tx(lang, "In cart", "已在購物車") : tx(lang, "Add to cart", "放入購物車")}
                </Button>
                {inCart && !purchased && (
                  <Button variant="ghost" disabled={!consent} onClick={removeCart}>
                    {tx(lang, "Leave cart", "移出購物車")}
                  </Button>
                )}
                <Button disabled={!consent || purchased || credits < PRICE} onClick={() => purchase(PRICE)}>
                  {purchased
                    ? tx(lang, "Purchased", "已購買")
                    : tx(lang, `Spend ${PRICE}`, `花費 ${PRICE}`)}
                </Button>
              </div>
            ) : (
              <div className="mt-6">
                <label className="text-sm font-semibold" htmlFor="why">
                  {tx(lang, "Why this architecture, in one or two sentences", "用一兩句說明為何用這個架構")}
                </label>
                <textarea
                  id="why"
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                  rows={4}
                  className="mt-2 w-full border border-line bg-paper p-3 text-sm"
                  placeholder={tx(
                    lang,
                    "Name the single lever. Do not claim a market result.",
                    "指出那一個槓桿。不要宣稱市場結果。",
                  )}
                />
                <Button className="mt-3" disabled={!consent || configured} onClick={configure}>
                  {configured
                    ? tx(lang, "Listing configured", "商品已配置")
                    : tx(lang, "Configure this arm", "配置這個條件")}
                </Button>
              </div>
            )}

            {purchased && (
              <p className="mt-4 text-sm text-good">
                {tx(
                  lang,
                  "One purchase is logged for this browser. It is not a class rate.",
                  "這個瀏覽器記錄了一次購買。它不是課堂比率。",
                )}
              </p>
            )}
          </div>
        </section>

        <div className="space-y-6">
          <ProtocolCard focus="shop" />
          <EventList
            title={tx(lang, "Your acts", "你的行為")}
            empty={tx(lang, "No act yet. The observatory will not fill this in.", "尚未有行為。觀測台不會代填。")}
            rows={events.filter((e) => e.lab === "shop").slice(0, 6)}
            lang={lang}
          />
        </div>
      </div>
    </Shell>
  );
}

function PriceBlock() {
  const lang = useDemo((s) => s.lang);
  const lever = useDemo((s) => s.priceLever);
  const frame = useDemo((s) => s.armFrame);
  const anchor = useDemo((s) => s.armAnchor);

  if (lever === "frame" && frame === "partitioned") {
    return (
      <p className="font-serif text-4xl leading-none">
        {PART_ITEM}
        <span className="ml-2 font-sans text-lg text-muted">+ {PART_FEE}</span>
      </p>
    );
  }
  if (lever === "anchor" && anchor === "present") {
    return (
      <p className="font-serif text-4xl leading-none">
        <span className="mr-3 font-sans text-xl text-muted line-through">{ANCHOR_REF}</span>
        {PRICE}
      </p>
    );
  }
  return (
    <p className="font-serif text-4xl leading-none">
      {PRICE}
      <span className="ml-2 font-sans text-lg text-muted">{tx(lang, "all-in", "總價")}</span>
    </p>
  );
}

const KIND: Record<EventKind, [string, string]> = {
  impression: ["Impression", "曝光"],
  price_view: ["Price viewed", "已看價格"],
  cart: ["Cart", "購物車"],
  abandon: ["Cart left", "離開購物車"],
  purchase: ["Purchase", "購買"],
  configure: ["Configured", "已配置"],
  note_open: ["Note opened", "打開筆記"],
  like: ["Like", "讚好"],
  comment: ["Comment", "評論"],
  recommend: ["Recommend", "推薦"],
  click_listing: ["Click to listing", "點進商品"],
};

export function EventList({
  title,
  empty,
  rows,
  lang,
}: {
  title: string;
  empty: string;
  rows: { id: string; kind: EventKind; condition: string }[];
  lang: "en" | "zh";
}) {
  return (
    <section className="border border-line bg-card p-4">
      <h2 className="font-serif text-xl">{title}</h2>
      {rows.length === 0 ? (
        <p className="mt-2 text-sm text-muted">{empty}</p>
      ) : (
        <ul className="mt-3 divide-y divide-line">
          {rows.map((row) => (
            <li key={row.id} className="flex items-center justify-between gap-3 py-2 text-sm">
              <span>{tx(lang, KIND[row.kind][0], KIND[row.kind][1])}</span>
              <span className="text-muted">{row.condition}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
