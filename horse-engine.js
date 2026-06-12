<div class="animal-form">

  <h2>Add Animal</h2>

  <div class="genetics-helper-box">
    <b>Genetics Lab</b><br>
    Leave genotype blank to auto-roll a genotype from the listed colour, or open the Genetics Lab manually.
    <a href="https://showstandard.jcink.net/index.php?act=Pages&pid=42" target="_blank" rel="noopener">Open Genetics Lab</a>
  </div>

  <div class="form-grid">

    <div class="form-section">
      <label>Name *</label>
      <input id="name" placeholder="Name">
    </div>

    <input type="hidden" id="normalized_name">

    <div class="form-section">
      <label>Species *</label>
      <select id="species">
        <option value="">Species</option>
        <option value="dog">Dog</option>
        <option value="horse">Horse</option>
        <option value="cat">Cat</option>
      </select>
    </div>

    <div class="form-section">
      <label>Gender *</label>
      <select id="gender">
        <option value="">Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Altered Male">Altered Male</option>
        <option value="Altered Female">Altered Female</option>
      </select>
    </div>

    <div class="form-section">
      <label>Breed *</label>
      <input id="breed" placeholder="Breed">
    </div>

    <div class="form-section">
      <label>Colour *</label>
      <input id="colour" placeholder="Colour">
    </div>

    <div class="form-section">
      <label>Birth Year</label>
      <input id="birthyear" type="number" placeholder="e.g. 2022">
    </div>

    <div class="form-section full">
      <label>Origins *</label>

      <select id="originType">
        <option value="">Select Origin</option>
        <option value="Created">Created</option>
        <option value="Bred">Bred</option>
      </select>

      <input id="originDetails" placeholder="Optional details">
    </div>

    <div class="form-section full">
      <label>Genotype</label>
      <input id="genotype" placeholder="Leave blank to auto-roll from colour">
      <div class="genotype-note">
        If blank, the system will try to generate a genotype from Species + Colour when the animal is added.
      </div>
    </div>

    <div class="form-section">
      <label>Owner *</label>
      <input id="owner" placeholder="Owner">
    </div>

    <div class="form-section">
      <label>Breeder *</label>
      <input id="breeder" placeholder="Breeder">
    </div>

    <div class="form-section">
      <label>Sire</label>
      <input id="sire" placeholder="Parent UUID from profile page">
    </div>

    <div class="form-section">
      <label>Dam</label>
      <input id="dam" placeholder="Parent UUID from profile page">
    </div>

    <div class="form-section full">
      <label>Bio</label>
      <textarea id="bio" placeholder="Bio"></textarea>
    </div>

  </div>

  <button type="button" id="addAnimalBtn">Add Animal</button>

</div>

<script src="https://raw.githack.com/ShowStandards/showstandard-genetics/main/horse-engine.js?add-animal-engine-only-v20"></script>
<script src="https://raw.githack.com/ShowStandards/showstandard-genetics/main/dog-engine.js?add-animal-engine-only-v20"></script>
<script src="https://raw.githack.com/ShowStandards/showstandard-genetics/main/cat-engine.js?add-animal-engine-only-v20"></script>

<style>
.animal-form {
  max-width: 700px;
  margin: auto;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
}

.genetics-helper-box {
  background: #eef4f4;
  border: 1px solid #cfdede;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 15px;
  line-height: 1.5;
  color: #555;
}

.genetics-helper-box b {
  color: #2f6f6f;
}

.genetics-helper-box a {
  display: inline-block;
  margin-top: 8px;
  padding: 8px 10px;
  background: #2f6f6f;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: bold;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.form-section {
  display: flex;
  flex-direction: column;
}

.form-section.full {
  grid-column: span 2;
}

label {
  font-weight: bold;
  margin-bottom: 4px;
  color: #2f6f6f;
}

input, select, textarea {
  padding: 10px;
  border: 1px solid #cfdede;
  border-radius: 6px;
  box-sizing: border-box;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #2f6f6f;
  box-shadow: 0 0 0 3px rgba(47,111,111,0.12);
}

textarea {
  min-height: 100px;
}

.genotype-note {
  font-size: 12px;
  color: #666;
  padding-top: 4px;
}

button {
  margin-top: 15px;
  width: 100%;
  padding: 12px;
  background: #2f6f6f;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background: #245555;
}

button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}
</style>

<script>
console.log("Add Animal loaded");

const TITLE_WORDS = [
  "natch","intch","gch","ghgch","ghch","mbis","mbiss","bis","biss",
  "tdch","ao","toth1","toth2","toth3","toth4","toth5","toth6",
  "toth7","toth8","toth9","toth10","toth11","toth12","toth13",
  "tah","tth","enj","enn","eno","wer","wdi","gdi","gdt","gdm",
  "ngh","epi","dintro","dtr","s1","s2","wtp3","wtp4","cd1l",
  "cd2l","cdm","cbdm","cbd2l","cihdm","ihdm","ihd2l","ntd",
  "e","e**","e***"
];

function normalizeName(name) {
  if (!name) return "";

  let cleaned = name.toLowerCase();
  cleaned = cleaned.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  cleaned = cleaned.replace(/[^a-z0-9\s']/g, " ");

  let words = cleaned.split(/\s+/);
  words = words.filter(w => w && !TITLE_WORDS.includes(w));

  return words.join(" ").trim().replace(/\s+/g, " ");
}

function getValue(id) {
  return document.getElementById(id).value.trim();
}

function setValue(id, value) {
  document.getElementById(id).value = value || "";
}

document.getElementById("name").addEventListener("input", () => {
  document.getElementById("normalized_name").value =
    normalizeName(document.getElementById("name").value);
});

function validateRequiredFields() {
  const required = [
    ["name", "Name"],
    ["species", "Species"],
    ["gender", "Gender"],
    ["breed", "Breed"],
    ["colour", "Colour"],
    ["originType", "Origins"],
    ["owner", "Owner"],
    ["breeder", "Breeder"]
  ];

  const missing = required
    .filter(([id]) => !getValue(id))
    .map(([, label]) => label);

  if (missing.length) {
    alert("Please fill out required fields:\n\n" + missing.join("\n"));
    return false;
  }

  return true;
}

function isUUID(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

function plainTextFromHTML(value) {
  const div = document.createElement("div");
  div.innerHTML = String(value || "");
  return (div.textContent || div.innerText || "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isGenotypeToken(token) {
  const t = String(token || "")
    .replace(/[,.]+$/g, "")
    .trim();

  if (!t) return false;
  if (!t.includes("/")) return false;

  return /^[A-Za-z0-9*+\-]+\/[A-Za-z0-9*+\-]+$/.test(t);
}

function looksLikeGenotype(text) {
  const value = String(text || "").trim();
  if (!value) return false;

  const tokens = value.split(/\s+/).filter(Boolean);
  const genotypeTokens = tokens.filter(isGenotypeToken);

  return genotypeTokens.length >= 2;
}

function cleanGenotypeCandidate(line) {
  return String(line || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/^(example|possible|genotype|result|option|one option|sample)\s*(genotype|genotypes)?\s*[:\-]\s*/i, "")
    .replace(/^\d+[\.)]\s*/, "")
    .replace(/^[•\-]\s*/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function firstGenotypeSequence(text) {
  const tokens = String(text || "")
    .replace(/[;,]/g, " ")
    .split(/\s+/)
    .map(token => token.replace(/[,.]+$/g, "").trim())
    .filter(Boolean);

  const collected = [];

  for (const token of tokens) {
    if (isGenotypeToken(token)) {
      collected.push(token);
      continue;
    }

    if (collected.length >= 2) break;
    collected.length = 0;
  }

  return collected.length >= 2 ? collected.join(" ") : "";
}

function extractGenotypeFromEngineOutput(output) {
  const text = plainTextFromHTML(output);
  if (!text) return "";

  /* Preferred: grab the first actual genotype sequence after the engine's
     example-genotype label. This prevents the whole explanation from being
     saved into animals.genotype. */
  const exampleBlock = text.match(/(?:possible\s+example\s+genotypes?|possible\s+genotypes?|example\s+genotypes?|example\s+genotype)\s*[:\-]\s*([\s\S]*?)(?:possible\s+hidden\s+traits?|hidden\s+traits?|note\s*:|$)/i);

  if (exampleBlock) {
    const candidate = firstGenotypeSequence(exampleBlock[1]);
    if (candidate) return candidate;
  }

  /* Fallback: some engines may say simply "Genotype: e/e A/a Cr/n". */
  const directLabel = text.match(/(?:^|\s)genotype\s*[:\-]\s*((?:[A-Za-z0-9*+\-]+\/[A-Za-z0-9*+\-]+\s*){2,})/i);

  if (directLabel) {
    const candidate = firstGenotypeSequence(directLabel[1]);
    if (candidate) return candidate;
  }

  /* Last fallback: find the first two-or-more token genotype-looking sequence
     anywhere in the engine output. */
  const anySequence = firstGenotypeSequence(text);
  if (anySequence) return anySequence;

  return "";
}

function normaliseColourKey(colour) {
  return String(colour || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[–—]/g, "-")
    .replace(/[^a-z0-9\s\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sexTokenForCat(gender, redBased) {
  const g = String(gender || "").toLowerCase();
  const male = g.includes("male") && !g.includes("female");

  if (redBased) return male ? "O/Y" : "O/O";
  return male ? "o/Y" : "o/o";
}

function fallbackGenotypeFromColour(species, colour, gender) {
  const key = normaliseColourKey(colour);
  if (!key) return "";

  if (species === "horse") {
    const has = word => new RegExp("(^|\\s|-)" + word + "(\\s|-|$)", "i").test(key);
    const tokens = [];

    if (key.includes("cremello")) {
      tokens.push("e/e", "A/A", "Cr/Cr");
    } else if (key.includes("perlino")) {
      tokens.push("E/E", "A/A", "Cr/Cr");
    } else if (key.includes("smokey cream") || key.includes("smoky cream")) {
      tokens.push("E/E", "a/a", "Cr/Cr");
    } else if (key.includes("palomino")) {
      tokens.push("e/e", "A/A", "Cr/n");
    } else if (key.includes("buckskin")) {
      tokens.push("E/E", "A/A", "Cr/n");
    } else if (key.includes("smokey black") || key.includes("smoky black")) {
      tokens.push("E/E", "a/a", "Cr/n");
    } else if (key.includes("chestnut") || key.includes("sorrel") || key.includes("flaxen")) {
      tokens.push("e/e", "A/A");
    } else if (key.includes("bay") || key.includes("brown")) {
      tokens.push("E/E", "A/A");
    } else if (key.includes("black")) {
      tokens.push("E/E", "a/a");
    } else {
      return "";
    }

    if (key.includes("champagne")) tokens.push("Ch/n");
    if (key.includes("dun") || key.includes("grullo") || key.includes("grulla")) tokens.push("D/n");
    if (key.includes("silver")) tokens.push("Z/n");
    if (key.includes("grey") || key.includes("gray")) tokens.push("G/g");
    if (key.includes("roan")) tokens.push("Rn/n");
    if (key.includes("tobiano")) tokens.push("To/n");
    if (key.includes("sabino")) tokens.push("Sb/n");
    if (key.includes("frame") || key.includes("overo")) tokens.push("O/n");
    if (key.includes("splash")) tokens.push("SW1/n");
    if (key.includes("pearl")) tokens.push("prl/n");

    return [...new Set(tokens)].join(" ");
  }

  if (species === "cat") {
    const tokens = [];
    const isRed = key.includes("red") || key.includes("orange") || key.includes("cream") || key.includes("tortie") || key.includes("torbie") || key.includes("calico");
    const isTortie = key.includes("tortie") || key.includes("torbie") || key.includes("calico");

    if (isTortie) {
      tokens.push("O/o");
    } else {
      tokens.push(sexTokenForCat(gender, key.includes("red") || key.includes("orange") || key.includes("cream")));
    }

    if (key.includes("cinnamon") || key.includes("fawn")) {
      tokens.push("bl/bl");
    } else if (key.includes("chocolate") || key.includes("lilac")) {
      tokens.push("b/b");
    } else {
      tokens.push("B/-");
    }

    if (key.includes("blue") || key.includes("lilac") || key.includes("fawn") || key.includes("cream")) {
      tokens.push("d/d");
    } else {
      tokens.push("D/-");
    }

    if (key.includes("tabby") || key.includes("lynx") || key.includes("torbie")) {
      tokens.push("A/-");
    } else {
      tokens.push("a/a");
    }

    if (key.includes("point") || key.includes("lynx point")) tokens.push("cs/cs");
    if (key.includes("mink")) tokens.push("cb/cs");
    if (key.includes("sepia")) tokens.push("cb/cb");
    if (key.includes("silver") || key.includes("smoke")) tokens.push("I/-");
    if (key.includes("white") || key.includes("bicolour") || key.includes("bicolor") || key.includes("calico")) tokens.push("S/-");

    return [...new Set(tokens)].join(" ");
  }

  if (species === "dog") {
    const tokens = [];

    if (key.includes("red") || key.includes("yellow") || key.includes("cream") || key.includes("gold")) {
      tokens.push("e/e");
    } else {
      tokens.push("E/E");
    }

    if (key.includes("chocolate") || key.includes("liver") || key.includes("brown") || key.includes("lilac") || key.includes("isabella")) {
      tokens.push("b/b");
    } else {
      tokens.push("B/B");
    }

    if (key.includes("blue") || key.includes("lilac") || key.includes("isabella")) {
      tokens.push("d/d");
    } else {
      tokens.push("D/D");
    }

    if (key.includes("black") || key.includes("chocolate") || key.includes("blue") || key.includes("lilac")) {
      tokens.push("K/K");
    }

    if (key.includes("tan") || key.includes("points") || key.includes("black and tan") || key.includes("tricolor")) {
      tokens.push("ky/ky", "at/at");
    }

    if (key.includes("sable")) tokens.push("ky/ky", "Ay/-");
    if (key.includes("brindle")) tokens.push("kbr/ky");
    if (key.includes("merle")) tokens.push("M/m");
    if (key.includes("harlequin")) tokens.push("H/h", "M/m");
    if (key.includes("domino")) tokens.push("Eg/-");
    if (key.includes("white") || key.includes("piebald")) tokens.push("sp/sp");

    return [...new Set(tokens)].join(" ");
  }

  return "";
}

async function generateGenotypeFromColour(species, colour, gender) {
  let output = "";

  if (species === "horse") {
    if (typeof window.runHorseGenetics !== "function") {
      throw new Error("Horse genetics engine is not loaded yet.");
    }

    // Horse engine v18+ / v19+ supports a clean genotype-only mode.
    // This avoids scraping the educational Genetics Lab report, which was
    // causing duplicated genes like A/A A/a.
    output = window.runHorseGenetics({
      mode: "autoAnimalGenotype",
      phenotype: colour,
      returnType: "genotypeOnly",
      singleGenotype: "",
      sireGenotype: "",
      damGenotype: ""
    });
  } else if (species === "dog") {
    if (typeof window.runDogGenetics !== "function") {
      throw new Error("Dog genetics engine is not loaded yet.");
    }

    output = window.runDogGenetics({
      mode: "genotypeFromPhenotype",
      phenotype: colour,
      returnType: "genotypeOnly",
      gender: gender || "",
      singleGenotype: "",
      sireGenotype: "",
      damGenotype: ""
    });
  } else if (species === "cat") {
    if (typeof window.runCatGenetics !== "function") {
      throw new Error("Cat genetics engine is not loaded yet.");
    }

    output = window.runCatGenetics({
      mode: "genotypeFromPhenotype",
      phenotype: colour,
      returnType: "genotypeOnly",
      gender: gender || "",
      singleGenotype: "",
      sireGenotype: "",
      damGenotype: ""
    });
  } else {
    throw new Error("Choose a valid species before auto-generating genotype.");
  }

  let genotype = String(output || "").trim();

  // If dog/cat engines have not been given genotypeOnly mode yet, this keeps
  // them working by extracting from their existing report output.
  if (!looksLikeGenotype(genotype)) {
    genotype = extractGenotypeFromEngineOutput(output);
  }

  genotype = cleanOneGenePerLocus(genotype, species);

  if (!genotype) {
    console.warn("Could not extract genotype from genetics output:", output);
    throw new Error("A genotype could not be auto-generated from that colour. Please enter one manually or use the Genetics Lab.");
  }

  return genotype;
}

function cleanOneGenePerLocus(genotypeText, species) {
  const tokens = String(genotypeText || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/[,;]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean);

  if (!tokens.length) return "";

  if (species !== "horse") {
    // Dog/cat engines may intentionally use multiple loci with similar-looking
    // symbols. For now, only simple exact duplicate cleanup is safe here.
    return tokens.filter((token, index, arr) => arr.indexOf(token) === index).join(" ");
  }

  const order = [
    "Extension", "Agouti", "Cream", "Pearl", "Dun", "Champagne", "Silver",
    "Mushroom", "Flaxen", "Sooty", "Pangare", "Grey", "Roan", "Tobiano",
    "Frame", "Splash", "Sabino", "Rabicano", "Appaloosa", "PATN1", "PATN2"
  ];

  const byLocus = {};
  const unknown = [];

  function normalize(token) {
    const t = String(token || "").trim();
    const flips = {
      "e/E": "E/e", "a/A": "A/a", "g/G": "G/g",
      "n/Cr": "Cr/n", "n/Prl": "Prl/n", "Prl/Cr": "Cr/Prl",
      "n/D": "D/n", "n/Ch": "Ch/n", "n/Z": "Z/n",
      "n/Rn": "Rn/n", "n/To": "To/n", "n/OLW": "OLW/n",
      "n/Spl": "Spl/n", "n/Sb": "Sb/n", "n/Rb": "Rb/n",
      "lp/Lp": "Lp/lp", "n/Lp": "Lp/n",
      "patn1/PATN1": "PATN1/patn1", "n/PATN1": "PATN1/n",
      "patn2/PATN2": "PATN2/patn2", "n/PATN2": "PATN2/n"
    };
    return flips[t] || t;
  }

  function locus(token) {
    if (/^(E\/E|E\/e|e\/e)$/.test(token)) return "Extension";
    if (/^(A\/A|A\/a|a\/a)$/.test(token)) return "Agouti";
    if (/^(Cr\/Cr|Cr\/n|Cr\/Prl)$/.test(token)) return "Cream";
    if (/^(Prl\/Prl|Prl\/n)$/.test(token)) return "Pearl";
    if (/^(D\/D|D\/nd1|D\/nd2|D\/n|nd1\/nd1|nd1\/nd2|nd2\/nd1|nd1\/n|nd2\/nd2|nd2\/n)$/.test(token)) return "Dun";
    if (/^(Ch\/Ch|Ch\/n)$/.test(token)) return "Champagne";
    if (/^(Z\/Z|Z\/n)$/.test(token)) return "Silver";
    if (/^(mu\/mu|Mu\/mu|Mu\/Mu)$/.test(token)) return "Mushroom";
    if (/^(F\/F|F\/f|f\/f)$/.test(token)) return "Flaxen";
    if (/^(Sty\/Sty|Sty\/n)$/.test(token)) return "Sooty";
    if (/^(P\/P|P\/n)$/.test(token)) return "Pangare";
    if (/^(G\/G|G\/g|g\/g)$/.test(token)) return "Grey";
    if (/^(Rn\/Rn|Rn\/n)$/.test(token)) return "Roan";
    if (/^(To\/To|To\/n)$/.test(token)) return "Tobiano";
    if (/^(OLW\/OLW|OLW\/n)$/.test(token)) return "Frame";
    if (/^(Spl\/Spl|Spl\/n)$/.test(token)) return "Splash";
    if (/^(Sb\/Sb|Sb\/n)$/.test(token)) return "Sabino";
    if (/^(Rb\/Rb|Rb\/n)$/.test(token)) return "Rabicano";
    if (/^(Lp\/Lp|Lp\/lp|Lp\/n)$/.test(token)) return "Appaloosa";
    if (/^(PATN1\/PATN1|PATN1\/patn1|PATN1\/n)$/.test(token)) return "PATN1";
    if (/^(PATN2\/PATN2|PATN2\/patn2|PATN2\/n)$/.test(token)) return "PATN2";
    return "";
  }

  tokens.forEach(raw => {
    const token = normalize(raw);
    const loc = locus(token);
    if (!loc) {
      if (!unknown.includes(token)) unknown.push(token);
      return;
    }
    if (!byLocus[loc]) byLocus[loc] = token;
  });

  const cleaned = [];
  order.forEach(loc => {
    if (byLocus[loc]) cleaned.push(byLocus[loc]);
  });
  unknown.forEach(token => {
    if (!cleaned.includes(token)) cleaned.push(token);
  });

  return cleaned.join(" ");
}

async function ensureGenotype() {
  const existing = getValue("genotype");
  if (existing) return existing;

  const species = getValue("species");
  const colour = getValue("colour");

  if (!species || !colour) return "";

  const button = document.getElementById("addAnimalBtn");
  const oldText = button.textContent;
  button.textContent = "Generating genotype...";
  button.disabled = true;

  try {
    const gender = getValue("gender");
    const generated = await generateGenotypeFromColour(species, colour, gender);
    setValue("genotype", generated);
    return generated;
  } finally {
    button.textContent = oldText;
    button.disabled = false;
  }
}

async function fetchBreedHealthIssues(species, breed) {
  const supabase = window.supabaseClient;

  if (!supabase) return [];

  const { data, error } = await supabase
    .from("breed_health_tests")
    .select("*")
    .ilike("species", species.toLowerCase())
    .ilike("breed", `%${breed.toLowerCase()}%`);

  if (error) {
    console.error(error);
    return [];
  }

  return (data || [])
    .map(item => item.breed_issues)
    .filter(Boolean);
}

function randomHealthStatus() {
  const statuses = ["Affected", "Carrier", "Clear"];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

function randomHealthResult() {
  const roll = Math.random() * 100;

  if (roll < 5) return "Poor";
  if (roll < 45) return "Okay";
  if (roll < 95) return "Good";
  return "Excellent";
}

function shouldAutoRunHealth(species, originType) {
  return (
    originType === "Created" &&
    (species === "dog" || species === "cat")
  );
}

async function addAnimal() {
  const supabase = window.supabaseClient;

  if (!supabase) {
    alert("Supabase not loaded");
    return;
  }

  if (!validateRequiredFields()) {
    return;
  }

  let genotype = "";

  try {
    genotype = await ensureGenotype();
  } catch (error) {
    alert(error.message || error);
    return;
  }

  if (!genotype) {
    alert("Please enter a genotype, or enter a colour that the Genetics Lab can use to auto-generate one.");
    return;
  }

  const name = getValue("name");
  const normalized_name =
    getValue("normalized_name") || normalizeName(name);

  const species = getValue("species");
  const gender = getValue("gender");
  const breed = getValue("breed");
  const colour = getValue("colour");
  const birthyear = getValue("birthyear") || null;

  const originType = getValue("originType");
  const originDetails = getValue("originDetails");

  const origins = originDetails
    ? `${originType} • ${originDetails}`
    : originType;

  const owner = getValue("owner");
  const breeder = getValue("breeder");

  const sireInput = getValue("sire");
  const damInput = getValue("dam");

  const sire = isUUID(sireInput) ? sireInput : null;
  const dam = isUUID(damInput) ? damInput : null;

  if (sireInput && !sire) {
    alert("Sire must be a valid parent UUID from the animal profile page.");
    return;
  }

  if (damInput && !dam) {
    alert("Dam must be a valid parent UUID from the animal profile page.");
    return;
  }

  const bio = getValue("bio");

  if (originType === "Bred") {
    alert(
      "Bred animal registration should eventually be handled automatically through the Breeding Center.\n\nFor now, you can still register this animal manually."
    );
  }

  const autoHealth = shouldAutoRunHealth(species, originType);

  const health_hips = autoHealth ? randomHealthResult() : null;
  const health_elbows = autoHealth ? randomHealthResult() : null;
  const health_eyes = autoHealth ? randomHealthResult() : null;
  const health_hearing = autoHealth ? randomHealthResult() : null;

  const autoIssues = await fetchBreedHealthIssues(species, breed);

  const breed_issues =
    autoIssues.length
      ? autoIssues
          .map(issue => `${issue}: ${randomHealthStatus()}`)
          .join(" • ")
      : null;

  const { error } = await supabase
    .from("animals")
    .insert([{
      name,
      normalized_name,
      species,
      gender,
      breed,
      colour,
      birthyear,
      origins,
      genotype,
      owner,
      breeder,
      bio,
      sire,
      dam,
      health_eyes,
      health_hips,
      health_hearing,
      health_elbows,
      breed_issues
    }]);

  if (error) {
    console.error(error);
    alert(error.message);
    return;
  }

  alert("Animal added successfully!");
  location.reload();
}

function bindAddAnimalButton() {
  const button = document.getElementById("addAnimalBtn");

  if (!button) {
    console.error("Add Animal button was not found.");
    return;
  }

  button.addEventListener("click", addAnimal);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bindAddAnimalButton);
} else {
  bindAddAnimalButton();
}
</script>
