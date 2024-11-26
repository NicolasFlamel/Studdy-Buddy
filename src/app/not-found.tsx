import { Link } from '@nextui-org/link';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';

const NotFound = () => {
  return (
    <section className="flex justify-center m-4">
      <Card>
        <CardHeader>
          <h2>404 - Not Found</h2>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>Could not find requested resource</p>
        </CardBody>
        <Divider />
        <CardFooter className="justify-end">
          <Link href="/">Return Home</Link>
        </CardFooter>
      </Card>
    </section>
  );
};

export default NotFound;
