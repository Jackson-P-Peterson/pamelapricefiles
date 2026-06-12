"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  AlertTriangle,
  ChevronDown,
  Download,
  FileWarning,
  Gavel,
  Menu,
  Scale,
  Share2,
  ShieldAlert,
  Skull,
  Users,
  X,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────────────────── */

const NAV_SECTIONS = [
  { id: "hero", label: "Overview" },
  { id: "glance", label: "At a Glance" },
  { id: "part-1", label: "Part 1: Hypocrisy" },
  { id: "part-2", label: "Part 2: Billionaire-Backed" },
  { id: "part-3", label: "Part 3: The Directive" },
  { id: "part-4", label: "Part 4: Victims Betrayed" },
  { id: "part-5", label: "Part 5: Nepotism" },
  { id: "part-6", label: "Part 6–7: Purge & Weaponization" },
  { id: "part-8", label: "Part 8: Discrimination" },
  { id: "part-9", label: "Part 9: The Recall" },
  { id: "part-10", label: "Part 10: 2026 Comeback" },
  { id: "closing", label: "Verdict" },
  { id: "sources", label: "Sources" },
];

const STAT_CARDS = [
  {
    value: "1,000+",
    label: "Misdemeanor & DV cases dismissed after statute of limitations expired on her watch",
  },
  {
    value: "$115K+",
    label: "Taxpayer salary for her boyfriend — with power to recommend early releases — despite FBI extortion probe",
  },
  {
    value: "22",
    label: "Years of service by decorated Chief Inspector Craig Chew — fired to install unqualified loyalist Eric Lewis",
  },
  {
    value: "4",
    label: "Staff lawsuits alleging racial discrimination, retaliation, and record tampering",
  },
  {
    value: "$25,000",
    label: "Campaign cash allegedly demanded from critic Mario Juarez at a fallen police officer's funeral",
  },
  {
    value: "4",
    label: "Murders in 6 weeks — lead prosecutor Stacie Pettigrew resigned in disgust over the plea deal",
  },
  {
    value: "62.9%",
    label: "Of Alameda County voters who recalled her — largest DA recall by volume in recent U.S. history",
  },
  {
    value: "$1M+",
    label: "From George Soros-linked PACs that bankrolled her rise — while she attacks opponents as billionaire-funded",
  },
];

const DIRECTIVE_TABLE = [
  {
    metric: "Sentencing enhancements",
    before: "Routinely filed to hold violent offenders accountable",
    after: "Banned by Special Directive 23-01 — exceptions only for narrow categories",
  },
  {
    metric: "Three Strikes allegations",
    before: "Applied per law for repeat violent offenders",
    after: "Effectively shelved under progressive policy",
  },
  {
    metric: "Special circumstances (LWOP)",
    before: "Pursued in gang murders and child victims",
    after: "Dropped in Jasper Wu case — killers eligible for parole",
  },
  {
    metric: "Misdemeanor case processing",
    before: "Systematic review with incident dating",
    after: "1,000+ cases expired — domestic violence backlog ignored for months",
  },
  {
    metric: "Triple-murder plea offers",
    before: "75 years to life for Delonzo Logwood",
    after: "15-year manslaughter deal — rejected from the bench by Judge McCannon",
  },
  {
    metric: "Prosecutor corps",
    before: "Decades of veteran trial attorneys",
    after: "Mass exodus — ethical prosecutors resigned rather than serve",
  },
];

const VICTIM_CASES = [
  {
    name: "Jasper Wu",
    detail: "23-month-old toddler killed by a stray bullet in a freeway gang shootout on I-880.",
    betrayal:
      "Price removed special circumstances that could have meant life without parole. Her office floated \"non-carceral forms of accountability\" in an email to community members. She refused to meet with the grieving family.",
    quote:
      "To just do it as a knee jerk reaction without proper information is really sad for the family — and can result in more gun battles down the freeway.",
    attribution: "Charly Weissenbach, veteran prosecutor",
  },
  {
    name: "Delonzo Logwood",
    detail: "Accused of three murders in a murder-for-hire scheme — originally facing 75 years to life.",
    betrayal:
      "Price offered 15 years for voluntary manslaughter. Judge Mark McCannon rejected the deal from the bench. Price retaliated — lead prosecutor Stacie Pettigrew was told she could not attend sentencing. Pettigrew resigned in protest.",
    quote:
      "We have an ethical duty of candor to the court. We cannot lie when asked a direct question.",
    attribution: "Alameda County prosecutor on Wilson's conduct",
  },
  {
    name: "Blake Mohs",
    detail: "26-year-old Home Depot loss prevention officer shot dead by a shoplifter who came back for him.",
    betrayal:
      "Price refused sentencing enhancements or special circumstances. Zero communication with the family. Mother testified before Congress that Price's policies revictimize victims.",
    quote:
      "She doesn't do anything for victims except revictimize them. I voted for her, and I made a mistake.",
    attribution: "Lorie Mohs, Blake's mother",
  },
  {
    name: "Dijon Holifield",
    detail: "Charged with four murders in six weeks — overwhelming evidence, planned and premeditated.",
    betrayal:
      "Price's office reduced most charges in a deal so lenient the lead prosecutor resigned. Holifield expected release within months despite a decade in custody.",
    quote:
      "She gave them the deal of a lifetime and he'll be out next year. Mothers shattered.",
    attribution: "Stacie Pettigrew, lead prosecutor (resigned)",
  },
];

const DEBATE_LANDMINES = [
  {
    trigger: "When she nationalizes with Trump, ICE, and Gaza…",
    counter:
      "63% of Alameda County already rendered their verdict. This isn't Washington. This is your record — 1,000 cases expired, four murder plea deals, and a boyfriend with an FBI file on the taxpayer dime.",
  },
  {
    trigger: "When she attacks her successor as billionaire-funded…",
    counter:
      "George Soros poured over $1 million into your campaigns. Philip Dreyfuss didn't make you hire your boyfriend at $115K or float non-carceral justice for a dead toddler.",
  },
  {
    trigger: "When she invokes her civil rights credentials…",
    counter:
      "You told your own spokesperson — in front of a reporter — that your enemies are \"the media and the Asians.\" You fired a 22-year Asian American chief inspector to install a loyalist with a misconduct record.",
  },
  {
    trigger: "When she claims she puts victims first…",
    counter:
      "Your lead prosecutor quit over a four-murder deal. A Home Depot mother said you revictimize families. You demanded $25,000 from a critic at a fallen officer's funeral. Victims don't need slogans. They need a DA who prosecutes.",
  },
];

const PRIMARY_SOURCES = [
  {
    title: "Berkeley Scanner — Holifield 4-murder plea deal & Pettigrew resignation",
    url: "https://www.berkeleyscanner.com/2024/10/28/courts/pamela-price-plea-deal-dijon-holifield/",
  },
  {
    title: "Berkeley Scanner — Patti Lee discrimination & retaliation lawsuit",
    url: "https://www.berkeleyscanner.com/2024/06/12/courts/pamela-price-lawsuit-filed-by-former-spokeswoman/",
  },
  {
    title: "Berkeley Scanner — Mario Juarez $25,000 extortion allegation",
    url: "https://www.berkeleyscanner.com/2024/10/12/courts/pamela-price-accused-extortion-attempt-mario-juarez/",
  },
  {
    title: "Berkeley Scanner — Craig Chew anti-Asian discrimination lawsuit",
    url: "https://www.berkeleyscanner.com/2024/10/31/courts/new-lawsuit-alleges-anti-asian-discrimination-pamela-price/",
  },
  {
    title: "Berkeley Scanner — Jasper Wu special circumstances dropped",
    url: "https://www.berkeleyscanner.com/2023/06/08/courts/jasper-wu-murder-suspects-face-less-time-pamela-price/",
  },
  {
    title: "KQED — Alameda County voters recall District Attorney Pamela Price",
    url: "https://www.kqed.org/news/12013442/alameda-county-voters-recall-district-attorney-pamela-price",
  },
  {
    title: "Ballotpedia — Pamela Price recall election results (62.9%)",
    url: "https://ballotpedia.org/Pamela_Price_recall,_Alameda_County,_California_(2023-2024)",
  },
  {
    title: "ABC7 — Judge rejects Logwood plea deal; Pettigrew resignation",
    url: "https://abc7news.com/post/pamela-price-alameda-county-district-attorney-delonzo-logwood-murder-suspect/13000452/",
  },
  {
    title: "San Francisco Chronicle — 1,000 misdemeanor cases statute expired",
    url: "https://www.sfchronicle.com/crime/article/pamela-price-case-backlog-alameda-county-19841683.php",
  },
  {
    title: "East Bay Times — Antwon Cloird hiring & FBI extortion allegations",
    url: "https://www.ktvu.com/news/alameda-county-da-hit-with-nepotism-allegation",
  },
];

/* ─── Animation helpers ────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function DocBadge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`doc-badge inline-block border border-crimson/40 bg-crimson/10 px-3 py-1 text-crimson-bright uppercase ${className}`}
    >
      {children}
    </span>
  );
}

/* ─── Scroll progress ──────────────────────────────────────────────── */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="no-print fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-crimson-bright"
      style={{ scaleX }}
    />
  );
}

/* ─── Share ────────────────────────────────────────────────────────── */

function ShareButton({ className = "" }: { className?: string }) {
  const [showFallback, setShowFallback] = useState(false);

  const share = useCallback(async () => {
    const data = {
      title: "63% Recalled Her. She's Running Again.",
      text: "1,000+ cases dismissed. Victims betrayed. The full Pamela Price dossier — read before 2026.",
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(data);
      } catch {
        /* user cancelled */
      }
    } else {
      setShowFallback((v) => !v);
    }
  }, []);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText =
    "63% recalled her. She's running again. 1,000+ cases dismissed, victims betrayed — read the full Pamela Price dossier:";

  return (
    <div className="relative inline-block">
      <button
        onClick={share}
        className={`inline-flex items-center gap-2 border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-wider transition hover:border-crimson hover:bg-crimson/10 hover:text-crimson-bright ${className}`}
      >
        <Share2 className="h-4 w-4" />
        Share This Exposé
      </button>
      {showFallback && (
        <div className="absolute left-0 top-full z-50 mt-2 min-w-[200px] rounded border border-white/10 bg-charcoal-light p-2 shadow-xl">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded px-3 py-2 text-sm font-semibold text-white/80 hover:bg-white/5 hover:text-crimson-bright"
          >
            Share on X
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded px-3 py-2 text-sm font-semibold text-white/80 hover:bg-white/5 hover:text-crimson-bright"
          >
            Share on Facebook
          </a>
        </div>
      )}
    </div>
  );
}

const DONATE_URL = "https://opportunity.vote/donate";

/* ─── Navbar ───────────────────────────────────────────────────────── */

function Navbar({ activeId }: { activeId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="no-print sticky top-0 z-50 border-b border-white/10 bg-charcoal/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <a
          href="#hero"
          className="text-sm font-bold tracking-tight text-white sm:text-base lg:text-lg"
        >
          Pamela Price <span className="text-crimson-bright">Files</span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          <nav className="flex items-center gap-6">
            {NAV_SECTIONS.slice(1, 6).map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`text-xs font-semibold uppercase tracking-wider transition ${
                  activeId === s.id ? "text-crimson-bright" : "text-white/60 hover:text-white"
                }`}
              >
                {s.label.replace(/^Part \d+:?\s*/, "").slice(0, 20)}
              </a>
            ))}
          </nav>
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-crimson px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-crimson-bright"
          >
            Donate
          </a>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-crimson px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white"
          >
            Donate
          </a>
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-charcoal px-4 py-4 md:hidden">
          {NAV_SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setOpen(false)}
              className={`block py-2 text-sm font-semibold ${
                activeId === s.id ? "text-crimson-bright" : "text-white/70"
              }`}
            >
              {s.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

/* ─── Table of Contents (desktop sidebar) ──────────────────────────── */

function TableOfContents({ activeId }: { activeId: string }) {
  return (
    <aside className="no-print fixed top-28 right-6 z-40 hidden w-52 xl:block">
      <p className="doc-badge mb-3 text-white/40">TABLE OF CONTENTS</p>
      <nav className="space-y-1 border-l border-white/10">
        {NAV_SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`toc-link block border-l-2 border-transparent py-1 pl-3 text-[11px] font-medium leading-tight transition hover:text-crimson-bright ${
              activeId === s.id
                ? "active text-crimson-bright"
                : "text-white/45"
            }`}
          >
            {s.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}

/* ─── Main Page ────────────────────────────────────────────────────── */

export default function Home() {
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <ScrollProgress />
      <Navbar activeId={activeId} />
      <TableOfContents activeId={activeId} />

      <main className="relative overflow-hidden">
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section
          id="hero"
          className="dossier-texture relative flex min-h-screen flex-col justify-center px-4 py-24 lg:px-8"
        >
          <div className="redaction-overlay pointer-events-none absolute inset-0 opacity-30" />
          <div className="relative mx-auto w-full max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14 xl:gap-16"
            >
              <div className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
                <div className="mb-6 flex justify-center lg:justify-start">
                  <DocBadge>PPF-2026-001</DocBadge>
                </div>
                <div className="overflow-hidden rounded border-2 border-crimson/50 shadow-[0_0_48px_rgba(185,28,28,0.3)]">
                  <Image
                    src="/Pamela_Price.webp"
                    alt="Pamela Price, recalled Alameda County District Attorney"
                    width={1602}
                    height={999}
                    className="h-auto w-full object-cover"
                    priority
                  />
                </div>
              </div>

              <div className="text-center lg:text-left">
                <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
                  THE PAMELA
                  <br />
                  <span className="text-crimson-bright">PRICE FILES</span>
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-lg font-semibold text-white/80 sm:text-xl lg:mx-0">
                  The Definitive Exposé of Alameda County&apos;s Recalled District Attorney
                </p>

                <p className="mx-auto mt-4 max-w-xl text-base text-white/55 lg:mx-0">
                  She lost the trust of deep-blue Alameda County in 24 months. Now she&apos;s trying to
                  rewrite history. This dossier exists so voters remember exactly why 62.9% removed
                  her from office — and why she cannot be trusted with power again.
                </p>

                <div className="mt-10 rounded border border-crimson/30 bg-crimson/5 p-6 sm:p-8">
                  <p className="stat-number text-6xl font-black text-crimson-bright sm:text-8xl">
                    62.9%
                  </p>
                  <p className="mt-2 text-lg font-bold text-white">
                    of voters recalled Pamela Price — the largest DA recall by volume in recent U.S.
                    history.
                  </p>
                  <p className="mt-2 text-sm text-white/50">
                    From 53.1% victory in November 2022 to historic repudiation in just 24 months.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
                  <a
                    href="#glance"
                    className="inline-flex items-center gap-2 bg-crimson px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-crimson-bright"
                  >
                    Explore the Dossier
                    <ChevronDown className="h-4 w-4" />
                  </a>
                  <ShareButton />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="section-divider mx-auto max-w-5xl" />

        {/* ── AT A GLANCE ────────────────────────────────────────── */}
        <Section id="glance" className="px-4 py-20 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <DocBadge className="mb-4">LEAKED INTERNAL SUMMARY</DocBadge>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              At a Glance:{" "}
              <span className="text-crimson-bright red-accent-underline">The Scale of the Failure</span>
            </h2>
            <p className="mt-4 max-w-2xl text-white/55">
              Eight numbers. Eight betrayals. One pattern: incompetence, hypocrisy, and victims left
              behind.
            </p>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STAT_CARDS.map((card, i) => (
                <motion.div
                  key={card.value + i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="card-glow rounded border border-white/10 bg-charcoal-light p-5 transition"
                >
                  <p className="stat-number text-4xl font-black text-crimson-bright">{card.value}</p>
                  <p className="mt-3 text-sm leading-snug text-white/70">{card.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        <div className="section-divider mx-auto max-w-5xl" />

        {/* ── PART 1 ─────────────────────────────────────────────── */}
        <Section id="part-1" className="px-4 py-20 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <p className="doc-badge mb-2 text-white/40">PART 01</p>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              The Hypocrisy of Her{" "}
              <span className="text-crimson-bright">&quot;Civil Rights&quot; Persona</span>
            </h2>

            <div className="mt-8 space-y-6 text-white/70">
              <p className="text-lg leading-relaxed">
                Pamela Price built her brand as a Title VII civil rights attorney — the defender of the
                marginalized, the voice for domestic violence survivors, the champion of racial
                justice. Then she became District Attorney and became the defendant.
              </p>

              <div className="quote-block rounded-r p-5">
                <p className="text-base font-semibold italic text-white">
                  &quot;Her enemies were &apos;the media and the Asians.&apos;&quot;
                </p>
                <p className="mt-2 text-sm text-white/50">
                  — Allegation by former spokesperson Patti Lee, verified complaint, June 2024
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded border border-white/10 bg-charcoal-light p-5">
                  <ShieldAlert className="mb-3 h-6 w-6 text-crimson-bright" />
                  <h3 className="font-bold text-white">The Expert vs. The Accused</h3>
                  <p className="mt-2 text-sm">
                    Decades prosecuting discrimination cases in private practice. In office: multiple
                    lawsuits alleging she created the hostile work environment she once sued over —
                    racial discrimination, retaliation, and record tampering.
                  </p>
                </div>
                <div className="rounded border border-white/10 bg-charcoal-light p-5">
                  <Users className="mb-3 h-6 w-6 text-crimson-bright" />
                  <h3 className="font-bold text-white">Survivor Rhetoric, Victim Abandonment</h3>
                  <p className="mt-2 text-sm">
                    She campaigned on protecting domestic violence survivors. Her office let 1,000+
                    misdemeanor and DV cases expire past the statute of limitations — crimes that
                    will never be prosecuted.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <div className="section-divider mx-auto max-w-5xl" />

        {/* ── PART 2 ─────────────────────────────────────────────── */}
        <Section id="part-2" className="px-4 py-20 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <p className="doc-badge mb-2 text-white/40">PART 02</p>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Billionaire-Backed{" "}
              <span className="text-crimson-bright">&quot;Progressive Prosecutor&quot;</span>
            </h2>

            <div className="mt-8 space-y-6 text-white/70">
              <p className="text-lg leading-relaxed">
                Price rode into office on a wave of outside money. George Soros-linked PACs poured
                over $1 million into her campaigns. The California Justice &amp; Public Safety PAC
                spent $130,000+ on mailers alone. She ran with DSA-aligned endorsements and
                progressive prosecutor movement backing.
              </p>

              <div className="quote-block rounded-r p-5">
                <p className="text-base font-semibold italic text-white">
                  &quot;We need to show Donald Trump and his billionaire friends — whether
                  they&apos;re in Washington or Piedmont — that justice is not for sale.&quot;
                </p>
                <p className="mt-2 text-sm text-white/50">
                  — Pamela Price, 2026 comeback announcement — attacking billionaire-funded opponents
                  while her own career was Soros-financed
                </p>
              </div>

              <p>
                The hypocrisy is surgical. She frames every critic as a billionaire puppet. Her recall
                was funded by Philip Dreyfuss — but her election was bankrolled by Soros. She
                didn&apos;t reject either check.
              </p>
            </div>
          </div>
        </Section>

        <div className="section-divider mx-auto max-w-5xl" />

        {/* ── PART 3 ─────────────────────────────────────────────── */}
        <Section id="part-3" className="px-4 py-20 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <p className="doc-badge mb-2 text-white/40">PART 03</p>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              The Directive That{" "}
              <span className="text-crimson-bright">Broke the System</span>
            </h2>

            <p className="mt-6 max-w-2xl text-white/70">
              Special Directive 23-01, issued April 14, 2023, ordered prosecutors to stop filing
              sentencing enhancements — the tools used to hold violent repeat offenders accountable.
              The result was predictable. The damage was permanent.
            </p>

            <div className="mt-8 overflow-x-auto rounded border border-white/10">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-charcoal-light">
                    <th className="p-4 font-bold text-white">Policy Area</th>
                    <th className="p-4 font-bold text-white/60">Pre-Price Era</th>
                    <th className="p-4 font-bold text-crimson-bright">Price Era</th>
                  </tr>
                </thead>
                <tbody>
                  {DIRECTIVE_TABLE.map((row) => (
                    <tr key={row.metric} className="border-b border-white/5">
                      <td className="p-4 font-semibold text-white">{row.metric}</td>
                      <td className="p-4 text-white/55">{row.before}</td>
                      <td className="p-4 text-white/80">{row.after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 rounded border border-crimson/20 bg-crimson/5 p-5">
              <FileWarning className="mb-2 h-5 w-5 text-crimson-bright" />
              <p className="text-sm font-semibold text-white">
                Internal memo, April 2023: &quot;Prosecutors shall not file or require defendants
                plead to sentence enhancements.&quot; Exceptions were narrow. Consequences were
                catastrophic.
              </p>
            </div>
          </div>
        </Section>

        <div className="section-divider mx-auto max-w-5xl" />

        {/* ── PART 4 ─────────────────────────────────────────────── */}
        <Section id="part-4" className="px-4 py-20 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <p className="doc-badge mb-2 text-white/40">PART 04</p>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Victims Betrayed —{" "}
              <span className="text-crimson-bright">Four Cases That Shattered Public Trust</span>
            </h2>

            <div className="mt-10 space-y-6">
              {VICTIM_CASES.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ x: 4 }}
                  className="card-glow rounded border border-white/10 bg-charcoal-light p-6 transition"
                >
                  <div className="flex items-start gap-3">
                    <Skull className="mt-1 h-5 w-5 shrink-0 text-crimson-bright" />
                    <div>
                      <h3 className="text-xl font-black text-white">{c.name}</h3>
                      <p className="mt-1 text-sm text-white/55">{c.detail}</p>
                      <p className="mt-3 text-sm leading-relaxed text-white/75">{c.betrayal}</p>
                      <blockquote className="quote-block mt-4 rounded-r p-4">
                        <p className="text-sm font-semibold italic text-white">
                          &quot;{c.quote}&quot;
                        </p>
                        <cite className="mt-1 block text-xs text-white/45 not-italic">
                          — {c.attribution}
                        </cite>
                      </blockquote>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        <div className="section-divider mx-auto max-w-5xl" />

        {/* ── PART 5 ─────────────────────────────────────────────── */}
        <Section id="part-5" className="px-4 py-20 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <p className="doc-badge mb-2 text-white/40">PART 05</p>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Nepotism &amp; The{" "}
              <span className="text-crimson-bright">Antwon Cloird Scandal</span>
            </h2>

            <div className="mt-8 space-y-6 text-white/70">
              <p className="text-lg">
                Days after taking office, Price hired her boyfriend Antwon Cloird as Senior Program
                Specialist at $115,502/year — a position never publicly advertised. His job: identify
                candidates for early release and assess readiness to reenter society.
              </p>

              <div className="quote-block rounded-r p-5">
                <p className="text-base font-semibold italic text-white">
                  &quot;You gots to pay to play.&quot;
                </p>
                <p className="mt-2 text-sm text-white/50">
                  — Antwon Cloird, quoted in sworn court filings, 2015 Richmond FBI extortion
                  investigation. Allegedly demanded $5,000–$20,000 from businesses to expedite city
                  permits. Never charged — but never vetted before taxpayers started paying his
                  salary.
                </p>
              </div>

              <p>
                Richmond&apos;s mayor, city manager, and police chief suspected Cloird of shaking down
                businesses. The FBI investigated. Price&apos;s own spokesperson advised against the
                hire. She did it anyway — and never disclosed the relationship.
              </p>

              <p>
                When confronted, Price deflected with racist framing — attacking Asian American
                critics and recall organizers rather than answering nepotism allegations on the
                merits.
              </p>
            </div>
          </div>
        </Section>

        <div className="section-divider mx-auto max-w-5xl" />

        {/* ── PART 6-7 ───────────────────────────────────────────── */}
        <Section id="part-6" className="px-4 py-20 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <p className="doc-badge mb-2 text-white/40">PART 06 &amp; 07</p>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              The Staff Purge +{" "}
              <span className="text-crimson-bright">Weaponizing the Office</span>
            </h2>

            <div className="mt-8 space-y-6">
              <p className="text-lg text-white/70">
                Ethical prosecutors fled. Loyalists replaced them. The DA&apos;s office became a
                political weapon.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="quote-block rounded-r p-5">
                  <p className="text-sm font-semibold italic text-white">
                    &quot;She didn&apos;t care about the victims. She cared more about criminal
                    defendants… creating what appears to be anarchy in Alameda County — with no
                    consequences for the people who harm community members.&quot;
                  </p>
                  <p className="mt-2 text-xs text-white/45">— Charly Weissenbach, resigned March 2023</p>
                </div>
                <div className="quote-block rounded-r p-5">
                  <p className="text-sm font-semibold italic text-white">
                    &quot;I no longer feel able to adequately and ethically protect the rights of
                    victims under your administration.&quot;
                  </p>
                  <p className="mt-2 text-xs text-white/45">— Jill Nerone, 33-year veteran, resigned April 2023</p>
                </div>
              </div>

              <div className="rounded border border-white/10 bg-charcoal-light p-5">
                <Gavel className="mb-3 h-6 w-6 text-crimson-bright" />
                <h3 className="font-bold text-white">Chief Inspector Purge</h3>
                <p className="mt-2 text-sm text-white/70">
                  Price fired 22-year decorated veteran Chief Inspector Craig Chew — mailing his
                  termination to an address he hadn&apos;t lived at in a decade — to install Eric
                  Lewis, a loyalist with an Oakland PD misconduct record. Lewis was brought in
                  through a temp firm to bypass legally mandated background checks.
                </p>
              </div>

              <div className="rounded border border-crimson/20 bg-crimson/5 p-5">
                <AlertTriangle className="mb-3 h-6 w-6 text-crimson-bright" />
                <h3 className="font-bold text-white">Mario Juarez Extortion + Butch Ford Retaliation</h3>
                <p className="mt-2 text-sm text-white/70">
                  Price allegedly demanded $25,000 in recall campaign cash from critic Mario Juarez at
                  Officer Tuan Le&apos;s funeral — then filed felony charges 16 days later. Veteran
                  prosecutor Butch Ford, who criticized Price publicly, faced prosecution until the
                  California Attorney General dropped all charges citing &quot;insufficiency of the
                  evidence and in the interest of justice.&quot;
                </p>
              </div>
            </div>
          </div>
        </Section>

        <div className="section-divider mx-auto max-w-5xl" />

        {/* ── PART 8 ─────────────────────────────────────────────── */}
        <Section id="part-8" className="px-4 py-20 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <p className="doc-badge mb-2 text-white/40">PART 08</p>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Anti-Asian Discrimination &amp;{" "}
              <span className="text-crimson-bright">Whistleblower Retaliation</span>
            </h2>

            <div className="mt-8 space-y-6 text-white/70">
              <p className="text-lg">
                The civil rights attorney became the subject of civil rights lawsuits — filed by the
                very people who worked for her.
              </p>

              <ul className="space-y-4">
                <li className="flex gap-3 rounded border border-white/10 bg-charcoal-light p-4">
                  <Scale className="mt-0.5 h-5 w-5 shrink-0 text-crimson-bright" />
                  <div>
                    <strong className="text-white">Patti Lee lawsuit:</strong> Former spokesperson
                    alleges Price said her enemies were &quot;the media and the Asians,&quot; fired
                    her for refusing to sign off on misleading public records responses, and gave her
                    8 minutes to clear her desk.
                  </div>
                </li>
                <li className="flex gap-3 rounded border border-white/10 bg-charcoal-light p-4">
                  <Scale className="mt-0.5 h-5 w-5 shrink-0 text-crimson-bright" />
                  <div>
                    <strong className="text-white">Chief Inspector Chew lawsuit:</strong> 33-year
                    veteran alleges anti-Asian animus — Price described Asian Americans as
                    &quot;sneaky, cunning, untrustworthy&quot; and purged qualified Asian American
                    staff to install unqualified loyalists.
                  </div>
                </li>
                <li className="flex gap-3 rounded border border-white/10 bg-charcoal-light p-4">
                  <Scale className="mt-0.5 h-5 w-5 shrink-0 text-crimson-bright" />
                  <div>
                    <strong className="text-white">Cancelled stunt:</strong> Price planned a
                    &quot;Chinese name&quot; publicity event — pulled only after staff backlash
                    exposed the tone-deaf gimmick for what it was.
                  </div>
                </li>
              </ul>

              <p className="font-semibold text-white">
                This wasn&apos;t one rogue comment. It was a systemic purge — documented, sworn, and
                litigated.
              </p>
            </div>
          </div>
        </Section>

        <div className="section-divider mx-auto max-w-5xl" />

        {/* ── PART 9 ─────────────────────────────────────────────── */}
        <Section id="part-9" className="px-4 py-20 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <p className="doc-badge mb-2 text-white/40">PART 09</p>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              The Historic 2024 Recall —{" "}
              <span className="text-crimson-bright">Data That Cannot Be Denied</span>
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded border border-white/10 bg-charcoal-light p-8 text-center">
                <p className="doc-badge text-white/40">NOVEMBER 5, 2024</p>
                <p className="stat-number mt-4 text-7xl font-black text-crimson-bright">62.9%</p>
                <p className="mt-2 text-lg font-bold text-white">YES — RECALL</p>
                <p className="mt-1 text-sm text-white/50">375,442 voters</p>
              </div>
              <div className="rounded border border-white/10 bg-charcoal-light p-8 text-center">
                <p className="doc-badge text-white/40">REMAIN IN OFFICE</p>
                <p className="stat-number mt-4 text-7xl font-black text-white/30">37.1%</p>
                <p className="mt-2 text-lg font-bold text-white/50">NO</p>
                <p className="mt-1 text-sm text-white/40">221,285 voters</p>
              </div>
            </div>

            <div className="mt-8 space-y-4 text-white/70">
              <p className="text-lg">
                First DA recall in Alameda County history. Endorsed by all 13 county law enforcement
                unions, the prosecutors&apos; union, the East Bay Times, the San Francisco Chronicle,
                and Rep. Eric Swalwell.
              </p>
              <p>
                The key insight Price cannot spin away: this wasn&apos;t red America rejecting
                reform. This was deep-blue Alameda County — the same electorate that gave her 53.1% in
                2022 — repudiating her progressive experiment by a 26-point margin in just two years.
              </p>
              <p>
                On the same ballot, Alameda County voted overwhelmingly for Proposition 36 — rolling
                back soft-on-crime policies. The voters spoke. Price refused to listen.
              </p>
            </div>
          </div>
        </Section>

        <div className="section-divider mx-auto max-w-5xl" />

        {/* ── PART 10 ────────────────────────────────────────────── */}
        <Section id="part-10" className="px-4 py-20 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <p className="doc-badge mb-2 text-white/40">PART 10</p>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              2026 Comeback —{" "}
              <span className="text-crimson-bright">The Desperate Pivot &amp; Debate Landmines</span>
            </h2>

            <p className="mt-6 text-lg text-white/70">
              Recalled in November 2024. Running again by December 2025. Her strategy: nationalize
              the race — invoke Trump, ICE, Gaza, and billionaire bogeymen — anything to avoid her
              local record. Voters aren&apos;t buying it. Unofficial 2026 primary results showed her
              trailing at ~23% while the incumbent captured ~65%.
            </p>

            <div className="mt-10">
              <DocBadge className="mb-4">DEBATE LANDMINES — READY TO DEPLOY</DocBadge>
              <div className="space-y-4">
                {DEBATE_LANDMINES.map((mine, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="card-glow rounded border border-crimson/20 bg-charcoal-light p-5 transition"
                  >
                    <p className="text-xs font-bold uppercase tracking-wider text-crimson-bright">
                      {mine.trigger}
                    </p>
                    <p className="mt-2 text-base font-semibold leading-snug text-white">
                      {mine.counter}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <div className="section-divider mx-auto max-w-5xl" />

        {/* ── CLOSING ────────────────────────────────────────────── */}
        <Section id="closing" className="dossier-texture relative px-4 py-24 lg:px-8">
          <div className="redaction-overlay pointer-events-none absolute inset-0 opacity-20" />
          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
              The Voters Already{" "}
              <span className="text-crimson-bright">Rendered Their Verdict.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/65">
              Pamela Price is trying to rewrite it. This dossier exists so history — and voters —
              remember exactly why she was removed.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <ShareButton className="bg-crimson border-crimson text-white hover:bg-crimson-bright hover:text-white" />
              <a
                href="/Pamela%20Price%20Files.pdf"
                download="Pamela Price Files.pdf"
                className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-wider transition hover:border-crimson hover:bg-crimson/10"
              >
                <Download className="h-4 w-4" />
                Download Full Dossier (PDF)
              </a>
            </div>
          </div>
        </Section>

        {/* ── SOURCES ────────────────────────────────────────────── */}
        <Section id="sources" className="border-t border-white/10 px-4 py-16 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-xl font-black tracking-tight text-white">Primary Sources</h2>
            <p className="mt-2 text-sm text-white/45">
              Court filings, investigative reporting, and public records cited in this dossier.
            </p>
            <ul className="mt-6 space-y-3">
              {PRIMARY_SOURCES.map((src) => (
                <li key={src.url}>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 underline decoration-crimson/40 underline-offset-2 transition hover:text-crimson-bright"
                  >
                    {src.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* ── FOOTER ─────────────────────────────────────────────── */}
        <footer className="border-t border-white/5 px-4 py-10 text-center">
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-crimson px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-crimson-bright"
          >
            Donate
          </a>
          <p className="mx-auto mt-6 max-w-2xl text-xs leading-relaxed text-white/35">
            This site compiles public records, court filings, leaked documents, and investigative
            reporting for voters of Alameda County.
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-white/50">
            Paid for by Americans for Opportunity
          </p>
          <a
            href="mailto:contact@pamelapricefiles.com"
            className="mt-3 inline-block text-sm text-white/50 transition hover:text-crimson-bright"
          >
            contact@pamelapricefiles.com
          </a>
          <p className="mt-2 doc-badge text-white/25">PPF-2026-001 // END OF DOSSIER</p>
        </footer>
      </main>
    </>
  );
}
