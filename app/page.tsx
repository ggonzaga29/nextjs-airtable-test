import ApplicantList from "~/components/Applicant/ApplicantList";
import { readAllApplicants } from "~/lib/actions";

export default async function Home() {
  const { records, offset } = await readAllApplicants();

  return (
    <div>
      {/* <h1 className="text-xl font-bold mb-4">All Applicants</h1> */}

      <ApplicantList
        initialData={records}
        initialOffset={offset}
        fetchFn={readAllApplicants}
        showActionButtons
      />
    </div>
  );
}

