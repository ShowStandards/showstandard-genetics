/* =========================
   FELINE GENETICS ENGINE
========================= */

function runCatGenetics(inputs) {
  const mode = inputs.mode;

  if (mode === "predictor") return runCatPredictor(inputs);
  if (mode === "roll") return runCatRoll(inputs);
  if (mode === "phenotypeFromGenotype") return runCatPhenotypeCalculator(inputs);
  if (mode === "genotypeFromPhenotype") return runCatGenotypeBuilder(inputs);

  return "Invalid cat genetics mode.";
}

function runCatPredictor(inputs) {
  const sire = parseCatGenotype(inputs.sireGenotype);
  const dam = parseCatGenotype(inputs.damGenotype);

  const rows = [
    catOutcomeRow("Orange", sire.Orange, dam.Orange),
    catOutcomeRow("Agouti", sire.Agouti, dam.Agouti),
    catOutcomeRow("Brown", sire.Brown, dam.Brown),
    catOutcomeRow("Dilute", sire.Dilute, dam.Dilute),
    catOutcomeRow("White", sire.White, dam.White),
    catOutcomeRow("White Spotting", sire.WhiteSpotting, dam.WhiteSpotting),
    catOutcomeRow("Silver", sire.Silver, dam.Silver),
    catOutcomeRow("Colourpoint", sire.Colourpoint, dam.Colourpoint),
    catOutcomeRow("Tabby", sire.Tabby, dam.Tabby),
    catOutcomeRow("Spotted", sire.Spotted, dam.Spotted),
    catOutcomeRow("Ticked", sire.Ticked, dam.Ticked),
    catOutcomeRow("Polydactyl", sire.Polydactyl, dam.Polydactyl),
    catOutcomeRow("Amber", sire.Amber, dam.Amber),
    catOutcomeRow("Sunshine", sire.Sunshine, dam.Sunshine),
    catOutcomeRow("Extreme Sunshine", sire.ExtremeSunshine, dam.ExtremeSunshine),
    catOutcomeRow("Charcoal", sire.Charcoal, dam.Charcoal),
    catOutcomeRow("Wideband", sire.Wideband, dam.Wideband),
    catOutcomeRow("Rufousing", sire.Rufousing, dam.Rufousing),
    catOutcomeRow("Glitter", sire.Glitter, dam.Glitter),
    catOutcomeRow("Karpati", sire.Karpati, dam.Karpati)
  ].join("");

  return renderCatResults(
    "Cat Predictor",
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

function runCatRoll(inputs) {
  return `
    <h4>Cat Roll</h4>
    <p>Cat kitten roller coming next.</p>
  `;
}

function runCatPhenotypeCalculator(inputs) {
  const genotypeText = inputs.singleGenotype;
  const parsed = parseCatGenotype(genotypeText);
  const phenotype = getCatPhenotype(parsed);

  return renderCatResults(
    "Cat Phenotype Calculator",
    `
      <p><b>Phenotype:</b> ${phenotype}</p>
      <p><b>Genotype:</b> ${genotypeText}</p>
    `
  );
}

function runCatGenotypeBuilder(inputs) {
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
      examples[index] += " " + gene;
    });
  }

  // BASE COLOURS

  if (phenotype.includes("black")) {
    addSuggestion("Orange: o/Y or o/o");
    addSuggestion("Brown: B/-");
    addExample("o/Y B/B D/D");
    addExample("o/o B/B D/D");
    addHidden("Dilute can be carried: D/d");
  }

  if (phenotype.includes("blue")) {
    addSuggestion("Dilute: d/d");
    addExample("o/Y B/B d/d");
    addExample("o/o B/B d/d");
  }

  if (phenotype.includes("chocolate")) {
    addSuggestion("Brown: b/b");
    addExample("o/Y b/b D/D");
    addExample("o/o b/b D/D");
  }

  if (phenotype.includes("lilac")) {
    addSuggestion("Brown: b/b");
    addSuggestion("Dilute: d/d");
    addExample("o/Y b/b d/d");
    addExample("o/o b/b d/d");
  }

  if (phenotype.includes("cinnamon")) {
    addSuggestion("Brown: bl/bl");
    addExample("o/Y bl/bl D/D");
    addExample("o/o bl/bl D/D");
  }

  if (phenotype.includes("fawn")) {
    addSuggestion("Brown: bl/bl");
    addSuggestion("Dilute: d/d");
    addExample("o/Y bl/bl d/d");
    addExample("o/o bl/bl d/d");
  }

  if (phenotype.includes("red")) {
    addSuggestion("Orange: O/Y or O/O");
    addExample("O/Y B/B D/D");
    addExample("O/O B/B D/D");
    addHidden("Black-based genes can be hidden beneath red.");
  }

  if (phenotype.includes("cream")) {
    addSuggestion("Orange: O/Y or O/O");
    addSuggestion("Dilute: d/d");
    addExample("O/Y B/B d/d");
    addExample("O/O B/B d/d");
  }

  if (phenotype.includes("tortie")) {
    addSuggestion("Orange: O/o");
    addExample("O/o B/B D/D");
    addHidden("Can genetically be black, chocolate, or cinnamon based.");
  }

  if (phenotype.includes("blue tortie")) {
    addSuggestion("Orange: O/o");
    addSuggestion("Dilute: d/d");
    addExample("O/o B/B d/d");
  }

  // WHITE

  if (phenotype.includes("white")) {
    addSuggestion("White: W/- OR White Spotting");
    addExample("W/w");
    addExample("S/S");
  }

  if (phenotype.includes("calico")) {
    addSuggestion("Orange: O/o");
    addSuggestion("White Spotting: S/-");
    addExample("O/o B/B D/D S/s");
  }

  // POINTS

  if (phenotype.includes("burmese")) {
    addSuggestion("Colourpoint: cb/cb");
    addToExamples("cb/cb");
  }

  if (phenotype.includes("siamese") || phenotype.includes("point")) {
    addSuggestion("Colourpoint: cs/cs");
    addToExamples("cs/cs");
  }

  if (phenotype.includes("mink")) {
    addSuggestion("Colourpoint: cb/cs");
    addToExamples("cb/cs");
  }

  if (phenotype.includes("blue-eyed albino")) {
    addSuggestion("Colourpoint: ca/ca");
    addToExamples("ca/ca");
  }

  if (phenotype.includes("red-eyed albino")) {
    addSuggestion("Colourpoint: c/c");
    addToExamples("c/c");
  }

  // SILVER / SUNSHINE

  if (phenotype.includes("silver")) {
    addSuggestion("Silver: I/-");
    addToExamples("I/i");
  }

  if (phenotype.includes("cameo")) {
    addSuggestion("Orange: O/Y or O/O");
    addSuggestion("Silver: I/-");
    addSuggestion("Agouti: A/-");

    addExample("O/Y I/i A/a");
    addExample("O/O I/i A/a");

    addHidden("Wideband may enhance cameo appearance.");
  }

  if (phenotype.includes("amber")) {
    addSuggestion("Amber: Amb/-");
    addToExamples("Amb/n");
  }

  if (phenotype.includes("sunshine")) {
    addSuggestion("Sunshine: Su/-");
    addToExamples("Su/n");
  }

  if (phenotype.includes("extreme sunshine")) {
    addSuggestion("Extreme Sunshine: Es/-");
    addToExamples("Es/n");
  }

  if (phenotype.includes("bimetallic")) {
    addSuggestion("Silver: I/-");
    addSuggestion("Sunshine or Extreme Sunshine");
    addToExamples("I/i Su/n");
  }

  // MODIFIERS

  if (phenotype.includes("charcoal")) {
    addSuggestion("Charcoal: Ch/-");
    addToExamples("Ch/n");
  }

  if (phenotype.includes("shaded")) {
    addSuggestion("Wideband: Wb/-");
    addToExamples("Wb/n");
  }

  if (phenotype.includes("rufoused")) {
    addSuggestion("Rufousing: Rf/-");
    addToExamples("Rf/n");
  }

  if (phenotype.includes("glitter")) {
    addSuggestion("Glitter: Gl/-");
    addToExamples("Gl/n");
  }

  if (phenotype.includes("karpati")) {
    addSuggestion("Karpati: Kp/-");
    addToExamples("Kp/n");
  }

  // TABBY

  if (phenotype.includes("tabby")) {
    addSuggestion("Agouti: A/-");
    addToExamples("A/a");
  }

  if (phenotype.includes("classic")) {
    addSuggestion("Tabby: mc/mc");
    addToExamples("mc/mc");
  }

  if (phenotype.includes("spotted")) {
    addSuggestion("Spotted: Sp/-");
    addToExamples("Sp/sp");
  }

  if (phenotype.includes("ticked")) {
    addSuggestion("Ticked: Ta/-");
    addToExamples("Ta/ta");
  }

  // POLYDACTYL

  if (phenotype.includes("polydactyl")) {
    addSuggestion("Polydactyl: Pd/-");
    addToExamples("Pd/pd");
  }

  if (suggestions.length === 0) {
    suggestions.push("No simple genotype match found yet.");
  }

  return renderCatResults(
    "Cat Genotype Builder",
    `
      <p><b>Phenotype:</b> ${inputs.phenotype}</p>

      <p><b>Likely Required Genes:</b></p>
      <ul>${suggestions.map(item => `<li>${item}</li>`).join("")}</ul>

      <p><b>Possible Example Genotypes:</b></p>
      <ul>${examples.length
        ? examples.map(item => `<li>${item}</li>`).join("")
        : "<li>No example genotypes generated yet.</li>"
      }</ul>

      <p><b>Possible Hidden Traits:</b></p>
      <ul>${hidden.length
        ? hidden.map(item => `<li>${item}</li>`).join("")
        : "<li>No common hidden traits listed yet.</li>"
      }</ul>

      <p><b>Note:</b> These are possible genotype examples, not the only valid combinations.</p>
    `
  );
}

/* =========================
   PARSERS
========================= */

function parseCatGenotype(genotypeText) {
  const text = String(genotypeText || "")
    .replace(/\s+/g, " ")
    .trim();

  return {
    Orange: findCatOrangeGene(text),

    Agouti: findCatGenePair(
      text,
      ["A/A", "A/a", "a/a"],
      "a/a"
    ),

    Brown: findCatBrownGene(text),

    Dilute: findCatGenePair(
      text,
      ["D/D", "D/d", "d/d"],
      "D/D"
    ),

    White: findCatGenePair(
      text,
      ["W/W", "W/w", "w/w"],
      "w/w"
    ),

    WhiteSpotting: findCatGenePair(
      text,
      ["S/S", "S/s", "s/s"],
      "s/s"
    ),

    Silver: findCatGenePair(
      text,
      ["I/I", "I/i", "i/i"],
      "i/i"
    ),

    Colourpoint: findCatColourpointGene(text),

    Tabby: findCatTabbyGene(text),

    Spotted: findCatGenePair(
      text,
      ["Sp/Sp", "Sp/sp", "sp/sp"],
      "sp/sp"
    ),

    Ticked: findCatGenePair(
      text,
      ["Ta/Ta", "Ta/ta", "ta/ta"],
      "ta/ta"
    ),

    Polydactyl: findCatGenePair(
      text,
      ["Pd/Pd", "Pd/pd", "pd/pd"],
      "pd/pd"
    ),

    Amber: findCatGenePair(
      text,
      ["Amb/Amb", "Amb/n", "n/Amb", "n/n"],
      "n/n"
    ),

    Sunshine: findCatGenePair(
      text,
      ["Su/Su", "Su/n", "n/Su", "n/n"],
      "n/n"
    ),

    ExtremeSunshine: findCatGenePair(
      text,
      ["Es/Es", "Es/n", "n/Es", "n/n"],
      "n/n"
    ),

    Charcoal: findCatGenePair(
      text,
      ["Ch/Ch", "Ch/n", "n/Ch", "n/n"],
      "n/n"
    ),

    Wideband: findCatGenePair(
      text,
      ["Wb/Wb", "Wb/n", "n/Wb", "n/n"],
      "n/n"
    ),

    Rufousing: findCatGenePair(
      text,
      ["Rf/Rf", "Rf/n", "n/Rf", "n/n"],
      "n/n"
    ),

    Glitter: findCatGenePair(
      text,
      ["Gl/Gl", "Gl/n", "n/Gl", "n/n"],
      "n/n"
    ),

    Karpati: findCatGenePair(
      text,
      ["Kp/Kp", "Kp/n", "n/Kp", "n/n"],
      "n/n"
    )
  };
}

/* =========================
   PHENOTYPE PIPELINE
========================= */

function getCatPhenotype(parsed) {

  if (
    parsed.White === "W/W" ||
    parsed.White === "W/w"
  ) {
    return applyCatPolydactyl("White", parsed);
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
    applyCatColourModifiers(colour, parsed);

  colour =
    applyCatTabby(colour, parsed);

  colour =
    applyCatWhiteSpotting(colour, parsed);

  colour =
    applyCatPolydactyl(colour, parsed);

  return colour.trim();

}

/* =========================
   BASE COLOUR LOGIC
========================= */

function getCatBaseColour(parsed) {
  if (parsed.Orange === "O/Y") return "Red";

  if (parsed.Orange === "o/Y") {
    if (parsed.Brown === "b/b") return "Chocolate";
    if (parsed.Brown === "bl/bl") return "Cinnamon";
    return "Black";
  }

  if (parsed.Orange === "O/O") return "Red";
  if (parsed.Orange === "O/o") return "Tortie";

  if (parsed.Brown === "b/b") return "Chocolate";
  if (parsed.Brown === "bl/bl") return "Cinnamon";

  return "Black";
}

/* =========================
   MODIFIER LOGIC
========================= */

function applyCatDilute(colour, parsed) {
  if (parsed.Dilute !== "d/d") return colour;

  if (colour === "Black") return "Blue";
  if (colour === "Chocolate") return "Lilac";
  if (colour === "Cinnamon") return "Fawn";
  if (colour === "Red") return "Cream";
  if (colour === "Tortie") return "Blue Tortie";

  return colour;
}
function applyCatSilver(colour, parsed) {

  const hasSilver =
    parsed.Silver === "I/I" ||
    parsed.Silver === "I/i";

  if (!hasSilver) {
    return colour;
  }

  return "Silver " + colour;

}
function applyCatColourModifiers(colour, parsed) {
  if (
    colour === "Blue-Eyed Albino" ||
    colour === "Red-Eyed Albino" ||
    colour === "White"
  ) {
    return colour;
  }

  const modifiers = [];

  if (
    parsed.Amber === "Amb/Amb" ||
    parsed.Amber === "Amb/n"
  ) {
    modifiers.push("Amber");
  }

  if (
    parsed.ExtremeSunshine === "Es/Es" ||
    parsed.ExtremeSunshine === "Es/n"
  ) {
    modifiers.push("Extreme Sunshine");
  } else if (
    parsed.Sunshine === "Su/Su" ||
    parsed.Sunshine === "Su/n"
  ) {
    modifiers.push("Sunshine");
  }

  if (
    parsed.Charcoal === "Ch/Ch" ||
    parsed.Charcoal === "Ch/n"
  ) {
    modifiers.push("Charcoal");
  }

  if (
    parsed.Wideband === "Wb/Wb" ||
    parsed.Wideband === "Wb/n"
  ) {
    modifiers.push("Shaded");
  }

  if (
    parsed.Rufousing === "Rf/Rf" ||
    parsed.Rufousing === "Rf/n"
  ) {
    modifiers.push("Rufoused");
  }

  if (
    parsed.Glitter === "Gl/Gl" ||
    parsed.Glitter === "Gl/n"
  ) {
    modifiers.push("Glitter");
  }

  if (
    parsed.Karpati === "Kp/Kp" ||
    parsed.Karpati === "Kp/n"
  ) {
    modifiers.push("Karpati");
  }

  if (
    (
      modifiers.includes("Sunshine") ||
      modifiers.includes("Extreme Sunshine")
    ) &&
    (
      parsed.Silver === "I/I" ||
      parsed.Silver === "I/i"
    )
  ) {
    return "Bimetallic";
  }

  if (modifiers.includes("Extreme Sunshine")) {
    return "Extreme Sunshine";
  }

  if (modifiers.includes("Sunshine")) {
    return "Sunshine";
  }

  if (modifiers.includes("Amber")) {
    return "Amber";
  }

  if (modifiers.length > 0) {
    return modifiers.join(" ") + " " + colour;
  }

  return colour;
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
    if (token === "C/C") return "C/C";

    if (token === "cb/cb") return "cb/cb";

    if (token === "cs/cs") return "cs/cs";

    if (
      token === "cb/cs" ||
      token === "cs/cb"
    ) {
      return "cb/cs";
    }

    if (token === "ca/ca") return "ca/ca";
    if (token === "c/c") return "c/c";
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

function catOutcomeRow(label, sirePair, damPair) {
  const outcomes = calculateCatGeneOutcomes(sirePair, damPair);

  return `
    <tr>
      <td>${label}</td>
      <td>${outcomes}</td>
    </tr>
  `;
}

function calculateCatGeneOutcomes(sirePair, damPair) {
  const sireAlleles = String(sirePair || "n/n").split("/");
  const damAlleles = String(damPair || "n/n").split("/");

  const counts = {};

  for (const sireAllele of sireAlleles) {
    for (const damAllele of damAlleles) {
      const pair = sortCatGenePair([sireAllele, damAllele]);

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

function sortCatGenePair(alleles) {
  return alleles.sort().join("/");
}
window.runCatPredictor = runCatPredictor;
window.runCatRoll = runCatRoll;
window.runCatPhenotypeCalculator = runCatPhenotypeCalculator;
window.runCatGenotypeBuilder = runCatGenotypeBuilder;
window.runCatGenetics = runCatGenetics;
