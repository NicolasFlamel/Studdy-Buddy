import './styles.css';

const AssessmentPage = () => {
  return (
    <>
      {/* <!--Description for the top of the page--> */}
      <div className="container text-center assessment-title">
        <h1>Self-assessment</h1>
        <p>
          Please rate your understanding of each topic on a scale of 1 (I am
          completely new to the topic) to 5 (I understand the topic and could
          teach it to others):
        </p>
      </div>

      {/* <!--Assessments questions as well as the 1-5 scale buttons--> */}
      <iframe
        name="dummyframe"
        id="dummyframe"
        style={{ display: 'none' }}
      ></iframe>
      <form action="/api/scores" target="dummyframe" method="post">
        <div className="container score-card">
          <section id="updated-message"></section>
          <p>Vanilla JS- functions, looping, scope, es6 syntax etc</p>
          <section className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="vanillaJs"
              id="vanilla1"
              value="1"
              defaultChecked
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              1
            </label>
          </section>
          <section className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="vanillaJs"
              id="vanilla2"
              value="2"
            />
            <label className="form-check-label" htmlFor="inlineRadio2">
              2
            </label>
          </section>
          <section className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="vanillaJs"
              id="inlineRadio1"
              value="3"
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              3
            </label>
          </section>
          <section className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="vanillaJs"
              id="inlineRadio2"
              value="4"
            />
            <label className="form-check-label" htmlFor="inlineRadio2">
              4
            </label>
          </section>
          <section className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="vanillaJs"
              id="inlineRadio1"
              value="5"
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              5
            </label>
          </section>

          <p>MYSQL - Joins, queries, schemas, seeds</p>
          <section className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="mySql"
              id="inlineRadio1"
              value="1"
              defaultChecked
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              1
            </label>
          </section>
          <section className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="mySql"
              id="inlineRadio2"
              value="2"
            />
            <label className="form-check-label" htmlFor="inlineRadio2">
              2
            </label>
          </section>
          <section className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="mySql"
              id="inlineRadio1"
              value="3"
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              3
            </label>
          </section>
          <section className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="mySql"
              id="inlineRadio2"
              value="4"
            />
            <label className="form-check-label" htmlFor="inlineRadio2">
              4
            </label>
          </section>
          <section className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="mySql"
              id="inlineRadio1"
              value="5"
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              5
            </label>
          </section>

          <p>Node.JS- what is it? requiring, exporting, packages</p>
          <section className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="nodeJs"
              id="inlineRadio1"
              value="1"
              defaultChecked
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              1
            </label>
          </section>
          <section className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="nodeJs"
              id="inlineRadio2"
              value="2"
            />
            <label className="form-check-label" htmlFor="inlineRadio2">
              2
            </label>
          </section>
          <section className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="nodeJs"
              id="inlineRadio1"
              value="3"
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              3
            </label>
          </section>
          <section className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="nodeJs"
              id="inlineRadio2"
              value="4"
            />
            <label className="form-check-label" htmlFor="inlineRadio2">
              4
            </label>
          </section>
          <section className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="nodeJs"
              id="inlineRadio1"
              value="5"
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              5
            </label>
          </section>

          <p>Express- starting server, defining routes, serving html/data</p>
          <section className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="express"
              id="inlineRadio1"
              value="1"
              defaultChecked
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              1
            </label>
          </section>
          <section className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="express"
              id="inlineRadio2"
              value="2"
            />
            <label className="form-check-label" htmlFor="inlineRadio2">
              2
            </label>
          </section>
          <section className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="express"
              id="inlineRadio1"
              value="3"
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              3
            </label>
          </section>
          <section className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="express"
              id="inlineRadio2"
              value="4"
            />
            <label className="form-check-label" htmlFor="inlineRadio2">
              4
            </label>
          </section>
          <section className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="express"
              id="inlineRadio1"
              value="5"
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              5
            </label>
          </section>

          <p>OOP-Constructors, promises, classes etc</p>
          <section className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="oop"
              id="inlineRadio1"
              value="1"
              defaultChecked
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              1
            </label>
          </section>
          <section className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="oop"
              id="inlineRadio2"
              value="2"
            />
            <label className="form-check-label" htmlFor="inlineRadio2">
              2
            </label>
          </section>
          <section className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="oop"
              id="inlineRadio1"
              value="3"
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              3
            </label>
          </section>
          <section className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="oop"
              id="inlineRadio2"
              value="4"
            />
            <label className="form-check-label" htmlFor="inlineRadio2">
              4
            </label>
          </section>
          <section className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="oop"
              id="inlineRadio1"
              value="5"
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              5
            </label>
          </section>

          {/* <!--Submit button--> */}
          <section>
            <input
              id="submit-btn"
              type="submit"
              value="Update"
              className="btn btn-grad"
            />
          </section>
        </div>
      </form>

      {/* {{#section 'style'}}
    <link rel='stylesheet' href='/css/assessment.css' />
  {{/section}}
  
  {{#section 'script'}}
    <script src='/js/assessment.js'></script>
  {{/section}} */}
    </>
  );
};

export default AssessmentPage;
