import Image from "next/image";
import { AsideNote } from './note';

export default function PageHome() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-start font-sans xl:flex-row xl:justify-center xl:items-start">
      <main className="flex w-full max-w-3xl flex-col items-center py-8 px-8 sm:items-start">
    

        <nav className="w-full max-w-3xl grid items-start">
          <ul className="
            w-fit
            grid grid-cols-2 grid-rows-2 gap-8 items-center justify-center
            text-center font-semibold leading-10 tracking-tight
            sm:text-3xl
            ">
            <li>
              <a 
                className="
                  w-fit flex flex-col-reverse items-center justify-center p-2
                  border-[0.2em] border-white rounded-[1em]
                  text-black bg-blue-300 hover:bg-blue-400
                "
                href="/registration">
                <span>
                  Registration
                </span>
                <Image
                  className=""
                  src="/art/registration.svg"
                  alt=":)"
                  width={220}
                  height={220}
                  priority
                />
              </a>
            </li>
            <li>
              <a 
                className="
                  w-fit flex flex-col-reverse items-center justify-center p-2
                  border-[0.2em] border-white rounded-[1em]
                  text-black bg-pink-300 hover:bg-pink-400
                "
                href="/login">
                <span>
                  Log In
                </span>
                <Image
                  className=""
                  src="/art/login.svg"
                  alt=":)"
                  width={220}
                  height={220}
                  priority
                />
              </a>
            </li>
            <li>
              <a 
                className="
                  w-fit flex flex-col-reverse items-center justify-center p-2
                  border-[0.2em] border-white rounded-[1em]
                  text-black bg-amber-300 hover:bg-amber-400
                "
                href="/datatable">
                <span>
                  Data Table
                </span>
                <Image
                  className=""
                  src="/art/datatable.svg"
                  alt=":)"
                  width={220}
                  height={220}
                  priority
                />
              </a>
            </li>
            <li>
              <a 
                className="
                  w-fit flex flex-col-reverse items-center justify-center p-2
                  border-[0.2em] border-white rounded-[1em]
                  text-black bg-emerald-300 hover:bg-emerald-400
                "
                href="/about">
                <span>
                  About
                </span>
                <Image
                  className=""
                  src="/art/about.svg"
                  alt=":)"
                  width={220}
                  height={220}
                  priority
                />
              </a>
            </li>
          </ul>
        </nav>

      </main>
      
      <AsideNote />
    </div>
  );
}
