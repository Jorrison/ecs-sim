import type { ReactNode } from "react";
import type { Anchor, Frame, Market, PriceLever, Social } from "@/lib/demo-store";
import { useDemo } from "@/lib/demo-store";
import { tx, type Lang } from "@/lib/tx";

function Seg<T extends string>({
  value,
  options,
  onChange,
  disabled,
}: {
  value: T;
  options: { id: T; label: string }[];
  onChange: (id: T) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-wrap border border-line">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          disabled={disabled}
          aria-pressed={value === opt.id}
          onClick={() => onChange(opt.id)}
          className={`min-h-11 px-3 text-sm ${
            value === opt.id ? "bg-burgundy text-paper" : "bg-card text-ink"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function ProtocolCard({ focus }: { focus: "shop" | "seed" }) {
  const lang = useDemo((s) => s.lang);
  const lens = useDemo((s) => s.lens);
  const market = useDemo((s) => s.market);
  const priceLever = useDemo((s) => s.priceLever);
  const armFrame = useDemo((s) => s.armFrame);
  const armAnchor = useDemo((s) => s.armAnchor);
  const armSocial = useDemo((s) => s.armSocial);
  const setMarket = useDemo((s) => s.setMarket);
  const setPriceLever = useDemo((s) => s.setPriceLever);
  const setArmFrame = useDemo((s) => s.setArmFrame);
  const setArmAnchor = useDemo((s) => s.setArmAnchor);
  const setArmSocial = useDemo((s) => s.setArmSocial);

  const teacher = lens === "teacher";

  return (
    <section className="border border-line bg-card p-4 md:p-5">
      <p className="text-xs font-semibold tracking-widest text-burgundy">
        {tx(lang, "PROTOCOL", "實驗規程")}
      </p>
      <h2 className="mt-1 font-serif text-2xl">
        {teacher
          ? tx(lang, "Assign one lever", "只指定一個槓桿")
          : tx(lang, "Your assigned arm", "你被分到的條件")}
      </h2>
      <p className="mt-2 text-sm text-muted">
        {teacher
          ? tx(
              lang,
              "In class a student sees only one arm. This switch exists so a reviewer can assign it. Market staging is not a second lever.",
              "課堂上學生只看一個條件。此處切換只供檢視者指派。市場設定不是第二個槓桿。",
            )
          : tx(
              lang,
              "You cannot open the other arm. Ask the teacher lens if you are reviewing the design.",
              "你不能打開另一個條件。若在檢視設計，請切換到教師視角。",
            )}
      </p>

      <div className="mt-4 space-y-4">
        {focus === "shop" && (
          <>
            <Field label={tx(lang, "Price lever", "價格槓桿")}>
              <Seg<PriceLever>
                disabled={!teacher}
                value={priceLever}
                onChange={setPriceLever}
                options={[
                  { id: "frame", label: tx(lang, "Price frame", "價格框架") },
                  { id: "anchor", label: tx(lang, "Anchor", "錨點") },
                ]}
              />
            </Field>
            {priceLever === "frame" ? (
              <Field label={tx(lang, "Assigned frame", "指定框架")}>
                <Seg<Frame>
                  disabled={!teacher}
                  value={armFrame}
                  onChange={setArmFrame}
                  options={[
                    { id: "allin", label: tx(lang, "All-in", "總價") },
                    { id: "partitioned", label: tx(lang, "Partitioned", "拆分價") },
                  ]}
                />
              </Field>
            ) : (
              <Field label={tx(lang, "Assigned anchor", "指定錨點")}>
                <Seg<Anchor>
                  disabled={!teacher}
                  value={armAnchor}
                  onChange={setArmAnchor}
                  options={[
                    { id: "absent", label: tx(lang, "Anchor absent", "無錨點") },
                    { id: "present", label: tx(lang, "Anchor present", "有錨點") },
                  ]}
                />
              </Field>
            )}
          </>
        )}

        {focus === "seed" && (
          <Field label={tx(lang, "Social signal, note held constant", "社交信號（筆記文字固定）")}>
            <Seg<Social>
              disabled={!teacher}
              value={armSocial}
              onChange={setArmSocial}
              options={[
                { id: "baseline", label: tx(lang, "Baseline", "基線") },
                { id: "proof", label: tx(lang, "Count", "數量") },
                { id: "kol", label: tx(lang, "KOL role", "KOL 角色") },
              ]}
            />
          </Field>
        )}

        <Field label={tx(lang, "Market staging", "市場設定")}>
          <Seg<Market>
            disabled={!teacher}
            value={market}
            onChange={setMarket}
            options={[
              { id: "HK", label: tx(lang, "Hong Kong", "香港") },
              { id: "ML", label: tx(lang, "Mainland", "內地") },
            ]}
          />
        </Field>
      </div>

      <p className="mt-4 border-t border-line pt-3 text-sm leading-relaxed">
        {isolationCopy(lang, priceLever, focus)}
      </p>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold tracking-wide text-muted">{label}</p>
      {children}
    </div>
  );
}

function isolationCopy(lang: Lang, lever: PriceLever, focus: "shop" | "seed") {
  if (focus === "seed") {
    return tx(
      lang,
      "Isolation check: the note wording does not change. Only the signal — a count and comment preview, or a source label — differs. Do not treat the market staging as a culture score.",
      "隔離檢查：筆記文字不變。變的只有信號——讚好數與評論預覽，或來源標籤。不要把市場設定寫成文化分數。",
    );
  }
  if (lever === "frame") {
    return tx(
      lang,
      "Isolation check: one lever is free — partitioned versus all-in. The total is the same 268 campus points. The anchor is held absent. Market staging is a setting for the Greater China debrief, not a second lever.",
      "隔離檢查：只放開一個槓桿——拆分價對總價。總額同為 268 校園點數。錨點保持關閉。市場設定只供大中華復盤，不是第二個槓桿。",
    );
  }
  return tx(
    lang,
    "Isolation check: one lever is free — anchor present versus absent. The offer stays an all-in 268. The frame is not also manipulated. Market staging is not a culture effect.",
    "隔離檢查：只放開一個槓桿——有錨點對無錨點。報價保持總價 268。框架不再同時操弄。市場設定不是文化效應。",
  );
}
