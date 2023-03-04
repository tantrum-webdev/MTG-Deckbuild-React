interface Props {
  action: () => void;
}

export default function ActionButton({ action }: Props) {
  return (
    <button type="button" onClick={action}>
      Add new deck
    </button>
  );
}
