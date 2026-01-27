export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-16 px-16 bg-white dark:bg-black sm:items-start">

        <h1>About</h1>

        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/registration">Registration</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/datatable">Data Table</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </nav>

      </main>
    </div>
  );
}
