import styles from "./NavItem.module.css";

function NavItem({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.wrapper} ${active ? styles.active : ""}`}
    >
      {children}
    </button>
  );
}

export default NavItem;
