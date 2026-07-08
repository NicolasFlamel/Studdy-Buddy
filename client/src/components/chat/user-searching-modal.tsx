export const UserSearchingModal = () => {
  return (
    <article
      className={'modal fade'}
      id="no-user-modal"
      tabIndex={-1}
      aria-labelledby="no-user-title"
      aria-hidden="true"
    >
      <section className={'modal-dialog modal-dialog-centered'}>
        <section className={'modal-content'}>
          <section className={'modal-header'}>
            <h2 className={'modal-title fs-5'} id="no-user-title">
              No user found
            </h2>
          </section>
          <section className={'modal-body'}>
            There is currently no users to match you with. Page will
            automatically refresh if a user is found
          </section>
          <section className={'modal-footer choices'}>
            <a className={'btn btn-secondary'} href="/">
              Go Home
            </a>
            <button className={'btn btn-primary'} type="button" disabled>
              <span
                className={'spinner-border spinner-border-sm'}
                role="status"
                aria-hidden="true"
              ></span>
              Searching...
            </button>
          </section>
        </section>
      </section>
    </article>
  );
};
