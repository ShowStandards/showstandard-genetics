/* =========================
   EQUINE GENETICS ENGINE
========================= */


/* =========================
   ENTRY POINT
========================= */

function runHorseGenetics(inputs) {

  const mode = inputs.mode;

  if (mode === "predictor") {
    return runHorsePredictor(inputs);
  }

  if (mode === "roll") {
    return runHorseRoll(inputs);
  }

  if (mode === "phenotypeFromGenotype") {
    return runHorsePhenotypeCalculator(inputs);
  }

  if (mode === "genotypeFromPhenotype") {
    return runHorseGenotypeBuilder(inputs);
  }

  return "Invalid horse genetics mode.";
}


/* =========================
   MODE HANDLERS
========================= */

function runHorsePredictor(inputs) {

  return `
    <h4>Horse Predictor</h4>
    <p>Horse predictor engine coming next.</p>
  `;
}

function runHorseRoll(inputs) {

  return `
    <h4>Horse Roll</h4>
    <p>Horse foal roller coming next.</p>
  `;
}

function runHorsePhenotypeCalculator(inputs) {

  const genotypeText =
    inputs.singleGenotype;

  const parsed =
    parseHorseGenotype(genotypeText);

  const phenotype =
    getHorsePhenotype(parsed);

  return renderHorseResults(
    "Phenotype Calculator",
    `
      <p><b>Phenotype:</b> ${phenotype}</p>
      <p><b>Genotype:</b> ${genotypeText}</p>
    `
  );

}

function runHorseGenotypeBuilder(inputs) {

  return `
    <h4>Genotype Builder</h4>
    <p>Genotype builder coming next.</p>
  `;
}


/* =========================
   PARSERS
========================= */

function parseHorseGenotype(genotypeText) {

  const text = String(genotypeText || "")
    .replace(/\s+/g, " ")
    .trim();

  return {

    Extension:
      findGenePair(
        text,
        ["E/E", "E/e", "e/e"],
        "e/e"
      ),

    Agouti:
      findGenePair(
        text,
        ["A/A", "A/a", "a/a"],
        "a/a"
      ),

    Cream:
      findGenePair(
        text,
        ["Cr/Cr", "Cr/n", "n/Cr", "n/n"],
        "n/n"
      ),

    Dun:
      findGenePair(
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

    Champagne:
      findGenePair(
        text,
        ["Ch/Ch", "Ch/n", "n/Ch", "n/n"],
        "n/n"
      ),

    Silver:
      findGenePair(
        text,
        ["Z/Z", "Z/n", "n/Z", "n/n"],
        "n/n"
      ),

    Roan:
      findGenePair(
        text,
        ["Rn/Rn", "Rn/n", "n/Rn", "n/n"],
        "n/n"
      ),

    Grey:
      findGenePair(
        text,
        ["G/G", "G/g", "g/g"],
        "g/g"
      )

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

  const tokens =
    cleanText.split(" ");

  for (const option of options) {

    const compactOption =
      option.replace("/", "");

    for (const token of tokens) {

      if (
        token === option ||
        token === compactOption
      ) {

        if (option.startsWith("n/")) {

          return option
            .split("/")
            .reverse()
            .join("/");

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

  if (parsed.Extension === "e/e") {
    return "Chestnut";
  }

  if (parsed.Agouti === "a/a") {
    return "Black";
  }

  return "Bay";

}

function getHorsePhenotype(parsed) {

  // Grey overrides visible colour

  if (hasDominantGene(parsed.Grey, "G")) {
    return "Grey";
  }

  let colour =
    getHorseBaseColour(parsed);

  colour =
    applyHorseCream(colour, parsed);

  colour =
    applyHorseDun(colour, parsed);

  colour =
    applyHorseChampagne(colour, parsed);

  colour =
    applyHorseSilver(colour, parsed);

  colour =
    applyHorseRoan(colour, parsed);

  colour =
    applyHorsePatterns(colour, parsed);

  return colour.trim();

}

/* =========================
   MODIFIER LOGIC
========================= */

function applyHorseCream(baseColour, parsed) {

  const cream = parsed.Cream;

  // Single cream

  if (cream === "Cr/n") {

    if (baseColour === "Chestnut") {
      return "Palomino";
    }

    if (baseColour === "Bay") {
      return "Buckskin";
    }

    if (baseColour === "Black") {
      return "Smokey Black";
    }

  }

  // Double cream

  if (cream === "Cr/Cr") {

    if (baseColour === "Chestnut") {
      return "Cremello";
    }

    if (baseColour === "Bay") {
      return "Perlino";
    }

    if (baseColour === "Black") {
      return "Smokey Cream";
    }

  }

  return baseColour;

}




/* =========================
   WHITE PATTERNS
========================= */

function applyHorsePatterns(colour, parsed) {

  return colour;

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

      const aUpper =
        a === a.toUpperCase();

      const bUpper =
        b === b.toUpperCase();

      if (aUpper && !bUpper) return -1;
      if (!aUpper && bUpper) return 1;

      return a.localeCompare(b);

    })
    .join("/");

}
