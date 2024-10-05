import { memo, useState } from "react";
import { JobApplicant } from "~/lib/types";
import { Card, CardContent, CardHeader } from "~/components/ui/Card";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/Avatar";
import { cn } from "~/lib/utils";
import {
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
} from "~/components/ui/Disclosure";
import ApplicantAIPopover from "~/components/Applicant/ApplicantAIPopover";
import ApplicantCardControls from "~/components/Applicant/ApplicantCardControls";
import { CalendarAddAlt, Email, Phone } from "@carbon/icons-react";
import Image from "next/image";

const ApplicantCard = memo(
  ({
    fields,
    showActionButtons,
    id,
  }: {
    fields: JobApplicant;
    showActionButtons: boolean;
    id: string
  }) => {
    const initials =
      fields["Name"]
        ?.split(" ")
        .map((name) => name[0])
        .join("") ?? "";
    const image = fields["Avatar"]?.[0]?.thumbnails?.large?.url;
    const [showMore, setShowMore] = useState(false);

    return (
      <Card className="flex flex-col">
        <CardHeader className="relative p-0">
          <div className="bg-secondary w-full h-12 absolute" />

          <span
            className={cn(
              "text-white text-xs font-medium px-2 py-1 rounded-full inline absolute top-2 right-4 z-1",
              fields["Status"] === "Accepted"
                ? "bg-green-400"
                : fields["Status"] === "Declined"
                ? "bg-red-500"
                : "bg-yellow-400"
            )}
          >
            {fields["Status"]}
          </span>

          <div className="relative p-4">
            <Avatar
              className={cn(
                "size-16 mb-2 border-2",
                fields["Status"] === "Accepted"
                  ? "border-green-400"
                  : fields["Status"] === "Declined"
                  ? "border-red-500"
                  : "border-yellow-400"
              )}
            >
              <AvatarImage className="size-16 object-cover " src={image} asChild>
                {image && <Image src={image} width={64} height={64} alt={fields["Name"] ?? ""} />}
              </AvatarImage>
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>

            <h1 className="font-bold text-lg">{fields["Name"]}</h1>
            <span className="text-sm text-muted-foreground">
              {fields["Position Applied For"]}
            </span>
          </div>
        </CardHeader>
        <CardContent className="grow p-4 !pt-0">
          <div className="h-full flex flex-col justify-between">
            <div className="flex flex-col space-y-4">
              <div className="space-y-2">
                <p className="text-sm flex items-center gap-2">
                  <CalendarAddAlt size={16} className="text-muted-foreground" />
                  {new Date(
                    fields["Application Date"] ?? ""
                  ).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm flex items-center gap-2">
                  <Email size={16} className="text-muted-foreground" />
                  {fields["Email"]}
                </p>
                <p className="text-sm flex items-center gap-2">
                  <Phone size={16} className="text-muted-foreground" />
                  {fields["Phone"]}
                </p>
              </div>
              <Disclosure
                className="border px-3"
                open={showMore}
                onOpenChange={setShowMore}
              >
                <DisclosureTrigger>
                  <button
                    className="w-full py-2 text-left text-sm"
                    type="button"
                  >
                    {showMore ? "Hide Description" : "Show Description"}
                  </button>
                </DisclosureTrigger>
                <DisclosureContent>
                  <div className="overflow-hidden pb-3 text-sm">
                    {fields["Short Description"]}
                  </div>
                </DisclosureContent>
              </Disclosure>
            </div>

            <div className="flex justify-between gap-8 !mt-6">
              {showActionButtons && fields["Name"] && fields["Status"] && (
                <ApplicantCardControls id={id} status={fields["Status"]} />
              )}

              <ApplicantAIPopover position={fields["Position Applied For"]} description={fields["Short Description"]} id={id}/>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

ApplicantCard.displayName = "ApplicantCard";

export default ApplicantCard;
