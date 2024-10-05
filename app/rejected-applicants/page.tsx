import ApplicantList from "~/components/Applicant/ApplicantList";
import { readRejectedApplicants } from "~/lib/actions";

export default async function AcceptedApplicantsPage() {
  const { records, offset } = await readRejectedApplicants();

  return (
    <div>
      {/* <h1 className="text-xl font-bold mb-4">Rejected Applicants</h1> */}
      <ApplicantList
        initialData={records}
        initialOffset={offset}
        fetchFn={readRejectedApplicants}
      />
    </div>
  );
}
