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
  const genotypeText = inputs.singleGenotype;
  const parsed = parseDogGenotype(genotypeText);
  const phenotype = getDogPhenotype(parsed);

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
    Extension: findDogExtensionGene(text),
    Agouti: findDogAgoutiGene(text),
    K: findDogKGene(text),

    Brown: findDogGenePair(
      text,
      ["B/B", "B/b", "b/b"],
      "B/B"
    ),

    Dilute: findDogGenePair(
      text,
      ["D/D", "D/d", "d/d"],
      "D/D"
    ),

    Merle: findDogGenePair(
      text,
      ["M/M", "M/m", "m/m"],
      "m/m"
    ),

    WhiteSpotting: findDogWhiteSpotting(text),

    Ticking: findDogGenePair(
      text,
      ["T/T", "T/t", "t/t"],
      "t/t"
    ),

    Roan: findDogGenePair(
      text,
      ["R/R", "R/r", "r/r"],
      "r/r"
    ),

    Harlequin: findDogGenePair(
      text,
      ["H/H", "H/h", "h/h"],
      "h/h"
    ),

    Intensity: findDogGenePair(
      text,
      ["I/I", "I/i", "i/i"],
      "I/I"
    ),

    Greying: findDogGenePair(
      text,
      ["G/G", "G/g", "g/g"],
      "g/g"
    ),

    LongCoat: findDogGenePair(
      text,
      ["L/L", "L/l", "l/l"],
      "L/L"
    ),

    Furnishings: findDogGenePair(
      text,
      ["F/F", "F/n", "n/F", "n/n"],
      "n/n"
    ),

    Curl: findDogGenePair(
      text,
      ["Cu/Cu", "Cu/n", "n/Cu", "n/n"],
      "n/n"
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
  if (
    parsed.Extension === "e/e" &&
    parsed.WhiteSpotting === "sw/sw" &&
    parsed.Intensity === "i/i"
  ) {
    return "White";
  }

  let colour = getDogBaseColour(parsed);

  colour = applyDogModifiers(colour, parsed);
  colour = applyDogPatterns(colour, parsed);
  colour = applyDogCoatTraits(colour, parsed);

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
    hasDogGene(parsed.Extension, "Eg") &&
    parsed.Agouti === "at/at"
  ) {
    return "Grizzle";
  }

  if (parsed.Agouti === "asa/asa") {
    return "Saddle Tan";
  }

  if (
    parsed.Agouti === "Ay/Ay" ||
    parsed.Agouti === "Ay/aw" ||
    parsed.Agouti === "Ay/at" ||
    parsed.Agouti === "Ay/asa" ||
    parsed.Agouti === "Ay/a"
  ) {
    return "Fawn";
  }

  if (
    parsed.Agouti === "aw/aw" ||
    parsed.Agouti === "aw/at" ||
    parsed.Agouti === "aw/asa" ||
    parsed.Agouti === "aw/a"
  ) {
    return "Wolf Sable";
  }

  if (
    parsed.Agouti === "at/at" ||
    parsed.Agouti === "at/asa" ||
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
  if (parsed.Brown === "b/b") {
    if (colour === "Black") colour = "Chocolate";
    if (colour === "Tan Point") colour = "Chocolate Tan";
    if (colour === "Wolf Sable") colour = "Chocolate Wolf Sable";
    if (colour === "Saddle Tan") colour = "Chocolate Saddle Tan";
  }

  if (parsed.Dilute === "d/d") {
    if (colour === "Black") colour = "Blue";
    if (colour === "Chocolate") colour = "Lilac";
    if (colour === "Tan Point") colour = "Blue Tan";
    if (colour === "Chocolate Tan") colour = "Lilac Tan";
    if (colour === "Red") colour = "Isabella Red";
    if (colour === "Fawn") colour = "Blue Fawn";
    if (colour === "Wolf Sable") colour = "Blue Wolf Sable";
    if (colour === "Chocolate Wolf Sable") colour = "Lilac Wolf Sable";
    if (colour === "Saddle Tan") colour = "Blue Saddle Tan";
    if (colour === "Chocolate Saddle Tan") colour = "Lilac Saddle Tan";
  }

  if (parsed.Intensity === "i/i") {
    if (colour === "Red") colour = "Cream";
    if (colour === "Fawn") colour = "Pale Fawn";
    if (colour === "Blue Fawn") colour = "Pale Blue Fawn";
    if (colour === "Isabella Red") colour = "Isabella Cream";
  }

  if (parsed.Merle === "M/m") {
    colour = colour + " Merle";
  }

  if (parsed.Merle === "M/M") {
    colour = "Double Merle " + colour;
  }

  if (hasDogGene(parsed.Extension, "Em") && colour !== "Red" && colour !== "Cream") {
    colour = colour + " Mask";
  }

  if (
    parsed.Harlequin === "H/h" &&
    parsed.Merle === "M/m"
  ) {
    colour = colour.replace("Merle", "Harlequin");
  }

  if (
    colour !== "Red" &&
    colour !== "Cream" &&
    (
      parsed.K === "kbr/kbr" ||
      parsed.K === "kbr/ky"
    )
  ) {
    colour = colour + " Brindle";
  }

  if (parsed.Greying === "G/G" || parsed.Greying === "G/g") {
    colour = "Faded " + colour;
  }

  return colour;
}

/* =========================
   PATTERN LOGIC
========================= */

function applyDogPatterns(colour, parsed) {
  const patterns = [];

  if (parsed.WhiteSpotting === "S/sp") {
    patterns.push("Irish White");
  }

  if (parsed.WhiteSpotting === "sp/sp") {
    patterns.push("Piebald");
  }

  if (
    parsed.WhiteSpotting === "sw/sw" ||
    parsed.WhiteSpotting === "sp/sw" ||
    parsed.WhiteSpotting === "S/sw"
  ) {
    patterns.push("Extreme White");
  }

  if (parsed.Ticking === "T/T" || parsed.Ticking === "T/t") {
    patterns.push("Ticked");
  }

  if (parsed.Roan === "R/R" || parsed.Roan === "R/r") {
    patterns.push("Roan");
  }

  if (patterns.length > 0) {
    return colour + " " + patterns.join(" ");
  }

  return colour;
}

/* =========================
   COAT TRAIT LOGIC
========================= */

function applyDogCoatTraits(colour, parsed) {
  const traits = [];

  if (parsed.LongCoat === "l/l") {
    traits.push("Long Coat");
  }

  if (hasDogGene(parsed.Furnishings, "F")) {
    traits.push("Furnished");
  }

  if (hasDogGene(parsed.Curl, "Cu")) {
    traits.push("Curly");
  }

  if (traits.length > 0) {
    return colour + " " + traits.join(" ");
  }

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

function findDogExtensionGene(text) {
  const tokens = String(text || "")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ");

  for (const token of tokens) {
    if (token === "Em/Em") return "Em/Em";
    if (token === "Em/Eg") return "Em/Eg";
    if (token === "Eg/Em") return "Em/Eg";
    if (token === "Em/E") return "Em/E";
    if (token === "E/Em") return "Em/E";
    if (token === "Em/e") return "Em/e";
    if (token === "e/Em") return "Em/e";

    if (token === "Eg/Eg") return "Eg/Eg";
    if (token === "Eg/E") return "Eg/E";
    if (token === "E/Eg") return "Eg/E";
    if (token === "Eg/e") return "Eg/e";
    if (token === "e/Eg") return "Eg/e";

    if (token === "E/E") return "E/E";
    if (token === "E/e") return "E/e";
    if (token === "e/E") return "E/e";
    if (token === "e/e") return "e/e";
  }

  return "e/e";
}

function findDogAgoutiGene(text) {
  const tokens = String(text || "")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ");

  for (const token of tokens) {
    if (token === "Ay/Ay") return "Ay/Ay";
    if (token === "Ay/aw") return "Ay/aw";
    if (token === "aw/Ay") return "Ay/aw";
    if (token === "Ay/at") return "Ay/at";
    if (token === "at/Ay") return "Ay/at";
    if (token === "Ay/asa") return "Ay/asa";
    if (token === "asa/Ay") return "Ay/asa";
    if (token === "Ay/a") return "Ay/a";
    if (token === "a/Ay") return "Ay/a";

    if (token === "aw/aw") return "aw/aw";
    if (token === "aw/at") return "aw/at";
    if (token === "at/aw") return "aw/at";
    if (token === "aw/asa") return "aw/asa";
    if (token === "asa/aw") return "aw/asa";
    if (token === "aw/a") return "aw/a";
    if (token === "a/aw") return "aw/a";

    if (token === "at/at") return "at/at";
    if (token === "at/asa") return "at/asa";
    if (token === "asa/at") return "at/asa";
    if (token === "at/a") return "at/a";
    if (token === "a/at") return "at/a";

    if (token === "asa/asa") return "asa/asa";
    if (token === "asa/a") return "asa/a";
    if (token === "a/asa") return "asa/a";

    if (token === "a/a") return "a/a";
  }

  return "a/a";
}

function findDogKGene(text) {
  const tokens = String(text || "")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ");

  for (const token of tokens) {
    if (token === "K/K") return "K/K";
    if (token === "K/kbr") return "K/kbr";
    if (token === "kbr/K") return "K/kbr";
    if (token === "K/ky") return "K/ky";
    if (token === "ky/K") return "K/ky";
    if (token === "kbr/kbr") return "kbr/kbr";
    if (token === "kbr/ky") return "kbr/ky";
    if (token === "ky/kbr") return "kbr/ky";
    if (token === "ky/ky") return "ky/ky";
  }

  return "ky/ky";
}

function findDogWhiteSpotting(text) {
  const tokens = String(text || "")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ");

  for (const token of tokens) {
    if (token === "S/S") return "S/S";
    if (token === "S/sp") return "S/sp";
    if (token === "sp/S") return "S/sp";
    if (token === "sp/sp") return "sp/sp";
    if (token === "sw/sw") return "sw/sw";
    if (token === "sp/sw") return "sp/sw";
    if (token === "sw/sp") return "sp/sw";
    if (token === "S/sw") return "S/sw";
    if (token === "sw/S") return "S/sw";
  }

  return "S/S";
}

window.runDogGenetics = runDogGenetics;
