import { useState, useEffect } from 'react';
import endpoints from '../config/endpoints';

function TypesList() {
  const [archetypes, setArchetypes] = useState<Array<string>>([]);

  useEffect(() => {
    fetch(endpoints.base + endpoints.types).then(async (res) => {
      const { types } = await res.json();
      setArchetypes(types);
    });
  }, []);

  return (
    <>
      {archetypes.map((t, i) => (
        <div key={i}>{t}</div>
      ))}
    </>
  );
}

export default TypesList;
