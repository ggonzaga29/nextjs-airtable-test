// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AirtableRecord<T extends Record<string, any>> = {
  id: string;
  createdTime: string;
  fields: T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AirtableResponse<T extends Record<string, any>> = {
  records: AirtableRecord<T>[];
}

export type Size = {
  url: string | null | undefined;
  width: number | null | undefined;
  height: number | null | undefined;
}

export type Thumbnails = {
  small: Size | null | undefined;
  large: Size | null | undefined;
  full: Size | null | undefined;
}

export type File = {
  id: string | null | undefined;
  width: number | null | undefined;
  height: number | null | undefined;
  url: string | null | undefined;
  filename: string | null | undefined;
  size: number | null | undefined;
  type: string | null | undefined;
  thumbnails: Thumbnails | null | undefined;
}

export type JobApplicant = {
  Avatar: File[] | null | undefined;
  Email: string | null | undefined;
  "Position Applied For (Linked Record)": string[] | null | undefined;
  "Short Description": string | null | undefined;
  Status: string | null | undefined;
  Phone: string | null | undefined;
  Name: string | null | undefined;
  "Date of Birth": string | null | undefined;
  "Application Date": string | null | undefined;
  "Position Applied For": string | null | undefined;
}
