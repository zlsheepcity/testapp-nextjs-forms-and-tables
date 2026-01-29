import Image from "next/image";

export const AsideNote = () => {
  return (
    <aside className="
      w-full max-w-3xl mt-8 px-8 pt-8 pb-24
      text-[hsl(226,15%,12%)] bg-[hsl(53,66%,80%)]
      font-semibold
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
            Do You Know?
          </h2>
          <h3 className="pt-3">
            [Almost] any login will pass
          </h3>
        </div>
        <Image
          className=""
          src="/art/information.svg"
          alt=":)"
          width={300}
          height={300}
          priority
        />
      </header>
      <article>
        <p className="max-w-md my-4">
          But if you want to check the negative response, you are welcome to copy and paste the following values:
        </p>
        <h3 className="text-[2rem] leading-[2rem] my-4">
          incorrect@email.com
        </h3>
        <h3 className="text-[2rem] leading-[2rem] my-4">
          incorrect-password
        </h3>
      </article>
    </aside>
  );
};

export const AsideNoteOTP = () => {
  return (
    <aside className="
      w-full max-w-3xl mt-8 px-8 pt-8 pb-24
      text-[hsl(226,15%,12%)] bg-[hsl(53,66%,80%)]
      font-semibold
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
            You are 
            <wbr/> <span className="text-[hsl(359,54%,53%)]">not</span>
            <wbr/> <span className="text-[hsl(359,54%,53%)]">not</span>ified
          </h2>
          <h3 className="pt-3">
            With One-Time-Password code
          </h3>
        </div>
        <Image
          className=""
          src="/art/notification.svg"
          alt=":)"
          width={300}
          height={300}
          priority
        />
      </header>
      <article>
        <p className="max-w-md my-4">
          As you might guess, this is not a bug, but a feature.
          Simply enter any four digits to continue. Except 
          <wbr/> <span className="text-[hsl(359,54%,53%)]">four zeroes</span>,
          as this could trigger an incorrect code response.
        </p>
        <p className="max-w-md my-4">
          But if you want to test the copy-paste behavior, your code might look like this:
        </p>
        <h3 className="text-[4rem] leading-[4rem] font-bold my-4 text-[hsl(359,54%,53%)]">
          5446
        </h3>
      </article>
    </aside>
  );
};


// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Export

export default AsideNote;
