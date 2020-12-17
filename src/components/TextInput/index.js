import styles from "./text-input.module.scss";

const TextInput = (props) => {
  const {
    id,
    label,
    type = "text",
    value,
    onChange,
    placeholder = null,
  } = props;

  return (
    <div className={styles.group}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;
