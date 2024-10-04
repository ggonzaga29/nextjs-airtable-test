'use server';
import { airtableFetch } from "~/lib/airtableFetch";
import { AirtableResponse, JobApplicant } from "~/lib/types";

export const readAllApplicants = async () => {
  try {
    const data = await airtableFetch<AirtableResponse<JobApplicant>>("Job Applicants", {
      next: {
        tags: ["job-applicants"],
      }
    });

    return data;
  } catch (error) {
    console.error(error);
    return {
      records: [],
    };
  }
}
