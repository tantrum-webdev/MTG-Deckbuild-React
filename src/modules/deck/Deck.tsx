import { useParams } from 'react-router-dom';

export default function Deck() {
  const { id } = useParams();

  return <p>Deck page ! id: {id}</p>;
}
