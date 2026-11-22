export const LEVELS = ["low", "medium", "high"];

const POINTS = { low: 1, medium: 2, high: 3 };

// Priority score = likelihood x impact, banded 1-2 Low, 3-4 Medium, 6-9 High.
export function riskScore(likelihood, impact) {
  return POINTS[likelihood] * POINTS[impact];
}

export function riskBand(score) {
  if (score <= 2) return "Low";
  if (score <= 4) return "Medium";
  return "High";
}

export const BAND_ADVICE = {
  Low: "Accept it for now and check it again at the yearly policy review.",
  Medium: "Plan a fix this quarter and give it an owner.",
  High: "Act now. Give it an owner and a fix date this month.",
};
