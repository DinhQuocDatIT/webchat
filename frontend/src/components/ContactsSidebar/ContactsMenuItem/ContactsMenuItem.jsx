import { NavLink } from "react-router-dom";
import styles from "./ContactsMenuItem.module.css";

function ContactsMenuItem({ icon, label, id, isActive, setSelectedId }) {
  const handleClick = () => {
    setSelectedId(id);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${styles.item} ${isActive ? styles.active : ""}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

export default ContactsMenuItem;
