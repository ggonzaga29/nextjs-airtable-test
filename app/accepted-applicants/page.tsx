import ApplicantList from "~/components/Applicant/ApplicantList";
import { readAcceptedApplicants } from "~/lib/actions";

export default async function AcceptedApplicantsPage() {
  const { records, offset } = await readAcceptedApplicants();

  return (
    <div>
      {/* <h1 className="text-xl font-bold mb-4">Accepted Applicants</h1> */}
      <ApplicantList
        initialData={records}
        initialOffset={offset}
        fetchFn={readAcceptedApplicants}
      />
    </div>
  );
}
