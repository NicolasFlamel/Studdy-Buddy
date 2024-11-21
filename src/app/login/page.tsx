import { Button } from '@nextui-org/button';
import LoginForm from 'components/login-form';

const LoginPage = () => {
  return (
    <>
      <div>
        <img src="./images/nav-logo.png" />
        <p>where no buddy gets left behind...</p>
      </div>
      <div>
        <section></section>
        <form>
          <h2>Sign up</h2>
          <label>Username:</label>
          <input type="text" name="name" />
          <label>Password:</label>

          <input
            data-bs-toggle="tooltip"
            data-bs-title="Password must be at least 8 characters in length"
            type="password"
            name="password"
          />
          <Button>Create Account</Button>
        </form>

        <hr />
        <LoginForm />
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
