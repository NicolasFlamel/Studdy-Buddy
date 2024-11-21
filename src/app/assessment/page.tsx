import { Button } from '@nextui-org/button';

const AssessmentPage = () => {
  return (
    <>
      <div>
        <h1>Self-assessment</h1>
        <p>
          Please rate your understanding of each topic on a scale of 1 (I am
          completely new to the topic) to 5 (I understand the topic and could
          teach it to others):
        </p>
      </div>
      <form action="/api/scores" target="dummyframe" method="post">
        <div>
          <section></section>
          <p>Vanilla JS- functions, looping, scope, es6 syntax etc</p>
          <section>
            <input type="radio" name="vanillaJs" value="1" defaultChecked />
            <label htmlFor="inlineRadio1">1</label>
          </section>
          <section>
            <input type="radio" name="vanillaJs" value="2" />
            <label htmlFor="inlineRadio2">2</label>
          </section>
          <section>
            <input type="radio" name="vanillaJs" value="3" />
            <label htmlFor="inlineRadio1">3</label>
          </section>
          <section>
            <input type="radio" name="vanillaJs" value="4" />
            <label htmlFor="inlineRadio2">4</label>
          </section>
          <section>
            <input type="radio" name="vanillaJs" value="5" />
            <label htmlFor="inlineRadio1">5</label>
          </section>

          <p>MYSQL - Joins, queries, schemas, seeds</p>
          <section>
            <input type="radio" name="mySql" value="1" defaultChecked />
            <label htmlFor="inlineRadio1">1</label>
          </section>
          <section>
            <input type="radio" name="mySql" value="2" />
            <label htmlFor="inlineRadio2">2</label>
          </section>
          <section>
            <input type="radio" name="mySql" value="3" />
            <label htmlFor="inlineRadio1">3</label>
          </section>
          <section>
            <input type="radio" name="mySql" value="4" />
            <label htmlFor="inlineRadio2">4</label>
          </section>
          <section>
            <input type="radio" name="mySql" value="5" />
            <label htmlFor="inlineRadio1">5</label>
          </section>

          <p>Node.JS- what is it? requiring, exporting, packages</p>
          <section>
            <input type="radio" name="nodeJs" value="1" defaultChecked />
            <label htmlFor="inlineRadio1">1</label>
          </section>
          <section>
            <input type="radio" name="nodeJs" value="2" />
            <label htmlFor="inlineRadio2">2</label>
          </section>
          <section>
            <input type="radio" name="nodeJs" value="3" />
            <label htmlFor="inlineRadio1">3</label>
          </section>
          <section>
            <input type="radio" name="nodeJs" value="4" />
            <label htmlFor="inlineRadio2">4</label>
          </section>
          <section>
            <input type="radio" name="nodeJs" value="5" />
            <label htmlFor="inlineRadio1">5</label>
          </section>

          <p>Express- starting server, defining routes, serving html/data</p>
          <section>
            <input type="radio" name="express" value="1" defaultChecked />
            <label htmlFor="inlineRadio1">1</label>
          </section>
          <section>
            <input type="radio" name="express" value="2" />
            <label htmlFor="inlineRadio2">2</label>
          </section>
          <section>
            <input type="radio" name="express" value="3" />
            <label htmlFor="inlineRadio1">3</label>
          </section>
          <section>
            <input type="radio" name="express" value="4" />
            <label htmlFor="inlineRadio2">4</label>
          </section>
          <section>
            <input type="radio" name="express" value="5" />
            <label htmlFor="inlineRadio1">5</label>
          </section>

          <p>OOP-Constructors, promises, classes etc</p>
          <section>
            <input type="radio" name="oop" value="1" defaultChecked />
            <label htmlFor="inlineRadio1">1</label>
          </section>
          <section>
            <input type="radio" name="oop" value="2" />
            <label htmlFor="inlineRadio2">2</label>
          </section>
          <section>
            <input type="radio" name="oop" value="3" />
            <label htmlFor="inlineRadio1">3</label>
          </section>
          <section>
            <input type="radio" name="oop" value="4" />
            <label htmlFor="inlineRadio2">4</label>
          </section>
          <section>
            <input type="radio" name="oop" value="5" />
            <label htmlFor="inlineRadio1">5</label>
          </section>

          {/* <!--Submit button--> */}
          <section>
            <Button type="submit">Update</Button>
          </section>
        </div>
      </form>
    </>
  );
};

export default AssessmentPage;
