import type { HistoricalEvent, Source } from "./types";

const reference = (label: string, url: string): Source => ({
  label,
  url,
  verified: url.startsWith("https://plato.stanford.edu/"),
});
const britannica = (slug: string, label: string): Source =>
  reference(
    `Encyclopaedia Britannica: ${label}`,
    `https://www.britannica.com/${slug}`,
  );
const sep = (slug: string, label: string): Source =>
  reference(
    `Stanford Encyclopedia of Philosophy: ${label}`,
    `https://plato.stanford.edu/entries/${slug}/`,
  );

/** These are contexts and documented intellectual responses, not single-cause explanations. */
export const historicalEvents: HistoricalEvent[] = [
  {
    id: "warring-states",
    title: "Warring States and competing schools",
    startYear: -474,
    endYear: -220,
    category: "Political transformation",
    region: "China",
    approximate: true,
    description:
      "Political fragmentation, warfare, and competing court patronage formed a setting for disputes over good government, ritual, and language. Zhuangzi and the Daodejing tradition belong to this contested intellectual world. The boundaries of the period and dating of the texts are debated; warfare does not by itself explain their arguments.",
    relatedPhilosopherIds: ["laozi", "zhuangzi", "mencius", "mozi", "xunzi"],
    sources: [
      sep("mohism", "Mohism"),
      sep("mencius", "Mencius"),
      britannica("event/Warring-States", "Warring States"),
    ],
  },
  {
    id: "ashoka-buddhist-patronage",
    title: "Aśoka’s rule and Buddhist patronage",
    startYear: -267,
    endYear: -231,
    category: "Institutions and transmission",
    region: "South Asia",
    approximate: true,
    description:
      "Aśoka’s inscriptions and patronage made ethical government and Buddhist institutions visible across a large imperial sphere. Later Buddhist traditions connect his reign with missions. This is a reception context for teachings attributed to the Buddha, who lived earlier; it is not a meeting between the two figures.",
    relatedPhilosopherIds: ["buddha"],
    sources: [britannica("biography/Ashoka", "Ashoka")],
  },
  {
    id: "arabic-translation",
    title: "Greek–Arabic translation and new philosophy",
    startYear: 750,
    endYear: 1000,
    category: "Translation and knowledge",
    region: "Abbasid scholarly networks",
    approximate: true,
    description:
      "Arabic translations and scholarly revision of Greek works supplied materials for new logical, medical, and metaphysical arguments. Ibn Sīnā and Ibn Rushd inherited and transformed these debates. Islamic philosophy also pursued questions arising from its own legal, theological, and political settings; translation was one condition, not its whole identity.",
    relatedPhilosopherIds: [
      "aristotle",
      "al-farabi",
      "ibn-sina",
      "al-ghazali",
      "ibn-rushd",
      "maimonides",
    ],
    sources: [
      sep(
        "arabic-islamic-greek",
        "Greek Sources in Arabic and Islamic Philosophy",
      ),
    ],
  },
  {
    id: "song-confucian-learning",
    title: "Song institutions and Confucian renewal",
    startYear: 960,
    endYear: 1279,
    category: "Education and institutions",
    region: "China",
    approximate: false,
    description:
      "Song academies, print culture, and examinations helped sustain new arguments about moral cultivation and the cosmos. Zhu Xi’s commentaries later gained official authority under the Yuan, after the Song period. Wang Yangming’s later work challenged aspects of the resulting intellectual tradition rather than simply continuing it unchanged.",
    relatedPhilosopherIds: ["confucius", "zhu-xi", "wang-yangming"],
    sources: [
      sep("zhu-xi", "Zhu Xi"),
      britannica("topic/Chinese-civil-service", "Chinese civil service"),
    ],
  },
  {
    id: "european-print",
    title: "European movable-type printing expands",
    startYear: 1450,
    endYear: 1500,
    category: "Media and transmission",
    region: "Europe",
    approximate: true,
    description:
      "Gutenberg-era movable type expanded reproducible book production in Europe, altering the circulation of classical, religious, and later philosophical texts. Luther’s theses circulated in printed versions, and Bacon later treated printing as an example of transformative knowledge. Printing and movable type had earlier East Asian histories; this event marks a European expansion, not the worldwide invention of printing.",
    relatedPhilosopherIds: ["bacon"],
    sources: [
      sep("francis-bacon", "Francis Bacon"),
      sep("luther", "Martin Luther"),
      britannica("biography/Johannes-Gutenberg", "Johannes Gutenberg"),
    ],
  },
  {
    id: "reformation",
    title: "Luther’s 95 Theses and the Reformation",
    startYear: 1517,
    endYear: 1648,
    category: "Religion and political authority",
    region: "Europe",
    approximate: true,
    description:
      "Martin Luther’s 1517 theses challenged indulgence practices; subsequent reformations and confessional conflict reshaped arguments about conscience, church authority, and toleration. Hobbes and Locke wrote in later settings marked by religious and political conflict. The famous church-door posting story is debated, and the end of this long transformation has no single date.",
    relatedPhilosopherIds: ["hobbes", "locke", "spinoza"],
    sources: [
      sep("luther", "Martin Luther"),
      sep("locke", "John Locke"),
      sep("hobbes", "Thomas Hobbes"),
      sep("spinoza", "Baruch Spinoza"),
      britannica("event/Reformation", "Reformation"),
    ],
  },
  {
    id: "scientific-revolution",
    title: "Scientific Revolution and new methods",
    startYear: 1543,
    endYear: 1687,
    category: "Science and knowledge",
    region: "Europe and connected scholarly networks",
    approximate: true,
    description:
      "The conventional span from Copernicus to Newton marks changes in astronomy, mechanics, experiment, and mathematical explanation. Bacon argued for organized inquiry; Descartes and Leibniz developed rival accounts of nature and method; Kant later engaged Newtonian mechanics. The label compresses diverse developments and their debts to earlier and non-European scholarship.",
    relatedPhilosopherIds: ["bacon", "descartes", "leibniz", "locke", "kant"],
    sources: [
      sep("francis-bacon", "Francis Bacon"),
      sep("descartes", "René Descartes"),
      sep("leibniz", "Gottfried Wilhelm Leibniz"),
      sep("kant", "Immanuel Kant"),
      britannica("event/Scientific-Revolution", "Scientific Revolution"),
    ],
  },
  {
    id: "industrialization",
    title: "Industrialization and the social question",
    startYear: 1760,
    endYear: 1840,
    category: "Work and economy",
    region: "Britain, then wider global networks",
    approximate: true,
    description:
      "Factory labor, urban growth, and changing property relations made work, poverty, and political economy pressing philosophical questions. Hegel examined poverty in civil society, Marx analyzed capitalist production and exploitation, and Mill debated liberty, welfare, and reform. The displayed dates describe a conventional first British phase; industrialization continued elsewhere and depended on imperial trade networks.",
    relatedPhilosopherIds: ["hegel", "marx", "mill"],
    sources: [
      sep("hegel", "Georg Wilhelm Friedrich Hegel"),
      sep("marx", "Karl Marx"),
      sep("mill", "John Stuart Mill"),
      britannica("event/Industrial-Revolution", "Industrial Revolution"),
    ],
  },
  {
    id: "french-revolution",
    title: "French Revolution and rights debates",
    startYear: 1789,
    endYear: 1799,
    category: "Revolution and rights",
    region: "France and transatlantic debates",
    approximate: false,
    description:
      "Revolutionary claims about citizenship and equal rights intensified debates over sovereignty, exclusion, and historical change. Wollstonecraft pressed the implications of rights for women; Kant assessed the Revolution’s legitimacy and the significance of spectators’ enthusiasm. Rousseau is linked as an earlier source received by revolutionaries, not as a witness to events after his death.",
    relatedPhilosopherIds: ["rousseau", "wollstonecraft", "kant"],
    sources: [
      sep("wollstonecraft", "Mary Wollstonecraft"),
      sep("kant-social-political", "Kant’s Social and Political Philosophy"),
      sep("rousseau", "Jean-Jacques Rousseau"),
      britannica("event/French-Revolution", "French Revolution"),
    ],
  },
  {
    id: "colonial-rule",
    title: "Colonial empires and contested personhood",
    startYear: 1757,
    endYear: 1962,
    category: "Empire and domination",
    region: "Global; uneven imperial histories",
    approximate: true,
    description:
      "Imperial rule, slavery’s legacies, extraction, and racial classification exposed conflicts between universal rights and exclusion. Mill’s work contains both liberal arguments and imperial commitments; Fanon analyzed domination and liberation from colonial Algeria. This displayed span is a selection anchored by British expansion in India and Algerian independence, not the beginning or end of all colonialism.",
    relatedPhilosopherIds: ["mill", "marx", "fanon"],
    sources: [sep("colonialism", "Colonialism")],
  },
  {
    id: "women-rights-movements",
    title: "Women’s rights and suffrage movements",
    startYear: 1848,
    endYear: 1920,
    category: "Equality and citizenship",
    region: "Selected US and European campaigns",
    approximate: true,
    description:
      "Organized campaigns contested women’s exclusion from education, property rights, and voting. Mill advocated political equality, while later Beauvoir examined the social formation of womanhood beyond formal legal rights. The dates mark Seneca Falls and US federal suffrage reform; women’s struggles elsewhere and exclusions within these movements cannot be reduced to this interval.",
    relatedPhilosopherIds: ["mill", "beauvoir"],
    sources: [
      sep("feminist-philosophy", "Feminist Philosophy"),
      sep("mill", "John Stuart Mill"),
      sep("beauvoir", "Simone de Beauvoir"),
    ],
  },
  {
    id: "world-war-one",
    title: "World War I",
    startYear: 1914,
    endYear: 1918,
    category: "War and moral crisis",
    region: "Global war centered in Europe",
    approximate: false,
    description:
      "Mass warfare, mobilization, and political collapse sharpened questions about rational progress, nationalism, and moral responsibility. Russell’s antiwar activism brought punishment; Wittgenstein served and worked on material for the Tractatus. These different responses should not be compressed into a claim that the war caused one philosophical movement.",
    relatedPhilosopherIds: ["russell", "wittgenstein"],
    sources: [
      britannica("event/World-War-I", "World War I"),
      sep("russell", "Bertrand Russell"),
      sep("wittgenstein", "Ludwig Wittgenstein"),
    ],
  },
  {
    id: "world-war-two",
    title: "World War II",
    startYear: 1939,
    endYear: 1945,
    category: "War and political responsibility",
    region: "Global",
    approximate: false,
    description:
      "Occupation, resistance, forced displacement, and wartime violence made responsibility and political action urgent. Weil’s work engaged oppression and uprootedness; Beauvoir’s later ethics examined freedom under constraint. Nishida’s wartime writings remain contested within Japanese imperial history. The conventional 1939 start omits earlier stages of war in East Asia.",
    relatedPhilosopherIds: ["weil", "beauvoir", "arendt", "nishida"],
    sources: [
      britannica("event/World-War-II", "World War II"),
      sep("simone-weil", "Simone Weil"),
      sep("beauvoir", "Simone de Beauvoir"),
      sep("nishida-kitaro", "Nishida Kitarō"),
    ],
  },
  {
    id: "holocaust",
    title: "Nazi persecution and the Holocaust",
    startYear: 1933,
    endYear: 1945,
    category: "Genocide and moral responsibility",
    region: "Nazi Germany and occupied Europe",
    approximate: true,
    description:
      "Persecution, dispossession, deportation, and genocide transformed debates about totalitarianism and responsibility. Arendt’s analysis of totalitarianism and later Eichmann reporting are specific intellectual responses. The interval begins with Nazi persecution; systematic mass murder developed in later phases, so these dates must not imply an unchanged policy throughout.",
    relatedPhilosopherIds: ["arendt"],
    sources: [
      reference(
        "United States Holocaust Memorial Museum: Introduction to the Holocaust",
        "https://encyclopedia.ushmm.org/content/en/article/introduction-to-the-holocaust",
      ),
      sep("arendt", "Hannah Arendt"),
    ],
  },
  {
    id: "decolonization",
    title: "Decolonization and new political futures",
    startYear: 1945,
    endYear: 1975,
    category: "Liberation and self-government",
    region: "Asia, Africa, Caribbean, and global movements",
    approximate: true,
    description:
      "Independence struggles and new states renewed questions about sovereignty, violence, racial hierarchy, and economic dependency. Fanon participated in Algerian liberation and criticized the risks of national elites reproducing domination. The interval is a broad postwar phase; decolonization has earlier roots and ongoing struggles.",
    relatedPhilosopherIds: ["fanon"],
    sources: [
      sep("frantz-fanon", "Frantz Fanon"),
      sep("colonialism", "Colonialism"),
    ],
  },
  {
    id: "civil-rights-mlk",
    title: "King’s Birmingham letter and civil rights",
    startYear: 1963,
    category: "Justice and civil disobedience",
    region: "United States with global reception",
    approximate: false,
    description:
      "Martin Luther King Jr.’s Letter from Birmingham Jail defended nonviolent direct action and distinguished just from unjust laws. His movement supplied a concrete context for later philosophical debates over civil disobedience and justice, including Rawls. King is a twentieth-century civil rights leader; Martin Luther’s Reformation theses belong to 1517.",
    relatedPhilosopherIds: ["rawls"],
    sources: [
      reference(
        "Stanford King Institute: Letter from Birmingham Jail (supplementary; primary-text review pending)",
        "https://kinginstitute.stanford.edu/letter-birmingham-jail",
      ),
      sep("civil-disobedience", "Civil Disobedience"),
    ],
  },
];
