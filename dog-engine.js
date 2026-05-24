/* =========================
   CANINE GENETICS ENGINE
========================= */

function runDogGenetics(inputs) {

  const mode = inputs.mode;

  if (mode === "predictor") {
    return runDogPredictor(inputs);
  }

  if (mode === "roll") {
    return runDogRoll(inputs);
  }

  if (mode === "phenotypeFromGenotype") {
    return runDogPhenotypeCalculator(inputs);
  }

  if (mode === "genotypeFromPhenotype") {
    return runDogGenotypeBuilder(inputs);
  }

  return "Invalid dog genetics mode.";

}


/* =========================
   MODE HANDLERS
========================= */

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

  const genotypeText =
    inputs.singleGenotype;

  const parsed =
    parseDogGenotype(genotypeText);

  const phenotype =
    getDogPhenotype(parsed);

  return renderDogResults(
    "Dog Phenotype Calculator",
    `
      <p><b>Phenotype:</b> ${phenotype}</p>
      <p><b>Genotype:</b> ${genotypeText}</p>
    `
  );

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

  return {

    Extension:
      findDogGenePair(
        text,
        ["E/E", "E/e", "e/e"],
        "e/e"
      ),

    Agouti:
      findDogGenePair(
        text,
        [
          "Ay/Ay",
          "Ay/at",
          "Ay/a",
          "at/at",
          "at/a",
          "a/a"
        ],
        "a/a"
      ),
K:
  findDogGenePair(
    text,
    ["K/K", "K/kbr", "K/ky", "kbr/kbr", "kbr/ky", "ky/ky"],
    "ky/ky"
  ),
    Brown:
      findDogGenePair(
        text,
        ["B/B", "B/b", "b/b"],
        "B/B"
      ),

    Dilute:
      findDogGenePair(
        text,
        ["D/D", "D/d", "d/d"],
        "D/D"
      ),

    Merle:
      findDogGenePair(
        text,
        ["M/M", "M/m", "m/m"],
        "m/m"
      )

  };

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

  let colour =
    getDogBaseColour(parsed);

  colour =
    applyDogModifiers(colour, parsed);

  colour =
    applyDogPatterns(colour, parsed);

  colour =
    applyDogCoatTraits(colour, parsed);

  return colour.trim();

}

function getDogBaseColour(parsed) {

  if (parsed.Extension === "e/e") {
    return "Red";
  }

  if (
    parsed.K === "K/K" ||
    parsed.K === "K/kbr" ||
    parsed.K === "K/ky"
  ) {
    return "Black";
  }

  if (
    parsed.Agouti === "Ay/Ay" ||
    parsed.Agouti === "Ay/at" ||
    parsed.Agouti === "Ay/a"
  ) {
    return "Fawn";
  }

  if (
    parsed.Agouti === "at/at" ||
    parsed.Agouti === "at/a"
  ) {
    return "Tan Point";
  }

  return "Black";

}

/* =========================
   MODIFIER LOGIC
========================= */

function applyDogModifiers(colour, parsed) {

  // Brown

  if (parsed.Brown === "b/b") {

    if (colour === "Black") {
      colour = "Chocolate";
    }

    if (colour === "Tan Point") {
      colour = "Chocolate Tan";
    }

  }

  // Dilute

  if (parsed.Dilute === "d/d") {

    if (colour === "Black") {
      colour = "Blue";
    }

    if (colour === "Chocolate") {
      colour = "Lilac";
    }

    if (colour === "Tan Point") {
      colour = "Blue Tan";
    }

    if (colour === "Chocolate Tan") {
      colour = "Lilac Tan";
    }

    if (colour === "Red") {
      colour = "Isabella Red";
    }

    if (colour === "Fawn") {
      colour = "Blue Fawn";
    }

  }

  // Merle

  if (parsed.Merle === "M/m") {
    colour = colour + " Merle";
  }

  if (parsed.Merle === "M/M") {
    colour = "Double Merle " + colour;
  }

   if (
  colour !== "Red" &&
  (
    parsed.K === "kbr/kbr" ||
    parsed.K === "kbr/ky" ||
    parsed.K === "K/kbr"
  )
) {
  colour = colour + " Brindle";
}
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

  const tokens =
    cleanText.split(" ");

  for (const option of options) {

    const compactOption =
      option.replace(/\//g, "");

    for (const token of tokens) {

      const compactToken =
        token.replace(/\//g, "");

      if (
        token === option ||
        token === compactOption ||
        compactToken === compactOption
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

window.runDogGenetics = runDogGenetics;
