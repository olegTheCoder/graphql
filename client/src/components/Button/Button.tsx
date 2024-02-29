import styles from './Button.module.css';

type Props = {
  name: string;
  onClick: () => void;
};

export const Button = ({ name, onClick }: Props) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {name}
    </button>
  );
};
