"use client";

import { useCallback, useState, memo } from "react";
import { AirtableRecord, AirtableResponse, JobApplicant } from "~/lib/types";
import { Button } from "~/components/ui/Button";
import { DEFAULT_PAGE_SIZE } from "~/lib/constants";
import ApplicantCard from "~/components/Applicant/ApplicantCard";
import { Skeleton } from "~/components/ui/Skeleton";
import { DownToBottom } from "@carbon/icons-react";
import { Loader } from "lucide-react";

const ApplicantList = memo(
  ({
    initialData,
    initialOffset,
    showActionButtons = false,
    fetchFn,
  }: {
    initialData: AirtableRecord<JobApplicant>[];
    initialOffset?: string;
    showActionButtons?: boolean;
    fetchFn: (
      pageSize?: number,
      offset?: string,
      tags?: string[]
    ) => Promise<AirtableResponse<JobApplicant>>;
  }) => {
    const [data, setData] =
      useState<AirtableRecord<JobApplicant>[]>(initialData);
    const [offset, setOffset] = useState<string | undefined>(initialOffset);
    const [isLoading, setIsLoading] = useState(false);

    const handleLoadMore = useCallback(async () => {
      if (isLoading) return; // Prevent Race Condition
      setIsLoading(true);

      const { records, offset: newOffset } = await fetchFn(
        DEFAULT_PAGE_SIZE,
        offset
      );

      setData([...data, ...records]);
      setOffset(newOffset);

      setIsLoading(false);
    }, [data, fetchFn, isLoading, offset]);

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
          {isLoading &&
            Array.from({ length: DEFAULT_PAGE_SIZE }).map(() => {
              return (
                <Skeleton key={Math.random()} className="w-full h-[18rem] " />
              );
            })}
        </div>

        <div className="flex items-center justify-center mt-8">
          {offset && (
            <Button onClick={handleLoadMore} disabled={isLoading} className="flex gap-2 items-center">
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
