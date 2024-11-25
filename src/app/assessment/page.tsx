import { auth } from 'auth';
import { SubjectScoresType } from 'types';
import { updateAssessment } from 'lib/actions';
import { Button } from '@nextui-org/button';
import { RadioGroup, Radio } from '@nextui-org/radio';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';

interface RadioOptionsProps {
  name: keyof SubjectScoresType;
  scores: SubjectScoresType;
}
const RadioOptions = ({ name, scores }: RadioOptionsProps) => {
  const defaultValue = scores ? scores[name].toString() : '1';

  return (
    <RadioGroup
      name={name}
      label="Select your understanding level"
      orientation="horizontal"
      defaultValue={defaultValue}
    >
      <Radio value={'1'}>1</Radio>
      <Radio value={'2'}>2</Radio>
      <Radio value={'3'}>3</Radio>
      <Radio value={'4'}>4</Radio>
      <Radio value={'5'}>5</Radio>
    </RadioGroup>
  );
};

const AssessmentPage = async () => {
  const session = await auth();

  if (!session) throw 'Missing session data';

  const { scores } = session.user;

  if (!scores) throw 'Oops something went wrong, missing scores data';

  return (
    <form action={updateAssessment}>
      <Card>
        <CardHeader className="grid">
          <h1>Self-assessment</h1>
          <p>Please rate your understanding of each topic.</p>
          <p>1 = I am completely new to the topic</p>
          <p>5 = I understand the topic and could teach it to others</p>
        </CardHeader>
        <Divider />
        <CardBody className="grid justify-center gap-4 p-4">
          <section>
            <p>Vanilla JS: functions, looping, scope, es6 syntax etc</p>
            <RadioOptions name="vanillaJs" scores={scores} />
          </section>
          <section>
            <p>MYSQL - Joins, queries, schemas, seeds</p>
            <RadioOptions name="mySql" scores={scores} />
          </section>
          <section>
            <p>Node.JS - what is it? requiring, exporting, packages</p>
            <RadioOptions name="nodeJs" scores={scores} />
          </section>
          <section>
            <p>Express - starting server, defining routes, serving html/data</p>
            <RadioOptions name="express" scores={scores} />
          </section>
          <section>
            <p>OOP - Constructors, promises, classes etc</p>
            <RadioOptions name="oop" scores={scores} />
          </section>
          {/* <!--Submit button--> */}
        </CardBody>
        <CardFooter className="justify-end">
          <Button type="submit">Update</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default AssessmentPage;
