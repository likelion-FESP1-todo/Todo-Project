import editButtonImg from '../../Assets/img/editButton.svg';
import deleteButtonImg from '../../Assets/img/deleteButton.svg';
import backButtonImg from '../../Assets/img/backButton.svg';

interface ButtonProps {
  svg: string;
  alt: string;
  btnEvent?: () => void;
  className?: string;
}

const Button = function ({ svg, alt, btnEvent, className }: ButtonProps) {
  const svgImg =
    svg === 'editButton'
      ? editButtonImg
      : svg === 'deleteButton'
      ? deleteButtonImg
      : svg === 'backButton'
      ? backButtonImg
      : undefined;

  return (
    <button
      onClick={btnEvent}
      className={className}
    >
      <img
        src={svgImg}
        alt={alt}
      />
    </button>
  );
};

export default Button;
