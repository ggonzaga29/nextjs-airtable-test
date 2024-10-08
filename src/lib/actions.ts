"use server";
import { revalidateTag } from "next/cache";
import { airtableFetch } from "~/lib/airtableFetch";
import {
  ACCEPTED_APPLICANTS_QUERY,
  ALL_APPLICANTS_QUERY,
  ALL_JOB_POSITIONS_QUERY,
  DEFAULT_PAGE_SIZE,
  REJECTED_APPLICANTS_QUERY,
} from "~/lib/constants";
import { AirtableRecord, AirtableResponse, JobApplicant, JobPosition } from "~/lib/types";
import { kv } from "@vercel/kv";
import { applicantFormSchema, ApplicantFormSchema } from "~/lib/schema";

export const fetchApplicants = async ({
  query,
  tags,
  pageSize,
  offset,
}: {
  query: string;
  tags: string[];
  pageSize: number;
  offset?: string;
}): Promise<AirtableResponse<JobApplicant>> => {
  const offsetQuery = offset ? `&offset=${offset}` : "";
  const fetchFn = (offset?: string) =>
    airtableFetch<AirtableResponse<JobApplicant>>(
      `${query}&pageSize=${pageSize}${offset ?? ""}`,
      {
        next: {
          tags,
          revalidate: 240,
        },
      }
    );

  try {
    const data = await fetchFn(offsetQuery);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);
    return {
      offset: undefined,
      records: [],
    };
  }
};

export const readAllApplicants = (
  pageSize: number = DEFAULT_PAGE_SIZE,
  offset?: string,
  tags?: string[]
) =>
  fetchApplicants({
    query: ALL_APPLICANTS_QUERY,
    tags: ["job-applicants", "all", ...(tags || [])],
    pageSize,
    offset,
  });

export const readAcceptedApplicants = (
  pageSize: number = DEFAULT_PAGE_SIZE,
  offset?: string,
  tags?: string[]
) =>
  fetchApplicants({
    query: ACCEPTED_APPLICANTS_QUERY,
    tags: ["job-applicants", "accepted", ...(tags || [])],
    pageSize,
    offset,
  });

export const readRejectedApplicants = (
  pageSize: number = DEFAULT_PAGE_SIZE,
  offset?: string,
  tags?: string[]
) =>
  fetchApplicants({
    query: REJECTED_APPLICANTS_QUERY,
    tags: ["job-applicants", "rejected", ...(tags || [])],
    pageSize,
    offset,
  });

export const patchApplicantStatus = async (
  id: string,
  fields: Partial<JobApplicant>,
) => {
  const body = {
    records: [
      {
        id,
        fields,
      },
    ],
  };

  try {
    const data = await airtableFetch<JobApplicant>("Job%20Applicants", {
      method: "PATCH",
      body: JSON.stringify(body),
    });

    revalidateTag("job-applicants");

    return data;
  } catch (e) {
    console.error(e);
  }
};

// Job Positions
export const readAllJobs = async () => {
  try {
    const { records, offset } = await airtableFetch<AirtableResponse<JobPosition>>(ALL_JOB_POSITIONS_QUERY, {
      next: {
        tags: ["job-positions"],
        revalidate: 240,
      }
    });
  
    return { records, offset };
  } catch (e) {
    console.error(e);
    return { records: [], offset: undefined };
  }
}

export const readJob = async (id: string) => {
  try {
    const job = await airtableFetch<AirtableRecord<JobPosition>>(`Job%20Positions/${id}`, {
      next: {
        tags: ["job-positions"],
        revalidate: 240,
      }
    });

    return job;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export const generateAIRecommendation = async ({
  position,
  description,
  id,
}: {
  position: string;
  description: string;
  id: string;
}) => {
  type ResponseType = {
    text: string
  }

  if (!id || !position || !description) {
    console.error("ID, Position, and Description are required.");
    return;
  }

  const url = process.env.ELDFELL_URL;
  const key = process.env.ELDFELL_API_KEY;

  if (!url || !key) {
    console.error("ELDFELL_URL and ELDFELL_API_KEY are required.");
    return;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        prompt: `Position: ${position}\n\nDescription: ${description}`
      })
    })
  
    const { text } = await response.json() as ResponseType;

    if(!text) {
      throw new Error();
    }
  
    await kv.set(id, text);
    return text;
  } catch(e) {
    console.error(e);
    return 'Error generating AI recommendation';
  }
}

export const getSavedAIRecommendation = async (id: string) => {
  const text = await kv.get<string>(id);
  return text;
};

export const createApplicant = async (fields: ApplicantFormSchema) => {
  const { data, success, error } = applicantFormSchema.safeParse(fields);

  if (!success || error) {
    throw error;
  }

  const { job_position, name, email, phone, short_description, date_of_birth } = data;

  const formattedDateOfBirth = new Date(date_of_birth).toISOString().split('T')[0];


  const body = {
    records: [
      {
        fields: {
          "Name": name,
          "Email": email,
          "Phone": phone,
          "Application Date": new Date().toISOString().split('T')[0],
          "Short Description": short_description,
          "Date of Birth": formattedDateOfBirth,
          "Status": 'Pending',
          "Position Applied For (Linked Record)": [
            job_position
          ]
        },
      },
    ],
  };

  console.log(JSON.stringify(body));

  const response = await airtableFetch<JobApplicant>("Job%20Applicants", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if(response) {
    revalidateTag("job-applicants");
    return response;
  }

  throw new Error('Error creating applicant');
}

export const deleteApplicant = (id: string) => {
  const url = `Job%20Applicants?records[]=${id}`;
  console.log(id)

  try {
    const response = airtableFetch<{
      records: {
        id: string;
        deleted: boolean;
      }[]
     }>(url, {
      method: "DELETE",
    });

    revalidateTag("job-applicants");

    return response;
  } catch (e) {
    console.error(e);
    return []
  }
} 
