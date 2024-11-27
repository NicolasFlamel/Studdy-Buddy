import { Link } from '@nextui-org/link';
import { Button } from '@nextui-org/button';

interface SearchingModalProps {
  found: boolean;
}
const SearchingModal = ({ found }: SearchingModalProps) => {
  console.log('SearchingModal');
  if (found)
    // User found Modal
    return (
      <article
        tabIndex={-1}
        aria-labelledby="found-user-title"
        aria-hidden="true"
      >
        <section>
          <section>
            <section>
              <h2>User found</h2>
            </section>
            <section>
              {`A user was found. Click on "Connect" to to connect with them.
          Room may fill up before you connect.`}
            </section>
            <section>
              <Link href="/">Go Home</Link>
              <Button type="button">Connect</Button>
            </section>
          </section>
        </section>
      </article>
    );
  // Searching for user Modal
  return (
    <article tabIndex={-1} aria-labelledby="no-user-title" aria-hidden="true">
      <section>
        <section>
          <section>
            <h2>No user found</h2>
          </section>
          <section>
            There is currently no users to match you with. Page will
            automatically refresh if a user is found
          </section>
          <section>
            <Link href="/">Go Home</Link>
            <Button type="button" disabled>
              <span role="status" aria-hidden="true"></span>
              Searching...
            </Button>
          </section>
        </section>
      </section>
    </article>
  );
};

export default SearchingModal;
