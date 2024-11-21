import { ScoresTableSelect } from 'drizzle/schema';
import { Button } from '@nextui-org/button';

interface ChatOptionsProps {
  scores: ScoresTableSelect;
}

const ChatOptions = async ({ scores }: ChatOptionsProps) => {
  const getTabRow = (key: string) => {
    const getJsx = (key: keyof ScoresTableSelect) => (
      <tr key={key}>
        <th scope="row">{key}</th>
        <td>{scores[key]}</td>
      </tr>
    );

    switch (key) {
      case 'vanillaJs':
        return getJsx(key);
      case 'mySql':
        return getJsx(key);
      case 'nodeJs':
        return getJsx(key);
      case 'express':
        return getJsx(key);
      case 'oop':
        return getJsx(key);
      default:
        return;
    }
  };

  return (
    <article>
      <section>
        <select aria-label="select subject">
          <option value="vanillaJs">Vanilla JS</option>
          <option value="mySql">mySQL</option>
          <option value="nodeJs">Node.JS</option>
          <option value="express">Express</option>
          <option value="oop">OOP</option>
        </select>
        <Button data-option="find">Find a buddy</Button>
      </section>
      <section>
        <table>
          <thead>
            <tr>
              <th scope="col">Subject</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>{Object.keys(scores).map(getTabRow)}</tbody>
        </table>
        <Button data-option="help">Help a buddy</Button>
      </section>
    </article>
  );
};

export default ChatOptions;
