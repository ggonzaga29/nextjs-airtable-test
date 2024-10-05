export const DEFAULT_PAGE_SIZE = 6;

export const views = {
  "All Applicants": "viwwT7Klqc0duz2Bw",
  "Pending Applications": "viw7AyKhpZSOUFB5D",
  "Accepted Applicants": "viwbr8pdJAptyDfv3",
}

export const ALL_APPLICANTS_QUERY = `Job%20Applicants?sort%5B0%5D%5Bfield%5D=Application%20Date&sort%5B0%5D%5Bdirection%5D=desc&view=${views["All Applicants"]}`;

export const ACCEPTED_APPLICANTS_QUERY = `Job%20Applicants?sort%5B0%5D%5Bfield%5D=Application%20Date&sort%5B0%5D%5Bdirection%5D=desc&view=${views["Accepted Applicants"]}`;

export const REJECTED_APPLICANTS_QUERY = `Job%20Applicants?sort%5B0%5D%5Bfield%5D=Application%20Date&sort%5B0%5D%5Bdirection%5D=desc&view=${views["All Applicants"]}&filterByFormula=Status%20%3D%20'Declined'`;
