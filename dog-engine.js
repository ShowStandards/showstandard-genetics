/* DOG ENGINE FINAL INTENSITY + DOMINO + COCKER SABLE + UPDATED WHITE SPOTTING VERSION 18 */

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

/* IMPORTANT FIXES IN THIS VERSION:
   Extension hierarchy is now:
   E > Em > Eg > Eh > Ea > e

   Eh has been added as Cocker Spaniel Sable.

   E/Eg will no longer show Domino.
   E/Eh will no longer show Cocker Sable.
   Em/Eg will show Mask, not Domino.
   Em/Eh will show Mask, not Cocker Sable.
   K/Ky is accepted as K/ky.

   White spotting hierarchy is now:
   S > sp > si > sw

   S/S, S/sp, S/si, S/sw = Solid
   sp/sp, sp/si, sp/sw = Piebald
   si/si, si/sw = Irish White
   sw/sw = Extreme White
*/

function runDogPredictor(inputs) {
  const sire = parseDogGenotype(inputs.sireGenotype);
  const dam = parseDogGenotype(inputs.damGenotype);

  const rows = [
    dogOutcomeRow("Extension", sire.Extension, dam.Extension),
    dogOutcomeRow("Agouti", sire.Agouti, dam.Agouti),
    dogOutcomeRow("K", sire.K, dam.K),
    dogOutcomeRow("Brown", sire.Brown, dam.Brown),
    dogOutcomeRow("Dilute", sire.Dilute, dam.Dilute),
    dogOutcomeRow("Merle", sire.Merle, dam.Merle),
    dogOutcomeRow("White Spotting", sire.WhiteSpotting, dam.WhiteSpotting),
    dogOutcomeRow("Ticking", sire.Ticking, dam.Ticking),
    dogOutcomeRow("Roan", sire.Roan, dam.Roan),
    dogOutcomeRow("Harlequin", sire.Harlequin, dam.Harlequin),
    dogOutcomeRow("Intensity", sire.Intensity, dam.Intensity),
    dogOutcomeRow("Greying", sire.Greying, dam.Greying),
    dogOutcomeRow("Long Coat", sire.LongCoat, dam.LongCoat),
    dogOutcomeRow("Furnishings", sire.Furnishings, dam.Furnishings),
    dogOutcomeRow("Curl", sire.Curl, dam.Curl)
  ].join("");

  return renderDogResults(
    "Dog Predictor",
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

/* =========================
   CLEAN DOG GENOTYPE BUILDER
========================= */

function runDogGenotypeBuilder(inputs) {
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

  const cleanPhenotype = phenotype
    .replace(/[^a-z\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const wantsMask =
    phenotype.includes("mask") ||
    phenotype.includes("masked");

  const wantsBrownBase =
    phenotype.includes("chocolate") ||
    phenotype.includes("liver") ||
    phenotype.includes("brown");

  const wantsTanPoint =
    phenotype.includes("tan") ||
    phenotype.includes("tri") ||
    phenotype.includes("tricolor") ||
    phenotype.includes("tricolour");

  const wantsBlueMerle =
    phenotype.includes("blue merle");

  const wantsSlateMerle =
    phenotype.includes("slate merle") ||
    phenotype.includes("slate");

  const wantsChocolateMerle =
    phenotype.includes("chocolate merle") ||
    phenotype.includes("liver merle") ||
    phenotype.includes("brown merle");

  const wantsLilacMerle =
    phenotype.includes("lilac merle") ||
    phenotype.includes("isabella merle");

  const wantsGenericMerle =
    phenotype.includes("merle") &&
    !wantsBlueMerle &&
    !wantsSlateMerle &&
    !wantsChocolateMerle &&
    !wantsLilacMerle;

  const wantsBlueBase =
    phenotype.includes("blue") &&
    !wantsBlueMerle &&
    !wantsSlateMerle &&
    !phenotype.includes("blue fawn");

  const wantsLilac =
    phenotype.includes("lilac") ||
    phenotype.includes("isabella");

  const wantsWhiteSpotting =
    phenotype.includes("and white") ||
    phenotype.includes("with white") ||
    phenotype.includes("white markings") ||
    phenotype.includes("irish") ||
    phenotype.includes("piebald") ||
    phenotype.includes("extreme white") ||
    phenotype.includes("tricolour") ||
    phenotype.includes("tricolor");

  const wantsIrish =
    phenotype.includes("irish");

  const wantsPiebald =
    phenotype.includes("piebald");

  const wantsExtremeWhite =
    phenotype.includes("extreme white");

  const wantsTicking =
    phenotype.includes("ticked") ||
    phenotype.includes("ticking");

  const wantsRoan =
    phenotype.includes("roan");

  const wantsHarlequin =
    phenotype.includes("harlequin");

  const wantsBrindle =
    phenotype.includes("brindle");

  const wantsFaded =
    phenotype.includes("faded");

  const wantsLongCoat =
    phenotype.includes("long coat") ||
    phenotype.includes("longcoat");

  const wantsFurnished =
    phenotype.includes("furnished") ||
    phenotype.includes("furnishings");

  const wantsCurly =
    phenotype.includes("curly") ||
    phenotype.includes("curl");

  const wantsSilverSable =
    phenotype.includes("silver sable");

  const wantsCockerSable =
    phenotype.includes("cocker sable") ||
    phenotype.includes("cocker spaniel sable");

  const wantsSable =
    phenotype.includes("sable") &&
    !wantsSilverSable &&
    !wantsCockerSable &&
    !phenotype.includes("wolf sable");

  const wantsSilver =
    cleanPhenotype === "silver" ||
    phenotype.includes("silver red");

  const wantsBlackAndTan =
    phenotype.includes("black & tan") ||
    phenotype.includes("black and tan") ||
    phenotype.includes("tan point");

  const wantsSilverBlackAndTan =
    phenotype.includes("silver black & tan") ||
    phenotype.includes("silver black and tan");

  const wantsCreamPoint =
    phenotype.includes("cream point");

  const wantsNorthernDomino =
    phenotype.includes("northern domino");

  const wantsDomino =
    (
      cleanPhenotype === "domino" ||
      phenotype.includes("sighthound domino") ||
      phenotype.includes("domino")
    ) &&
    !wantsNorthernDomino;

  const isPlainGeneticWhite =
    cleanPhenotype === "white" ||
    cleanPhenotype === "recessive white" ||
    cleanPhenotype === "cream white";

  function buildExample(parts) {
    const geneParts = [];

    geneParts.push(parts.Extension || "E/E");
    geneParts.push(parts.K || "K/ky");

    if (parts.Agouti) geneParts.push(parts.Agouti);
    if (parts.Brown) geneParts.push(parts.Brown);
    if (parts.Dilute) geneParts.push(parts.Dilute);
    if (parts.Merle) geneParts.push(parts.Merle);
    if (parts.WhiteSpotting) geneParts.push(parts.WhiteSpotting);
    if (parts.Ticking) geneParts.push(parts.Ticking);
    if (parts.Roan) geneParts.push(parts.Roan);
    if (parts.Harlequin) geneParts.push(parts.Harlequin);
    if (parts.Intensity) geneParts.push(parts.Intensity);
    if (parts.Greying) geneParts.push(parts.Greying);
    if (parts.LongCoat) geneParts.push(parts.LongCoat);
    if (parts.Furnishings) geneParts.push(parts.Furnishings);
    if (parts.Curl) geneParts.push(parts.Curl);

    return geneParts.join(" ");
  }

  function extensionBase(defaultExtension) {
    if (wantsMask) {
      return "Em/e";
    }

    return defaultExtension || "E/E";
  }

  function whiteSpottingGene() {
    if (wantsExtremeWhite) return "sw/sw";
    if (wantsPiebald) return "sp/sp";
    if (wantsIrish) return "si/si";
    if (wantsWhiteSpotting) return "si/si";
    return "";
  }

  function addPatternGenes(parts) {
    const copy = Object.assign({}, parts);

    const white = whiteSpottingGene();
    if (white) copy.WhiteSpotting = white;

    if (wantsTicking) copy.Ticking = "T/t";
    if (wantsRoan) copy.Roan = "R/r";
    if (wantsFaded) copy.Greying = "G/g";
    if (wantsLongCoat) copy.LongCoat = "l/l";
    if (wantsFurnished) copy.Furnishings = "F/n";
    if (wantsCurly) copy.Curl = "Cu/n";

    return copy;
  }

  function addBuiltExample(parts) {
    addExample(buildExample(addPatternGenes(parts)));
  }

  function addGeneralPatternSuggestions() {
    if (wantsWhiteSpotting) {
      if (wantsExtremeWhite) {
        addSuggestion("White Spotting: sw/sw");
      } else if (wantsPiebald) {
        addSuggestion("White Spotting: sp/sp, sp/si, or sp/sw");
      } else if (wantsIrish) {
        addSuggestion("White Spotting: si/si or si/sw");
      } else {
        addSuggestion("White Spotting: si/si, sp/sp, or sw/sw depending on amount of white");
      }
    }

    if (wantsTicking) addSuggestion("Ticking: T/-");
    if (wantsRoan) addSuggestion("Roan: R/-");
    if (wantsFaded) addSuggestion("Greying: G/-");
    if (wantsLongCoat) addSuggestion("Long Coat: l/l");
    if (wantsFurnished) addSuggestion("Furnishings: F/-");
    if (wantsCurly) addSuggestion("Curl: Cu/-");
  }

  if (isPlainGeneticWhite) {
    addSuggestion("Extension: e/e");
    addSuggestion("White Spotting: sw/sw");
    addSuggestion("Intensity: i/i");
    addExample("e/e sw/sw i/i");
    addHidden("Agouti, K, Brown, Dilute, and Merle can be hidden by e/e.");
  }

  if (!isPlainGeneticWhite && phenotype.includes("cream")) {
    addSuggestion("Extension: e/e");
    addSuggestion("Intensity: I/i");

    addBuiltExample({
      Extension: "e/e",
      K: "K/ky",
      Intensity: "I/i"
    });

    addHidden("Agouti, K, Brown, and Dilute can be hidden by e/e.");
  }

  if (!isPlainGeneticWhite && wantsSilver) {
    addSuggestion("Extension: e/e");
    addSuggestion("Intensity: i/i");

    addBuiltExample({
      Extension: "e/e",
      K: "K/ky",
      Intensity: "i/i"
    });

    addHidden("Agouti, K, Brown, and Dilute can be hidden by e/e.");
  }

  if (
    !isPlainGeneticWhite &&
    phenotype.includes("red") &&
    !wantsSilver
  ) {
    addSuggestion("Extension: e/e");
    addSuggestion("Intensity: I/I");

    addBuiltExample({
      Extension: "e/e",
      K: "K/ky",
      Intensity: "I/I"
    });

    addBuiltExample({
      Extension: "e/e",
      K: "ky/ky",
      Brown: "B/b",
      Dilute: "D/d",
      Intensity: "I/I"
    });

    addHidden("Agouti, K, Brown, and Dilute can be hidden by e/e.");
  }

  if (wantsBlueMerle) {
    addSuggestion("Extension: E/-");
    addSuggestion("Merle: M/m");
    addSuggestion("Dilute: not d/d — use D/D or D/d");

    if (wantsTanPoint) {
      addSuggestion("Agouti: at/at or at/a");
      addSuggestion("K locus: K/-");

      addBuiltExample({
        Extension: extensionBase("E/E"),
        K: "K/ky",
        Agouti: "at/a",
        Brown: "B/B",
        Dilute: "D/D",
        Merle: "M/m"
      });

      addBuiltExample({
        Extension: extensionBase("E/e"),
        K: "K/K",
        Agouti: "at/at",
        Brown: "B/b",
        Dilute: "D/d",
        Merle: "M/m"
      });
    } else {
      addSuggestion("Black pigment base: K/- OR ky/ky with a/a");

      addBuiltExample({
        Extension: extensionBase("E/E"),
        K: "K/ky",
        Agouti: "a/a",
        Brown: "B/B",
        Dilute: "D/D",
        Merle: "M/m"
      });

      addBuiltExample({
        Extension: extensionBase("E/e"),
        K: "ky/ky",
        Agouti: "a/a",
        Brown: "B/b",
        Dilute: "D/d",
        Merle: "M/m"
      });
    }

    addHidden("Brown can be carried: B/b");
  }

  if (wantsSlateMerle) {
    addSuggestion("Extension: E/-");
    addSuggestion("Dilute: d/d");
    addSuggestion("Merle: M/m");

    if (wantsTanPoint) {
      addSuggestion("Agouti: at/at or at/a");
      addSuggestion("K locus: K/-");

      addBuiltExample({
        Extension: extensionBase("E/E"),
        K: "K/ky",
        Agouti: "at/a",
        Brown: "B/B",
        Dilute: "d/d",
        Merle: "M/m"
      });

      addBuiltExample({
        Extension: extensionBase("E/e"),
        K: "K/K",
        Agouti: "at/at",
        Brown: "B/b",
        Dilute: "d/d",
        Merle: "M/m"
      });
    } else {
      addSuggestion("Black pigment base: K/- OR ky/ky with a/a");

      addBuiltExample({
        Extension: extensionBase("E/E"),
        K: "K/ky",
        Agouti: "a/a",
        Brown: "B/B",
        Dilute: "d/d",
        Merle: "M/m"
      });

      addBuiltExample({
        Extension: extensionBase("E/e"),
        K: "ky/ky",
        Agouti: "a/a",
        Brown: "B/b",
        Dilute: "d/d",
        Merle: "M/m"
      });
    }

    addHidden("Brown can be carried: B/b");
  }

  if (wantsChocolateMerle) {
    addSuggestion("Extension: E/-");
    addSuggestion("Brown/Liver/Chocolate: b/b");
    addSuggestion("Merle: M/m");
    addSuggestion("Dilute: not d/d");

    if (wantsTanPoint) {
      addSuggestion("Agouti: at/at or at/a");
      addSuggestion("K locus: K/-");

      addBuiltExample({
        Extension: extensionBase("E/E"),
        K: "K/ky",
        Agouti: "at/a",
        Brown: "b/b",
        Dilute: "D/D",
        Merle: "M/m"
      });

      addBuiltExample({
        Extension: extensionBase("E/e"),
        K: "K/K",
        Agouti: "at/at",
        Brown: "b/b",
        Dilute: "D/d",
        Merle: "M/m"
      });
    } else {
      addSuggestion("Black pigment base: K/- OR ky/ky with a/a");

      addBuiltExample({
        Extension: extensionBase("E/E"),
        K: "K/ky",
        Agouti: "a/a",
        Brown: "b/b",
        Dilute: "D/D",
        Merle: "M/m"
      });

      addBuiltExample({
        Extension: extensionBase("E/e"),
        K: "ky/ky",
        Agouti: "a/a",
        Brown: "b/b",
        Dilute: "D/d",
        Merle: "M/m"
      });
    }
  }

  if (wantsLilacMerle) {
    addSuggestion("Extension: E/-");
    addSuggestion("Brown/Liver/Chocolate: b/b");
    addSuggestion("Dilute: d/d");
    addSuggestion("Merle: M/m");

    if (wantsTanPoint) {
      addSuggestion("Agouti: at/at or at/a");
      addSuggestion("K locus: K/-");

      addBuiltExample({
        Extension: extensionBase("E/E"),
        K: "K/ky",
        Agouti: "at/a",
        Brown: "b/b",
        Dilute: "d/d",
        Merle: "M/m"
      });

      addBuiltExample({
        Extension: extensionBase("E/e"),
        K: "K/K",
        Agouti: "at/at",
        Brown: "b/b",
        Dilute: "d/d",
        Merle: "M/m"
      });
    } else {
      addSuggestion("Black pigment base: K/- OR ky/ky with a/a");

      addBuiltExample({
        Extension: extensionBase("E/E"),
        K: "K/ky",
        Agouti: "a/a",
        Brown: "b/b",
        Dilute: "d/d",
        Merle: "M/m"
      });

      addBuiltExample({
        Extension: extensionBase("E/e"),
        K: "ky/ky",
        Agouti: "a/a",
        Brown: "b/b",
        Dilute: "d/d",
        Merle: "M/m"
      });
    }
  }

  if (wantsGenericMerle) {
    addSuggestion("Merle: M/m");

    if (phenotype.includes("double")) {
      addSuggestion("Merle: M/M");
      addBuiltExample({
        Extension: extensionBase("E/E"),
        K: "K/ky",
        Agouti: "a/a",
        Merle: "M/M"
      });
    } else {
      addBuiltExample({
        Extension: extensionBase("E/E"),
        K: "K/ky",
        Agouti: "a/a",
        Merle: "M/m"
      });
    }
  }

  if (wantsHarlequin) {
    addSuggestion("Merle: M/m");
    addSuggestion("Harlequin: H/h");

    addBuiltExample({
      Extension: extensionBase("E/E"),
      K: "K/ky",
      Agouti: "a/a",
      Merle: "M/m",
      Harlequin: "H/h"
    });
  }

  if (wantsNorthernDomino) {
    addSuggestion("Extension: Ea/e or Ea/Ea");
    addSuggestion("Agouti: at/at, at/a, or aw/-");
    addSuggestion("K locus: ky/ky");

    addBuiltExample({
      Extension: "Ea/e",
      K: "ky/ky",
      Agouti: "at/a",
      Intensity: "I/I"
    });

    addBuiltExample({
      Extension: "Ea/Ea",
      K: "ky/ky",
      Agouti: "aw/a",
      Intensity: "I/I"
    });
  }

  if (wantsCockerSable) {
    addSuggestion("Extension: Eh/e or Eh/Eh");
    addSuggestion("Cocker Spaniel Sable: Eh");
    addSuggestion("K locus: ky/ky");

    addBuiltExample({
      Extension: "Eh/e",
      K: "ky/ky",
      Agouti: "at/a",
      Intensity: "I/I"
    });

    addBuiltExample({
      Extension: "Eh/Eh",
      K: "ky/ky",
      Agouti: "Ay/a",
      Intensity: "I/I"
    });
  }

  if (wantsDomino) {
    addSuggestion("Extension: Eg/e or Eg/Eg");
    addSuggestion("Agouti: at/at, at/a, or aw/-");
    addSuggestion("K locus: ky/ky");

    addBuiltExample({
      Extension: "Eg/e",
      K: "ky/ky",
      Agouti: "at/a",
      Intensity: "I/I"
    });

    addBuiltExample({
      Extension: "Eg/Eg",
      K: "ky/ky",
      Agouti: "aw/a",
      Intensity: "I/I"
    });
  }

  if (
    phenotype.includes("black") &&
    !phenotype.includes("silver black") &&
    !wantsBlueMerle &&
    !wantsSlateMerle &&
    !wantsChocolateMerle &&
    !wantsLilacMerle &&
    !wantsGenericMerle
  ) {
    addSuggestion("Extension: E/-");
    addSuggestion("Black: K/- OR ky/ky with a/a");

    addBuiltExample({
      Extension: extensionBase("E/E"),
      K: "K/ky",
      Agouti: "a/a"
    });

    addBuiltExample({
      Extension: extensionBase("E/e"),
      K: "ky/ky",
      Agouti: "a/a"
    });

    addHidden("Brown can be carried: B/b");
    addHidden("Dilute can be carried: D/d");
  }

  if (
    wantsBrownBase &&
    !wantsChocolateMerle &&
    !wantsLilacMerle
  ) {
    addSuggestion("Extension: E/-");
    addSuggestion("Brown/Liver/Chocolate: b/b");

    if (wantsTanPoint) {
      addSuggestion("Agouti: at/at or at/a");
      addSuggestion("K locus: ky/ky or kbr/ky");

      addBuiltExample({
        Extension: extensionBase("E/E"),
        K: "ky/ky",
        Agouti: "at/a",
        Brown: "b/b"
      });

      addBuiltExample({
        Extension: extensionBase("E/e"),
        K: "ky/ky",
        Agouti: "at/at",
        Brown: "b/b"
      });
    } else {
      addSuggestion("Black pigment base: K/- OR ky/ky with a/a");

      addBuiltExample({
        Extension: extensionBase("E/E"),
        K: "K/ky",
        Agouti: "a/a",
        Brown: "b/b"
      });

      addBuiltExample({
        Extension: extensionBase("E/e"),
        K: "ky/ky",
        Agouti: "a/a",
        Brown: "b/b"
      });
    }

    addHidden("Dilute can be carried: D/d");
  }

  if (
    wantsBlueBase &&
    !wantsSlateMerle &&
    !wantsBlueMerle
  ) {
    addSuggestion("Dilute: d/d");

    addBuiltExample({
      Extension: extensionBase("E/E"),
      K: "K/ky",
      Agouti: "a/a",
      Dilute: "d/d"
    });

    addBuiltExample({
      Extension: extensionBase("E/e"),
      K: "ky/ky",
      Agouti: "a/a",
      Dilute: "d/d"
    });
  }

  if (
    wantsLilac &&
    !wantsLilacMerle
  ) {
    addSuggestion("Brown/Liver/Chocolate: b/b");
    addSuggestion("Dilute: d/d");

    addBuiltExample({
      Extension: extensionBase("E/E"),
      K: "K/ky",
      Agouti: "a/a",
      Brown: "b/b",
      Dilute: "d/d"
    });

    addBuiltExample({
      Extension: extensionBase("E/e"),
      K: "ky/ky",
      Agouti: "a/a",
      Brown: "b/b",
      Dilute: "d/d"
    });
  }

  if (wantsSilverSable) {
    addSuggestion("Agouti: Ay/-");
    addSuggestion("K locus: ky/ky or kbr/ky");
    addSuggestion("Intensity: i/i");

    addBuiltExample({
      Extension: extensionBase("E/E"),
      K: "ky/ky",
      Agouti: "Ay/a",
      Intensity: "i/i"
    });

    addBuiltExample({
      Extension: extensionBase("E/e"),
      K: "ky/ky",
      Agouti: "Ay/at",
      Intensity: "i/i"
    });
  }

  if (wantsSable) {
    addSuggestion("Agouti: Ay/-");
    addSuggestion("K locus: ky/ky or kbr/ky");
    addSuggestion("Intensity: I/I");

    addBuiltExample({
      Extension: extensionBase("E/E"),
      K: "ky/ky",
      Agouti: "Ay/a",
      Intensity: "I/I"
    });

    addBuiltExample({
      Extension: extensionBase("E/e"),
      K: "ky/ky",
      Agouti: "Ay/at",
      Intensity: "I/I"
    });
  }

  if (phenotype.includes("blue fawn")) {
    addSuggestion("Agouti: Ay/-");
    addSuggestion("Dilute: d/d");
    addSuggestion("Intensity: I/i");

    addBuiltExample({
      Extension: extensionBase("E/E"),
      K: "ky/ky",
      Agouti: "Ay/a",
      Dilute: "d/d",
      Intensity: "I/i"
    });
  } else if (phenotype.includes("fawn")) {
    addSuggestion("Agouti: Ay/-");
    addSuggestion("K locus: ky/ky or kbr/ky");
    addSuggestion("Intensity: I/i");

    addBuiltExample({
      Extension: extensionBase("E/E"),
      K: "ky/ky",
      Agouti: "Ay/a",
      Intensity: "I/i"
    });

    addBuiltExample({
      Extension: extensionBase("E/e"),
      K: "ky/ky",
      Agouti: "Ay/at",
      Intensity: "I/i"
    });
  }

  if (
    (wantsBlackAndTan || wantsSilverBlackAndTan || wantsCreamPoint) &&
    !wantsBlueMerle &&
    !wantsSlateMerle &&
    !wantsChocolateMerle &&
    !wantsLilacMerle
  ) {
    addSuggestion("Agouti: at/at or at/a");
    addSuggestion("K locus: ky/ky or kbr/ky");

    if (wantsSilverBlackAndTan) {
      addSuggestion("Intensity: i/i");
    } else if (wantsCreamPoint) {
      addSuggestion("Intensity: I/i");
    } else {
      addSuggestion("Intensity: I/I");
    }

    addBuiltExample({
      Extension: extensionBase("E/E"),
      K: "ky/ky",
      Agouti: "at/a",
      Intensity: wantsSilverBlackAndTan ? "i/i" : wantsCreamPoint ? "I/i" : "I/I"
    });

    addBuiltExample({
      Extension: extensionBase("E/e"),
      K: "ky/ky",
      Agouti: "at/at",
      Intensity: wantsSilverBlackAndTan ? "i/i" : wantsCreamPoint ? "I/i" : "I/I"
    });
  }

  if (
    wantsTanPoint &&
    !wantsBrownBase &&
    !wantsBlueMerle &&
    !wantsSlateMerle &&
    !wantsChocolateMerle &&
    !wantsLilacMerle
  ) {
    addSuggestion("Agouti: at/at or at/a");
    addSuggestion("K locus: ky/ky or kbr/ky");

    addBuiltExample({
      Extension: extensionBase("E/E"),
      K: "ky/ky",
      Agouti: "at/a",
      Intensity: "I/I"
    });

    addBuiltExample({
      Extension: extensionBase("E/e"),
      K: "ky/ky",
      Agouti: "at/at",
      Intensity: "I/I"
    });
  }

  if (phenotype.includes("saddle")) {
    addSuggestion("Agouti: asa/asa");

    addBuiltExample({
      Extension: extensionBase("E/E"),
      K: "ky/ky",
      Agouti: "asa/asa"
    });
  }

  if (phenotype.includes("wolf sable")) {
    addSuggestion("Agouti: aw/-");

    addBuiltExample({
      Extension: extensionBase("E/E"),
      K: "ky/ky",
      Agouti: "aw/a"
    });

    addBuiltExample({
      Extension: extensionBase("E/e"),
      K: "ky/ky",
      Agouti: "aw/at"
    });
  }

  if (phenotype.includes("grizzle")) {
    addSuggestion("Extension: Eg/e or Eg/Eg");
    addSuggestion("Agouti: at/at");

    addBuiltExample({
      Extension: "Eg/e",
      K: "ky/ky",
      Agouti: "at/at"
    });

    addBuiltExample({
      Extension: "Eg/Eg",
      K: "ky/ky",
      Agouti: "at/at"
    });
  }

  if (wantsBrindle) {
    addSuggestion("K locus: kbr/kbr or kbr/ky");

    if (examples.length) {
      for (let i = 0; i < examples.length; i++) {
        examples[i] = examples[i].replace(/\bK\/ky\b|\bK\/K\b|\bky\/ky\b/g, "kbr/ky");
      }
    } else {
      addBuiltExample({
        Extension: extensionBase("E/E"),
        K: "kbr/ky",
        Agouti: "Ay/a"
      });
    }
  }

  if (wantsMask) {
    addSuggestion("Extension: Em/e or Em/Em");
    addHidden("Mask is part of the Extension locus and should replace E, not be added as a separate gene.");
  }

  addGeneralPatternSuggestions();

  if (suggestions.length === 0) {
    suggestions.push("No simple genotype match found yet.");
  }

  return renderDogResults(
    "Dog Genotype Builder",
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
      ["B/B", "B/b", "b/B", "b/b"],
      "B/B"
    ),

    Dilute: findDogGenePair(
      text,
      ["D/D", "D/d", "d/D", "d/d"],
      "D/D"
    ),

    Merle: findDogGenePair(
      text,
      ["M/M", "M/m", "m/M", "m/m"],
      "m/m"
    ),

    WhiteSpotting: findDogWhiteSpotting(text),

    Ticking: findDogGenePair(
      text,
      ["T/T", "T/t", "t/T", "t/t"],
      "t/t"
    ),

    Roan: findDogGenePair(
      text,
      ["R/R", "R/r", "r/R", "r/r"],
      "r/r"
    ),

    Harlequin: findDogGenePair(
      text,
      ["H/H", "H/h", "h/H", "h/h"],
      "h/h"
    ),

    Intensity: findDogGenePair(
      text,
      ["I/I", "I/i", "i/I", "i/i"],
      "I/I"
    ),

    Greying: findDogGenePair(
      text,
      ["G/G", "G/g", "g/G", "g/g"],
      "g/g"
    ),

    LongCoat: findDogGenePair(
      text,
      ["L/L", "L/l", "l/L", "l/l"],
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
  const visibleExtension = getDogVisibleExtension(parsed.Extension);

  if (visibleExtension === "e") {
    return "Red";
  }

  if (parsed.Agouti === "asa/asa") {
    return "Saddle Tan";
  }

  if (
    parsed.K === "K/K" ||
    parsed.K === "K/kbr" ||
    parsed.K === "K/ky"
  ) {
    return "Black";
  }

  if (
    visibleExtension === "Ea" &&
    (
      parsed.Agouti === "at/at" ||
      parsed.Agouti === "at/a" ||
      parsed.Agouti === "at/asa" ||
      parsed.Agouti === "aw/aw" ||
      parsed.Agouti === "aw/at" ||
      parsed.Agouti === "aw/asa" ||
      parsed.Agouti === "aw/a"
    )
  ) {
    return "Northern Domino";
  }

  if (
    visibleExtension === "Eg" &&
    (
      parsed.Agouti === "at/at" ||
      parsed.Agouti === "at/a" ||
      parsed.Agouti === "at/asa" ||
      parsed.Agouti === "aw/aw" ||
      parsed.Agouti === "aw/at" ||
      parsed.Agouti === "aw/asa" ||
      parsed.Agouti === "aw/a"
    )
  ) {
    return "Domino";
  }

  if (
    visibleExtension === "Eh" &&
    (
      parsed.Agouti === "Ay/Ay" ||
      parsed.Agouti === "Ay/aw" ||
      parsed.Agouti === "Ay/at" ||
      parsed.Agouti === "Ay/asa" ||
      parsed.Agouti === "Ay/a" ||
      parsed.Agouti === "at/at" ||
      parsed.Agouti === "at/a" ||
      parsed.Agouti === "at/asa" ||
      parsed.Agouti === "aw/aw" ||
      parsed.Agouti === "aw/at" ||
      parsed.Agouti === "aw/asa" ||
      parsed.Agouti === "aw/a"
    )
  ) {
    return "Cocker Sable";
  }

  if (
    parsed.Agouti === "Ay/Ay" ||
    parsed.Agouti === "Ay/aw" ||
    parsed.Agouti === "Ay/at" ||
    parsed.Agouti === "Ay/asa" ||
    parsed.Agouti === "Ay/a"
  ) {
    return "Sable";
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
    return "Black & Tan";
  }

  return "Black";
}

/* =========================
   MODIFIER LOGIC
========================= */

function applyDogModifiers(colour, parsed) {
  const isBrown = parsed.Brown === "b/b";
  const isDilute = parsed.Dilute === "d/d";
  const isSingleMerle = parsed.Merle === "M/m";
  const isDoubleMerle = parsed.Merle === "M/M";

  if (isBrown) {
    if (colour === "Black") colour = "Chocolate";
    if (colour === "Black & Tan") colour = "Chocolate & Tan";
    if (colour === "Wolf Sable") colour = "Chocolate Wolf Sable";
    if (colour === "Sable") colour = "Chocolate Sable";
    if (colour === "Saddle Tan") colour = "Chocolate Saddle Tan";
    if (colour === "Domino") colour = "Chocolate Domino";
    if (colour === "Northern Domino") colour = "Chocolate Northern Domino";
    if (colour === "Cocker Sable") colour = "Chocolate Cocker Sable";
  }

  if (isDilute) {
    if (colour === "Black") colour = "Blue";
    if (colour === "Chocolate") colour = "Lilac";
    if (colour === "Black & Tan") colour = "Blue & Tan";
    if (colour === "Chocolate & Tan") colour = "Lilac & Tan";
    if (colour === "Sable") colour = "Blue Sable";
    if (colour === "Chocolate Sable") colour = "Lilac Sable";
    if (colour === "Wolf Sable") colour = "Blue Wolf Sable";
    if (colour === "Chocolate Wolf Sable") colour = "Lilac Wolf Sable";
    if (colour === "Saddle Tan") colour = "Blue Saddle Tan";
    if (colour === "Chocolate Saddle Tan") colour = "Lilac Saddle Tan";
    if (colour === "Domino") colour = "Blue Domino";
    if (colour === "Chocolate Domino") colour = "Lilac Domino";
    if (colour === "Northern Domino") colour = "Blue Northern Domino";
    if (colour === "Chocolate Northern Domino") colour = "Lilac Northern Domino";
    if (colour === "Cocker Sable") colour = "Blue Cocker Sable";
    if (colour === "Chocolate Cocker Sable") colour = "Lilac Cocker Sable";
  }

  if (parsed.Intensity === "I/i") {
    if (colour === "Red") colour = "Cream";

    if (colour === "Sable") colour = "Fawn";
    if (colour === "Blue Sable") colour = "Blue Fawn";
    if (colour === "Chocolate Sable") colour = "Chocolate Fawn";
    if (colour === "Lilac Sable") colour = "Lilac Fawn";
    if (colour === "Cocker Sable") colour = "Cocker Fawn";
    if (colour === "Blue Cocker Sable") colour = "Blue Cocker Fawn";
    if (colour === "Chocolate Cocker Sable") colour = "Chocolate Cocker Fawn";
    if (colour === "Lilac Cocker Sable") colour = "Lilac Cocker Fawn";

    if (colour === "Wolf Sable") colour = "Pale Wolf Sable";
    if (colour === "Blue Wolf Sable") colour = "Pale Blue Wolf Sable";
    if (colour === "Chocolate Wolf Sable") colour = "Pale Chocolate Wolf Sable";
    if (colour === "Lilac Wolf Sable") colour = "Pale Lilac Wolf Sable";

    if (colour === "Black & Tan") colour = "Cream Point";
    if (colour === "Chocolate & Tan") colour = "Chocolate & Cream";
    if (colour === "Blue & Tan") colour = "Blue & Cream";
    if (colour === "Lilac & Tan") colour = "Lilac & Cream";
  }

  if (parsed.Intensity === "i/i") {
    if (colour === "Red") colour = "Silver";

    if (colour === "Sable") colour = "Silver Sable";
    if (colour === "Blue Sable") colour = "Silver Blue Sable";
    if (colour === "Chocolate Sable") colour = "Silver Chocolate Sable";
    if (colour === "Lilac Sable") colour = "Silver Lilac Sable";
    if (colour === "Cocker Sable") colour = "Silver Cocker Sable";
    if (colour === "Blue Cocker Sable") colour = "Silver Blue Cocker Sable";
    if (colour === "Chocolate Cocker Sable") colour = "Silver Chocolate Cocker Sable";
    if (colour === "Lilac Cocker Sable") colour = "Silver Lilac Cocker Sable";

    if (colour === "Wolf Sable") colour = "Silver Wolf Sable";
    if (colour === "Blue Wolf Sable") colour = "Silver Blue Wolf Sable";
    if (colour === "Chocolate Wolf Sable") colour = "Silver Chocolate Wolf Sable";
    if (colour === "Lilac Wolf Sable") colour = "Silver Lilac Wolf Sable";

    if (colour === "Black & Tan") colour = "Silver Black & Tan";
    if (colour === "Chocolate & Tan") colour = "Silver Chocolate & Tan";
    if (colour === "Blue & Tan") colour = "Silver Blue & Tan";
    if (colour === "Lilac & Tan") colour = "Silver Lilac & Tan";
  }

  if (isSingleMerle) {
    if (colour === "Black") {
      colour = "Blue Merle";
    } else if (colour === "Blue") {
      colour = "Slate Merle";
    } else if (colour === "Chocolate") {
      colour = "Chocolate Merle";
    } else if (colour === "Lilac") {
      colour = "Lilac Merle";
    } else {
      colour = colour + " Merle";
    }
  }

  if (isDoubleMerle) {
    if (colour === "Black") {
      colour = "Double Blue Merle";
    } else if (colour === "Blue") {
      colour = "Double Slate Merle";
    } else if (colour === "Chocolate") {
      colour = "Double Chocolate Merle";
    } else if (colour === "Lilac") {
      colour = "Double Lilac Merle";
    } else {
      colour = "Double Merle " + colour;
    }
  }

  if (
    getDogVisibleExtension(parsed.Extension) === "Em" &&
    colour !== "Red" &&
    colour !== "Cream" &&
    colour !== "Silver"
  ) {
    colour = colour + " Mask";
  }

  if (
    parsed.Harlequin === "H/h" &&
    isSingleMerle
  ) {
    colour = colour.replace("Merle", "Harlequin");
  }

  if (
    colour !== "Red" &&
    colour !== "Cream" &&
    colour !== "Silver" &&
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

  if (
    parsed.WhiteSpotting === "sp/sp" ||
    parsed.WhiteSpotting === "sp/si" ||
    parsed.WhiteSpotting === "sp/sw"
  ) {
    patterns.push("Piebald");
  }

  if (
    parsed.WhiteSpotting === "si/si" ||
    parsed.WhiteSpotting === "si/sw"
  ) {
    patterns.push("Irish White");
  }

  if (parsed.WhiteSpotting === "sw/sw") {
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

function getDogVisibleExtension(pair) {
  const alleles = String(pair || "e/e").split("/");
  const order = ["E", "Em", "Eg", "Eh", "Ea", "e"];

  for (const allele of order) {
    if (alleles.includes(allele)) return allele;
  }

  return "e";
}

function getDogVisibleWhiteSpotting(pair) {
  const alleles = String(pair || "S/S").split("/");
  const order = ["S", "sp", "si", "sw"];

  for (const allele of order) {
    if (alleles.includes(allele)) return allele;
  }

  return "S";
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

        if (option === "b/B") return "B/b";
        if (option === "d/D") return "D/d";
        if (option === "m/M") return "M/m";
        if (option === "t/T") return "T/t";
        if (option === "r/R") return "R/r";
        if (option === "h/H") return "H/h";
        if (option === "i/I") return "I/i";
        if (option === "g/G") return "G/g";
        if (option === "l/L") return "L/l";

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

  const valid = ["E", "Em", "Eg", "Eh", "Ea", "EA", "e"];

  for (const token of tokens) {
    const parts = token.split("/");
    if (parts.length !== 2) continue;

    let a = parts[0];
    let b = parts[1];

    if (a === "EA") a = "Ea";
    if (b === "EA") b = "Ea";

    if (valid.includes(a) && valid.includes(b)) {
      return sortDogGenePair([a, b]);
    }
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

  for (const rawToken of tokens) {
    const token = rawToken.replaceAll("Ky", "ky");

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
    if (token === "S/si") return "S/si";
    if (token === "si/S") return "S/si";
    if (token === "S/sw") return "S/sw";
    if (token === "sw/S") return "S/sw";

    if (token === "sp/sp") return "sp/sp";
    if (token === "sp/si") return "sp/si";
    if (token === "si/sp") return "sp/si";
    if (token === "sp/sw") return "sp/sw";
    if (token === "sw/sp") return "sp/sw";

    if (token === "si/si") return "si/si";
    if (token === "si/sw") return "si/sw";
    if (token === "sw/si") return "si/sw";

    if (token === "sw/sw") return "sw/sw";
  }

  return "S/S";
}
function dogOutcomeRow(label, sirePair, damPair) {
  const outcomes = calculateDogGeneOutcomes(sirePair, damPair);

  return `
    <tr>
      <td>${label}</td>
      <td>${outcomes}</td>
    </tr>
  `;
}

function calculateDogGeneOutcomes(sirePair, damPair) {
  const sireAlleles = String(sirePair || "n/n").split("/");
  const damAlleles = String(damPair || "n/n").split("/");

  const counts = {};

  for (const sireAllele of sireAlleles) {
    for (const damAllele of damAlleles) {
      const pair = sortDogGenePair([sireAllele, damAllele]);
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

function sortDogGenePair(alleles) {
  return alleles
    .sort((a, b) => {
      const order = [
        "E", "Em", "Eg", "Eh", "Ea", "e",
        "Ay", "aw", "at", "asa", "a",
        "K", "kbr", "ky",
        "B", "b",
        "D", "d",
        "M", "m",
        "S", "sp", "si", "sw",
        "T", "t",
        "R", "r",
        "H", "h",
        "I", "i",
        "G", "g",
        "L", "l",
        "F", "Cu", "n"
      ];

      return order.indexOf(a) - order.indexOf(b);
    })
    .join("/");
}

window.runDogPredictor = runDogPredictor;
window.runDogRoll = runDogRoll;
window.runDogPhenotypeCalculator = runDogPhenotypeCalculator;
window.runDogGenotypeBuilder = runDogGenotypeBuilder;
window.runDogGenetics = runDogGenetics;
window.parseDogGenotype = parseDogGenotype;
window.getDogPhenotype = getDogPhenotype;
window.getDogVisibleExtension = getDogVisibleExtension;
window.getDogVisibleWhiteSpotting = getDogVisibleWhiteSpotting;
