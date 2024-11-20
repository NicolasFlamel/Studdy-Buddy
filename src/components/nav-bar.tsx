import { auth, signOut } from 'auth';
import Image from 'next/image';
import Link from 'next/link';

const NavBar = async () => {
  const session = await auth();

  return (
    <header className="flex w-full nav justify-center">
      <nav className="flex max-w-screen-xl w-full">
        <Image
          id="nav-logo"
          src="/images/nav-logo.png"
          alt="Studdy Buddy logo"
          width={713}
          height={55}
        />
        <section id="nav-btn">
          <Link href="/">
            <button className="btn">Home</button>
          </Link>
          {!session?.user ? (
            <Link className="btn" href="/login">
              Login Page
            </Link>
          ) : (
            <>
              <Link href="/profile">
                <button className="btn">My Profile</button>
              </Link>
              <Link className="btn" href="/assessment">
                Update assessments
              </Link>
              <form
                action={async () => {
                  'use server';
                  await signOut();
                }}
              >
                <button className="btn">Signout</button>
              </form>
            </>
          )}
        </section>
      </nav>
    </header>
  );
};

export default NavBar;
