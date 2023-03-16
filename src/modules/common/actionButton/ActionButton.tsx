interface ButtonProps {
  action: () => void;
  textContent: string;
  value?: string;
  type?: 'submit' | 'button';
}

export default function ActionButton({
  action,
  textContent,
  value,
  type = 'button',
}: ButtonProps) {
  return (
    <button type={type} onClick={action} value={value}>
      {textContent}
    </button>
  );
}
