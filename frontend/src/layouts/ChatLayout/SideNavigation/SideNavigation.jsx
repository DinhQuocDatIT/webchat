import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faAddressBook } from "@fortawesome/free-regular-svg-icons";
import {
  faGear,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./SideNavigation.module.css";
import avatardefault from "../../../assets/avatar-default.jpg";
import NavItem from "../../../components/NavItem/NavItem";
function SideNavigation({ leftTab, setLeftTab }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar}>
        <img src={avatardefault} alt="avatar mặc định" />
      </div>
      <div className={styles.menuNavItem}>
        <div className={styles.menuTop}>
          <NavItem
            active={leftTab === "chat"}
            onClick={() => setLeftTab("chat")}
          > <FontAwesomeIcon icon={faMessage} /></NavItem>

          <NavItem
            active={leftTab === "contacts"}
            onClick={() => setLeftTab("contacts")}
          ><FontAwesomeIcon icon={faAddressBook} /></NavItem>
        </div>
        <div className={styles.menuBottom}>
          <NavItem to="/messages">
            <FontAwesomeIcon icon={faGear} />
          </NavItem>
          <NavItem to="/messages">
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </NavItem>
        </div>
      </div>
    </div>
  );
}
export default SideNavigation;
