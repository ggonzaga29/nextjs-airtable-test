"use client";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "~/components/ui/Form";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Textarea } from "~/components/ui/Textarea";
import { applicantFormSchema } from "~/lib/schema";
import { AirtableRecord, JobPosition } from "~/lib/types";
import { createApplicant } from "~/lib/actions";
import { toast } from "sonner";

type FormFields = z.infer<typeof applicantFormSchema>;

const ApplicantForm = ({
  job,
  setIsOpen,
}: {
  job: AirtableRecord<JobPosition>;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormFields>({
    resolver: zodResolver(applicantFormSchema),
    defaultValues: {
      job_position: job.id,
    },
  });

  const { handleSubmit, control, setError } = form;

  const onSubmit = (values: FormFields) => {
    startTransition(async () => {
      try {
        await createApplicant(values);
        setIsOpen(false);
        toast.success("Application submitted successfully.");
      } catch (error) {
        console.error(error);
        setError("name", {
          type: "manual",
          message: "Failed to submit the form. Please try again.",
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <FormField
          control={control}
          name="job_position"
          render={({ field }) => (
            <FormItem className="col-span-2 hidden">
              <FormControl>
                <Input {...field} type="hidden" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Enter the full name of the applicant.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Enter the applicant&apos;s email address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Enter the applicant&apos;s phone number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="date_of_birth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={
                    field.value
                      ? new Date(field.value).toISOString().split("T")[0]
                      : ""
                  }
                />
              </FormControl>
              <FormDescription>
                Enter the applicant&apos;s date of birth.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="short_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                Provide a brief description of the applicant&apos;s background
                and qualifications.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="col-span-2" type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ApplicantForm;
