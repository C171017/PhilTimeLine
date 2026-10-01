import type {
  Philosopher,
  Source,
  LocationPeriod,
  InfluenceRegion,
  Work,
} from "./types";

const sep = (slug: string, label: string): Source => ({
  label: `Stanford Encyclopedia of Philosophy: ${label}`,
  url: `https://plato.stanford.edu/entries/${slug}/`,
  verified: true,
});
const work = (
  title: string,
  year: number,
  approximate = true,
  note?: string,
  dateKind: Work["dateKind"] = "composition",
): Work => ({ title, year, dateKind, approximate, note });
const place = (
  city: string,
  country: string,
  lat: number,
  lon: number,
  startYear: number,
  endYear: number,
  note: string,
): LocationPeriod => ({
  city,
  country,
  lat,
  lon,
  startYear,
  endYear,
  approximate: true,
  note,
});
const reception = (
  region: string,
  startYear: number,
  endYear: number,
  note: string,
): InfluenceRegion => ({
  region,
  startYear,
  endYear,
  confidence: "medium",
  qualitative: true,
  note,
});
const verification =
  "Linked reference text was read on 2026-10-01. Approximate work years and location intervals are display markers, not exact documentary dates; traditional associations are labeled. ";

/** A small comparative selection, not a canon or a representative world census. */
export const globalPhilosophers: Philosopher[] = [
  {
    id: "confucius",
    name: "Confucius",
    birthYear: -550,
    deathYear: -478,
    datesApproximate: true,
    tradition: "Ru / Confucian thought",
    era: "Ancient",
    questionLane: "ethics",
    coreIdea:
      "A humane life develops through learning, ritual practice, and responsibility within relationships; a ruler should lead by moral example.",
    works: [
      work(
        "Analects (collected sayings)",
        -299,
        true,
        "Compiled by later followers in layers; this date marks a broad compilation period, not a book written by Confucius.",
        "posthumous",
      ),
    ],
    locations: [
      place(
        "Qufu / state of Lu",
        "China",
        35.6,
        116.99,
        -550,
        -478,
        "Birthplace and home base in traditional biography; he also traveled among neighboring states. Modern boundary and approximate city marker.",
      ),
    ],
    coordinates: { reality: 0, knowledge: -0.2, ethics: 0.8 },
    coordinateRationale: {
      reality:
        "A middle placement acknowledges that moral cultivation, not a matter–mind ontology, drives this selection.",
      knowledge:
        "Learning from exemplars and practiced judgment lean toward experience, while reflection remains central.",
      ethics:
        "Role-based duties and humane relationships emphasize shared life, with personal cultivation as their basis.",
    },
    influenceRegions: [
      reception(
        "east-asia",
        -100,
        2026,
        "Confucian classics shaped education and state examinations in China and later Korean, Japanese, and Vietnamese traditions; reception varied considerably.",
      ),
    ],
    sources: [sep("confucius", "Confucius")],
    sourceNotes:
      verification +
      "551–479 BCE are traditional dates. The Analects is a composite witness to a school, not a transcript. This selection must not equate Confucian ethics with obedience alone.",
  },
  {
    id: "laozi",
    name: "Laozi / Daodejing tradition",
    birthYear: -599,
    deathYear: -499,
    datesApproximate: true,
    tradition: "Daoist thought",
    era: "Ancient",
    questionLane: "reality",
    coreIdea:
      "The Dao precedes fixed distinctions; non-coercive action (wuwei), simplicity, and responsiveness challenge ambitions to control the world.",
    works: [
      work(
        "Daodejing",
        -299,
        true,
        "Composite text associated with Laozi; often dated broadly to the fourth–third centuries BCE. Surviving manuscript witnesses are later.",
      ),
    ],
    locations: [],
    coordinates: { reality: 0.1, knowledge: -0.6, ethics: 0.2 },
    coordinateRationale: {
      reality:
        "Dao does not map cleanly onto matter or mind; the near-center position expresses poor fit rather than neutrality.",
      knowledge:
        "Suspicion of rigid conceptual distinctions and attention to embodied responsiveness favor the experiential pole.",
      ethics:
        "Self-cultivation and non-coercive government meet; collective placement is deliberately weak.",
    },
    influenceRegions: [
      reception(
        "east-asia",
        -200,
        2026,
        "The Daodejing has sustained philosophical, religious, literary, and political commentarial traditions across East Asia.",
      ),
    ],
    sources: [sep("laozi", "Laozi")],
    sourceNotes:
      verification +
      "The displayed c.600–500 BCE interval is a traditional attribution, not an established lifespan. Whether Laozi was one historical person is disputed. No location is plotted because traditional stories do not establish documented residence.",
  },
  {
    id: "buddha",
    name: "Gautama Buddha",
    birthYear: -479,
    deathYear: -399,
    datesApproximate: true,
    tradition: "Early Buddhist thought",
    era: "Ancient",
    questionLane: "meaning",
    coreIdea:
      "Suffering is conditioned by craving and ignorance; ethical conduct, meditation, and insight offer a path toward its cessation without a permanent self.",
    works: [
      work(
        "Discourses preserved in the Nikāyas / Āgamas",
        -99,
        true,
        "Oral transmission long preceded written collections. The displayed date refers approximately to recording one Pāli tradition, not authorship by the Buddha.",
        "posthumous",
      ),
    ],
    locations: [
      place(
        "Lumbini region",
        "Nepal",
        27.47,
        83.28,
        -479,
        -450,
        "Traditional birthplace; chronology remains disputed.",
      ),
      place(
        "Bodh Gaya",
        "India",
        24.7,
        84.99,
        -450,
        -440,
        "Traditional location of awakening; interval is illustrative, not an attested residence duration.",
      ),
      place(
        "Sarnath / northern Gangetic plain",
        "India",
        25.38,
        83.02,
        -440,
        -399,
        "Traditional first teaching site; he taught across the northern Gangetic plain rather than residing here continuously.",
      ),
    ],
    coordinates: { reality: 0, knowledge: -0.7, ethics: 0.3 },
    coordinateRationale: {
      reality:
        "Dependent arising and rejection of a permanent self resist the offered substance-based axis.",
      knowledge:
        "Meditative investigation and experiential verification support the experiential placement.",
      ethics:
        "Liberation requires individual practice, while compassion and the monastic community connect it to others.",
    },
    influenceRegions: [
      reception(
        "south-asia",
        -300,
        2026,
        "Buddhist monastic and philosophical traditions developed across South Asia with substantial differences among schools.",
      ),
      reception(
        "east-asia",
        100,
        2026,
        "Translation networks carried Buddhist texts into China and onward to Korea and Japan; these were creative transformations, not uniform diffusion.",
      ),
    ],
    sources: [
      sep("buddha", "Buddha"),
      {
        label: "Internet Encyclopedia of Philosophy: Buddha",
        url: "https://iep.utm.edu/buddha/",
        verified: true,
      },
    ],
    sourceNotes:
      verification +
      "The displayed c.480–400 BCE rounds a scholarly short chronology; SEP notes many scholars favor death around 405 BCE, while longer chronologies commonly give c.563–483 BCE. Places represent traditional associations; teaching intervals are approximate. Buddhism also has major Southeast Asian and Tibetan histories omitted by these coarse regions.",
  },
  {
    id: "zhuangzi",
    name: "Zhuangzi",
    birthYear: -368,
    deathYear: -285,
    datesApproximate: true,
    tradition: "Daoist thought",
    era: "Ancient",
    questionLane: "knowledge",
    coreIdea:
      "Perspectives and language shape judgments; stories of transformation invite flexible attention beyond rigid divisions of right and wrong.",
    works: [
      work(
        "Zhuangzi (Inner Chapters)",
        -299,
        true,
        "Inner Chapters are commonly associated with Zhuang Zhou; the full received collection includes later layers.",
      ),
    ],
    locations: [
      place(
        "Meng, state of Song (traditional association)",
        "China",
        34.44,
        115.65,
        -368,
        -285,
        "Approximate traditional association near present-day Shangqiu; exact ancient site and residence history are uncertain.",
      ),
    ],
    coordinates: { reality: 0, knowledge: -0.8, ethics: -0.4 },
    coordinateRationale: {
      reality:
        "Transformation and perspectival language undermine a simple matter–mind split.",
      knowledge:
        "Skilled responsiveness and doubts about fixed propositions lean toward experience.",
      ethics:
        "Resistance to imposed social conventions emphasizes personal freedom, without implying modern individualism.",
    },
    influenceRegions: [
      reception(
        "east-asia",
        -200,
        2026,
        "Commentaries, literary reception, and later Daoist and Buddhist engagements made this text influential across East Asia.",
      ),
    ],
    sources: [sep("zhuangzi", "Zhuangzi")],
    sourceNotes:
      verification +
      "Traditional c.369–286 BCE dates and location are approximate. A composite text should not be treated as the unified doctrine of one author.",
  },
  {
    id: "nagarjuna",
    name: "Nāgārjuna",
    birthYear: 150,
    deathYear: 250,
    datesApproximate: true,
    tradition: "Madhyamaka Buddhism",
    era: "Ancient",
    questionLane: "reality",
    coreIdea:
      "Things lack independent intrinsic nature: emptiness is dependent arising, not a claim that nothing exists.",
    works: [
      work(
        "Mūlamadhyamakakārikā (Root Verses on the Middle Way)",
        200,
        true,
        "Approximate second–third-century composition; authorship of other works attributed to Nāgārjuna is disputed.",
      ),
    ],
    locations: [
      place(
        "Deccan / Andhra region",
        "India",
        16.58,
        79.32,
        150,
        250,
        "Broad traditional southern Indian association; this is a regional marker, not a documented city residence.",
      ),
    ],
    coordinates: { reality: 0, knowledge: 0.7, ethics: 0.2 },
    coordinateRationale: {
      reality:
        "Emptiness criticizes intrinsic substance on either side of the matter–mind opposition.",
      knowledge:
        "Dialectical analysis of claims supports a reasonward placement; it is not a foundationalist rationalism.",
      ethics:
        "The Mahāyāna context connects liberation to compassionate concern, though the featured work is chiefly dialectical.",
    },
    influenceRegions: [
      reception(
        "south-asia",
        250,
        1200,
        "Madhyamaka became a major Indian Buddhist argumentative tradition.",
      ),
      reception(
        "east-asia",
        400,
        2026,
        "Chinese translations and Tibetan commentarial traditions sustained distinct readings of emptiness; Tibet is grouped coarsely here.",
      ),
    ],
    sources: [sep("nagarjuna", "Nāgārjuna")],
    sourceNotes:
      verification +
      "Life dates and southern Indian associations are uncertain. Some Tibetan biographies combine different people or later traditions; no exact itinerary is asserted.",
  },
  {
    id: "shankara",
    name: "Śaṅkara",
    birthYear: 700,
    deathYear: 750,
    datesApproximate: true,
    tradition: "Advaita Vedānta",
    era: "Medieval",
    questionLane: "reality",
    coreIdea:
      "The self (ātman) and ultimate reality (brahman) are nondual; liberating knowledge dispels ignorance rather than creating a new self.",
    works: [
      work(
        "Brahmasūtra-bhāṣya",
        730,
        true,
        "Approximate eighth-century commentary; attribution of many other works and later monastic legends is disputed.",
      ),
    ],
    locations: [
      place(
        "Kalady (traditional birthplace)",
        "India",
        10.17,
        76.44,
        700,
        720,
        "Traditional association in Kerala; the date and itinerary are not securely documented.",
      ),
    ],
    coordinates: { reality: 0.9, knowledge: 0.6, ethics: -0.2 },
    coordinateRationale: {
      reality:
        "Nondual brahman and consciousness lean toward the mind pole, though brahman is not an individual mind.",
      knowledge:
        "Scriptural interpretation and reasoning are central; reason remains guided by revelation.",
      ethics:
        "The focus on liberation of the self leans individualward, while discipline and renunciation have institutional settings.",
    },
    influenceRegions: [
      reception(
        "south-asia",
        800,
        2026,
        "Advaita commentarial traditions and later monastic institutions made Śaṅkara central to many Vedānta debates; later institutions cannot all be traced securely to his lifetime.",
      ),
    ],
    sources: [
      {
        label: "Internet Encyclopedia of Philosophy: Advaita Vedānta",
        url: "https://iep.utm.edu/advaita/",
        verified: true,
      },
    ],
    sourceNotes:
      verification +
      "IEP was consulted for Advaita doctrine; it does not establish this biography. An early-eighth-century chronology c.700–750 is used; the familiar 788–820 dates are an alternative. Kalady is a traditional association rather than a securely dated residence, and monastery-foundation narratives are not asserted as documented history.",
  },
  {
    id: "ibn-sina",
    name: "Ibn Sīnā (Avicenna)",
    birthYear: 970,
    deathYear: 1037,
    datesApproximate: true,
    tradition: "Arabic-language Islamic philosophy",
    era: "Medieval",
    questionLane: "reality",
    coreIdea:
      "Distinguishing essence from existence, he argues for a necessary existent and develops accounts of intellect, soul, logic, and scientific knowledge.",
    works: [
      work(
        "The Book of Healing / The Cure",
        1027,
        true,
        "An encyclopedic philosophical work composed over years. SEP locates its completion in the Isfahan period c.1024–1037; the year 1027 is a conventional approximate marker.",
      ),
      work(
        "The Canon of Medicine",
        1025,
        true,
        "Approximate completion; a medical synthesis whose reception extended beyond philosophy.",
      ),
    ],
    locations: [
      place(
        "Bukhara",
        "Uzbekistan",
        39.77,
        64.43,
        970,
        999,
        "Raised and educated in the Bukhara area; born nearby at Afshana. Birth and departure years are approximate.",
      ),
      place(
        "Gurganj / Khwarazm",
        "Turkmenistan",
        42.32,
        59.15,
        999,
        1012,
        "SEP reconstructs residence c.999–1012 in the Khwarazm court; approximate modern Kunya-Urgench marker.",
      ),
      place(
        "Jurjan region",
        "Iran",
        37.26,
        55.17,
        1012,
        1014,
        "Approximate residence near the southeastern Caspian, not continuous travel tracking.",
      ),
      place(
        "Ray",
        "Iran",
        35.6,
        51.44,
        1014,
        1015,
        "Approximate period before moving to Hamadan.",
      ),
      place(
        "Hamadan",
        "Iran",
        34.8,
        48.51,
        1015,
        1024,
        "Worked as physician and vizier with periods of political insecurity.",
      ),
      place(
        "Isfahan",
        "Iran",
        32.65,
        51.67,
        1024,
        1037,
        "Later court patronage and philosophical work; died in Hamadan while traveling.",
      ),
    ],
    coordinates: { reality: 0.5, knowledge: 0.8, ethics: 0.1 },
    coordinateRationale: {
      reality:
        "An immaterial necessary existent and intellectual soul support a mindward placement, alongside a detailed natural philosophy.",
      knowledge:
        "Demonstrative reasoning and formal logic are major organizing commitments.",
      ethics:
        "Practical philosophy links individual perfection to household and civic organization; no sharp pole captures it.",
    },
    influenceRegions: [
      reception(
        "middle-east-north-africa",
        1050,
        2026,
        "Avicennian metaphysics became a reference point for later Islamic philosophical and theological debate; this coarse region omits important Central and South Asian reception.",
      ),
      reception(
        "europe",
        1150,
        1650,
        "Latin translations shaped scholastic metaphysics and medicine, including debate about essence and existence.",
      ),
    ],
    sources: [sep("ibn-sina", "Ibn Sīnā")],
    sourceNotes:
      verification +
      "SEP’s current biography favors c.970 rather than the familiar 980 birth date and allows an earlier birth; it does not establish one exact year. Court travels are abridged. Persian and Arabic intellectual histories overlap; current national labels describe map geography, not medieval nationality.",
  },
  {
    id: "al-ghazali",
    name: "al-Ghazālī",
    birthYear: 1056,
    deathYear: 1111,
    datesApproximate: true,
    tradition: "Islamic theology, philosophy, and Sufism",
    era: "Medieval",
    questionLane: "knowledge",
    coreIdea:
      "He examines the limits of philosophical demonstration and integrates disciplined reasoning with revelation, ethical practice, and spiritual transformation.",
    works: [
      work(
        "The Incoherence of the Philosophers",
        1095,
        true,
        "Targets selected metaphysical claims, not all philosophical reasoning.",
      ),
      work(
        "The Revival of the Religious Sciences",
        1100,
        true,
        "Composed across years after leaving Baghdad; the displayed date is approximate.",
      ),
    ],
    locations: [
      place(
        "Tus region",
        "Iran",
        36.49,
        59.52,
        1056,
        1085,
        "Birth and early education, interspersed with study at Nishapur; precise early intervals uncertain.",
      ),
      place(
        "Baghdad",
        "Iraq",
        33.32,
        44.37,
        1091,
        1095,
        "Professor at the Nizamiyya before a major change in vocation.",
      ),
      place(
        "Damascus",
        "Syria",
        33.51,
        36.28,
        1095,
        1096,
        "Withdrawal and devotional practice; also visited Jerusalem and Hebron, then undertook pilgrimage in 1096.",
      ),
      place(
        "Tus region",
        "Iran",
        36.49,
        59.52,
        1097,
        1106,
        "Return after pilgrimage; founded a private school and Sufi convent. Starting year is approximate.",
      ),
      place(
        "Nishapur",
        "Iran",
        36.21,
        58.8,
        1106,
        1111,
        "Returned to state-sponsored teaching in 1106; continued teaching at Tus as well.",
      ),
      place(
        "Tus region",
        "Iran",
        36.49,
        59.52,
        1111,
        1111,
        "Died at Tus in December 1111.",
      ),
    ],
    coordinates: { reality: 0.6, knowledge: 0.1, ethics: 0.5 },
    coordinateRationale: {
      reality:
        "God and spiritual life are central; natural causes are discussed within theological accounts.",
      knowledge:
        "He uses logic while questioning metaphysical demonstrations; spiritual experience and revelation prevent a simple rationalist classification.",
      ethics:
        "Moral reform includes personal disciplines and obligations within a religious community.",
    },
    influenceRegions: [
      reception(
        "middle-east-north-africa",
        1120,
        2026,
        "Theological argument and the Revival remained influential in Islamic ethical and spiritual education; reception also extends far beyond this region.",
      ),
      reception(
        "south-asia",
        1200,
        2026,
        "Islamic scholastic and Sufi traditions in South Asia received al-Ghazālī through teaching and commentary.",
      ),
    ],
    sources: [sep("al-ghazali", "al-Ghazālī")],
    sourceNotes:
      verification +
      "SEP favors 1055/1056 from autobiographical evidence over the later traditional 1058/1059; c.1056 is displayed. The popular story that he single-handedly ended Islamic philosophy is rejected; subsequent philosophical activity remained vigorous.",
  },
  {
    id: "ibn-rushd",
    name: "Ibn Rushd (Averroes)",
    birthYear: 1126,
    deathYear: 1198,
    datesApproximate: false,
    tradition: "Andalusian Islamic philosophy",
    era: "Medieval",
    questionLane: "knowledge",
    coreIdea:
      "Philosophical demonstration and responsible interpretation of revelation can agree; Aristotelian commentary becomes a way to pursue independent questions.",
    works: [
      work(
        "The Decisive Treatise",
        1179,
        true,
        "Approximate date of an argument concerning philosophy and religious law.",
      ),
      work(
        "The Incoherence of the Incoherence",
        1180,
        true,
        "Approximate date; responds to al-Ghazālī while defending selected philosophical positions.",
      ),
    ],
    locations: [
      place(
        "Córdoba",
        "Spain",
        37.89,
        -4.78,
        1126,
        1169,
        "Birth and education in al-Andalus; later judicial duties also brought him here.",
      ),
      place(
        "Seville",
        "Spain",
        37.39,
        -5.98,
        1169,
        1171,
        "Served as judge; dates are approximate.",
      ),
      place(
        "Marrakesh",
        "Morocco",
        31.63,
        -7.99,
        1182,
        1198,
        "Court service and final years involved travel and an intervening period of disgrace; not continuous residence.",
      ),
    ],
    coordinates: { reality: 0.2, knowledge: 0.9, ethics: 0.4 },
    coordinateRationale: {
      reality:
        "A natural philosophy of substances coexists with immaterial intellect; the axis is a poor fit.",
      knowledge:
        "Demonstration and structured argument justify a strong reasonward reading.",
      ethics:
        "Law, educational responsibility, and political order shape his discussion of philosophy.",
    },
    influenceRegions: [
      reception(
        "middle-east-north-africa",
        1180,
        1400,
        "His works emerged in Andalusian and Maghrebi scholarly settings; later Arabic reception was uneven.",
      ),
      reception(
        "europe",
        1230,
        1650,
        "Latin and Hebrew translations of commentaries influenced Jewish and Christian scholastic debates; readers often disagreed sharply with him.",
      ),
    ],
    sources: [sep("ibn-rushd", "Ibn Rushd")],
    sourceNotes:
      verification +
      "His work is rooted in Islamic legal and philosophical questions and should not be reduced to a conduit carrying Aristotle to Europe.",
  },
  {
    id: "zhu-xi",
    name: "Zhu Xi",
    birthYear: 1130,
    deathYear: 1200,
    datesApproximate: false,
    tradition: "Song Confucian thought",
    era: "Medieval",
    questionLane: "reality",
    coreIdea:
      "Pattern (li) and vital material force (qi) explain the world; investigation of things and cultivation of character form a connected moral inquiry.",
    works: [
      work(
        "Reflections on Things at Hand (with Lü Zuqian)",
        1175,
        true,
        "Conventional compilation date; the consulted overview establishes the work but does not settle an exact day or publication edition.",
      ),
      work(
        "Collected Commentaries on the Four Books",
        1190,
        true,
        "Commentaries were revised over decades; 1190 is an approximate marker, not one publication date.",
      ),
    ],
    locations: [
      place(
        "Wuyishan region",
        "China",
        27.76,
        118.04,
        1143,
        1200,
        "Studied and taught in Fujian; the regional marker summarizes several places and periods.",
      ),
      place(
        "Lushan / White Deer Grotto Academy",
        "China",
        29.53,
        115.97,
        1179,
        1181,
        "Restored the academy during official service; brief interval, not lifelong residence.",
      ),
    ],
    coordinates: { reality: 0.3, knowledge: 0.2, ethics: 0.8 },
    coordinateRationale: {
      reality:
        "Li and qi cannot be equated simply with mind and matter; slight mindward placement reflects the explanatory role of pattern.",
      knowledge:
        "Investigation of things joins reading, observation, and reflection, so neither pole dominates.",
      ethics:
        "Self-cultivation serves family, educational, and civic relationships.",
    },
    influenceRegions: [
      reception(
        "east-asia",
        1300,
        1900,
        "His Four Books commentaries became central to imperial examinations in China and to Confucian education in Korea and Japan; local adaptations differed.",
      ),
    ],
    sources: [sep("zhu-xi", "Zhu Xi")],
    sourceNotes:
      verification +
      "Translations of li and qi vary. Describing li as an exclusively mental entity would distort the tradition.",
  },
  {
    id: "maimonides",
    name: "Moses Maimonides",
    birthYear: 1138,
    deathYear: 1204,
    datesApproximate: true,
    tradition: "Jewish philosophy in the Arabic-speaking world",
    era: "Medieval",
    questionLane: "knowledge",
    coreIdea:
      "Philosophy and Jewish law can guide intellectual and ethical perfection; negative theology limits what humans can meaningfully say about God.",
    works: [
      work(
        "Mishneh Torah",
        1178,
        true,
        "Completed approximately in the 1170s.",
      ),
      work(
        "The Guide of the Perplexed",
        1190,
        true,
        "Written in Judeo-Arabic; approximate completion.",
      ),
    ],
    locations: [
      place(
        "Córdoba",
        "Spain",
        37.89,
        -4.78,
        1138,
        1148,
        "Birth and early life; family left amid political and religious upheaval.",
      ),
      place(
        "Fez",
        "Morocco",
        34.02,
        -5.01,
        1160,
        1165,
        "Family residence; details of this period remain debated.",
      ),
      place(
        "Fustat / Cairo",
        "Egypt",
        30.0,
        31.23,
        1166,
        1204,
        "Physician and Jewish communal leader; composed major works here.",
      ),
    ],
    coordinates: { reality: 0.7, knowledge: 0.8, ethics: 0.5 },
    coordinateRationale: {
      reality:
        "God as incorporeal and intellectual perfection support a mindward placement without treating God as a human mind.",
      knowledge:
        "Demonstration and philosophical interpretation are central, bounded by limits to human understanding.",
      ethics:
        "Law and communal responsibilities coexist with individual intellectual perfection.",
    },
    influenceRegions: [
      reception(
        "middle-east-north-africa",
        1180,
        2026,
        "Jewish legal and philosophical communities received the Mishneh Torah and the Guide in Arabic- and Hebrew-speaking settings.",
      ),
      reception(
        "europe",
        1200,
        2026,
        "Hebrew and Latin reception generated debates in Jewish thought and Christian scholasticism, followed by modern reinterpretations.",
      ),
    ],
    sources: [sep("maimonides", "Maimonides")],
    sourceNotes:
      verification +
      "Birth is also dated 1135. This thinker crosses categories: Jewish, Arabic-language, Andalusian, Egyptian, and Aristotelian histories overlap rather than belonging to one modern civilizational box.",
  },
  {
    id: "wang-yangming",
    name: "Wang Yangming",
    birthYear: 1472,
    deathYear: 1529,
    datesApproximate: false,
    tradition: "Ming Confucian thought",
    era: "Early modern",
    questionLane: "ethics",
    coreIdea:
      "Knowing and acting belong together; innate moral knowing must be realized in concrete conduct rather than kept as detached intellectual knowledge.",
    works: [
      work(
        "Instructions for Practical Living",
        1518,
        true,
        "An initial collection appeared during his life; the received text includes later collections and disciples’ records.",
        "publication",
      ),
    ],
    locations: [
      place(
        "Yuyao",
        "China",
        30.04,
        121.15,
        1472,
        1490,
        "Birthplace and early family setting; early movements are summarized.",
      ),
      place(
        "Longchang / Xiuwen",
        "China",
        26.84,
        106.59,
        1506,
        1510,
        "Exile in Guizhou associated with a formative philosophical realization.",
      ),
      place(
        "Shaoxing",
        "China",
        30.0,
        120.58,
        1521,
        1527,
        "Later teaching; official service brought him to several other regions.",
      ),
    ],
    coordinates: { reality: 0.7, knowledge: -0.1, ethics: 0.6 },
    coordinateRationale: {
      reality:
        "His claim that mind is principle supports a mindward interpretation, with qualifications about moral and cosmological meanings.",
      knowledge:
        "Innate knowing is tested in action; the placement avoids equating it with either sense empiricism or abstract deduction.",
      ethics:
        "The unity of knowing and acting concerns personal responsibility within relationships and public life.",
    },
    influenceRegions: [
      reception(
        "east-asia",
        1520,
        2026,
        "Wang’s followers developed diverse schools in China, and his work received influential readings in Japan and Korea.",
      ),
    ],
    sources: [sep("wang-yangming", "Wang Yangming")],
    sourceNotes:
      verification +
      "The label “School of Mind” does not mean that moral knowledge is merely subjective preference. Received collections are not all single-author publications.",
  },
  {
    id: "nishida",
    name: "Nishida Kitarō",
    birthYear: 1870,
    deathYear: 1945,
    datesApproximate: false,
    tradition: "Japanese philosophy / Kyoto School",
    era: "Modern",
    questionLane: "reality",
    coreIdea:
      "Starting from pure experience, he develops a logic of place and absolute nothingness to rethink subject–object relations and the conditions of experience.",
    works: [
      work("An Inquiry into the Good", 1911, false, undefined, "publication"),
      work(
        "Place (Basho)",
        1926,
        false,
        "An essay marking development of the logic of place.",
        "publication",
      ),
    ],
    locations: [
      place(
        "Kanazawa",
        "Japan",
        36.56,
        136.66,
        1899,
        1909,
        "Teaching and intellectual formation.",
      ),
      place(
        "Kyoto",
        "Japan",
        35.01,
        135.77,
        1910,
        1928,
        "Professor at Kyoto Imperial University; retirement followed in 1928.",
      ),
      place(
        "Kamakura",
        "Japan",
        35.32,
        139.55,
        1929,
        1945,
        "Spent later periods here; this interval does not imply exclusive residence.",
      ),
    ],
    coordinates: { reality: 0.6, knowledge: -0.4, ethics: 0.1 },
    coordinateRationale: {
      reality:
        "Experience and subject–object relations lean mindward, while absolute nothingness resists ordinary idealism.",
      knowledge:
        "Pure experience begins inquiry, but later work becomes highly conceptual and logical.",
      ethics:
        "Individual agency and historical worlds interact; political interpretations are disputed.",
    },
    influenceRegions: [
      reception(
        "east-asia",
        1911,
        2026,
        "The Kyoto School and Japanese philosophical debates developed and contested his concepts.",
      ),
      reception(
        "europe",
        1950,
        2026,
        "Translations and comparative work connected his philosophy with phenomenology, religion, and continental philosophy; reception is specialized rather than universal.",
      ),
    ],
    sources: [sep("nishida-kitaro", "Nishida Kitarō")],
    sourceNotes:
      verification +
      "His engagement with Western philosophy and Zen forms a creative philosophical project. Wartime political writings and their interpretation remain contested; the map does not imply endorsement of Japanese imperial expansion.",
  },
  {
    id: "fanon",
    name: "Frantz Fanon",
    birthYear: 1925,
    deathYear: 1961,
    datesApproximate: false,
    tradition: "Anticolonial thought / Africana philosophy",
    era: "Contemporary",
    questionLane: "politics",
    coreIdea:
      "Colonial domination shapes institutions, embodied experience, and identity; liberation requires social transformation and a critique of racialized relations.",
    works: [
      work("Black Skin, White Masks", 1952, false, undefined, "publication"),
      work(
        "The Wretched of the Earth",
        1961,
        false,
        "Published in the final year of his life; its account of revolutionary violence remains contested.",
        "publication",
      ),
    ],
    locations: [
      place(
        "Fort-de-France",
        "Martinique (French territory)",
        14.61,
        -61.07,
        1925,
        1943,
        "Birth and early life; Martinique’s territorial status is not that of an independent state.",
      ),
      place(
        "Lyon",
        "France",
        45.76,
        4.84,
        1946,
        1951,
        "Medical and psychiatric training.",
      ),
      place(
        "Blida",
        "Algeria",
        36.47,
        2.83,
        1953,
        1956,
        "Psychiatric work under colonial rule before resignation.",
      ),
      place(
        "Tunis",
        "Tunisia",
        36.81,
        10.18,
        1957,
        1961,
        "Work with the Algerian liberation movement; traveled internationally and died in Maryland, United States.",
      ),
    ],
    coordinates: { reality: -0.3, knowledge: -0.5, ethics: 0.8 },
    coordinateRationale: {
      reality:
        "Institutions and material domination are prominent, but phenomenological accounts of lived experience also matter.",
      knowledge:
        "Clinical observation and lived racial experience guide critique alongside theoretical argument.",
      ethics:
        "Decolonization and collective liberation are central, without erasing individual psychological suffering.",
    },
    influenceRegions: [
      reception(
        "middle-east-north-africa",
        1954,
        2026,
        "Algerian liberation and later debates on decolonization received his writings.",
      ),
      reception(
        "sub-saharan-africa",
        1960,
        2026,
        "Postcolonial political and philosophical debates drew on and criticized Fanon.",
      ),
      reception(
        "north-america",
        1965,
        2026,
        "Black liberation movements and later Africana and postcolonial scholarship engaged Fanon.",
      ),
      reception(
        "latin-america",
        1960,
        2026,
        "Anticolonial and liberation debates circulated Fanon’s writings; this region includes Caribbean reception imperfectly.",
      ),
    ],
    sources: [
      sep("frantz-fanon", "Frantz Fanon"),
      {
        label: "Internet Encyclopedia of Philosophy: Frantz Fanon",
        url: "https://iep.utm.edu/fanon/",
        verified: true,
      },
    ],
    sourceNotes:
      verification +
      "Fanon spans Caribbean, African, French, and transnational histories. Influence means identifiable reception, not agreement with every claim or a measured geopolitical footprint.",
  },
  {
    id: "mencius",
    name: "Mencius (Mengzi)",
    birthYear: -371,
    deathYear: -288,
    datesApproximate: true,
    tradition: "Classical Ru / Confucian thought",
    era: "Ancient",
    questionLane: "ethics",
    coreIdea:
      "Compassion and other moral beginnings can be cultivated; humane government should protect people’s livelihood and rule through virtue rather than force.",
    works: [
      work(
        "Mengzi (collected dialogues)",
        -249,
        true,
        "A broad third-century BCE collection marker. Disciples or later followers probably compiled the work; the received text was edited by Zhao Qi in the second century CE.",
        "posthumous",
      ),
    ],
    locations: [
      place(
        "Zou region",
        "China",
        35.4,
        116.98,
        -371,
        -288,
        "Traditional home-region association in present-day Shandong; traveled among states, so this life-wide interval is not continuous residence.",
      ),
    ],
    coordinates: { reality: 0.2, knowledge: -0.3, ethics: 0.8 },
    coordinateRationale: {
      reality:
        "Moral psychology and Heaven matter more than a matter–mind substance theory in this selection.",
      knowledge:
        "Reflection on spontaneous compassion begins with ordinary situations and cultivated judgment.",
      ethics:
        "Family relations, humane government, and the people’s welfare connect cultivation to shared life.",
    },
    influenceRegions: [
      reception(
        "east-asia",
        1200,
        2026,
        "The Mengzi became one of the Four Books in Zhu Xi’s curriculum, shaping later educational and moral debates; this does not erase earlier reception.",
      ),
    ],
    sources: [sep("mencius", "Mencius"), sep("xunzi", "Xunzi")],
    sourceNotes:
      verification +
      "372–289 BCE are traditional dates, not secure exact years. He held office in Qi, but this selection omits an itinerary whose dates cannot be established from the consulted entry. His claim that human nature is good concerns capacities for cultivation, not the claim that every action is already good.",
  },
  {
    id: "mozi",
    name: "Mozi / early Mohism",
    birthYear: -429,
    birthYearUnknown: true,
    deathYear: null,
    deathYearUnknown: true,
    activityEndYear: -429,
    datesApproximate: true,
    tradition: "Mohist thought",
    era: "Ancient",
    questionLane: "politics",
    coreIdea:
      "Impartial concern and publicly assessable standards should guide action toward everyone’s welfare; aggressive war and wasteful luxury undermine that aim.",
    works: [
      work(
        "Mozi (layered school collection)",
        -299,
        true,
        "A broad collection marker for texts by generations of Mohists; the whole book cannot be assigned to one author or date.",
        "posthumous",
      ),
    ],
    locations: [],
    coordinates: { reality: 0, knowledge: -0.2, ethics: 0.9 },
    coordinateRationale: {
      reality:
        "Religious commitments coexist with practical inquiry; the offered ontological axis fits poorly.",
      knowledge:
        "Testimony, practical models, and benefit assess claims, while structured argument is also central.",
      ethics:
        "Impartial concern for collective welfare strongly supports the collective pole; hierarchical government complicates a modern egalitarian reading.",
    },
    influenceRegions: [
      reception(
        "east-asia",
        -430,
        -200,
        "Mohists were an important organized rival to Ru traditions in the Warring States period, with later branches developing logic and technical inquiry.",
      ),
    ],
    sources: [sep("mohism", "Mohism")],
    sourceNotes:
      verification +
      "Birth and death years are unknown. The displayed c.430 BCE point is an attested floruit anchor, not a lifespan or death date. SEP characterizes him as flourishing around this time and says even his home state is unknown. No residence is plotted. Later Mohist logic belongs to subsequent generations, not necessarily to Mozi himself.",
  },
  {
    id: "xunzi",
    name: "Xunzi",
    birthYear: -309,
    deathYear: null,
    deathYearUnknown: true,
    activityEndYear: -237,
    datesApproximate: true,
    tradition: "Classical Ru / Confucian thought",
    era: "Ancient",
    questionLane: "ethics",
    coreIdea:
      "Good conduct requires deliberate learning, ritual, and social cultivation; unchecked desires do not by themselves supply moral order.",
    works: [
      work(
        "Xunzi (essays, later collected)",
        -249,
        true,
        "Approximate third-century BCE composition marker. The surviving organization derives from Liu Xiang’s first-century BCE compilation; it was not a publication authorized by Xunzi.",
      ),
    ],
    locations: [
      place(
        "Qi / Jixia scholarly center",
        "China",
        36.81,
        118.3,
        -294,
        -254,
        "Known Qi association; beginning and ending years are broad reconstructed markers. Sources disagree whether he arrived as a teenager or around age fifty; this interval is particularly uncertain.",
      ),
    ],
    coordinates: { reality: -0.4, knowledge: 0.1, ethics: 0.8 },
    coordinateRationale: {
      reality:
        "Heaven’s regularity and human construction of social practices support a modest naturalistic placement.",
      knowledge:
        "Learning combines reasoned discrimination, accumulated teaching, and practice.",
      ethics:
        "Ritual, education, and shared institutions make moral cultivation possible.",
    },
    influenceRegions: [
      reception(
        "east-asia",
        -250,
        300,
        "Early Confucian and Han intellectual debates received Xunzi’s essays.",
      ),
      reception(
        "east-asia",
        1900,
        2026,
        "Modern scholarship renewed appreciation of a thinker long marginalized by later Mencian orthodoxy.",
      ),
    ],
    sources: [sep("xunzi", "Xunzi")],
    sourceNotes:
      verification +
      "Birth c.310 BCE is reconstructed; death is unknown and occurred after 238 BCE. The displayed 238 BCE activity endpoint marks the latest attested activity bound, not his death. Calling his human nature “evil” must not import an Augustinian doctrine: unchecked native desires require cultivation, and all people can become good.",
  },
  {
    id: "al-farabi",
    name: "al-Fārābī",
    birthYear: 870,
    deathYear: 950,
    datesApproximate: true,
    tradition: "Arabic-language Islamic philosophy",
    era: "Medieval",
    questionLane: "politics",
    coreIdea:
      "A virtuous political community should orient education and cooperation toward flourishing; logic clarifies how reasoning, language, and persuasion differ.",
    works: [
      work(
        "Opinions of the People of the Virtuous City",
        943,
        true,
        "Approximate late-career display marker. SEP stresses that the chronological order of his works is poorly known.",
      ),
      work(
        "Enumeration of the Sciences",
        930,
        true,
        "Approximate tenth-century marker rather than an established completion year.",
      ),
    ],
    locations: [
      place(
        "Baghdad",
        "Iraq",
        33.32,
        44.37,
        900,
        943,
        "Moved to Iraq and Baghdad in youth; c.900 is an approximate marker because the arrival date is not established.",
      ),
      place(
        "Damascus",
        "Syria",
        33.51,
        36.28,
        943,
        950,
        "Moved to Syria in 943; died in Damascus in December 950 or January 951. Possible travel to Egypt is not plotted as certain.",
      ),
    ],
    coordinates: { reality: 0.5, knowledge: 0.9, ethics: 0.7 },
    coordinateRationale: {
      reality:
        "Metaphysics includes immaterial intellects and an ultimate first cause, alongside natural science.",
      knowledge:
        "Demonstration and detailed logical classifications justify a reasonward reading.",
      ethics:
        "The virtuous city links individual flourishing to education and cooperation in political life.",
    },
    influenceRegions: [
      reception(
        "middle-east-north-africa",
        950,
        1500,
        "Later Arabic philosophical traditions debated his accounts of logic, religion, and political life.",
      ),
      reception(
        "europe",
        1150,
        1600,
        "Medieval Latin versions of the Enumeration of the Sciences influenced classifications of knowledge.",
      ),
    ],
    sources: [sep("al-farabi", "al-Fārābī")],
    sourceNotes:
      verification +
      "Life evidence is sparse; birthplace and ethnic origin are disputed. Death is December 950 or January 951. Exact work chronology remains uncertain; his project includes sophisticated music theory and should not be reduced to transmitting Greek philosophy.",
  },
];
