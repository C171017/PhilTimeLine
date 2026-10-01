import type { Philosopher } from "./types";

/** Curated reference dataset. Sources were inspected; editorial lenses are not measurements. */
export const westernPhilosophers: Philosopher[] = [
  {
    id: "thales",
    name: "Thales of Miletus",
    birthYear: -619,
    deathYear: -545,
    datesApproximate: true,
    tradition: "Milesian natural philosophy",
    era: "Antiquity",
    questionLane: "reality",
    coreIdea:
      "Natural explanation seeks an underlying principle; Aristotle reports Thales’s claim that water is primary, though our evidence is later and fragmentary.",
    works: [],
    locations: [
      {
        city: "Miletus",
        country: "Turkey",
        lat: 37.5307,
        lon: 27.2781,
        startYear: -589,
        endYear: -559,
        approximate: true,
        note: "Attested civic and intellectual setting; this sixth-century activity interval is coarse, not a documented residence itinerary.",
      },
    ],
    coordinates: {
      reality: -0.7,
      knowledge: -0.35,
      ethics: 0,
    },
    coordinateRationale: {
      reality:
        "Water as a first principle favors a natural-material explanation, but his reported view that all things are full of gods complicates modern materialism.",
      knowledge:
        "Natural observation and general explanation combine; evidence for a systematic method is scant.",
      ethics:
        "Surviving reports do not establish an ethical individual–collective position.",
    },
    influenceRegions: [
      {
        region: "Mediterranean",
        startYear: -600,
        endYear: -300,
        confidence: "medium",
        qualitative: true,
        note: "Aristotle’s reconstruction and later Greek doxography made Thales a foundational figure in natural philosophy. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Thales of Miletus",
        url: "https://plato.stanford.edu/entries/presocratics/",
        verified: true,
      },
      {
        label: "Internet Encyclopedia of Philosophy: Thales",
        url: "https://iep.utm.edu/thales/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. IEP dates him c 620–546 BCE; c 624 is another familiar convention. No securely surviving authored work is listed. Eclipse-prediction stories and attributed writings require caution.",
  },
  {
    id: "parmenides",
    name: "Parmenides of Elea",
    birthYear: -514,
    deathYear: null,
    datesApproximate: true,
    tradition: "Eleatic philosophy",
    era: "Antiquity",
    questionLane: "reality",
    coreIdea:
      "Reasoning about what is and what cannot be challenges ordinary accounts of change; how his account of being relates to his cosmology remains disputed.",
    works: [
      {
        title: "Philosophical poem (traditional title: On Nature)",
        year: -474,
        dateKind: "composition",
        approximate: true,
        note: "Early fifth-century BCE placement; exact composition date is unknown.",
      },
    ],
    locations: [
      {
        city: "Elea",
        country: "Italy",
        lat: 40.159,
        lon: 15.1556,
        startYear: -499,
        endYear: -449,
        approximate: true,
        note: "Native Greek settlement in southern Italy; coarse early-to-mid fifth-century activity window, not a verified continuous residence.",
      },
    ],
    coordinates: {
      reality: 0,
      knowledge: 0.9,
      ethics: 0,
    },
    coordinateRationale: {
      reality:
        "The being described as ungenerated and unchanging cannot straightforwardly be classified as either modern matter or mind.",
      knowledge:
        "Argument and distinctions about possible and necessary being take priority over unexamined appearance.",
      ethics:
        "Surviving evidence does not yield a secure position on this ethical axis.",
    },
    influenceRegions: [
      {
        region: "Mediterranean",
        startYear: -475,
        endYear: -300,
        confidence: "medium",
        qualitative: true,
        note: "Successors including pluralists, Plato, and Aristotle responded to the challenge of his arguments. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
      {
        region: "Europe",
        startYear: 1800,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Modern scholarship continues to debate monist, modal, and cosmological readings. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Parmenides of Elea",
        url: "https://plato.stanford.edu/entries/parmenides/",
        verified: true,
      },
      {
        label: "Internet Encyclopedia of Philosophy: Parmenides",
        url: "https://iep.utm.edu/parmenid/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Birth c 515 BCE is inferred from Plato’s fictionalized dialogue; IEP also discusses c 540 BCE and questions both chronologies. Death date is unknown. activityEndYear marks the coarse end of an early-to-mid fifth-century floruit, not a death date. Strict monism and the claim that all appearances are mere illusion are disputed interpretations.",
    deathYearUnknown: true,
    activityEndYear: -449,
  },
  {
    id: "heraclitus",
    name: "Heraclitus",
    birthYear: -499,
    deathYear: null,
    datesApproximate: true,
    tradition: "Presocratic philosophy",
    era: "Antiquity",
    questionLane: "reality",
    coreIdea:
      "An intelligible order emerges through tensions and transformations; apparently opposed things belong within a connected whole rather than a world of sheer disorder.",
    works: [
      {
        title: "Surviving fragments (traditional title: On Nature)",
        year: -499,
        dateKind: "composition",
        approximate: true,
        note: "Active c 500 BCE; exact title, arrangement, and composition date are unknown.",
      },
    ],
    locations: [
      {
        city: "Ephesus",
        country: "Turkey",
        lat: 37.939,
        lon: 27.341,
        startYear: -499,
        endYear: -499,
        approximate: true,
        note: "Native city and attested setting around his floruit; no secure travel itinerary.",
      },
    ],
    coordinates: {
      reality: -0.4,
      knowledge: 0.25,
      ethics: 0,
    },
    coordinateRationale: {
      reality:
        "Fire and transformation are central, but the logos resists reducing his thought to inert matter.",
      knowledge:
        "Understanding the shared logos requires interpreting experience rather than merely accumulating sensations.",
      ethics:
        "Political and ethical fragments survive, but a secure individual–collective classification is unavailable.",
    },
    influenceRegions: [
      {
        region: "Mediterranean",
        startYear: -500,
        endYear: 200,
        confidence: "medium",
        qualitative: true,
        note: "Plato, Aristotle, and Stoic interpretations transmitted and transformed his thought. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
      {
        region: "Europe",
        startYear: 1800,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Modern philosophical interpretations of flux, opposition, and logos continue. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Heraclitus",
        url: "https://plato.stanford.edu/entries/heraclitus/",
        verified: true,
      },
      {
        label: "Internet Encyclopedia of Philosophy: Heraclitus",
        url: "https://iep.utm.edu/heraclit/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Only a floruit around 500 BCE is securely supportable from these reference accounts. Stored birthYear is an activity anchor, not a birth date; birth and death are unknown. Universal flux, unity of opposites, and the interpretation of logos are debated.",
    birthYearUnknown: true,
    deathYearUnknown: true,
    activityEndYear: -499,
  },
  {
    id: "socrates",
    name: "Socrates",
    birthYear: -468,
    deathYear: -398,
    datesApproximate: true,
    tradition: "Socratic inquiry",
    era: "Antiquity",
    questionLane: "ethics",
    coreIdea:
      "Examining what we mean by virtue can expose false confidence; how best to live matters more than possessing a ready-made doctrine.",
    works: [],
    locations: [
      {
        city: "Athens",
        country: "Greece",
        lat: 37.9838,
        lon: 23.7275,
        startYear: -468,
        endYear: -398,
        approximate: true,
        note: "Principal civic setting; military service took him outside Athens.",
      },
    ],
    coordinates: {
      reality: 0,
      knowledge: 0.45,
      ethics: -0.2,
    },
    coordinateRationale: {
      reality:
        "Surviving reports do not establish a systematic matter–mind ontology.",
      knowledge:
        "Questioning and argument test beliefs, though Socrates professes limits to his knowledge.",
      ethics:
        "Care of the soul foregrounds personal moral responsibility within civic life.",
    },
    influenceRegions: [
      {
        region: "Mediterranean",
        startYear: -398,
        endYear: 600,
        confidence: "medium",
        qualitative: true,
        note: "Plato and later ancient schools made Socratic inquiry foundational. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
      {
        region: "Europe",
        startYear: -398,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "SEP describes influence in every age through Socratic figures and philosophical inquiry. Broad reception window is editorial, not a measured spread; the source was inspected and date endpoints remain editorial.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Socrates",
        url: "https://plato.stanford.edu/entries/socrates/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Socrates wrote no surviving philosophical works. Our accounts, especially Plato and Xenophon, differ; Plato’s dialogues are not transcripts. Birth is conventionally c 469 BCE.",
  },
  {
    id: "plato",
    name: "Plato",
    birthYear: -427,
    deathYear: -346,
    datesApproximate: true,
    tradition: "Platonism",
    era: "Antiquity",
    questionLane: "reality",
    coreIdea:
      "Changing sensible things are understood through intelligible forms; his dialogues investigate how knowledge, desire, and justice fit together.",
    works: [
      {
        title: "Republic",
        year: -379,
        dateKind: "composition",
        approximate: true,
        note: "Conventionally c 380 BCE; the dialogue’s dramatic date differs.",
      },
      {
        title: "Phaedo",
        year: -379,
        dateKind: "composition",
        approximate: true,
        note: "Early fourth-century BCE; precise composition date is uncertain.",
      },
    ],
    locations: [
      {
        city: "Athens",
        country: "Greece",
        lat: 37.9838,
        lon: 23.7275,
        startYear: -386,
        endYear: -346,
        approximate: true,
        note: "Academy founded c 387 BCE; travel to Sicily interrupted his residence.",
      },
    ],
    coordinates: {
      reality: 0.9,
      knowledge: 0.8,
      ethics: 0.55,
    },
    coordinateRationale: {
      reality:
        "Intelligible Forms receive explanatory priority over sensible particulars.",
      knowledge:
        "Dialectic and recollection favor rational understanding over unexamined perception.",
      ethics:
        "The Republic connects justice in persons to the organization of a city.",
    },
    influenceRegions: [
      {
        region: "Mediterranean",
        startYear: -350,
        endYear: 600,
        confidence: "medium",
        qualitative: true,
        note: "Platonist schools flourished around the Mediterranean. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
      {
        region: "Europe",
        startYear: -350,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "SEP describes Platonists and philosophical readership in practically every age. Broad reception window is editorial, not a measured spread; the source was inspected and date endpoints remain editorial.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Plato",
        url: "https://plato.stanford.edu/entries/plato/",
        verified: true,
      },
      {
        label: "Internet Encyclopedia of Philosophy: Plato",
        url: "https://iep.utm.edu/plato/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Birth is often given as 428/427 BCE. Dialogue chronology and whether particular speakers state Plato’s own position remain disputed. SEP gives birth as 429? BCE; IEP discusses 428/427 and alternatives. The stored c 428 BCE follows the familiar convention and is approximate. IEP places Republic and Phaedo within c 380–360 BCE; the displayed c 380 is a coarse composition anchor, not a verified exact year.",
  },
  {
    id: "aristotle",
    name: "Aristotle",
    birthYear: -383,
    deathYear: -321,
    datesApproximate: false,
    tradition: "Aristotelianism",
    era: "Antiquity",
    questionLane: "reality",
    coreIdea:
      "Substances unite matter and form; explaining nature and action requires causes, purposes, and attention to particulars.",
    works: [
      {
        title: "Nicomachean Ethics",
        year: -339,
        dateKind: "composition",
        approximate: true,
        note: "Fourth-century BCE; treatise chronology is uncertain. The displayed c 340 BCE year is an editorial placement, not an established date.",
      },
      {
        title: "Metaphysics",
        year: -339,
        dateKind: "composition",
        approximate: true,
        note: "Collection of treatises; this is a broad fourth-century placement, not a known publication date. The displayed c 340 BCE year is an editorial placement, not an established date.",
      },
    ],
    locations: [
      {
        city: "Athens",
        country: "Greece",
        lat: 37.9838,
        lon: 23.7275,
        startYear: -334,
        endYear: -322,
        approximate: true,
        note: "Lyceum teaching period, conventionally 335–323 BCE.",
      },
    ],
    coordinates: {
      reality: 0,
      knowledge: 0.25,
      ethics: 0.3,
    },
    coordinateRationale: {
      reality:
        "Hylomorphism joins matter and form; it is neither reductive materialism nor Platonic separation.",
      knowledge:
        "Observation supplies starting points; demonstration and causal reasoning organize knowledge.",
      ethics:
        "Flourishing develops through virtue, friendship, and political community.",
    },
    influenceRegions: [
      {
        region: "Mediterranean",
        startYear: -320,
        endYear: 600,
        confidence: "medium",
        qualitative: true,
        note: "The Peripatetic tradition developed his work in antiquity. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
      {
        region: "Europe",
        startYear: 1200,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Medieval Latin universities and subsequent debates institutionalized Aristotelian study. Broad reception window is editorial, not a measured spread; the date endpoints are editorial. Extended through the dataset date to include continuing scholarly reception; this does not imply uninterrupted or uniform reception.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Aristotle",
        url: "https://plato.stanford.edu/entries/aristotle/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Birth and death are 384–322 BCE. Most surviving works have uncertain composition histories; dates shown for treatises are coarse editorial placements.",
  },
  {
    id: "epicurus",
    name: "Epicurus",
    birthYear: -340,
    deathYear: -269,
    datesApproximate: false,
    tradition: "Epicureanism",
    era: "Antiquity",
    questionLane: "ethics",
    coreIdea:
      "A good life seeks stable freedom from distress through modest desires, friendship, and understanding a natural world of atoms and void.",
    works: [
      {
        title: "Letter to Menoeceus",
        year: -299,
        dateKind: "composition",
        approximate: true,
        note: "Undated surviving letter. The c 300 BCE marker is an editorial placement within his teaching period, not a known composition year.",
      },
    ],
    locations: [
      {
        city: "Athens",
        country: "Greece",
        lat: 37.9838,
        lon: 23.7275,
        startYear: -305,
        endYear: -269,
        approximate: true,
        note: "The Garden established 306 BCE; principal late-life teaching setting.",
      },
    ],
    coordinates: {
      reality: -0.9,
      knowledge: -0.75,
      ethics: -0.5,
    },
    coordinateRationale: {
      reality: "Atoms and void explain nature without providential design.",
      knowledge:
        "Sensations are basic criteria; reasoning addresses what is not directly observed.",
      ethics:
        "Tranquility of persons and friendships takes priority over ambitious public power.",
    },
    influenceRegions: [
      {
        region: "Mediterranean",
        startYear: -300,
        endYear: 300,
        confidence: "medium",
        qualitative: true,
        note: "Epicurean communities and Lucretius carried the tradition into the Roman world. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
      {
        region: "Europe",
        startYear: 1400,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Later European philosophical engagement with Epicurean texts is a broad reception context, distinct from the ancient Garden. Broad reception window is editorial, not a measured spread; the source was inspected and date endpoints remain editorial.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Epicurus",
        url: "https://plato.stanford.edu/entries/epicurus/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Pleasure here does not mean unlimited indulgence. The letter survives through Diogenes Laertius; its exact date is unavailable.",
  },
  {
    id: "zeno",
    name: "Zeno of Citium",
    birthYear: -333,
    deathYear: -261,
    datesApproximate: true,
    tradition: "Stoicism",
    era: "Antiquity",
    questionLane: "ethics",
    coreIdea:
      "Living in agreement with nature requires virtue and rational judgment; external fortunes do not by themselves make a life good.",
    works: [],
    locations: [
      {
        city: "Athens",
        country: "Greece",
        lat: 37.9838,
        lon: 23.7275,
        startYear: -299,
        endYear: -261,
        approximate: true,
        note: "Teaching at the Stoa Poikile; initial founding date is conventional.",
      },
    ],
    coordinates: {
      reality: -0.5,
      knowledge: 0.5,
      ethics: 0.55,
    },
    coordinateRationale: {
      reality:
        "Early Stoic physics treats even soul as corporeal; this is not modern mechanistic materialism.",
      knowledge:
        "Reason orders life and assent, alongside a theory grounded in impressions.",
      ethics:
        "Human kinship and a shared rational order support a cosmopolitan ethical outlook.",
    },
    influenceRegions: [
      {
        region: "Mediterranean",
        startYear: -300,
        endYear: 200,
        confidence: "medium",
        qualitative: true,
        note: "Later Greek and Roman Stoics developed the school, often revising early positions. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
      {
        region: "Europe",
        startYear: 1500,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "The school’s later European reception includes Renaissance Neo-Stoicism and contemporary ethics; it cannot all be attributed to Zeno personally. Broad reception window is editorial, not a measured spread; the source was inspected and date endpoints remain editorial.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Stoicism",
        url: "https://plato.stanford.edu/entries/stoicism/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Zeno’s birth is conventionally c 334 BCE. No complete work survives. The early school must be distinguished from later Roman Stoicism. The SEP school article supports Zeno’s teaching at Athens and core Stoic doctrine. No complete authored work survives. His lost Republic is known from ancient testimony, but a dated work entry is omitted because the inspected general article does not establish its dating. Conventional life dates c 334–262 BCE remain approximate.",
  },
  {
    id: "seneca",
    name: "Seneca",
    birthYear: 0,
    deathYear: 65,
    datesApproximate: true,
    tradition: "Roman Stoicism",
    era: "Antiquity",
    questionLane: "ethics",
    coreIdea:
      "Virtue requires training judgment and emotion through daily practice; moral progress includes recognizing the common humanity of others.",
    works: [
      {
        title: "Moral Letters to Lucilius",
        year: 65,
        dateKind: "composition",
        approximate: true,
        note: "Written during retirement c62–65; endpoint marks the composition period.",
      },
      {
        title: "On Mercy",
        year: 55,
        dateKind: "composition",
        approximate: true,
        note: "SEP dates it 55 or 56, addressed to Nero.",
      },
    ],
    locations: [
      {
        city: "Rome",
        country: "Italy",
        lat: 41.9028,
        lon: 12.4964,
        startYear: 49,
        endYear: 62,
        approximate: true,
        note: "Return from Corsican exile in 49 and later imperial advisory career before retirement.",
      },
    ],
    coordinates: {
      reality: -0.4,
      knowledge: 0.45,
      ethics: 0.35,
    },
    coordinateRationale: {
      reality:
        "Stoic corporealism places the soul within nature, alongside a providential rational order.",
      knowledge:
        "Reflective judgment and practical exercises apply reason to lived experience.",
      ethics:
        "Self-cultivation includes beneficence and cosmopolitan human fellowship.",
    },
    influenceRegions: [
      {
        region: "Mediterranean",
        startYear: 50,
        endYear: 200,
        confidence: "medium",
        qualitative: true,
        note: "Latin Stoic writings helped transmit imperial-period philosophy. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
      {
        region: "Europe",
        startYear: 1400,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "SEP documents Renaissance revival and renewed contemporary interest in his philosophy. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Seneca",
        url: "https://plato.stanford.edu/entries/seneca/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. SEP gives birth c1 BCE; c4 BCE is another common estimate. Astronomical year0 means1 BCE. His wealth and proximity to Nero complicate the relation between his moral writing and political life.",
  },
  {
    id: "epictetus",
    name: "Epictetus",
    birthYear: 55,
    deathYear: 135,
    datesApproximate: true,
    tradition: "Roman Stoicism",
    era: "Antiquity",
    questionLane: "ethics",
    coreIdea:
      "Freedom rests on the disciplined use of impressions and volition; external outcomes do not determine whether one acts with integrity.",
    works: [
      {
        title: "Discourses (recorded by Arrian)",
        year: 108,
        dateKind: "lecture",
        approximate: true,
        note: "SEP places the teaching around 108; surviving text was recorded and transmitted by Arrian.",
      },
      {
        title: "Encheiridion (Handbook, compiled by Arrian)",
        year: 125,
        dateKind: "composition",
        approximate: true,
        note: "An abridgment of the teaching; c 125 is a conventional display date, not a secure composition year.",
      },
    ],
    locations: [
      {
        city: "Nicopolis",
        country: "Greece",
        lat: 39.025,
        lon: 20.733,
        startYear: 89,
        endYear: 135,
        approximate: true,
        note: "School after presumed expulsion from Rome under Domitian; both boundary dates are approximate.",
      },
    ],
    coordinates: {
      reality: -0.35,
      knowledge: 0.5,
      ethics: -0.2,
    },
    coordinateRationale: {
      reality:
        "His ethical framework assumes Stoic nature and rational divine order without a separate modern mind-first ontology.",
      knowledge:
        "Reason tests impressions and distinguishes judgment from what happens externally.",
      ethics:
        "Personal integrity is central, alongside duties grounded in kinship and social roles.",
    },
    influenceRegions: [
      {
        region: "Mediterranean",
        startYear: 100,
        endYear: 600,
        confidence: "medium",
        qualitative: true,
        note: "Marcus Aurelius and later commentators including Simplicius engaged his teaching. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
      {
        region: "Europe",
        startYear: 1497,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Latin translation in 1497 and subsequent European popularity are documented; modern engagement continues. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Epictetus",
        url: "https://plato.stanford.edu/entries/epictetus/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Birth is somewhere in the50 s and death around 135. He did not prepare the surviving texts himself. An injunction about what is “up to us” concerns responsible agency, not a promise of control over every outcome.",
  },
  {
    id: "marcus-aurelius",
    name: "Marcus Aurelius",
    birthYear: 121,
    deathYear: 180,
    datesApproximate: false,
    tradition: "Roman Stoicism",
    era: "Antiquity",
    questionLane: "ethics",
    coreIdea:
      "Attend to the judgment and action of the present moment; accepting one’s place in nature must accompany just action for a shared human community.",
    works: [
      {
        title: "Meditations",
        year: 180,
        dateKind: "composition",
        approximate: true,
        note: "Private reflections composed in the later reign, partly during military campaigns;180 marks an approximate endpoint.",
      },
    ],
    locations: [
      {
        city: "Rome",
        country: "Italy",
        lat: 41.9028,
        lon: 12.4964,
        startYear: 161,
        endYear: 161,
        approximate: false,
        note: "Accession as Emperor of Rome; this marker records a political event, not an assumed continuous residence.",
      },
    ],
    coordinates: {
      reality: -0.35,
      knowledge: 0.4,
      ethics: 0.55,
    },
    coordinateRationale: {
      reality:
        "Stoic nature frames his reflections, though he repeatedly considers the alternative of providence or atoms.",
      knowledge:
        "Examining and correcting impressions through rational judgment guides practice.",
      ethics:
        "Justice and service to the cosmopolis supplement individual moral discipline.",
    },
    influenceRegions: [],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Marcus Aurelius",
        url: "https://plato.stanford.edu/entries/marcus-aurelius/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Meditations was written to himself and has an uncertain composition history. Military-campaign locations are omitted because the inspected article does not give precise dated city intervals. No reception region is invented from imperial territory.",
  },
  {
    id: "plotinus",
    name: "Plotinus",
    birthYear: 204,
    deathYear: 270,
    datesApproximate: true,
    tradition: "Neoplatonism",
    era: "Antiquity",
    questionLane: "reality",
    coreIdea:
      "Reality is understood through the One, Intellect, and Soul; philosophical life turns toward their unity without reducing the One to an ordinary object.",
    works: [
      {
        title: "Enneads",
        year: 270,
        dateKind: "composition",
        approximate: true,
        note: "Treatises composed after his first decade in Rome, up to his death in 270; Porphyry arranged them posthumously into the Enneads. A secure edition year is not asserted here.",
      },
    ],
    locations: [
      {
        city: "Rome",
        country: "Italy",
        lat: 41.9028,
        lon: 12.4964,
        startYear: 244,
        endYear: 269,
        approximate: true,
        note: "Founded a teaching circle in Rome; final illness took him to Campania.",
      },
    ],
    coordinates: {
      reality: 0.95,
      knowledge: 0.6,
      ethics: -0.1,
    },
    coordinateRationale: {
      reality:
        "The One and intelligible reality have priority over the material world.",
      knowledge:
        "Intellectual and contemplative understanding exceed ordinary sensation.",
      ethics:
        "Ethical purification focuses on the soul’s transformation while allowing civic virtues.",
    },
    influenceRegions: [
      {
        region: "Mediterranean",
        startYear: 250,
        endYear: 600,
        confidence: "medium",
        qualitative: true,
        note: "Later Neoplatonic schools developed this metaphysical inheritance. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
      {
        region: "Europe",
        startYear: 1400,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Renaissance translations and Platonism renewed Latin reception. Broad reception window is editorial, not a measured spread; the date endpoints are editorial. Extended through the dataset date to include continuing scholarly reception; this does not imply uninterrupted or uniform reception.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Plotinus",
        url: "https://plato.stanford.edu/entries/plotinus/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Birth is often c 204/205. The Enneads’ arrangement is Porphyry’s editorial work. SEP verifies his Roman school and Porphyry’s arrangement. The 270 marker represents the approximate end of the treatise-composition period, not a first publication year; the posthumous collection’s familiar c 301 dating is not asserted from this article.",
  },
  {
    id: "augustine",
    name: "Augustine of Hippo",
    birthYear: 354,
    deathYear: 430,
    datesApproximate: false,
    tradition: "Christian Platonism",
    era: "Medieval",
    questionLane: "reality",
    coreIdea:
      "Human beings seek a good they cannot secure by will alone; inward reflection, divine illumination, and grace reshape the search for truth and love.",
    works: [
      {
        title: "Confessions",
        year: 400,
        dateKind: "composition",
        approximate: true,
        note: "Written c 397–400.",
      },
      {
        title: "The City of God",
        year: 426,
        dateKind: "composition",
        approximate: false,
        note: "Written across 413–426; date marks completion.",
      },
    ],
    locations: [
      {
        city: "Hippo Regius",
        country: "Algeria",
        lat: 36.9,
        lon: 7.7667,
        startYear: 391,
        endYear: 430,
        approximate: true,
        note: "Priest from 391 and bishop from c 395/396; city is present-day Annaba.",
      },
    ],
    coordinates: {
      reality: 0.8,
      knowledge: 0.55,
      ethics: 0.3,
    },
    coordinateRationale: {
      reality: "God and immaterial truth ground changing created reality.",
      knowledge:
        "Inner reflection and illumination supplement, rather than erase, sensory knowledge.",
      ethics:
        "Love and membership in communities matter, but salvation also concerns each soul.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 500,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Latin Christian theology and philosophy repeatedly engaged his writings. Broad reception window is editorial, not a measured spread; the date endpoints are editorial. Extended through the dataset date to include continuing scholarly reception; this does not imply uninterrupted or uniform reception.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Augustine of Hippo",
        url: "https://plato.stanford.edu/entries/augustine/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Modern country labels orient the map; they are not ancient political boundaries. Medieval periodization here includes late-antique Christian sources.",
  },
  {
    id: "aquinas",
    name: "Thomas Aquinas",
    birthYear: 1225,
    deathYear: 1274,
    datesApproximate: true,
    tradition: "Scholastic Aristotelianism",
    era: "Medieval",
    questionLane: "reality",
    coreIdea:
      "Reason can investigate created being and moral life; revelation concerns truths beyond unaided reason, with faith and reason distinct but compatible.",
    works: [
      {
        title: "Summa theologiae",
        year: 1273,
        dateKind: "composition",
        approximate: true,
        note: "SEP dates composition c 1267–1273, left unfinished. Other chronologies often begin in 1265; this marker is the endpoint of writing, not a first publication.",
      },
      {
        title: "Summa contra Gentiles",
        year: 1265,
        dateKind: "composition",
        approximate: true,
        note: "SEP dates composition 1259–1265; other chronologies give completion around 1264.",
      },
    ],
    locations: [
      {
        city: "Paris",
        country: "France",
        lat: 48.8566,
        lon: 2.3522,
        startYear: 1252,
        endYear: 1259,
        approximate: false,
        note: "First university teaching period.",
      },
      {
        city: "Paris",
        country: "France",
        lat: 48.8566,
        lon: 2.3522,
        startYear: 1268,
        endYear: 1272,
        approximate: true,
        note: "Second Paris period; SEP dates the request to return to 1268 and describes a four-year term ending in 1272. Arrival is often conventionally dated 1269.",
      },
      {
        city: "Naples",
        country: "Italy",
        lat: 40.8518,
        lon: 14.2681,
        startYear: 1272,
        endYear: 1273,
        approximate: false,
        note: "Final teaching and writing period after the second Paris term; stopped writing in late 1273. His 1274 journey and death elsewhere are not plotted as residence.",
      },
    ],
    coordinates: {
      reality: 0.45,
      knowledge: 0.6,
      ethics: 0.35,
    },
    coordinateRationale: {
      reality:
        "Created substances have matter and form; God is immaterial and the cause of being.",
      knowledge:
        "Natural reasoning has a genuine domain, alongside truths known by revelation.",
      ethics:
        "Virtue and natural law connect personal flourishing with the common good.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 1250,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Scholastic debate and later Thomist traditions developed his work. Broad reception window is editorial, not a measured spread; the date endpoints are editorial. Extended through the dataset date to include continuing scholarly reception; this does not imply uninterrupted or uniform reception.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Thomas Aquinas",
        url: "https://plato.stanford.edu/entries/aquinas/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Birth is usually c 1225; precise date is uncertain. The Summa’s posthumous Supplement was compiled from earlier material. The inspected SEP work chronology dates Summa contra Gentiles1259–1265 and Summa theologiae1267–1273; familiar alternative starting and completion estimates remain explicitly noted.",
  },
  {
    id: "machiavelli",
    name: "Niccolò Machiavelli",
    birthYear: 1469,
    deathYear: 1527,
    datesApproximate: false,
    tradition: "Renaissance political thought",
    era: "Early modern",
    questionLane: "politics",
    coreIdea:
      "Political order must confront conflict, contingency, and the effects of action; his republican writings and advice to princes pursue different institutional problems.",
    works: [
      {
        title: "The Prince",
        year: 1513,
        dateKind: "composition",
        approximate: false,
        note: "First published posthumously in 1532.",
      },
      {
        title: "Discourses on Livy",
        year: 1531,
        dateKind: "posthumous",
        approximate: false,
        note: "Composed chiefly c 1513–1519.",
      },
    ],
    locations: [
      {
        city: "Florence",
        country: "Italy",
        lat: 43.7696,
        lon: 11.2558,
        startYear: 1498,
        endYear: 1512,
        approximate: false,
        note: "Secretary and diplomat for the Florentine republic; missions involved travel.",
      },
    ],
    coordinates: {
      reality: -0.25,
      knowledge: -0.55,
      ethics: 0.6,
    },
    coordinateRationale: {
      reality:
        "Attention falls on worldly political forces, without a systematic materialist ontology.",
      knowledge:
        "Historical examples and observation of political conduct guide judgment.",
      ethics:
        "Republican liberty and durable political institutions frame much of his work.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 1530,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Early-modern political writers debated his republican and princely arguments. Broad reception window is editorial, not a measured spread; the date endpoints are editorial. Extended through the dataset date to include continuing scholarly reception; this does not imply uninterrupted or uniform reception.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Niccolò Machiavelli",
        url: "https://plato.stanford.edu/entries/machiavelli/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. The Prince alone cannot represent his entire political thought; the relation between its counsel and republican commitments remains debated.",
  },
  {
    id: "bacon",
    name: "Francis Bacon",
    birthYear: 1561,
    deathYear: 1626,
    datesApproximate: false,
    tradition: "Empiricism; scientific reform",
    era: "Early modern",
    questionLane: "knowledge",
    coreIdea:
      "Knowledge should advance through disciplined inquiry, experiments, and criticism of habitual errors, with research organized for human benefit.",
    works: [
      {
        title: "Novum Organum",
        year: 1620,
        dateKind: "publication",
        approximate: false,
      },
      {
        title: "The Advancement of Learning",
        year: 1605,
        dateKind: "publication",
        approximate: false,
      },
    ],
    locations: [
      {
        city: "London",
        country: "United Kingdom",
        lat: 51.5074,
        lon: -0.1278,
        startYear: 1603,
        endYear: 1621,
        approximate: true,
        note: "Principal period of royal service, culminating in the lord chancellorship; not a complete residence history.",
      },
    ],
    coordinates: {
      reality: -0.45,
      knowledge: -0.8,
      ethics: 0.5,
    },
    coordinateRationale: {
      reality:
        "Natural inquiry studies bodies and processes; this does not imply denying religion.",
      knowledge:
        "Methodical observation and experiment challenge premature abstract generalization.",
      ethics: "The reform of learning aims at shared practical improvement.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 1600,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Programs of experimental natural philosophy adopted and debated Baconian ideals. Broad reception window is editorial, not a measured spread; the date endpoints are editorial. Extended through the dataset date to include continuing scholarly reception; this does not imply uninterrupted or uniform reception.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Francis Bacon",
        url: "https://plato.stanford.edu/entries/francis-bacon/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. His proposed inductive method differs from a simple accumulation of observations.",
  },
  {
    id: "hobbes",
    name: "Thomas Hobbes",
    birthYear: 1588,
    deathYear: 1679,
    datesApproximate: false,
    tradition: "Materialism; social contract",
    era: "Early modern",
    questionLane: "politics",
    coreIdea:
      "Without a common power, insecurity can undermine cooperation; authorization of a sovereign is meant to secure peace among vulnerable people.",
    works: [
      {
        title: "Leviathan",
        year: 1651,
        dateKind: "publication",
        approximate: false,
      },
      {
        title: "De Cive",
        year: 1642,
        dateKind: "publication",
        approximate: false,
      },
    ],
    locations: [
      {
        city: "Paris",
        country: "France",
        lat: 48.8566,
        lon: 2.3522,
        startYear: 1640,
        endYear: 1651,
        approximate: false,
        note: "Exile during the period of the English Civil Wars.",
      },
    ],
    coordinates: {
      reality: -0.9,
      knowledge: -0.25,
      ethics: 0.6,
    },
    coordinateRationale: {
      reality: "Bodies and motion underpin his philosophical system.",
      knowledge:
        "Ideas arise from sensation; definitions and calculation nevertheless organize scientific explanation. This mixed placement reflects both commitments.",
      ethics:
        "Political authority coordinates individuals for public peace, though its basis includes self-preservation.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 1650,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Debates about sovereignty and political obligation engaged Hobbes’s arguments. Broad reception window is editorial, not a measured spread; the date endpoints are editorial. Extended through the dataset date to include continuing scholarly reception; this does not imply uninterrupted or uniform reception.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Thomas Hobbes",
        url: "https://plato.stanford.edu/entries/hobbes/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. The ethics coordinate represents the public coordination of authority, not a claim that Hobbes endorses modern collectivism.",
  },
  {
    id: "descartes",
    name: "René Descartes",
    birthYear: 1596,
    deathYear: 1650,
    datesApproximate: false,
    tradition: "Rationalism",
    era: "Early modern",
    questionLane: "knowledge",
    coreIdea:
      "Methodical doubt seeks secure foundations in thought; mind and body are distinct kinds of substance, with difficult questions about their interaction.",
    works: [
      {
        title: "Meditations on First Philosophy",
        year: 1641,
        dateKind: "publication",
        approximate: false,
      },
      {
        title: "Discourse on the Method",
        year: 1637,
        dateKind: "publication",
        approximate: false,
      },
    ],
    locations: [
      {
        city: "Franeker",
        country: "Netherlands",
        lat: 53.1855,
        lon: 5.5412,
        startYear: 1629,
        endYear: 1629,
        approximate: true,
        note: "Registered at the university in April 1629; single-year attestation, not a continuous multi-year residence.",
      },
      {
        city: "Amsterdam",
        country: "Netherlands",
        lat: 52.3676,
        lon: 4.9041,
        startYear: 1629,
        endYear: 1630,
        approximate: true,
        note: "A letter of November 1629 is sent from his new Amsterdam residence; departure endpoint is approximate.",
      },
      {
        city: "Stockholm",
        country: "Sweden",
        lat: 59.3293,
        lon: 18.0686,
        startYear: 1649,
        endYear: 1650,
        approximate: false,
        note: "Arrival in Sweden in September 1649 and service at Queen Christina’s Stockholm court, until his death.",
      },
    ],
    coordinates: {
      reality: 0.25,
      knowledge: 0.95,
      ethics: -0.1,
    },
    coordinateRationale: {
      reality:
        "Mind–body dualism gives irreducible standing to both; a positive value records the emphasis on thinking substance.",
      knowledge:
        "Clear and distinct reasoning grounds the foundational project, alongside empirical science.",
      ethics:
        "The practical moral outlook stresses the agent’s judgment and control of desires.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 1640,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Cartesian debates reshaped philosophy and natural science across European institutions. Broad reception window is editorial, not a measured spread; the date endpoints are editorial. Extended through the dataset date to include continuing scholarly reception; this does not imply uninterrupted or uniform reception.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: René Descartes",
        url: "https://plato.stanford.edu/entries/descartes/",
        verified: true,
      },
      {
        label: "Internet Encyclopedia of Philosophy: René Descartes",
        url: "https://iep.utm.edu/descarte/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. A positive reality coordinate does not classify dualism as idealism. Amsterdam marks one residence, not the Netherlands as a single permanent home. SEP documents frequent moves within the Netherlands from 1628/1629 to 1649 but does not provide a complete dated city itinerary; those unrecorded locations are left unknown. IEP supports the Stockholm interval.",
  },
  {
    id: "elisabeth",
    name: "Elisabeth of Bohemia",
    birthYear: 1618,
    deathYear: 1680,
    datesApproximate: false,
    tradition: "Early modern philosophy; Cartesian correspondence",
    era: "Early modern",
    questionLane: "reality",
    coreIdea:
      "If mind is immaterial, how can it move a body? Demanding an intelligible account of causal interaction exposes a central difficulty in Cartesian dualism.",
    works: [
      {
        title: "Correspondence with René Descartes",
        year: 1643,
        dateKind: "composition",
        approximate: false,
        note: "Philosophical exchange runs 1643–1650; publication came later and is not represented by this year.",
      },
    ],
    locations: [
      {
        city: "Herford",
        country: "Germany",
        lat: 52.1177,
        lon: 8.6794,
        startYear: 1660,
        endYear: 1680,
        approximate: false,
        note: "Entered the Lutheran convent in 1660 and became abbess in 1667.",
      },
    ],
    coordinates: {
      reality: 0,
      knowledge: 0.55,
      ethics: -0.1,
    },
    coordinateRationale: {
      reality:
        "Her probing of mind–body causation does not establish that she endorsed materialism or rejected dualism outright.",
      knowledge:
        "Argumentative challenges demand explanatory adequacy while attending to bodily experience and emotion.",
      ethics:
        "Questions about virtue and personal well-being accompany practical responsibilities for a community.",
    },
    influenceRegions: [],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Elisabeth of Bohemia",
        url: "https://plato.stanford.edu/entries/elisabeth-bohemia/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Her philosophical positions must be reconstructed from correspondence; she left no known systematic philosophical treatise. Her own inquiries should not be reduced to their usefulness for explaining Descartes.",
  },
  {
    id: "spinoza",
    name: "Baruch Spinoza",
    birthYear: 1632,
    deathYear: 1677,
    datesApproximate: false,
    tradition: "Rationalism",
    era: "Early modern",
    questionLane: "reality",
    coreIdea:
      "A single substance, God or Nature, is expressed through thought and extension; understanding necessity can transform passive emotions into greater freedom.",
    works: [
      {
        title: "Ethics",
        year: 1677,
        dateKind: "posthumous",
        approximate: false,
      },
      {
        title: "Theological-Political Treatise",
        year: 1670,
        dateKind: "publication",
        approximate: false,
      },
    ],
    locations: [
      {
        city: "The Hague",
        country: "Netherlands",
        lat: 52.0705,
        lon: 4.3007,
        startYear: 1670,
        endYear: 1677,
        approximate: false,
        note: "Final residence and philosophical work.",
      },
    ],
    coordinates: {
      reality: 0,
      knowledge: 0.9,
      ethics: 0.25,
    },
    coordinateRationale: {
      reality:
        "Thought and extension express the same substance; neither pole adequately captures this monism.",
      knowledge:
        "The geometrical method and adequate ideas emphasize rational understanding.",
      ethics:
        "Freedom involves individual understanding and the institutions that protect shared civic life.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 1670,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Religious-political controversy and later German philosophical debates sustained reception. Broad reception window is editorial, not a measured spread; the date endpoints are editorial. Extended through the dataset date to include continuing scholarly reception; this does not imply uninterrupted or uniform reception.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Baruch Spinoza",
        url: "https://plato.stanford.edu/entries/spinoza/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Substance monism is not equivalent to materialism or subjective idealism; the neutral reality position is deliberate.",
  },
  {
    id: "locke",
    name: "John Locke",
    birthYear: 1632,
    deathYear: 1704,
    datesApproximate: false,
    tradition: "Empiricism; liberal political thought",
    era: "Early modern",
    questionLane: "knowledge",
    coreIdea:
      "Ideas arise through sensation and reflection; legitimate government depends on consent and the protection of rights, with limits on authority.",
    works: [
      {
        title: "An Essay Concerning Human Understanding",
        year: 1690,
        dateKind: "publication",
        approximate: false,
        note: "Title-page year; released in late 1689.",
      },
      {
        title: "Two Treatises of Government",
        year: 1690,
        dateKind: "publication",
        approximate: false,
        note: "Title-page year; released in 1689.",
      },
    ],
    locations: [
      {
        city: "Oxford",
        country: "United Kingdom",
        lat: 51.752,
        lon: -1.2577,
        startYear: 1652,
        endYear: 1667,
        approximate: true,
        note: "Study and association with Christ Church; the interval does not imply uninterrupted presence.",
      },
    ],
    coordinates: {
      reality: -0.25,
      knowledge: -0.9,
      ethics: -0.55,
    },
    coordinateRationale: {
      reality:
        "He assumes an external world while treating the underlying nature of substance cautiously.",
      knowledge:
        "Sensation and reflection supply ideas; he rejects innate principles.",
      ethics: "Individual rights and consent constrain political authority.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 1690,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Enlightenment debates engaged his epistemology and political arguments. Broad reception window is editorial, not a measured spread; the date endpoints are editorial. Extended through the dataset date to include continuing scholarly reception; this does not imply uninterrupted or uniform reception.",
      },
      {
        region: "North America",
        startYear: 1750,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Rights and consent arguments entered Atlantic constitutional debates. Broad reception window is editorial, not a measured spread; the date endpoints are editorial. Extended through the dataset date to include continuing scholarly reception; this does not imply uninterrupted or uniform reception.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: John Locke",
        url: "https://plato.stanford.edu/entries/locke/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Publication dates follow familiar title-page convention. His toleration was limited, and his connections to colonial institutions complicate a purely emancipatory reading.",
  },
  {
    id: "leibniz",
    name: "Gottfried Wilhelm Leibniz",
    birthYear: 1646,
    deathYear: 1716,
    datesApproximate: false,
    tradition: "Rationalism",
    era: "Early modern",
    questionLane: "reality",
    coreIdea:
      "Reality consists of active simple substances, or monads; their perspectives coordinate through a divinely ordered harmony rather than direct causal interaction.",
    works: [
      {
        title: "Discourse on Metaphysics",
        year: 1686,
        dateKind: "composition",
        approximate: false,
        note: "Unpublished during his lifetime.",
      },
      {
        title: "Monadology",
        year: 1714,
        dateKind: "composition",
        approximate: false,
        note: "First appeared posthumously in German translation in 1720.",
      },
    ],
    locations: [
      {
        city: "Hanover",
        country: "Germany",
        lat: 52.3759,
        lon: 9.732,
        startYear: 1676,
        endYear: 1716,
        approximate: false,
        note: "Service to the Hanoverian court, with substantial travel.",
      },
    ],
    coordinates: {
      reality: 0.8,
      knowledge: 0.95,
      ethics: 0.05,
    },
    coordinateRationale: {
      reality:
        "Monads are nonextended substances with perception, not physical atoms.",
      knowledge:
        "Principles such as sufficient reason structure metaphysical explanation.",
      ethics:
        "The system links individual substances to a common order without supplying a simple modern political classification.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 1700,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Leibnizian and Wolffian debates influenced continental metaphysics. Broad reception window is editorial, not a measured spread; the date endpoints are editorial. Extended through the dataset date to include continuing scholarly reception; this does not imply uninterrupted or uniform reception.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Gottfried Wilhelm Leibniz",
        url: "https://plato.stanford.edu/entries/leibniz/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Composition is distinguished from publication; the Monadology’s familiar title and publication history are later.",
  },
  {
    id: "astell",
    name: "Mary Astell",
    birthYear: 1666,
    deathYear: 1731,
    datesApproximate: false,
    tradition: "Early modern rationalism; philosophy of women’s education",
    era: "Early modern",
    questionLane: "ethics",
    coreIdea:
      "Women should cultivate reason and independent judgment through education; criticism of marriage’s power relations challenges dependence while remaining grounded in Christian commitments.",
    works: [
      {
        title: "A Serious Proposal to the Ladies",
        year: 1694,
        dateKind: "publication",
        approximate: false,
        note: "PartI in 1694; PartII in 1697.",
      },
      {
        title: "Some Reflections upon Marriage",
        year: 1700,
        dateKind: "publication",
        approximate: false,
      },
    ],
    locations: [
      {
        city: "London",
        country: "United Kingdom",
        lat: 51.5074,
        lon: -0.1278,
        startYear: 1694,
        endYear: 1731,
        approximate: true,
        note: "Adult writing career was in London; start marks a major publication, not a verified arrival date.",
      },
    ],
    coordinates: {
      reality: 0.35,
      knowledge: 0.8,
      ethics: -0.1,
    },
    coordinateRationale: {
      reality:
        "Christian Cartesian dualism recognizes minds and bodies without reducing either to the other.",
      knowledge:
        "Rational education and a method of reflection oppose unexamined opinion and imposed intellectual dependence.",
      ethics:
        "Care of the self and women’s agency require educational communities and critique of marriage.",
    },
    influenceRegions: [],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Mary Astell",
        url: "https://plato.stanford.edu/entries/astell/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. SEP describes adult life in London but does not date her arrival; the map anchor is a publishing-period approximation. Her religious and Tory commitments prevent equating her proposals with all later liberal feminism.",
  },
  {
    id: "berkeley",
    name: "George Berkeley",
    birthYear: 1685,
    deathYear: 1753,
    datesApproximate: false,
    tradition: "Immaterialism",
    era: "Enlightenment",
    questionLane: "reality",
    coreIdea:
      "Perceived objects are ideas rather than mind-independent material substances; spirits perceive, and the world’s continuity depends on God.",
    works: [
      {
        title: "A Treatise Concerning the Principles of Human Knowledge",
        year: 1710,
        dateKind: "publication",
        approximate: false,
      },
      {
        title: "Three Dialogues between Hylas and Philonous",
        year: 1713,
        dateKind: "publication",
        approximate: false,
      },
    ],
    locations: [
      {
        city: "Dublin",
        country: "Ireland",
        lat: 53.3498,
        lon: -6.2603,
        startYear: 1707,
        endYear: 1713,
        approximate: true,
        note: "Trinity College fellowship and early philosophical writing.",
      },
    ],
    coordinates: {
      reality: 1,
      knowledge: -0.8,
      ethics: 0.1,
    },
    coordinateRationale: {
      reality:
        "He denies material substance while affirming ideas and perceiving spirits.",
      knowledge:
        "Ideas originate in experience; abstract material substance exceeds what perception supports.",
      ethics:
        "Moral and religious commitments matter, but no simple individual–collective classification follows from immaterialism.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 1710,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Empiricism and later idealist debates engaged his critique of matter. Broad reception window is editorial, not a measured spread; the date endpoints are editorial. Extended through the dataset date to include continuing scholarly reception; this does not imply uninterrupted or uniform reception.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: George Berkeley",
        url: "https://plato.stanford.edu/entries/berkeley/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Immaterialism is not the claim that only Berkeley’s own mind exists; other spirits and God have crucial roles.",
  },
  {
    id: "hume",
    name: "David Hume",
    birthYear: 1711,
    deathYear: 1776,
    datesApproximate: false,
    tradition: "Empiricism; skepticism",
    era: "Enlightenment",
    questionLane: "knowledge",
    coreIdea:
      "Beliefs about causation and the world depend on habits shaped by experience; moral evaluation draws on sentiment rather than reason alone.",
    works: [
      {
        title: "A Treatise of Human Nature",
        year: 1739,
        dateKind: "publication",
        approximate: false,
        note: "Books I–II in 1739; Book III in 1740.",
      },
      {
        title: "An Enquiry Concerning Human Understanding",
        year: 1748,
        dateKind: "publication",
        approximate: false,
        note: "Published in 1748 as Philosophical Essays concerning Human Understanding; renamed in the 1758 edition.",
      },
    ],
    locations: [
      {
        city: "Edinburgh",
        country: "United Kingdom",
        lat: 55.9533,
        lon: -3.1883,
        startYear: 1752,
        endYear: 1763,
        approximate: true,
        note: "Advocates Library employment in Edinburgh from 1752, before departure for diplomatic service in Paris in 1763.",
      },
    ],
    coordinates: {
      reality: -0.1,
      knowledge: -0.95,
      ethics: 0.05,
    },
    coordinateRationale: {
      reality:
        "He suspends many metaphysical claims; skepticism cannot be equated with materialism.",
      knowledge:
        "Experience and habit explain belief beyond what demonstrative reason can justify.",
      ethics:
        "Moral sentiment includes sympathy and social utility as well as personal character.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 1740,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Debates over empiricism, religion, and Kant’s response carried his philosophical reception. Broad reception window is editorial, not a measured spread; the date endpoints are editorial. Extended through the dataset date to include continuing scholarly reception; this does not imply uninterrupted or uniform reception.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: David Hume",
        url: "https://plato.stanford.edu/entries/hume/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. The skeptical argument and Hume’s naturalistic description of ordinary belief should be read together.",
  },
  {
    id: "rousseau",
    name: "Jean-Jacques Rousseau",
    birthYear: 1712,
    deathYear: 1778,
    datesApproximate: false,
    tradition: "Enlightenment political philosophy",
    era: "Enlightenment",
    questionLane: "politics",
    coreIdea:
      "Social dependence can corrupt freedom; legitimate political association requires citizens to participate in laws directed to a common good.",
    works: [
      {
        title: "Discourse on the Origin of Inequality",
        year: 1755,
        dateKind: "publication",
        approximate: false,
      },
      {
        title: "The Social Contract",
        year: 1762,
        dateKind: "publication",
        approximate: false,
      },
    ],
    locations: [
      {
        city: "Chambéry",
        country: "France",
        lat: 45.5646,
        lon: 5.9178,
        startYear: 1731,
        endYear: 1740,
        approximate: true,
        note: "Returned to Mme de Warens in 1731 and lived near Chambéry through much of the 1730 s; departure endpoint is approximate.",
      },
      {
        city: "Paris",
        country: "France",
        lat: 48.8566,
        lon: 2.3522,
        startYear: 1744,
        endYear: 1756,
        approximate: false,
        note: "More permanent Paris residence began in 1744 after a brief Venice diplomatic posting; left for a country house in 1756.",
      },
      {
        city: "Paris",
        country: "France",
        lat: 48.8566,
        lon: 2.3522,
        startYear: 1770,
        endYear: 1778,
        approximate: true,
        note: "Returned in 1770 according to IEP; final move away before death makes the ending approximate.",
      },
    ],
    coordinates: {
      reality: -0.15,
      knowledge: -0.15,
      ethics: 0.8,
    },
    coordinateRationale: {
      reality:
        "Human nature and social development, rather than a matter–mind metaphysics, drive the account.",
      knowledge:
        "Conjectural history and reflection mix experiential and rational methods.",
      ethics:
        "The general will concerns the common good, not the aggregation of private preferences.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 1760,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Revolutionary, republican, and educational debates interpreted his writings in divergent ways. Broad reception window is editorial, not a measured spread; the date endpoints are editorial. Extended through the dataset date to include continuing scholarly reception; this does not imply uninterrupted or uniform reception.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Jean-Jacques Rousseau",
        url: "https://plato.stanford.edu/entries/rousseau/",
        verified: true,
      },
      {
        label: "Internet Encyclopedia of Philosophy: Jean-Jacques Rousseau",
        url: "https://iep.utm.edu/rousseau/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. The general will is not automatically the opinion of a majority; the relation between freedom and civic authority is disputed. SEP supports Chambéry in the 1730 s, Paris from 1744, and a fourteen-month Staffordshire stay from 1766; IEP supplies the 1756 departure and 1770 return. The Staffordshire interval is not plotted because the inspected passage does not identify a city. Switzerland and short stops likewise remain unplotted.",
  },
  {
    id: "kant",
    name: "Immanuel Kant",
    birthYear: 1724,
    deathYear: 1804,
    datesApproximate: false,
    tradition: "Critical philosophy",
    era: "Enlightenment",
    questionLane: "knowledge",
    coreIdea:
      "Experience depends on forms of intuition and concepts supplied by our cognition; moral agency requires principles that can be willed universally.",
    works: [
      {
        title: "Critique of Pure Reason",
        year: 1781,
        dateKind: "publication",
        approximate: false,
        note: "Substantially revised second edition in 1787.",
      },
      {
        title: "Groundwork of the Metaphysics of Morals",
        year: 1785,
        dateKind: "publication",
        approximate: false,
      },
    ],
    locations: [
      {
        city: "Königsberg",
        country: "Russia (present-day Kaliningrad)",
        lat: 54.7104,
        lon: 20.4522,
        startYear: 1755,
        endYear: 1804,
        approximate: false,
        note: "University teaching and later life in then East Prussia; modern name is Kaliningrad.",
      },
    ],
    coordinates: {
      reality: 0.35,
      knowledge: 0.8,
      ethics: -0.1,
    },
    coordinateRationale: {
      reality:
        "Transcendental idealism concerns conditions of experience, not the claim that ordinary objects are mere fantasies.",
      knowledge:
        "A priori forms and concepts organize experience, which remains necessary for empirical knowledge.",
      ethics:
        "Autonomous persons have dignity, while universal law links each agent’s duties to all others.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 1780,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "German idealism and subsequent European debates responded to the critical philosophy. Broad reception window is editorial, not a measured spread; the date endpoints are editorial. Extended through the dataset date to include continuing scholarly reception; this does not imply uninterrupted or uniform reception.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Immanuel Kant",
        url: "https://plato.stanford.edu/entries/kant/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. The reality axis cannot adequately represent the distinction between transcendental idealism and empirical realism. Kant’s racist and sexist writings also require historical scrutiny.",
  },
  {
    id: "wollstonecraft",
    name: "Mary Wollstonecraft",
    birthYear: 1759,
    deathYear: 1797,
    datesApproximate: false,
    tradition: "Enlightenment feminism",
    era: "Enlightenment",
    questionLane: "ethics",
    coreIdea:
      "Women’s apparent dependence is shaped by unequal education and social power; equal cultivation of reason is essential to virtue and freedom.",
    works: [
      {
        title: "A Vindication of the Rights of Men",
        year: 1790,
        dateKind: "publication",
        approximate: false,
      },
      {
        title: "A Vindication of the Rights of Woman",
        year: 1792,
        dateKind: "publication",
        approximate: false,
      },
    ],
    locations: [
      {
        city: "London",
        country: "United Kingdom",
        lat: 51.5074,
        lon: -0.1278,
        startYear: 1787,
        endYear: 1792,
        approximate: true,
        note: "Early professional writing and publishing period before travel to France.",
      },
    ],
    coordinates: {
      reality: 0.1,
      knowledge: 0.65,
      ethics: 0.4,
    },
    coordinateRationale: {
      reality:
        "Her argument does not settle ontology; reason and moral agency receive emphasis.",
      knowledge:
        "Equal education should develop rational judgment instead of prescribed feminine sentimentality.",
      ethics:
        "Equal moral agency requires reform of social institutions as well as personal independence.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 1790,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Debates about women’s rights and education engaged her arguments. Broad reception window is editorial, not a measured spread; the date endpoints are editorial. Extended through the dataset date to include continuing scholarly reception; this does not imply uninterrupted or uniform reception.",
      },
      {
        region: "North America",
        startYear: 1850,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Later feminist thought recovered and reinterpreted her work. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Mary Wollstonecraft",
        url: "https://plato.stanford.edu/entries/wollstonecraft/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Her argument for equal education has limits of class and historical context; later feminist traditions do not form one uniform reception.",
  },
  {
    id: "hegel",
    name: "G. W. F. Hegel",
    birthYear: 1770,
    deathYear: 1831,
    datesApproximate: false,
    tradition: "German idealism",
    era: "19th century",
    questionLane: "reality",
    coreIdea:
      "Freedom and intelligibility develop through relations, conflict, and historical institutions; concepts must be understood through their internal development.",
    works: [
      {
        title: "Phenomenology of Spirit",
        year: 1807,
        dateKind: "publication",
        approximate: false,
      },
      {
        title: "Science of Logic",
        year: 1812,
        dateKind: "publication",
        approximate: false,
        note: "Published in volumes 1812–1816; later revision began before his death.",
      },
    ],
    locations: [
      {
        city: "Berlin",
        country: "Germany",
        lat: 52.52,
        lon: 13.405,
        startYear: 1818,
        endYear: 1831,
        approximate: false,
        note: "University professorship and mature lectures.",
      },
    ],
    coordinates: {
      reality: 0.8,
      knowledge: 0.85,
      ethics: 0.8,
    },
    coordinateRationale: {
      reality:
        "His idealism links being and conceptual intelligibility, not simply an individual mind making the world.",
      knowledge:
        "Dialectical reasoning examines how categories develop and encounter contradictions.",
      ethics:
        "Freedom requires mutual recognition and ethical institutions, rather than isolated choice alone.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 1820,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Hegelian and anti-Hegelian movements shaped European philosophy and social theory. Broad reception window is editorial, not a measured spread; the date endpoints are editorial. Extended through the dataset date to include continuing scholarly reception; this does not imply uninterrupted or uniform reception.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: G. W. F. Hegel",
        url: "https://plato.stanford.edu/entries/hegel/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. “Thesis–antithesis–synthesis” is an unreliable formula for his method. Recognition and historical development remain interpretively contested.",
  },
  {
    id: "schopenhauer",
    name: "Arthur Schopenhauer",
    birthYear: 1788,
    deathYear: 1860,
    datesApproximate: false,
    tradition: "Post-Kantian philosophy",
    era: "19th century",
    questionLane: "meaning",
    coreIdea:
      "The world as experienced is representation; its underlying character is blind striving, and compassion and aesthetic contemplation can loosen desire’s hold.",
    works: [
      {
        title: "The World as Will and Representation",
        year: 1819,
        dateKind: "publication",
        approximate: false,
        note: "Title-page year; first edition released in late 1818.",
      },
      {
        title: "Parerga and Paralipomena",
        year: 1851,
        dateKind: "publication",
        approximate: false,
      },
    ],
    locations: [
      {
        city: "Frankfurt",
        country: "Germany",
        lat: 50.1109,
        lon: 8.6821,
        startYear: 1833,
        endYear: 1860,
        approximate: false,
        note: "Principal final residence.",
      },
    ],
    coordinates: {
      reality: 0.55,
      knowledge: 0.15,
      ethics: -0.2,
    },
    coordinateRationale: {
      reality:
        "Representation depends on cognition, while will names a nonrational underlying reality.",
      knowledge:
        "Immediate awareness of willing and experience complicate his inherited Kantian framework.",
      ethics:
        "Compassion reaches beyond egoism, but release from striving focuses on individual transformation.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 1850,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Artists, writers, and later philosophers responded to his pessimism. Broad reception window is editorial, not a measured spread; the date endpoints are editorial. Extended through the dataset date to include continuing scholarly reception; this does not imply uninterrupted or uniform reception.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Arthur Schopenhauer",
        url: "https://plato.stanford.edu/entries/schopenhauer/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Will is not a conscious plan or a benevolent cosmic mind. The 1818/1819 publication convention is made explicit.",
  },
  {
    id: "mill",
    name: "John Stuart Mill",
    birthYear: 1806,
    deathYear: 1873,
    datesApproximate: false,
    tradition: "Utilitarianism; liberalism",
    era: "19th century",
    questionLane: "ethics",
    coreIdea:
      "Promoting well-being requires attention to the quality of life; liberty protects individuality, and coercion needs justification through harm to others.",
    works: [
      {
        title: "On Liberty",
        year: 1859,
        dateKind: "publication",
        approximate: false,
      },
      {
        title: "Utilitarianism",
        year: 1863,
        dateKind: "publication",
        approximate: false,
        note: "First serialized in 1861; date shown is the book edition.",
      },
      {
        title: "The Subjection of Women",
        year: 1869,
        dateKind: "publication",
        approximate: false,
      },
    ],
    locations: [
      {
        city: "London",
        country: "United Kingdom",
        lat: 51.5074,
        lon: -0.1278,
        startYear: 1823,
        endYear: 1858,
        approximate: true,
        note: "East India Company employment and principal working context; travel and later residence are omitted.",
      },
    ],
    coordinates: {
      reality: -0.3,
      knowledge: -0.7,
      ethics: 0.1,
    },
    coordinateRationale: {
      reality:
        "A naturalistic outlook places human life within the observable world.",
      knowledge:
        "Empiricism and inductive inquiry inform his account of knowledge.",
      ethics:
        "Individual liberty coexists with an impartial standard of general happiness.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 1850,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Liberal, utilitarian, and women’s-rights debates drew on his work. Broad reception window is editorial, not a measured spread; the date endpoints are editorial. Extended through the dataset date to include continuing scholarly reception; this does not imply uninterrupted or uniform reception.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: John Stuart Mill",
        url: "https://plato.stanford.edu/entries/mill/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Utilitarianism is not simple majority preference. Harriet Taylor Mill’s role in his intellectual work must be acknowledged; On Liberty’s dedication credits her influence.",
  },
  {
    id: "kierkegaard",
    name: "Søren Kierkegaard",
    birthYear: 1813,
    deathYear: 1855,
    datesApproximate: false,
    tradition: "Christian existential thought",
    era: "19th century",
    questionLane: "meaning",
    coreIdea:
      "How one exists matters as much as what one can state abstractly; anxiety, choice, and faith expose tensions no detached system can simply resolve.",
    works: [
      {
        title: "Either/Or",
        year: 1843,
        dateKind: "publication",
        approximate: false,
      },
      {
        title: "Fear and Trembling",
        year: 1843,
        dateKind: "publication",
        approximate: false,
      },
    ],
    locations: [
      {
        city: "Copenhagen",
        country: "Denmark",
        lat: 55.6761,
        lon: 12.5683,
        startYear: 1830,
        endYear: 1855,
        approximate: true,
        note: "Study and writing centered here; visits to Berlin interrupt this coarse period.",
      },
    ],
    coordinates: {
      reality: 0.3,
      knowledge: 0.05,
      ethics: -0.85,
    },
    coordinateRationale: {
      reality:
        "Existential and religious commitments take priority over a systematic ontology of matter.",
      knowledge:
        "Indirect communication challenges detached rational explanation without rejecting thought.",
      ethics:
        "Personal responsibility and the single individual stand against unreflective conformity.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 1900,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Twentieth-century existential and theological traditions renewed his reception. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Søren Kierkegaard",
        url: "https://plato.stanford.edu/entries/kierkegaard/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Pseudonymous authors express distinct perspectives and should not be merged into a single direct Kierkegaard doctrine.",
  },
  {
    id: "marx",
    name: "Karl Marx",
    birthYear: 1818,
    deathYear: 1883,
    datesApproximate: false,
    tradition: "Historical materialism",
    era: "19th century",
    questionLane: "politics",
    coreIdea:
      "Social relations of production shape power and consciousness; capitalism generates distinctive forms of exploitation, crisis, and possibilities for collective change.",
    works: [
      {
        title: "The Communist Manifesto",
        year: 1848,
        dateKind: "publication",
        approximate: false,
        note: "Coauthored with Friedrich Engels.",
      },
      {
        title: "Capital, Volume I",
        year: 1867,
        dateKind: "publication",
        approximate: false,
        note: "Later volumes edited and published posthumously by Engels.",
      },
    ],
    locations: [
      {
        city: "London",
        country: "United Kingdom",
        lat: 51.5074,
        lon: -0.1278,
        startYear: 1849,
        endYear: 1883,
        approximate: true,
        note: "Exile, research, and political writing.",
      },
    ],
    coordinates: {
      reality: -0.85,
      knowledge: -0.3,
      ethics: 0.95,
    },
    coordinateRationale: {
      reality:
        "Material social relations and productive activity ground historical explanation.",
      knowledge:
        "Critique draws on historical and economic inquiry as well as conceptual analysis.",
      ethics: "Class relations and collective emancipation are central.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 1850,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Socialist movements and theoretical debates disseminated his work. Broad reception window is editorial, not a measured spread; the date endpoints are editorial. Extended through the dataset date to include continuing scholarly reception; this does not imply uninterrupted or uniform reception.",
      },
      {
        region: "Global",
        startYear: 1900,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Political movements and states adapted Marx’s writings through divergent Marxist traditions. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Karl Marx",
        url: "https://plato.stanford.edu/entries/marx/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Later Marxism, Leninism, and state policies cannot simply be attributed to Marx. Historical explanation should not be reduced to an automatic economic determinism. The SEP article verifies his ideas and major writings but does not document the London 1849–1883 residence interval. Britannica biography retrieval remained blocked and attempted IEP biography paths returned 404, so this conventional geographical claim is not newly verified against a linked text.",
  },
  {
    id: "peirce",
    name: "Charles Sanders Peirce",
    birthYear: 1839,
    deathYear: 1914,
    datesApproximate: false,
    tradition: "Pragmatism; semiotics",
    era: "19th century",
    questionLane: "knowledge",
    coreIdea:
      "Clarify a concept by its conceivable practical consequences; inquiry is a fallible communal process that aims beyond any individual’s present belief.",
    works: [
      {
        title: "The Fixation of Belief",
        year: 1877,
        dateKind: "publication",
        approximate: false,
      },
      {
        title: "How to Make Our Ideas Clear",
        year: 1878,
        dateKind: "publication",
        approximate: false,
      },
    ],
    locations: [
      {
        city: "Milford",
        country: "United States",
        lat: 41.3229,
        lon: -74.8024,
        startYear: 1914,
        endYear: 1914,
        approximate: false,
        note: "SEP records death in Milford in 1914; earlier residence start is not established by the inspected article.",
      },
    ],
    coordinates: {
      reality: 0,
      knowledge: -0.3,
      ethics: 0.6,
    },
    coordinateRationale: {
      reality:
        "His realism about generals and evolutionary metaphysics do not fit reductive materialism.",
      knowledge:
        "Inquiry joins experience, abduction, and logical reasoning under fallibilism.",
      ethics: "An open community of inquiry corrects individual limits.",
    },
    influenceRegions: [
      {
        region: "North America",
        startYear: 1870,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Pragmatism and semiotic research developed his work, often through posthumous editions. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Charles Sanders Peirce",
        url: "https://plato.stanford.edu/entries/peirce/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Pragmatic clarification is not the claim that whatever benefits an individual is true. Dates are publication years of essays. SEP confirms birth and death cities and the 1877–1878 essays. The map records only the Milford death-year attestation because the 1887 residence-start date is not established in the inspected biography.",
  },
  {
    id: "james",
    name: "William James",
    birthYear: 1842,
    deathYear: 1910,
    datesApproximate: false,
    tradition: "Pragmatism; radical empiricism",
    era: "19th century",
    questionLane: "knowledge",
    coreIdea:
      "Ideas gain meaning through their consequences in experience; a pluralistic world and lived commitments complicate the search for one closed philosophical system.",
    works: [
      {
        title: "Pragmatism",
        year: 1907,
        dateKind: "publication",
        approximate: false,
      },
      {
        title: "The Principles of Psychology",
        year: 1890,
        dateKind: "publication",
        approximate: false,
      },
    ],
    locations: [
      {
        city: "Cambridge, Massachusetts",
        country: "United States",
        lat: 42.3736,
        lon: -71.1097,
        startYear: 1872,
        endYear: 1907,
        approximate: true,
        note: "Harvard teaching career, with travel and periods of leave.",
      },
    ],
    coordinates: {
      reality: -0.05,
      knowledge: -0.75,
      ethics: -0.25,
    },
    coordinateRationale: {
      reality:
        "Radical empiricism’s pure experience unsettles a simple mind–matter division.",
      knowledge:
        "Experience and practical consequences guide philosophical inquiry.",
      ethics:
        "Pluralism emphasizes lived perspectives while recognizing social and moral ties.",
    },
    influenceRegions: [
      {
        region: "North America",
        startYear: 1890,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Psychology, religious inquiry, and pragmatism developed his influence. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: William James",
        url: "https://plato.stanford.edu/entries/james/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Truth as practical consequences is not a license to believe convenient falsehoods. His radical empiricism differs from Berkeleyan idealism.",
  },
  {
    id: "nietzsche",
    name: "Friedrich Nietzsche",
    birthYear: 1844,
    deathYear: 1900,
    datesApproximate: false,
    tradition: "Genealogy; critique of morality",
    era: "19th century",
    questionLane: "meaning",
    coreIdea:
      "Inherited moral values have histories and costs; confronting nihilism demands revaluation, creative self-overcoming, and scrutiny of claims to timeless truth.",
    works: [
      {
        title: "Thus Spoke Zarathustra",
        year: 1883,
        dateKind: "publication",
        approximate: false,
        note: "Parts published 1883–1885; date marks the first part.",
      },
      {
        title: "On the Genealogy of Morality",
        year: 1887,
        dateKind: "publication",
        approximate: false,
      },
    ],
    locations: [
      {
        city: "Naumburg",
        country: "Germany",
        lat: 51.1525,
        lon: 11.8097,
        startYear: 1849,
        endYear: 1858,
        approximate: true,
        note: "Family moved after his father’s death; interval ends before boarding school.",
      },
      {
        city: "Basel",
        country: "Switzerland",
        lat: 47.5596,
        lon: 7.5886,
        startYear: 1869,
        endYear: 1879,
        approximate: true,
        note: "Professor of classical philology; illness and leave interrupt teaching.",
      },
      {
        city: "Jena",
        country: "Germany",
        lat: 50.9271,
        lon: 11.5892,
        startYear: 1889,
        endYear: 1890,
        approximate: true,
        note: "Binswanger Clinic after brief Basel hospitalization; released to his mother in March 1890.",
      },
      {
        city: "Naumburg",
        country: "Germany",
        lat: 51.1525,
        lon: 11.8097,
        startYear: 1890,
        endYear: 1897,
        approximate: false,
        note: "Care by his mother following mental collapse.",
      },
      {
        city: "Weimar",
        country: "Germany",
        lat: 50.9795,
        lon: 11.3235,
        startYear: 1897,
        endYear: 1900,
        approximate: false,
        note: "Care by his sister after his mother’s death; not a period of continuing philosophical authorship.",
      },
    ],
    coordinates: {
      reality: -0.5,
      knowledge: -0.25,
      ethics: -0.85,
    },
    coordinateRationale: {
      reality:
        "Embodied life and drives receive priority over a transcendent realm of Forms.",
      knowledge:
        "Perspectival interpretation challenges claims to a wholly detached view from nowhere.",
      ethics:
        "Self-overcoming and exceptional individuality critique herd conformity.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 1890,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Literary, philosophical, and political receptions appropriated his work in conflicting ways. Broad reception window is editorial, not a measured spread; the date endpoints are editorial. Extended through the dataset date to include continuing scholarly reception; this does not imply uninterrupted or uniform reception.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Friedrich Nietzsche",
        url: "https://plato.stanford.edu/entries/nietzsche/",
        verified: true,
      },
      {
        label:
          "Stanford Encyclopedia of Philosophy: Nietzsche’s Life and Works",
        url: "https://plato.stanford.edu/entries/nietzsche-life-works/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Perspectivism does not straightforwardly mean all claims are equally true. The Will to Power is a posthumous editorial compilation, excluded here; Nazi appropriation must be distinguished from his writings. Specialist SEP biography supports the dated care locations. Repeated seasonal visits to Nice and Sils-Maria, and short stays in Turin and other cities, are documented but omitted because a continuous annual city residence would be misleading. His writing activity ended in 1889 despite a lifespan ending in 1900.",
  },
  {
    id: "frege",
    name: "Gottlob Frege",
    birthYear: 1848,
    deathYear: 1925,
    datesApproximate: false,
    tradition: "Logicism; analytic philosophy",
    era: "19th century",
    questionLane: "knowledge",
    coreIdea:
      "A rigorous logic of quantification clarifies inference; distinguishing sense from reference explains how expressions can share a referent yet differ in cognitive significance.",
    works: [
      {
        title: "Begriffsschrift",
        year: 1879,
        dateKind: "publication",
        approximate: false,
      },
      {
        title: "The Foundations of Arithmetic",
        year: 1884,
        dateKind: "publication",
        approximate: false,
      },
      {
        title: "On Sense and Reference",
        year: 1892,
        dateKind: "publication",
        approximate: false,
        note: "Journal article.",
      },
    ],
    locations: [
      {
        city: "Jena",
        country: "Germany",
        lat: 50.9271,
        lon: 11.5892,
        startYear: 1874,
        endYear: 1917,
        approximate: false,
        note: "Lecturer from 1874 and subsequent university career, until retirement in 1917.",
      },
    ],
    coordinates: {
      reality: 0.35,
      knowledge: 0.95,
      ethics: 0,
    },
    coordinateRationale: {
      reality:
        "Numbers and objective thoughts are not reduced to mental images or physical things; a mind coordinate records intelligibility rather than subjectivism.",
      knowledge:
        "Logic and proof, rather than psychological associations, ground the foundational project.",
      ethics:
        "The selected logical writings do not establish an ethical position on this axis.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 1900,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Russell, Wittgenstein, and analytic traditions developed his logical and semantic work. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
      {
        region: "North America",
        startYear: 1940,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Analytic philosophy has extensively developed and debated his semantics. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Gottlob Frege",
        url: "https://plato.stanford.edu/entries/frege/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Russell’s paradox exposed inconsistency in Frege’s attempted arithmetic foundation; not every part of mathematics was successfully derived. His 1924 diary contains fascist sympathies and antisemitism, noted explicitly by SEP.",
  },
  {
    id: "dewey",
    name: "John Dewey",
    birthYear: 1859,
    deathYear: 1952,
    datesApproximate: false,
    tradition: "Pragmatism",
    era: "20th century",
    questionLane: "politics",
    coreIdea:
      "Thinking grows from attempts to resolve problematic situations; democracy is a shared way of inquiry and life, supported by education and revisable institutions.",
    works: [
      {
        title: "Democracy and Education",
        year: 1916,
        dateKind: "publication",
        approximate: false,
      },
      {
        title: "Experience and Nature",
        year: 1925,
        dateKind: "publication",
        approximate: false,
      },
    ],
    locations: [
      {
        city: "New York",
        country: "United States",
        lat: 40.7128,
        lon: -74.006,
        startYear: 1904,
        endYear: 1930,
        approximate: false,
        note: "Columbia University appointment; retirement followed in 1930.",
      },
    ],
    coordinates: {
      reality: -0.45,
      knowledge: -0.75,
      ethics: 0.85,
    },
    coordinateRationale: {
      reality:
        "Naturalism situates mind within organism–environment interactions.",
      knowledge:
        "Experimental inquiry starts from experience and tests consequences.",
      ethics:
        "Democratic participation and education organize collective problem-solving.",
    },
    influenceRegions: [
      {
        region: "North America",
        startYear: 1900,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Pragmatist philosophy and educational reform engaged his work. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
      {
        region: "East Asia",
        startYear: 1910,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Visits and educational debates in China and Japan formed an important reception context. Broad reception window is editorial, not a measured spread; the date endpoints are editorial. Extended through the dataset date to include continuing scholarly reception; this does not imply uninterrupted or uniform reception.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: John Dewey",
        url: "https://plato.stanford.edu/entries/dewey/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Dewey’s pragmatism is not simply vocational training; inquiry and democracy require participation and the criticism of inherited habits.",
  },
  {
    id: "husserl",
    name: "Edmund Husserl",
    birthYear: 1859,
    deathYear: 1938,
    datesApproximate: false,
    tradition: "Phenomenology",
    era: "20th century",
    questionLane: "knowledge",
    coreIdea:
      "Describe how things are given in intentional experience; suspending ordinary assumptions opens an inquiry into meaning and the conditions of objectivity.",
    works: [
      {
        title: "Logical Investigations",
        year: 1900,
        dateKind: "publication",
        approximate: false,
        note: "Two volumes appeared 1900–1901.",
      },
      {
        title: "Ideas I",
        year: 1913,
        dateKind: "publication",
        approximate: false,
      },
    ],
    locations: [
      {
        city: "Freiburg",
        country: "Germany",
        lat: 47.999,
        lon: 7.8421,
        startYear: 1916,
        endYear: 1938,
        approximate: false,
        note: "University appointment to 1928 and continued residence; Nazi persecution affected his final years.",
      },
    ],
    coordinates: {
      reality: 0.6,
      knowledge: 0.35,
      ethics: 0.05,
    },
    coordinateRationale: {
      reality:
        "Transcendental phenomenology examines constitution through consciousness, with interpretations of its idealism debated.",
      knowledge:
        "Careful description of experience joins eidetic analysis rather than ordinary empirical generalization.",
      ethics:
        "Intersubjectivity matters, but no simple political individual–collective stance follows from the method.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 1900,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Phenomenological traditions developed and contested his methods. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Edmund Husserl",
        url: "https://plato.stanford.edu/entries/husserl/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Intentionality means directedness of consciousness, not simply purpose or deliberate intention. Bracketing a claim is not the same as denying it.",
  },
  {
    id: "russell",
    name: "Bertrand Russell",
    birthYear: 1872,
    deathYear: 1970,
    datesApproximate: false,
    tradition: "Analytic philosophy",
    era: "20th century",
    questionLane: "knowledge",
    coreIdea:
      "Logical analysis can clarify apparently simple propositions and expose hidden commitments; philosophical views should remain answerable to argument and evidence.",
    works: [
      {
        title: "The Principles of Mathematics",
        year: 1903,
        dateKind: "publication",
        approximate: false,
      },
      {
        title: "Principia Mathematica",
        year: 1910,
        dateKind: "publication",
        approximate: false,
        note: "Coauthored with Alfred North Whitehead; volumes appeared 1910–1913.",
      },
    ],
    locations: [
      {
        city: "Cambridge",
        country: "United Kingdom",
        lat: 52.2053,
        lon: 0.1218,
        startYear: 1910,
        endYear: 1916,
        approximate: false,
        note: "Trinity College lectureship; dismissal followed his antiwar activity.",
      },
    ],
    coordinates: {
      reality: -0.25,
      knowledge: 0.7,
      ethics: -0.25,
    },
    coordinateRationale: {
      reality:
        "Realism and later neutral monism vary across his career; no single ontology captures it.",
      knowledge:
        "Logical argument carries major weight, alongside empirical knowledge and later scientific emphasis.",
      ethics:
        "Individual freedom and antiwar commitments constrain authority, while reform remains social.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 1900,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Logical analysis helped establish analytic philosophy. Broad reception window is editorial, not a measured spread; the date endpoints are editorial. Extended through the dataset date to include continuing scholarly reception; this does not imply uninterrupted or uniform reception.",
      },
      {
        region: "North America",
        startYear: 1920,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Logic and analytic philosophy developed his intellectual legacy. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Bertrand Russell",
        url: "https://plato.stanford.edu/entries/russell/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. His views changed substantially, including on foundations of mathematics, perception, and neutral monism.",
  },
  {
    id: "wittgenstein",
    name: "Ludwig Wittgenstein",
    birthYear: 1889,
    deathYear: 1951,
    datesApproximate: false,
    tradition: "Analytic philosophy; ordinary language",
    era: "20th century",
    questionLane: "meaning",
    coreIdea:
      "Early work investigates the limits of meaningful representation; later work asks how words function in diverse human practices rather than sharing one hidden essence.",
    works: [
      {
        title: "Tractatus Logico-Philosophicus",
        year: 1921,
        dateKind: "publication",
        approximate: false,
        note: "German publication in 1921; bilingual book edition in 1922.",
      },
      {
        title: "Philosophical Investigations",
        year: 1953,
        dateKind: "posthumous",
        approximate: false,
      },
    ],
    locations: [
      {
        city: "Cambridge",
        country: "United Kingdom",
        lat: 52.2053,
        lon: 0.1218,
        startYear: 1939,
        endYear: 1941,
        approximate: false,
        note: "University professorship before wartime hospital service.",
      },
      {
        city: "Cambridge",
        country: "United Kingdom",
        lat: 52.2053,
        lon: 0.1218,
        startYear: 1944,
        endYear: 1947,
        approximate: true,
        note: "Return to teaching before resignation.",
      },
    ],
    coordinates: {
      reality: 0,
      knowledge: 0.2,
      ethics: 0.05,
    },
    coordinateRationale: {
      reality:
        "His changing approaches resist a stable metaphysical classification on this axis.",
      knowledge:
        "Logical analysis shifts toward attention to the actual use of language.",
      ethics:
        "Shared forms of life matter; this does not by itself settle a political moral doctrine.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 1920,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Logical and ordinary-language traditions responded to different phases of his work. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
      {
        region: "North America",
        startYear: 1930,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Analytic philosophy widely engaged the early and later writings. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Ludwig Wittgenstein",
        url: "https://plato.stanford.edu/entries/wittgenstein/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Early and later philosophy differ substantially. “Language games” do not imply that language is merely arbitrary or that every use has one set of rules.",
  },
  {
    id: "heidegger",
    name: "Martin Heidegger",
    birthYear: 1889,
    deathYear: 1976,
    datesApproximate: false,
    tradition: "Phenomenology; existential ontology",
    era: "20th century",
    questionLane: "meaning",
    coreIdea:
      "Understanding being begins from human existence already involved in a world; temporality, care, and our relation to technology challenge detached accounts of things.",
    works: [
      {
        title: "Being and Time",
        year: 1927,
        dateKind: "publication",
        approximate: false,
      },
      {
        title: "The Question Concerning Technology",
        year: 1954,
        dateKind: "publication",
        approximate: false,
        note: "Developed from a 1953 lecture.",
      },
    ],
    locations: [
      {
        city: "Freiburg",
        country: "Germany",
        lat: 47.999,
        lon: 7.8421,
        startYear: 1928,
        endYear: 1945,
        approximate: false,
        note: "University professorship; rector 1933–1934 and Nazi Party member. Teaching barred after the war.",
      },
    ],
    coordinates: {
      reality: 0.25,
      knowledge: 0.05,
      ethics: -0.4,
    },
    coordinateRationale: {
      reality:
        "The question of being challenges both materialism and traditional subject-centered metaphysics.",
      knowledge:
        "Phenomenological interpretation begins from lived involvement rather than a pure deduction.",
      ethics:
        "Authenticity concerns individual existence, while being-with is also fundamental.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 1920,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Existential and hermeneutic philosophy engaged his work. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Martin Heidegger",
        url: "https://plato.stanford.edu/entries/heidegger/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. His Nazi Party membership and political commitments are central historical facts, not incidental biography; their relation to his philosophy remains heavily debated.",
  },
  {
    id: "sartre",
    name: "Jean-Paul Sartre",
    birthYear: 1905,
    deathYear: 1980,
    datesApproximate: false,
    tradition: "Existentialism",
    era: "20th century",
    questionLane: "meaning",
    coreIdea:
      "There is no fixed human essence that excuses our choices; freedom takes form within situations, and bad faith conceals the responsibility of acting.",
    works: [
      {
        title: "Being and Nothingness",
        year: 1943,
        dateKind: "publication",
        approximate: false,
      },
      {
        title: "Existentialism Is a Humanism",
        year: 1945,
        dateKind: "lecture",
        approximate: false,
        note: "Public lecture in 1945; published as a book in 1946.",
      },
      {
        title: "Critique of Dialectical Reason",
        year: 1960,
        dateKind: "publication",
        approximate: false,
        note: "First volume; further material appeared posthumously.",
      },
    ],
    locations: [
      {
        city: "Paris",
        country: "France",
        lat: 48.8566,
        lon: 2.3522,
        startYear: 1945,
        endYear: 1945,
        approximate: false,
        note: "Documented public lecture after Liberation; sparse marker does not assert a lifelong city itinerary.",
      },
    ],
    coordinates: {
      reality: 0.2,
      knowledge: 0.05,
      ethics: -0.6,
    },
    coordinateRationale: {
      reality:
        "The distinction between consciousness and being-in-itself does not collapse into subjective idealism.",
      knowledge:
        "Phenomenological description and argument explore experience and freedom.",
      ethics:
        "Responsible choice is central, while later social thought examines collective action and material conditions.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 1940,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Postwar existentialism and later critical responses document a continuing European reception. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Jean-Paul Sartre",
        url: "https://plato.stanford.edu/entries/sartre/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. His earlier emphasis on freedom and later engagement with Marxism must be distinguished. Situated freedom does not mean that constraints and oppression are unreal.",
  },
  {
    id: "arendt",
    name: "Hannah Arendt",
    birthYear: 1906,
    deathYear: 1975,
    datesApproximate: false,
    tradition: "Political theory",
    era: "20th century",
    questionLane: "politics",
    coreIdea:
      "Politics becomes possible when plural persons act and speak together; totalitarian rule destroys the public and human conditions that make such action possible.",
    works: [
      {
        title: "The Origins of Totalitarianism",
        year: 1951,
        dateKind: "publication",
        approximate: false,
      },
      {
        title: "The Human Condition",
        year: 1958,
        dateKind: "publication",
        approximate: false,
      },
    ],
    locations: [
      {
        city: "Marburg",
        country: "Germany",
        lat: 50.8075,
        lon: 8.7704,
        startYear: 1924,
        endYear: 1925,
        approximate: false,
        note: "Study with Heidegger for a year.",
      },
      {
        city: "Freiburg",
        country: "Germany",
        lat: 47.999,
        lon: 7.8421,
        startYear: 1925,
        endYear: 1926,
        approximate: true,
        note: "One semester studying with Husserl; interval is coarse.",
      },
      {
        city: "Heidelberg",
        country: "Germany",
        lat: 49.3988,
        lon: 8.6724,
        startYear: 1926,
        endYear: 1929,
        approximate: false,
        note: "Study with Jaspers and completion of her doctorate.",
      },
      {
        city: "Paris",
        country: "France",
        lat: 48.8566,
        lon: 2.3522,
        startYear: 1933,
        endYear: 1939,
        approximate: false,
        note: "Jewish refugee-organization work; this interval follows the detailed SEP biography, rather than its broader introductory summary.",
      },
      {
        city: "New York",
        country: "United States",
        lat: 40.7128,
        lon: -74.006,
        startYear: 1941,
        endYear: 1975,
        approximate: true,
        note: "American residence after forced flight; other university appointments and travel do not imply continuous presence.",
      },
    ],
    coordinates: {
      reality: 0,
      knowledge: -0.1,
      ethics: 0.85,
    },
    coordinateRationale: {
      reality:
        "Her political inquiry does not rest on a simple matter–mind ontology.",
      knowledge:
        "Historical judgment and attention to lived political phenomena guide analysis.",
      ethics:
        "Plurality, public action, and a shared world organize her account of politics.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 1950,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Postwar debates on totalitarianism, judgment, and public action engaged her writings. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
      {
        region: "North America",
        startYear: 1950,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Political theory and public controversy sustained her reception. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Hannah Arendt",
        url: "https://plato.stanford.edu/entries/arendt/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. The “banality of evil” does not mean evil is trivial or deny responsibility. Her accounts of race and social questions have substantial critics. Brief Prague and Geneva stops and her detention and escape in 1940 are not represented by a invented residence span. Paris 1933–1939 records the detailed source’s organizational-work interval; the 1939–1941 map gap is intentional.",
  },
  {
    id: "beauvoir",
    name: "Simone de Beauvoir",
    birthYear: 1908,
    deathYear: 1986,
    datesApproximate: false,
    tradition: "Existentialism; feminism",
    era: "20th century",
    questionLane: "ethics",
    coreIdea:
      "Freedom is situated in bodies and unequal social conditions; an ethics of ambiguity requires taking responsibility for one’s freedom while supporting others’ freedom.",
    works: [
      {
        title: "The Ethics of Ambiguity",
        year: 1947,
        dateKind: "publication",
        approximate: false,
      },
      {
        title: "The Second Sex",
        year: 1949,
        dateKind: "publication",
        approximate: false,
      },
    ],
    locations: [
      {
        city: "Paris",
        country: "France",
        lat: 48.8566,
        lon: 2.3522,
        startYear: 1943,
        endYear: 1986,
        approximate: true,
        note: "Principal writing and public intellectual setting after leaving teaching; travel is omitted.",
      },
    ],
    coordinates: {
      reality: 0,
      knowledge: -0.25,
      ethics: 0.4,
    },
    coordinateRationale: {
      reality:
        "Embodiment and lived situation resist a simple separation of mind and matter.",
      knowledge:
        "Phenomenological and historical accounts attend to lived experience.",
      ethics:
        "Individual freedom is interdependent and requires contesting structures of oppression.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 1940,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Existential and feminist debate developed her work. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
      {
        region: "North America",
        startYear: 1950,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Translations and feminist theory formed a major reception context. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Simone de Beauvoir",
        url: "https://plato.stanford.edu/entries/beauvoir/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. “One is not born, but rather becomes, woman” concerns social formation and lived situation; it should not erase her analysis of embodiment or differences among women.",
  },
  {
    id: "weil",
    name: "Simone Weil",
    birthYear: 1909,
    deathYear: 1943,
    datesApproximate: false,
    tradition: "Ethics; religious philosophy",
    era: "20th century",
    questionLane: "ethics",
    coreIdea:
      "Attention to another person’s affliction challenges the ego; justice requires recognizing needs and obligations before treating people as instruments or abstractions.",
    works: [
      {
        title: "Gravity and Grace",
        year: 1947,
        dateKind: "posthumous",
        approximate: false,
        note: "Edited selection from notebooks by Gustave Thibon.",
      },
      {
        title: "The Need for Roots",
        year: 1949,
        dateKind: "posthumous",
        approximate: false,
        note: "Written in 1943.",
      },
    ],
    locations: [
      {
        city: "Le Puy-en-Velay",
        country: "France",
        lat: 45.0428,
        lon: 3.8854,
        startYear: 1931,
        endYear: 1932,
        approximate: true,
        note: "Early philosophy teaching appointment.",
      },
    ],
    coordinates: {
      reality: 0.55,
      knowledge: -0.15,
      ethics: 0.55,
    },
    coordinateRationale: {
      reality:
        "Religious and Platonic commitments concern a good beyond force and necessity.",
      knowledge:
        "Attention to lived affliction, including factory experience, tempers abstract theorizing.",
      ethics:
        "Obligations and human needs join care for persons to the conditions of community.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 1940,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Posthumous editions fostered ethical, religious, and political reception. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Simone Weil",
        url: "https://plato.stanford.edu/entries/simone-weil/",
        verified: true,
      },
      {
        label: "Internet Encyclopedia of Philosophy: Simone Weil",
        url: "https://iep.utm.edu/weil/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Gravity and Grace is an editorial selection rather than a book prepared by Weil. Her religious commitments cannot be reduced to one institutional affiliation. IEP verifies the 1931 Le Puy appointment but gives a broad teaching period to 1936 that collapses moves and interruptions. This dataset conservatively retains only an approximate early Le Puy interval, not a claim of continuous residence through 1936.",
  },
  {
    id: "camus",
    name: "Albert Camus",
    birthYear: 1913,
    deathYear: 1960,
    datesApproximate: false,
    tradition: "Philosophy of the absurd",
    era: "20th century",
    questionLane: "meaning",
    coreIdea:
      "The clash between our demand for meaning and the world’s silence calls for lucidity, continued living, and a revolt that respects limits and solidarity.",
    works: [
      {
        title: "The Myth of Sisyphus",
        year: 1942,
        dateKind: "publication",
        approximate: false,
      },
      {
        title: "The Rebel",
        year: 1951,
        dateKind: "publication",
        approximate: false,
      },
    ],
    locations: [
      {
        city: "Algiers",
        country: "Algeria",
        lat: 36.7538,
        lon: 3.0588,
        startYear: 1933,
        endYear: 1940,
        approximate: true,
        note: "University, theater, and journalistic work before wartime displacement; interval is approximate.",
      },
      {
        city: "Paris",
        country: "France",
        lat: 48.8566,
        lon: 2.3522,
        startYear: 1944,
        endYear: 1947,
        approximate: true,
        note: "Combat editorial period and participation in Paris intellectual life; not a complete subsequent itinerary.",
      },
    ],
    coordinates: {
      reality: -0.3,
      knowledge: -0.5,
      ethics: 0.25,
    },
    coordinateRationale: {
      reality:
        "His thought starts from embodied earthly life and rejects a transcendent resolution of absurdity.",
      knowledge:
        "Lived experience and the acknowledged limits of rational explanation ground his inquiry.",
      ethics:
        "Individual lucidity develops into solidarity and limits on violence in collective revolt.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 1940,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Existential debates, literary reception, and political disputes engaged his thought. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Albert Camus",
        url: "https://plato.stanford.edu/entries/camus/",
        verified: true,
      },
      {
        label: "Internet Encyclopedia of Philosophy: Albert Camus",
        url: "https://iep.utm.edu/camus/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Camus resisted identification as an existentialist. SEP establishes 1942 for The Myth of Sisyphus, whereas the IEP work-list gives 1943; this record follows SEP’s explicit publication narrative. His opposition to revolutionary violence and position on colonial Algeria require context.",
  },
  {
    id: "anscombe",
    name: "G. E. M. Anscombe",
    birthYear: 1919,
    deathYear: 2001,
    datesApproximate: false,
    tradition: "Analytic philosophy; action and virtue",
    era: "20th century",
    questionLane: "ethics",
    coreIdea:
      "Understanding intentional action requires asking why an agent acts; modern moral theory needs a sound account of action, virtue, and human flourishing.",
    works: [
      {
        title: "Intention",
        year: 1957,
        dateKind: "publication",
        approximate: false,
      },
      {
        title: "Modern Moral Philosophy",
        year: 1958,
        dateKind: "publication",
        approximate: false,
        note: "Journal article; not a standalone book at first publication.",
      },
    ],
    locations: [
      {
        city: "Oxford",
        country: "United Kingdom",
        lat: 51.752,
        lon: -1.2577,
        startYear: 1946,
        endYear: 1970,
        approximate: false,
        note: "Research fellowship and teaching at Somerville College.",
      },
      {
        city: "Cambridge",
        country: "United Kingdom",
        lat: 52.2053,
        lon: 0.1218,
        startYear: 1970,
        endYear: 1986,
        approximate: false,
        note: "Professor of philosophy.",
      },
    ],
    coordinates: {
      reality: 0,
      knowledge: 0.5,
      ethics: -0.2,
    },
    coordinateRationale: {
      reality:
        "Her work on action and metaphysics does not yield a simple mind–matter classification.",
      knowledge:
        "Conceptual analysis clarifies intention, practical reasoning, and moral concepts.",
      ethics:
        "Agent-centered action and virtue receive emphasis, with stringent duties toward others.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 1950,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Action theory and the revival of virtue ethics developed her arguments. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
      {
        region: "North America",
        startYear: 1960,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Analytic ethics and philosophy of action became major reception contexts. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: G. E. M. Anscombe",
        url: "https://plato.stanford.edu/entries/anscombe/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Her critique of consequentialism and appeal to virtue are not interchangeable with Aristotle’s entire ethics; her Catholic commitments also shape her moral judgments.",
  },
  {
    id: "rawls",
    name: "John Rawls",
    birthYear: 1921,
    deathYear: 2002,
    datesApproximate: false,
    tradition: "Liberal egalitarianism",
    era: "20th century",
    questionLane: "politics",
    coreIdea:
      "Fair principles of cooperation can be tested from a position that withholds knowledge of one’s social advantages; equal liberties and fair opportunity constrain inequality.",
    works: [
      {
        title: "A Theory of Justice",
        year: 1971,
        dateKind: "publication",
        approximate: false,
      },
      {
        title: "Political Liberalism",
        year: 1993,
        dateKind: "publication",
        approximate: false,
      },
    ],
    locations: [
      {
        city: "Cambridge, Massachusetts",
        country: "United States",
        lat: 42.3736,
        lon: -71.1097,
        startYear: 1962,
        endYear: 1992,
        approximate: true,
        note: "Harvard faculty from 1962; SEP says he taught for more than thirty years. The coarse endpoint represents that attested minimum span, not a verified retirement year.",
      },
    ],
    coordinates: {
      reality: 0,
      knowledge: 0.65,
      ethics: 0.7,
    },
    coordinateRationale: {
      reality:
        "His political conception does not depend on resolving a comprehensive matter–mind metaphysics.",
      knowledge:
        "Constructed thought experiments and reflective equilibrium test principles against judgments.",
      ethics:
        "The basic structure must fairly distribute rights, opportunities, and benefits of cooperation.",
    },
    influenceRegions: [
      {
        region: "North America",
        startYear: 1970,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Debates in political philosophy developed around justice as fairness. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
      {
        region: "Europe",
        startYear: 1970,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Liberal, egalitarian, and critical responses formed extensive reception. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: John Rawls",
        url: "https://plato.stanford.edu/entries/rawls/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. The difference principle permits some inequalities only under demanding conditions; it is neither strict outcome equality nor unrestricted market distribution. SEP verifies Harvard from 1962 and teaching for more than thirty years. The 1991 retirement endpoint is a conventional biographical date not established in this article; it is retained as approximate rather than a complete teaching-history claim.",
  },
  {
    id: "foucault",
    name: "Michel Foucault",
    birthYear: 1926,
    deathYear: 1984,
    datesApproximate: false,
    tradition: "Genealogy; history of thought",
    era: "20th century",
    questionLane: "politics",
    coreIdea:
      "Institutions and practices shape what counts as knowledge and which kinds of subjects can exist; power works through dispersed relations as well as overt commands.",
    works: [
      {
        title: "Discipline and Punish",
        year: 1975,
        dateKind: "publication",
        approximate: false,
      },
      {
        title: "The History of Sexuality, Volume I",
        year: 1976,
        dateKind: "publication",
        approximate: false,
      },
    ],
    locations: [
      {
        city: "Uppsala",
        country: "Sweden",
        lat: 59.8586,
        lon: 17.6389,
        startYear: 1955,
        endYear: 1958,
        approximate: false,
        note: "Maison de France appointment at Uppsala University.",
      },
      {
        city: "Hamburg",
        country: "Germany",
        lat: 53.5511,
        lon: 9.9937,
        startYear: 1959,
        endYear: 1960,
        approximate: false,
        note: "Institut Français posting after a Polish cultural appointment; the Polish city is not specified in the inspected IEP passage.",
      },
      {
        city: "Paris",
        country: "France",
        lat: 48.8566,
        lon: 2.3522,
        startYear: 1960,
        endYear: 1966,
        approximate: false,
        note: "Lived in Paris while commuting to teach at Clermont-Ferrand; map shows residence, not the university appointment.",
      },
      {
        city: "Tunis",
        country: "Tunisia",
        lat: 36.8065,
        lon: 10.1815,
        startYear: 1966,
        endYear: 1968,
        approximate: false,
        note: "Chair of philosophy at the University of Tunis.",
      },
      {
        city: "Paris",
        country: "France",
        lat: 48.8566,
        lon: 2.3522,
        startYear: 1970,
        endYear: 1984,
        approximate: false,
        note: "Collège de France professorship; international lectures and travel continued.",
      },
    ],
    coordinates: {
      reality: -0.3,
      knowledge: -0.55,
      ethics: 0.3,
    },
    coordinateRationale: {
      reality:
        "Analysis centers on practices, bodies, and institutions rather than a fixed metaphysics.",
      knowledge:
        "Historical inquiry questions allegedly timeless categories and foundations.",
      ethics:
        "Institutional relations shape lives, while later work also studies practices of the self.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 1960,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Historical and critical debates engaged his changing methods. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
      {
        region: "North America",
        startYear: 1970,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Humanities and social theory developed substantial reception. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Michel Foucault",
        url: "https://plato.stanford.edu/entries/foucault/",
        verified: true,
      },
      {
        label: "Internet Encyclopedia of Philosophy: Michel Foucault",
        url: "https://iep.utm.edu/foucault/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Power is not only repression, and knowledge is not simply a lie imposed from above. Archaeology, genealogy, and late ethics are distinct phases. IEP verifies the additional movement intervals and the distinction between Paris residence and Clermont-Ferrand teaching. Poland in 1958–1959 and Vincennes around 1968–1970 remain gaps rather than fabricated city residence records.",
  },
  {
    id: "habermas",
    name: "Jürgen Habermas",
    birthYear: 1929,
    deathYear: 2026,
    datesApproximate: false,
    tradition: "Critical theory; discourse theory",
    era: "20th century",
    questionLane: "politics",
    coreIdea:
      "Legitimate norms and democratic power require public justification among participants; communication oriented toward understanding cannot be reduced to instrumental success.",
    works: [
      {
        title: "The Theory of Communicative Action",
        year: 1981,
        dateKind: "publication",
        approximate: false,
        note: "Two-volume German original.",
      },
      {
        title: "Between Facts and Norms",
        year: 1992,
        dateKind: "publication",
        approximate: false,
        note: "German original; English translation in 1996.",
      },
    ],
    locations: [
      {
        city: "Frankfurt",
        country: "Germany",
        lat: 50.1109,
        lon: 8.6821,
        startYear: 1956,
        endYear: 1959,
        approximate: false,
        note: "Adorno’s assistant at the Institute for Social Research.",
      },
      {
        city: "Starnberg",
        country: "Germany",
        lat: 47.9971,
        lon: 11.34,
        startYear: 1971,
        endYear: 1981,
        approximate: false,
        note: "Max Planck Institute directorship.",
      },
      {
        city: "Frankfurt",
        country: "Germany",
        lat: 50.1109,
        lon: 8.6821,
        startYear: 1981,
        endYear: 1994,
        approximate: false,
        note: "Returned after leaving the institute; SEP dates his retirement to 1994, with visiting appointments abroad.",
      },
    ],
    coordinates: {
      reality: -0.15,
      knowledge: 0.65,
      ethics: 0.85,
    },
    coordinateRationale: {
      reality:
        "Postmetaphysical thought avoids a comprehensive ontology; social practices receive emphasis.",
      knowledge:
        "Reasons exchanged in communication and reconstructive inquiry support criticism.",
      ethics:
        "Public deliberation and fair inclusion organize democratic legitimacy.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 1960,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Critical theory and democratic debates developed extensive European reception. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
      {
        region: "North America",
        startYear: 1970,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Social theory, law, and political philosophy engaged his discourse-theoretical work. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Jürgen Habermas",
        url: "https://plato.stanford.edu/entries/habermas/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. The current SEP text explicitly reports life dates 1929–2026. Discourse ideals are standards for criticism, not claims that existing discussions already include everyone fairly. His framework distinguishes instrumental, strategic, and communicative action.",
  },
  {
    id: "derrida",
    name: "Jacques Derrida",
    birthYear: 1930,
    deathYear: 2004,
    datesApproximate: false,
    tradition: "Deconstruction",
    era: "20th century",
    questionLane: "meaning",
    coreIdea:
      "Reading can expose tensions within supposedly stable conceptual oppositions; meaning depends on difference and context, while responsibility and justice exceed a finished rulebook.",
    works: [
      {
        title: "Of Grammatology",
        year: 1967,
        dateKind: "publication",
        approximate: false,
      },
      {
        title: "Writing and Difference",
        year: 1967,
        dateKind: "publication",
        approximate: false,
      },
      {
        title: "Specters of Marx",
        year: 1993,
        dateKind: "publication",
        approximate: false,
      },
    ],
    locations: [
      {
        city: "Paris",
        country: "France",
        lat: 48.8566,
        lon: 2.3522,
        startYear: 1949,
        endYear: 1952,
        approximate: false,
        note: "Preparation for and entry into the École Normale Supérieure; a documented early study interval.",
      },
      {
        city: "Paris",
        country: "France",
        lat: 48.8566,
        lon: 2.3522,
        startYear: 1982,
        endYear: 1984,
        approximate: false,
        note: "Directorship of the Collège International de Philosophie according to SEP.",
      },
    ],
    coordinates: {
      reality: 0,
      knowledge: 0.1,
      ethics: 0.3,
    },
    coordinateRationale: {
      reality:
        "Deconstruction questions the assumptions of the matter–mind opposition rather than selecting one pole.",
      knowledge:
        "Close argument and reading reveal limits within concepts; this is not the abandonment of rational scrutiny.",
      ethics:
        "Responsibility, hospitality, and justice include singular persons and political institutions.",
    },
    influenceRegions: [
      {
        region: "Europe",
        startYear: 1960,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Continental philosophy, literature, and political thought developed extensive reception. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
      {
        region: "North America",
        startYear: 1960,
        endYear: 2026,
        confidence: "medium",
        qualitative: true,
        note: "Anglophone literary theory and university debates became major reception settings. Broad reception window is editorial, not a measured spread; the date endpoints are editorial.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy: Jacques Derrida",
        url: "https://plato.stanford.edu/entries/derrida/",
        verified: true,
      },
    ],
    sourceNotes:
      "SEP reference text was retrieved and relevant philosophical, biographical, and bibliographic passages were read on 2026-10-01. Source verification means the linked article was inspected, not that the editorial coordinates or reception-window endpoints were measured or asserted by that source. Deconstruction is not the assertion that texts mean anything whatsoever. Publication and composition dates differ across translations;1967 refers to the French originals. Paris markers represent documented institutional periods, not a full residence history.",
  },
];

export const philosophers = westernPhilosophers;
