import Link from 'next/link';
import { Button } from '@nextui-org/button';

const ChatPage = () => {
  return (
    <>
      <article
        data-chat-id="{{chatData.id}}"
        data-user-id="{{id}}"
        data-username="{{username}}"
        data-is-active="{{isActive}}"
        data-room-status="{{roomStatus}}"
      >
        {/* <!-- Searching for user Modal --> */}
        <article
          tabIndex={-1}
          aria-labelledby="no-user-title"
          aria-hidden="true"
        >
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
        {/* {{! User found Modal }} */}
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
        {/* {{! second user information }} */}
        <section>
          <section>
            <h2>
              Currently Connected Buddy:
              <a
                href="/user/{{chatData.username}}"
                data-user-id="{{chatData.userId}}"
                target="_blank"
              >{`{chatData.username}`}</a>
            </h2>
            <h2>
              Studdy Buddy Subject:
              <span data-subject="{{chatData.subject}}">{`{formatSubject
            chatData.subject
          }`}</span>
            </h2>
          </section>
        </section>
        {/* {{! chat window }} */}
        <section>
          <ul></ul>
          <form>
            <input type="text" autoComplete="off" autoFocus />
            <Button>Send</Button>
          </form>
        </section>
      </article>

      {/* {{#section 'style'}}
  <link rel='stylesheet' href='/css/chat.css' />
{{/section}}

{{#section 'script'}}
  <script
    src='https://cdn.socket.io/4.5.4/socket.io.min.js'
    integrity='sha384-/KNQL8Nu5gCHLqwqfQjA689Hhoqgi2S84SNUxC3roTe4EhJ9AfLkp8QiQcU8AMzI'
    crossorigin='anonymous'
  ></script>
  <script src='./js/chat.js'></script>
{{/section}} */}
    </>
  );
};

export default ChatPage;
