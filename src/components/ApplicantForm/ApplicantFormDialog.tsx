'use client';

import { Add } from "@carbon/icons-react";
import { Button } from "~/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/Dialog";
import { AirtableRecord, JobPosition } from "~/lib/types";
import { useState } from "react";
import ApplicantForm from "~/components/ApplicantForm/ApplicantForm";

const ApplicantFormDialog = ({ job }: { job: AirtableRecord<JobPosition> }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogTrigger asChild>
      <Button size="sm" variant="outline" className="flex items-center gap-2">
        <Add size={16} />
        Apply
      </Button>
    </DialogTrigger>
    <DialogContent className="bg-white">
      <DialogHeader>
        <DialogTitle>Apply for {job.fields["Position Title"]}</DialogTitle>
      </DialogHeader>
      <ApplicantForm job={job} setIsOpen={setIsOpen} />
    </DialogContent>
  </Dialog>;
};

export default ApplicantFormDialog;
