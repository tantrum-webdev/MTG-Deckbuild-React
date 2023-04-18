import endpoints from '@/config/endpoints';
import { fetcher } from '@/services';
import { useRecoilState } from 'recoil';
import { formatFilterState } from '@/store/listing';
import useSWR from 'swr';
import { Format } from '@/types';
import classes from './Listing.module.css';

export default function FormatFilter() {
  const [formatFilter, setFormatFilterState] =
    useRecoilState(formatFilterState);

  const { data: formats } = useSWR<Format[]>(endpoints.formats, fetcher);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormatFilterState(e.target.value);
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
        {formats?.map((format) => (
          <option key={format} value={format}>
            {format}
          </option>
        ))}
      </select>
    </label>
  );
}
