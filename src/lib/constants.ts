export const DEFAULT_PAGE_SIZE = 6;

export const jobApplicantViews = {
  "All Applicants": "viwwT7Klqc0duz2Bw",
  "Pending Applications": "viw7AyKhpZSOUFB5D",
  "Accepted Applicants": "viwbr8pdJAptyDfv3",
}

export const jobPositionViews = {
  "Grid View": "viwBY171JFx0X8g3A",
}

export const ALL_APPLICANTS_QUERY = `Job%20Applicants?sort%5B0%5D%5Bfield%5D=Application%20Date&sort%5B0%5D%5Bdirection%5D=desc&view=${jobApplicantViews["All Applicants"]}`;

export const ACCEPTED_APPLICANTS_QUERY = `Job%20Applicants?sort%5B0%5D%5Bfield%5D=Application%20Date&sort%5B0%5D%5Bdirection%5D=desc&view=${jobApplicantViews["Accepted Applicants"]}`;

export const REJECTED_APPLICANTS_QUERY = `Job%20Applicants?sort%5B0%5D%5Bfield%5D=Application%20Date&sort%5B0%5D%5Bdirection%5D=desc&view=${jobApplicantViews["All Applicants"]}&filterByFormula=Status%20%3D%20'Declined'`;

export const ALL_JOB_POSITIONS_QUERY = `Job%20Positions?view=${jobPositionViews["Grid View"]}`;
