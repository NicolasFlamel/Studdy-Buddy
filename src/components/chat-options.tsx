import { ScoresTableSelect } from 'drizzle/schema';

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
    <article id="chat-options" className="container flex justify-evenly">
      <section id="create-room" className="text-center">
        <select className="form-select" aria-label="select subject">
          <option value="vanillaJs">Vanilla JS</option>
          <option value="mySql">mySQL</option>
          <option value="nodeJs">Node.JS</option>
          <option value="express">Express</option>
          <option value="oop">OOP</option>
        </select>
        <button className="btn btn-grad chat-btn" data-option="find">
          Find a buddy
        </button>
      </section>
      <section id="join-room">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Subject</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>{Object.keys(scores).map(getTabRow)}</tbody>
        </table>
        <button className="btn btn-grad chat-btn" data-option="help">
          Help a buddy
        </button>
      </section>
    </article>
  );
};

export default ChatOptions;
