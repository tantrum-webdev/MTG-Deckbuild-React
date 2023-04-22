import { useRecoilState } from 'recoil';
import { formatFilterState } from '@/store/listing';
import classes from './Listing.module.css';
import { formatList } from '@/config';
import { Format } from '@/types';

export default function FormatFilter() {
  const [formatFilter, setFormatFilterState] =
    useRecoilState(formatFilterState);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormatFilterState(e.target.value as Format | '');
  };

  return (
    <label htmlFor="formatFilterInput" className={classes.label}>
      <span>Format:</span>
      <select
        name="format"
        id="formatFilterInput"
        onChange={onChange}
        value={formatFilter}
      >
        <option value="" />
        {formatList.map((format) => (
          <option key={format} value={format}>
            {format}
          </option>
        ))}
      </select>
    </label>
  );
}
