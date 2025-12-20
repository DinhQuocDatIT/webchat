import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContactsMenuItem from "../ContactsMenuItem/ContactsMenuItem";
import {
    faUser,
    faUsers,
    faUserPlus,
    faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./ContactsSidebar.module.css";

const CONTACTS_MENU = [
  {
    to: "friends",
    label: "Danh sách bạn bè",
    icon: faUser,
  },
  {
    to: "groups",
    label: "Danh sách nhóm và cộng đồng",
    icon: faUsers,
  },
  {
    to: "friend-requests",
    label: "Lời mời kết bạn",
    icon: faUserPlus,
  },
  {
    to: "group-invites",
    label: "Lời mời vào nhóm và cộng đồng",
    icon: faUserGroup,
  },
];

function ContactsSidebar() {
  return (
    <div className={styles.wrapper}>
      {CONTACTS_MENU.map((item) => (
        <ContactsMenuItem
          key={item.to}
          to={item.to}
          icon={<FontAwesomeIcon icon={item.icon} />}
          label={item.label}
        />
      ))}
    </div>
  );
}
export default ContactsSidebar;
