interface ButtonProps {
  action: () => void;
  textContent: string;
}

export default function ActionButton({ action, textContent }: ButtonProps) {
  return (
    <button type="button" onClick={action}>
      {textContent}
    </button>
  );
}
