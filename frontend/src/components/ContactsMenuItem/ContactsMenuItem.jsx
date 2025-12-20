import { NavLink } from "react-router-dom";
import styles from "./ContactsMenuItem.module.css";

function ContactsMenuItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${styles.item} ${isActive ? styles.active : ""}`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}

export default ContactsMenuItem;
