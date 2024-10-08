"use client";

import { useCallback, useState, memo } from "react";
import { AirtableRecord, AirtableResponse, JobApplicant } from "~/lib/types";
import { Button } from "~/components/ui/Button";
import { DEFAULT_PAGE_SIZE } from "~/lib/constants";
import ApplicantCard from "~/components/Applicant/ApplicantCard";
import { DownToBottom } from "@carbon/icons-react";
import { Loader } from "lucide-react";
import ApplicantListSkeleton from "~/components/Applicant/ApplicantListSkeleton";

const ApplicantList = memo(
  ({
    initialData,
    initialOffset,
    showActionButtons = false,
  }: {
    initialData: AirtableRecord<JobApplicant>[];
    initialOffset?: string;
    showActionButtons?: boolean;
  }) => {
    const [data, setData] =
      useState<AirtableRecord<JobApplicant>[]>(initialData);
    const [offset, setOffset] = useState<string | undefined>(initialOffset);
    const [isLoading, setIsLoading] = useState(false);

    const handleLoadMore = useCallback(async () => {
      if (isLoading) return; // Prevent Race Condition
      setIsLoading(true);

      const offsetQuery = offset ? `&offset=${offset}` : "";
      const response = await fetch(
        `/api/applicants?pageSize=${DEFAULT_PAGE_SIZE}${offsetQuery}`
      );
      const { records, offset: newOffset } =
        (await response.json()) as AirtableResponse<JobApplicant>;

      setData((prevData) => [...prevData, ...records]);
      setOffset(newOffset);
      setIsLoading(false);
    }, [isLoading, offset]);

    return (
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map(({ fields, id }) => {
            return (
              <ApplicantCard
                key={id}
                fields={fields}
                id={id}
                showActionButtons={showActionButtons}
              />
            );
          })}
          {isLoading && <ApplicantListSkeleton count={DEFAULT_PAGE_SIZE} />}
        </div>

        <div className="flex items-center justify-center mt-8">
          {offset && (
            <Button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="flex gap-2 items-center"
            >
              {!isLoading ? (
                <DownToBottom size={16} />
              ) : (
                <Loader size={16} className="animate-spin" />
              )}
              Load More
            </Button>
          )}
        </div>
      </section>
    );
  }
);

ApplicantList.displayName = "ApplicantList";

export default ApplicantList;
