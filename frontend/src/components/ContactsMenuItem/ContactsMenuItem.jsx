import { NavLink } from "react-router-dom";
import styles from "./ContactsMenuItem.module.css";

function ContactsMenuItem({ icon, label, active, setSelectedId }) {
  const handleSubmit = () => {
    setSelectedId(active);
  };

  return (
    <button onClick={handleSubmit} type="button" className={`${styles.item}`}>
      {icon}
      <span>{label}</span>
    </button>
  );
}

export default ContactsMenuItem;
