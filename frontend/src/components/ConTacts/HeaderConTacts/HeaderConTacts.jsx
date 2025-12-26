import styles from "./HeaderConTacts.module.css";
function HeaderConTacts({ title }) {
  return <div className={styles.wrapper}>{title}</div>;
}
export default HeaderConTacts;
