import styles from "./Avatar.module.css";
import avatarDefaule from "../../assets/avatar-default.jpg";
import { useEffect, useState } from "react";
import { getUsersById } from "../../api/user";
import UserInfoModal from "../UserInfoModal/UserInfoModal";
function Avatar({ userid }) {
  const [user, setUser] = useState();
  const [isShowInfor, setIsShowInfor] = useState(false);
  useEffect(() => {
    const handleApi = async () => {
      try {
        const res = await getUsersById(userid);
        setUser(res);
      } catch (err) {
        console.log("Lỗi không lấy thông tin người dùng", err);
      }
    };
    handleApi();
  }, [userid]);
  const handleShowInfor = () => {
    setIsShowInfor(!isShowInfor);
  };
  return (
    <div className={styles.wrapper}>
      <img src={avatarDefaule} alt="Ảnh đại diện" onClick={handleShowInfor} />
      {isShowInfor && <UserInfoModal user={user}  onClick= {handleShowInfor}/>}
    </div>
  );
}
export default Avatar;
