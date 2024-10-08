import Link from "next/link";

export default function JobsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="dark">
        <header className="w-full border py-4 bg-background text-foreground border-b px-6">
          <div className="w-full max-w-[1140px] mx-auto flex flex-col justify-between gap-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="size-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 200 170"
                  >
                    <path
                      fill="#FCB400"
                      d="M90.039 12.368 24.079 39.66c-3.667 1.519-3.63 6.729.062 8.192l66.235 26.266a24.58 24.58 0 0 0 18.12 0l66.236-26.266c3.69-1.463 3.729-6.673.06-8.191l-65.958-27.293a24.58 24.58 0 0 0-18.795 0"
                    ></path>
                    <path
                      fill="#18BFFF"
                      d="M105.312 88.46v65.617c0 3.12 3.147 5.258 6.048 4.108l73.806-28.648a4.42 4.42 0 0 0 2.79-4.108V59.813c0-3.121-3.147-5.258-6.048-4.108l-73.806 28.648a4.42 4.42 0 0 0-2.79 4.108"
                    ></path>
                    <path
                      fill="#F82B60"
                      d="m88.078 91.846-21.904 10.576-2.224 1.075-46.238 22.155c-2.93 1.414-6.672-.722-6.672-3.978V60.088c0-1.178.604-2.195 1.414-2.96a5 5 0 0 1 1.12-.84c1.104-.663 2.68-.84 4.02-.31L87.71 83.76c3.564 1.414 3.844 6.408.368 8.087"
                    ></path>
                    <path
                      fill="rgba(0, 0, 0, 0.25)"
                      d="m88.078 91.846-21.904 10.576-53.72-45.295a5 5 0 0 1 1.12-.839c1.104-.663 2.68-.84 4.02-.31L87.71 83.76c3.564 1.414 3.844 6.408.368 8.087"
                    ></path>
                  </svg>
                </span>
                <Link href="/">
                  <span className="font-bold text-2xl">
                    Available Jobs
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </header>
      </div>

      <main className="my-6 px-6">
        <div className="w-full max-w-[1140px] mx-auto">{children}</div>
      </main>
    </>
  );
}

