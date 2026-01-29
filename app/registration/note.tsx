import Image from "next/image";

export const AsideNote = () => {
  return (
    <aside className="
      w-full max-w-3xl mt-8 px-8 pt-[0] pb-24
      text-[hsl(226,15%,12%)] bg-[hsl(53,66%,80%)]
      font-semibold
      xl:self-start xl:pt-0 xl:px-16
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
            Don't worry
          </h2>
          <h3 className="pt-3">
            Form data will not be saved
          </h3>
        </div>
        <Image
          className=""
          src="/art/validation.svg"
          alt=":)"
          width={300}
          height={300}
          priority
        />
      </header>
      <article>
        <h3 className="text-[2rem] leading-[2rem] my-4">
          Just a mock request
        </h3>
        <p className="max-w-md my-4">
          This is intended to test the validation and usability features of a typical user registration form.
        </p>
      </article>
    </aside>
  );
};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Export

export default AsideNote;
