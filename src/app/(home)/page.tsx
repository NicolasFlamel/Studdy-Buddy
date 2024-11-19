import './styles.css';
import Image from 'next/image';

const Home = () => {
  return (
    <>
      <div className="cover flex justify-center">
        <Image
          id="studying-img"
          src="/images/person-studying.png"
          alt="Studdy Buddy image"
          width={322}
          height={400}
        />
        <Image
          id="studying-logo"
          src="/images/studdy-buddy-title.png"
          alt="Studdy Buddy logo"
          width={370}
          height={500}
        />
      </div>
      <section className="main text-center">
        {/* <h2 id='welcome'>Welcome{{#if loggedIn}} {{userData.username}}{{/if}}!</h2> */}
        <p id="homepage-text">
          {
            "Have you ever been struggling in class but you don't know who to reach out to? Introducing Studdy Buddy, an application that allows you to connect with your peers to discuss and work on different topics together. Users are able to rate their understanding of topics on a scale of 1-5 and these scores are used to pair you with someone who understands the topic better than yourself. This allows students to learn from their peers and work together to solve problems rather than have to rely on an outside tutor or having to ask the teacher. Users can also choose to be the ones that provide help to their peers with the click of a button. Students connect in a chat room where they may discuss what they are struggling with."
          }
        </p>
      </section>
      {/* {{#if loggedIn}} */}
      <article
        id="chat-options"
        className="container d-flex justify-content-evenly"
      >
        <section id="create-room" className="text-center">
          <select className="form-select" aria-label="select subject">
            <option value="vanillaJs">Vanilla JS</option>
            <option value="mySql">mySQL</option>
            <option value="nodeJs">Node.JS</option>
            <option value="express">Express</option>
            <option value="oop">OOP</option>
          </select>
          <button className="btn btn-grad chat-btn" data-option="find">
            Find a buddy
          </button>
        </section>
        <section id="join-room">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Subject</th>
                <th scope="col">Score</th>
              </tr>
            </thead>
            <tbody>
              {/* {{#each userData.score}}
              <tr>
                <th scope='row'>{{formatSubject @key}}</th>
                <td>{{this}}</td>
              </tr>
            {{/each}} */}
            </tbody>
          </table>
          <button className="btn btn-grad chat-btn" data-option="help">
            Help a buddy
          </button>
        </section>
      </article>
      {/* {{/if}} */}
    </>
  );
};

export default Home;
