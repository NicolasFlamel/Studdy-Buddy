export const UserFoundModal = () => {
  return (
    <article
      className={'modal fade'}
      id="found-user-modal"
      tabIndex={-1}
      aria-labelledby="found-user-title"
      aria-hidden="true"
    >
      <section className={'modal-dialog modal-dialog-centered'}>
        <section className={'modal-content'}>
          <section className={'modal-header'}>
            <h2 className={'modal-title fs-5'} id="found-user-title">
              User found
            </h2>
          </section>
          <section className={'modal-body'}>
            A user was found. Click on "Connect" to to connect with them. Room
            may fill up before you connect.
          </section>
          <section className={'modal-footer choices'}>
            <a className={'btn btn-secondary'} href="/">
              Go Home
            </a>
            <button className={'btn btn-primary'} type="button">
              Connect
            </button>
          </section>
        </section>
      </section>
    </article>
  );
};
