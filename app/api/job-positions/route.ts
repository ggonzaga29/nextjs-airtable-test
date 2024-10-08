import { NextResponse } from "next/server";
import { readAllJobs } from "~/lib/actions";

export async function GET() {
  const data = await readAllJobs();

  return NextResponse.json(data);
}
