import { readAllJobs } from "~/lib/actions";
import JobCard from "~/components/Jobs/JobCard";

export default async function JobsPage() {
  const { records } = await readAllJobs();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {records.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
