import classes from './Table.module.css';

export default function Table() {
  return (
    <table className={classes.table}>
      <caption>My Decks</caption>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Format</th>
          <th scope="col">Colors</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-label="Name">Red Deck Wins</td>
          <td data-label="Format">Standard</td>
          <td data-label="Colors">Red</td>
          <td data-label="Actions">
            <button>Export</button>
          </td>
        </tr>
        <tr>
          <td data-label="Name">Simic Ramp</td>
          <td data-label="Format">Limited</td>
          <td data-label="Colors">Green - Blue</td>
          <td data-label="Actions">
            <button>Export</button>
          </td>
        </tr>
        <tr>
          <td data-label="Name">Esper Control</td>
          <td data-label="Format">Modern</td>
          <td data-label="Colors">Black - White - Blue</td>
          <td data-label="Actions">
            <button>Export</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
