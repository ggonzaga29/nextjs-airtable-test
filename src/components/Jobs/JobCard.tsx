import ApplicantFormDialog from "~/components/ApplicantForm/ApplicantFormDialog";
import { Card, CardContent } from "~/components/ui/Card";
import { AirtableRecord, JobPosition } from "~/lib/types";

const JobCard = ({ job }: { job: AirtableRecord<JobPosition> }) => {
  const salaryRange = Number(job.fields["Salary Range"]);
  const formattedSalaryRange = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(salaryRange);

  return (
    <Card>
      <CardContent className="p-4 flex flex-col justify-between gap-4 h-full">
        <div className="space-y-2">
          <h3 className="font-bold text-lg">{job.fields["Position Title"]}</h3>
          <span className="text-sm">{formattedSalaryRange}</span>
          <p className="text-sm text-muted-foreground">
            {job.fields["Job Description"]}
          </p>

          <span className="text-sm text-muted-foreground">
            Apply before: {job.fields["Application Deadline"]}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <ApplicantFormDialog job={job} />
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
