import { NextRequest, NextResponse } from "next/server";
import {
  ACCEPTED_APPLICANTS_QUERY,
  ALL_APPLICANTS_QUERY,
  DEFAULT_PAGE_SIZE,
  REJECTED_APPLICANTS_QUERY,
} from "~/lib/constants";
import { fetchApplicants } from "~/lib/actions";

type ApplicantType = "all" | "accepted" | "rejected";

const queries = {
  all: ALL_APPLICANTS_QUERY,
  accepted: ACCEPTED_APPLICANTS_QUERY,
  rejected: REJECTED_APPLICANTS_QUERY,
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const applicantType = (searchParams.get("type") as ApplicantType) ?? "all";
  const pageSize = searchParams.get("pageSize") ?? DEFAULT_PAGE_SIZE;
  const offset = searchParams.get("offset") ?? undefined;

  const { records, offset: nextOffset } = await fetchApplicants({
    query: queries[applicantType],
    pageSize: Number(pageSize),
    tags: ["job-applicants", applicantType],
    offset,
  });

  return NextResponse.json({
    records,
    offset: nextOffset,
  });
}
