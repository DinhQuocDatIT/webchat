import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContactsMenuItem from "../ContactsMenuItem/ContactsMenuItem";
import styles from "./ContactsSidebar.module.css";
import { CONTACTS_MENU } from "../../constants/contactsMenu";

function ContactsSidebar({ selectedId, setSelectedId }) {
  return (
    <div className={styles.wrapper}>
      {CONTACTS_MENU.map((item) => (
        <ContactsMenuItem
          id={item.id}
          label={item.label}
          icon={<FontAwesomeIcon icon={item.icon} />}
          isActive={selectedId === item.id}
          setSelectedId={setSelectedId}
        />
      ))}
    </div>
  );
}
export default ContactsSidebar;
