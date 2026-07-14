/* =========================
   FELINE GENETICS ENGINE
========================= */

console.log("CAT ENGINE VERSION: EXPANDED FELINE STRUCTURAL + COAT GENETICS 2026-07-13");
window.__CAT_ENGINE_VERSION = "EXPANDED FELINE STRUCTURAL + COAT GENETICS 2026-07-13";

function runCatGenetics(inputs) {
  const mode = inputs.mode;

  if (mode === "predictor") return runCatPredictor(inputs);
  if (mode === "roll") return runCatRoll(inputs);
  if (mode === "phenotypeFromGenotype") return runCatPhenotypeCalculator(inputs);
  if (mode === "genotypeFromPhenotype") return runCatGenotypeBuilder(inputs);
  if (mode === "autoAnimalGenotype") return buildAutoCatGenotype(inputs.phenotype, inputs.gender);

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
    catOutcomeRow("Dilute Modifier", sire.DiluteModifier, dam.DiluteModifier),
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
    catOutcomeRow("Devon Rex", sire.DevonRex, dam.DevonRex),
    catOutcomeRow("Cornish Rex", sire.CornishRex, dam.CornishRex),
    catOutcomeRow("Selkirk Rex", sire.SelkirkRex, dam.SelkirkRex),
    catOutcomeRow("LaPerm", sire.LaPerm, dam.LaPerm),
    catOutcomeRow("Ural Rex", sire.UralRex, dam.UralRex),
    catOutcomeRow("Tennessee Rex", sire.TennesseeRex, dam.TennesseeRex),
    catOutcomeRow("Sphynx Hairless", sire.Hairless, dam.Hairless),
    catOutcomeRow("Donskoy/Peterbald Hairless", sire.Donskoy, dam.Donskoy),
    catOutcomeRow("Lykoi", sire.Lykoi, dam.Lykoi),
    catOutcomeRow("Munchkin", sire.Munchkin, dam.Munchkin),
    catOutcomeRow("Scottish Fold", sire.ScottishFold, dam.ScottishFold),
    catOutcomeRow("American Curl", sire.AmericanCurl, dam.AmericanCurl),
    catOutcomeRow("Manx", sire.Manx, dam.Manx)
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
  const phenotype = getCatPhenotype(parsed, inputs.breed || inputs.namingStyle || "");

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
  add(parts.DiluteModifier, "dm/dm");
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
  add(parts.DevonRex, "Re/Re");
  add(parts.CornishRex, "Cr/Cr");
  add(parts.SelkirkRex, "se/se");
  add(parts.LaPerm, "lp/lp");
  add(parts.UralRex, "Ur/Ur");
  add(parts.TennesseeRex, "tr/tr");
  add(parts.Hairless, "Hr/Hr");
  add(parts.Donskoy, "dn/dn");
  add(parts.Lykoi, "Lk/Lk");
  add(parts.Munchkin, "mk/mk");
  add(parts.ScottishFold, "fd/fd");
  add(parts.AmericanCurl, "cu/cu");
  add(parts.Manx, "m/m");

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

  const wantsCaramel =
    phenotype.includes("caramel") ||
    phenotype.includes("taupe");

  const wantsApricot =
    phenotype.includes("apricot");

  const wantsDiluteModifier =
    wantsCaramel ||
    wantsApricot;

  const wantsLynx =
    phenotype.includes("lynx");

  const wantsTabby =
    phenotype.includes("tabby") ||
    phenotype.includes("classic") ||
    phenotype.includes("mackerel") ||
    phenotype.includes("spotted") ||
    phenotype.includes("ticked") ||
    wantsLynx ||
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

  const wantsDevonRex = phenotype.includes("devon rex");
  const wantsCornishRex = phenotype.includes("cornish rex");
  const wantsSelkirkRex = phenotype.includes("selkirk rex");
  const wantsLaPerm = phenotype.includes("laperm") || phenotype.includes("la perm");
  const wantsUralRex = phenotype.includes("ural rex");
  const wantsTennesseeRex = phenotype.includes("tennessee rex");
  const wantsGenericRex = phenotype.includes("rex") &&
    !wantsDevonRex && !wantsCornishRex && !wantsSelkirkRex &&
    !wantsUralRex && !wantsTennesseeRex;

  const wantsHairless = phenotype.includes("hairless") || phenotype.includes("sphynx");
  const wantsDonskoy = phenotype.includes("donskoy") || phenotype.includes("peterbald");
  const wantsLykoi = phenotype.includes("lykoi") || phenotype.includes("roan");
  const wantsMunchkin = phenotype.includes("munchkin") || phenotype.includes("dwarf");
  const wantsScottishFold = phenotype.includes("scottish fold") || phenotype.includes("folded ears");
  const wantsAmericanCurl = phenotype.includes("american curl") || phenotype.includes("curled ears");
  const wantsManx = phenotype.includes("manx") || phenotype.includes("cymric") || phenotype.includes("tailless");

  const base = {
    Orange: "o/o",
    Agouti: "a/a",
    Brown: "B/B",
    Dilute: "D/D",
    DiluteModifier: "dm/dm",
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
    DevonRex: "Re/Re",
    CornishRex: "Cr/Cr",
    SelkirkRex: "se/se",
    LaPerm: "lp/lp",
    UralRex: "Ur/Ur",
    TennesseeRex: "tr/tr",
    Hairless: "Hr/Hr",
    Donskoy: "dn/dn",
    Lykoi: "Lk/Lk",
    Munchkin: "mk/mk",
    ScottishFold: "fd/fd",
    AmericanCurl: "cu/cu",
    Manx: "m/m"
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

      if (wantsLynx) {
        parts.Tabby = "Mc/mc";
        addSuggestion("Tabby Pattern: Mc/- shown in examples for lynx point.");
        addSuggestion("Lynx Point: requires tabby/agouti expression with colourpoint.");
        addHidden("Lynx Point is not a separate colourpoint allele; it is tabby showing through a pointed coat.");
      }
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

    if (wantsDiluteModifier) {
      parts.Dilute = "d/d";
      parts.DiluteModifier = "Dm/dm";
      addSuggestion("Dilute Modifier: Dm/-");
      addSuggestion("Dilute: d/d");

      if (wantsCaramel) {
        addHidden("Caramel is dilute modifier on blue/lilac/fawn-based coats.");
      }

      if (wantsApricot) {
        addHidden("Apricot is dilute modifier on cream-based coats.");
      }
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

    if (wantsDevonRex || wantsGenericRex) {
      parts.DevonRex = "re/re";
      addSuggestion("Devon Rex: re/re (recessive)");
    }
    if (wantsCornishRex) {
      parts.CornishRex = "cr/cr";
      addSuggestion("Cornish Rex: cr/cr (recessive)");
    }
    if (wantsSelkirkRex) {
      parts.SelkirkRex = "Se/se";
      addSuggestion("Selkirk Rex: Se/- (dominant)");
    }
    if (wantsLaPerm) {
      parts.LaPerm = "Lp/lp";
      addSuggestion("LaPerm: Lp/- (dominant)");
    }
    if (wantsUralRex) {
      parts.UralRex = "ur/ur";
      addSuggestion("Ural Rex: ur/ur (recessive simulation locus)");
    }
    if (wantsTennesseeRex) {
      parts.TennesseeRex = "Tr/tr";
      addSuggestion("Tennessee Rex: Tr/- (dominant simulation locus)");
    }
    if (wantsHairless) {
      parts.Hairless = "hr/hr";
      addSuggestion("Sphynx Hairless: hr/hr (recessive)");
    }
    if (wantsDonskoy) {
      parts.Donskoy = "Dn/dn";
      addSuggestion("Donskoy/Peterbald Hairless: Dn/- (dominant)");
    }
    if (wantsLykoi) {
      parts.Lykoi = "lk/lk";
      addSuggestion("Lykoi hypotrichia and roaning: lk/lk (recessive)");
    }
    if (wantsMunchkin) {
      parts.Munchkin = "Mk/mk";
      addSuggestion("Munchkin: Mk/mk; Mk/Mk is embryonic lethal");
    }
    if (wantsScottishFold) {
      parts.ScottishFold = "Fd/fd";
      addSuggestion("Scottish Fold: Fd/-; Fd/Fd has severe skeletal disease");
    }
    if (wantsAmericanCurl) {
      parts.AmericanCurl = "Cu/cu";
      addSuggestion("American Curl: Cu/-");
    }
    if (wantsManx) {
      parts.Manx = "M/m";
      addSuggestion("Manx/Cymric: M/m; M/M is embryonic lethal");
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
   AUTO ANIMAL GENOTYPE MODE
   Returns one clean genotype string for Add Animal.
   This does not affect the Genetics Lab report modes.
========================= */

function buildAutoCatGenotype(phenotypeInput, genderInput) {
  const phenotype = String(phenotypeInput || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[–—]/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!phenotype) return "";

  const gender = String(genderInput || "").toLowerCase();
  const isMale = gender.includes("male") && !gender.includes("female");

  function has(phrase) {
    return phenotype.includes(String(phrase || "").toLowerCase());
  }

  const wantsBlueCream = has("blue cream") || has("bluecream");
  const wantsCalico = has("calico");
  const wantsTortie = has("tortie") || wantsBlueCream || wantsCalico;
  const wantsCameo = has("cameo");
  const wantsSmoke = has("smoke");
  const wantsSilver = has("silver");
  const wantsBlue = has("blue") && !wantsBlueCream && !has("blue eyed");
  const wantsCream = has("cream") && !wantsBlueCream;
  const wantsRed = has("red") || has("orange") || wantsCameo;
  const wantsChocolate = has("chocolate");
  const wantsLilac = has("lilac");
  const wantsCinnamon = has("cinnamon");
  const wantsFawn = has("fawn");
  const wantsCaramel = has("caramel") || has("taupe");
  const wantsApricot = has("apricot");
  const wantsLynx = has("lynx");
  const wantsTabby = has("tabby") || has("classic") || has("mackerel") || has("spotted") || has("ticked") || wantsLynx || wantsSilver;
  const wantsClassic = has("classic");
  const wantsSpotted = has("spotted");
  const wantsTicked = has("ticked");
  const wantsBurmese = has("burmese");
  const wantsPoint = has("siamese") || has("point");
  const wantsMink = has("mink");
  const wantsBlueEyedAlbino = has("blue eyed albino");
  const wantsRedEyedAlbino = has("red eyed albino");
  const wantsWhite = has("white") && !wantsBlueEyedAlbino && !wantsRedEyedAlbino;
  const wantsPolydactyl = has("polydactyl");
  const wantsAmber = has("amber");
  const wantsSunshine = has("sunshine") && !has("extreme sunshine");
  const wantsExtremeSunshine = has("extreme sunshine");
  const wantsCharcoal = has("charcoal");
  const wantsShaded = has("shaded");
  const wantsRufoused = has("rufoused");
  const wantsGlitter = has("glitter");
  const wantsKarpati = has("karpati");
  const wantsLonghair = has("longhair") || has("long hair") || has("long haired");
  const wantsShorthair = has("shorthair") || has("short hair") || has("short haired");
  const wantsDevonRex = has("devon rex");
  const wantsCornishRex = has("cornish rex");
  const wantsSelkirkRex = has("selkirk rex");
  const wantsLaPerm = has("laperm") || has("la perm");
  const wantsUralRex = has("ural rex");
  const wantsTennesseeRex = has("tennessee rex");
  const wantsGenericRex = has("rex") && !wantsDevonRex && !wantsCornishRex && !wantsSelkirkRex && !wantsUralRex && !wantsTennesseeRex;
  const wantsHairless = has("hairless") || has("sphynx");
  const wantsDonskoy = has("donskoy") || has("peterbald");
  const wantsLykoi = has("lykoi") || has("roan");
  const wantsMunchkin = has("munchkin") || has("dwarf");
  const wantsScottishFold = has("scottish fold") || has("folded ears");
  const wantsAmericanCurl = has("american curl") || has("curled ears");
  const wantsManx = has("manx") || has("cymric") || has("tailless");

  const genes = [];

  function setGene(locus, value) {
    const prefixes = {
      Orange: /^(O|o)\//,
      Agouti: /^(A|a)\//,
      Brown: /^(B|b|bl)\//,
      Dilute: /^(D|d)\//,
      DiluteModifier: /^(Dm|dm)\//,
      White: /^(W|w)\//,
      WhiteSpotting: /^(S|s)\//,
      Silver: /^(I|i)\//,
      Colourpoint: /^(C|cb|cs|ca|c)\//,
      Tabby: /^(Mc|mc)\//,
      Spotted: /^(Sp|sp)\//,
      Ticked: /^(Ta|ta)\//,
      Polydactyl: /^(Pd|pd)\//,
      Amber: /^(Amb|n)\//,
      Sunshine: /^(Su|n)\//,
      ExtremeSunshine: /^(Es|n)\//,
      Charcoal: /^(Ch|n)\//,
      Wideband: /^(Wb|n)\//,
      Rufousing: /^(Rf|n)\//,
      Glitter: /^(Gl|n)\//,
      Karpati: /^(Kp|n)\//,
      HairLength: /^(L|l)\//,
      DevonRex: /^(Re|re)\//,
      CornishRex: /^(Cr|cr)\//,
      SelkirkRex: /^(Se|se)\//,
      LaPerm: /^(Lp|lp)\//,
      UralRex: /^(Ur|ur)\//,
      TennesseeRex: /^(Tr|tr)\//,
      Hairless: /^(Hr|hr)\//,
      Donskoy: /^(Dn|dn)\//,
      Lykoi: /^(Lk|lk)\//,
      Munchkin: /^(Mk|mk)\//,
      ScottishFold: /^(Fd|fd)\//,
      AmericanCurl: /^(Cu|cu)\//,
      Manx: /^(M|m)\//
    };

    const re = prefixes[locus];
    if (!re || !value) return;

    for (let i = genes.length - 1; i >= 0; i--) {
      if (re.test(genes[i])) genes.splice(i, 1);
    }

    genes.push(value);
  }

  function orangeGene(redBased) {
    if (wantsTortie || wantsCalico || wantsBlueCream) return "O/o";
    if (redBased) return isMale ? "O/Y" : "O/O";
    return isMale ? "o/Y" : "o/o";
  }

  // Base colour.
  if (wantsWhite) {
    setGene("White", "W/w");
  }

  if (wantsBlueCream || (wantsTortie && wantsCream)) {
    setGene("Orange", "O/o");
    setGene("Brown", "B/B");
    setGene("Dilute", "d/d");
  } else if (wantsTortie) {
    setGene("Orange", "O/o");
    setGene("Brown", wantsChocolate ? "b/b" : wantsCinnamon ? "bl/bl" : "B/B");
    setGene("Dilute", wantsBlue || wantsLilac || wantsFawn ? "d/d" : "D/D");
  } else if (wantsCream) {
    setGene("Orange", orangeGene(true));
    setGene("Brown", "B/B");
    setGene("Dilute", "d/d");
  } else if (wantsRed || wantsCameo) {
    setGene("Orange", orangeGene(true));
    setGene("Brown", "B/B");
    setGene("Dilute", "D/D");
  } else if (wantsLilac) {
    setGene("Orange", orangeGene(false));
    setGene("Brown", "b/b");
    setGene("Dilute", "d/d");
  } else if (wantsFawn) {
    setGene("Orange", orangeGene(false));
    setGene("Brown", "bl/bl");
    setGene("Dilute", "d/d");
  } else if (wantsChocolate) {
    setGene("Orange", orangeGene(false));
    setGene("Brown", "b/b");
    setGene("Dilute", "D/D");
  } else if (wantsCinnamon) {
    setGene("Orange", orangeGene(false));
    setGene("Brown", "bl/bl");
    setGene("Dilute", "D/D");
  } else if (wantsBlue) {
    setGene("Orange", orangeGene(false));
    setGene("Brown", "B/B");
    setGene("Dilute", "d/d");
  } else {
    setGene("Orange", orangeGene(false));
    setGene("Brown", "B/B");
    setGene("Dilute", "D/D");
  }

  // Pattern and modifier overlays.
  setGene("Agouti", wantsTabby || wantsLynx || wantsSilver ? "A/a" : "a/a");

  if (wantsCaramel || wantsApricot) {
    setGene("Dilute", "d/d");
    setGene("DiluteModifier", "Dm/dm");
  }

  if (wantsSmoke || wantsSilver || wantsCameo) setGene("Silver", "I/i");
  if (wantsCalico || has("bicolour") || has("bicolor") || has("with white") || has("and white")) setGene("WhiteSpotting", "S/s");
  if (has("high white")) setGene("WhiteSpotting", "S/S");

  if (wantsClassic) setGene("Tabby", "mc/mc");
  else if (wantsTabby || wantsLynx) setGene("Tabby", "Mc/mc");

  if (wantsSpotted) setGene("Spotted", "Sp/sp");
  if (wantsTicked) setGene("Ticked", "Ta/ta");

  if (wantsBurmese) setGene("Colourpoint", "cb/cb");
  if (wantsPoint || wantsLynx) setGene("Colourpoint", "cs/cs");
  if (wantsMink) setGene("Colourpoint", "cb/cs");
  if (wantsBlueEyedAlbino) setGene("Colourpoint", "ca/ca");
  if (wantsRedEyedAlbino) setGene("Colourpoint", "c/c");

  if (wantsPolydactyl) setGene("Polydactyl", "Pd/pd");
  if (wantsAmber) setGene("Amber", "Amb/n");
  if (wantsSunshine) setGene("Sunshine", "Su/n");
  if (wantsExtremeSunshine) setGene("ExtremeSunshine", "Es/n");
  if (wantsCharcoal) setGene("Charcoal", "Ch/n");
  if (wantsShaded) setGene("Wideband", "Wb/n");
  if (wantsRufoused) setGene("Rufousing", "Rf/n");
  if (wantsGlitter) setGene("Glitter", "Gl/n");
  if (wantsKarpati) setGene("Karpati", "Kp/n");
  if (wantsLonghair) setGene("HairLength", "l/l");
  if (wantsShorthair) setGene("HairLength", "L/l");
  if (wantsDevonRex || wantsGenericRex) setGene("DevonRex", "re/re");
  if (wantsCornishRex) setGene("CornishRex", "cr/cr");
  if (wantsSelkirkRex) setGene("SelkirkRex", "Se/se");
  if (wantsLaPerm) setGene("LaPerm", "Lp/lp");
  if (wantsUralRex) setGene("UralRex", "ur/ur");
  if (wantsTennesseeRex) setGene("TennesseeRex", "Tr/tr");
  if (wantsHairless) setGene("Hairless", "hr/hr");
  if (wantsDonskoy) setGene("Donskoy", "Dn/dn");
  if (wantsLykoi) setGene("Lykoi", "lk/lk");
  if (wantsMunchkin) setGene("Munchkin", "Mk/mk");
  if (wantsScottishFold) setGene("ScottishFold", "Fd/fd");
  if (wantsAmericanCurl) setGene("AmericanCurl", "Cu/cu");
  if (wantsManx) setGene("Manx", "M/m");

  return cleanAutoCatGenotype(genes.join(" "));
}

function cleanAutoCatGenotype(genotype) {
  const order = [
    /^(O|o)\//,
    /^(A|a)\//,
    /^(B|b|bl)\//,
    /^(D|d)\//,
    /^(Dm|dm)\//,
    /^(W|w)\//,
    /^(S|s)\//,
    /^(I|i)\//,
    /^(C|cb|cs|ca|c)\//,
    /^(Mc|mc)\//,
    /^(Sp|sp)\//,
    /^(Ta|ta)\//,
    /^(Pd|pd)\//,
    /^(Amb|n)\//,
    /^(Su|n)\//,
    /^(Es|n)\//,
    /^(Ch|n)\//,
    /^(Wb|n)\//,
    /^(Rf|n)\//,
    /^(Gl|n)\//,
    /^(Kp|n)\//,
    /^(L|l)\//,
    /^(Re|re)\//,
    /^(Cr|cr)\//,
    /^(Se|se)\//,
    /^(Lp|lp)\//,
    /^(Ur|ur)\//,
    /^(Tr|tr)\//,
    /^(Hr|hr)\//,
    /^(Dn|dn)\//,
    /^(Lk|lk)\//,
    /^(Mk|mk)\//,
    /^(Fd|fd)\//,
    /^(Cu|cu)\//,
    /^(M|m)\//
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

    DiluteModifier: findCatGenePair(text, ["Dm/Dm", "Dm/dm", "dm/Dm", "dm/dm"], "dm/dm"),

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

    DevonRex: findCatGenePair(text, ["Re/Re", "Re/re", "re/Re", "re/re"], "Re/Re"),
    CornishRex: findCatGenePair(text, ["Cr/Cr", "Cr/cr", "cr/Cr", "cr/cr"], "Cr/Cr"),
    SelkirkRex: findCatGenePair(text, ["Se/Se", "Se/se", "se/Se", "se/se"], "se/se"),
    LaPerm: findCatGenePair(text, ["Lp/Lp", "Lp/lp", "lp/Lp", "lp/lp"], "lp/lp"),
    UralRex: findCatGenePair(text, ["Ur/Ur", "Ur/ur", "ur/Ur", "ur/ur"], "Ur/Ur"),
    TennesseeRex: findCatGenePair(text, ["Tr/Tr", "Tr/tr", "tr/Tr", "tr/tr"], "tr/tr"),
    Hairless: findCatGenePair(text, ["Hr/Hr", "Hr/hr", "hr/Hr", "hr/hr"], "Hr/Hr"),
    Donskoy: findCatGenePair(text, ["Dn/Dn", "Dn/dn", "dn/Dn", "dn/dn"], "dn/dn"),
    Lykoi: findCatGenePair(text, ["Lk/Lk", "Lk/lk", "lk/Lk", "lk/lk"], "Lk/Lk"),
    Munchkin: findCatGenePair(text, ["Mk/Mk", "Mk/mk", "mk/Mk", "mk/mk"], "mk/mk"),
    ScottishFold: findCatGenePair(text, ["Fd/Fd", "Fd/fd", "fd/Fd", "fd/fd"], "fd/fd"),
    AmericanCurl: findCatGenePair(text, ["Cu/Cu", "Cu/cu", "cu/Cu", "cu/cu"], "cu/cu"),
    Manx: findCatGenePair(text, ["M/M", "M/m", "m/M", "m/m"], "m/m")
  };
}

/* =========================
   PHENOTYPE PIPELINE
========================= */

function getCatPhenotype(parsed, namingStyle) {
  const name = buildCatPhenotypeName(parsed, namingStyle);
  return normalizeCatColourOrder(name).trim().replace(/\s+/g, " ");
}

function buildCatPhenotypeName(parsed, namingStyle) {
  const isAlbino =
    parsed.Colourpoint === "ca/ca" ||
    parsed.Colourpoint === "c/c";

  let mainName = "";

  if (parsed.White === "W/W" || parsed.White === "W/w") {
    mainName = "White";
  } else if (parsed.Colourpoint === "ca/ca") {
    mainName = "Blue-Eyed Albino";
  } else if (parsed.Colourpoint === "c/c") {
    mainName = "Red-Eyed Albino";
  } else {
    const parts = getCatPhenotypeParts(parsed);
    mainName = assembleCatColourName(parts, parsed, namingStyle);
  }

  mainName = addCatWhiteSpottingName(mainName, parsed, isAlbino);
  mainName = addCatPolydactylName(mainName, parsed);
  mainName = addCatStructuralTraitNames(mainName, parsed);
  mainName = addCatHairTypeName(mainName, parsed);

  return mainName;
}

function getCatPhenotypeParts(parsed) {
  let base = getCatBaseColour(parsed);
  base = applyCatDilute(base, parsed);
  base = applyCatDiluteModifier(base, parsed);

  const hasAgouti = parsed.Agouti === "A/A" || parsed.Agouti === "A/a";
  const hasSilver = parsed.Silver === "I/I" || parsed.Silver === "I/i";

  let pattern = "";

  if (hasAgouti) {
    if (parsed.Ticked === "Ta/Ta" || parsed.Ticked === "Ta/ta") {
      pattern = "Ticked Tabby";
    } else if (parsed.Spotted === "Sp/Sp" || parsed.Spotted === "Sp/sp") {
      pattern = "Spotted Tabby";
    } else if (parsed.Tabby === "mc/mc") {
      pattern = "Classic Tabby";
    } else if (parsed.Tabby === "Mc/Mc" || parsed.Tabby === "Mc/mc") {
      pattern = "Mackerel Tabby";
    }
  }

  const extraModifiers = getCatExtraModifierWords(parsed);

  return {
    base,
    pattern,
    hasSilver,
    extraModifiers
  };
}

function assembleCatColourName(parts, parsed, namingStyle) {
  let base = parts.base;
  let pattern = parts.pattern;
  let silverWord = "";
  let smokeWord = "";
  let extras = parts.extraModifiers.slice();

  if (parts.hasSilver) {
    if (extras.includes("Sunshine") || extras.includes("Extreme Sunshine")) {
      extras = extras.filter(item => item !== "Sunshine" && item !== "Extreme Sunshine");
      extras.unshift("Bimetallic");
    }

    if (pattern) {
      silverWord = "Silver";
    } else if (base.includes("Red") || base.includes("Cream") || base.includes("Apricot")) {
      base = base
        .replace(/Red/g, "Red Cameo")
        .replace(/Cream/g, "Cream Cameo")
        .replace(/Apricot/g, "Apricot Cameo");
    } else {
      smokeWord = "Smoke";
    }
  }

  let core = [base, silverWord, pattern, smokeWord]
    .filter(Boolean)
    .join(" ");

  core = applyCatPointNamingFromParts(core, base, silverWord, pattern, parsed, namingStyle);
  core = applyCatBurmeseMinkNamingFromParts(core, base, parsed, namingStyle);

  if (extras.length > 0) {
    core = extras.join(" ") + " " + core;
  }

  return core;
}

function getCatExtraModifierWords(parsed) {
  const modifiers = [];

  if (parsed.Amber === "Amb/Amb" || parsed.Amber === "Amb/n") {
    modifiers.push("Amber");
  }

  if (parsed.ExtremeSunshine === "Es/Es" || parsed.ExtremeSunshine === "Es/n") {
    modifiers.push("Extreme Sunshine");
  } else if (parsed.Sunshine === "Su/Su" || parsed.Sunshine === "Su/n") {
    modifiers.push("Sunshine");
  }

  if (parsed.Charcoal === "Ch/Ch" || parsed.Charcoal === "Ch/n") {
    modifiers.push("Charcoal");
  }

  if (parsed.Wideband === "Wb/Wb" || parsed.Wideband === "Wb/n") {
    modifiers.push("Shaded");
  }

  if (parsed.Rufousing === "Rf/Rf" || parsed.Rufousing === "Rf/n") {
    modifiers.push("Rufoused");
  }

  if (parsed.Glitter === "Gl/Gl" || parsed.Glitter === "Gl/n") {
    modifiers.push("Glitter");
  }

  if (parsed.Karpati === "Kp/Kp" || parsed.Karpati === "Kp/n") {
    modifiers.push("Karpati");
  }

  return modifiers;
}

function applyCatPointNamingFromParts(core, base, silverWord, pattern, parsed, namingStyle) {
  const style = String(namingStyle || "").toLowerCase();
  const styleWantsPoint =
    style.includes("siamese") ||
    style.includes("point") ||
    style.includes("colourpoint") ||
    style.includes("colorpoint") ||
    style.includes("ragdoll") ||
    style.includes("birman") ||
    style.includes("himalayan") ||
    style.includes("balinese");

  if (parsed.Colourpoint !== "cs/cs" && !styleWantsPoint) return core;

  const pointBaseMap = {
    "Black": "Seal",
    "Blue": "Blue",
    "Chocolate": "Chocolate",
    "Lilac": "Lilac",
    "Cinnamon": "Cinnamon",
    "Fawn": "Fawn",
    "Red": "Flame",
    "Cream": "Cream",
    "Caramel": "Caramel",
    "Apricot": "Apricot",
    "Tortie": "Tortie",
    "Blue-Cream Tortie": "Blue-Cream",
    "Caramel-Apricot Tortie": "Caramel-Apricot"
  };

  const pointBase = pointBaseMap[base] || base;

  if (pattern) {
    const patternName = pattern.replace(" Tabby", "");
    return [pointBase, silverWord, patternName, "Lynx Point"]
      .filter(Boolean)
      .join(" ");
  }

  return pointBase + " Point";
}

function applyCatBurmeseMinkNamingFromParts(core, base, parsed, namingStyle) {
  const style = String(namingStyle || "").toLowerCase();
  const wantsBurmese = parsed.Colourpoint === "cb/cb" || style.includes("burmese");
  const wantsMink = parsed.Colourpoint === "cb/cs" || style.includes("tonkinese") || style.includes("mink");

  if (!wantsBurmese && !wantsMink) return core;

  const burmeseMap = {
    "Black": "Sable",
    "Chocolate": "Champagne",
    "Blue": "Blue Burmese",
    "Lilac": "Platinum",
    "Red": "Red Burmese",
    "Cream": "Cream Burmese",
    "Tortie": "Tortoiseshell Burmese",
    "Blue-Cream Tortie": "Blue-Cream Burmese"
  };

  const minkMap = {
    "Black": "Natural Mink",
    "Chocolate": "Champagne Mink",
    "Blue": "Blue Mink",
    "Lilac": "Platinum Mink",
    "Cinnamon": "Cinnamon Mink",
    "Fawn": "Fawn Mink",
    "Red": "Red Mink",
    "Cream": "Cream Mink",
    "Tortie": "Tortie Mink",
    "Blue-Cream Tortie": "Blue-Cream Mink"
  };

  if (wantsBurmese) return burmeseMap[base] || (core + " Burmese");
  if (wantsMink) return minkMap[base] || (core + " Mink");

  return core;
}

function addCatWhiteSpottingName(colour, parsed, isAlbino) {
  if (
    isAlbino ||
    colour === "White" ||
    colour === "Blue-Eyed Albino" ||
    colour === "Red-Eyed Albino"
  ) {
    return colour;
  }

  if (parsed.WhiteSpotting === "S/S") {
    return colour + " High White";
  }

  if (parsed.WhiteSpotting === "S/s") {
    return colour + " Bicolour";
  }

  return colour;
}

function addCatPolydactylName(colour, parsed) {
  if (parsed.Polydactyl === "Pd/Pd" || parsed.Polydactyl === "Pd/pd") {
    return colour + " Polydactyl";
  }

  return colour;
}

function addCatStructuralTraitNames(colour, parsed) {
  const traits = [];

  if (parsed.Munchkin === "Mk/Mk") traits.push("Nonviable Munchkin");
  else if (parsed.Munchkin === "Mk/mk" || parsed.Munchkin === "mk/Mk") traits.push("Munchkin");

  if (parsed.ScottishFold === "Fd/Fd") traits.push("Homozygous Scottish Fold");
  else if (parsed.ScottishFold === "Fd/fd" || parsed.ScottishFold === "fd/Fd") traits.push("Scottish Fold");

  if (parsed.AmericanCurl === "Cu/Cu" || parsed.AmericanCurl === "Cu/cu" || parsed.AmericanCurl === "cu/Cu") traits.push("American Curl");

  if (parsed.Manx === "M/M") traits.push("Nonviable Manx");
  else if (parsed.Manx === "M/m" || parsed.Manx === "m/M") traits.push("Manx");

  return traits.length ? colour + " " + traits.join(" ") : colour;
}

function addCatHairTypeName(colour, parsed) {
  const coats = [];

  if (parsed.Donskoy === "Dn/Dn" || parsed.Donskoy === "Dn/dn" || parsed.Donskoy === "dn/Dn") {
    coats.push("Donskoy Hairless");
  } else if (parsed.Hairless === "hr/hr") {
    coats.push("Sphynx Hairless");
  }

  if (parsed.Lykoi === "lk/lk") coats.push("Roan Lykoi");
  if (parsed.DevonRex === "re/re") coats.push("Devon Rex");
  if (parsed.CornishRex === "cr/cr") coats.push("Cornish Rex");
  if (parsed.SelkirkRex === "Se/Se" || parsed.SelkirkRex === "Se/se" || parsed.SelkirkRex === "se/Se") coats.push("Selkirk Rex");
  if (parsed.LaPerm === "Lp/Lp" || parsed.LaPerm === "Lp/lp" || parsed.LaPerm === "lp/Lp") coats.push("LaPerm");
  if (parsed.UralRex === "ur/ur") coats.push("Ural Rex");
  if (parsed.TennesseeRex === "Tr/Tr" || parsed.TennesseeRex === "Tr/tr" || parsed.TennesseeRex === "tr/Tr") coats.push("Tennessee Rex");

  if (coats.length) return colour + " " + coats.join(" ");
  if (parsed.HairLength === "l/l") return colour + " Longhair";
  return colour + " Shorthair";
}


function normalizeCatColourOrder(name) {
  let colour = String(name || "").trim().replace(/\s+/g, " ");

  const hairWords = [
    "Donskoy Hairless", "Sphynx Hairless", "Roan Lykoi",
    "Tennessee Rex", "Selkirk Rex", "Cornish Rex", "Devon Rex", "Ural Rex",
    "LaPerm", "Shorthair", "Longhair", "Rex", "Hairless"
  ];
  let hair = "";

  for (const word of hairWords) {
    const suffix = " " + word;
    if (colour.endsWith(suffix)) {
      hair = word;
      colour = colour.slice(0, -suffix.length).trim();
      break;
    }
  }

  const tailWords = ["Polydactyl", "High White", "Bicolour"];
  const tails = [];

  let changed = true;
  while (changed) {
    changed = false;

    for (const word of tailWords) {
      const suffix = " " + word;
      if (colour.endsWith(suffix)) {
        tails.unshift(word);
        colour = colour.slice(0, -suffix.length).trim();
        changed = true;
        break;
      }
    }
  }

  const patternRegex = /^(Silver\s+)?(Ticked Tabby|Spotted Tabby|Classic Tabby|Mackerel Tabby)\s+(.+)$/;
  let match = colour.match(patternRegex);

  if (match) {
    const silver = match[1] ? "Silver" : "";
    const pattern = match[2];
    const base = match[3];
    colour = [base, silver, pattern].filter(Boolean).join(" ");
  }

  const silverPatternRegex = /^Silver\s+(Ticked Tabby|Spotted Tabby|Classic Tabby|Mackerel Tabby)\s+(.+)$/;
  match = colour.match(silverPatternRegex);

  if (match) {
    const pattern = match[1];
    const base = match[2];
    colour = [base, "Silver", pattern].join(" ");
  }

  const smokeRegex = /^Smoke\s+(.+)$/;
  match = colour.match(smokeRegex);

  if (match) {
    colour = match[1] + " Smoke";
  }

  return [colour].concat(tails).concat(hair ? [hair] : []).filter(Boolean).join(" ");
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
function applyCatDiluteModifier(colour, parsed) {
  const hasDiluteModifier =
    parsed.DiluteModifier === "Dm/Dm" ||
    parsed.DiluteModifier === "Dm/dm" ||
    parsed.DiluteModifier === "dm/Dm";

  if (!hasDiluteModifier) return colour;
  if (parsed.Dilute !== "d/d") return colour;

  return colour
    .replace(/Blue-Cream Tortie/g, "Caramel-Apricot Tortie")
    .replace(/Lilac-Cream Tortie/g, "Lilac Caramel-Apricot Tortie")
    .replace(/Fawn-Cream Tortie/g, "Fawn Caramel-Apricot Tortie")
    .replace(/Blue/g, "Caramel")
    .replace(/Lilac/g, "Lilac Caramel")
    .replace(/Fawn/g, "Fawn Caramel")
    .replace(/Cream/g, "Apricot");
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

  if (!hasSilver) return colour;

  if (
    colour === "Blue-Eyed Albino" ||
    colour === "Red-Eyed Albino" ||
    colour === "White"
  ) {
    return colour;
  }

  const lower = colour.toLowerCase();

  if (lower.includes("tabby")) {
    // Supports both legacy prefix order and corrected base-first order.
    colour = colour.replace(/^(Ticked Tabby|Spotted Tabby|Classic Tabby|Mackerel Tabby) (.+)$/,
      function(match, pattern, base) {
        return base + " Silver " + pattern;
      }
    );

    colour = colour.replace(/^(.+) (Ticked Tabby|Spotted Tabby|Classic Tabby|Mackerel Tabby)$/,
      function(match, base, pattern) {
        if (base.includes("Silver")) return match;
        return base + " Silver " + pattern;
      }
    );

    return colour;
  }

  if (lower.includes("red") || lower.includes("cream") || lower.includes("apricot")) {
    return colour
      .replace(/Red/g, "Red Cameo")
      .replace(/Cream/g, "Cream Cameo")
      .replace(/Apricot/g, "Apricot Cameo");
  }

  return colour + " Smoke";
}

function applyCatBreedSpecificNaming(colour, parsed, namingStyle) {
  const style = String(namingStyle || "").toLowerCase();

  function hasStyle(words) {
    return words.some(word => style.includes(word));
  }

  const isPointed = parsed.Colourpoint === "cs/cs" || colour.startsWith("Pointed ");
  const isBurmese = parsed.Colourpoint === "cb/cb" || colour.startsWith("Burmese ");
  const isMink = parsed.Colourpoint === "cb/cs" || colour.startsWith("Mink ");

  let clean = colour
    .replace(/^Pointed /, "")
    .replace(/^Burmese /, "")
    .replace(/^Mink /, "");

  function renamePoint(base) {
    return base
      .replace(/^Black$/, "Seal Point")
      .replace(/^Blue$/, "Blue Point")
      .replace(/^Chocolate$/, "Chocolate Point")
      .replace(/^Lilac$/, "Lilac Point")
      .replace(/^Cinnamon$/, "Cinnamon Point")
      .replace(/^Fawn$/, "Fawn Point")
      .replace(/^Red$/, "Flame Point")
      .replace(/^Cream$/, "Cream Point")
      .replace(/^Tortie$/, "Tortie Point")
      .replace(/^Blue-Cream Tortie$/, "Blue-Cream Point")
      .replace(/^(.*) Tabby (.*)$/, "$2 Lynx Point")
      .replace(/^(.*) Silver (.*) Tabby$/, "$1 Silver Lynx Point");
  }

  function renameBurmese(base) {
    return base
      .replace(/^Black$/, "Sable")
      .replace(/^Chocolate$/, "Champagne")
      .replace(/^Blue$/, "Blue Burmese")
      .replace(/^Lilac$/, "Platinum")
      .replace(/^Red$/, "Red Burmese")
      .replace(/^Cream$/, "Cream Burmese")
      .replace(/^Tortie$/, "Tortoiseshell Burmese")
      .replace(/^Blue-Cream Tortie$/, "Blue-Cream Burmese");
  }

  function renameMink(base) {
    return base
      .replace(/^Black$/, "Natural Mink")
      .replace(/^Chocolate$/, "Champagne Mink")
      .replace(/^Blue$/, "Blue Mink")
      .replace(/^Lilac$/, "Platinum Mink")
      .replace(/^Cinnamon$/, "Cinnamon Mink")
      .replace(/^Fawn$/, "Fawn Mink")
      .replace(/^Red$/, "Red Mink")
      .replace(/^Cream$/, "Cream Mink")
      .replace(/^Tortie$/, "Tortie Mink")
      .replace(/^Blue-Cream Tortie$/, "Blue-Cream Mink");
  }

  if (isPointed || hasStyle(["siamese", "point", "colourpoint", "colorpoint", "ragdoll", "birman", "himalayan", "balinese"])) {
    const renamed = renamePoint(clean);
    return renamed === clean ? clean + " Point" : renamed;
  }

  if (isBurmese || hasStyle(["burmese"])) {
    const renamed = renameBurmese(clean);
    return renamed === clean ? clean + " Burmese" : renamed;
  }

  if (isMink || hasStyle(["tonkinese", "mink"])) {
    const renamed = renameMink(clean);
    return renamed === clean ? clean + " Mink" : renamed;
  }

  return colour;
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
    return "Bimetallic " + colour;
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
    return colour + " Ticked Tabby";
  }

  if (
    parsed.Spotted === "Sp/Sp" ||
    parsed.Spotted === "Sp/sp"
  ) {
    return colour + " Spotted Tabby";
  }

  if (
    parsed.Tabby === "mc/mc"
  ) {
    return colour + " Classic Tabby";
  }

  if (
    parsed.Tabby === "Mc/Mc" ||
    parsed.Tabby === "Mc/mc"
  ) {
    return colour + " Mackerel Tabby";
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
    return colour + " High White";
  }

  if (parsed.WhiteSpotting === "S/s") {
    return colour + " Bicolour";
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
  return addCatHairTypeName(colour, parsed);
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
  const priority = {
    "O": 1,
    "o": 2,
    "Y": 3,
    "W": 1,
    "w": 2,
    "S": 1,
    "s": 2,
    "I": 1,
    "i": 2,
    "D": 1,
    "d": 2,
    "Dm": 1,
    "dm": 2,
    "B": 1,
    "b": 2,
    "bl": 3,
    "C": 1,
    "cb": 2,
    "cs": 3,
    "ca": 4,
    "c": 5,
    "A": 1,
    "a": 2,
    "Mc": 1,
    "mc": 2,
    "Sp": 1,
    "sp": 2,
    "Ta": 1,
    "ta": 2,
    "Pd": 1,
    "pd": 2,
    "L": 1,
    "l": 2,
    "Re": 1, "re": 2,
    "Cr": 1, "cr": 2,
    "Se": 1, "se": 2,
    "Lp": 1, "lp": 2,
    "Ur": 1, "ur": 2,
    "Tr": 1, "tr": 2,
    "Hr": 1, "hr": 2,
    "Dn": 1, "dn": 2,
    "Lk": 1, "lk": 2,
    "Mk": 1, "mk": 2,
    "Fd": 1, "fd": 2,
    "Cu": 1, "cu": 2,
    "M": 1, "m": 2,
    "Amb": 1,
    "Su": 1,
    "Es": 1,
    "Ch": 1,
    "Wb": 1,
    "Rf": 1,
    "Gl": 1,
    "Kp": 1,
    "n": 2
  };

  return alleles
    .slice()
    .sort((a, b) => {
      const pa = priority[a] || 50;
      const pb = priority[b] || 50;
      if (pa !== pb) return pa - pb;
      return String(a).localeCompare(String(b));
    })
    .join("/");
}

/* =========================
   EXPORTS
========================= */

window.runCatPredictor = runCatPredictor;
window.runCatRoll = runCatRoll;
window.runCatPhenotypeCalculator = runCatPhenotypeCalculator;
window.runCatGenotypeBuilder = runCatGenotypeBuilder;
window.buildAutoCatGenotype = buildAutoCatGenotype;
window.runCatGenetics = runCatGenetics;

window.applyCatPointModifier = applyCatPointModifier;
window.applyCatDiluteModifier = applyCatDiluteModifier;
window.applyCatTabby = applyCatTabby;
window.applyCatWhiteSpotting = applyCatWhiteSpotting;
window.applyCatPolydactyl = applyCatPolydactyl;
window.applyCatHairType = applyCatHairType;
window.applyCatBreedSpecificNaming = applyCatBreedSpecificNaming;
