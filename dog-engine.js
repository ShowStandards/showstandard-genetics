/* =========================
   CANINE GENETICS ENGINE
========================= */

function runDogGenetics(inputs) {
  const mode = inputs.mode;

  if (mode === "predictor") return runDogPredictor(inputs);
  if (mode === "roll") return runDogRoll(inputs);
  if (mode === "phenotypeFromGenotype") return runDogPhenotypeCalculator(inputs);
  if (mode === "genotypeFromPhenotype") return runDogGenotypeBuilder(inputs);

  return "Invalid dog genetics mode.";
}

function runDogPredictor(inputs) {
  return `
    <h4>Dog Predictor</h4>
    <p>Dog predictor engine coming next.</p>
  `;
}

function runDogRoll(inputs) {
  return `
    <h4>Dog Roll</h4>
    <p>Dog puppy roller coming next.</p>
  `;
}

function runDogPhenotypeCalculator(inputs) {
  return `
    <h4>Dog Phenotype Calculator</h4>
    <p>Dog phenotype calculator coming next.</p>
  `;
}

function runDogGenotypeBuilder(inputs) {
  return `
    <h4>Dog Genotype Builder</h4>
    <p>Dog genotype builder coming next.</p>
  `;
}

/* =========================
   PARSERS
========================= */

function parseDogGenotype(genotypeText) {
  const text = String(genotypeText || "")
    .replace(/\s+/g, " ")
    .trim();

  return {};
}

function parseDogPhenotype(phenotypeText) {
  return {
    base: "",
    modifiers: [],
    patterns: [],
    coat: []
  };
}

/* =========================
   PHENOTYPE PIPELINE
========================= */

function getDogPhenotype(parsed) {
  let colour = getDogBaseColour(parsed);

  colour = applyDogModifiers(colour, parsed);
  colour = applyDogPatterns(colour, parsed);
  colour = applyDogCoatTraits(colour, parsed);

  return colour.trim();
}

function getDogBaseColour(parsed) {
  return "Unknown Dog Colour";
}

/* =========================
   MODIFIER LOGIC
========================= */

function applyDogModifiers(colour, parsed) {
  return colour;
}

/* =========================
   PATTERN LOGIC
========================= */

function applyDogPatterns(colour, parsed) {
  return colour;
}

/* =========================
   COAT TRAIT LOGIC
========================= */

function applyDogCoatTraits(colour, parsed) {
  return colour;
}

/* =========================
   OUTPUT HELPERS
========================= */

function renderDogResults(title, html) {
  return `
    <h4>${title}</h4>
    ${html}
  `;
}

/* =========================
   GENERAL HELPERS
========================= */

function hasDogGene(pair, gene) {
  return String(pair || "")
    .split("/")
    .includes(gene);
}

function randomDogFrom(array) {
  return array[
    Math.floor(Math.random() * array.length)
  ];
}

function findDogGenePair(text, options, fallback) {
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

window.runDogGenetics = runDogGenetics;
