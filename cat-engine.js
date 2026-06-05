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
    catOutcomeRow("Karpati", sire.Karpati, dam.Karpati),
    catOutcomeRow("Hair Length", sire.HairLength, dam.HairLength),
    catOutcomeRow("Rex", sire.Rex, dam.Rex),
    catOutcomeRow("Hairless", sire.Hairless, dam.Hairless)
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
  const phenotypeRaw = String(inputs.phenotype || "");
  const phenotype = phenotypeRaw.toLowerCase();

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

 function buildExample(parts) {
  const genes = [];

  function add(gene, defaultValue) {
    if (gene && gene !== defaultValue) {
      genes.push(gene);
    }
  }

  add(parts.Orange, "o/o");
  add(parts.Agouti, "a/a");
  add(parts.Brown, "B/B");
  add(parts.Dilute, "D/D");
  add(parts.White, "w/w");
  add(parts.WhiteSpotting, "s/s");
  add(parts.Silver, "i/i");
  add(parts.Colourpoint, "C/C");
  add(parts.Tabby, "Mc/Mc");
  add(parts.Spotted, "sp/sp");
  add(parts.Ticked, "ta/ta");
  add(parts.Polydactyl, "pd/pd");
  add(parts.Amber, "n/n");
  add(parts.Sunshine, "n/n");
  add(parts.ExtremeSunshine, "n/n");
  add(parts.Charcoal, "n/n");
  add(parts.Wideband, "n/n");
  add(parts.Rufousing, "n/n");
  add(parts.Glitter, "n/n");
  add(parts.Karpati, "n/n");
  add(parts.HairLength, "L/L");
  add(parts.Rex, "rx/rx");
  add(parts.Hairless, "hr/hr");

  return genes.join(" ");
}

  function renderBuilder() {
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

  const wantsBlueCream =
    phenotype.includes("blue-cream") ||
    phenotype.includes("blue cream");

  const wantsCalico =
    phenotype.includes("calico");

  const wantsTortie =
    phenotype.includes("tortie") ||
    wantsBlueCream ||
    wantsCalico;

  const wantsCameo =
    phenotype.includes("cameo");

  const wantsSmoke =
    phenotype.includes("smoke");

  const wantsSilver =
    phenotype.includes("silver");

  const wantsInhibitor =
    wantsCameo ||
    wantsSmoke ||
    wantsSilver ||
    phenotype.includes("bimetallic");

  const wantsBlue =
    phenotype.includes("blue") &&
    !wantsBlueCream &&
    !phenotype.includes("blue-eyed");

  const wantsCream =
    phenotype.includes("cream") &&
    !wantsBlueCream;

  const wantsRed =
    phenotype.includes("red") ||
    wantsCameo;

  const wantsBlack =
    phenotype.includes("black") ||
    wantsSmoke ||
    wantsSilver;

  const wantsChocolate =
    phenotype.includes("chocolate");

  const wantsLilac =
    phenotype.includes("lilac");

  const wantsCinnamon =
    phenotype.includes("cinnamon");

  const wantsFawn =
    phenotype.includes("fawn");

  const wantsTabby =
    phenotype.includes("tabby") ||
    phenotype.includes("classic") ||
    phenotype.includes("mackerel") ||
    phenotype.includes("spotted") ||
    phenotype.includes("ticked") ||
    wantsSilver;

  const wantsClassic =
    phenotype.includes("classic");

  const wantsSpotted =
    phenotype.includes("spotted");

  const wantsTicked =
    phenotype.includes("ticked");

  const wantsBurmese =
    phenotype.includes("burmese");

  const wantsPoint =
    phenotype.includes("siamese") ||
    phenotype.includes("point");

  const wantsMink =
    phenotype.includes("mink");

  const wantsBlueEyedAlbino =
    phenotype.includes("blue-eyed albino");

  const wantsRedEyedAlbino =
    phenotype.includes("red-eyed albino");

  const wantsWhite =
    phenotype.includes("white") &&
    !wantsBlueEyedAlbino &&
    !wantsRedEyedAlbino;

  const wantsPolydactyl =
    phenotype.includes("polydactyl");

  const wantsAmber =
    phenotype.includes("amber");

  const wantsSunshine =
    phenotype.includes("sunshine") &&
    !phenotype.includes("extreme sunshine");

  const wantsExtremeSunshine =
    phenotype.includes("extreme sunshine");

  const wantsCharcoal =
    phenotype.includes("charcoal");

  const wantsShaded =
    phenotype.includes("shaded");

  const wantsRufoused =
    phenotype.includes("rufoused");

  const wantsGlitter =
    phenotype.includes("glitter");

  const wantsKarpati =
    phenotype.includes("karpati");

  const wantsLonghair =
    phenotype.includes("longhair") ||
    phenotype.includes("long hair") ||
    phenotype.includes("long-haired") ||
    phenotype.includes("long haired");

  const wantsShorthair =
    phenotype.includes("shorthair") ||
    phenotype.includes("short hair") ||
    phenotype.includes("short-haired") ||
    phenotype.includes("short haired");

  const wantsRex =
    phenotype.includes("rex");

  const wantsHairless =
    phenotype.includes("hairless") ||
    phenotype.includes("sphynx");

  const base = {
    Orange: "o/o",
    Agouti: "a/a",
    Brown: "B/B",
    Dilute: "D/D",
    White: "w/w",
    WhiteSpotting: "s/s",
    Silver: "i/i",
    Colourpoint: "C/C",
    Tabby: "Mc/Mc",
    Spotted: "sp/sp",
    Ticked: "ta/ta",
    Polydactyl: "pd/pd",
    Amber: "n/n",
    Sunshine: "n/n",
    ExtremeSunshine: "n/n",
    Charcoal: "n/n",
    Wideband: "n/n",
    Rufousing: "n/n",
    Glitter: "n/n",
    Karpati: "n/n",
    HairLength: "L/L",
    Rex: "rx/rx",
    Hairless: "hr/hr"
  };

  function cloneBase() {
    return Object.assign({}, base);
  }

  function addModifierGenes(parts) {
    if (wantsInhibitor) {
      parts.Silver = "I/i";
      addSuggestion("Inhibitor/Silver: I/-");
    }

    if (wantsWhite || wantsCalico) {
      parts.WhiteSpotting = "S/s";
      addSuggestion("White Spotting: S/-");
    }

    if (wantsTabby) {
      parts.Agouti = "A/a";
      addSuggestion("Agouti: A/-");
    }

    if (wantsClassic) {
      parts.Tabby = "mc/mc";
      addSuggestion("Tabby Pattern: mc/mc");
    }

    if (wantsSpotted) {
      parts.Spotted = "Sp/sp";
      addSuggestion("Spotted: Sp/-");
    }

    if (wantsTicked) {
      parts.Ticked = "Ta/ta";
      addSuggestion("Ticked: Ta/-");
    }

    if (wantsBurmese) {
      parts.Colourpoint = "cb/cb";
      addSuggestion("Colourpoint: cb/cb");
    }

    if (wantsPoint) {
      parts.Colourpoint = "cs/cs";
      addSuggestion("Colourpoint: cs/cs");
    }

    if (wantsMink) {
      parts.Colourpoint = "cb/cs";
      addSuggestion("Colourpoint: cb/cs");
    }

    if (wantsBlueEyedAlbino) {
      parts.Colourpoint = "ca/ca";
      addSuggestion("Colourpoint: ca/ca");
    }

    if (wantsRedEyedAlbino) {
      parts.Colourpoint = "c/c";
      addSuggestion("Colourpoint: c/c");
    }

    if (wantsPolydactyl) {
      parts.Polydactyl = "Pd/pd";
      addSuggestion("Polydactyl: Pd/-");
    }

    if (wantsAmber) {
      parts.Amber = "Amb/n";
      addSuggestion("Amber: Amb/-");
    }

    if (wantsSunshine) {
      parts.Sunshine = "Su/n";
      addSuggestion("Sunshine: Su/-");
    }

    if (wantsExtremeSunshine) {
      parts.ExtremeSunshine = "Es/n";
      addSuggestion("Extreme Sunshine: Es/-");
    }

    if (wantsCharcoal) {
      parts.Charcoal = "Ch/n";
      addSuggestion("Charcoal: Ch/-");
    }

    if (wantsShaded) {
      parts.Wideband = "Wb/n";
      addSuggestion("Wideband/Shaded: Wb/-");
    }

    if (wantsRufoused) {
      parts.Rufousing = "Rf/n";
      addSuggestion("Rufousing: Rf/-");
    }

    if (wantsGlitter) {
      parts.Glitter = "Gl/n";
      addSuggestion("Glitter: Gl/-");
    }

    if (wantsKarpati) {
      parts.Karpati = "Kp/n";
      addSuggestion("Karpati: Kp/-");
    }

    if (wantsLonghair) {
      parts.HairLength = "l/l";
      addSuggestion("Hair Length: l/l for longhair");
    }

    if (wantsShorthair) {
      parts.HairLength = "L/l";
      addSuggestion("Hair Length: L/- for shorthair");
      addHidden("Shorthair can carry longhair: L/l.");
    }

    if (wantsRex) {
      parts.Rex = "Rx/rx";
      addSuggestion("Rex Coat: Rx/-");
    }

    if (wantsHairless) {
      parts.Hairless = "Hr/hr";
      addSuggestion("Hairless: Hr/-");
    }

    return parts;
  }

  function addCompleteExample(parts) {
    addExample(buildExample(addModifierGenes(parts)));
  }

  if (wantsBlueCream || (wantsTortie && wantsCream)) {
    addSuggestion("Orange: O/o");
    addSuggestion("Dilute: d/d");

    if (wantsCameo) {
      addSuggestion("Cameo: red/cream areas with Inhibitor I/-");
    }

    addCompleteExample(Object.assign(cloneBase(), {
      Orange: "O/o",
      Brown: "B/B",
      Dilute: "d/d"
    }));

    addCompleteExample(Object.assign(cloneBase(), {
      Orange: "O/o",
      Brown: "B/b",
      Dilute: "d/d"
    }));

    addCompleteExample(Object.assign(cloneBase(), {
      Orange: "O/o",
      Brown: "B/bl",
      Dilute: "d/d"
    }));

    if (wantsCalico) {
      addCompleteExample(Object.assign(cloneBase(), {
        Orange: "O/o",
        Brown: "B/B",
        Dilute: "d/d",
        WhiteSpotting: "S/S"
      }));
    }

    addHidden("Blue-cream and calico are tortie-based, so examples should use O/o.");
    return renderBuilder();
  }

  if (wantsTortie) {
    addSuggestion("Orange: O/o");

    addCompleteExample(Object.assign(cloneBase(), {
      Orange: "O/o",
      Brown: "B/B",
      Dilute: "D/D"
    }));

    addCompleteExample(Object.assign(cloneBase(), {
      Orange: "O/o",
      Brown: "B/b",
      Dilute: "D/D"
    }));

    addCompleteExample(Object.assign(cloneBase(), {
      Orange: "O/o",
      Brown: "B/bl",
      Dilute: "D/D"
    }));

    addHidden("Tortie can hide chocolate, cinnamon, and dilute.");
    return renderBuilder();
  }

  if (wantsCream) {
    addSuggestion("Orange: O/Y or O/O");
    addSuggestion("Dilute: d/d");

    addCompleteExample(Object.assign(cloneBase(), {
      Orange: "O/Y",
      Brown: "B/B",
      Dilute: "d/d"
    }));

    addCompleteExample(Object.assign(cloneBase(), {
      Orange: "O/O",
      Brown: "B/B",
      Dilute: "d/d"
    }));

    addHidden("Black-based genes can be hidden beneath cream.");
    return renderBuilder();
  }

  if (wantsRed || wantsCameo) {
    addSuggestion("Orange: O/Y or O/O");

    if (wantsCameo) {
      addSuggestion("Cameo: red cat with Inhibitor I/-");
    }

    addCompleteExample(Object.assign(cloneBase(), {
      Orange: "O/Y",
      Brown: "B/B",
      Dilute: "D/D"
    }));

    addCompleteExample(Object.assign(cloneBase(), {
      Orange: "O/O",
      Brown: "B/B",
      Dilute: "D/D"
    }));

    addHidden("Black-based genes can be hidden beneath red/cameo.");
    return renderBuilder();
  }

  if (wantsLilac) {
    addSuggestion("Brown: b/b");
    addSuggestion("Dilute: d/d");

    addCompleteExample(Object.assign(cloneBase(), {
      Orange: "o/Y",
      Brown: "b/b",
      Dilute: "d/d"
    }));

    addCompleteExample(Object.assign(cloneBase(), {
      Orange: "o/o",
      Brown: "b/b",
      Dilute: "d/d"
    }));

    return renderBuilder();
  }

  if (wantsFawn) {
    addSuggestion("Brown: bl/bl");
    addSuggestion("Dilute: d/d");

    addCompleteExample(Object.assign(cloneBase(), {
      Orange: "o/Y",
      Brown: "bl/bl",
      Dilute: "d/d"
    }));

    addCompleteExample(Object.assign(cloneBase(), {
      Orange: "o/o",
      Brown: "bl/bl",
      Dilute: "d/d"
    }));

    return renderBuilder();
  }

  if (wantsChocolate) {
    addSuggestion("Brown: b/b or b/bl");

    addCompleteExample(Object.assign(cloneBase(), {
      Orange: "o/Y",
      Brown: "b/b",
      Dilute: "D/D"
    }));

    addCompleteExample(Object.assign(cloneBase(), {
      Orange: "o/o",
      Brown: "b/b",
      Dilute: "D/D"
    }));

    addCompleteExample(Object.assign(cloneBase(), {
      Orange: "o/Y",
      Brown: "b/bl",
      Dilute: "D/D"
    }));

    addHidden("b/bl is chocolate carrying cinnamon.");
    return renderBuilder();
  }

  if (wantsCinnamon) {
    addSuggestion("Brown: bl/bl");

    addCompleteExample(Object.assign(cloneBase(), {
      Orange: "o/Y",
      Brown: "bl/bl",
      Dilute: "D/D"
    }));

    addCompleteExample(Object.assign(cloneBase(), {
      Orange: "o/o",
      Brown: "bl/bl",
      Dilute: "D/D"
    }));

    return renderBuilder();
  }

  if (wantsBlue) {
    addSuggestion("Dilute: d/d");

    addCompleteExample(Object.assign(cloneBase(), {
      Orange: "o/Y",
      Brown: "B/B",
      Dilute: "d/d"
    }));

    addCompleteExample(Object.assign(cloneBase(), {
      Orange: "o/o",
      Brown: "B/B",
      Dilute: "d/d"
    }));

    addHidden("Blue can carry chocolate or cinnamon.");
    return renderBuilder();
  }

  if (wantsSmoke) {
    addSuggestion("Inhibitor/Silver: I/-");
    addSuggestion("Solid cat: a/a");
    addSuggestion("Smoke is inhibitor on a solid black-series cat.");

    addCompleteExample(Object.assign(cloneBase(), {
      Orange: "o/Y",
      Agouti: "a/a",
      Brown: "B/B",
      Dilute: "D/D",
      Silver: "I/i"
    }));

    addCompleteExample(Object.assign(cloneBase(), {
      Orange: "o/o",
      Agouti: "a/a",
      Brown: "B/b",
      Dilute: "D/D",
      Silver: "I/i"
    }));

    return renderBuilder();
  }

  if (wantsSilver || wantsTabby) {
    if (wantsSilver) {
      addSuggestion("Inhibitor/Silver: I/-");
      addSuggestion("Silver uses I/- on a tabby/agouti cat.");
    }

    if (wantsTabby) {
      addSuggestion("Agouti: A/-");
    }

    addCompleteExample(Object.assign(cloneBase(), {
      Orange: "o/Y",
      Agouti: "A/a",
      Brown: "B/B",
      Dilute: "D/D"
    }));

    addCompleteExample(Object.assign(cloneBase(), {
      Orange: "o/o",
      Agouti: "A/a",
      Brown: "B/b",
      Dilute: "D/D"
    }));

    return renderBuilder();
  }

  if (wantsBlack) {
    addSuggestion("Orange: o/Y or o/o");
    addSuggestion("Brown: B/-");

    addCompleteExample(Object.assign(cloneBase(), {
      Orange: "o/Y",
      Brown: "B/B",
      Dilute: "D/D"
    }));

    addCompleteExample(Object.assign(cloneBase(), {
      Orange: "o/o",
      Brown: "B/B",
      Dilute: "D/D"
    }));

    addCompleteExample(Object.assign(cloneBase(), {
      Orange: "o/Y",
      Brown: "B/b",
      Dilute: "D/D"
    }));

    addHidden("Dilute can be carried: D/d");
    return renderBuilder();
  }

  if (wantsWhite) {
    addSuggestion("White: W/- OR White Spotting");
    addExample("W/w");
    addExample("S/S");
    return renderBuilder();
  }

  if (wantsBurmese || wantsPoint || wantsMink || wantsBlueEyedAlbino || wantsRedEyedAlbino) {
    addCompleteExample(Object.assign(cloneBase(), {
      Orange: "o/Y",
      Brown: "B/B",
      Dilute: "D/D"
    }));

    return renderBuilder();
  }

  suggestions.push("No simple genotype match found yet.");
  return renderBuilder();
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

    Agouti: findCatGenePair(text, ["A/A", "A/a", "a/a"], "a/a"),

    Brown: findCatBrownGene(text),

    Dilute: findCatGenePair(text, ["D/D", "D/d", "d/d"], "D/D"),

    White: findCatGenePair(text, ["W/W", "W/w", "w/w"], "w/w"),

    WhiteSpotting: findCatGenePair(text, ["S/S", "S/s", "s/s"], "s/s"),

    Silver: findCatGenePair(text, ["I/I", "I/i", "i/i"], "i/i"),

    Colourpoint: findCatColourpointGene(text),

    Tabby: findCatTabbyGene(text),

    Spotted: findCatGenePair(text, ["Sp/Sp", "Sp/sp", "sp/sp"], "sp/sp"),

    Ticked: findCatGenePair(text, ["Ta/Ta", "Ta/ta", "ta/ta"], "ta/ta"),

    Polydactyl: findCatGenePair(text, ["Pd/Pd", "Pd/pd", "pd/pd"], "pd/pd"),

    Amber: findCatGenePair(text, ["Amb/Amb", "Amb/n", "n/Amb", "n/n"], "n/n"),

    Sunshine: findCatGenePair(text, ["Su/Su", "Su/n", "n/Su", "n/n"], "n/n"),

    ExtremeSunshine: findCatGenePair(text, ["Es/Es", "Es/n", "n/Es", "n/n"], "n/n"),

    Charcoal: findCatGenePair(text, ["Ch/Ch", "Ch/n", "n/Ch", "n/n"], "n/n"),

    Wideband: findCatGenePair(text, ["Wb/Wb", "Wb/n", "n/Wb", "n/n"], "n/n"),

    Rufousing: findCatGenePair(text, ["Rf/Rf", "Rf/n", "n/Rf", "n/n"], "n/n"),

    Glitter: findCatGenePair(text, ["Gl/Gl", "Gl/n", "n/Gl", "n/n"], "n/n"),

    Karpati: findCatGenePair(text, ["Kp/Kp", "Kp/n", "n/Kp", "n/n"], "n/n"),

    HairLength: findCatGenePair(text, ["L/L", "L/l", "l/L", "l/l"], "L/L"),

    Rex: findCatGenePair(text, ["Rx/Rx", "Rx/rx", "rx/Rx", "rx/rx"], "rx/rx"),

    Hairless: findCatGenePair(text, ["Hr/Hr", "Hr/hr", "hr/Hr", "hr/hr"], "hr/hr")
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

  let colour = getCatBaseColour(parsed);

colour = applyCatDilute(colour, parsed);
colour = applyCatPointModifier(colour, parsed);
colour = applyCatColourModifiers(colour, parsed);
colour = applyCatTabby(colour, parsed);
colour = applyCatSilver(colour, parsed);
  colour = applyCatWhiteSpotting(colour, parsed);
  colour = applyCatPolydactyl(colour, parsed);
  colour = applyCatHairType(colour, parsed);

  return colour.trim();
}

/* =========================
   BASE COLOUR LOGIC
========================= */

function getCatBaseColour(parsed) {

  if (parsed.Orange === "O/Y") {
    return "Red";
  }

  if (parsed.Orange === "o/Y") {

    if (
      parsed.Brown === "b/b" ||
      parsed.Brown === "b/bl"
    ) {
      return "Chocolate";
    }

    if (parsed.Brown === "bl/bl") {
      return "Cinnamon";
    }

    return "Black";
  }

  if (parsed.Orange === "O/O") {
    return "Red";
  }

  if (parsed.Orange === "O/o") {
    return "Tortie";
  }

  if (
    parsed.Brown === "b/b" ||
    parsed.Brown === "b/bl"
  ) {
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
  if (parsed.Dilute !== "d/d") return colour;

  const isChocolate =
    parsed.Brown === "b/b" ||
    parsed.Brown === "b/bl";

  const isCinnamon =
    parsed.Brown === "bl/bl";

  if (colour === "Black") {
    return isChocolate
      ? "Lilac"
      : isCinnamon
        ? "Fawn"
        : "Blue";
  }

  if (colour === "Chocolate") return "Lilac";

  if (colour === "Cinnamon") return "Fawn";

  if (colour === "Red") return "Cream";

  if (colour === "Tortie") {

    if (isChocolate) {
      return "Lilac-Cream Tortie";
    }

    if (isCinnamon) {
      return "Fawn-Cream Tortie";
    }

    return "Blue-Cream Tortie";
  }

  return colour;
}
function applyCatPointModifier(colour, parsed) {
  if (!parsed || parsed.Colourpoint === "C/C") return colour;

  if (parsed.Colourpoint === "cb/cb") {
    return "Burmese " + colour;
  }

  if (parsed.Colourpoint === "cs/cs") {
    return "Pointed " + colour;
  }

  if (parsed.Colourpoint === "cb/cs") {
    return "Mink " + colour;
  }

  if (parsed.Colourpoint === "ca/ca") {
    return "Blue-Eyed Albino";
  }

  if (parsed.Colourpoint === "c/c") {
    return "Red-Eyed Albino";
  }

  return colour;
}

function applyCatSilver(colour, parsed) {
  const hasSilver =
    parsed.Silver === "I/I" ||
    parsed.Silver === "I/i";

  if (!hasSilver) {
    return colour;
  }

  const lower = colour.toLowerCase();

  if (
    lower.includes("red") ||
    lower.includes("cream")
  ) {
    return colour
      .replace(/Red/g, "Cameo")
      .replace(/Cream/g, "Cream Cameo");
  }

  if (lower.includes("tabby")) {
    return "Silver " + colour;
  }

  return "Smoke " + colour;
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

function applyCatTabby(colour, parsed) {

  if (
    colour === "Blue-Eyed Albino" ||
    colour === "Red-Eyed Albino" ||
    colour === "White"
  ) {
    return colour;
  }

  const hasAgouti =
    parsed.Agouti === "A/A" ||
    parsed.Agouti === "A/a";

  if (!hasAgouti) {
    return colour;
  }

  if (
    parsed.Ticked === "Ta/Ta" ||
    parsed.Ticked === "Ta/ta"
  ) {
    return "Ticked Tabby " + colour;
  }

  if (
    parsed.Spotted === "Sp/Sp" ||
    parsed.Spotted === "Sp/sp"
  ) {
    return "Spotted Tabby " + colour;
  }

  if (
    parsed.Tabby === "mc/mc"
  ) {
    return "Classic Tabby " + colour;
  }

  if (
    parsed.Tabby === "Mc/Mc" ||
    parsed.Tabby === "Mc/mc"
  ) {
    return "Mackerel Tabby " + colour;
  }

  return colour;
}

function applyCatWhiteSpotting(colour, parsed) {
  if (
    colour === "Blue-Eyed Albino" ||
    colour === "Red-Eyed Albino" ||
    colour === "White"
  ) {
    return colour;
  }

  if (parsed.WhiteSpotting === "S/S") {
    return colour + " and High White";
  }

  if (parsed.WhiteSpotting === "S/s") {
    return colour + " and White";
  }

  return colour;
}

function applyCatPolydactyl(colour, parsed) {
  if (
    parsed.Polydactyl === "Pd/Pd" ||
    parsed.Polydactyl === "Pd/pd"
  ) {
    return colour + " Polydactyl";
  }

  return colour;
}

function applyCatHairType(colour, parsed) {
  if (
    parsed.Hairless === "Hr/Hr" ||
    parsed.Hairless === "Hr/hr" ||
    parsed.Hairless === "hr/Hr"
  ) {
    return colour + " Hairless";
  }

  if (
    parsed.Rex === "Rx/Rx" ||
    parsed.Rex === "Rx/rx" ||
    parsed.Rex === "rx/Rx"
  ) {
    return colour + " Rex";
  }

  if (parsed.HairLength === "l/l") {
    return colour + " Longhair";
  }

  return colour + " Shorthair";
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

  return "none";
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

/* =========================
   EXPORTS
========================= */

window.runCatPredictor = runCatPredictor;
window.runCatRoll = runCatRoll;
window.runCatPhenotypeCalculator = runCatPhenotypeCalculator;
window.runCatGenotypeBuilder = runCatGenotypeBuilder;
window.runCatGenetics = runCatGenetics;

window.applyCatPointModifier = applyCatPointModifier;
window.applyCatTabby = applyCatTabby;
window.applyCatWhiteSpotting = applyCatWhiteSpotting;
window.applyCatPolydactyl = applyCatPolydactyl;
window.applyCatHairType = applyCatHairType;
