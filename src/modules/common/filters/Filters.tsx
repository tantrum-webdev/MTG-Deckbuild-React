import NameFilter from './NameFilter';
import classes from './Filters.module.css';

export default function Filters() {
  return (
    <section role="search" className={classes.section}>
      <NameFilter />
    </section>
  );
}
