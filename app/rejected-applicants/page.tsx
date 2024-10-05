import { Suspense } from "react";
import ApplicantList from "~/components/Applicant/ApplicantList";
import { readRejectedApplicants } from "~/lib/actions";

export default async function AcceptedApplicantsPage() {
  const { records, offset } = await readRejectedApplicants();

  return (
    <div>
      <Suspense>
        <ApplicantList
          initialData={records}
          initialOffset={offset}
          fetchFn={readRejectedApplicants}
        />
      </Suspense>
    </div>
  );
}
