import styles from "./button.module.scss";

const Button = (props) => {
  const { disabled = false, type = "button", children, onClick = null } = props;

  return (
    <button
      className={styles.button}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
