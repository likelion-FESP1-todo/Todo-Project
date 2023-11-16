interface SendButtonProps {
  text: string;
  event: () => Promise<void>;
  className: string;
}
const SendButton = function ({ text, event, className }: SendButtonProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={event}
    >
      {text}
    </button>
  );
};

export default SendButton;
