// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AirtableRecord<T extends Record<string, any>> = {
  id: string;
  createdTime: string;
  fields: T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AirtableResponse<T extends Record<string, any>> = {
  offset: string | undefined;
  records: AirtableRecord<T>[];
}

export type Size = {
  url: string | undefined;
  width: number | undefined;
  height: number | undefined;
}

export type Thumbnails = {
  small: Size | undefined;
  large: Size | undefined;
  full: Size | undefined;
}

export type File = {
  id: string | undefined;
  width: number | undefined;
  height: number | undefined;
  url: string | undefined;
  filename: string | undefined;
  size: number | undefined;
  type: string | undefined;
  thumbnails: Thumbnails | undefined;
}

export type JobApplicant = {
  Avatar: File[] | undefined;
  Email: string | undefined;
  "Position Applied For (Linked Record)": string[] | undefined;
  "Short Description": string | undefined;
  Status: string | undefined;
  Phone: string | undefined;
  Name: string | undefined;
  "Date of Birth": string | undefined;
  "Application Date": string | undefined;
  "Position Applied For": string | undefined;
}
