// Lead board data — maintained by Claude when the CEO sends new lead info. Not a route.
module.exports = [
  // ===================================================================
  // TIER 1 — in progress + hot (active builds and hottest live deals)
  // ===================================================================
  {
    id: "aerix-orbit",
    name: "Aerix Orbit",
    handle: "Slight_Pin5742",
    platform: "reddit",
    origin: "Reddit chat — homepage read -> said 'Sure' to a preview",
    productUrl: "https://aerixorbit.com",
    postUrl: "",
    profileUrl: "https://reddit.com/user/Slight_Pin5742",
    status: "in_progress",
    nextAction: "Build the founding preview. App confirmed, script stands, Codex assets.",
    temp: "hot",
    value: 900,
    tags: ["hardware", "pre-launch", "security", "founding-client", "automotive"],
    thread: [
      { date: "2026-07-04", dir: "out", channel: "chat", text: "Founding-client build underway: pre-launch car-security hardware. First physical-product attempt — device renders are Type-1 assets, blueprint schematics carry the how-it-works sequence." }
    ],
    notes: "Pre-launch car-security hardware. Founding client. First physical-product attempt. App confirmed, script stands, Codex assets.",
    updated: "2026-07-04"
  },
  {
    id: "eliteforcheap",
    name: "EliteForCheap",
    handle: "",
    platform: "reddit",
    origin: "Founding client",
    productUrl: "",
    postUrl: "",
    profileUrl: "",
    status: "in_progress",
    nextAction: "Awaiting script approval -> assets -> build -> preview",
    temp: "warm",
    value: 250,
    tags: ["founding-client", "preview-deal"],
    thread: [
      { date: "2026-07-04", dir: "out", channel: "chat", text: "Founding-preview script sent, awaiting approval before moving to assets + build." }
    ],
    notes: "Founding client, script sent. $250 founding-preview offer.",
    updated: "2026-07-04"
  },
  {
    id: "craftslide",
    name: "CraftSlide",
    handle: "Original_Evidence291",
    platform: "reddit",
    origin: "F5Bot: roast my saas -> r/roastmystartup",
    productUrl: "https://craftslide.io",
    postUrl: "https://reddit.com/r/roastmystartup/comments/1unh63t",
    profileUrl: "https://reddit.com/user/Original_Evidence291",
    status: "read_ready",
    nextAction: "Post the comment, then DM the read ~30 min later",
    temp: "hot",
    value: null,
    tags: ["saas", "ai", "presentations", "roastmystartup"],
    thread: [
      { date: "2026-07-04", dir: "out", channel: "dm", text: "[DRAFT] hey — quick read on craftslide. the name's genuinely good, tells me the lane right away.\n\nbut when i loaded it almost nothing rendered till the JS caught up — thin copy, no example deck, couldnt tell what makes it different. rough irony for a slide tool (you sell 'show it fast' and the page doesnt). quick fix either way: get a headline + one screenshot into the static HTML so a slow load isnt a blank page.\n\nyour magic is a transformation anyway, blank slide to finished deck, thats made to be watched not read. a ~60s video up top would land the whole idea before people bounce. thats what i make — short brand-matched explainers. happy to show a couple examples. either way, cool product." }
    ],
    notes: "AI presentation generator. Pain: traffic+clicks but few signups. Verdict BORDERLINE. Client-rendered page shows almost nothing without JS — the irony a slide tool doesn't show fast. DM in read file craftslide.io.md.",
    updated: "2026-07-04"
  },
  {
    id: "frostangel11-8k-explainer",
    name: "FrostAngel11 ($8k explainer)",
    handle: "FrostAngel11",
    platform: "reddit",
    origin: "F5Bot: explainer video -> r/ProductMarketing",
    productUrl: "",
    postUrl: "https://reddit.com/r/ProductMarketing/comments/1un9s3k",
    profileUrl: "https://reddit.com/user/FrostAngel11",
    status: "comment_ready",
    nextAction: "Post the disclose-first comment, DM with free homepage read + $900-vs-$8k",
    temp: "hot",
    value: null,
    tags: ["explainer-video", "series-a", "productmarketing", "buyer-intent"],
    thread: [],
    notes: "Series A, 78% bounce, CEO wants $8k video, poster skeptical. Price OK here. Thread contested. Direct buyer-intent thread.",
    updated: "2026-07-04"
  },
  {
    id: "no-preparation-7771-hiring",
    name: "No_Preparation_7771 (hiring)",
    handle: "No_Preparation_7771",
    platform: "reddit",
    origin: "F5Bot: explainer video -> r/FindVideoEditors",
    productUrl: "",
    postUrl: "https://reddit.com/r/FindVideoEditors/comments/1un6rt1",
    profileUrl: "https://reddit.com/user/No_Preparation_7771",
    status: "dm_ready",
    nextAction: "DM directly with portfolio + 1 question. Direct buyer, skip the comment.",
    temp: "hot",
    value: null,
    tags: ["explainer-video", "hiring", "motion-graphics", "buyer-intent"],
    thread: [],
    notes: "Explicitly hiring a motion-graphic editor for product explainers. Hottest lead type — direct buyer, skip the comment.",
    updated: "2026-07-04"
  },

  // ===================================================================
  // TIER 2 — warm (session leads with active next steps)
  // ===================================================================
  {
    id: "preflight",
    name: "Preflight",
    handle: "Curious_Mongoose_814",
    platform: "reddit",
    origin: "F5Bot: roast my landing page -> r/roastmystartup",
    productUrl: "https://preflightio.com",
    postUrl: "https://reddit.com/r/roastmystartup/comments/1unazvn",
    profileUrl: "https://reddit.com/user/Curious_Mongoose_814",
    status: "comment_ready",
    nextAction: "Post CORRECTED comment (they have a screen-recording demo), DM after",
    temp: "warm",
    value: null,
    tags: ["saas", "security", "pre-launch", "github", "roastmystartup"],
    thread: [
      { date: "2026-07-04", dir: "out", channel: "dm", text: "[DRAFT] Hey, left a comment on your roast thread, here's the longer version.\n\nThe positioning is genuinely sharp. That \"I built this with AI and added Stripe last night, can you check the risky parts before I launch\" line is your exact customer talking to himself, and leading with it is smart.\n\nOne honest note unrelated to what I do: your \"Trusted by fast-growing startups\" row is Vercel, Supabase, Stripe, Clerk. Those are the stacks you integrate with, not customers, and a skeptical developer (which is your whole audience) will notice the gap between the label and the logos. I'd relabel it \"Works with\" until you have real names to put there.\n\nThe bigger thing is the video. You already put one up top, which is the right instinct, but it's a screen recording. A screen recording tours the UI and shows the tool clicking around. What it doesn't do is handle the actual thing between a visitor and \"connect my private repo,\" which is fear. Your buyer vibe-coded something and is quietly scared he left a hole, and you're asking him to hand over access to his auth and Stripe wiring. That's an emotional trust call, and a raw capture of the dashboard doesn't move it the way a short scripted piece that names the fear and answers it does.\n\nThat's what I make, short brand-matched explainers, and security tools are close to the perfect case because the entire sale is trust. Happy to show you a couple examples so you can see the difference. Either way, solid niche and good instincts." }
    ],
    notes: "GitHub security scanner. Use the CORRECTED DM in preflightio.com.md, NOT the original. They DO have a demo video (screen recording) + a 'Trusted by' row that's really integration logos. Pure trust buy, pre-launch.",
    updated: "2026-07-04"
  },
  {
    id: "dexi",
    name: "Dexi",
    handle: "WiseIndependent15",
    platform: "reddit",
    origin: "F5Bot: roast my landing page -> r/roastmystartup",
    productUrl: "https://dexi-ai.com",
    postUrl: "https://reddit.com/r/roastmystartup/comments/1umx4g6",
    profileUrl: "https://reddit.com/user/WiseIndependent15",
    status: "read_ready",
    nextAction: "Comment + DM the read",
    temp: "warm",
    value: null,
    tags: ["saas", "ai", "assistant", "messaging", "roastmystartup"],
    thread: [
      { date: "2026-07-04", dir: "out", channel: "dm", text: "[DRAFT] hey, ran dexi through the quick 7-second test. the writing's genuinely sharp — \"bold with the busywork, careful with the rest\" is a great line, and leading with real text threads instead of feature copy is the right call.\n\nsmall non-me fix: the \"a day with dexi\" grid repeats itself (flight/inbox/hotel show up twice) — cut to your best five and let them breathe.\n\nbut the real thing: your whole pitch is a *conversation* — a friend you text who fires back. and you're selling it with frozen screenshots. the magic of a texting assistant is the rhythm — send, reply types back, thing gets handled — and a static bubble can't show that. a ~60s video could play one real thread live (the flight rebook you already mocked up, just moving). that's what i make — short brand-matched explainers. happy to show a couple examples. either way, cool product." }
    ],
    notes: "AI text assistant (iMessage/WhatsApp/SMS). Verdict BORDERLINE. Sharp copy, whole pitch is a conversation sold with frozen screenshots. Read dexi-ai.com.md.",
    updated: "2026-07-04"
  },
  {
    id: "atheria-embra-archive",
    name: "Atheria (Embra Archive)",
    handle: "corgisAreRad",
    platform: "reddit",
    origin: "F5Bot: roast my website -> r/iOSAppsMarketing",
    productUrl: "https://www.embraarchive.com/atheria-live",
    postUrl: "https://reddit.com/r/iOSAppsMarketing/comments/1umtxf2",
    profileUrl: "https://reddit.com/user/corgisAreRad",
    status: "read_ready",
    nextAction: "Comment + DM. Pre-launch Jul 28 = the site IS the demo.",
    temp: "warm",
    value: null,
    tags: ["macos", "pre-launch", "generative-art", "wallpaper", "iosappsmarketing"],
    thread: [
      { date: "2026-07-04", dir: "out", channel: "dm", text: "[DRAFT] hey, ran atheria through a quick read. the live-rendered page reacting to my cursor is a genuinely brilliant move and the aurora's gorgeous. 'zero frames, zero guilt' is a great line too.\n\nsmall note: you've got five feature sub-heads stacked and the eye bounces, i'd merge a couple and pull the 'engine, not a catalog' bit higher since thats your real differentiator.\n\nthe bigger thing: you're pre-launch (july 28) so the site is your demo. and the page proves the LOOK beautifully, but what actually sells this is invisible, the fps dropping to 0 when a window covers the desktop, privacy guard frosting and clearing when you step away. those are trust claims you're asking people to take on faith. a ~60s video could show that sequence in motion, window slides over, counter hits zero, screen frosts, you return, it clears.\n\nthats what i make, short brand-matched explainers. happy to show a couple examples. either way, cool product." }
    ],
    notes: "macOS live-wallpaper engine. Verdict BORDERLINE. Pre-launch Jul 28 so the site is the demo. Live-rendered page proves the look; the sell (0 fps when covered, privacy frost) is invisible. Read embraarchive.com.md.",
    updated: "2026-07-04"
  },
  {
    id: "zaptrom",
    name: "Zaptrom",
    handle: "Pretend-Zebra-844",
    platform: "chat",
    origin: "Reddit chat - they messaged first",
    productUrl: "https://zaptrom.lovable.app",
    postUrl: "",
    profileUrl: "https://reddit.com/user/Pretend-Zebra-844",
    status: "replied",
    nextAction: "Send the chat reply (czech placeholder hero bug + buy domain + video angle)",
    temp: "warm",
    value: null,
    tags: ["saas", "cold-email", "outreach", "inbound"],
    thread: [
      { date: "2026-07-04", dir: "in", channel: "chat", text: "They DMd me first about Zaptrom." },
      { date: "2026-07-04", dir: "out", channel: "chat", text: "[DRAFT] hey, quick zaptrom homepage read. the copy's sharp, \"still from your gmail\" is a clean wedge and that manual-vs-zaptrom 2hrs->5min comparison is a great way to make the pain real.\n\nquick fix first: your hero image still says \"Outreach AI\" and is entirely in czech while the rest of the page is english zaptrom. that mismatch is the first thing people see and reads as unfinished, an english app screenshot would fix it.\n\nthe real thing though: your product is a motion (csv in, ai reads the site, drafts in your voice, send from gmail, track replies) and you're explaining a sequence with feature cards. the most persuasive thing you've got, 2 hours becoming 5 minutes, has no moving proof of it happening.\n\nthat's what i make, short explainers that show the whole flow in one watch. could take that spreadsheet mockup you already have and let it actually run. happy to show a couple examples. either way, cool product." }
    ],
    notes: "Cold-email tool. They DMd me. Verdict BORDERLINE. Hero image is a czech placeholder ('Outreach AI'), on a lovable.app subdomain (buy a domain). Read zaptrom.lovable.app.md.",
    updated: "2026-07-04"
  },
  {
    id: "iconicbrands-kindness",
    name: "IconicBrands (Kindness)",
    handle: "IconicBrands",
    platform: "reddit",
    origin: "F5Bot: no signups -> r/sideprojects; accepted my chat invite",
    productUrl: "https://www.kindness.iconicbrands.biz",
    postUrl: "https://reddit.com/r/sideprojects/comments/1un1a2a",
    profileUrl: "https://reddit.com/user/IconicBrands",
    status: "dm_ready",
    nextAction: "Send examples (now unlocked) + the read",
    temp: "warm",
    value: null,
    tags: ["community", "membership", "kindness", "sideprojects"],
    thread: [
      { date: "2026-07-04", dir: "out", channel: "dm", text: "[DRAFT] hey, quick 7-second read on iconic kindness. the branding's got heart, 'be yourself. be iconic.' and 'kindness comes back around' is a genuinely nice hook.\n\nbut the first thing i hit was a 'win $500 cash / $9.99/mo' popup before i knew what the community even is. quick fix: hold that modal a few seconds so the real page loads first, otherwise the first impression is a raffle, not a community.\n\ndeeper thing: kindness is an emotional sell, people join for how it feels. right now you're leading with cold money mechanics, so the format fights the mission. a ~60s video is about the only way to make a stranger actually feel the vibe before they bounce, built around 'be yourself. be iconic.'\n\nthat's what i make, short brand-matched explainers. happy to show a couple examples. either way, cool mission." }
    ],
    notes: "Essay/kindness competition community, visits but no signups. Verdict FAILS (giveaway modal dominates). Was gated on the all-features video, now unblocked. Read kindness.iconicbrands.biz.md.",
    updated: "2026-07-04"
  },
  {
    id: "saas-explainer-shopper",
    name: "r/SaaS explainer shopper",
    handle: "whatafounder",
    platform: "reddit",
    origin: "F5Bot: explainer video -> r/SaaS",
    productUrl: "",
    postUrl: "https://reddit.com/r/SaaS/comments/1um969c",
    profileUrl: "https://reddit.com/user/whatafounder",
    status: "cold",
    nextAction: "Comment before it closes; competitors (WhatAStory) already bidding",
    temp: "warm",
    value: null,
    tags: ["explainer-video", "saas", "buyer-intent", "contested"],
    thread: [],
    notes: "Narrowed it down to 3 explainer companies. whatafounder is a competitor commenter; the OP is the buyer. Competitors (WhatAStory) already bidding — comment before it closes.",
    updated: "2026-07-04"
  },

  // ===================================================================
  // TIER 3 — read_ready (homepage reads, DM drafted, no session status)
  // ===================================================================
  {
    id: "formhook",
    name: "Formhook",
    handle: "",
    platform: "other",
    origin: "Homepage read — throughline funnel",
    productUrl: "https://formhook.app",
    postUrl: "",
    profileUrl: "",
    status: "read_ready",
    nextAction: "Find the poster/contact, comment value-first, then DM the read",
    temp: "warm",
    value: null,
    tags: ["saas", "developer-tools", "forms", "backend"],
    thread: [
      { date: "2026-07-04", dir: "out", channel: "dm", text: "[DRAFT] hey — ran formhook through the 7-second test and it passes clean. copy's got real taste too (\"there is no step two\" is great).\n\none thing though: you already embedded a live demo form, so you clearly believe showing beats telling. but your actual differentiator — the push notification that fires even with the browser closed — is the one beat the page can't show. a visitor has to just trust it, and that's exactly the claim a burned freelancer won't trust until they see it.\n\nthat's my thing — short brand-matched explainers. for you it'd be a ~60s screen capture of the whole loop: paste key -> submit -> row lands -> phone buzzes on a closed browser. happy to show a couple examples, no pressure. clean product either way." }
    ],
    notes: "EU-hosted form backend for static sites. Verdict PASSES. Tight dev-native copy, embedded live demo form; the push-notification beat is the one thing the page can't show. Read formhook.app.md.",
    updated: "2026-07-04"
  },
  {
    id: "getcadence",
    name: "Cadence",
    handle: "",
    platform: "other",
    origin: "Homepage read — throughline funnel (roast request)",
    productUrl: "https://getcadence.uk",
    postUrl: "",
    profileUrl: "",
    status: "read_ready",
    nextAction: "Find the poster/contact, comment value-first, then DM the read",
    temp: "warm",
    value: null,
    tags: ["saas", "productivity", "planning", "adhd", "accessibility"],
    thread: [
      { date: "2026-07-04", dir: "out", channel: "dm", text: "[DRAFT] hey — ran cadence through the 7-second test. it passes clean, top 10%: the \"start from your energy, not a blank list\" hook is sharp and you actually show real UI, not just claims.\n\none note, specific to your magic: the aha is a *motion* — flat list -> tell it your energy -> it reshuffles into a gentle day. but that lives across two static screenshots, so a stranger has to connect them. and your crowd (adhd, low-energy days) is the least likely to piece that together from stills + a paragraph.\n\na ~60s video shows that one transform in a single watch — reuse your exact mockups, let the 'plan my day with AI' tap actually happen. that's the thing i make. happy to just show a couple examples, no pressure — site's great either way." }
    ],
    notes: "Calm, privacy-first daily planner built around energy/focus (ADHD/autism/chronic-illness crowd). Verdict PASSES. The AI-transform is a before->after motion shown as two static stills. May already have a 'See how it works' video — pivot angle to placement if so. Read getcadence.uk.md.",
    updated: "2026-07-04"
  },
  {
    id: "grantvox",
    name: "Grantvox",
    handle: "",
    platform: "other",
    origin: "Homepage read — throughline funnel",
    productUrl: "https://www.grantvox.com",
    postUrl: "",
    profileUrl: "",
    status: "read_ready",
    nextAction: "Find the poster/contact, comment value-first, then DM the read",
    temp: "warm",
    value: null,
    tags: ["saas", "ai", "nonprofit", "grant-writing"],
    thread: [
      { date: "2026-07-04", dir: "out", channel: "dm", text: "[DRAFT] hey — ran grantvox through the 7-second test. your positioning is razor sharp — 'built for grants, not a chatbot' and 'every feature exists because funders require it, not because it makes a good demo' is a genuinely great line.\n\nquick non-video note: those collapsed FAQ answers (esp. the data-security one) — i'd surface at least that one inline, your buyer wants it without a click.\n\nthe real thing: your product is a sequence — paste RFP -> 8 sections to spec -> export .docx. that flow is what beats chatgpt, but it's all text right now and 'see how it works' has nothing to watch behind it. your buyer half-suspects this is a chatgpt wrapper; watching a section come out to word count kills that faster than any table.\n\nthat's what i make — short explainers for software like this. i'd take that dashboard mockup you already have and let it move. happy to show a couple examples. either way, strong product." }
    ],
    notes: "AI grant-draft tool for small/mid nonprofits (8 sections, .docx export). Verdict PASSES. Razor-sharp positioning; 'See how it works' button has nothing behind it, buyer suspects a ChatGPT wrapper. Read grantvox.com.md.",
    updated: "2026-07-04"
  },
  {
    id: "joshapproved",
    name: "Josh Approved",
    handle: "",
    platform: "other",
    origin: "Homepage read — throughline funnel",
    productUrl: "https://joshapproved.com",
    postUrl: "",
    profileUrl: "",
    status: "read_ready",
    nextAction: "Find the poster/contact (Josh), comment value-first, then DM the read",
    temp: "warm",
    value: null,
    tags: ["apps", "privacy", "indie", "utility", "pay-what-you-want"],
    thread: [
      { date: "2026-07-04", dir: "out", channel: "dm", text: "[DRAFT] hey josh — did a quick 7-second read of joshapproved.\n\nthe positioning is genuinely great — \"apps that do one thing and leave you alone\" and \"the whole app is the whole app\" is the cleanest anti-SaaS pitch i've seen in a while.\n\nsmall note: the apps section is five things all weighted equal — i'd let one hero (the grocery list, real-time shared link is the coolest bit) breathe so people have an obvious \"start here.\"\n\nbut the real thing: your whole brand is a trust promise — \"ciphertext i can't read,\" \"read the code yourself\" — and all of it is invisible by nature. a stranger can only read you asserting it, never see it. a ~30-60s clip of two phones syncing one grocery list live + a \"nothing here i can even read\" beat turns the promise into something people watch happen. for pay-what-you-want, that's what converts.\n\nthat's what i make — short brand-matched explainers. happy to show a couple examples. either way, cool stuff." }
    ],
    notes: "One-person studio shipping privacy-first utility apps, pay-what-you-want. Verdict PASSES. Whole brand is an invisible trust promise; real-time shared grocery sync is the most demo-able feature. Read joshapproved.com.md.",
    updated: "2026-07-04"
  },
  {
    id: "precisiontrader",
    name: "PrecisionTrader",
    handle: "",
    platform: "other",
    origin: "Homepage read — throughline funnel",
    productUrl: "https://www.precisiontrader.tech/landing",
    postUrl: "",
    profileUrl: "",
    status: "read_ready",
    nextAction: "Find the poster/contact, comment value-first, then DM the read",
    temp: "warm",
    value: null,
    tags: ["saas", "trading", "fintech", "discipline"],
    thread: [
      { date: "2026-07-04", dir: "out", channel: "dm", text: "[DRAFT] hey — ran precisiontrader through the 7-sec test. your messaging is sharp — \"you know your plan, you just can't follow it\" is one of the best trader-pain lines i've seen, and \"one prevented mistake pays for your subscription\" is great.\n\nsmall non-video note: the middle stacks a lot of near-identical headers (execute without friction / stay within your plan / focus on execution) — cut one or two so the strong lines land.\n\nreal thing: your whole magic is in that Trading Rules screen — the Enforce toggle, the lockout, the 'unlocks 4:00pm' cooldown so you can't override yourself. right now it's a static shot a trader has to decode, and your buyer's real question is \"will this actually stop me when i want to revenge-trade?\" — which only gets answered by seeing it fire.\n\na ~60s clip of that loop (set loss limit -> hit it -> locked out -> cooldown ticking) sells the trust in one watch. that's what i make — short brand-matched explainers. happy to show a couple examples. either way, strong product." }
    ],
    notes: "Trading app that auto-enforces your risk rules (discipline-as-software, TradeStation). Verdict PASSES. Killer pain headline; the enforcement mechanic is a static screenshot. May already have a demo video — pivot angle if it shows the loop firing. Read precisiontrader.tech.md.",
    updated: "2026-07-04"
  },
  {
    id: "withcapsule",
    name: "Capsule",
    handle: "",
    platform: "other",
    origin: "Homepage read — throughline funnel",
    productUrl: "https://withcapsule.dev",
    postUrl: "",
    profileUrl: "",
    status: "read_ready",
    nextAction: "Find the poster/contact, comment value-first, then DM the read",
    temp: "warm",
    value: null,
    tags: ["developer-tools", "file-transfer", "privacy", "cli"],
    thread: [
      { date: "2026-07-04", dir: "out", channel: "dm", text: "[DRAFT] hey — capsule passes the 7-second test clean. 'send files. no accounts.' + that curl one-liner + browser-side encryption = a dev gets it instantly. tasteful tool.\n\none thing: your whole magic is *speed* — drag, get a link + QR, self-destructs in an hour. but speed is a feeling, and the static phone mockups can't show it. they show the screens, not the 3-second 'oh that was easy.'\n\na tiny 10-15s loop (drop -> link + QR pops -> timer -> gone) would sell the whole thing at the speed the tool actually works. practice what you preach.\n\nthat's what i make — short explainers for software like this. happy to just show you a couple, no pitch. either way, love the curl support." }
    ],
    notes: "Free anonymous browser/CLI/curl file-transfer, files auto-delete after an hour. Verdict PASSES. The whole magic is speed/ephemerality — a feeling static mockups can't show. Read withcapsule.dev.md.",
    updated: "2026-07-04"
  },
  {
    id: "alterwork",
    name: "Alterwork",
    handle: "",
    platform: "other",
    origin: "Homepage read — throughline funnel",
    productUrl: "https://alterwork.com",
    postUrl: "",
    profileUrl: "",
    status: "read_ready",
    nextAction: "Find the poster/contact, comment value-first, then DM the read",
    temp: "warm",
    value: null,
    tags: ["saas", "ai", "jobs", "careers", "matching"],
    thread: [
      { date: "2026-07-04", dir: "out", channel: "dm", text: "[DRAFT] hey — ran alterwork through the quick homepage test. the '3,759 jobs tracked - updated daily' line is great and the matching product underneath (roles + real pay bands + which platforms hire you) is genuinely smart.\n\nbut the hero — 'Your guide to work in the age of AI' — reads like every AI-career newsletter in 7 seconds. the thing that'd actually hook people (see your matches, see the pay) is buried below the fold and behind a click. the best part of your product is the part nobody sees until they've committed.\n\nsmall fix: your own lower headline, 'see which AI jobs you qualify for + what they pay,' is way sharper than the top one — promote it.\n\nbigger fix: a ~60s video up top showing the loop — pick a role, watch the match + $28-90/hr + platforms appear — delivers the aha at the speed of the headline. that's what i make; happy to show a couple examples. either way, cool product." }
    ],
    notes: "Job board + matching for AI-native roles (real pay bands, which platforms hire you). Verdict BORDERLINE. Sloganish hero; the matching payoff is below the fold and behind a click. Read alterwork.com.md.",
    updated: "2026-07-04"
  },
  {
    id: "squirrelit",
    name: "Squirrel It",
    handle: "",
    platform: "other",
    origin: "Homepage read — throughline funnel",
    productUrl: "https://squirrelit.app",
    postUrl: "",
    profileUrl: "",
    status: "read_ready",
    nextAction: "Find the poster/contact, comment value-first, then DM the read",
    temp: "warm",
    value: null,
    tags: ["saas", "ai", "bookmarking", "search"],
    thread: [
      { date: "2026-07-04", dir: "out", channel: "dm", text: "[DRAFT] hey — quick honest read on squirrel it.\n\n\"stop re-googling things you already found\" is a great headline, and the squirrel mascot's charming. good taste.\n\nbut here's the thing: your headline nails the pain, the page never *shows* the payoff. the magic is a sequence — save a messy thread -> it summarizes -> you ask a question -> sourced answer comes back. that 'ask it' moment is your whole edge over pocket/raindrop, and it's invisible until someone clicks the demo. someone who's already tried a save-later app has no reason to think you're different.\n\na ~60s video plays that whole loop at the speed of your headline — and you could let the squirrel carry it (stashing acorns = saving, digging the right one back up = querying), so it feels like your brand.\n\nthat's what i make — short brand-matched explainers. happy to show a couple examples. either way, cool product." }
    ],
    notes: "Bookmarking tool that summarizes + lets you ask questions across your stash for sourced answers. Verdict BORDERLINE. Great pain headline, but the 'ask it -> sourced answer' payoff is invisible behind a demo button. Read squirrelit.app.md.",
    updated: "2026-07-04"
  },
  {
    id: "koalasync",
    name: "KoalaSync",
    handle: "",
    platform: "other",
    origin: "Homepage read — throughline funnel",
    productUrl: "https://sync.koalastuff.net",
    postUrl: "",
    profileUrl: "",
    status: "read_ready",
    nextAction: "Find the poster/contact, comment value-first, then DM the read",
    temp: "warm",
    value: null,
    tags: ["browser-extension", "open-source", "watch-together", "streaming"],
    thread: [
      { date: "2026-07-04", dir: "out", channel: "dm", text: "[DRAFT] hey — ran koalasync through the 7-second test. it's clear and charming — the koala juggling tabs is great, and \"one pauses, everyone pauses\" + the RAM-only privacy angle are strong hooks.\n\nquick non-video note: your headline \"Watch Together.Sync Perfectly.\" is missing a space after the period, reads a touch broken.\n\nreal thing though: your whole magic is a live sequence — someone scrubs, everyone jumps to the same millisecond, next episode auto-holds. that happens in motion, but the page proves it with a static UI mockup. it shows the feature exists, it doesn't let a stranger *feel* it just works — which is the whole sell for a sync tool. bet you get \"but does it really stay in sync?\" a lot.\n\na ~60s video with two windows side by side — one scrubs, the other snaps to it — sells the reliability instantly. that's what i make, short brand-matched explainers. happy to show a couple examples. either way, cool project." }
    ],
    notes: "Free open-source extension that syncs Netflix/YouTube/Twitch/Jellyfin/Emby playback for remote watch parties. Verdict BORDERLINE. Live multi-person sync sold as a static UI mockup. Also has a headline spacing bug. Read sync.koalastuff.net.md.",
    updated: "2026-07-04"
  },
  {
    id: "synthetic-ai",
    name: "Synthetic",
    handle: "",
    platform: "other",
    origin: "Homepage read — throughline funnel",
    productUrl: "https://synthetic.ai",
    postUrl: "",
    profileUrl: "",
    status: "read_ready",
    nextAction: "Find the poster/contact, comment value-first, then DM the read",
    temp: "warm",
    value: null,
    tags: ["saas", "ai", "accounting", "bookkeeping", "pre-launch"],
    thread: [
      { date: "2026-07-04", dir: "out", channel: "dm", text: "[DRAFT] hey — quick read on synthetic. the writing's sharp ('not a tool you learn, not a person you hire' is great) so i'll skip to the one thing.\n\nyou're waitlist-only, so your demo right now is the site, not the product. and accounting is a pure trust buy — you're asking founders to connect their bank, payroll and email to an autonomous agent nobody's ever watched work. 'come back when it's done' reads as either magic or vapor.\n\nyour magic is a sequence anyway — connect -> agent reads the business -> reconciles -> clean accrual books. that's born to be watched, not read. a ~60s video showing the agent actually working basically becomes your demo pre-launch.\n\nthat's what i make — short brand-matched explainers. happy to just show you a couple, no pitch. either way, cool product." }
    ],
    notes: "AI agent that does a startup's bookkeeping end to end. Verdict BORDERLINE. Pre-launch/waitlist, pure trust buy (connect bank+payroll+email to an autonomous agent), the work is invisible. Read synthetic.ai.md.",
    updated: "2026-07-04"
  },
  {
    id: "trykanso",
    name: "Kanso",
    handle: "",
    platform: "other",
    origin: "Homepage read — throughline funnel (roast thread)",
    productUrl: "https://trykanso.app",
    postUrl: "",
    profileUrl: "",
    status: "read_ready",
    nextAction: "Find the poster/contact, comment value-first, then DM the read",
    temp: "warm",
    value: null,
    tags: ["saas", "career", "assessment", "coaching"],
    thread: [
      { date: "2026-07-04", dir: "out", channel: "dm", text: "[DRAFT] hey — ran kanso through the 7-second read. the core mechanic is sharp: \"when you can't protect everything, you find out what you'd actually defend\" is a real insight, and the MBTI/DiSC positioning is clean.\n\nquick non-video note: the hero headline does a lot — i'd lead with the punchier \"MBTI tells you your personality, Kanso tells you what you'd give up\" line instead.\n\nreal thing though: your product is a *feeling* — that moment you run out of credits with things still unprotected. that's the aha, but right now it lives in a paragraph and a static screenshot, so people read about the tension instead of feeling it. a ~60s video could act out the credit spend hitting zero — sells it in one watch better than any sentence.\n\nthat's what i make — short brand-matched explainers. happy to show a couple examples. either way, cool product." }
    ],
    notes: "Career assessment — spend fixed credits on your work non-negotiables, get a trade-off profile + AI coach. Verdict BORDERLINE. The aha is an emotional beat (credits running dry) shown as a static screenshot. Read trykanso.app.md.",
    updated: "2026-07-04"
  },
  {
    id: "trailworm-marcusai",
    name: "Marcus AI (Trailworm)",
    handle: "",
    platform: "other",
    origin: "Homepage read — throughline funnel",
    productUrl: "https://trailworm.com/marcusai/",
    postUrl: "",
    profileUrl: "",
    status: "read_ready",
    nextAction: "Find the poster/contact, comment value-first, then DM the read",
    temp: "warm",
    value: null,
    tags: ["app", "ai", "habit-tracker", "pre-launch", "wellness"],
    thread: [
      { date: "2026-07-04", dir: "out", channel: "dm", text: "[DRAFT] hey — quick read on marcus ai. \"the habit tracker that listens back\" is a great hook, and the whole anti-scoreboard voice (\"streaks that forgive\") is a real point of view.\n\none thing though: your wedge is the *conversation* with a philosopher — but the page only shows the habits list and analytics dashboard, the commodity tracker half. i never actually get to see Marcus talk back, which is the whole magic. a static chat screenshot can't carry that feeling.\n\nthat's what a ~40s video nails — one slip, one philosopher's reply, the 'oh' moment. and pre-launch, that clip basically becomes your demo.\n\nthat's the thing i make — short brand-matched explainers. happy to show a couple examples. either way, lovely product." }
    ],
    notes: "Habit tracker where you talk through a slip with an AI council of 8 philosophers. Verdict BORDERLINE. Pre-launch on Android. Leads with 'habit tracker' (commodity); the conversation wedge is never shown. Read trailworm.com.md.",
    updated: "2026-07-04"
  },
  {
    id: "halfquill",
    name: "Half Quill",
    handle: "",
    platform: "other",
    origin: "Homepage read — throughline funnel",
    productUrl: "https://halfquill.com",
    postUrl: "",
    profileUrl: "",
    status: "read_ready",
    nextAction: "Find the poster/contact, comment value-first, then DM the read",
    temp: "warm",
    value: null,
    tags: ["app", "writing", "community", "creative"],
    thread: [
      { date: "2026-07-04", dir: "out", channel: "dm", text: "[DRAFT] hey — quick honest read on half quill. the concept's lovely and the writing has taste — \"a few words from you, a few words from a stranger, every day a story grows\" is a great line, and dropping that live tassirin story on the page was a smart move.\n\nsmall note: the actual mechanic (read -> finish -> spark, can't write twice in a row) doesn't land til a few headings down. i'd pull that 1-2-3 up top.\n\nbigger thing: your whole magic is a loop over *time* — stranger writes, you continue, tomorrow someone picks up yours. a homepage can only show a frozen snapshot, so the hand-off (\"the surprise is the whole point\") is exactly what static text can't make me feel. a ~60s video shows the relay actually happening — take that tassirin story that's already there and let it grow section by section.\n\nthat's what i make — short explainers for products like this. happy to show a couple examples. either way, charming project. lmk" }
    ],
    notes: "Collaborative daily writing ritual — strangers build stories one section at a time. Verdict BORDERLINE. The magic is a relay over time; a homepage can only show a frozen snapshot. Read halfquill.com.md.",
    updated: "2026-07-04"
  },
  {
    id: "wearetheoutdoorindustry",
    name: "Basecamp Outdoor",
    handle: "",
    platform: "other",
    origin: "Homepage read — throughline funnel",
    productUrl: "https://www.wearetheoutdoorindustry.com",
    postUrl: "",
    profileUrl: "",
    status: "read_ready",
    nextAction: "Find the poster/contact, comment value-first, then DM the read",
    temp: "warm",
    value: null,
    tags: ["community", "jobs", "careers", "outdoor"],
    thread: [
      { date: "2026-07-04", dir: "out", channel: "dm", text: "[DRAFT] hey, ran basecamp through the 7-second test. the voice is a blast, \"cheat code for your career,\" \"networking swagger,\" and that campfire logo already says \"land your dream job\" better than your \"A Place You Belong\" hero does. i'd pull that line up top so a stranger instantly gets what it is.\n\nbigger thing though: basecamp is really six things stacked (newsletter, podcast, coaching, office hours, job board, community), all good, but a first-timer has to scroll and read every section to figure out what joining actually gets them. bundles are brutal to explain with headings. i'd bet people bounce before it clicks.\n\na ~60s video pinned up top shows the whole loop in one motion, and for a community product, real faces + energy sell belonging way harder than the word does. you've already got the lifestyle shots and that Jessica-got-hired testimonial to build from.\n\nthat's what i make, short brand-matched explainers. happy to show you a couple examples. either way, cool community." }
    ],
    notes: "Basecamp Outdoor — community + job network for the outdoor industry. Verdict BORDERLINE. Great voice; the offer is a six-thing bundle that's hard to explain with headings. Already has an embedded video — verify it explains the whole bundle. Read wearetheoutdoorindustry.com.md.",
    updated: "2026-07-04"
  },
  {
    id: "taxvant",
    name: "Taxvant",
    handle: "",
    platform: "other",
    origin: "Homepage read — throughline funnel",
    productUrl: "https://taxvant.com",
    postUrl: "",
    profileUrl: "",
    status: "read_ready",
    nextAction: "Find the poster/contact, comment value-first, then DM the read",
    temp: "cold",
    value: null,
    tags: ["saas", "fintech", "tax", "estimator"],
    thread: [
      { date: "2026-07-04", dir: "out", channel: "dm", text: "[DRAFT] hey — quick honest read on taxvant. the copy's sharp ('too late to reduce them in april' is a great hook, and the IRMAA/ACA cliff stuff shows you get the pain). but here's the catch: your product is deeply visual — a bill updating as you drag a slider, Ranger charting cliffs across incomes — and none of that's shown on the page. it's all words. a tool built to make invisible tax cliffs *visible* is currently invisible itself, so people bounce wondering 'is this just another calculator?' a ~60s video from your actual UI — enter numbers, drag the what-if, watch it drop — closes that in one watch. that's what i make, short explainers built from your screens. happy to show a couple examples, no pressure. cool product either way." }
    ],
    notes: "Self-serve tax estimator with what-if modeling (Roth conversions, cliffs). Verdict FAILS. Entire page is words describing a fundamentally visual product — not a single screenshot. Read taxvant.com.md.",
    updated: "2026-07-04"
  },
  {
    id: "unsaid-quest",
    name: "Unsaid",
    handle: "",
    platform: "other",
    origin: "Homepage read — throughline funnel",
    productUrl: "https://unsaid.quest",
    postUrl: "",
    profileUrl: "",
    status: "read_ready",
    nextAction: "Find the poster/contact, comment value-first (in French/tu), then DM the read",
    temp: "cold",
    value: null,
    tags: ["app", "ai", "chat-analysis", "french", "curiosity"],
    thread: [
      { date: "2026-07-04", dir: "out", channel: "dm", text: "[DRAFT] hey — quick 7-second read on unsaid. the hero writing is genuinely good (\"entre deux phrases se logent des emotions refoulees...\") and the chibi-with-lightbulb is charming + on-theme.\n\nbut the whole product is invisible — the payoff is a report nobody can see. you even have a 'voir un exemple de rapport' button, so you know the report IS the magic... yet it never shows on the page. and unsaid is a pure curiosity buy — it lives on \"what would it say about MY chats?\" right now there's nothing to actually be curious about seeing.\n\na ~60s video pinned up top could run the loop — import -> read between the lines -> reveal one spicy insight — and let that lightbulb mascot do the explaining. flips people from \"cute\" to \"i need to run mine.\"\n\nthat's what i make, short brand-matched explainers. happy to just show a couple examples, no pitch. cool concept either way." }
    ],
    notes: "AI that analyzes your WhatsApp/Discord/Messenger chats to reveal hidden dynamics. Verdict FAILS. French-speaking audience (DM in tu register). Pure curiosity buy but the report payoff never shows on the page. Read unsaid.quest.md.",
    updated: "2026-07-04"
  },

  // ===================================================================
  // TIER 4 — dm_sent follow-ups (warm leads awaiting reply)
  // ===================================================================
  {
    id: "jtysonwilliams",
    name: "jtysonwilliams",
    handle: "jtysonwilliams",
    platform: "reddit",
    origin: "Warm lead",
    productUrl: "",
    postUrl: "",
    profileUrl: "https://reddit.com/user/jtysonwilliams",
    status: "dm_sent",
    nextAction: "Follow up if no reply",
    temp: "warm",
    value: null,
    tags: ["warm-lead", "follow-up"],
    thread: [
      { date: "2026-07-04", dir: "out", channel: "dm", text: "DM written and sent earlier." }
    ],
    notes: "DM written earlier.",
    updated: "2026-07-04"
  },
  {
    id: "juggernautneat5982",
    name: "JuggernautNeat5982",
    handle: "JuggernautNeat5982",
    platform: "reddit",
    origin: "Warm lead",
    productUrl: "",
    postUrl: "",
    profileUrl: "https://reddit.com/user/JuggernautNeat5982",
    status: "dm_sent",
    nextAction: "Follow up if no reply",
    temp: "warm",
    value: null,
    tags: ["warm-lead", "follow-up"],
    thread: [
      { date: "2026-07-04", dir: "out", channel: "dm", text: "DM written and sent earlier." }
    ],
    notes: "DM written earlier.",
    updated: "2026-07-04"
  },
  {
    id: "equal-necessary1141",
    name: "Equal_Necessary1141",
    handle: "Equal_Necessary1141",
    platform: "reddit",
    origin: "Warm lead",
    productUrl: "",
    postUrl: "",
    profileUrl: "https://reddit.com/user/Equal_Necessary1141",
    status: "dm_sent",
    nextAction: "Follow up if no reply",
    temp: "warm",
    value: null,
    tags: ["warm-lead", "follow-up"],
    thread: [
      { date: "2026-07-04", dir: "out", channel: "dm", text: "DM written and sent earlier." }
    ],
    notes: "DM written earlier.",
    updated: "2026-07-04"
  }
];
