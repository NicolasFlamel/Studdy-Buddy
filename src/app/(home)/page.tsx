import { auth } from 'auth';
import Image from 'next/image';
import ChatOptions from 'components/chat/chat-options';
import { getUserScores } from 'drizzle';

const Home = async () => {
  const session = await auth();
  const username = session?.user.name;
  const id = session?.user.id;
  const scores = id ? await getUserScores(id) : undefined;

  return (
    <>
      <div className="flex justify-center">
        <Image
          src="/images/person-studying.png"
          alt="Studdy Buddy image"
          width={322}
          height={400}
        />
        <Image
          src="/images/studdy-buddy-title.png"
          alt="Studdy Buddy logo"
          width={370}
          height={500}
        />
      </div>
      <section className="m-4">
        <h2 className="text-center">
          Welcome{username ? ' ' + username : null}!
        </h2>
        <p className="m-4">
          {
            "Have you ever been struggling in class but you don't know who to reach out to? Introducing Studdy Buddy, an application that allows you to connect with your peers to discuss and work on different topics together. Users are able to rate their understanding of topics on a scale of 1-5 and these scores are used to pair you with someone who understands the topic better than yourself. This allows students to learn from their peers and work together to solve problems rather than have to rely on an outside tutor or having to ask the teacher. Users can also choose to be the ones that provide help to their peers with the click of a button. Students connect in a chat room where they may discuss what they are struggling with."
          }
        </p>
      </section>
      {scores ? <ChatOptions scores={scores} /> : null}
    </>
  );
};

export default Home;
