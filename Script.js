
/* ─────────────────────────────────────────────────────────
   CONFIG — Edit API_KEY to enable live news
───────────────────────────────────────────────────────── */
const CFG = {
    API_KEY: "4d9c30623710437795e4ec0712cf2f79",   // ← Replace with your NewsAPI.org key
    BASE_HL: "https://newsapi.org/v2/top-headlines",
    BASE_EVR: "https://newsapi.org/v2/everything",
    PAGE_SZ: 12,
    IMG_FALL: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80",

    // Trending tags shown in the trending bar
    TRENDS: [
        "IPL 2025", "AI Tools", "Budget 2025", "Bollywood", "Bitcoin",
        "ChatGPT", "India vs Pakistan", "Stock Market",
        "Online Earning", "Startup India", "Electric Car", "World Cup 2025"
    ],

    // Category display names
    CAT_LABELS: {
        general: "Latest Headlines", technology: "💻 Technology",
        sports: "⚽ Sports", business: "💼 Business",
        entertainment: "🎬 Entertainment", health: "🏥 Health", science: "🔬 Science"
    }
};

/* ─────────────────────────────────────────────────────────
   APP STATE
───────────────────────────────────────────────────────── */
const S = {
    country: "in",
    cat: "general",
    query: "",
    page: 1,
    total: 0,
    arts: [],      // loaded articles
    dark: false,
    demo: false    // true = showing sample data
};

/* ─────────────────────────────────────────────────────────
   DEMO / SAMPLE ARTICLES (shown when no API key)
───────────────────────────────────────────────────────── */
const DEMO = [
    {
        title: "India's AI Revolution: How Startups Are Reshaping the Tech Landscape",
        description: "Indian startups are leveraging AI to solve unique challenges in agriculture, healthcare, and financial inclusion — positioning India as a global AI hub.",
        content: "India's technology sector is witnessing an unprecedented surge in AI-driven innovation. From Bengaluru's corridors to Mumbai's fintech districts, startups are building solutions that address uniquely Indian challenges while competing globally.\n\nInvestments in AI startups crossed $2.5 billion in 2024, with healthcare diagnostics, agricultural optimization, and vernacular language processing leading the charge. Key players like Krutrim and Sarvam AI are building India-specific large language models that understand the country's rich linguistic diversity.",
        urlToImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
        source: { name: "TechIndia Today" }, publishedAt: new Date().toISOString(),
        author: "Priya Sharma", url: "https://newsapi.org", category: "technology"
    },
    {
        title: "IPL 2025 Final: Mumbai Indians vs CSK — An Epic Showdown",
        description: "The cricketing world holds its breath as two titans clash in one of the most memorable IPL finals in the tournament's history.",
        content: "The Wankhede Stadium roared as 33,000 fans packed the stands for what analysts call 'the match of the decade.' Mumbai Indians, chasing a record-breaking season, faced CSK in a contest with everything — last-over drama, stunning catches, and breathtaking batting.\n\nMS Dhoni, defying age once again, walked in at the death overs and produced a cameo that will be replayed for generations. The chase of 189 came down to the final ball.",
        urlToImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80",
        source: { name: "Cricket Buzz" }, publishedAt: new Date(Date.now() - 3600000).toISOString(),
        author: "Rohit Verma", url: "https://newsapi.org", category: "sports"
    },
    {
        title: "Union Budget 2025: Major Income Tax Relief for Middle Class",
        description: "Finance Minister announces sweeping changes to the income tax structure, benefiting over 3 crore taxpayers with higher exemption limits.",
        content: "In a significant relief to India's middle class, the Union Budget 2025 raised the basic income tax exemption limit to ₹5 lakh under the new tax regime, while restructuring slabs to reduce the burden on salaried employees.\n\nThe announcement was met with immediate positive market response, with the Sensex rising 800 points in early trade. Economists noted that the move could inject significant purchasing power into the economy.",
        urlToImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
        source: { name: "Economic Times" }, publishedAt: new Date(Date.now() - 7200000).toISOString(),
        author: "Deepa Nair", url: "https://newsapi.org", category: "business"
    },
    {
        title: "Bollywood Blockbuster Shatters Box Office Records: ₹400 Cr Opening Weekend",
        description: "The most anticipated Bollywood release of 2025 broke every opening weekend record, collecting ₹400 crore globally in just three days.",
        content: "Cinema halls across India erupted in celebration as the newest mega-production shattered all previous opening weekend records. With star-studded performances, breathtaking VFX, and an emotionally resonant story, the film unified audiences across demographics.\n\nOverseas collections were equally impressive, with particularly strong numbers from the UAE, UK, and North American markets.",
        urlToImage: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
        source: { name: "Bollywood Hungama" }, publishedAt: new Date(Date.now() - 10800000).toISOString(),
        author: "Kavya Patel", url: "https://newsapi.org", category: "entertainment"
    },
    {
        title: "ISRO Mangalyaan 3: India's Ambitious Mission to Land a Rover on Mars",
        description: "India's space agency unveiled its third Mars mission — Mangalyaan 3 — incorporating AI navigation and targeting a 2028 landing.",
        content: "ISRO officially announced its third Mars mission, building on the extraordinary legacy of Mangalyaan 1 and leveraging lessons from the Chandrayaan programme. The mission, estimated at ₹1,800 crore, exemplifies ISRO's reputation for doing more with less.\n\nThe rover will carry six scientific instruments designed to study Martian geology, search for biosignatures, and test in-situ resource utilization technologies.",
        urlToImage: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80",
        source: { name: "Space India" }, publishedAt: new Date(Date.now() - 14400000).toISOString(),
        author: "Dr. Arun Kumar", url: "https://newsapi.org", category: "science"
    },
    {
        title: "AIIMS Researchers Develop Breakthrough Cancer Immunotherapy for Indian Patients",
        description: "Scientists at AIIMS Delhi developed a CAR-T cell therapy tailored for South Asian populations, showing 78% remission rates in Phase II trials.",
        content: "In a landmark achievement for Indian medical science, researchers at AIIMS have announced results from their Phase II clinical trials of a locally developed CAR-T cell therapy.\n\nUnlike imported therapies priced at ₹3–4 crore per patient, this indigenously developed treatment targets genetic markers more prevalent in South Asian populations and is estimated to cost around ₹30–40 lakh.",
        urlToImage: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80",
        source: { name: "Health Today India" }, publishedAt: new Date(Date.now() - 18000000).toISOString(),
        author: "Dr. Meena Subramaniam", url: "https://newsapi.org", category: "health"
    },
    {
        title: "Electric Vehicle Boom: India on Track to Become World's 2nd Largest EV Market",
        description: "With subsidies, expanding charging infrastructure and falling battery prices, India is set to overtake Europe in EV sales by 2027.",
        content: "India's EV revolution is accelerating faster than projections. EV penetration has crossed 12% of total vehicle sales for two- and three-wheelers, while the passenger car segment is rapidly catching up.\n\nThe FAME III subsidy scheme, combined with state-level incentives, has created a compelling value proposition. Charging infrastructure has expanded to over 25,000 public stations, with a target of 100,000 by end of 2026.",
        urlToImage: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
        source: { name: "AutoIndia" }, publishedAt: new Date(Date.now() - 21600000).toISOString(),
        author: "Vikram Singh", url: "https://newsapi.org", category: "business"
    },
    {
        title: "ChatGPT vs Gemini vs Claude: Which AI Wins for Indian Users in 2025?",
        description: "A comprehensive comparison of three leading AI assistants tested across Hindi, regional languages, coding, and everyday Indian use cases.",
        content: "As AI assistants become embedded in daily life, choosing the right one matters. We tested GPT, Gemini, and Claude across 50 tasks specifically relevant to Indian users.\n\nFor Hindi and regional language queries, Gemini showed a clear edge. For coding, Claude and ChatGPT traded blows. For creative writing and nuanced reasoning, Claude consistently produced the most polished output.",
        urlToImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
        source: { name: "Digital India Review" }, publishedAt: new Date(Date.now() - 25200000).toISOString(),
        author: "Ankit Sharma", url: "https://newsapi.org", category: "technology"
    },
    {
        title: "Nifty 50 Crosses 26,000: What It Means for Your Investment Portfolio",
        description: "India's benchmark index reaches a new milestone amid strong corporate earnings, FII inflows, and economic growth optimism.",
        content: "The Nifty 50 crossed the psychologically significant 26,000 mark during intraday trading, reflecting sustained optimism among domestic and foreign investors.\n\nForeign institutional investors have net purchased over ₹45,000 crore worth of Indian equities in the past two months — a strong vote of confidence in India's macroeconomic fundamentals.",
        urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
        source: { name: "Market Pulse" }, publishedAt: new Date(Date.now() - 28800000).toISOString(),
        author: "Rajan Mehta", url: "https://newsapi.org", category: "business"
    },
    {
        title: "India Wins Thomas Cup 2025: Historic 3rd Consecutive Badminton Title",
        description: "The Indian men's badminton team creates history defeating Indonesia in a thrilling final, cementing dominance in world team badminton.",
        content: "Bangkok erupted as India's badminton team scripted history, defeating hosts Indonesia 3-2 in one of the most dramatic Thomas Cup finals in memory.\n\nLakshya Sen's singles rubber proved decisive, as he overturned a first-game deficit to win in three gruelling sets. The victory cements India as the dominant force in world team badminton.",
        urlToImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
        source: { name: "Sports Today" }, publishedAt: new Date(Date.now() - 32400000).toISOString(),
        author: "Suresh Pillai", url: "https://newsapi.org", category: "sports"
    },
    {
        title: "Work From Home Jobs 2025: Top Companies Hiring Remote Workers in India",
        description: "Remote work opportunities continue growing in India — these companies offer competitive salaries and flexible arrangements for skilled professionals.",
        content: "The remote work revolution shows no signs of slowing. A growing number of global and Indian companies are actively hiring for fully remote positions, offering competitive compensation.\n\nTop sectors include software development, content creation, digital marketing, data analysis, and UX design. Companies like Wipro, Infosys BPM, Amazon, and funded startups have significantly expanded remote hiring.",
        urlToImage: "https://images.unsplash.com/photo-1521898284481-a5ec348cb555?w=800&q=80",
        source: { name: "Career India" }, publishedAt: new Date(Date.now() - 36000000).toISOString(),
        author: "Pooja Bansal", url: "https://newsapi.org", category: "general"
    },
    {
        title: "G20 2025: India Champions Climate Finance and Digital Public Infrastructure",
        description: "India's G20 presidency centers climate finance reform and advocates for its DPI model — Aadhaar, UPI, ONDC — as a global template.",
        content: "India's G20 presidency placed climate finance and digital inclusion at the center of multilateral discussions, with the Prime Minister using the platform to champion India's experience with Aadhaar, UPI, and ONDC as replicable models for the developing world.\n\nThe summit communiqué includes the strongest language yet on phasing out fossil fuel subsidies and a commitment to triple renewable energy capacity by 2030.",
        urlToImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        source: { name: "India Global Times" }, publishedAt: new Date(Date.now() - 39600000).toISOString(),
        author: "Aisha Nair", url: "https://newsapi.org", category: "general"
    }
];

/* ─────────────────────────────────────────────────────────
   INIT
───────────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
    // Load saved API key
    const savedKey = localStorage.getItem("nfp_apikey");
    if (savedKey && savedKey !== "YOUR_API_KEY_HERE") CFG.API_KEY = savedKey;

    // Load dark mode preference
    if (localStorage.getItem("nfp_dark") === "true") setDark(true);

    // Render trending tags
    buildTrending();

    // Build skeleton cards
    buildSkeletons(6);

    // Fetch or demo
    fetchNews();

    // Search on Enter
    document.getElementById("srch").addEventListener("keydown", e => {
        if (e.key === "Enter") doSearch();
    });

    // Scroll-to-top visibility
    window.addEventListener("scroll", () => {
        document.getElementById("s2t").classList.toggle("vis", window.scrollY > 400);
    }, { passive: true });

    // Modal backdrop click
    document.getElementById("modal").addEventListener("click", e => {
        if (e.target.id === "modal") closeModal();
    });
});

/* ─────────────────────────────────────────────────────────
   TRENDING
───────────────────────────────────────────────────────── */
function buildTrending() {
    const c = document.getElementById("trend-tags");
    CFG.TRENDS.forEach(t => {
        const b = document.createElement("button");
        b.className = "tag";
        b.textContent = t;
        b.onclick = () => clickTrend(t, b);
        c.appendChild(b);
    });
}

function clickTrend(kw, btn) {
    // Reset other tags
    document.querySelectorAll(".tag").forEach(t => t.classList.remove("on"));
    btn.classList.add("on");
    S.query = kw;
    document.getElementById("srch").value = kw;
    document.getElementById("sec-ttl").textContent = `🔍 "${kw}"`;
    S.demo ? renderDemo() : fetchNews();
}

/* ─────────────────────────────────────────────────────────
   FILTERS
───────────────────────────────────────────────────────── */
function setFilter(type, val) {
    S[type] = val;
    S.query = "";
    document.getElementById("srch").value = "";
    document.querySelectorAll(".tag").forEach(t => t.classList.remove("on"));

    // Update button active states
    document.querySelectorAll(`[data-t="${type}"]`).forEach(btn =>
        btn.classList.toggle("on", btn.dataset.v === val)
    );

    // Update section title
    if (type === "cat") {
        document.getElementById("sec-ttl").textContent = CFG.CAT_LABELS[val] || "Headlines";
    }

    fetchNews();
}

/* ─────────────────────────────────────────────────────────
   SEARCH
───────────────────────────────────────────────────────── */
function doSearch() {
    const v = document.getElementById("srch").value.trim();
    S.query = v;
    document.querySelectorAll(".tag").forEach(t => t.classList.remove("on"));
    document.getElementById("sec-ttl").textContent = v ? `🔍 "${v}"` : CFG.CAT_LABELS[S.cat];
    S.demo ? renderDemo() : fetchNews();
}

/* ─────────────────────────────────────────────────────────
   FETCH NEWS (live API)
───────────────────────────────────────────────────────── */
async function fetchNews(append = false) {
    if (!append) { S.arts = []; S.page = 1; showSkels(true); }

    // No API key → demo mode
    if (!CFG.API_KEY || CFG.API_KEY === "YOUR_API_KEY_HERE") {
        S.demo = true;
        document.getElementById("demo-bar").style.display = "block";
        setTimeout(() => { showSkels(false); renderDemo(); }, 700);
        return;
    }

    try {
        let url;
        if (S.query) {
            // Everything endpoint for keyword searches
            url = `${CFG.BASE_EVR}?q=${encodeURIComponent(S.query)}&language=en` +
                `&pageSize=${CFG.PAGE_SZ}&page=${S.page}&sortBy=publishedAt&apiKey=${CFG.API_KEY}`;
        } else {
            // Top headlines for country/category
            url = `${CFG.BASE_HL}?country=${S.country}&category=${S.cat}` +
                `&pageSize=${CFG.PAGE_SZ}&page=${S.page}&apiKey=${CFG.API_KEY}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        if (data.status !== "ok") throw new Error(data.message || data.code || "API error");

        S.total = data.totalResults || 0;
        const fresh = (data.articles || []).filter(a => a.title && a.title !== "[Removed]");

        S.arts = append ? [...S.arts, ...fresh] : fresh;
        showSkels(false);
        renderGrid(S.arts);
        updateCount();
        updateLoadMore();
        S.demo = false;

    } catch (err) {
        console.error("NewsAPI:", err.message);
        showSkels(false);

        // Key invalid → show error with link to fix
        if (/apiKey|401|invalid|disable/i.test(err.message)) {
            showErr(`Invalid or expired API key. <a href="javascript:void(0)" onclick="openModal()" style="color:var(--accent)">Update key</a> or switch to demo mode.`);
        } else {
            // Network/CORS → fall back to demo silently
            S.demo = true;
            document.getElementById("demo-bar").style.display = "block";
            renderDemo();
            toast("Network error — showing demo data");
        }
    }
}

/* ─────────────────────────────────────────────────────────
   RENDER DEMO DATA (with filters applied)
───────────────────────────────────────────────────────── */
function renderDemo() {
    let list = [...DEMO];

    // Filter by category
    if (S.cat && S.cat !== "general") {
        list = list.filter(a => a.category === S.cat);
    }

    // Filter by search query
    if (S.query) {
        const q = S.query.toLowerCase();
        list = list.filter(a =>
            (a.title || "").toLowerCase().includes(q) ||
            (a.description || "").toLowerCase().includes(q) ||
            (a.content || "").toLowerCase().includes(q)
        );
    }

    S.arts = list;
    S.total = list.length;
    renderGrid(list);
    updateCount();
    document.getElementById("lm-wrap").style.display = "none";
}

/* ─────────────────────────────────────────────────────────
   RENDER GRID
───────────────────────────────────────────────────────── */
function renderGrid(arts) {
    const grid = document.getElementById("grid");

    // Remove old cards only
    grid.querySelectorAll(".card").forEach(c => c.remove());

    // Handle states
    document.getElementById("nores").style.display = arts.length === 0 ? "block" : "none";
    document.getElementById("err").style.display = "none";
    document.getElementById("feed-ad").style.display = arts.length > 0 ? "block" : "none";

    if (arts.length === 0) return;

    arts.forEach((a, i) => {
        const card = makeCard(a, i);
        grid.appendChild(card);
    });
}

/* ─────────────────────────────────────────────────────────
   MAKE CARD
───────────────────────────────────────────────────────── */
function makeCard(a, idx) {
    const el = document.createElement("div");
    el.className = "card";
    el.setAttribute("data-i", idx);

    const cat = a.category || S.cat || "general";
    const catL = cat.charAt(0).toUpperCase() + cat.slice(1);
    const img = a.urlToImage || CFG.IMG_FALL;
    const src = a.source?.name || "Unknown";
    const time = relTime(a.publishedAt);

    el.innerHTML = `
    <div class="cimg">
      <img src="${esc(img)}" alt="${esc(a.title)}" loading="lazy"
           onerror="this.src='${CFG.IMG_FALL}'" />
      <span class="cbadge">${esc(catL)}</span>
    </div>
    <div class="cbody">
      <div class="cmeta">
        <span class="csrc">${esc(src)}</span>
        <span class="cdot">•</span>
        <span class="ctime">${time}</span>
      </div>
      <h3 class="ctitle">${esc(a.title || "")}</h3>
      <p class="cdesc">${esc(a.description || "No description available.")}</p>
      <div class="cfooter">
        <button class="rm-btn" onclick="openArt(${idx})">
          Read More
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
        <button class="shr-btn" onclick="shareArt(${idx})" title="Share article">🔗</button>
      </div>
    </div>`;

    return el;
}

/* ─────────────────────────────────────────────────────────
   OPEN FULL ARTICLE (SPA)
───────────────────────────────────────────────────────── */
function openArt(idx) {
    const a = S.arts[idx];
    if (!a) return;

    // Switch views
    document.getElementById("home").style.display = "none";
    document.getElementById("art-page").style.display = "block";
    window.scrollTo(0, 0);

    // Fill header
    const cat = a.category || S.cat || "general";
    document.getElementById("art-cat").textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    document.getElementById("art-title").textContent = a.title || "Untitled";
    document.getElementById("art-src").textContent = a.source?.name || "Unknown";
    document.getElementById("art-date").textContent = a.publishedAt
        ? new Date(a.publishedAt).toLocaleDateString("en-IN", { dateStyle: "long" }) : "";
    document.getElementById("art-auth").textContent = a.author ? `By ${a.author}` : "";

    // Image
    const imgEl = document.getElementById("art-img");
    imgEl.src = a.urlToImage || CFG.IMG_FALL;
    imgEl.alt = a.title || "";
    imgEl.style.display = "block";

    // Source link
    document.getElementById("art-url").href = a.url || "#";

    // Build body
    buildBody(a);

    // Update tab title
    document.title = `${a.title} — NewsFlowPro`;
}

/* ─────────────────────────────────────────────────────────
   BUILD ARTICLE BODY
───────────────────────────────────────────────────────── */
function buildBody(a) {
    const body = document.getElementById("art-body");
    body.innerHTML = "";

    // Lead (description)
    if (a.description) {
        const lead = document.createElement("p");
        lead.className = "art-lead";
        lead.textContent = a.description;
        body.appendChild(lead);
    }

    // Main content
    let content = (a.content || "").replace(/\[\+\d+ chars\]$/, "").trim();
    if (content) {
        content.split("\n").filter(p => p.trim().length > 20).forEach(para => {
            const p = document.createElement("p");
            p.textContent = para.trim();
            body.appendChild(p);
        });
    }

    // Note (NewsAPI free tier truncates content)
    const note = document.createElement("div");
    note.className = "art-notice";
    note.innerHTML = `<strong>ℹ️ Note:</strong> Full article content may be truncated by the API.
    Click <strong>"Read Full Article on Source Site"</strong> below for the complete story.`;
    body.appendChild(note);
}

/* ─────────────────────────────────────────────────────────
   GO HOME
───────────────────────────────────────────────────────── */
function goHome() {
    document.getElementById("art-page").style.display = "none";
    document.getElementById("home").style.display = "block";
    document.title = "NewsFlowPro — Breaking News, Latest Headlines";
    window.scrollTo(0, 0);
}

/* ─────────────────────────────────────────────────────────
   LOAD MORE
───────────────────────────────────────────────────────── */
function loadMore() { S.page++; fetchNews(true); }

function updateLoadMore() {
    const show = !S.demo && S.arts.length < S.total && S.total > 0;
    document.getElementById("lm-wrap").style.display = show ? "block" : "none";
}

/* ─────────────────────────────────────────────────────────
   SHARE
───────────────────────────────────────────────────────── */
function shareArt(idx) {
    const a = S.arts[idx];
    if (!a) return;
    if (navigator.share) {
        navigator.share({ title: a.title, text: a.description || "", url: a.url || location.href });
    } else {
        navigator.clipboard.writeText(a.url || location.href)
            .then(() => toast("Link copied! 🔗"))
            .catch(() => toast("Could not copy link"));
    }
}

/* ─────────────────────────────────────────────────────────
   DARK MODE
───────────────────────────────────────────────────────── */
function toggleDark() { setDark(!S.dark); }

function setDark(val) {
    S.dark = val;
    document.documentElement.setAttribute("data-theme", val ? "dark" : "");
    document.getElementById("sw").classList.toggle("on", val);
    document.getElementById("dk-ico").textContent = val ? "☀️" : "🌙";
    document.getElementById("dk-lbl").textContent = val ? "Light" : "Dark";
    localStorage.setItem("nfp_dark", val);
}

/* ─────────────────────────────────────────────────────────
   LOADING STATES
───────────────────────────────────────────────────────── */
function buildSkeletons(n) {
    const wrap = document.getElementById("skels");
    wrap.innerHTML = "";
    for (let i = 0; i < n; i++) {
        wrap.innerHTML += `
      <div class="skel-card">
        <div class="skel-img"></div>
        <div class="skel-body">
          <div class="skel-ln w50"></div>
          <div class="skel-ln w100"></div>
          <div class="skel-ln w70"></div>
          <div class="skel-ln w100"></div>
          <div class="skel-ln w50"></div>
        </div>
      </div>`;
    }
}

function showSkels(show) {
    document.getElementById("skels").style.display = show ? "grid" : "none";
    document.getElementById("err").style.display = "none";
    document.getElementById("nores").style.display = "none";
    if (show) {
        document.querySelectorAll(".card").forEach(c => c.remove());
        document.getElementById("feed-ad").style.display = "none";
        document.getElementById("lm-wrap").style.display = "none";
    }
}

function showErr(msg) {
    document.getElementById("err").style.display = "block";
    document.getElementById("err-msg").innerHTML = msg;
    document.getElementById("skels").style.display = "none";
}

/* ─────────────────────────────────────────────────────────
   API KEY MODAL
───────────────────────────────────────────────────────── */
function openModal() {
    document.getElementById("modal").classList.add("open");
    const ki = document.getElementById("key-inp");
    ki.value = (CFG.API_KEY && CFG.API_KEY !== "YOUR_API_KEY_HERE") ? CFG.API_KEY : "";
    ki.focus();
}

function closeModal() { document.getElementById("modal").classList.remove("open"); }

function saveKey() {
    const k = document.getElementById("key-inp").value.trim();
    if (!k) { toast("Please paste an API key first"); return; }
    CFG.API_KEY = k;
    localStorage.setItem("nfp_apikey", k);
    S.demo = false;
    document.getElementById("demo-bar").style.display = "none";
    closeModal();
    toast("API key saved! Loading live news… ✅");
    fetchNews();
}

/* Allow Enter key in modal input */
document.addEventListener("keydown", e => {
    if (e.key === "Enter" && document.getElementById("modal").classList.contains("open")) saveKey();
    if (e.key === "Escape") closeModal();
});

/* ─────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────── */
function updateCount() {
    const n = S.demo ? S.arts.length : S.total;
    document.getElementById("sec-cnt").textContent = n > 0 ? `${n.toLocaleString()} articles` : "";
}

function relTime(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    const diff = Math.floor((Date.now() - d) / 60000); // minutes
    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return d.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
}

function esc(s) {
    return String(s || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function toast(msg) {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(t._to);
    t._to = setTimeout(() => t.classList.remove("show"), 2800);
}

