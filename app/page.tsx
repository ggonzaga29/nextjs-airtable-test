import { readAllApplicants } from "~/lib/actions";

export default async function Home() {
  const { records } = await readAllApplicants();

  return (
    <div>
      {records.map(({ fields, id }) => (
        <div key={id}>
          <div key={fields["Name"]}>
            <h1>{fields["Name"]}</h1>
            <p>{fields["Email"]}</p>
            <p>{fields["Phone"]}</p>
            <p>{fields["Short Description"]}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

