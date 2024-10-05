"use server";
import { vertex } from "@ai-sdk/google-vertex";
import { generateText } from "ai";
import { revalidateTag } from "next/cache";
import { airtableFetch } from "~/lib/airtableFetch";
import {
  ACCEPTED_APPLICANTS_QUERY,
  ALL_APPLICANTS_QUERY,
  DEFAULT_PAGE_SIZE,
  REJECTED_APPLICANTS_QUERY,
} from "~/lib/constants";
import { AirtableResponse, JobApplicant } from "~/lib/types";
import { kv } from "@vercel/kv";

const fetchApplicants = async ({
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

  // const retryAttempts = 0;

  try {
    const data = await fetchFn(offsetQuery);

    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);

    /**
     * Handles errors related to Airtable's offset token expiration.
     * Airtable provides an offset token for pagination, which expires after a certain period of time.
     * When the token expires, a "LIST_RECORDS_ITERATOR_NOT_AVAILABLE" error is thrown.
     * This code retries the fetch operation up to 3 times, busting the cache each time.
     * To get the offset token, aka by not passing the offset parameter.
     */
    // if ("error" in error) {
    //   if ("type" in error.error) {
    //     if (error.error.type === "LIST_RECORDS_ITERATOR_NOT_AVAILABLE") {
    //       while (!retryAttempts || retryAttempts < 3) {
    //         retryAttempts += 1;

    //         try {
    //           console.error(
    //             "Retrying and busting cache: ",
    //             "LIST_RECORDS_ITERATOR_NOT_AVAILABLE"
    //           );
    //           revalidateTag("job-applicants");
    //           const firstData = await fetchFn();
    //           if (!firstData.offset) {
    //             break;
    //           }

    //           const data = await fetchFn(`&offset=${firstData.offset}`);
    //           // After successful, revalidating paths will refresh any of these pages
    //           revalidatePath("/");
    //           revalidatePath("/accepted-applicants");
    //           revalidatePath("/rejected-applicants");

    //           return data;
    //         } catch (retryError) {
    //           if (retryAttempts === 2) {
    //             console.error("Max retries reached: ", retryError);
    //             throw retryError;
    //           }
    //         }
    //       }
    //     }
    //   }
  }

  return {
    offset: undefined,
    records: [],
  };
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

export const generateAIRecommendation = async ({
  position,
  description,
  id,
}: {
  position: string;
  description: string;
  id: string;
}) => {
  if (!id || !position || !description) {
    console.error("ID, Position, and Description are required.");
    return;
  }

  const { text } = await generateText({
    model: vertex('gemini-1.5-flash'),
    messages: [
      {
        role: 'system',
        content: `Analyze the applicant’s fit for the role in a brief paragraph. Begin your response with the percentage breakdown of 'Accept: X%' and 'Reject: X%' based on your evaluation. Then, provide a short assessment highlighting key strengths and any noticeable gaps. Conclude your response with 'Conclusion: Accept' or 'Conclusion: Reject' based on your analysis. Submit the response in plain text only`
      },
      {
        role: 'user',
        content: `Position: ${position}\n\nDescription: ${description}`
      }
    ]
  });

  await kv.set(id, text);
  return text;
}

export const getSavedAIRecommendation = async (id: string) => {
  const text = await kv.get<string>(id);
  return text;
};
