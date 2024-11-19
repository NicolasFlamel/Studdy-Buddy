import Link from 'next/link';

const NotFound = () => {
  return (
    <section>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </section>
  );
};

export default NotFound;