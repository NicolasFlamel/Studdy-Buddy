import './styles.css';

const LoginPage = () => {
  return (
    <>
      <div className="signup-images container text-center">
        <img src="./images/nav-logo.png" />
        <p id="signup-text">where no buddy gets left behind...</p>
      </div>
      <div className="access container text-center">
        <section id="error-warning"></section>
        <form id="create-account-form">
          <h2 className="container text-center">Sign up</h2>
          <label className="username">Username:</label>
          <input id="user-create" type="text" name="name" />
          <label className="password">Password:</label>

          <input
            data-bs-toggle="tooltip"
            data-bs-title="Password must be at least 8 characters in length"
            id="password-create"
            type="password"
            name="password"
          />
          <button id="create-account" className="btn btn-grad">
            Create Account
          </button>
        </form>

        <hr />

        <form>
          <h2 className="container text-center">Login</h2>
          <label>Username:</label>
          <input id="username" type="text" name="name" className="username" />
          <label>Password:</label>
          <input
            id="password"
            type="password"
            name="password"
            className="password"
          />
          <button id="homepage-login" className="btn btn-grad">
            Login
          </button>
        </form>
      </div>
    </>
  );

  // {{#section 'style'}}
  //   <link rel='stylesheet' href='/css/login.css' />
  // {{/section}}

  // {{#section 'script'}}
  //   <script src='/js/login.js'></script>
  // {{/section}}
};

export default LoginPage;
