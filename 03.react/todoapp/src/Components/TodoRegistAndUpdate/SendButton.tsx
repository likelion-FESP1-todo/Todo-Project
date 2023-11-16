interface SendButtonProps {
  text: string;
  event: () => Promise<void>;
}
const SendButton = function ({ text, event }: SendButtonProps) {
  return (
    <button
      type="button"
      className="Todo-button"
      onClick={event}
    >
      {text}
    </button>
  );
};

export default SendButton;
