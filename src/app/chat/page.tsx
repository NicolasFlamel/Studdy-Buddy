import Link from 'next/link';

const ChatPage = () => {
  return (
    <>
      <article
        id="chat-page"
        data-chat-id="{{chatData.id}}"
        data-user-id="{{id}}"
        data-username="{{username}}"
        data-is-active="{{isActive}}"
        data-room-status="{{roomStatus}}"
      >
        {/* <!-- Searching for user Modal --> */}
        <article
          className="modal fade"
          id="no-user-modal"
          tabIndex={-1}
          aria-labelledby="no-user-title"
          aria-hidden="true"
        >
          <section className="modal-dialog modal-dialog-centered">
            <section className="modal-content">
              <section className="modal-header">
                <h2 className="modal-title fs-5" id="no-user-title">
                  No user found
                </h2>
              </section>
              <section className="modal-body">
                There is currently no users to match you with. Page will
                automatically refresh if a user is found
              </section>
              <section className="modal-footer choices">
                <Link className="btn btn-secondary" href="/">
                  Go Home
                </Link>
                <button className="btn btn-primary" type="button" disabled>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Searching...
                </button>
              </section>
            </section>
          </section>
        </article>
        {/* {{! User found Modal }} */}
        <article
          className="modal fade"
          id="found-user-modal"
          tabIndex={-1}
          aria-labelledby="found-user-title"
          aria-hidden="true"
        >
          <section className="modal-dialog modal-dialog-centered">
            <section className="modal-content">
              <section className="modal-header">
                <h2 className="modal-title fs-5" id="found-user-title">
                  User found
                </h2>
              </section>
              <section className="modal-body">
                {`A user was found. Click on "Connect" to to connect with them.
                Room may fill up before you connect.`}
              </section>
              <section className="modal-footer choices">
                <Link className="btn btn-secondary" href="/">
                  Go Home
                </Link>
                <button className="btn btn-primary" type="button">
                  Connect
                </button>
              </section>
            </section>
          </section>
        </article>
        {/* {{! second user information }} */}
        <section id="buddy-window" className="container text-center">
          <section className="text-center">
            <h2>
              Currently Connected Buddy:
              <a
                href="/user/{{chatData.username}}"
                id="buddy"
                data-user-id="{{chatData.userId}}"
                target="_blank"
              >{`{chatData.username}`}</a>
            </h2>
            <h2>
              Studdy Buddy Subject:
              <span
                id="subject"
                data-subject="{{chatData.subject}}"
              >{`{formatSubject
            chatData.subject
          }`}</span>
            </h2>
          </section>
        </section>
        {/* {{! chat window }} */}
        <section className="container" id="chat-window">
          <ul className="messages"></ul>
          <form>
            <input type="text" className="input" autoComplete="off" autoFocus />
            <button>Send</button>
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
