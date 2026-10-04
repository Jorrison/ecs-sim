import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/button";
import { ProtocolCard } from "@/components/protocol";
import { Shell } from "@/components/shell";
import { EventList } from "@/routes/shop";
import { useDemo } from "@/lib/demo-store";
import { tx } from "@/lib/tx";

export const Route = createFileRoute("/community")({ component: CommunityPage });

function CommunityPage() {
  const lang = useDemo((s) => s.lang);
  const consent = useDemo((s) => s.consent);
  const accept = useDemo((s) => s.acceptConsent);
  const social = useDemo((s) => s.armSocial);
  const market = useDemo((s) => s.market);
  const liked = useDemo((s) => s.liked);
  const comment = useDemo((s) => s.comment);
  const setComment = useDemo((s) => s.setComment);
  const recommended = useDemo((s) => s.recommended);
  const events = useDemo((s) => s.events);
  const openNote = useDemo((s) => s.openNote);
  const like = useDemo((s) => s.like);
  const sendComment = useDemo((s) => s.sendComment);
  const recommend = useDemo((s) => s.recommend);
  const log = useDemo((s) => s.log);

  const source =
    social === "kol"
      ? tx(lang, "Class account · KOL role", "課堂帳號 · KOL 角色")
      : tx(lang, "Peer · S-14", "同學 · S-14");
  const count = social === "proof" ? 86 : social === "kol" ? 22 : 4;
  const preview =
    social === "proof"
      ? tx(lang, "Same — I opened the listing.", "我也點進了商品頁。")
      : null;

  return (
    <Shell>
      <p className="text-xs font-semibold tracking-widest text-burgundy">
        {tx(lang, "SEEDING COMMUNITY", "種草社群")}
      </p>
      <h1 className="mt-2 font-serif text-4xl">{tx(lang, "Online communication", "網上溝通")}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        {tx(
          lang,
          "The note below is the contrast. Its wording does not change. Two further notes sit in the feed so the place feels inhabited. They are outside the comparison and cannot be acted on.",
          "下面這篇筆記才是對照。文字不變。信息流裡另外兩篇是為了讓這個地方像有人在用。它們不在比較之內，也不能操作。",
        )}
      </p>

      {!consent && (
        <div className="mt-6 border border-burgundy bg-card p-4">
          <h2 className="font-serif text-2xl">{tx(lang, "Consent before a log", "記錄之前的同意")}</h2>
          <p className="mt-2 text-sm leading-relaxed">
            {tx(
              lang,
              "Likes, comments, and clicks from this browser are stored locally and labelled as yours. They are not added to the showcase cohort.",
              "這個瀏覽器的讚好、評論和點擊只存在本地，並標為你的行為。它們不會加進演示群體。",
            )}
          </p>
          <Button className="mt-4" onClick={accept}>
            {tx(lang, "I understand — start the session", "我明白 — 開始這次操作")}
          </Button>
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="space-y-4">
          <article className="border border-burgundy bg-card p-5">
            <p className="text-xs font-semibold tracking-widest text-burgundy">
              {tx(lang, "IN THE CONTRAST", "在對照之內")}
            </p>
            <div className="mt-3 flex items-center gap-3">
              <span className="flex size-11 items-center justify-center bg-paper font-semibold text-burgundy">
                {social === "kol" ? "K" : "S"}
              </span>
              <div>
                <p className="font-semibold">{source}</p>
                <p className="text-xs text-muted">
                  {market === "HK"
                    ? tx(lang, "Hong Kong feed", "香港信息流")
                    : tx(lang, "Mainland feed", "內地信息流")}
                  {" · "}
                  {count} {tx(lang, "likes on this signal", "個讚好在此信號上")}
                </p>
              </div>
            </div>
            <p className="mt-4 text-base leading-relaxed">
              {tx(
                lang,
                "Studio Lamp L2 is on the shop this week. I used it for late tutorials. The dimmer is the part I actually notice.",
                "本週商店上架 Studio Lamp L2。我在晚間導修用過。真正會注意到的是調光。",
              )}
            </p>
            <p className="mt-3 text-sm text-burgundy">
              {tx(lang, "Linked listing · Studio Lamp L2", "連結商品 · Studio Lamp L2")}
            </p>
            {preview && (
              <p className="mt-3 border-l-2 border-burgundy pl-3 text-sm text-muted">{preview}</p>
            )}
            <div className="mt-5 flex flex-wrap gap-2">
              <Button variant="line" disabled={!consent} onClick={openNote}>
                {tx(lang, "Open note", "展開筆記")}
              </Button>
              <Button variant="line" disabled={!consent || liked} onClick={like}>
                {liked ? tx(lang, "Liked", "已讚好") : tx(lang, "Like", "讚好")}
              </Button>
              <Button variant="line" disabled={!consent || recommended} onClick={recommend}>
                {recommended ? tx(lang, "Recommended", "已推薦") : tx(lang, "Recommend", "推薦")}
              </Button>
              <Link
                to="/shop"
                className={`inline-flex min-h-11 items-center justify-center bg-burgundy px-4 text-sm font-semibold text-paper ${consent ? "" : "pointer-events-none opacity-40"}`}
                onClick={(event) => {
                  if (!consent) {
                    event.preventDefault();
                    return;
                  }
                  log({ kind: "click_listing", lab: "seed", condition: social });
                }}
              >
                {tx(lang, "Open the listing", "打開商品")}
              </Link>
            </div>
            <form
              className="mt-4 flex flex-col gap-2 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                sendComment();
              }}
            >
              <label className="sr-only" htmlFor="comment">
                {tx(lang, "Comment", "評論")}
              </label>
              <input
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-11 flex-1 border border-line bg-paper px-3 text-sm"
                placeholder={tx(lang, "A comment is an act, not a grade.", "評論是一次行為，不是分數。")}
              />
              <Button type="submit" variant="line" disabled={!consent || !comment.trim()}>
                {tx(lang, "Comment", "評論")}
              </Button>
            </form>
          </article>

          <HeldOut
            who={tx(lang, "Peer · T-03", "同學 · T-03")}
            body={tx(
              lang,
              "Tutorial group 3: the tote listing is up. Not part of this week’s contrast.",
              "導修組 3：布袋已上架。不屬於本週對照。",
            )}
          />
          <HeldOut
            who={tx(lang, "Peer · M-11", "同學 · M-11")}
            body={tx(
              lang,
              "Campus points spend once. This reminder is outside the contrast.",
              "校園點數只能花一次。這則提醒在對照之外。",
            )}
          />
        </div>

        <div className="space-y-6">
          <ProtocolCard focus="seed" />
          <EventList
            title={tx(lang, "Your acts", "你的行為")}
            empty={tx(lang, "No act yet. A quiet feed is not filled with simulated likes.", "尚未有行為。安靜的信息流不會被模擬讚好填滿。")}
            rows={events.filter((e) => e.lab === "seed").slice(0, 6)}
            lang={lang}
          />
        </div>
      </div>
    </Shell>
  );
}

function HeldOut({ who, body }: { who: string; body: string }) {
  const lang = useDemo((s) => s.lang);
  return (
    <article className="border border-line bg-card p-4 opacity-80">
      <p className="text-xs font-semibold tracking-widest text-muted">
        {tx(lang, "OUTSIDE THE CONTRAST", "對照之外")}
      </p>
      <p className="mt-2 text-sm font-semibold">{who}</p>
      <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
    </article>
  );
}
