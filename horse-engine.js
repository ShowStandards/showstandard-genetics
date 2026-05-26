/* =========================
   EQUINE GENETICS ENGINE
========================= */

function runHorseGenetics(inputs) {
  const mode = inputs.mode;

  if (mode === "predictor") return runHorsePredictor(inputs);
  if (mode === "phenotypeFromGenotype") return runHorsePhenotypeCalculator(inputs);
  if (mode === "genotypeFromPhenotype") return runHorseGenotypeBuilder(inputs);

  return "Invalid horse genetics mode.";
}

function runHorsePredictor(inputs) {
  const sire = parseHorseGenotype(inputs.sireGenotype);
  const dam = parseHorseGenotype(inputs.damGenotype);

  const rows = [
    horseOutcomeRow("Extension", sire.Extension, dam.Extension),
    horseOutcomeRow("Agouti", sire.Agouti, dam.Agouti),
    horseOutcomeRow("Cream", sire.Cream, dam.Cream),
    horseOutcomeRow("Dun", sire.Dun, dam.Dun),
    horseOutcomeRow("Grey", sire.Grey, dam.Grey),
    horseOutcomeRow("Roan", sire.Roan, dam.Roan),
    horseOutcomeRow("Tobiano", sire.Tobiano, dam.Tobiano),
    horseOutcomeRow("Appaloosa", sire.Appaloosa, dam.Appaloosa)
  ].join("");

  return renderHorseResults(
    "Horse Predictor",
    `
      <p><b>Sire:</b> ${inputs.sireGenotype}</p>
      <p><b>Dam:</b> ${inputs.damGenotype}</p>

      <table class="breed-table">
        <tr>
          <th>Gene</th>
          <th>Possible Outcomes</th>
        </tr>
        ${rows}
      </table>
    `
  );
}
function runHorseRoll(inputs) {
  return `
    <h4>Horse Roll</h4>
    <p>Horse foal roller coming next.</p>
  `;
}

function runHorsePhenotypeCalculator(inputs) {
  const genotypeText = inputs.singleGenotype;
  const parsed = parseHorseGenotype(genotypeText);
  const phenotype = getHorsePhenotype(parsed);

  let greyNote = "";

  if (hasDominantGene(parsed.Grey, "G")) {
    greyNote = `
      <p><b>Hidden Base:</b> ${getHorseVisibleColourWithoutGrey(parsed)}</p>
      <p><b>Note:</b> Grey is visually overriding the base colour.</p>
    `;
  }

  return renderHorseResults(
    "Phenotype Calculator",
    `
      <p><b>Phenotype:</b> ${phenotype}</p>
      ${greyNote}
      <p><b>Genotype:</b> ${genotypeText}</p>
    `
  );
}

function runHorseGenotypeBuilder(inputs) {
  const phenotype = String(inputs.phenotype || "").toLowerCase();
  const suggestions = [];
  const examples = [];
  const hidden = [];

  function addSuggestion(item) {
    if (!suggestions.includes(item)) suggestions.push(item);
  }

  function addExample(item) {
    if (!examples.includes(item)) examples.push(item);
  }

  function addHidden(item) {
    if (!hidden.includes(item)) hidden.push(item);
  }

  function addToExamples(gene) {
    if (examples.length === 0) {
      examples.push(gene);
      return;
    }

    examples.forEach((example, index) => {
      examples[index] = example + " " + gene;
    });
  }

  // Base colours

  if (phenotype.includes("chestnut") || phenotype.includes("red")) {
    addSuggestion("Extension: e/e");
    addExample("e/e A/A");
    addExample("e/e A/a");
    addExample("e/e a/a");
    addHidden("Agouti can be hidden on chestnut: A/A, A/a, or a/a");
    addHidden("Silver can be hidden on chestnut: Z/n or Z/Z");
  }

  if (phenotype.includes("black") && !phenotype.includes("silver black")) {
    addSuggestion("Extension: E/-");
    addSuggestion("Agouti: a/a");
    addExample("E/E a/a");
    addExample("E/e a/a");
    addHidden("Chestnut can be carried: E/e");
  }

  if (phenotype.includes("bay")) {
    addSuggestion("Extension: E/-");
    addSuggestion("Agouti: A/-");
    addExample("E/E A/A");
    addExample("E/e A/a");
    addHidden("Chestnut can be carried: E/e");
    addHidden("Recessive black can be carried: A/a");
  }

  // Cream

  if (phenotype.includes("palomino")) {
    addSuggestion("Base: e/e");
    addSuggestion("Cream: Cr/n");
    addExample("e/e A/A Cr/n");
    addExample("e/e A/a Cr/n");
    addExample("e/e a/a Cr/n");
    addHidden("Agouti and Silver can be hidden on red-based horses.");
  }

  if (phenotype.includes("buckskin")) {
    addSuggestion("Base: E/- A/-");
    addSuggestion("Cream: Cr/n");
    addExample("E/E A/A Cr/n");
    addExample("E/e A/a Cr/n");
    addHidden("Chestnut can be carried: E/e");
    addHidden("Recessive black can be carried: A/a");
  }

  if (phenotype.includes("smokey black")) {
    addSuggestion("Base: E/- a/a");
    addSuggestion("Cream: Cr/n");
    addExample("E/E a/a Cr/n");
    addExample("E/e a/a Cr/n");
    addHidden("Chestnut can be carried: E/e");
  }

  if (phenotype.includes("cremello")) {
    addSuggestion("Base: e/e");
    addSuggestion("Cream: Cr/Cr");
    addExample("e/e A/A Cr/Cr");
    addExample("e/e A/a Cr/Cr");
    addHidden("Agouti and Silver can be hidden on red-based horses.");
  }

  if (phenotype.includes("perlino")) {
    addSuggestion("Base: E/- A/-");
    addSuggestion("Cream: Cr/Cr");
    addExample("E/E A/A Cr/Cr");
    addExample("E/e A/a Cr/Cr");
  }

  if (phenotype.includes("smokey cream")) {
    addSuggestion("Base: E/- a/a");
    addSuggestion("Cream: Cr/Cr");
    addExample("E/E a/a Cr/Cr");
    addExample("E/e a/a Cr/Cr");
  }

  // Dun

  if (phenotype.includes("red dun")) {
    addSuggestion("Base: e/e");
    addSuggestion("Dun: D/-");
    addExample("e/e A/A D/n");
    addExample("e/e A/a D/n");
  } else if (phenotype.includes("bay dun")) {
    addSuggestion("Base: E/- A/-");
    addSuggestion("Dun: D/-");
    addExample("E/E A/A D/n");
    addExample("E/e A/a D/n");
  } else if (phenotype.includes("grullo") || phenotype.includes("grulla")) {
    addSuggestion("Base: E/- a/a");
    addSuggestion("Dun: D/-");
    addExample("E/E a/a D/n");
    addExample("E/e a/a D/n");
  } else if (phenotype.includes("dun")) {
    addSuggestion("Dun: D/-");
    addToExamples("D/n");
  }

  // Champagne

  if (phenotype.includes("gold champagne")) {
    addSuggestion("Base: e/e");
    addSuggestion("Champagne: Ch/-");
    addExample("e/e A/A Ch/n");
    addExample("e/e A/a Ch/n");
  } else if (phenotype.includes("amber champagne")) {
    addSuggestion("Base: E/- A/-");
    addSuggestion("Champagne: Ch/-");
    addExample("E/E A/A Ch/n");
    addExample("E/e A/a Ch/n");
  } else if (phenotype.includes("classic champagne")) {
    addSuggestion("Base: E/- a/a");
    addSuggestion("Champagne: Ch/-");
    addExample("E/E a/a Ch/n");
    addExample("E/e a/a Ch/n");
} else if (phenotype.includes("champagne")) {

  addSuggestion("Champagne: Ch/-");

  addExample("E/E A/A Ch/n");
  addExample("E/e A/a Ch/n");
  addExample("E/E a/a Ch/n");
  addExample("E/e a/a Ch/n");
  addExample("e/e A/A Ch/n");
  addExample("e/e A/a Ch/n");

  addHidden("Champagne can occur on any base colour.");
}

  // Silver

  if (phenotype.includes("silver black")) {
    addSuggestion("Base: E/- a/a");
    addSuggestion("Silver: Z/-");
    addExample("E/E a/a Z/n");
    addExample("E/e a/a Z/n");
  } else if (phenotype.includes("silver bay")) {
    addSuggestion("Base: E/- A/-");
    addSuggestion("Silver: Z/-");
    addExample("E/E A/A Z/n");
    addExample("E/e A/a Z/n");
  } else if (phenotype.includes("silver")) {
    addSuggestion("Silver: Z/-");
    addToExamples("Z/n");
  }

  // Pearl / Mushroom

  if (phenotype.includes("apricot")) {
    addSuggestion("Base: e/e");
    addSuggestion("Pearl: Prl/Prl");
    addExample("e/e A/A Prl/Prl");
    addExample("e/e A/a Prl/Prl");
  } else if (phenotype.includes("pearl")) {
    addSuggestion("Pearl: Prl/Prl or Cr/n + Prl/n depending on phenotype");
    addToExamples("Prl/n");
  }

  if (phenotype.includes("mushmello")) {
    addSuggestion("Base: e/e with Cream");
    addSuggestion("Mushroom: mu/mu");
    addExample("e/e A/A Cr/n mu/mu");
  } else if (phenotype.includes("mushroom")) {
    addSuggestion("Base: e/e");
    addSuggestion("Mushroom: mu/mu");
    addExample("e/e A/A mu/mu");
    addExample("e/e A/a mu/mu");
  }

  // Other modifiers

  if (phenotype.includes("flaxen")) {
    addSuggestion("Flaxen: f/f");
    addToExamples("f/f");
  }

  if (phenotype.includes("sooty")) {
    addSuggestion("Sooty: Sty/-");
    addToExamples("Sty/n");
  }

  if (phenotype.includes("pangare")) {
    addSuggestion("Pangare: P/-");
    addToExamples("P/n");
  }

  if (phenotype.includes("grey") || phenotype.includes("gray")) {
    addSuggestion("Grey: G/-");
    addToExamples("G/g");
    addHidden("Grey visually overrides the base colour, so the base may be genetically hidden.");
  }

  if (phenotype.includes("roan")) {
    addSuggestion("Roan: Rn/-");
    addToExamples("Rn/n");
  }

  // White patterns

  if (phenotype.includes("tobiano")) {
    addSuggestion("Tobiano: To/-");
    addToExamples("To/n");
  }

  if (phenotype.includes("frame")) {
    addSuggestion("Frame Overo: OLW/-");
    addToExamples("OLW/n");
  }

  if (phenotype.includes("splash")) {
    addSuggestion("Splash: Spl/-");
    addToExamples("Spl/n");
  }

  if (phenotype.includes("rabicano")) {
    addSuggestion("Rabicano: Rb/-");
    addToExamples("Rb/n");
  }

  if (phenotype.includes("tovero")) {
    addSuggestion("Tobiano: To/-");
    addSuggestion("Frame Overo: OLW/-");
    addToExamples("To/n OLW/n");
  }

  // Appaloosa

  if (phenotype.includes("few spot")) {
    addSuggestion("Appaloosa: Lp/Lp");
    addSuggestion("PATN1: PATN1/-");
    addToExamples("Lp/Lp PATN1/n");
  } else if (phenotype.includes("leopard")) {
    addSuggestion("Appaloosa: Lp/-");
    addSuggestion("PATN1: PATN1/-");
    addToExamples("Lp/n PATN1/n");
  } else if (phenotype.includes("snow cap")) {
    addSuggestion("Appaloosa: Lp/Lp");
    addSuggestion("PATN2: PATN2/-");
    addToExamples("Lp/Lp PATN2/n");
  } else if (phenotype.includes("blanket")) {
    addSuggestion("Appaloosa: Lp/-");
    addSuggestion("PATN2: PATN2/-");
    addToExamples("Lp/n PATN2/n");
  } else if (
    phenotype.includes("appaloosa") ||
    phenotype.includes("varnish")
  ) {
    addSuggestion("Appaloosa: Lp/-");
    addToExamples("Lp/n");
  }

  if (suggestions.length === 0) {
    suggestions.push("No simple genotype match found yet.");
  }

  return renderHorseResults(
    "Genotype Builder",
    `
      <p><b>Phenotype:</b> ${inputs.phenotype}</p>

      <p><b>Likely Required Genes:</b></p>
      <ul>${suggestions.map(item => `<li>${item}</li>`).join("")}</ul>

      <p><b>Possible Example Genotypes:</b></p>
      <ul>${examples.length ? examples.map(item => `<li>${item}</li>`).join("") : "<li>No example genotypes generated yet.</li>"}</ul>

      <p><b>Possible Hidden Traits:</b></p>
      <ul>${hidden.length ? hidden.map(item => `<li>${item}</li>`).join("") : "<li>No common hidden traits listed yet.</li>"}</ul>

      <p><b>Note:</b> These are possible genotype examples, not the only valid combinations.</p>
    `
  );
}

/* =========================
   PARSERS
========================= */

function parseHorseGenotype(genotypeText) {
  const text = String(genotypeText || "")
    .replace(/\s+/g, " ")
    .trim();

  return {
    Extension: findGenePair(text, ["E/E", "E/e", "e/e"], "e/e"),
    Agouti: findGenePair(text, ["A/A", "A/a", "a/a"], "a/a"),
    Cream: findGenePair(text, ["Cr/Cr", "Cr/n", "n/Cr", "n/n"], "n/n"),

    Dun: findGenePair(
      text,
      [
        "D/D",
        "D/nd1",
        "D/nd2",
        "D/n",
        "nd1/nd1",
        "nd1/nd2",
        "nd1/n",
        "nd2/nd2",
        "nd2/n",
        "n/n"
      ],
      "n/n"
    ),

    Champagne: findGenePair(text, ["Ch/Ch", "Ch/n", "n/Ch", "n/n"], "n/n"),
    Silver: findGenePair(text, ["Z/Z", "Z/n", "n/Z", "n/n"], "n/n"),
    Pearl: findGenePair(text, ["Prl/Prl", "Prl/n", "n/Prl", "n/n"], "n/n"),
    Mushroom: findGenePair(text, ["mu/mu", "Mu/mu", "Mu/Mu", "n/n"], "n/n"),

    Flaxen: findGenePair(text, ["F/F", "F/f", "f/f"], "F/F"),
    Sooty: findGenePair(text, ["Sty/Sty", "Sty/n", "n/Sty", "n/n"], "n/n"),
    Pangare: findGenePair(text, ["P/P", "P/n", "n/P", "n/n"], "n/n"),

    Roan: findGenePair(text, ["Rn/Rn", "Rn/n", "n/Rn", "n/n"], "n/n"),
    Grey: findGenePair(text, ["G/G", "G/g", "g/g"], "g/g"),

    Tobiano: findGenePair(text, ["To/To", "To/n", "n/To", "n/n"], "n/n"),
    Frame: findGenePair(text, ["OLW/OLW", "OLW/n", "n/OLW", "n/n"], "n/n"),
    Splash: findGenePair(text, ["Spl/Spl", "Spl/n", "n/Spl", "n/n"], "n/n"),
    Rabicano: findGenePair(text, ["Rb/Rb", "Rb/n", "n/Rb", "n/n"], "n/n"),

    Appaloosa: findGenePair(text, ["Lp/Lp", "Lp/n", "n/Lp", "n/n"], "n/n"),
    PATN1: findGenePair(text, ["PATN1/PATN1", "PATN1/n", "n/PATN1", "n/n"], "n/n"),
    PATN2: findGenePair(text, ["PATN2/PATN2", "PATN2/n", "n/PATN2", "n/n"], "n/n")
  };
}

function parseHorsePhenotype(phenotypeText) {
  return {
    base: "",
    modifiers: [],
    patterns: []
  };
}

function findGenePair(text, options, fallback) {
  const cleanText = String(text || "")
    .replace(/\s+/g, " ")
    .trim();

  const tokens = cleanText.split(" ");

  for (const option of options) {
    const compactOption = option.replace(/\//g, "");

    for (const token of tokens) {
      const compactToken = token.replace(/\//g, "");

      if (
        token === option ||
        token === compactOption ||
        compactToken === compactOption
      ) {
        if (option.startsWith("n/")) {
          return option.split("/").reverse().join("/");
        }

        return option;
      }
    }
  }

  return fallback;
}

/* =========================
   BASE COLOUR LOGIC
========================= */

function getHorseBaseColour(parsed) {
  if (parsed.Extension === "e/e") return "Chestnut";
  if (parsed.Agouti === "a/a") return "Black";
  return "Bay";
}

function getHorsePhenotype(parsed) {
  if (hasDominantGene(parsed.Grey, "G")) {
    return "Grey";
  }

  return buildHorseVisibleColour(parsed);
}

function getHorseVisibleColourWithoutGrey(parsed) {
  return buildHorseVisibleColour(parsed);
}

function buildHorseVisibleColour(parsed) {
  let colour = getHorseBaseColour(parsed);

  colour = applyHorseFlaxen(colour, parsed);

  colour = applyHorseCream(colour, parsed);
  colour = applyHorseDun(colour, parsed);
  colour = applyHorseChampagne(colour, parsed);
  colour = applyHorseSilver(colour, parsed);
  colour = applyHorsePearl(colour, parsed);
  colour = applyHorseMushroom(colour, parsed);

  colour = applyHorseSooty(colour, parsed);
  colour = applyHorsePangare(colour, parsed);
  colour = applyHorseRoan(colour, parsed);

  colour = applyHorsePatterns(colour, parsed);
  colour = applyHorseAppaloosa(colour, parsed);

  return colour.trim();
}

/* =========================
   MODIFIER LOGIC
========================= */

function applyHorseFlaxen(baseColour, parsed) {
  if (parsed.Flaxen !== "f/f") return baseColour;

  if (baseColour === "Chestnut") {
    return "Flaxen Chestnut";
  }

  return baseColour;
}

function applyHorseCream(baseColour, parsed) {
  const cream = parsed.Cream;

  if (cream === "Cr/n") {
    if (baseColour === "Chestnut") return "Palomino";
    if (baseColour === "Flaxen Chestnut") return "Flaxen Palomino";
    if (baseColour === "Bay") return "Buckskin";
    if (baseColour === "Black") return "Smokey Black";
  }

  if (cream === "Cr/Cr") {
    if (baseColour === "Chestnut") return "Cremello";
    if (baseColour === "Flaxen Chestnut") return "Flaxen Cremello";
    if (baseColour === "Bay") return "Perlino";
    if (baseColour === "Black") return "Smokey Cream";
  }

  return baseColour;
}

function applyHorseDun(baseColour, parsed) {
  const dun = parsed.Dun;

  if (
    dun === "D/D" ||
    dun === "D/nd1" ||
    dun === "D/nd2" ||
    dun === "D/n"
  ) {
    if (baseColour === "Chestnut") return "Red Dun";
    if (baseColour === "Flaxen Chestnut") return "Flaxen Red Dun";
    if (baseColour === "Bay") return "Bay Dun";
    if (baseColour === "Black") return "Grullo";

    return baseColour + " Dun";
  }

  if (
    dun === "nd1/nd1" ||
    dun === "nd1/nd2" ||
    dun === "nd1/n"
  ) {
    return baseColour + " Primitive Markings";
  }

  return baseColour;
}

function applyHorseChampagne(baseColour, parsed) {
  if (!hasDominantGene(parsed.Champagne, "Ch")) return baseColour;

  if (baseColour === "Chestnut") return "Gold Champagne";
  if (baseColour === "Flaxen Chestnut") return "Flaxen Gold Champagne";
  if (baseColour === "Bay") return "Amber Champagne";
  if (baseColour === "Black") return "Classic Champagne";

  return baseColour + " Champagne";
}

function applyHorseSilver(baseColour, parsed) {
  if (!hasDominantGene(parsed.Silver, "Z")) return baseColour;

  if (baseColour === "Black") return "Silver Black";
  if (baseColour === "Bay") return "Silver Bay";
  if (baseColour === "Buckskin") return "Silver Buckskin";
  if (baseColour === "Perlino") return "Silver Perlino";
  if (baseColour === "Smokey Black") return "Silver Smokey Black";
  if (baseColour === "Smokey Cream") return "Silver Smokey Cream";

  return "Silver " + baseColour;
}

function applyHorsePearl(baseColour, parsed) {
  if (parsed.Pearl !== "Prl/Prl") return baseColour;

  if (baseColour === "Chestnut") return "Apricot";
  if (baseColour === "Flaxen Chestnut") return "Flaxen Apricot";
  if (baseColour === "Palomino") return "Pearl Palomino";
  if (baseColour === "Buckskin") return "Pearl Buckskin";

  return baseColour + " Pearl";
}

function applyHorseMushroom(baseColour, parsed) {
  const mushroom = parsed.Mushroom;

  if (
    mushroom !== "mu/mu" &&
    mushroom !== "Mu/mu" &&
    mushroom !== "Mu/Mu"
  ) {
    return baseColour;
  }

  if (baseColour === "Chestnut") return "Mushroom";
  if (baseColour === "Flaxen Chestnut") return "Flaxen Mushroom";
  if (baseColour === "Palomino") return "Mushmello";

  return baseColour;
}

function applyHorseSooty(baseColour, parsed) {
  if (!hasDominantGene(parsed.Sooty, "Sty")) return baseColour;

  return "Sooty " + baseColour;
}

function applyHorsePangare(baseColour, parsed) {
  if (!hasDominantGene(parsed.Pangare, "P")) return baseColour;

  return "Pangare " + baseColour;
}

function applyHorseRoan(baseColour, parsed) {
  if (!hasDominantGene(parsed.Roan, "Rn")) return baseColour;

  if (baseColour === "Chestnut") return "Red Roan";
  if (baseColour === "Flaxen Chestnut") return "Flaxen Red Roan";
  if (baseColour === "Bay") return "Bay Roan";
  if (baseColour === "Black") return "Blue Roan";

  return baseColour + " Roan";
}

/* =========================
   WHITE / PATTERN LOGIC
========================= */

function applyHorsePatterns(colour, parsed) {
  const patterns = [];

  const hasTobiano = hasDominantGene(parsed.Tobiano, "To");
  const hasFrame = hasDominantGene(parsed.Frame, "OLW");

  if (hasTobiano && hasFrame) {
    patterns.push("Tovero");
  } else {
    if (hasTobiano) patterns.push("Tobiano");
    if (hasFrame) patterns.push("Frame Overo");
  }

  if (hasDominantGene(parsed.Splash, "Spl")) {
    patterns.push("Splash");
  }

  if (hasDominantGene(parsed.Rabicano, "Rb")) {
    patterns.push("Rabicano");
  }

  if (patterns.length > 0) {
    return colour + " " + patterns.join(" ");
  }

  return colour;
}

function applyHorseAppaloosa(colour, parsed) {
  const lp = parsed.Appaloosa;
  const patn1 = parsed.PATN1;
  const patn2 = parsed.PATN2;

  const hasLp = hasDominantGene(lp, "Lp");
  const isLpLp = lp === "Lp/Lp";
  const hasPatn1 = hasDominantGene(patn1, "PATN1");
  const hasPatn2 = hasDominantGene(patn2, "PATN2");

  if (!hasLp) return colour;

  if (hasPatn1 && isLpLp) return colour + " Few Spot";
  if (hasPatn1) return colour + " Leopard";

  if (hasPatn2 && isLpLp) return colour + " Snow Cap";
  if (hasPatn2) return colour + " Blanket";

  return colour + " Varnish Roan";
}

/* =========================
   OUTPUT HELPERS
========================= */

function renderHorseResults(title, html) {
  return `
    <h4>${title}</h4>
    ${html}
  `;
}

/* =========================
   GENERAL HELPERS
========================= */

function hasDominantGene(pair, gene) {
  return String(pair || "")
    .split("/")
    .includes(gene);
}

function randomFrom(array) {
  return array[
    Math.floor(Math.random() * array.length)
  ];
}

function sortHorseGenePair(alleles) {
  return alleles
    .sort((a, b) => {
      if (a === "n" && b !== "n") return 1;
      if (a !== "n" && b === "n") return -1;

      const aUpper = a === a.toUpperCase();
      const bUpper = b === b.toUpperCase();

      if (aUpper && !bUpper) return -1;
      if (!aUpper && bUpper) return 1;

      return a.localeCompare(b);
    })
    .join("/");
}
function horseOutcomeRow(label, sirePair, damPair) {
  const outcomes = calculateHorseGeneOutcomes(sirePair, damPair);

  return `
    <tr>
      <td>${label}</td>
      <td>${outcomes}</td>
    </tr>
  `;
}

function calculateHorseGeneOutcomes(sirePair, damPair) {
  const sireAlleles = String(sirePair || "n/n").split("/");
  const damAlleles = String(damPair || "n/n").split("/");

  const counts = {};

  for (const sireAllele of sireAlleles) {
    for (const damAllele of damAlleles) {
      const pair = sortHorseGenePair([sireAllele, damAllele]);
      counts[pair] = (counts[pair] || 0) + 1;
    }
  }

  return Object.entries(counts)
    .map(([pair, count]) => {
      const percent = Math.round((count / 4) * 100);
      return `${pair}: ${percent}%`;
    })
    .join("<br>");
}
window.runHorsePredictor = runHorsePredictor;
window.runHorsePhenotypeCalculator = runHorsePhenotypeCalculator;
window.runHorseGenotypeBuilder = runHorseGenotypeBuilder;
window.runHorseGenetics = runHorseGenetics;
window.runHorseGenetics = runHorseGenetics;
