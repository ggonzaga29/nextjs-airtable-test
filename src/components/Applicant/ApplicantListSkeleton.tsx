import { Skeleton } from "~/components/ui/Skeleton";
import { cn } from "~/lib/utils";

type ApplicantListSkeletonProps = {
  count: number;
  className?: string;
}

const ApplicantListSkeleton: React.FC<ApplicantListSkeletonProps> = ({
  count,
  className
}) => {
  return <>
    {
      Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={index}
          className={
            cn("w-full h-[22rem]", className)
          }
        />
      ))
    }
  </>
};

export default ApplicantListSkeleton;
