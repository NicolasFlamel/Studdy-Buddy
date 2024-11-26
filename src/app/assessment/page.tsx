import { auth } from 'auth';
import { getUserScores } from 'drizzle';
import { Card, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import AssessmentEditForm from 'components/assessment/edit-form';

const AssessmentPage = async () => {
  const session = await auth();

  if (!session) throw 'Missing session data';

  const { id } = session.user;

  const scores = await getUserScores(id);

  return (
    <Card>
      <CardHeader className="grid">
        <h1>Self-assessment</h1>
        <p>Please rate your understanding of each topic.</p>
        <p>1 = I am completely new to the topic</p>
        <p>5 = I understand the topic and could teach it to others</p>
      </CardHeader>
      <Divider />
      <AssessmentEditForm userId={id} scores={scores} />
    </Card>
  );
};

export default AssessmentPage;
