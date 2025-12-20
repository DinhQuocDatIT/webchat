import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUserGroup } from "@fortawesome/free-solid-svg-icons";

import styles from "./AddFriend.module.css";
function AddFriend() {
  return (
    <div className={styles.wrapper}>
    <input 
    type="text" 
    placeholder="Tìm kiếm bạn bè"
    className={styles.findFriend}/>
    
      <FontAwesomeIcon icon={faUserPlus} className={styles.add} />
      <FontAwesomeIcon icon={faUserGroup} className={styles.add}/>
    </div>
  );
}
export default AddFriend;
