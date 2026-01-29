import Image from "next/image";

export const AsideNote = () => {
  return (
    <aside className="
      w-full max-w-3xl mt-8 px-8 pt-8 pb-8
      flex flex-col justify-start
      text-[hsl(226,15%,12%)] bg-[hsl(53,66%,80%)]
      font-semibold
      xl:self-start xl:pt-8 xl:px-16 xl:min-h-[80vh]
      ">
      <header className="
        flex flex-col items-center justify-center
        sm:flex-row sm:items-center sm:justify-start
        mb-16
        ">
        <div>
          <h2 className="
            text-[2.5rem] leading-[2.5rem] font-bold tracking-tight
            sm:text-[4.5rem] sm:leading-[4.5rem]
            ">
            Basic example for nextjs app
          </h2>
          <h3 className="pt-3">
            Clickable prototype with mocked data and responses
          </h3>
        </div>
      </header>
      <article>
        <h3 className="text-[2rem] leading-[2rem] my-4">
          Git repository
        </h3>
        <p className="max-w-md my-4 underline">
          <a href="https://github.com/zlsheepcity/testapp-nextjs-forms-and-tables">
            github.com/zlsheepcity/testapp-nextjs-forms-and-tables
          </a>
        </p>
        <h3 className="text-[2rem] leading-[2rem] my-4">
          This demo public URL
        </h3>
        <p className="max-w-md my-4 underline">
          <a href="https://zlsheepcity.github.io/testapp-nextjs-forms-and-tables/githubdemo/">
            Link
          </a>
        </p>
        <h3 className="text-[2rem] leading-[2rem] my-4">
          Current release
        </h3>
        <p className="max-w-md my-4">
          [1.0.0] v2026.1.29
        </p>
      </article>
      <footer className="max-w-md mt-8 justify-self-end">
        <span className="text-[hsl(359,54%,53%)]">
          Made with love!
        </span>
      </footer>
    </aside>
  );
};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Export

export default AsideNote;
