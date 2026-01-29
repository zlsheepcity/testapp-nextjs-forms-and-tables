import Image from "next/image";

export const AsideNote = () => {
  return (
    <aside className="
      w-full max-w-3xl mt-8 px-8 pt-8 pb-24
      text-[hsl(226,15%,12%)] bg-[hsl(53,66%,80%)]
      font-semibold
      sm:pt-[0]
      xl:self-start xl:pt-8 xl:px-16
      ">
      <header className="
        flex flex-col items-center justify-center
        sm:flex-row sm:items-center sm:justify-start
        ">
        <div>
          <h2 className="
            text-[3rem] leading-[3rem] font-bold tracking-tight
            sm:text-[4.5rem] sm:leading-[4.5rem]
            ">
            Don<span className="text-[hsl(359,54%,53%)]">'</span>t Leave
          </h2>
          <h3 className="pt-3">
            There is still much to improve in the future
          </h3>
        </div>
        <Image
          className=""
          src="/art/exit.svg"
          alt=":)"
          width={300}
          height={300}
          priority
        />
      </header>
      <article>
        <h3 className="text-[2rem] leading-[2rem] my-4">
          Delete table item (the pair)
        </h3>
        <p className="max-w-md my-4">
          Handling the remaining space after deletion is a challenging UX task. What behavior is optimal? Should other elements perform a "dance" to fill the gap? 
        </p>
        <h3 className="text-[2rem] leading-[2rem] my-4">
          Implement table search
        </h3>
        <p className="max-w-md my-4">
          Not a big effort, just another routine to do.
        </p>
        <h3 className="text-[2rem] leading-[2rem] my-4">
          Maybe it's worth sorting the values?
        </h3>
        <p className="max-w-md my-4">
          Two-dimensial sorting is another tricky UX challenge!
        </p>
        <h3 className="text-[2rem] leading-[2rem] my-4">
          Don't go away! Stay in touch!
        </h3>
        <p className="max-w-md my-4">
          Current release is marked as 2026.1.29
        </p>
      </article>
    </aside>
  );
};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Export

export default AsideNote;
