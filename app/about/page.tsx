export default function PageAbout() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-8 px-8 sm:items-start">

        <header className="flex gap-4 mb-8">
          <div className="max-w-xs text-2xl font-semibold leading-10 tracking-tight">
            <a href="/" className="underline decoration-2">
              Home
            </a>
          </div>
          <h1 className="text-3xl font-semibold leading-10 tracking-tight">
            About
          </h1>
        </header>

        <article className="my-8">

          <h2 className="my-4 text-3xl font-semibold leading-10 tracking-tight">
            Abstract            
          </h2>

          <p className="my-2">
            Basic example for nextjs app.
          </p>

          <p className="my-2">
            Git repository:<br/>
            <a href="https://github.com/zlsheepcity/testapp-nextjs-forms-and-tables"
              className="underline"
              >
              https://github.com/zlsheepcity/testapp-nextjs-forms-and-tables
            </a>
          </p>

        </article>

      </main>
    </div>
  );
};
