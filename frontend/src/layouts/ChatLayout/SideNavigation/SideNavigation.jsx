import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faAddressBook } from "@fortawesome/free-regular-svg-icons";
import styles from "./SideNavigation.module.css";
import avatardefault from "../../../assets/avatar-default.jpg";
import NavItem from "../../../components/NavItem/NavItem";
function SideNavigation() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar}>
        <img src={avatardefault} alt="avatar mặc định" />
      </div>
      <div className={styles.menuNavItem}>
        <div className={styles.menuTop}>
          <NavItem to="/messages">
            <FontAwesomeIcon icon={faMessage} />
          </NavItem>
          <NavItem to="/messages">
            <FontAwesomeIcon icon={faAddressBook} />
          </NavItem>
        </div>
        <div className={styles.menuBottom}>
          <NavItem to="/messages">
            <FontAwesomeIcon icon={faMessage} />
          </NavItem>
          <NavItem to="/messages">
            <FontAwesomeIcon icon={faAddressBook} />
          </NavItem>
        </div>
      </div>
    </div>
  );
}
export default SideNavigation;
