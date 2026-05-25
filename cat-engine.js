/* =========================
   FELINE GENETICS ENGINE
========================= */

function runCatGenetics(inputs) {

  const mode = inputs.mode;

  if (mode === "predictor") {
    return runCatPredictor(inputs);
  }

  if (mode === "roll") {
    return runCatRoll(inputs);
  }

  if (mode === "phenotypeFromGenotype") {
    return runCatPhenotypeCalculator(inputs);
  }

  if (mode === "genotypeFromPhenotype") {
    return runCatGenotypeBuilder(inputs);
  }

  return "Invalid cat genetics mode.";

}

/* =========================
   MODE HANDLERS
========================= */

function runCatPredictor(inputs) {

  return `
    <h4>Cat Predictor</h4>
    <p>Cat predictor engine coming next.</p>
  `;

}

function runCatRoll(inputs) {

  return `
    <h4>Cat Roll</h4>
    <p>Cat kitten roller coming next.</p>
  `;

}

function runCatPhenotypeCalculator(inputs) {

  const genotypeText =
    inputs.singleGenotype;

  const parsed =
    parseCatGenotype(genotypeText);

  console.log(parsed);

  const phenotype =
    getCatPhenotype(parsed);

  return renderCatResults(
    "Cat Phenotype Calculator",
    `
      <p><b>Phenotype:</b> ${phenotype}</p>
      <p><b>Genotype:</b> ${genotypeText}</p>
    `
  );

}

function runCatGenotypeBuilder(inputs) {

  return `
    <h4>Cat Genotype Builder</h4>
    <p>Cat genotype builder coming next.</p>
  `;

}

/* =========================
   PARSERS
========================= */

function parseCatGenotype(genotypeText) {

  const text = String(genotypeText || "")
    .replace(/\s+/g, " ")
    .trim();

  return {

    Orange:
      findCatOrangeGene(text),

    Agouti:
      findCatGenePair(
        text,
        ["A/A", "A/a", "a/a"],
        "a/a"
      ),

    Brown:
      findCatBrownGene(text),

    Dilute:
      findCatGenePair(
        text,
        ["D/D", "D/d", "d/d"],
        "D/D"
      ),

    White:
      findCatGenePair(
        text,
        ["W/W", "W/w", "w/w"],
        "w/w"
      ),

    WhiteSpotting:
      findCatGenePair(
        text,
        ["S/S", "S/s", "s/s"],
        "s/s"
      ),

    Silver:
      findCatGenePair(
        text,
        ["I/I", "I/i", "i/i"],
        "i/i"
      ),

    Colourpoint:
      findCatColourpointGene(text),

    Tabby:
      findCatTabbyGene(text),

    Spotted:
      findCatGenePair(
        text,
        ["Sp/Sp", "Sp/sp", "sp/sp"],
        "sp/sp"
      ),

    Ticked:
      findCatGenePair(
        text,
        ["Ta/Ta", "Ta/ta", "ta/ta"],
        "ta/ta"
      )

  };

}

/* =========================
   PHENOTYPE PIPELINE
========================= */

function getCatPhenotype(parsed) {

  // White overrides everything

  if (
    parsed.White === "W/W" ||
    parsed.White === "W/w"
  ) {
    return "White";
  }

  let colour =
    getCatBaseColour(parsed);

  colour =
    applyCatDilute(colour, parsed);

  colour =
    applyCatPointModifier(colour, parsed);

  colour =
    applyCatSilver(colour, parsed);

  colour =
    applyCatTabby(colour, parsed);

  colour =
    applyCatWhiteSpotting(colour, parsed);

  return colour.trim();

}

/* =========================
   BASE COLOUR LOGIC
========================= */

function getCatBaseColour(parsed) {

  // MALES

  if (parsed.Orange === "O/Y") {
    return "Red";
  }

  if (parsed.Orange === "o/Y") {

    if (parsed.Brown === "b/b") {
      return "Chocolate";
    }

    if (parsed.Brown === "bl/bl") {
      return "Cinnamon";
    }

    return "Black";

  }

  // FEMALES

  if (parsed.Orange === "O/O") {
    return "Red";
  }

  if (parsed.Orange === "O/o") {
    return "Tortie";
  }

  if (parsed.Brown === "b/b") {
    return "Chocolate";
  }

  if (parsed.Brown === "bl/bl") {
    return "Cinnamon";
  }

  return "Black";

}

/* =========================
   MODIFIER LOGIC
========================= */

function applyCatDilute(colour, parsed) {

  if (parsed.Dilute !== "d/d") {
    return colour;
  }

  if (colour === "Black") {
    return "Blue";
  }

  if (colour === "Chocolate") {
    return "Lilac";
  }

  if (colour === "Cinnamon") {
    return "Fawn";
  }

  if (colour === "Red") {
    return "Cream";
  }

  if (colour === "Tortie") {
    return "Blue Tortie";
  }

  return colour;

}

function applyCatPointModifier(colour, parsed) {

  const point =
    parsed.Colourpoint;

  // Albino overrides

  if (point === "ca/ca") {
    return "Blue-Eyed Albino";
  }

  if (point === "c/c") {
    return "Red-Eyed Albino";
  }

  // Burmese

  if (point === "cb/cb") {
    return colour + " Burmese";
  }

  // Tonkinese

  if (point === "cb/cs") {
    return colour + " Mink";
  }

  // Siamese

  if (point === "cs/cs") {

    if (colour === "Black") {
      return "Seal Point";
    }

    if (colour === "Blue") {
      return "Blue Point";
    }

    if (colour === "Chocolate") {
      return "Chocolate Point";
    }

    if (colour === "Lilac") {
      return "Lilac Point";
    }

    if (colour === "Red") {
      return "Flame Point";
    }

    if (colour === "Cream") {
      return "Cream Point";
    }

    if (colour === "Tortie") {
      return "Tortie Point";
    }

    if (colour === "Blue Tortie") {
      return "Blue Tortie Point";
    }

    return colour + " Point";

  }

  return colour;

}

function applyCatSilver(colour, parsed) {

  if (
    parsed.Silver !== "I/I" &&
    parsed.Silver !== "I/i"
  ) {
    return colour;
  }

  // Tabbies become Silver Tabbies later

  if (
    parsed.Agouti === "A/A" ||
    parsed.Agouti === "A/a"
  ) {
    return "Silver " + colour;
  }

  // Solids become Smoke

  return colour + " Smoke";

}

function applyCatTabby(colour, parsed) {

  if (parsed.Agouti === "a/a") {
    return colour;
  }

  let pattern = "Tabby";

  if (
    parsed.Ticked === "Ta/Ta" ||
    parsed.Ticked === "Ta/ta"
  ) {
    pattern = "Ticked Tabby";
  }

  else if (
    parsed.Spotted === "Sp/Sp" ||
    parsed.Spotted === "Sp/sp"
  ) {
    pattern = "Spotted Tabby";
  }

  else if (
    parsed.Tabby === "mc/mc"
  ) {
    pattern = "Classic Tabby";
  }

  else {
    pattern = "Mackerel Tabby";
  }

  return colour + " " + pattern;

}

function applyCatWhiteSpotting(colour, parsed) {

  const hasWhite =
    parsed.WhiteSpotting === "S/S" ||
    parsed.WhiteSpotting === "S/s";

  if (!hasWhite) {
    return colour;
  }

  // Torties with white become Calico

  if (colour === "Tortie") {
    return "Calico";
  }

  if (colour === "Blue Tortie") {
    return "Dilute Calico";
  }

  if (parsed.WhiteSpotting === "S/S") {
    return colour + " High White";
  }

  return colour + " White";

}

/* =========================
   OUTPUT HELPERS
========================= */

function renderCatResults(title, html) {

  return `
    <h4>${title}</h4>
    ${html}
  `;

}

/* =========================
   GENERAL HELPERS
========================= */

function hasCatGene(pair, gene) {

  return String(pair || "")
    .split("/")
    .includes(gene);

}

function findCatGenePair(text, options, fallback) {

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

        return option;

      }

    }

  }

  return fallback;

}

/* =========================
   SPECIAL PARSERS
========================= */

function findCatOrangeGene(text) {

  const tokens = String(text || "")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ");

  for (const token of tokens) {

    if (token === "O/Y") return "O/Y";
    if (token === "o/Y") return "o/Y";

    if (token === "O/O") return "O/O";
    if (token === "O/o") return "O/o";
    if (token === "o/O") return "O/o";
    if (token === "o/o") return "o/o";

  }

  return "o/o";

}

function findCatBrownGene(text) {

  const tokens = String(text || "")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ");

  for (const token of tokens) {

    if (token === "B/B") return "B/B";
    if (token === "B/b") return "B/b";
    if (token === "b/B") return "B/b";

    if (token === "B/bl") return "B/bl";
    if (token === "bl/B") return "B/bl";

    if (token === "b/b") return "b/b";

    if (token === "b/bl") return "b/bl";
    if (token === "bl/b") return "b/bl";

    if (token === "bl/bl") return "bl/bl";

  }

  return "B/B";

}

function findCatColourpointGene(text) {

  const tokens = String(text || "")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ");

  for (const token of tokens) {

    // Full colour

    if (token === "C/C") {
      return "C/C";
    }

    // Burmese

    if (token === "cb/cb") {
      return "cb/cb";
    }

    // Siamese

    if (token === "cs/cs") {
      return "cs/cs";
    }

    // Tonkinese

    if (
      token === "cb/cs" ||
      token === "cs/cb"
    ) {
      return "cb/cs";
    }

    // Albino

    if (token === "ca/ca") {
      return "ca/ca";
    }

    if (token === "c/c") {
      return "c/c";
    }

  }

  return "C/C";

}

function findCatTabbyGene(text) {

  const tokens = String(text || "")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ");

  for (const token of tokens) {

    if (token === "Mc/Mc") return "Mc/Mc";

    if (token === "Mc/mc") return "Mc/mc";
    if (token === "mc/Mc") return "Mc/mc";

    if (token === "mc/mc") return "mc/mc";

  }

  return "Mc/Mc";

}

window.runCatGenetics = runCatGenetics;
