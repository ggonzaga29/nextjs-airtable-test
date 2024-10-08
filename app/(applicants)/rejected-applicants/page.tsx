import { Suspense } from "react";
import ApplicantList from "~/components/Applicant/ApplicantList";
import ApplicantListSkeleton from "~/components/Applicant/ApplicantListSkeleton";
import { readRejectedApplicants } from "~/lib/actions";
import { DEFAULT_PAGE_SIZE } from "~/lib/constants";

export default async function AcceptedApplicantsPage() {
  const { records, offset } = await readRejectedApplicants();

  return (
    <div>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ApplicantListSkeleton count={DEFAULT_PAGE_SIZE} />
          </div>
        }
      >
        <ApplicantList
          initialData={records}
          initialOffset={offset}
        />
      </Suspense>
    </div>
  );
}
