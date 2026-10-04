import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { Button } from "@/components/button";
import { useDemo } from "@/lib/demo-store";
import { COURSES } from "@/lib/showcase";
import { tx } from "@/lib/tx";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const lang = useDemo((s) => s.lang);

  const outcomes = [
    tx(
      lang,
      "Apply a consumer-behaviour framework by configuring at least two price architectures and reading peer buyer acts against the log.",
      "配置至少兩種價格架構，並對照紀錄閱讀同學買家的行為，從而應用消費者行為框架。",
    ),
    tx(
      lang,
      "Infer social influence when social proof or source credibility changes and the note does not.",
      "在筆記不變、社會證明或來源可信度改變時，對社會影響作出推論。",
    ),
    tx(
      lang,
      "Read a de-identified class set: name the condition, the denominator, and the logged acts, and do not treat the campus public as the open market.",
      "閱讀去識別的課堂數據：指出條件、分母與被記錄的行為，且不把校園公眾當成公開市場。",
    ),
    tx(
      lang,
      "Compare one’s own path with an anonymised class pattern and name where anchoring, social proof, or source cues were met.",
      "把自己的路徑與匿名的課堂形態對照，並指出在何處遇到錨定、社會證明或來源線索。",
    ),
    tx(
      lang,
      "Complete assigned exposure, keep community rules, and write a debrief other students can audit against the log.",
      "完成指定曝光，遵守社群規則，並寫下一份他人可以對照紀錄審計的復盤。",
    ),
  ];

  const phases = [
    {
      m: "01–06",
      t: tx(lang, "Shopping laboratory", "購物實驗室"),
      d: tx(
        lang,
        "Accounts, consent, campus points, price-architecture conditions, and an observatory that lists events and cannot invent them.",
        "帳戶、同意、校園點數、價格架構條件，以及只列出事件、不能編造事件的觀測台。",
      ),
    },
    {
      m: "07–12",
      t: tx(lang, "Seeding laboratory", "種草實驗室"),
      d: tx(
        lang,
        "Notes linked to listings, class accounts in a KOL role, exposure control, English, Cantonese and Putonghua, and the S.E.E.D. debrief.",
        "連結到商品的筆記、扮演 KOL 的課堂帳號、曝光控制、英語、粵語與普通話，以及 S.E.E.D. 復盤。",
      ),
    },
    {
      m: "13–18",
      t: tx(lang, "Course pilot", "課程試點"),
      d: tx(
        lang,
        "Use in the named courses, baseline and end tasks, a handbook, a staff session, and a demonstrator for a teaching showcase. No Canvas work.",
        "在列出的課程中使用，基線與結束任務、手冊、教職員簡介，以及教學展示用的演示。不安排 Canvas 工作。",
      ),
    },
  ];

  return (
    <Shell>
      <p className="text-xs font-semibold tracking-widest text-burgundy">
        {tx(lang, "TEACHING DEVELOPMENT GRANT", "教學發展資助")}
      </p>
      <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight text-ink md:text-5xl">
        {tx(
          lang,
          "A campus shop and a seeding community, joined.",
          "一個校園商店，與一個種草社群，連在一起。",
        )}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink">
        {tx(
          lang,
          "ECS-Sim is an interactive digital ecosystem for consumer behaviour. Students inhabit online transaction and online communication. Classmates are the public. The observatory only keeps the record.",
          "ECS-Sim 是一個消費者行為的互動數碼生態。學生進入網上交易與網上溝通。同學就是公眾。觀測台只保存紀錄。",
        )}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/shop">
          <Button>{tx(lang, "Enter the shop", "進入商店")}</Button>
        </Link>
        <Link to="/observatory">
          <Button variant="line">{tx(lang, "Open the observatory", "打開觀測台")}</Button>
        </Link>
      </div>

      <figure className="mt-10">
        <div className="grid gap-px bg-line md:grid-cols-3">
          <LabCard
            kicker={tx(lang, "Store", "店鋪")}
            title={tx(lang, "Shopping Laboratory", "購物實驗室")}
            body={tx(
              lang,
              "Seller and buyer. Campus points. One price architecture at a time: partitioned or all-in, anchor present or absent.",
              "賣家與買家。校園點數。一次只動一種價格架構：拆分價或總價，錨點在或不在。",
            )}
          />
          <LabCard
            kicker={tx(lang, "Expression", "表達")}
            title={tx(lang, "Seeding Community", "種草社群")}
            body={tx(
              lang,
              "A note linked to a listing. The wording stays. A count, a comment preview, or a class KOL label moves.",
              "一篇連到商品的筆記。文字不動。動的是數量、評論預覽，或課堂 KOL 標籤。",
            )}
          />
          <LabCard
            kicker={tx(lang, "Evidence", "證據")}
            title={tx(lang, "Data Observatory", "數據觀測台")}
            body={tx(
              lang,
              "Impressions, carts, purchases, likes, and clicks. Pseudonyms. A denominator. No function that returns a simulated conversion.",
              "曝光、購物車、購買、讚好與點擊。代號。分母。沒有任何功能會返回模擬轉化。",
            )}
          />
        </div>
        <figcaption className="mt-2 text-sm text-muted">
          {tx(
            lang,
            "Figure 1. Two laboratories, and an observatory that only records acts. Diversity — Hong Kong and Mainland staging — is read inside that evidence, not scored as culture.",
            "圖 1。兩個實驗室，以及一個只記錄行為的觀測台。差異——香港與內地設定——在證據之內閱讀，而不評分為文化。",
          )}
        </figcaption>
      </figure>

      <section className="mt-12 border-t border-line pt-8">
        <h2 className="font-serif text-3xl">{tx(lang, "How to use this demonstrator", "如何使用這個演示")}</h2>
        <ol className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            tx(lang, "Switch to Teacher and assign one lever, one arm, and a market setting.", "切換到教師，指定一個槓桿、一個條件和一個市場設定。"),
            tx(lang, "Return to Student. Buy in the shop, or respond to the note. Campus points spend once.", "回到學生。在商店購買，或回應筆記。校園點數只能花一次。"),
            tx(lang, "Open the observatory. Read the denominator. Draft a debrief that says what the contrast does not support.", "打開觀測台。讀分母。起草一份寫明對照不能支持什麼的復盤。"),
          ].map((step, i) => (
            <li key={step} className="border border-line bg-card p-4">
              <p className="font-serif text-2xl text-burgundy">0{i + 1}</p>
              <p className="mt-2 text-sm leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-3xl">S.E.E.D.</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          {tx(
            lang,
            "Not a new theory of the consumer. A teaching sequence that holds the two laboratories and the record in one word.",
            "不是一套新的消費者理論。是一個把兩個實驗室和紀錄放在同一個詞裡的教學序列。",
          )}
        </p>
        <dl className="mt-4 divide-y divide-line border-y border-line">
          {[
            ["S", "Store", "店鋪", tx(lang, "Configure price architecture. Meet buyers who spend campus points.", "配置價格架構。遇到花費校園點數的買家。")],
            ["E", "Expression", "表達", tx(lang, "Publish a note. Meet a peer response.", "發布筆記。遇到同學的回應。")],
            ["E", "Evidence", "證據", tx(lang, "The only comparison the class may discuss. Subordinate to the two laboratories.", "課堂唯一可以討論的對照。從屬於兩個實驗室。")],
            ["D", "Diversity", "差異", tx(lang, "The same lever, staged in Hong Kong and on the Mainland. One recommendation inside that evidence.", "同一個槓桿，分別放在香港與內地設定中。在該證據之內寫一條建議。")],
          ].map(([letter, en, zh, body]) => (
            <div key={en} className="grid gap-2 py-4 md:grid-cols-[8rem_1fr] md:gap-6">
              <dt className="font-serif text-xl">
                <span className="text-burgundy">{letter}</span>{" "}
                <span>{tx(lang, en, zh)}</span>
              </dt>
              <dd className="text-sm leading-relaxed">{body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-3xl">{tx(lang, "Learning outcomes", "學習成果")}</h2>
        <ol className="mt-4 space-y-3">
          {outcomes.map((item, i) => (
            <li key={item} className="grid grid-cols-[2.5rem_1fr] gap-3 text-sm leading-relaxed">
              <span className="font-serif text-xl text-burgundy">{i + 1}</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-3xl">{tx(lang, "Courses named in the proposal", "提案列出的課程")}</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          {tx(
            lang,
            "Host sections, and class sizes other than the MBA and EMBA figures, are confirmed with the Department before the first run. The pilot is a closed campus cohort.",
            "承辦班別，以及 MBA 與 EMBA 以外的班額，在首次運行前與學系確認。試點是封閉的校園群體。",
          )}
        </p>
        <div className="mt-4 overflow-x-auto border border-line">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead className="bg-burgundy text-paper">
              <tr>
                <th className="px-3 py-3 font-semibold">{tx(lang, "Code", "編號")}</th>
                <th className="px-3 py-3 font-semibold">{tx(lang, "Course", "課程")}</th>
                <th className="px-3 py-3 font-semibold">{tx(lang, "Level", "層次")}</th>
                <th className="px-3 py-3 font-semibold">{tx(lang, "Size", "人數")}</th>
              </tr>
            </thead>
            <tbody>
              {COURSES.map((c) => (
                <tr key={c.code} className="border-t border-line bg-card">
                  <td className="px-3 py-3 font-semibold">{c.code}</td>
                  <td className="px-3 py-3">{c.title}</td>
                  <td className="px-3 py-3">{c.level}</td>
                  <td className="px-3 py-3 text-muted">{c.note || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-3xl">{tx(lang, "Eighteen months", "十八個月")}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {phases.map((p) => (
            <article key={p.m} className="border border-line bg-card p-4">
              <p className="text-xs font-semibold tracking-widest text-burgundy">{p.m}</p>
              <h3 className="mt-2 font-serif text-2xl">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 border border-line bg-card p-5">
        <h2 className="font-serif text-2xl">{tx(lang, "What this page will not do", "這個頁面不會做的事")}</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
          <li>
            {tx(
              lang,
              "It will not invent a purchase, a dwell, or a like when nobody acted.",
              "沒有人行動時，不會編造購買、停留或讚好。",
            )}
          </li>
          <li>
            {tx(
              lang,
              "It will not mix the scripted showcase cohort into your own session without a label.",
              "不會把編排的演示群體悄悄混進你自己的操作。",
            )}
          </li>
          <li>
            {tx(
              lang,
              "It will not claim a partnership, a salary effect, or that a class is the national market.",
              "不會宣稱已有合作、起薪效應，或把一個班當成全國市場。",
            )}
          </li>
          <li>
            {tx(
              lang,
              "It does not copy a commercial platform’s name, logo, or layout.",
              "不複製任何商業平台的名稱、標誌或版面。",
            )}
          </li>
        </ul>
      </section>
    </Shell>
  );
}

function LabCard({ kicker, title, body }: { kicker: string; title: string; body: string }) {
  return (
    <article className="bg-card p-5">
      <p className="text-xs font-semibold tracking-widest text-burgundy">{kicker}</p>
      <h2 className="mt-2 font-serif text-2xl">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
    </article>
  );
}
