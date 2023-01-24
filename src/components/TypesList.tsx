import { useState, useEffect } from 'react';
import endpoints from '../config/endpoints';

function TypesList() {
	const [types, setTypes] = useState<Array<string>>([]);

	useEffect(() => {
		fetch(endpoints.base + endpoints.types).then(async (res) => {
			const { types } = await res.json();
			setTypes(types);
		});
	});
	return (
		<>
			{types.map((t, i) => (
				<div key={i}>{t}</div>
			))}
		</>
	);
}

export default TypesList;
