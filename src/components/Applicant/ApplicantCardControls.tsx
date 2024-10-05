'use client';

import { CheckmarkOutline, SubtractAlt } from "@carbon/icons-react";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/Button";
import { patchApplicantStatus } from "~/lib/actions";
import { cn } from "~/lib/utils";
import { toast } from "sonner";

const ApplicantCardControls = ({ id, status }: { id: string, status: string }) => {
  const [isRejecting, setIsRejecting] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);

  const handleReject = async (id: string) => {
    setIsRejecting(true);

    const req = patchApplicantStatus(
      id,
      {
        Status: "Declined",
      },
    );

    toast.promise(
      async () => {
        await req;
      },
      {
        loading: "Rejecting...",
        success: () => {
          setIsRejecting(false);
          return "Applicant Rejected";
        },
        error: "Failed to Reject Applicant",
      }
    );
  };

  const handleAccept = async (id: string) => {
    setIsAccepting(true);

    const req = patchApplicantStatus(
      id,
      {
        Status: "Accepted",
      },
    );

    toast.promise(async () => {
      await req;
      setIsAccepting(true);
    }, {
      loading: "Accepting...",
      success: () => {
        setIsAccepting(false);
        return "Applicant Accepted";
      },
      error: "Failed to Accept Applicant",
    })

  };

  return (
    <div className="flex gap-2 grow">
      <Button
        variant="secondary"
        className={cn(
          "hover:bg-destructive hover:text-destructive-foreground flex items-center justify-center gap-2 grow transition-colors",
          isRejecting ? "bg-destructive text-white" : ""
        )}
        onClick={() => handleReject(id)}
        disabled={isAccepting || isRejecting || status === "Declined"}
      >
        {isRejecting ? (
          <Loader size={16} className="animate-spin" />
        ) : (
          <SubtractAlt size={16} />
        )}
        Reject
      </Button>
      <Button
        variant="secondary"
        className={cn(
          "hover:bg-green-500 hover:text-destructive-foreground flex items-center justify-center gap-2 grow transition-colors",
          isAccepting ? "bg-green-500 text-white" : ""
        )}
        onClick={() => handleAccept(id)}
        disabled={isAccepting || isRejecting || status === "Accepted"}
      >
        {isAccepting ? (
          <Loader size={16} className="animate-spin" />
        ) : (
          <CheckmarkOutline size={16} />
        )}
        Accept
      </Button>
    </div>
  );
};

export default ApplicantCardControls;
