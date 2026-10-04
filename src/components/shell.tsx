import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { hydrateDemo, useDemo } from "@/lib/demo-store";
import { tx } from "@/lib/tx";

const NAV = [
  { to: "/", en: "Overview", zh: "概覽" },
  { to: "/shop", en: "Shopping Lab", zh: "購物實驗室" },
  { to: "/community", en: "Seeding", zh: "種草社群" },
  { to: "/observatory", en: "Observatory", zh: "觀測台" },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const lang = useDemo((s) => s.lang);
  const setLang = useDemo((s) => s.setLang);
  const lens = useDemo((s) => s.lens);
  const setLens = useDemo((s) => s.setLens);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    hydrateDemo();
    setReady(true);
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-card focus:px-3 focus:py-2"
      >
        {tx(lang, "Skip to content", "跳至內容")}
      </a>
      <div className="h-1 bg-burgundy" />
      <header className="border-b border-line bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-6">
          <Link to="/" className="min-w-0">
            <p className="text-xs font-semibold tracking-widest text-burgundy">
              CITY UNIVERSITY OF HONG KONG
            </p>
            <p className="font-serif text-lg leading-tight text-ink">
              {tx(lang, "College of Business", "商學院")}
            </p>
            <p className="text-sm text-muted">
              {tx(lang, "Department of Marketing", "市場營銷學系")}
            </p>
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex border border-line">
              <button
                type="button"
                aria-pressed={lens === "student"}
                onClick={() => setLens("student")}
                className={`min-h-11 px-3 text-sm ${lens === "student" ? "bg-burgundy text-paper" : "bg-card text-ink"}`}
              >
                {tx(lang, "Student", "學生")}
              </button>
              <button
                type="button"
                aria-pressed={lens === "teacher"}
                onClick={() => setLens("teacher")}
                className={`min-h-11 px-3 text-sm ${lens === "teacher" ? "bg-burgundy text-paper" : "bg-card text-ink"}`}
              >
                {tx(lang, "Teacher", "教師")}
              </button>
            </div>
            <div className="flex border border-line">
              <button
                type="button"
                aria-pressed={lang === "en"}
                onClick={() => setLang("en")}
                className={`min-h-11 px-3 text-sm ${lang === "en" ? "bg-ink text-paper" : "bg-card text-ink"}`}
              >
                EN
              </button>
              <button
                type="button"
                aria-pressed={lang === "zh"}
                onClick={() => setLang("zh")}
                className={`min-h-11 px-3 text-sm ${lang === "zh" ? "bg-ink text-paper" : "bg-card text-ink"}`}
              >
                繁
              </button>
            </div>
          </div>
        </div>
        <nav className="border-t border-line" aria-label="Sections">
          <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 md:px-6">
            {NAV.map((item) => {
              const active = item.to === "/" ? path === "/" : path.startsWith(item.to);
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`inline-flex min-h-11 items-center whitespace-nowrap border-b-2 px-3 text-sm font-semibold ${
                      active ? "border-burgundy text-burgundy" : "border-transparent text-ink"
                    }`}
                  >
                    {tx(lang, item.en, item.zh)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      <div className="border-b border-line bg-card">
        <p className="mx-auto max-w-6xl px-4 py-2 text-xs text-muted md:px-6">
          {tx(
            lang,
            "Teaching Development Grant · ECS-Sim demonstrator · Not a class log · Not an open market",
            "教學發展資助 · ECS-Sim 演示 · 不是課堂紀錄 · 不是公開市場",
          )}
          {!ready ? "" : ""}
        </p>
      </div>

      <main id="content" className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
        {children}
      </main>

      <footer className="bg-burgundy-deep text-paper">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-3 md:px-6">
          <div>
            <p className="text-xs font-semibold tracking-widest">CITYU</p>
            <p className="mt-2 font-serif text-xl">
              {tx(lang, "Department of Marketing", "市場營銷學系")}
            </p>
            <p className="mt-2 text-sm text-paper/80">
              Tat Chee Avenue, Kowloon
              <br />
              Hong Kong SAR
            </p>
          </div>
          <div className="text-sm leading-relaxed text-paper/85">
            <p>
              {tx(
                lang,
                "ECS-Sim is a closed campus ecosystem: a shopping laboratory for online transaction, a seeding community for online communication, and an observatory that only keeps the record.",
                "ECS-Sim 是一個封閉的校園生態：購物實驗室模擬網上交易，種草社群模擬網上溝通，觀測台只保存紀錄。",
              )}
            </p>
          </div>
          <div className="text-sm leading-relaxed text-paper/85">
            <p>
              {tx(
                lang,
                "Showcase counts are scripted for review. They are not classmates, not a pilot, and not a market. The platform does not use Canvas and does not invent a purchase, a like, or a conversion.",
                "演示數字是為檢視而編排的。它們不是同學、不是試點、也不是市場。平台不使用 Canvas，也不會編造購買、讚好或轉化。",
              )}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
