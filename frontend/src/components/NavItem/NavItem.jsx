import { Link } from "react-router";
import styles from "./NavItem.module.css";
function NavItem({ to, children }) {
  return <Link to={to} className={styles.wrapper}>{children}</Link>;
}
export default NavItem;
