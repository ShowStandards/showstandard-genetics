/* HORSE ENGINE WHITE SCORE + APPALOOSA STACKING VERSION 17 - OVERO NOTE FIX */

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
    horseOutcomeRow("Cream / Cream-Pearl", sire.Cream, dam.Cream),
    horseOutcomeRow("Pearl", sire.Pearl, dam.Pearl),
    horseOutcomeRow("Dun", sire.Dun, dam.Dun),
    horseOutcomeRow("Champagne", sire.Champagne, dam.Champagne),
    horseOutcomeRow("Silver", sire.Silver, dam.Silver),
    horseOutcomeRow("Mushroom", sire.Mushroom, dam.Mushroom),
    horseOutcomeRow("Flaxen", sire.Flaxen, dam.Flaxen),
    horseOutcomeRow("Sooty", sire.Sooty, dam.Sooty),
    horseOutcomeRow("Pangare", sire.Pangare, dam.Pangare),
    horseOutcomeRow("Grey", sire.Grey, dam.Grey),
    horseOutcomeRow("Roan", sire.Roan, dam.Roan),
    horseOutcomeRow("Tobiano", sire.Tobiano, dam.Tobiano),
    horseOutcomeRow("Frame", sire.Frame, dam.Frame),
    horseOutcomeRow("Splash", sire.Splash, dam.Splash),
    horseOutcomeRow("Sabino", sire.Sabino, dam.Sabino),
    horseOutcomeRow("Rabicano", sire.Rabicano, dam.Rabicano),
    horseOutcomeRow("Manchado", sire.Manchado, dam.Manchado),
    horseOutcomeRow("Appaloosa", sire.Appaloosa, dam.Appaloosa),
    horseOutcomeRow("PATN1", sire.PATN1, dam.PATN1),
    horseOutcomeRow("PATN2", sire.PATN2, dam.PATN2)
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

  return renderHorseResults(
    "Phenotype Calculator",
    `
      <p><b>Phenotype:</b> ${phenotype}</p>
      <p><b>Genotype:</b> ${genotypeText}</p>
    `
  );
}

function runHorseGenotypeBuilder(inputs) {
  const phenotype = String(inputs.phenotype || "").toLowerCase();
  const suggestions = [];
  const examples = [];
  const hidden = [];
  const notes = [];

  function addSuggestion(item) {
    if (!suggestions.includes(item)) suggestions.push(item);
  }

  function cleanExampleGenotype(item) {
    const tokens = String(item || "")
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .filter(Boolean);

    const cleaned = [];

    tokens.forEach(token => {
      if (!cleaned.includes(token)) cleaned.push(token);
    });

    return cleaned.join(" ");
  }

  function addExample(item) {
    const cleaned = cleanExampleGenotype(item);
    if (cleaned && !examples.includes(cleaned)) examples.push(cleaned);
  }

  function addHidden(item) {
    if (!hidden.includes(item)) hidden.push(item);
  }

  function addNote(item) {
    if (!notes.includes(item)) notes.push(item);
  }

  function addToExamples(gene) {
    const cleanedGene = cleanExampleGenotype(gene);

    if (examples.length === 0) {
      addExample(cleanedGene);
      return;
    }

    examples.forEach((example, index) => {
      examples[index] = cleanExampleGenotype(example + " " + cleanedGene);
    });
  }

  function hasPhenotypePhrase(phrase) {
    const normalizedPhenotype = phenotype.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
    const normalizedPhrase = String(phrase || "").toLowerCase().replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
    return normalizedPhenotype.includes(normalizedPhrase);
  }


  if (hasPhenotypePhrase("overo")) {
    addNote(
      "Overo is a descriptive term and may refer to Frame Overo, Splash, Sabino, or combinations of those patterns. Genetic testing is required to determine the specific pattern."
    );
  }

  const isChestnutFamily =
    hasPhenotypePhrase("chestnut") ||
    hasPhenotypePhrase("sorrel") ||
    hasPhenotypePhrase("red");

  if (isChestnutFamily) {
    addSuggestion("Extension: e/e");
    addExample("e/e A/A");
    addExample("e/e A/a");
    addExample("e/e a/a");
    addHidden("Agouti can be hidden on chestnut: A/A, A/a, or a/a");
    addHidden("Silver can be hidden on chestnut: Z/n or Z/Z");

    if (hasPhenotypePhrase("sorrel")) {
      addNote("Sorrel is treated as part of the chestnut/red family and is genetically e/e.");
    }

    if (hasPhenotypePhrase("red")) {
      addNote("Red is treated as part of the chestnut/sorrel family and is genetically e/e.");
    }

    if (hasPhenotypePhrase("liver")) {
      addNote("Liver is a shade of Chestnut and is not genetically distinct from Chestnut in this calculator. This can be added on your horse profile if you wish.");
    }

    if (hasPhenotypePhrase("dark chestnut")) {
      addNote("Dark Chestnut is a shade of Chestnut and is not genetically distinct from Chestnut in this calculator. This can be added on your horse profile if you wish.");
    }

    if (hasPhenotypePhrase("light chestnut")) {
      addNote("Light Chestnut is a shade of Chestnut and is not genetically distinct from Chestnut in this calculator. This can be added on your horse profile if you wish.");
    }
  }

  if (hasPhenotypePhrase("black") && !hasPhenotypePhrase("silver black")) {
    addSuggestion("Extension: E/-");
    addSuggestion("Agouti: a/a");
    addExample("E/E a/a");
    addExample("E/e a/a");
    addHidden("Chestnut can be carried: E/e");
  }

  if (hasPhenotypePhrase("bay")) {
    addSuggestion("Extension: E/-");
    addSuggestion("Agouti: A/-");
    addExample("E/E A/A");
    addExample("E/e A/a");
    addHidden("Chestnut can be carried: E/e");
    addHidden("Recessive black can be carried: A/a");
  }

  if (hasPhenotypePhrase("palomino")) {
    addSuggestion("Base: e/e");
    addSuggestion("Cream: Cr/n");
    addExample("e/e A/A Cr/n");
    addExample("e/e A/a Cr/n");
    addExample("e/e a/a Cr/n");
    addHidden("Agouti and Silver can be hidden on red-based horses.");
  }

  if (hasPhenotypePhrase("buckskin")) {
    addSuggestion("Base: E/- A/-");
    addSuggestion("Cream: Cr/n");
    addExample("E/E A/A Cr/n");
    addExample("E/e A/a Cr/n");
    addHidden("Chestnut can be carried: E/e");
    addHidden("Recessive black can be carried: A/a");
  }

  if (hasPhenotypePhrase("smokey black")) {
    addSuggestion("Base: E/- a/a");
    addSuggestion("Cream: Cr/n");
    addExample("E/E a/a Cr/n");
    addExample("E/e a/a Cr/n");
    addHidden("Chestnut can be carried: E/e");
  }

  if (hasPhenotypePhrase("cremello")) {
    addSuggestion("Base: e/e");
    addSuggestion("Cream: Cr/Cr");
    addExample("e/e A/A Cr/Cr");
    addExample("e/e A/a Cr/Cr");
    addHidden("Agouti and Silver can be hidden on red-based horses.");
  }

  if (hasPhenotypePhrase("perlino")) {
    addSuggestion("Base: E/- A/-");
    addSuggestion("Cream: Cr/Cr");
    addExample("E/E A/A Cr/Cr");
    addExample("E/e A/a Cr/Cr");
  }

  if (hasPhenotypePhrase("smokey cream")) {
    addSuggestion("Base: E/- a/a");
    addSuggestion("Cream: Cr/Cr");
    addExample("E/E a/a Cr/Cr");
    addExample("E/e a/a Cr/Cr");
  }

  const hasVisibleSilver = hasPhenotypePhrase("silver");

  const isNamedDunCreamCombo =
    hasPhenotypePhrase("dunalino") ||
    hasPhenotypePhrase("dunskin") ||
    hasPhenotypePhrase("dun skin") ||
    hasPhenotypePhrase("smokey grullo") ||
    hasPhenotypePhrase("smoky grullo") ||
    hasPhenotypePhrase("silver grullo") ||
    hasPhenotypePhrase("silver dunskin") ||
    hasPhenotypePhrase("silver dun skin");

  const isNamedDunChampagneCombo =
    hasPhenotypePhrase("gold dun champagne") ||
    hasPhenotypePhrase("amber dun champagne") ||
    hasPhenotypePhrase("classic dun champagne") ||
    hasPhenotypePhrase("silver amber dun champagne") ||
    hasPhenotypePhrase("silver classic dun champagne");

  if (hasPhenotypePhrase("dunalino") && !hasVisibleSilver) {
    addSuggestion("Base: e/e");
    addSuggestion("Cream: Cr/n");
    addSuggestion("Dun: D/-");
    addExample("e/e A/A Cr/n D/n");
    addExample("e/e A/a Cr/n D/n");
    addHidden("Agouti and Silver can be hidden on red-based horses.");
    addNote("Dunalino is palomino plus dun: genetically chestnut/red with one cream and dun.");
  } else if ((hasPhenotypePhrase("dunskin") || hasPhenotypePhrase("dun skin")) && !hasVisibleSilver) {
    addSuggestion("Base: E/- A/-");
    addSuggestion("Cream: Cr/n");
    addSuggestion("Dun: D/-");
    addExample("E/E A/A Cr/n D/n");
    addExample("E/e A/a Cr/n D/n");
    addHidden("Chestnut can be carried: E/e");
    addHidden("Recessive black can be carried: A/a");
    addNote("Dunskin is buckskin plus dun: genetically bay with one cream and dun.");
  } else if ((hasPhenotypePhrase("smokey grullo") || hasPhenotypePhrase("smoky grullo")) && !hasVisibleSilver) {
    addSuggestion("Base: E/- a/a");
    addSuggestion("Cream: Cr/n");
    addSuggestion("Dun: D/-");
    addExample("E/E a/a Cr/n D/n");
    addExample("E/e a/a Cr/n D/n");
    addHidden("Chestnut can be carried: E/e");
    addNote("Smokey Grullo is smokey black plus dun: genetically black with one cream and dun.");
  }

  if (hasPhenotypePhrase("red dun")) {
    addSuggestion("Base: e/e");
    addSuggestion("Dun: D/-");
    addExample("e/e A/A D/n");
    addExample("e/e A/a D/n");
  } else if (hasPhenotypePhrase("bay dun")) {
    addSuggestion("Base: E/- A/-");
    addSuggestion("Dun: D/-");
    addExample("E/E A/A D/n");
    addExample("E/e A/a D/n");
  } else if ((hasPhenotypePhrase("grullo") || hasPhenotypePhrase("grulla")) && !isNamedDunCreamCombo) {
    addSuggestion("Base: E/- a/a");
    addSuggestion("Dun: D/-");
    addExample("E/E a/a D/n");
    addExample("E/e a/a D/n");
  } else if (hasPhenotypePhrase("dun") && !isNamedDunCreamCombo && !isNamedDunChampagneCombo) {
    addSuggestion("Dun: D/-");
    addToExamples("D/n");
  }

  if (hasPhenotypePhrase("gold dun champagne")) {
    addSuggestion("Base: e/e");
    addSuggestion("Dun: D/-");
    addSuggestion("Champagne: Ch/-");
    addExample("e/e A/A D/n Ch/n");
    addExample("e/e A/a D/n Ch/n");
    addHidden("Agouti and Silver can be hidden on red-based horses.");
  } else if (hasPhenotypePhrase("amber dun champagne")) {
    addSuggestion("Base: E/- A/-");
    addSuggestion("Dun: D/-");
    addSuggestion("Champagne: Ch/-");
    addExample("E/E A/A D/n Ch/n");
    addExample("E/e A/a D/n Ch/n");
    addHidden("Chestnut can be carried: E/e");
    addHidden("Recessive black can be carried: A/a");
  } else if (hasPhenotypePhrase("classic dun champagne")) {
    addSuggestion("Base: E/- a/a");
    addSuggestion("Dun: D/-");
    addSuggestion("Champagne: Ch/-");
    addExample("E/E a/a D/n Ch/n");
    addExample("E/e a/a D/n Ch/n");
    addHidden("Chestnut can be carried: E/e");
  } else if (hasPhenotypePhrase("gold cream champagne")) {
    addSuggestion("Base: e/e");
    addSuggestion("Cream: Cr/n or Cr/Cr");
    addSuggestion("Champagne: Ch/-");
    addExample("e/e A/A Cr/n Ch/n");
    addExample("e/e A/a Cr/n Ch/n");
  } else if (hasPhenotypePhrase("amber cream champagne")) {
    addSuggestion("Base: E/- A/-");
    addSuggestion("Cream: Cr/n or Cr/Cr");
    addSuggestion("Champagne: Ch/-");
    addExample("E/E A/A Cr/n Ch/n");
    addExample("E/e A/a Cr/n Ch/n");
  } else if (hasPhenotypePhrase("classic cream champagne")) {
    addSuggestion("Base: E/- a/a");
    addSuggestion("Cream: Cr/n or Cr/Cr");
    addSuggestion("Champagne: Ch/-");
    addExample("E/E a/a Cr/n Ch/n");
    addExample("E/e a/a Cr/n Ch/n");
  } else if (hasPhenotypePhrase("gold champagne")) {
    addSuggestion("Base: e/e");
    addSuggestion("Champagne: Ch/-");
    addExample("e/e A/A Ch/n");
    addExample("e/e A/a Ch/n");
  } else if (hasPhenotypePhrase("amber champagne")) {
    addSuggestion("Base: E/- A/-");
    addSuggestion("Champagne: Ch/-");
    addExample("E/E A/A Ch/n");
    addExample("E/e A/a Ch/n");
  } else if (hasPhenotypePhrase("classic champagne")) {
    addSuggestion("Base: E/- a/a");
    addSuggestion("Champagne: Ch/-");
    addExample("E/E a/a Ch/n");
    addExample("E/e a/a Ch/n");
  } else if (hasPhenotypePhrase("champagne")) {
    addSuggestion("Champagne: Ch/-");
    addExample("E/E A/A Ch/n");
    addExample("E/e A/a Ch/n");
    addExample("E/E a/a Ch/n");
    addExample("E/e a/a Ch/n");
    addExample("e/e A/A Ch/n");
    addExample("e/e A/a Ch/n");
    addHidden("Champagne can occur on any base colour.");
  }

  if (hasPhenotypePhrase("silver dunskin") || hasPhenotypePhrase("silver dun skin")) {
    addSuggestion("Base: E/- A/-");
    addSuggestion("Cream: Cr/n");
    addSuggestion("Dun: D/-");
    addSuggestion("Silver: Z/-");
    addExample("E/E A/A Cr/n D/n Z/n");
    addExample("E/e A/a Cr/n D/n Z/n");
    addHidden("Chestnut can be carried: E/e");
  } else if (hasPhenotypePhrase("silver grullo")) {
    addSuggestion("Base: E/- a/a");
    addSuggestion("Dun: D/-");
    addSuggestion("Silver: Z/-");
    addExample("E/E a/a D/n Z/n");
    addExample("E/e a/a D/n Z/n");
    addHidden("Chestnut can be carried: E/e");
  } else if (hasPhenotypePhrase("silver bay dun")) {
    addSuggestion("Base: E/- A/-");
    addSuggestion("Dun: D/-");
    addSuggestion("Silver: Z/-");
    addExample("E/E A/A D/n Z/n");
    addExample("E/e A/a D/n Z/n");
  } else if (hasPhenotypePhrase("silver amber dun champagne")) {
    addSuggestion("Base: E/- A/-");
    addSuggestion("Dun: D/-");
    addSuggestion("Champagne: Ch/-");
    addSuggestion("Silver: Z/-");
    addExample("E/E A/A D/n Ch/n Z/n");
    addExample("E/e A/a D/n Ch/n Z/n");
  } else if (hasPhenotypePhrase("silver classic dun champagne")) {
    addSuggestion("Base: E/- a/a");
    addSuggestion("Dun: D/-");
    addSuggestion("Champagne: Ch/-");
    addSuggestion("Silver: Z/-");
    addExample("E/E a/a D/n Ch/n Z/n");
    addExample("E/e a/a D/n Ch/n Z/n");
  } else if (hasPhenotypePhrase("silver amber champagne")) {
    addSuggestion("Base: E/- A/-");
    addSuggestion("Champagne: Ch/-");
    addSuggestion("Silver: Z/-");
    addExample("E/E A/A Ch/n Z/n");
    addExample("E/e A/a Ch/n Z/n");
  } else if (hasPhenotypePhrase("silver classic champagne")) {
    addSuggestion("Base: E/- a/a");
    addSuggestion("Champagne: Ch/-");
    addSuggestion("Silver: Z/-");
    addExample("E/E a/a Ch/n Z/n");
    addExample("E/e a/a Ch/n Z/n");
  } else if (hasPhenotypePhrase("silver black")) {
    addSuggestion("Base: E/- a/a");
    addSuggestion("Silver: Z/-");
    addExample("E/E a/a Z/n");
    addExample("E/e a/a Z/n");
  } else if (hasPhenotypePhrase("silver bay")) {
    addSuggestion("Base: E/- A/-");
    addSuggestion("Silver: Z/-");
    addExample("E/E A/A Z/n");
    addExample("E/e A/a Z/n");
  } else if (hasPhenotypePhrase("silver")) {
    addSuggestion("Silver: Z/-");
    addToExamples("Z/n");
  }

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

  if (phenotype.includes("sabino")) {
    addSuggestion("Sabino: Sb/-");
    addToExamples("Sb/n");
  }

  if (phenotype.includes("rabicano")) {
    addSuggestion("Rabicano: Rb/-");
    addToExamples("Rb/n");
  }

  if (phenotype.includes("manchado")) {
    addSuggestion("Manchado: Mn/Mn");
    addToExamples("Mn/Mn");
    addHidden("Manchado is treated as a recessive simulated locus in Show Standard; Mn/n is a non-visible carrier.");
    addNote("Manchado is modeled in Show Standard as recessive for consistent inheritance, because the real-world causal gene has not been established.");
  }

  if (phenotype.includes("tovero")) {
    addSuggestion("Tobiano: To/-");
    addSuggestion("Frame Overo: OLW/-");
    addToExamples("To/n OLW/n");
  }

  if (phenotype.includes("few spot")) {
    addSuggestion("Appaloosa: Lp/Lp");
    addSuggestion("PATN1: PATN1/-");
    addToExamples("Lp/Lp PATN1/patn1");
  } else if (phenotype.includes("leopard")) {
    addSuggestion("Appaloosa: Lp/-");
    addSuggestion("PATN1: PATN1/-");
    addToExamples("Lp/lp PATN1/patn1");
  } else if (phenotype.includes("snow cap")) {
    addSuggestion("Appaloosa: Lp/Lp");
    addSuggestion("PATN2: PATN2/-");
    addToExamples("Lp/Lp PATN2/patn2");
  } else if (phenotype.includes("blanket")) {
    addSuggestion("Appaloosa: Lp/-");
    addSuggestion("PATN2: PATN2/-");
    addToExamples("Lp/lp PATN2/patn2");
  } else if (
    phenotype.includes("appaloosa") ||
    phenotype.includes("varnish")
  ) {
    addSuggestion("Appaloosa: Lp/-");
    addToExamples("Lp/lp");
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

      ${notes.length ? `<p><b>Colour Notes:</b></p><ul>${notes.map(item => `<li>${item}</li>`).join("")}</ul>` : ""}

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
    Extension: findGenePair(text, ["E/E", "E/e", "e/E", "e/e"], "e/e"),
    Agouti: findGenePair(text, ["A/A", "A/a", "a/A", "a/a"], "a/a"),
    Cream: findHorseCreamGene(text),

    Dun: findGenePair(
      text,
      [
        "D/D",
        "D/nd1",
        "nd1/D",
        "D/nd2",
        "nd2/D",
        "D/n",
        "n/D",
        "nd1/nd1",
        "nd1/nd2",
        "nd2/nd1",
        "nd1/n",
        "n/nd1",
        "nd2/nd2",
        "nd2/n",
        "n/nd2",
        "n/n"
      ],
      "n/n"
    ),

    Champagne: findGenePair(text, ["Ch/Ch", "Ch/n", "n/Ch", "n/n"], "n/n"),
    Silver: findGenePair(text, ["Z/Z", "Z/n", "n/Z", "n/n"], "n/n"),
    Pearl: findHorsePearlGene(text),
    Mushroom: findGenePair(text, ["mu/mu", "Mu/mu", "mu/Mu", "Mu/Mu", "n/n"], "n/n"),

    Flaxen: findGenePair(text, ["F/F", "F/f", "f/F", "f/f"], "F/F"),
    Sooty: findGenePair(text, ["Sty/Sty", "Sty/n", "n/Sty", "n/n"], "n/n"),
    Pangare: findGenePair(text, ["P/P", "P/n", "n/P", "n/n"], "n/n"),

    Roan: findGenePair(text, ["Rn/Rn", "Rn/n", "n/Rn", "n/n"], "n/n"),
    Grey: findGenePair(text, ["G/G", "G/g", "g/G", "g/g"], "g/g"),

    Tobiano: findGenePair(text, ["To/To", "To/n", "n/To", "n/n"], "n/n"),
    Frame: findGenePair(text, ["OLW/OLW", "OLW/n", "n/OLW", "n/n"], "n/n"),
    Splash: findGenePair(text, ["Spl/Spl", "Spl/n", "n/Spl", "n/n"], "n/n"),
    Sabino: findGenePair(text, ["Sb/Sb", "Sb/n", "n/Sb", "n/n"], "n/n"),
    Rabicano: findGenePair(text, ["Rb/Rb", "Rb/n", "n/Rb", "n/n"], "n/n"),
    Manchado: findGenePair(text, ["Mn/Mn", "Mn/n", "n/Mn", "n/n"], "n/n"),

    Appaloosa: findGenePair(
      text,
      ["Lp/Lp", "Lp/lp", "lp/Lp", "lp/lp", "Lp/n", "n/Lp", "n/n"],
      "lp/lp"
    ),

    PATN1: findGenePair(
      text,
      ["PATN1/PATN1", "PATN1/patn1", "patn1/PATN1", "patn1/patn1", "PATN1/n", "n/PATN1", "n/n"],
      "patn1/patn1"
    ),

    PATN2: findGenePair(
      text,
      ["PATN2/PATN2", "PATN2/patn2", "patn2/PATN2", "patn2/patn2", "PATN2/n", "n/PATN2", "n/n"],
      "patn2/patn2"
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

function findHorseCreamGene(text) {
  const tokens = String(text || "")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ");

  for (const token of tokens) {
    if (token === "Cr/Cr") return "Cr/Cr";

    if (
      token === "Cr/n" ||
      token === "n/Cr"
    ) {
      return "Cr/n";
    }

    if (
      token === "Cr/Prl" ||
      token === "Prl/Cr"
    ) {
      return "Cr/Prl";
    }
  }

  return "n/n";
}

function findHorsePearlGene(text) {
  const tokens = String(text || "")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ");

  for (const token of tokens) {
    if (token === "Prl/Prl") return "Prl/Prl";

    if (
      token === "Prl/n" ||
      token === "n/Prl"
    ) {
      return "Prl/n";
    }

    if (
      token === "Cr/Prl" ||
      token === "Prl/Cr"
    ) {
      return "Cr/Prl";
    }
  }

  return "n/n";
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

        if (option === "lp/Lp") return "Lp/lp";
        if (option === "patn1/PATN1") return "PATN1/patn1";
        if (option === "patn2/PATN2") return "PATN2/patn2";

        if (option === "e/E") return "E/e";
        if (option === "a/A") return "A/a";
        if (option === "g/G") return "G/g";

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
  if (parsed.Frame === "OLW/OLW") {
    return "⚠ Homozygous Frame Overo (OLW/OLW) - Lethal White Syndrome / non-viable genotype";
  }

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
  colour = applyHorseManchado(colour, parsed);
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

  if (
    cream === "Cr/n" ||
    cream === "Cr/Prl"
  ) {
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

    if (baseColour === "Palomino") return "Dunalino";
    if (baseColour === "Flaxen Palomino") return "Flaxen Dunalino";
    if (baseColour === "Buckskin") return "Dunskin";
    if (baseColour === "Smokey Black") return "Smokey Grullo";

    if (baseColour === "Cremello") return "Cremello Dun";
    if (baseColour === "Flaxen Cremello") return "Flaxen Cremello Dun";
    if (baseColour === "Perlino") return "Perlino Dun";
    if (baseColour === "Smokey Cream") return "Smokey Cream Dun";

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

  if (baseColour === "Red Dun") return "Gold Dun Champagne";
  if (baseColour === "Flaxen Red Dun") return "Flaxen Gold Dun Champagne";
  if (baseColour === "Bay Dun") return "Amber Dun Champagne";
  if (baseColour === "Grullo") return "Classic Dun Champagne";

  if (baseColour === "Palomino") return "Gold Cream Champagne";
  if (baseColour === "Flaxen Palomino") return "Flaxen Gold Cream Champagne";
  if (baseColour === "Buckskin") return "Amber Cream Champagne";
  if (baseColour === "Smokey Black") return "Classic Cream Champagne";

  if (baseColour === "Dunalino") return "Gold Dun Champagne";
  if (baseColour === "Flaxen Dunalino") return "Flaxen Gold Dun Champagne";
  if (baseColour === "Dunskin") return "Amber Dun Champagne";
  if (baseColour === "Smokey Grullo") return "Classic Dun Champagne";

  return baseColour + " Champagne";
}

function applyHorseSilver(baseColour, parsed) {
  if (!hasDominantGene(parsed.Silver, "Z")) return baseColour;

  if (baseColour === "Chestnut" || baseColour.includes("Chestnut")) return baseColour;
  if (baseColour.includes("Gold")) return baseColour;

  if (baseColour === "Black") return "Silver Black";
  if (baseColour === "Bay") return "Silver Bay";
  if (baseColour === "Buckskin") return "Silver Buckskin";
  if (baseColour === "Perlino") return "Silver Perlino";
  if (baseColour === "Smokey Black") return "Silver Smokey Black";
  if (baseColour === "Smokey Cream") return "Silver Smokey Cream";

  if (baseColour === "Grullo" || baseColour === "Smokey Grullo") return "Silver Grullo";
  if (baseColour === "Bay Dun") return "Silver Bay Dun";
  if (baseColour === "Dunskin") return "Silver Dunskin";

  if (baseColour === "Amber Champagne") return "Silver Amber Champagne";
  if (baseColour === "Classic Champagne") return "Silver Classic Champagne";
  if (baseColour === "Amber Dun Champagne") return "Silver Amber Dun Champagne";
  if (baseColour === "Classic Dun Champagne") return "Silver Classic Dun Champagne";
  if (baseColour === "Amber Cream Champagne") return "Silver Amber Cream Champagne";
  if (baseColour === "Classic Cream Champagne") return "Silver Classic Cream Champagne";

  return "Silver " + baseColour;
}

function applyHorsePearl(baseColour, parsed) {
  const pearl = parsed.Pearl;

  if (pearl === "Prl/Prl") {
    if (baseColour === "Chestnut") return "Apricot";
    if (baseColour === "Flaxen Chestnut") return "Flaxen Apricot";
    if (baseColour === "Bay") return "Bay Pearl";
    if (baseColour === "Black") return "Black Pearl";
    if (baseColour === "Palomino") return "Palomino Pearl";
    if (baseColour === "Buckskin") return "Buckskin Pearl";
    if (baseColour === "Smokey Black") return "Smokey Black Pearl";

    return baseColour + " Pearl";
  }

  if (pearl === "Cr/Prl") {
    if (baseColour === "Chestnut") return "Cream Pearl";
    if (baseColour === "Flaxen Chestnut") return "Flaxen Cream Pearl";
    if (baseColour === "Bay") return "Buckskin Pearl";
    if (baseColour === "Black") return "Smokey Black Pearl";
    if (baseColour === "Palomino") return "Cream Pearl";
    if (baseColour === "Buckskin") return "Buckskin Pearl";
    if (baseColour === "Smokey Black") return "Smokey Black Pearl";

    return baseColour + " Pearl";
  }

  return baseColour;
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
  if (parsed.Frame === "OLW/OLW") {
    return "⚠ Homozygous Frame Overo (OLW/OLW) - Lethal White Syndrome / non-viable genotype";
  }

  const patterns = [];
  const score = calculateHorseWhiteScore(parsed);

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

  if (hasDominantGene(parsed.Sabino, "Sb")) {
    patterns.push("Sabino");
  }

  if (hasDominantGene(parsed.Rabicano, "Rb")) {
    patterns.push("Rabicano");
  }

  if (patterns.length > 0) {
    return colour + " " + getHorseWhiteExpression(score) + " " + patterns.join(" ");
  }

  return colour;
}

function calculateHorseWhiteScore(parsed) {
  let score = 0;

  if (parsed.Tobiano === "To/To") score += 3;
  else if (parsed.Tobiano === "To/n") score += 2;

  if (parsed.Frame === "OLW/n") score += 1;

  if (parsed.Splash === "Spl/Spl") score += 2;
  else if (parsed.Splash === "Spl/n") score += 1;

  if (parsed.Sabino === "Sb/Sb") score += 2;
  else if (parsed.Sabino === "Sb/n") score += 1;

  if (parsed.Rabicano === "Rb/Rb") score += 1;
  else if (parsed.Rabicano === "Rb/n") score += 0.5;

  return score;
}

function getHorseWhiteExpression(score) {
  if (score <= 1) return "Minimal White";
  if (score <= 3) return "Moderate White";
  if (score <= 5) return "High White";
  return "Maximum White";
}

function applyHorseManchado(colour, parsed) {
  if (parsed.Manchado !== "Mn/Mn") return colour;

  return colour + " Manchado";
}

function applyHorseAppaloosa(colour, parsed) {
  const lp = parsed.Appaloosa;
  const patn1 = parsed.PATN1;
  const patn2 = parsed.PATN2;

  const hasLp =
    lp === "Lp/Lp" ||
    lp === "Lp/lp";

  const isLpLp = lp === "Lp/Lp";

  const hasPatn1 =
    patn1 === "PATN1/PATN1" ||
    patn1 === "PATN1/patn1";

  const hasPatn2 =
    patn2 === "PATN2/PATN2" ||
    patn2 === "PATN2/patn2";

  if (!hasLp) return colour;

  const appaloosaPatterns = [];

  if (hasPatn1) {
    appaloosaPatterns.push(isLpLp ? "Few Spot" : "Leopard");
  }

  if (hasPatn2) {
    appaloosaPatterns.push(isLpLp ? "Snow Cap" : "Blanket");
  }

  if (appaloosaPatterns.length === 0) {
    appaloosaPatterns.push("Varnish Roan");
  }

  return colour + " " + appaloosaPatterns.join(" ");
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


/* =========================
   HORSE GENE SUMMARY TABLE
========================= */

/*
| Gene / Locus | Code | What It Does |
|---|---|---|
| Extension | E/e | Controls black pigment. E/- allows black pigment; e/e creates red/chestnut base. |
| Agouti | A/a | Controls black pigment placement. A/- makes bay on E/- horses; a/a makes black. Hidden on chestnut. |
| Cream | Cr | Incomplete dominant dilution. Cr/n makes palomino, buckskin, or smokey black. Cr/Cr makes cremello, perlino, or smokey cream. |
| Pearl | Prl | Recessive dilution. Prl/Prl creates pearl/apricot colours; Cr/Prl creates cream-pearl colours. |
| Dun | D, nd1, nd2 | D/- creates dun dilution and primitive markings. nd1 can show primitive markings without full dun dilution. |
| Champagne | Ch | Dominant dilution. Creates gold, amber, classic, cream champagne, and dun champagne colours. |
| Silver | Z | Dilutes black pigment only. Affects black/bay-based horses; hidden on chestnut. |
| Mushroom | mu | Recessive red-based dilution. Creates mushroom and mushmello. |
| Flaxen | f | Recessive modifier that lightens mane/tail on chestnut-based horses. |
| Sooty | Sty | Darkening modifier. Adds sooty shading to the visible colour. |
| Pangare | P | Light-point modifier. Adds pangare/mealy shading. |
| Grey | G | Dominant progressive greying. In this engine, G/- displays simply as Grey. |
| Roan | Rn | Dominant roaning. Creates red roan, bay roan, blue roan, etc. |
| Tobiano | To | Dominant white pattern. Adds to white-expression score; To/To scores higher than To/n. |
| Frame Overo | OLW | Dominant frame pattern. OLW/n displays Frame Overo; OLW/OLW returns lethal white warning. |
| Splash | Spl | Dominant white pattern. Spl/Spl scores higher than Spl/n. |
| Sabino | Sb | Dominant white pattern. Sb/Sb scores higher than Sb/n. |
| Rabicano | Rb | Roaning/white pattern modifier. Adds a smaller amount to white-expression score. |
| Manchado | Mn | Show Standard simulated recessive locus. Mn/Mn displays Manchado; Mn/n is a non-visible carrier. Kept separate from the white-expression score. |
| Appaloosa / Leopard Complex | Lp | Required for Appaloosa patterning. Lp with no PATN displays Varnish Roan. |
| PATN1 | PATN1 | Appaloosa modifier. With Lp/lp gives Leopard; with Lp/Lp gives Few Spot. |
| PATN2 | PATN2 | Appaloosa modifier. With Lp/lp gives Blanket; with Lp/Lp gives Snow Cap. |
|
| White Expression Score | — | Tobiano, Frame, Splash, Sabino, and Rabicano are scored together as Minimal, Moderate, High, or Maximum White while keeping pattern names visible. |
*/

/* =========================
   EXPORTS
========================= */

window.runHorsePredictor = runHorsePredictor;
window.runHorsePhenotypeCalculator = runHorsePhenotypeCalculator;
window.runHorseGenotypeBuilder = runHorseGenotypeBuilder;
window.runHorseGenetics = runHorseGenetics;
window.parseHorseGenotype = parseHorseGenotype;
window.getHorsePhenotype = getHorsePhenotype;
window.applyHorsePatterns = applyHorsePatterns;
