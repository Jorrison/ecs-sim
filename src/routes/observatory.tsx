import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/button";
import { Shell } from "@/components/shell";
import { useDemo, type NextStep } from "@/lib/demo-store";
import { SEED, SHOP } from "@/lib/showcase";
import { tx, type Lang } from "@/lib/tx";

export const Route = createFileRoute("/observatory")({ component: ObservatoryPage });

const SHOP_LABEL: Record<string, [string, string]> = {
  allin: ["All-in", "總價"],
  partitioned: ["Partitioned", "拆分價"],
  absent: ["Anchor absent", "無錨點"],
  present: ["Anchor present", "有錨點"],
};

const SEED_LABEL: Record<string, [string, string]> = {
  baseline: ["Baseline", "基線"],
  proof: ["High count", "高數量"],
  kol: ["KOL role", "KOL 角色"],
};

function ObservatoryPage() {
  const lang = useDemo((s) => s.lang);
  const market = useDemo((s) => s.market);
  const lever = useDemo((s) => s.priceLever);
  const frame = useDemo((s) => s.armFrame);
  const anchor = useDemo((s) => s.armAnchor);
  const arm = lever === "frame" ? frame : anchor;
  const show = useDemo((s) => s.showShowcase);
  const setShow = useDemo((s) => s.setShowShowcase);
  const events = useDemo((s) => s.events);
  const nextStep = useDemo((s) => s.nextStep);
  const setNextStep = useDemo((s) => s.setNextStep);
  const limitClaim = useDemo((s) => s.limitClaim);
  const setLimitClaim = useDemo((s) => s.setLimitClaim);
  const diversityPick = useDemo((s) => s.diversityPick);
  const setDiversityPick = useDemo((s) => s.setDiversityPick);
  const diversityNote = useDemo((s) => s.diversityNote);
  const setDiversityNote = useDemo((s) => s.setDiversityNote);
  const reset = useDemo((s) => s.resetSession);
  const social = useDemo((s) => s.armSocial);
  const [mounted, setMounted] = useState(false);
  const [draft, setDraft] = useState("");

  useEffect(() => setMounted(true), []);

  const shopRows = SHOP[market][lever];
  const seedRows = SEED[market];
  const chart = shopRows.map((row) => ({
    name: tx(lang, SHOP_LABEL[row.id][0], SHOP_LABEL[row.id][1]),
    rate: Math.round((1000 * row.purchase) / row.exposed) / 10,
    exposed: row.exposed,
    purchase: row.purchase,
  }));

  const yourPurchases = events.filter((e) => e.kind === "purchase").length;
  const yourClicks = events.filter((e) => e.kind === "click_listing").length;

  function writeDraft() {
    const lines = shopRows
      .map((row) => {
        const name = tx(lang, SHOP_LABEL[row.id][0], SHOP_LABEL[row.id][1]);
        return tx(
          lang,
          `${name}: ${row.purchase} purchases out of ${row.exposed} exposed.`,
          `${name}：曝光 ${row.exposed} 人，購買 ${row.purchase} 人。`,
        );
      })
      .join(" ");
    const yours = tx(
      lang,
      `This browser logged ${yourPurchases} purchase and ${yourClicks} click from note to listing. A single session is not a rate.`,
      `這個瀏覽器記錄了 ${yourPurchases} 次購買，以及 ${yourClicks} 次從筆記到商品的點擊。單次操作不是比率。`,
    );
    const close = tx(
      lang,
      "These showcase counts are scripted. They are a campus contrast for teaching the debrief, not a finding about the open market, and not a culture score.",
      "這些演示數字是編排的。它們是用來教復盤的校園對照，不是關於公開市場的發現，也不是文化分數。",
    );
    setDraft(`${lines} ${yours} ${close}`);
  }

  return (
    <Shell>
      <p className="text-xs font-semibold tracking-widest text-burgundy">
        {tx(lang, "DATA OBSERVATORY", "數據觀測台")}
      </p>
      <h1 className="mt-2 font-serif text-4xl">{tx(lang, "Evidence, not a third laboratory", "證據，不是第三個實驗室")}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        {tx(
          lang,
          "Students are not asked to learn the dashboard. They are asked to learn from the record. If a condition has no events, this view shows no events.",
          "不要求學生學習儀表板。要求他們從紀錄學習。若某條件沒有事件，這個畫面就不顯示事件。",
        )}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          aria-pressed={show}
          onClick={() => setShow(!show)}
          className={`min-h-11 border px-4 text-sm font-semibold ${show ? "border-burgundy bg-burgundy text-paper" : "border-line bg-card"}`}
        >
          {show
            ? tx(lang, "Showcase cohort visible", "演示群體可見")
            : tx(lang, "Showcase cohort hidden", "演示群體已隱藏")}
        </button>
        <p className="text-sm text-muted">
          {tx(lang, "Assigned shop arm", "指定的商店條件")} · {tx(lang, SHOP_LABEL[arm]?.[0] ?? arm, SHOP_LABEL[arm]?.[1] ?? arm)}
          {" · "}
          {tx(lang, SEED_LABEL[social][0], SEED_LABEL[social][1])}
        </p>
      </div>

      <section className="mt-6 border border-line bg-card p-4 md:p-5">
        <h2 className="font-serif text-2xl">
          {tx(lang, "Purchases per 100 students who actually arrived", "每 100 名實際到達的學生中的購買")}
        </h2>
        <p className="mt-1 text-sm text-muted">
          {market === "HK" ? tx(lang, "Hong Kong staging", "香港設定") : tx(lang, "Mainland staging", "內地設定")}
          {" · "}
          {lever === "frame" ? tx(lang, "Price frame", "價格框架") : tx(lang, "Anchor", "錨點")}
          {" · "}
          {tx(lang, "Denominator is exposure, not the class list.", "分母是曝光人數，不是點名冊。")}
        </p>
        {show ? (
          <>
            <div className="mt-4 h-64">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chart} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <XAxis dataKey="name" tick={{ fill: "var(--color-ink)", fontSize: 12 }} />
                    <YAxis domain={[0, 100]} tick={{ fill: "var(--color-muted)", fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        background: "var(--color-card)",
                        border: "1px solid var(--color-line)",
                        color: "var(--color-ink)",
                      }}
                      formatter={(value, _name, item) => {
                        const row = item.payload as { purchase: number; exposed: number };
                        return [`${row.purchase} / ${row.exposed}`, tx(lang, "Purchases / exposed", "購買 / 曝光")];
                      }}
                    />
                    <Bar dataKey="rate" fill="var(--color-burgundy)" maxBarSize={48} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[28rem] text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-muted">
                    <th className="py-2 font-semibold">{tx(lang, "Condition", "條件")}</th>
                    <th className="py-2 font-semibold">{tx(lang, "Exposed", "曝光")}</th>
                    <th className="py-2 font-semibold">{tx(lang, "Viewed price", "看過價格")}</th>
                    <th className="py-2 font-semibold">{tx(lang, "Cart", "購物車")}</th>
                    <th className="py-2 font-semibold">{tx(lang, "Purchase", "購買")}</th>
                  </tr>
                </thead>
                <tbody>
                  {shopRows.map((row) => (
                    <tr key={row.id} className="border-b border-line">
                      <td className="py-2">{tx(lang, SHOP_LABEL[row.id][0], SHOP_LABEL[row.id][1])}</td>
                      <td className="py-2 font-semibold">{row.exposed}</td>
                      <td className="py-2">{row.viewed}</td>
                      <td className="py-2">{row.cart}</td>
                      <td className="py-2">
                        {row.purchase}
                        <span className="text-muted"> / {row.exposed}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p className="mt-4 border border-line bg-paper p-4 text-sm leading-relaxed">
            {tx(
              lang,
              "The showcase cohort is hidden. Your session is one person. A rate is not drawn, because a dashboard must not invent the number it displays.",
              "演示群體已隱藏。你的操作只有一個人。這裡不畫比率，因為儀表板不得編造它要顯示的數字。",
            )}
          </p>
        )}
      </section>

      <section className="mt-6 border border-line bg-card p-4 md:p-5">
        <h2 className="font-serif text-2xl">{tx(lang, "Seeding, same rule", "種草，同一條規則")}</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[28rem] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-muted">
                <th className="py-2 font-semibold">{tx(lang, "Signal", "信號")}</th>
                <th className="py-2 font-semibold">{tx(lang, "Exposed", "曝光")}</th>
                <th className="py-2 font-semibold">{tx(lang, "Note opened", "展開筆記")}</th>
                <th className="py-2 font-semibold">{tx(lang, "Click to listing", "點進商品")}</th>
              </tr>
            </thead>
            <tbody>
              {(show ? seedRows : []).map((row) => (
                <tr key={row.id} className="border-b border-line">
                  <td className="py-2">{tx(lang, SEED_LABEL[row.id][0], SEED_LABEL[row.id][1])}</td>
                  <td className="py-2 font-semibold">{row.exposed}</td>
                  <td className="py-2">
                    {row.opened}
                    <span className="text-muted"> / {row.exposed}</span>
                  </td>
                  <td className="py-2">
                    {row.click}
                    <span className="text-muted"> / {row.exposed}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!show && (
            <p className="py-3 text-sm text-muted">
              {tx(lang, "No showcase rows. Nothing is simulated in their place.", "沒有演示列。空位不會用模擬填上。")}
            </p>
          )}
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="border border-line bg-card p-4 md:p-5">
          <h2 className="font-serif text-2xl">{tx(lang, "This browser", "這個瀏覽器")}</h2>
          <p className="mt-2 text-sm text-muted">
            {tx(
              lang,
              `${events.length} acts. Purchases: ${yourPurchases}. Clicks from note to listing: ${yourClicks}. Not mixed into the table above.`,
              `${events.length} 次行為。購買 ${yourPurchases}。從筆記點進商品 ${yourClicks}。沒有混入上方表格。`,
            )}
          </p>
          <ul className="mt-3 divide-y divide-line text-sm">
            {events.slice(0, 5).map((e) => (
              <li key={e.id} className="flex justify-between py-2">
                <span>{e.kind}</span>
                <span className="text-muted">{e.condition}</span>
              </li>
            ))}
            {events.length === 0 && (
              <li className="py-2 text-muted">
                {tx(lang, "No personal path yet.", "還沒有個人路徑。")}
              </li>
            )}
          </ul>
          <Button variant="ghost" className="mt-3" onClick={reset}>
            {tx(lang, "Clear this browser’s acts", "清除這個瀏覽器的行為")}
          </Button>
        </div>

        <div className="border border-line bg-card p-4 md:p-5">
          <h2 className="font-serif text-2xl">{tx(lang, "Draft from the log", "按紀錄起草")}</h2>
          <p className="mt-2 text-sm text-muted">
            {tx(
              lang,
              "The draft may only quote counts already on this page. It cannot post a purchase that nobody made.",
              "草稿只能引用本頁已有的數字。它不能補上一筆沒有人做過的購買。",
            )}
          </p>
          <Button className="mt-3" variant="line" onClick={writeDraft}>
            {tx(lang, "Draft the paragraph", "起草段落")}
          </Button>
          {draft && <p className="mt-3 text-sm leading-relaxed">{draft}</p>}
        </div>
      </section>

      <Debrief lang={lang} nextStep={nextStep} setNextStep={setNextStep} limitClaim={limitClaim} setLimitClaim={setLimitClaim} diversityPick={diversityPick} setDiversityPick={setDiversityPick} diversityNote={diversityNote} setDiversityNote={setDiversityNote} />
    </Shell>
  );
}

const DIVERSITY = [
  ["payment", "Payment framing", "支付框架"],
  ["review", "Review trust", "評價信任"],
  ["social", "Social commerce", "社交商務"],
  ["privacy", "Privacy line", "私隱界線"],
  ["ai", "Response to an AI cue", "對人工智能提示的反應"],
] as const;

function Debrief({
  lang,
  nextStep,
  setNextStep,
  limitClaim,
  setLimitClaim,
  diversityPick,
  setDiversityPick,
  diversityNote,
  setDiversityNote,
}: {
  lang: Lang;
  nextStep: NextStep;
  setNextStep: (v: NextStep) => void;
  limitClaim: string;
  setLimitClaim: (v: string) => void;
  diversityPick: string;
  setDiversityPick: (v: string) => void;
  diversityNote: string;
  setDiversityNote: (v: string) => void;
}) {
  const steps: { id: NextStep; en: string; zh: string }[] = [
    { id: "keep", en: "Keep the frame", zh: "保留框架" },
    { id: "rewrite", en: "Rewrite the note", zh: "改寫筆記" },
    { id: "stop", en: "Stop — exposure was too thin", zh: "停止 — 曝光太薄" },
  ];

  return (
    <section className="mt-6 border border-line bg-card p-4 md:p-5">
      <p className="text-xs font-semibold tracking-widest text-burgundy">S.E.E.D.</p>
      <h2 className="mt-1 font-serif text-2xl">{tx(lang, "Debrief", "復盤")}</h2>
      <p className="mt-2 text-sm text-muted">
        {tx(
          lang,
          "A precise next step, and a sentence on what must not be claimed. Diversity is one observed difference against the condition that was actually run.",
          "一個精確的下一步，以及一句不能宣稱的話。差異是對照實際跑過的條件，寫下一個觀察到的不同。",
        )}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {steps.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={nextStep === s.id}
            onClick={() => setNextStep(s.id)}
            className={`min-h-11 border px-3 text-sm ${nextStep === s.id ? "border-burgundy bg-burgundy text-paper" : "border-line bg-card"}`}
          >
            {tx(lang, s.en, s.zh)}
          </button>
        ))}
      </div>
      <label className="mt-4 block text-sm font-semibold" htmlFor="limit">
        {tx(lang, "What this contrast must not be used to claim", "這個對照不能用來宣稱什麼")}
      </label>
      <textarea
        id="limit"
        value={limitClaim}
        onChange={(e) => setLimitClaim(e.target.value)}
        rows={3}
        className="mt-2 w-full border border-line bg-paper p-3 text-sm"
      />
      <p className="mt-4 text-sm font-semibold">{tx(lang, "Greater China matrix — one row only", "大中華矩陣 — 只選一行")}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {DIVERSITY.map(([id, en, zh]) => (
          <button
            key={id}
            type="button"
            aria-pressed={diversityPick === id}
            onClick={() => setDiversityPick(id)}
            className={`min-h-11 border px-3 text-sm ${diversityPick === id ? "border-ink bg-ink text-paper" : "border-line bg-card"}`}
          >
            {tx(lang, en, zh)}
          </button>
        ))}
      </div>
      <label className="mt-4 block text-sm font-semibold" htmlFor="div">
        {tx(lang, "One recommendation that stays inside the staged evidence", "一條留在已設定證據之內的建議")}
      </label>
      <textarea
        id="div"
        value={diversityNote}
        onChange={(e) => setDiversityNote(e.target.value)}
        rows={3}
        className="mt-2 w-full border border-line bg-paper p-3 text-sm"
      />
    </section>
  );
}
