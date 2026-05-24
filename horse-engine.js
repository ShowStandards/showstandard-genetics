/* =========================
   EQUINE GENETICS ENGINE
========================= */

function runHorseGenetics(inputs) {
  const mode = inputs.mode;

  if (mode === "predictor") return runHorsePredictor(inputs);
  if (mode === "roll") return runHorseRoll(inputs);
  if (mode === "phenotypeFromGenotype") return runHorsePhenotypeCalculator(inputs);
  if (mode === "genotypeFromPhenotype") return runHorseGenotypeBuilder(inputs);

  return "Invalid horse genetics mode.";
}

function runHorsePredictor(inputs) {
  return `
    <h4>Horse Predictor</h4>
    <p>Horse predictor engine coming next.</p>
  `;
}

function runHorseRoll(inputs) {
  return `
    <h4>Horse Roll</h4>
    <p>Horse foal roller coming next.</p>
  `;
}

function runHorsePhenotypeCalculator(inputs) {
  const genotypeText
