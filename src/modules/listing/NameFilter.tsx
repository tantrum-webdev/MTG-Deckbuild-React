import { useRecoilState } from 'recoil';
import { nameFilterState } from '@/store/listing';
import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import classes from './Listing.module.css';

export default function NameFilter() {
  const [, setNameFilterState] = useRecoilState(nameFilterState);
  const [nameFilterInput, setNameFilterInput] = useState('');

  const debouncedNameFilter = useDebounce(nameFilterInput);

  useEffect(() => {
    setNameFilterState(debouncedNameFilter);
  }, [debouncedNameFilter]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilterInput(e.target.value);
  };

  return (
    <label htmlFor="nameFilterInput" className={classes.label}>
      <span>Name:</span>
      <input
        type="text"
        id="nameFilterInput"
        name="name"
        placeholder="deck's name"
        onChange={onChange}
        value={nameFilterInput}
      />
    </label>
  );
}
