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
    active:"myFriends",
    label: "Danh sách bạn bè",
    icon: faUser,
  },
  {
    active:"groupAndCommunityList",
    label: "Danh sách nhóm và cộng đồng",
    icon: faUsers,
  },
  {
    active:"friendRequestList",
    label: "Lời mời kết bạn",
    icon: faUserPlus,
  },
  {
    active:"groupAndCommunityInviteList",
    label: "Lời mời vào nhóm và cộng đồng",
    icon: faUserGroup,
  },
];

function ContactsSidebar({setSelectedId}) {
  return (
    <div className={styles.wrapper}>
      {CONTACTS_MENU.map((item) => (
        <ContactsMenuItem
          key={item.active}
          icon={<FontAwesomeIcon icon={item.icon} />}
          label={item.label}
          active ={item.active}
          setSelectedId={ setSelectedId}
        />
      ))}
    </div>
  );
}
export default ContactsSidebar;
