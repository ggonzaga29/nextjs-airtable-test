import { Suspense } from "react";
import ApplicantList from "~/components/Applicant/ApplicantList";
import { readAcceptedApplicants } from "~/lib/actions";

export default async function AcceptedApplicantsPage() {
  const { records, offset } = await readAcceptedApplicants();

  return (
    <div>
      <Suspense>
        <ApplicantList
          initialData={records}
          initialOffset={offset}
          fetchFn={readAcceptedApplicants}
        />
      </Suspense>
    </div>
  );
}
