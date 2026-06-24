/* DOG ENGINE VERSION 19.6 - HAIRLESS DISPLAY + SHORT COAT FIX */
/* DOG ENGINE VERSION 19.4 - HAIRLESS LOCUS ADDED */
/* DOG ENGINE VERSION 19.3 - RED MERLE CACHE CHECK */
/* DOG ENGINE VERSION 19.1 - E LOCUS REBUILD + MERLE RENAMES + SHADE NOTES + WHITE SPOTTING + COAT CLEANUP */

/* =========================
   CANINE GENETICS ENGINE
========================= */

function runDogGenetics(inputs) {
  const mode = inputs.mode;

  if (mode === "predictor") return runDogPredictor(inputs);
  if (mode === "roll") return runDogRoll(inputs);
  if (mode === "phenotypeFromGenotype") return runDogPhenotypeCalculator(inputs);
  if (mode === "genotypeFromPhenotype") return runDogGenotypeBuilder(inputs);
  if (mode === "autoAnimalGenotype") return buildAutoDogGenotype(inputs.phenotype);
  if (mode === "geneIntroTable") return renderDogGeneIntroTable();

  return "Invalid dog genetics mode.";
}

/* VERSION 19 NOTES

   Big fixes in this version:

   1. E locus has been rebuilt.
      - e/e still produces recessive red/cream/silver and hides most dark-pigment patterning.
      - Em acts as visible mask.
      - Eg, Eh, and Ea now act as extension modifiers layered over the K/Agouti base.
      - Domino, Northern Domino, and Cocker Sable are no longer used as stand-alone base colours.

   2. Extension visibility hierarchy is now:
      Em > E > Eg > Eh > Ea > e

      This means:
      - Em/Eg = Mask visible, Domino hidden/carried.
      - E/Eg = Normal extension, Domino hidden/carried.
      - Eg/e or Eg/Eg = Domino can show.
      - Eh/e or Eh/Eh = Cocker Sable can show.
      - Ea/e or Ea/Ea = Northern Domino can show.

   3. Merle naming is now:
      - Black base = Blue Merle
      - Chocolate/Liver base = Red Merle
      - Blue base = Slate Merle
      - Lilac/Isabella base = Lilac Merle

   4. White spotting names expanded:
      - sp/sp = Piebald
      - sp/si = Irish Piebald
      - sp/sw = Heavy Piebald
      - si/si = Irish White
      - si/sw = High Irish White
      - sw/sw = Extreme White

   5. Coat trait wording cleaned up:
      - Long Coat Furnished Curly now becomes Long Curly Furnished Coat.

   6. Cocoa locus added as an optional parsed locus:
      - Co/Co and Co/co = no cocoa
      - co/co = Cocoa modifier
*/

/* =========================
   MAIN MODES
========================= */

function runDogPredictor(inputs) {
  const sire = parseDogGenotype(inputs.sireGenotype);
  const dam = parseDogGenotype(inputs.damGenotype);

  const rows = [
    dogOutcomeRow("Extension", sire.Extension, dam.Extension),
    dogOutcomeRow("Agouti", sire.Agouti, dam.Agouti),
    dogOutcomeRow("K", sire.K, dam.K),
    dogOutcomeRow("Brown", sire.Brown, dam.Brown),
    dogOutcomeRow("Cocoa", sire.Cocoa, dam.Cocoa),
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
    dogOutcomeRow("Curl", sire.Curl, dam.Curl),
    dogOutcomeRow("Hairless", sire.Hairless, dam.Hairless)
  ].join("");

  return renderDogResults(
    "Dog Predictor",
    `
      <p><b>Sire:</b> ${escapeDogHtml(inputs.sireGenotype)}</p>
      <p><b>Dam:</b> ${escapeDogHtml(inputs.damGenotype)}</p>

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
      <p><b>Phenotype:</b> ${escapeDogHtml(phenotype)}</p>
      <p><b>Genotype:</b> ${escapeDogHtml(genotypeText)}</p>
    `
  );
}

/* =========================
   DOG GENOTYPE BUILDER
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

  const wantsMask = phenotype.includes("mask") || phenotype.includes("masked");
  const wantsBrownBase = phenotype.includes("chocolate") || phenotype.includes("liver") || phenotype.includes("brown");
  const wantsCocoa = phenotype.includes("cocoa");
  const wantsTanPoint = phenotype.includes("tan") || phenotype.includes("tri") || phenotype.includes("tricolor") || phenotype.includes("tricolour");

  const wantsBlueMerle = phenotype.includes("blue merle");
  const wantsRedMerle = phenotype.includes("red merle") || phenotype.includes("liver merle") || phenotype.includes("chocolate merle");
  const wantsSlateMerle = phenotype.includes("slate merle") || phenotype.includes("slated merle") || cleanPhenotype === "slate";
  const wantsLilacMerle = phenotype.includes("lilac merle") || phenotype.includes("isabella merle");
  const wantsGenericMerle = phenotype.includes("merle") && !wantsBlueMerle && !wantsRedMerle && !wantsSlateMerle && !wantsLilacMerle;

  const wantsBlueBase = phenotype.includes("blue") && !wantsBlueMerle && !wantsSlateMerle && !phenotype.includes("blue fawn");
  const wantsLilac = phenotype.includes("lilac") || phenotype.includes("isabella");

  const wantsWhiteSpotting =
    phenotype.includes("and white") ||
    phenotype.includes("with white") ||
    phenotype.includes("white markings") ||
    phenotype.includes("irish") ||
    phenotype.includes("piebald") ||
    phenotype.includes("extreme white") ||
    phenotype.includes("tricolour") ||
    phenotype.includes("tricolor");

  const wantsIrish = phenotype.includes("irish");
  const wantsHeavyPiebald = phenotype.includes("heavy piebald");
  const wantsPiebald = phenotype.includes("piebald");
  const wantsExtremeWhite = phenotype.includes("extreme white");
  const wantsHighIrish = phenotype.includes("high irish");
  const wantsTicking = phenotype.includes("ticked") || phenotype.includes("ticking");
  const wantsRoan = phenotype.includes("roan");
  const wantsHarlequin = phenotype.includes("harlequin");
  const wantsBrindle = phenotype.includes("brindle");
  const wantsFaded = phenotype.includes("faded") || phenotype.includes("grey") || phenotype.includes("gray");

  const wantsLongCoat = phenotype.includes("long coat") || phenotype.includes("longcoat") || phenotype.includes("long coated");
  const wantsFurnished = phenotype.includes("furnished") || phenotype.includes("furnishings");
  const wantsCurly = phenotype.includes("curly") || phenotype.includes("curl");
  const wantsHairless = phenotype.includes("hairless") || phenotype.includes("chinese crested") || phenotype.includes("xolo") || phenotype.includes("peruvian inca orchid");

  const wantsSilverSable = phenotype.includes("silver sable");
  const wantsCockerSable = phenotype.includes("cocker sable") || phenotype.includes("cocker spaniel sable");
  const wantsSable = phenotype.includes("sable") && !wantsSilverSable && !wantsCockerSable && !phenotype.includes("wolf sable");

  const wantsSilver = cleanPhenotype === "silver" || phenotype.includes("silver red");
  const wantsBlackAndTan = phenotype.includes("black & tan") || phenotype.includes("black and tan") || phenotype.includes("tan point");
  const wantsSilverBlackAndTan = phenotype.includes("silver black & tan") || phenotype.includes("silver black and tan");
  const wantsCreamPoint = phenotype.includes("cream point");
  const wantsNorthernDomino = phenotype.includes("northern domino");
  const wantsDomino = (cleanPhenotype === "domino" || phenotype.includes("sighthound domino") || phenotype.includes("domino")) && !wantsNorthernDomino;
  const isPlainGeneticWhite = cleanPhenotype === "white" || cleanPhenotype === "genetic white" || cleanPhenotype === "recessive white" || cleanPhenotype === "cream white";

  function buildExample(parts) {
    const geneParts = [];

    geneParts.push(parts.Extension || "E/E");
    geneParts.push(parts.K || "K/ky");

    if (parts.Agouti) geneParts.push(parts.Agouti);
    if (parts.Brown) geneParts.push(parts.Brown);
    if (parts.Cocoa) geneParts.push(parts.Cocoa);
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
    if (parts.Hairless) geneParts.push(parts.Hairless);

    return geneParts.join(" ");
  }

  function extensionBase(defaultExtension) {
    if (wantsMask) return "Em/e";
    return defaultExtension || "E/E";
  }

  function whiteSpottingGene() {
    if (wantsExtremeWhite) return "sw/sw";
    if (wantsHeavyPiebald) return "sp/sw";
    if (wantsPiebald && wantsIrish) return "sp/si";
    if (wantsPiebald) return "sp/sp";
    if (wantsHighIrish) return "si/sw";
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
    if (wantsHairless) copy.Hairless = "Hr/hr";

    return copy;
  }

  function addBuiltExample(parts) {
    addExample(buildExample(addPatternGenes(parts)));
  }

  function addGeneralPatternSuggestions() {
    if (wantsWhiteSpotting) {
      if (wantsExtremeWhite) addSuggestion("White Spotting: sw/sw");
      else if (wantsHeavyPiebald) addSuggestion("White Spotting: sp/sw");
      else if (wantsPiebald && wantsIrish) addSuggestion("White Spotting: sp/si");
      else if (wantsPiebald) addSuggestion("White Spotting: sp/sp, sp/si, or sp/sw depending on amount of white");
      else if (wantsHighIrish) addSuggestion("White Spotting: si/sw");
      else if (wantsIrish) addSuggestion("White Spotting: si/si or si/sw");
      else addSuggestion("White Spotting: si/si, sp/sp, or sw/sw depending on amount of white");
    }

    if (wantsTicking) addSuggestion("Ticking: T/-");
    if (wantsRoan) addSuggestion("Roan: R/-");
    if (wantsFaded) addSuggestion("Greying/Fading: G/-");
    if (wantsLongCoat) addSuggestion("Long Coat: l/l");
    if (wantsFurnished) addSuggestion("Furnishings: F/-");
    if (wantsCurly) addSuggestion("Curl: Cu/-");
    if (wantsHairless) addSuggestion("Hairless: Hr/hr. Hr/Hr is non-viable; hr/hr is coated/powderpuff.");
  }

  if (isPlainGeneticWhite) {
    addSuggestion("Extension: e/e");
    addSuggestion("White Spotting: sw/sw if the white is spotting-based");
    addSuggestion("Intensity: i/i if the white is pale recessive red");
    addExample("e/e i/i");
    addExample("e/e sw/sw i/i");
    addHidden("Agouti, K, Brown, Cocoa, Dilute, Merle, Domino, and Mask can be hidden by e/e.");
  }

  if (!isPlainGeneticWhite && phenotype.includes("cream")) {
    addSuggestion("Extension: e/e for recessive cream OR tan-point/sable base with reduced intensity");
    addSuggestion("Intensity: I/i");
    addBuiltExample({ Extension: "e/e", K: "K/ky", Intensity: "I/i" });
    addHidden("Agouti, K, Brown, Cocoa, and Dilute can be hidden by e/e.");
  }

  if (!isPlainGeneticWhite && wantsSilver) {
    addSuggestion("Extension: e/e");
    addSuggestion("Intensity: i/i");
    addBuiltExample({ Extension: "e/e", K: "K/ky", Intensity: "i/i" });
    addHidden("Agouti, K, Brown, Cocoa, and Dilute can be hidden by e/e.");
  }

  if (!isPlainGeneticWhite && phenotype.includes("red") && !wantsSilver && !wantsRedMerle) {
    addSuggestion("Extension: e/e");
    addSuggestion("Intensity: I/I");
    addBuiltExample({ Extension: "e/e", K: "K/ky", Intensity: "I/I" });
    addBuiltExample({ Extension: "e/e", K: "ky/ky", Brown: "B/b", Dilute: "D/d", Intensity: "I/I" });
    addHidden("Agouti, K, Brown, Cocoa, Dilute, Merle, Domino, and Mask can be hidden by e/e.");
  }

  if (wantsBlueMerle) {
    addSuggestion("Base: black pigment");
    addSuggestion("Merle: M/m");
    addSuggestion("Dilute: not d/d — use D/D or D/d");
    addBuiltExample({ Extension: extensionBase("E/E"), K: "K/ky", Agouti: wantsTanPoint ? "at/a" : "a/a", Brown: "B/B", Dilute: "D/D", Merle: "M/m" });
    addBuiltExample({ Extension: extensionBase("E/e"), K: wantsTanPoint ? "ky/ky" : "K/K", Agouti: wantsTanPoint ? "at/at" : "a/a", Brown: "B/b", Dilute: "D/d", Merle: "M/m" });
  }

  if (wantsRedMerle) {
    addSuggestion("Base: chocolate/liver pigment");
    addSuggestion("Brown/Liver/Chocolate: b/b");
    addSuggestion("Merle: M/m");
    addSuggestion("Dilute: not d/d");
    addBuiltExample({ Extension: extensionBase("E/E"), K: "K/ky", Agouti: wantsTanPoint ? "at/a" : "a/a", Brown: "b/b", Dilute: "D/D", Merle: "M/m" });
    addBuiltExample({ Extension: extensionBase("E/e"), K: wantsTanPoint ? "ky/ky" : "K/K", Agouti: wantsTanPoint ? "at/at" : "a/a", Brown: "b/b", Dilute: "D/d", Merle: "M/m" });
  }

  if (wantsSlateMerle) {
    addSuggestion("Base: blue pigment");
    addSuggestion("Dilute: d/d");
    addSuggestion("Merle: M/m");
    addBuiltExample({ Extension: extensionBase("E/E"), K: "K/ky", Agouti: wantsTanPoint ? "at/a" : "a/a", Brown: "B/B", Dilute: "d/d", Merle: "M/m" });
    addBuiltExample({ Extension: extensionBase("E/e"), K: wantsTanPoint ? "ky/ky" : "K/K", Agouti: wantsTanPoint ? "at/at" : "a/a", Brown: "B/b", Dilute: "d/d", Merle: "M/m" });
  }

  if (wantsLilacMerle) {
    addSuggestion("Base: lilac/isabella pigment");
    addSuggestion("Brown/Liver/Chocolate: b/b");
    addSuggestion("Dilute: d/d");
    addSuggestion("Merle: M/m");
    addBuiltExample({ Extension: extensionBase("E/E"), K: "K/ky", Agouti: wantsTanPoint ? "at/a" : "a/a", Brown: "b/b", Dilute: "d/d", Merle: "M/m" });
    addBuiltExample({ Extension: extensionBase("E/e"), K: wantsTanPoint ? "ky/ky" : "K/K", Agouti: wantsTanPoint ? "at/at" : "a/a", Brown: "b/b", Dilute: "d/d", Merle: "M/m" });
  }

  if (wantsGenericMerle) {
    addSuggestion("Merle: M/m");
    addBuiltExample({ Extension: extensionBase("E/E"), K: "K/ky", Agouti: "a/a", Merle: phenotype.includes("double") ? "M/M" : "M/m" });
  }

  if (wantsHarlequin) {
    addSuggestion("Merle: M/m");
    addSuggestion("Harlequin: H/h");
    addBuiltExample({ Extension: extensionBase("E/E"), K: "K/ky", Agouti: "a/a", Merle: "M/m", Harlequin: "H/h" });
  }

  if (wantsNorthernDomino) {
    addSuggestion("Extension: Ea/e or Ea/Ea");
    addSuggestion("Agouti: at/at, at/a, or aw/-");
    addSuggestion("K locus: ky/ky");
    addBuiltExample({ Extension: "Ea/e", K: "ky/ky", Agouti: "at/a", Intensity: "I/I" });
    addBuiltExample({ Extension: "Ea/Ea", K: "ky/ky", Agouti: "aw/a", Intensity: "I/I" });
  }

  if (wantsCockerSable) {
    addSuggestion("Extension: Eh/e or Eh/Eh");
    addSuggestion("Cocker Spaniel Sable: Eh");
    addSuggestion("K locus: ky/ky");
    addBuiltExample({ Extension: "Eh/e", K: "ky/ky", Agouti: "at/a", Intensity: "I/I" });
    addBuiltExample({ Extension: "Eh/Eh", K: "ky/ky", Agouti: "Ay/a", Intensity: "I/I" });
  }

  if (wantsDomino) {
    addSuggestion("Extension: Eg/e or Eg/Eg");
    addSuggestion("K locus: ky/ky");

    if (wantsBlackAndTan || wantsTanPoint) {
      addSuggestion("Agouti: at/at or at/a");
      addBuiltExample({ Extension: "Eg/e", K: "ky/ky", Agouti: "at/a", Intensity: "I/I" });
      addBuiltExample({ Extension: "Eg/Eg", K: "ky/ky", Agouti: "at/at", Intensity: "I/I" });
    } else {
      addSuggestion("Agouti: at/at, at/a, or aw/-");
      addBuiltExample({ Extension: "Eg/e", K: "ky/ky", Agouti: "at/a", Intensity: "I/I" });
      addBuiltExample({ Extension: "Eg/Eg", K: "ky/ky", Agouti: "aw/a", Intensity: "I/I" });
    }
  }

  if (phenotype.includes("black") && !phenotype.includes("silver black") && !wantsBlueMerle && !wantsRedMerle && !wantsSlateMerle && !wantsLilacMerle && !wantsGenericMerle && !wantsDomino && !wantsNorthernDomino && !wantsCockerSable) {
    addSuggestion("Extension: E/-");
    addSuggestion("Black: K/- OR ky/ky with a/a");
    addBuiltExample({ Extension: extensionBase("E/E"), K: "K/ky", Agouti: "a/a" });
    addBuiltExample({ Extension: extensionBase("E/e"), K: "ky/ky", Agouti: "a/a" });
    addHidden("Brown, Cocoa, and Dilute can be carried.");
  }

  if (wantsBrownBase && !wantsRedMerle && !wantsLilacMerle) {
    addSuggestion("Extension: E/-");
    addSuggestion("Brown/Liver/Chocolate: b/b");
    addBuiltExample({ Extension: extensionBase("E/E"), K: wantsTanPoint ? "ky/ky" : "K/ky", Agouti: wantsTanPoint ? "at/a" : "a/a", Brown: "b/b" });
    addBuiltExample({ Extension: extensionBase("E/e"), K: "ky/ky", Agouti: wantsTanPoint ? "at/at" : "a/a", Brown: "b/b" });
    addHidden("Dilute can be carried: D/d");
  }

  if (wantsCocoa) {
    addSuggestion("Cocoa: co/co");
    addBuiltExample({ Extension: extensionBase("E/E"), K: "K/ky", Agouti: "a/a", Cocoa: "co/co" });
  }

  if (wantsBlueBase && !wantsSlateMerle && !wantsBlueMerle) {
    addSuggestion("Dilute: d/d");
    addBuiltExample({ Extension: extensionBase("E/E"), K: "K/ky", Agouti: "a/a", Dilute: "d/d" });
    addBuiltExample({ Extension: extensionBase("E/e"), K: "ky/ky", Agouti: "a/a", Dilute: "d/d" });
  }

  if (wantsLilac && !wantsLilacMerle) {
    addSuggestion("Brown/Liver/Chocolate: b/b");
    addSuggestion("Dilute: d/d");
    addBuiltExample({ Extension: extensionBase("E/E"), K: "K/ky", Agouti: "a/a", Brown: "b/b", Dilute: "d/d" });
    addBuiltExample({ Extension: extensionBase("E/e"), K: "ky/ky", Agouti: "a/a", Brown: "b/b", Dilute: "d/d" });
  }

  if (wantsSilverSable) {
    addSuggestion("Agouti: Ay/-");
    addSuggestion("K locus: ky/ky or kbr/ky");
    addSuggestion("Intensity: i/i");
    addBuiltExample({ Extension: extensionBase("E/E"), K: "ky/ky", Agouti: "Ay/a", Intensity: "i/i" });
  }

  if (wantsSable) {
    addSuggestion("Agouti: Ay/-");
    addSuggestion("K locus: ky/ky or kbr/ky");
    addSuggestion("Intensity: I/I");
    addBuiltExample({ Extension: extensionBase("E/E"), K: "ky/ky", Agouti: "Ay/a", Intensity: "I/I" });
    addBuiltExample({ Extension: extensionBase("E/e"), K: "ky/ky", Agouti: "Ay/at", Intensity: "I/I" });
  }

  if (phenotype.includes("blue fawn")) {
    addSuggestion("Agouti: Ay/-");
    addSuggestion("Dilute: d/d");
    addSuggestion("Intensity: I/i");
    addBuiltExample({ Extension: extensionBase("E/E"), K: "ky/ky", Agouti: "Ay/a", Dilute: "d/d", Intensity: "I/i" });
  } else if (phenotype.includes("fawn")) {
    addSuggestion("Agouti: Ay/-");
    addSuggestion("K locus: ky/ky or kbr/ky");
    addSuggestion("Intensity: I/i");
    addBuiltExample({ Extension: extensionBase("E/E"), K: "ky/ky", Agouti: "Ay/a", Intensity: "I/i" });
  }

  if ((wantsBlackAndTan || wantsSilverBlackAndTan || wantsCreamPoint) && !wantsBlueMerle && !wantsRedMerle && !wantsSlateMerle && !wantsLilacMerle && !wantsDomino && !wantsNorthernDomino && !wantsCockerSable) {
    addSuggestion("Agouti: at/at or at/a");
    addSuggestion("K locus: ky/ky or kbr/ky");
    addSuggestion(wantsSilverBlackAndTan ? "Intensity: i/i" : wantsCreamPoint ? "Intensity: I/i" : "Intensity: I/I");
    addBuiltExample({ Extension: extensionBase("E/E"), K: "ky/ky", Agouti: "at/a", Intensity: wantsSilverBlackAndTan ? "i/i" : wantsCreamPoint ? "I/i" : "I/I" });
  }

  if (wantsTanPoint && !wantsBrownBase && !wantsBlueMerle && !wantsRedMerle && !wantsSlateMerle && !wantsLilacMerle && !wantsDomino && !wantsNorthernDomino && !wantsCockerSable) {
    addSuggestion("Agouti: at/at or at/a");
    addSuggestion("K locus: ky/ky or kbr/ky");
    addBuiltExample({ Extension: extensionBase("E/E"), K: "ky/ky", Agouti: "at/a", Intensity: "I/I" });
  }

  if (phenotype.includes("saddle")) {
    addSuggestion("Agouti: asa/asa or asa/a");
    addBuiltExample({ Extension: extensionBase("E/E"), K: "ky/ky", Agouti: "asa/a" });
  }

  if (phenotype.includes("wolf sable")) {
    addSuggestion("Agouti: aw/-");
    addBuiltExample({ Extension: extensionBase("E/E"), K: "ky/ky", Agouti: "aw/a" });
  }

  if (phenotype.includes("grizzle")) {
    addSuggestion("Extension: Eg/e or Eg/Eg");
    addSuggestion("Agouti: at/at or at/a");
    addBuiltExample({ Extension: "Eg/e", K: "ky/ky", Agouti: "at/at" });
  }

  if (wantsBrindle) {
    addSuggestion("K locus: kbr/kbr or kbr/ky");
    if (examples.length) {
      for (let i = 0; i < examples.length; i++) {
        examples[i] = examples[i].replace(/\bK\/ky\b|\bK\/K\b|\bky\/ky\b/g, "kbr/ky");
      }
    } else {
      addBuiltExample({ Extension: extensionBase("E/E"), K: "kbr/ky", Agouti: "Ay/a" });
    }
  }

  if (wantsMask) {
    addSuggestion("Extension: Em/e or Em/Em");
    addHidden("Mask is part of the Extension locus and should replace E, not be added as a separate gene.");
  }


  if (wantsHairless) {
    addSuggestion("Hairless: Hr/hr");
    addHidden("Hairless breeds can produce coated/powderpuff offspring when hr/hr is inherited.");
    if (!examples.some(example => example.includes("Hr/hr"))) {
      addBuiltExample({ Extension: extensionBase("E/E"), K: "K/ky", Agouti: "a/a", Hairless: "Hr/hr" });
    }
  }

  addGeneralPatternSuggestions();

  if (suggestions.length === 0) suggestions.push("No simple genotype match found yet.");

  const shadeNotes = getDogShadeNotes(phenotypeRaw);

  return renderDogResults(
    "Dog Genotype Builder",
    `
      <p><b>Phenotype:</b> ${escapeDogHtml(inputs.phenotype)}</p>

      <p><b>Likely Required Genes:</b></p>
      <ul>${suggestions.map(item => `<li>${escapeDogHtml(item)}</li>`).join("")}</ul>

      <p><b>Possible Example Genotypes:</b></p>
      <ul>${examples.length ? examples.map(item => `<li>${escapeDogHtml(item)}</li>`).join("") : "<li>No example genotypes generated yet.</li>"}</ul>

      <p><b>Possible Hidden Traits:</b></p>
      <ul>${hidden.length ? hidden.map(item => `<li>${escapeDogHtml(item)}</li>`).join("") : "<li>No common hidden traits listed yet.</li>"}</ul>

      ${shadeNotes}

      <p><b>Note:</b> These are possible genotype examples, not the only valid combinations.</p>
    `
  );
}



/* =========================
   AUTO ANIMAL GENOTYPE MODE
   Returns one clean genotype string for Add Animal.
   This does not affect the Genetics Lab report modes.
========================= */

function buildAutoDogGenotype(phenotypeInput) {
  const phenotype = String(phenotypeInput || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[–—]/g, " ")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!phenotype) return "";

  function has(phrase) {
    return phenotype.includes(String(phrase || "").toLowerCase());
  }

  const wantsMask = has("mask") || has("masked");
  const wantsTanPoint = has("tan") || has("tricolor") || has("tricolour") || has("tri colour") || has("tri color");
  const wantsBlackAndTan = has("black and tan") || has("black tan") || has("tan point");
  const wantsChocolate = has("chocolate") || has("liver") || has("brown");
  const wantsCocoa = has("cocoa");
  const wantsBlueMerle = has("blue merle") || has("blue tricolor merle") || has("blue tricolour merle");
  const wantsRedMerle = has("red merle") || has("liver merle") || has("chocolate merle") || has("red tricolor merle") || has("red tricolour merle");
  const wantsSlateMerle = has("slate merle") || has("slated merle");
  const wantsLilacMerle = has("lilac merle") || has("isabella merle");
  const wantsGenericMerle = has("merle") && !wantsBlueMerle && !wantsRedMerle && !wantsSlateMerle && !wantsLilacMerle;
  const wantsHarlequin = has("harlequin");
  const wantsBlue = has("blue") && !wantsBlueMerle && !wantsSlateMerle && !has("blue fawn") && !has("blue sable") && !has("blue roan") && !has("blue belton");
  const wantsLilac = has("lilac") || has("isabella");
  const wantsCream = has("cream") || has("yellow");
  const wantsSilver = has("silver") && !has("silver sable") && !has("silver black and tan") && !has("silver black tan");
  const wantsRed = has("red") || has("gold") || has("golden");
  const wantsSable = has("sable") && !has("wolf sable") && !has("silver sable") && !has("cocker sable");
  const wantsWolfSable = has("wolf sable");
  const wantsFawn = has("fawn");
  const wantsBlueFawn = has("blue fawn");
  const wantsBrindle = has("brindle");
  const wantsDomino = has("domino") && !has("northern domino");
  const wantsNorthernDomino = has("northern domino");
  const wantsCockerSable = has("cocker sable") || has("cocker spaniel sable");
  const wantsWhite = has("genetic white") || has("recessive white") || phenotype === "white";
  const wantsHairless = has("hairless") || has("chinese crested") || has("xolo") || has("peruvian inca orchid");

  const genes = [];

  function setGene(locus, value) {
    const prefixes = {
      Extension: /^(Em|Eg|Eh|Ea|E|e)\//,
      K: /^(K|kbr|ky)\//,
      Agouti: /^(Ay|aw|at|asa|a)\//,
      Brown: /^(B|b)\//,
      Cocoa: /^(Co|co)\//,
      Dilute: /^(D|d)\//,
      Merle: /^(M|m)\//,
      WhiteSpotting: /^(S|sp|si|sw)\//,
      Ticking: /^(T|t)\//,
      Roan: /^(R|r)\//,
      Harlequin: /^(H\/H|H\/h|h\/H|h\/h)$/,
      Intensity: /^(I|i)\//,
      Greying: /^(G|g)\//,
      LongCoat: /^(L|l)\//,
      Furnishings: /^(F|n)\//,
      Curl: /^(Cu|n)\//,
      Hairless: /^(Hr|hr)\//
    };

    const re = prefixes[locus];
    if (!re || !value) return;

    for (let i = genes.length - 1; i >= 0; i--) {
      if (re.test(genes[i])) genes.splice(i, 1);
    }

    genes.push(value);
  }

  function addGene(locus, value) {
    if (!value) return;
    setGene(locus, value);
  }

  // Base colour first, using the same naming assumptions as the visible engine.
  if (wantsWhite) {
    addGene("Extension", "e/e");
    addGene("K", "K/ky");
    addGene("WhiteSpotting", "sw/sw");
    addGene("Intensity", "i/i");
  } else if (wantsBlueMerle) {
    addGene("Extension", wantsMask ? "Em/e" : "E/E");
    addGene("K", wantsTanPoint ? "ky/ky" : "K/ky");
    addGene("Agouti", wantsTanPoint ? "at/a" : "a/a");
    addGene("Brown", "B/B");
    addGene("Dilute", "D/D");
    addGene("Merle", "M/m");
  } else if (wantsRedMerle) {
    addGene("Extension", wantsMask ? "Em/e" : "E/E");
    addGene("K", wantsTanPoint ? "ky/ky" : "K/ky");
    addGene("Agouti", wantsTanPoint ? "at/a" : "a/a");
    addGene("Brown", "b/b");
    addGene("Dilute", "D/D");
    addGene("Merle", "M/m");
  } else if (wantsSlateMerle) {
    addGene("Extension", wantsMask ? "Em/e" : "E/E");
    addGene("K", wantsTanPoint ? "ky/ky" : "K/ky");
    addGene("Agouti", wantsTanPoint ? "at/a" : "a/a");
    addGene("Brown", "B/B");
    addGene("Dilute", "d/d");
    addGene("Merle", "M/m");
  } else if (wantsLilacMerle) {
    addGene("Extension", wantsMask ? "Em/e" : "E/E");
    addGene("K", wantsTanPoint ? "ky/ky" : "K/ky");
    addGene("Agouti", wantsTanPoint ? "at/a" : "a/a");
    addGene("Brown", "b/b");
    addGene("Dilute", "d/d");
    addGene("Merle", "M/m");
  } else if (wantsGenericMerle) {
    addGene("Extension", wantsMask ? "Em/e" : "E/E");
    addGene("K", wantsTanPoint ? "ky/ky" : "K/ky");
    addGene("Agouti", wantsTanPoint ? "at/a" : "a/a");
    addGene("Brown", wantsChocolate ? "b/b" : "B/B");
    addGene("Dilute", wantsBlue || wantsLilac ? "d/d" : "D/D");
    addGene("Merle", has("double") ? "M/M" : "M/m");
  } else if (wantsCream || wantsSilver || (wantsRed && !wantsChocolate)) {
    addGene("Extension", "e/e");
    addGene("K", "K/ky");
    addGene("Brown", wantsChocolate ? "b/b" : "B/B");
    addGene("Dilute", wantsLilac ? "d/d" : "D/D");
    addGene("Intensity", wantsSilver ? "i/i" : wantsCream ? "I/i" : "I/I");
  } else if (wantsDomino) {
    addGene("Extension", "Eg/e");
    addGene("K", "ky/ky");
    addGene("Agouti", wantsTanPoint || wantsBlackAndTan ? "at/a" : "aw/a");
    addGene("Intensity", "I/I");
  } else if (wantsNorthernDomino) {
    addGene("Extension", "Ea/e");
    addGene("K", "ky/ky");
    addGene("Agouti", wantsTanPoint || wantsBlackAndTan ? "at/a" : "aw/a");
    addGene("Intensity", "I/I");
  } else if (wantsCockerSable) {
    addGene("Extension", "Eh/e");
    addGene("K", "ky/ky");
    addGene("Agouti", wantsTanPoint ? "at/a" : "Ay/a");
    addGene("Intensity", "I/I");
  } else if (wantsBlueFawn) {
    addGene("Extension", wantsMask ? "Em/e" : "E/E");
    addGene("K", "ky/ky");
    addGene("Agouti", "Ay/a");
    addGene("Dilute", "d/d");
    addGene("Intensity", "I/i");
  } else if (wantsSable || wantsFawn) {
    addGene("Extension", wantsMask ? "Em/e" : "E/E");
    addGene("K", wantsBrindle ? "kbr/ky" : "ky/ky");
    addGene("Agouti", "Ay/a");
    addGene("Intensity", wantsFawn ? "I/i" : "I/I");
  } else if (wantsWolfSable) {
    addGene("Extension", wantsMask ? "Em/e" : "E/E");
    addGene("K", wantsBrindle ? "kbr/ky" : "ky/ky");
    addGene("Agouti", "aw/a");
  } else if (wantsTanPoint || wantsBlackAndTan) {
    addGene("Extension", wantsMask ? "Em/e" : "E/E");
    addGene("K", wantsBrindle ? "kbr/ky" : "ky/ky");
    addGene("Agouti", "at/a");
    addGene("Brown", wantsChocolate ? "b/b" : "B/B");
    addGene("Dilute", wantsBlue || wantsLilac ? "d/d" : "D/D");
  } else if (wantsChocolate) {
    addGene("Extension", wantsMask ? "Em/e" : "E/E");
    addGene("K", "K/ky");
    addGene("Agouti", "a/a");
    addGene("Brown", "b/b");
    addGene("Dilute", "D/D");
  } else if (wantsCocoa) {
    addGene("Extension", wantsMask ? "Em/e" : "E/E");
    addGene("K", "K/ky");
    addGene("Agouti", "a/a");
    addGene("Cocoa", "co/co");
  } else if (wantsLilac) {
    addGene("Extension", wantsMask ? "Em/e" : "E/E");
    addGene("K", "K/ky");
    addGene("Agouti", "a/a");
    addGene("Brown", "b/b");
    addGene("Dilute", "d/d");
  } else if (wantsBlue) {
    addGene("Extension", wantsMask ? "Em/e" : "E/E");
    addGene("K", "K/ky");
    addGene("Agouti", "a/a");
    addGene("Brown", "B/B");
    addGene("Dilute", "d/d");
  } else {
    addGene("Extension", wantsMask ? "Em/e" : "E/E");
    addGene("K", "K/ky");
    addGene("Agouti", "a/a");
    addGene("Brown", "B/B");
    addGene("Dilute", "D/D");
  }

  // Pattern / modifier overlays.
  if (wantsBrindle && !genes.some(g => /^K\//.test(g) || /^kbr\//.test(g) || /^ky\//.test(g))) {
    addGene("K", "kbr/ky");
  } else if (wantsBrindle) {
    addGene("K", "kbr/ky");
  }

  if (wantsHarlequin) {
    addGene("Merle", "M/m");
    addGene("Harlequin", "H/h");
  }

  if (has("piebald")) addGene("WhiteSpotting", has("heavy") ? "sp/sw" : "sp/sp");
  else if (has("extreme white")) addGene("WhiteSpotting", "sw/sw");
  else if (has("high irish")) addGene("WhiteSpotting", "si/sw");
  else if (has("irish")) addGene("WhiteSpotting", "si/si");
  else if (has("with white") || has("and white") || has("white markings") || has("tricolor") || has("tricolour")) addGene("WhiteSpotting", "si/si");

  if (has("ticked") || has("ticking") || has("belton")) addGene("Ticking", "T/t");
  if (has("roan") || has("belton")) addGene("Roan", "R/r");
  if (has("faded") || has("grey") || has("gray")) addGene("Greying", "G/g");
  if (has("long coat") || has("longcoat") || has("long coated")) addGene("LongCoat", "l/l");
  if (has("furnished") || has("furnishings")) addGene("Furnishings", "F/n");
  if (has("curly") || has("curl")) addGene("Curl", "Cu/n");
  if (wantsHairless) addGene("Hairless", "Hr/hr");

  return cleanAutoDogGenotype(genes.join(" "));
}

function cleanAutoDogGenotype(genotype) {
  const order = [
    /^(Em|Eg|Eh|Ea|E|e)\//,
    /^(Ay|aw|at|asa|a)\//,
    /^(K|kbr|ky)\//,
    /^(B|b)\//,
    /^(Co|co)\//,
    /^(D|d)\//,
    /^(M|m)\//,
    /^(S|sp|si|sw)\//,
    /^(T|t)\//,
    /^(R|r)\//,
    /^(Hr|hr)\//,
    /^(Hr|hr)\//,
    /^(H|h)\//,
    /^(I|i)\//,
    /^(G|g)\//,
    /^(L|l)\//,
    /^(F|n)\//,
    /^(Cu|n)\//
  ];

  const tokens = String(genotype || "").split(/\s+/).filter(Boolean);
  const kept = [];

  for (const re of order) {
    const found = tokens.find(token => re.test(token));
    if (found && !kept.includes(found)) kept.push(found);
  }

  return kept.join(" ");
}

/* =========================
   SHADE / BREED NAME NOTES
========================= */

function getDogShadeNotes(phenotypeText) {
  const raw = String(phenotypeText || "").trim();
  const text = raw.toLowerCase();
  const notes = [];

  function addNote(displayName, geneticColour) {
    notes.push({ displayName, geneticColour });
  }

  const shadeMap = [
    { terms: ["mahogany red", "deep red", "dark red", "orange", "orange red"], display: "red shade", genetic: "Red" },
    { terms: ["pale cream", "white cream", "ivory cream", "light cream"], display: "cream shade", genetic: "Cream" },
    { terms: ["golden sable", "mahogany sable", "shaded sable", "clear sable", "red sable", "cream sable", "pale cream sable"], display: "sable shade", genetic: "Sable/Fawn family" },
    { terms: ["silver wolf sable", "grey wolf sable", "gray wolf sable"], display: "wolf sable shade", genetic: "Wolf Sable" },
    { terms: ["jet black", "raven black", "true black"], display: "black shade", genetic: "Black" },
    { terms: ["dark blue", "steel blue", "slate blue"], display: "blue shade", genetic: "Blue" },
    { terms: ["liver", "brown", "dark liver", "dark chocolate"], display: "chocolate/liver shade", genetic: "Chocolate" },
    { terms: ["isabella", "isabel", "lavender"], display: "lilac/isabella shade", genetic: "Lilac" },
    { terms: ["orange belton"], display: "Orange Belton", genetic: "Red Roan/Ticked pattern" },
    { terms: ["blue belton"], display: "Blue Belton", genetic: "Blue Roan/Ticked pattern" },
    { terms: ["lemon belton"], display: "Lemon Belton", genetic: "Cream Roan/Ticked pattern" },
    { terms: ["red sesame"], display: "Red Sesame", genetic: "Sable/Wolf Sable family" },
    { terms: ["black sesame"], display: "Black Sesame", genetic: "Wolf Sable family" }
  ];

  for (const item of shadeMap) {
    if (item.terms.some(term => text.includes(term))) {
      addNote(item.display, item.genetic);
    }
  }

  if (!notes.length) return "";

  const rows = notes
    .map(note => `<tr><td>${escapeDogHtml(note.displayName)}</td><td>${escapeDogHtml(note.geneticColour)}</td></tr>`)
    .join("");

  return `
    <div class="dog-shade-notice">
      <p><b>Colour Shade Notice:</b> Shade descriptions and breed-specific colour names are accepted for profile customization. These terms describe appearance, but they are not treated as separate genes unless they are tied to an existing modifier in the genetics engine.</p>
      <table class="breed-table">
        <tr>
          <th>Entered Name / Descriptor</th>
          <th>Genetic Colour Family</th>
        </tr>
        ${rows}
      </table>
      <p>Dogs with identical genotypes may display different shades due to polygenic influences, age, coat condition, environmental effects, and breed-specific expression.</p>
    </div>
  `;
}

function renderDogGeneralShadeNotice() {
  return `
    <div class="dog-shade-notice">
      <p><b>Colour Shade Notice:</b> Shade descriptions such as Mahogany Red, Golden Sable, Shaded Sable, Steel Blue, Dark Liver, Pale Cream, Isabella, and other breed-specific colour names are accepted for profile customization.</p>
      <p>These terms describe variations in appearance but are not currently treated as genetically distinct colours by the genetics engine unless they are tied to a listed modifier such as dilution, brown, merle, white spotting, ticking, roan, intensity, or greying.</p>
      <p>Dogs with identical genotypes may display different shades due to polygenic influences, environmental factors, age, coat condition, and breed-specific expression.</p>
    </div>
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

    Brown: findDogGenePair(text, ["B/B", "B/b", "b/B", "b/b"], "B/B"),
    Cocoa: findDogGenePair(text, ["Co/Co", "Co/co", "co/Co", "co/co"], "Co/Co"),
    Dilute: findDogGenePair(text, ["D/D", "D/d", "d/D", "d/d"], "D/D"),
    Merle: findDogGenePair(text, ["M/M", "M/m", "m/M", "m/m"], "m/m"),
    WhiteSpotting: findDogWhiteSpotting(text),
    Ticking: findDogGenePair(text, ["T/T", "T/t", "t/T", "t/t"], "t/t"),
    Roan: findDogGenePair(text, ["R/R", "R/r", "r/R", "r/r"], "r/r"),
    Harlequin: findDogGenePair(text, ["H/H", "H/h", "h/H", "h/h"], "h/h"),
    Intensity: findDogGenePair(text, ["I/I", "I/i", "i/I", "i/i"], "I/I"),
    Greying: findDogGenePair(text, ["G/G", "G/g", "g/G", "g/g"], "g/g"),
    LongCoat: findDogGenePair(text, ["L/L", "L/l", "l/L", "l/l"], "L/L"),
    Furnishings: findDogGenePair(text, ["F/F", "F/n", "n/F", "n/n"], "n/n"),
    Curl: findDogGenePair(text, ["Cu/Cu", "Cu/n", "n/Cu", "n/n"], "n/n"),
    Hairless: findDogGenePair(text, ["Hr/Hr", "Hr/hr", "hr/Hr", "hr/hr"], "hr/hr"),

    // These flags stop default fallback genes from displaying as if the user entered them.
    LongCoatProvided: hasDogExplicitGene(text, ["L/L", "L/l", "l/L", "l/l"]),
    HairlessProvided: hasDogExplicitGene(text, ["Hr/Hr", "Hr/hr", "hr/Hr", "hr/hr"])
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
  if (parsed.Hairless === "Hr/Hr") return "Non-Viable Hairless";
  if (isDogGeneticWhite(parsed)) return "Genetic White";

  let colour = getDogBaseColour(parsed);

  colour = applyDogDarkPigmentModifiers(colour, parsed);
  colour = applyDogExtensionModifiers(colour, parsed);
  colour = applyDogIntensity(colour, parsed);
  colour = applyDogMerleAndHarlequin(colour, parsed);
  colour = applyDogBrindleAndGreying(colour, parsed);
  colour = applyDogPatterns(colour, parsed);
  colour = applyDogCoatTraits(colour, parsed);
  colour = applyDogHairless(colour, parsed);

  return cleanupDogColourName(colour.trim());
}

function isDogGeneticWhite(parsed) {
  return parsed.Extension === "e/e" && parsed.WhiteSpotting === "sw/sw" && parsed.Intensity === "i/i";
}

function getDogBaseColour(parsed) {
  const visibleExtension = getDogVisibleExtension(parsed.Extension);

  if (visibleExtension === "e") return "Red";

  if (hasDominantDogK(parsed.K)) return "Black";

  if (parsed.Agouti === "Ay/Ay" || parsed.Agouti === "Ay/aw" || parsed.Agouti === "Ay/at" || parsed.Agouti === "Ay/asa" || parsed.Agouti === "Ay/a") {
    return "Sable";
  }

  if (parsed.Agouti === "aw/aw" || parsed.Agouti === "aw/at" || parsed.Agouti === "aw/asa" || parsed.Agouti === "aw/a") {
    return "Wolf Sable";
  }

  if (parsed.Agouti === "at/at" || parsed.Agouti === "at/asa" || parsed.Agouti === "at/a") {
    return "Black & Tan";
  }

  if (parsed.Agouti === "asa/asa" || parsed.Agouti === "asa/a") {
    return "Saddle Tan";
  }

  return "Black";
}

function applyDogDarkPigmentModifiers(colour, parsed) {
  const isBrown = parsed.Brown === "b/b";
  const isCocoa = parsed.Cocoa === "co/co";
  const isDilute = parsed.Dilute === "d/d";

  if (isBrown) {
    colour = replaceDogBasePrefix(colour, {
      "Black": "Chocolate",
      "Black & Tan": "Chocolate & Tan",
      "Sable": "Chocolate Sable",
      "Wolf Sable": "Chocolate Wolf Sable",
      "Saddle Tan": "Chocolate Saddle Tan"
    });
  } else if (isCocoa) {
    colour = replaceDogBasePrefix(colour, {
      "Black": "Cocoa",
      "Black & Tan": "Cocoa & Tan",
      "Sable": "Cocoa Sable",
      "Wolf Sable": "Cocoa Wolf Sable",
      "Saddle Tan": "Cocoa Saddle Tan"
    });
  }

  if (isDilute) {
    colour = replaceDogBasePrefix(colour, {
      "Black": "Blue",
      "Chocolate": "Lilac",
      "Cocoa": "Lilac Cocoa",
      "Black & Tan": "Blue & Tan",
      "Chocolate & Tan": "Lilac & Tan",
      "Cocoa & Tan": "Lilac Cocoa & Tan",
      "Sable": "Blue Sable",
      "Chocolate Sable": "Lilac Sable",
      "Cocoa Sable": "Lilac Cocoa Sable",
      "Wolf Sable": "Blue Wolf Sable",
      "Chocolate Wolf Sable": "Lilac Wolf Sable",
      "Cocoa Wolf Sable": "Lilac Cocoa Wolf Sable",
      "Saddle Tan": "Blue Saddle Tan",
      "Chocolate Saddle Tan": "Lilac Saddle Tan",
      "Cocoa Saddle Tan": "Lilac Cocoa Saddle Tan"
    });
  }

  return colour;
}

function applyDogExtensionModifiers(colour, parsed) {
  const visibleExtension = getDogVisibleExtension(parsed.Extension);

  if (visibleExtension === "Em" && !isDogClearRedName(colour)) {
    return colour + " Mask";
  }

  if (hasDominantDogK(parsed.K)) {
    return colour;
  }

  if (visibleExtension === "Eg" && dogCanShowDomino(parsed.Agouti)) {
    return colour + " Domino";
  }

  if (visibleExtension === "Ea" && dogCanShowDomino(parsed.Agouti)) {
    return colour + " Northern Domino";
  }

  if (visibleExtension === "Eh" && dogCanShowCockerSable(parsed.Agouti)) {
    return replaceDogBasePrefix(colour, {
      "Sable": "Cocker Sable",
      "Blue Sable": "Blue Cocker Sable",
      "Chocolate Sable": "Chocolate Cocker Sable",
      "Lilac Sable": "Lilac Cocker Sable",
      "Cocoa Sable": "Cocoa Cocker Sable",
      "Lilac Cocoa Sable": "Lilac Cocoa Cocker Sable",
      "Black & Tan": "Black & Tan Cocker Sable",
      "Chocolate & Tan": "Chocolate & Tan Cocker Sable",
      "Blue & Tan": "Blue & Tan Cocker Sable",
      "Lilac & Tan": "Lilac & Tan Cocker Sable",
      "Wolf Sable": "Wolf Cocker Sable",
      "Blue Wolf Sable": "Blue Wolf Cocker Sable",
      "Chocolate Wolf Sable": "Chocolate Wolf Cocker Sable",
      "Lilac Wolf Sable": "Lilac Wolf Cocker Sable"
    });
  }

  return colour;
}

function applyDogIntensity(colour, parsed) {
  if (parsed.Intensity === "I/i") {
    colour = replaceDogBasePrefix(colour, {
      "Red": "Cream",
      "Sable": "Fawn",
      "Blue Sable": "Blue Fawn",
      "Chocolate Sable": "Chocolate Fawn",
      "Lilac Sable": "Lilac Fawn",
      "Cocoa Sable": "Cocoa Fawn",
      "Lilac Cocoa Sable": "Lilac Cocoa Fawn",
      "Cocker Sable": "Cocker Fawn",
      "Blue Cocker Sable": "Blue Cocker Fawn",
      "Chocolate Cocker Sable": "Chocolate Cocker Fawn",
      "Lilac Cocker Sable": "Lilac Cocker Fawn",
      "Cocoa Cocker Sable": "Cocoa Cocker Fawn",
      "Lilac Cocoa Cocker Sable": "Lilac Cocoa Cocker Fawn",
      "Wolf Sable": "Pale Wolf Sable",
      "Blue Wolf Sable": "Pale Blue Wolf Sable",
      "Chocolate Wolf Sable": "Pale Chocolate Wolf Sable",
      "Lilac Wolf Sable": "Pale Lilac Wolf Sable",
      "Black & Tan": "Cream Point",
      "Chocolate & Tan": "Chocolate Cream",
      "Blue & Tan": "Blue Cream",
      "Lilac & Tan": "Lilac Cream",
      "Cocoa & Tan": "Cocoa Cream",
      "Lilac Cocoa & Tan": "Lilac Cocoa Cream"
    });
  }

  if (parsed.Intensity === "i/i") {
    colour = replaceDogBasePrefix(colour, {
      "Red": "Silver",
      "Sable": "Silver Sable",
      "Blue Sable": "Silver Blue Sable",
      "Chocolate Sable": "Silver Chocolate Sable",
      "Lilac Sable": "Silver Lilac Sable",
      "Cocoa Sable": "Silver Cocoa Sable",
      "Lilac Cocoa Sable": "Silver Lilac Cocoa Sable",
      "Cocker Sable": "Silver Cocker Sable",
      "Blue Cocker Sable": "Silver Blue Cocker Sable",
      "Chocolate Cocker Sable": "Silver Chocolate Cocker Sable",
      "Lilac Cocker Sable": "Silver Lilac Cocker Sable",
      "Cocoa Cocker Sable": "Silver Cocoa Cocker Sable",
      "Lilac Cocoa Cocker Sable": "Silver Lilac Cocoa Cocker Sable",
      "Wolf Sable": "Silver Wolf Sable",
      "Blue Wolf Sable": "Silver Blue Wolf Sable",
      "Chocolate Wolf Sable": "Silver Chocolate Wolf Sable",
      "Lilac Wolf Sable": "Silver Lilac Wolf Sable",
      "Black & Tan": "Black Silver & Tan",
      "Chocolate & Tan": "Chocolate Silver & Tan",
      "Blue & Tan": "Blue Silver & Tan",
      "Lilac & Tan": "Lilac Silver & Tan",
      "Cocoa & Tan": "Cocoa Silver & Tan",
      "Lilac Cocoa & Tan": "Lilac Cocoa Silver & Tan"
    });
  }

  return colour;
}

function applyDogMerleAndHarlequin(colour, parsed) {
  const isSingleMerle = parsed.Merle === "M/m";
  const isDoubleMerle = parsed.Merle === "M/M";

  if (!isSingleMerle && !isDoubleMerle) return colour;

  const doublePrefix = isDoubleMerle ? "Double " : "";

  colour = replaceDogBasePrefix(colour, {
    "Black": doublePrefix + "Blue Merle",
    "Chocolate": doublePrefix + "Red Merle",
    "Cocoa": doublePrefix + "Cocoa Merle",
    "Blue": doublePrefix + "Slate Merle",
    "Lilac": doublePrefix + "Lilac Merle",
    "Lilac Cocoa": doublePrefix + "Lilac Cocoa Merle",

    "Black & Tan": doublePrefix + "Blue Merle & Tan",
    "Chocolate & Tan": doublePrefix + "Red Merle & Tan",
    "Cocoa & Tan": doublePrefix + "Cocoa Merle & Tan",
    "Blue & Tan": doublePrefix + "Slate Merle & Tan",
    "Lilac & Tan": doublePrefix + "Lilac Merle & Tan",
    "Lilac Cocoa & Tan": doublePrefix + "Lilac Cocoa Merle & Tan",

    "Cream Point": doublePrefix + "Blue Merle Cream Point",
    "Chocolate Cream": doublePrefix + "Red Merle Cream",
    "Blue Cream": doublePrefix + "Slate Merle Cream",
    "Lilac Cream": doublePrefix + "Lilac Merle Cream",

    "Sable": doublePrefix + "Blue Merle Sable",
    "Chocolate Sable": doublePrefix + "Red Merle Sable",
    "Cocoa Sable": doublePrefix + "Cocoa Merle Sable",
    "Blue Sable": doublePrefix + "Slate Merle Sable",
    "Lilac Sable": doublePrefix + "Lilac Merle Sable",
    "Lilac Cocoa Sable": doublePrefix + "Lilac Cocoa Merle Sable",
    "Cocker Sable": doublePrefix + "Blue Merle Cocker Sable",
    "Chocolate Cocker Sable": doublePrefix + "Red Merle Cocker Sable",
    "Blue Cocker Sable": doublePrefix + "Slate Merle Cocker Sable",
    "Lilac Cocker Sable": doublePrefix + "Lilac Merle Cocker Sable",

    "Fawn": doublePrefix + "Blue Merle Fawn",
    "Chocolate Fawn": doublePrefix + "Red Merle Fawn",
    "Blue Fawn": doublePrefix + "Slate Merle Fawn",
    "Lilac Fawn": doublePrefix + "Lilac Merle Fawn",

    "Wolf Sable": doublePrefix + "Blue Merle Wolf Sable",
    "Chocolate Wolf Sable": doublePrefix + "Red Merle Wolf Sable",
    "Blue Wolf Sable": doublePrefix + "Slate Merle Wolf Sable",
    "Lilac Wolf Sable": doublePrefix + "Lilac Merle Wolf Sable",

    "Saddle Tan": doublePrefix + "Blue Merle Saddle Tan",
    "Chocolate Saddle Tan": doublePrefix + "Red Merle Saddle Tan",
    "Blue Saddle Tan": doublePrefix + "Slate Merle Saddle Tan",
    "Lilac Saddle Tan": doublePrefix + "Lilac Merle Saddle Tan"
  });

  if (!colour.includes("Merle")) {
    colour = isDoubleMerle ? "Double Merle " + colour : colour + " Merle";
  }

  if (parsed.Harlequin === "H/h" && isSingleMerle) {
    colour = colour.replace(/Merle/g, "Harlequin");
  }

  return colour;
}

function applyDogBrindleAndGreying(colour, parsed) {
  if (!isDogClearRedName(colour) && (parsed.K === "kbr/kbr" || parsed.K === "kbr/ky")) {
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

  if (parsed.WhiteSpotting === "sp/sp") patterns.push("Piebald");
  if (parsed.WhiteSpotting === "sp/si") patterns.push("Irish Piebald");
  if (parsed.WhiteSpotting === "sp/sw") patterns.push("Heavy Piebald");
  if (parsed.WhiteSpotting === "si/si") patterns.push("Irish White");
  if (parsed.WhiteSpotting === "si/sw") patterns.push("High Irish White");
  if (parsed.WhiteSpotting === "sw/sw") patterns.push("Extreme White");
  if (parsed.Ticking === "T/T" || parsed.Ticking === "T/t") patterns.push("Ticked");
  if (parsed.Roan === "R/R" || parsed.Roan === "R/r") patterns.push("Roan");

  if (patterns.length > 0) return colour + " " + patterns.join(" ");
  return colour;
}

/* =========================
   COAT TRAIT LOGIC
========================= */

function applyDogCoatTraits(colour, parsed) {
  const isLong = parsed.LongCoat === "l/l";
  const isShort = parsed.LongCoat === "L/L" || parsed.LongCoat === "L/l";
  const isFurnished = hasDogGene(parsed.Furnishings, "F");
  const isCurly = hasDogGene(parsed.Curl, "Cu");

  if (isLong && isFurnished && isCurly) return colour + " Long Curly Furnished Coat";
  if (isLong && isCurly) return colour + " Long Curly Coat";
  if (isLong && isFurnished) return colour + " Long Furnished Coat";
  if (isFurnished && isCurly) return colour + " Curly Furnished Coat";
  if (isLong) return colour + " Long Coat";
  if (isFurnished) return colour + " Furnished";
  if (isCurly) return colour + " Curly";

  // Short coat is only printed when the user actually typed an L-locus genotype.
  // This prevents every default dog from gaining an extra coat label.
  if (parsed.LongCoatProvided && isShort) return colour + " Short Coat";

  return colour;
}

function applyDogHairless(colour, parsed) {
  // Do not display the fallback/default hr/hr on ordinary dogs.
  // Only display hairless/coated wording when the genotype actually included Hr/hr, hr/hr, etc.
  if (!parsed.HairlessProvided) {
    return colour;
  }

  if (parsed.Hairless === "Hr/Hr") {
    return "Non-Viable Hairless (" + colour + ")";
  }

  if (parsed.Hairless === "Hr/hr") {
    return colour + " Hairless";
  }

  if (parsed.Hairless === "hr/hr") {
    return colour + " Coated/Powderpuff";
  }

  return colour;
}


/* =========================
   GENE INTRO TABLE
========================= */

function renderDogGeneIntroTable() {
  return renderDogResults(
    "Dog Genetics Introduction Table",
    `
      <table class="breed-table">
        <tr>
          <th>Gene</th>
          <th>Alleles Used</th>
          <th>What It Does</th>
        </tr>
        <tr><td>Extension / E Locus</td><td>Em, E, Eg, Eh, Ea, e</td><td>Controls recessive red, masks, domino, cocker sable, and northern domino.</td></tr>
        <tr><td>Agouti / A Locus</td><td>Ay, aw, at, asa, a</td><td>Controls sable, wolf sable, tan points, saddle tan, and recessive black.</td></tr>
        <tr><td>K Locus</td><td>K, kbr, ky</td><td>Controls dominant black and brindle. Dominant K can hide Agouti.</td></tr>
        <tr><td>Brown / B Locus</td><td>B, b</td><td>Changes black pigment to chocolate/liver when b/b.</td></tr>
        <tr><td>Cocoa</td><td>Co, co</td><td>Optional brown-type modifier. co/co creates cocoa pigment.</td></tr>
        <tr><td>Dilute / D Locus</td><td>D, d</td><td>Dilutes black to blue, chocolate to lilac, and changes merle names on diluted bases.</td></tr>
        <tr><td>Merle / M Locus</td><td>M, m</td><td>Adds merle pattern. Black-based merles are Blue Merle, chocolate-based merles are Red Merle, blue-based merles are Slate Merle, and lilac-based merles are Lilac Merle.</td></tr>
        <tr><td>Harlequin</td><td>H, h</td><td>Changes single merle into harlequin when H/h is present.</td></tr>
        <tr><td>White Spotting</td><td>S, sp, si, sw</td><td>Controls white markings, piebald, Irish white, high white, and extreme white.</td></tr>
        <tr><td>Ticking</td><td>T, t</td><td>Adds ticking to white areas.</td></tr>
        <tr><td>Roan</td><td>R, r</td><td>Adds roan patterning to white areas.</td></tr>
        <tr><td>Intensity</td><td>I, i</td><td>Controls red pigment depth, including red, cream, fawn, pale/silver sable, and silver points.</td></tr>
        <tr><td>Greying / Fading</td><td>G, g</td><td>Adds progressive fading/silvering.</td></tr>
        <tr><td>Long Coat</td><td>L, l</td><td>l/l creates long coat.</td></tr>
        <tr><td>Furnishings</td><td>F, n</td><td>Adds facial furnishings/wire-style coat traits.</td></tr>
        <tr><td>Curl</td><td>Cu, n</td><td>Adds curly coat texture.</td></tr>
        <tr><td>Hairless</td><td>Hr, hr</td><td>Hr/hr creates hairless dogs. hr/hr creates coated/powderpuff dogs. Hr/Hr is non-viable.</td></tr>
      </table>
      ${renderDogGeneralShadeNotice()}
    `
  );
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

function escapeDogHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* =========================
   GENERAL HELPERS
========================= */

function hasDogGene(pair, gene) {
  return String(pair || "").split("/").includes(gene);
}

function hasDominantDogK(pair) {
  return pair === "K/K" || pair === "K/kbr" || pair === "K/ky";
}

function getDogVisibleExtension(pair) {
  const alleles = String(pair || "e/e").split("/");
  const order = ["Em", "E", "Eg", "Eh", "Ea", "e"];

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

function dogCanShowDomino(agouti) {
  return agouti === "at/at" || agouti === "at/a" || agouti === "at/asa" || agouti === "aw/aw" || agouti === "aw/at" || agouti === "aw/asa" || agouti === "aw/a";
}

function dogCanShowCockerSable(agouti) {
  return agouti === "Ay/Ay" || agouti === "Ay/aw" || agouti === "Ay/at" || agouti === "Ay/asa" || agouti === "Ay/a" || dogCanShowDomino(agouti);
}

function isDogClearRedName(colour) {
  return colour === "Red" || colour === "Cream" || colour === "Silver" || colour === "Genetic White";
}

function randomDogFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function replaceDogBasePrefix(colour, map) {
  const keys = Object.keys(map).sort((a, b) => b.length - a.length);

  for (const key of keys) {
    if (colour === key) return map[key];
    if (colour.startsWith(key + " ")) return map[key] + colour.slice(key.length);
  }

  return colour;
}

function cleanupDogColourName(colour) {
  return String(colour || "")
    .replace(/\s+/g, " ")

    /* Final merle-name safety net.
       This catches any older branch or layered modifier that still says
       Chocolate Merle and forces Show Standard naming. */
    .replace(/Double Chocolate Merle/g, "Double Red Merle")
    .replace(/Chocolate Merle/g, "Red Merle")
    .replace(/Double Blue Merle/g, "Double Blue Merle")
    .replace(/Double Slate Merle/g, "Double Slate Merle")
    .replace(/Double Lilac Merle/g, "Double Lilac Merle")

    .replace(/& Cream/g, "Cream")
    .replace(/Chocolate Cream/g, "Chocolate Cream")
    .replace(/Blue Cream/g, "Blue Cream")
    .replace(/Lilac Cream/g, "Lilac Cream")
    .trim();
}

function hasDogExplicitGene(text, options) {
  const cleanText = String(text || "")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleanText) return false;

  const tokens = cleanText.split(" ");

  for (const option of options) {
    const compactOption = option.replace(/\//g, "");

    for (const token of tokens) {
      const compactToken = token.replace(/\//g, "");
      if (token === option || token === compactOption || compactToken === compactOption) {
        return true;
      }
    }
  }

  return false;
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

      if (token === option || token === compactOption || compactToken === compactOption) {
        if (option.startsWith("n/")) return option.split("/").reverse().join("/");
        if (option === "b/B") return "B/b";
        if (option === "co/Co") return "Co/co";
        if (option === "d/D") return "D/d";
        if (option === "m/M") return "M/m";
        if (option === "t/T") return "T/t";
        if (option === "r/R") return "R/r";
        if (option === "h/H") return "H/h";
        if (option === "i/I") return "I/i";
        if (option === "g/G") return "G/g";
        if (option === "l/L") return "L/l";
        if (option === "n/F") return "F/n";
        if (option === "n/Cu") return "Cu/n";
        if (option === "hr/Hr") return "Hr/hr";
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
    if (token === "Ay/aw" || token === "aw/Ay") return "Ay/aw";
    if (token === "Ay/at" || token === "at/Ay") return "Ay/at";
    if (token === "Ay/asa" || token === "asa/Ay") return "Ay/asa";
    if (token === "Ay/a" || token === "a/Ay") return "Ay/a";

    if (token === "aw/aw") return "aw/aw";
    if (token === "aw/at" || token === "at/aw") return "aw/at";
    if (token === "aw/asa" || token === "asa/aw") return "aw/asa";
    if (token === "aw/a" || token === "a/aw") return "aw/a";

    if (token === "at/at") return "at/at";
    if (token === "at/asa" || token === "asa/at") return "at/asa";
    if (token === "at/a" || token === "a/at") return "at/a";

    if (token === "asa/asa") return "asa/asa";
    if (token === "asa/a" || token === "a/asa") return "asa/a";

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
    if (token === "K/kbr" || token === "kbr/K") return "K/kbr";
    if (token === "K/ky" || token === "ky/K") return "K/ky";
    if (token === "kbr/kbr") return "kbr/kbr";
    if (token === "kbr/ky" || token === "ky/kbr") return "kbr/ky";
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
    if (token === "S/sp" || token === "sp/S") return "S/sp";
    if (token === "S/si" || token === "si/S") return "S/si";
    if (token === "S/sw" || token === "sw/S") return "S/sw";
    if (token === "sp/sp") return "sp/sp";
    if (token === "sp/si" || token === "si/sp") return "sp/si";
    if (token === "sp/sw" || token === "sw/sp") return "sp/sw";
    if (token === "si/si") return "si/si";
    if (token === "si/sw" || token === "sw/si") return "si/sw";
    if (token === "sw/sw") return "sw/sw";
  }

  return "S/S";
}

function dogOutcomeRow(label, sirePair, damPair) {
  const outcomes = calculateDogGeneOutcomes(sirePair, damPair);

  return `
    <tr>
      <td>${escapeDogHtml(label)}</td>
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
      return `${escapeDogHtml(pair)}: ${percent}%`;
    })
    .join("<br>");
}

function sortDogGenePair(alleles) {
  return alleles
    .sort((a, b) => {
      const order = [
        "Em", "E", "Eg", "Eh", "Ea", "e",
        "Ay", "aw", "at", "asa", "a",
        "K", "kbr", "ky",
        "B", "b",
        "Co", "co",
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

      const aIndex = order.indexOf(a);
      const bIndex = order.indexOf(b);

      if (aIndex === -1 && bIndex === -1) return String(a).localeCompare(String(b));
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    })
    .join("/");
}

window.DOG_GENETICS_ENGINE_VERSION = "20.0-auto-animal-genotype";
window.runDogPredictor = runDogPredictor;
window.runDogRoll = runDogRoll;
window.runDogPhenotypeCalculator = runDogPhenotypeCalculator;
window.runDogGenotypeBuilder = runDogGenotypeBuilder;
window.buildAutoDogGenotype = buildAutoDogGenotype;
window.runDogGenetics = runDogGenetics;
window.parseDogGenotype = parseDogGenotype;
window.getDogPhenotype = getDogPhenotype;
window.getDogVisibleExtension = getDogVisibleExtension;
window.getDogVisibleWhiteSpotting = getDogVisibleWhiteSpotting;
window.renderDogGeneIntroTable = renderDogGeneIntroTable;
