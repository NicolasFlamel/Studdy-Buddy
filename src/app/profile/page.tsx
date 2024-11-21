import { Button } from '@nextui-org/button';

const ProfilePage = () => {
  return (
    <>
      <article>
        <section>
          <h2>{`{userData.username}'s Profile`}</h2>
        </section>
        {/* {{#if ownProfile}} */}
        <article>
          <section>
            <h3>Add a date/time to your available schedule</h3>
            <p>
              Use the calender and time picker to add a date/time to your
              availability so other users can know when you are available
            </p>
          </section>
          <section>
            <form id="add-schedule">
              <fieldset>
                <table>
                  <tr>
                    <div id="date-picker">
                      <input type="text" value="01/02/2023" />
                      <span>
                        <span>
                          <i></i>
                        </span>
                      </span>
                    </div>
                  </tr>
                  <tr>
                    <input type="time" value="00:00" />
                  </tr>
                  <tr>
                    <td>
                      <input type="submit" />
                    </td>
                  </tr>
                </table>
              </fieldset>
            </form>
          </section>
        </article>
        {/* {{/if}} */}
        <article>
          <h2>
            <u>{"{userData.username}'s"} Available Times</u>
          </h2>
          <ul>
            {/* {{#each scheduleData}} */}
            <li>
              <h3>{'{date}'}</h3>
              {/* {{#if @root.ownProfile}} */}
              <Button data-id="{{id}}">delete</Button>
              {/* {{/if}} */}
            </li>
            {/* {{/each}} */}
          </ul>
        </article>
      </article>

      {/* {{! style links }}
{{#section 'style'}}
  <link
    rel='stylesheet'
    href='https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css'
  />
  <link
    rel='stylesheet'
    href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
  />
  <link rel='stylesheet' href='/css/profile.css' />
{{/section}}

{{! script links }}
{{#section 'script'}}
  <script
    src='https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.3/js/bootstrap.min.js'
  ></script>
  <script
    src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'
  ></script>
  <script
    src='https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js'
  ></script>
  <script
    src='https://cdnjs.cloudflare.com/ajax/libs/luxon/3.2.1/luxon.min.js'
    integrity='sha512-pyR2hpC7bLig9Ub4eUIOC/BAO4anpdt7jhpF4dfrPv+qIg+KWztdVjFPCRCsRaWVfUylUCvrrxqMFNrJBdQIjQ=='
    crossorigin='anonymous'
    referrerpolicy='no-referrer'
  ></script>
  {{#if ownProfile}}
    <script src='/js/profile.js'></script>
  {{/if}}
{{/section}} */}
    </>
  );
};

export default ProfilePage;
