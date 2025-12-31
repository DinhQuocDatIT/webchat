import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faAddressBook } from "@fortawesome/free-regular-svg-icons";
import {
  faGear,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./SideNavigation.module.css";
import avatardefault from "../../../assets/avatar-default.jpg";
import NavItem from "../../../components/NavItem/NavItem";
import { logout } from "../../../api/auth";
import Avatar from "../../../components/Avatar/Avatar";
import { AuthService } from "../../../services/auth.service";
import { useChat } from "../../../contexts/ChatContext";
function SideNavigation() {
  const { leftTab, setLeftTab } = useChat();
  const navigate = useNavigate();
  const currentUser = AuthService.getUser();
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };
  return (
    <div className={styles.wrapper}>
      <Avatar userid={currentUser.id} />

      <div className={styles.menuNavItem}>
        <div className={styles.menuTop}>
          <NavItem
            active={leftTab === "chat"}
            onClick={() => setLeftTab("chat")}
          >
            <FontAwesomeIcon icon={faMessage} />
          </NavItem>

          <NavItem
            active={leftTab === "contacts"}
            onClick={() => setLeftTab("contacts")}
          >
            <FontAwesomeIcon icon={faAddressBook} />
          </NavItem>
        </div>
        <div className={styles.menuBottom}>
          <NavItem>
            <FontAwesomeIcon icon={faGear} />
          </NavItem>
          <NavItem onClick={handleLogout}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </NavItem>
        </div>
      </div>
    </div>
  );
}
export default SideNavigation;
