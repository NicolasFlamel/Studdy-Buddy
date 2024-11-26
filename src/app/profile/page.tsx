import { Button } from '@nextui-org/button';
import { auth } from 'auth';
import UserAvailabilityTable from 'components/profile/user-times-table';

const ProfilePage = async () => {
  const session = await auth();
  const dateNow = new Date().toISOString().split('T');
  const calenderNow = dateNow[0];
  const timeNow = dateNow[1];

  console.log(timeNow);

  if (!session) throw 'Mission session data';

  const { user } = session;

  return (
    <section className="m-4">
      <section className="text-4xl text-center m-4">
        <h2>{user.name + "'s Profile"}</h2>
      </section>
      {/* {{#if ownProfile}} */}
      <section className="grid grid-cols-1 grid-rows-2 gap-4 p-4">
        <article className="grid grid-cols-[repeat(2,minmax(20,500))] gap-4">
          <section>
            <h3 className="text-3xl mb-4">
              Add a date/time to your available schedule
            </h3>
            <p>
              Use the calender and time picker to add a date/time to your
              availability so other users can know when you are available
            </p>
          </section>

          <section>
            <form className="flex flex-wrap gap-4">
              <input type="date" defaultValue={calenderNow} />
              <input type="time" defaultValue="19:16" step={60} />
              <Button type="submit">Submit</Button>
            </form>
          </section>
        </article>
        {/* {{/if}} */}

        <article className="grid justify-center gap-4">
          <h2 className="text-4xl">
            <u>{user.name + "'s"} Available Times</u>
          </h2>
          <UserAvailabilityTable className="max-w-2xl" />
        </article>
      </section>
    </section>
  );
};

export default ProfilePage;
