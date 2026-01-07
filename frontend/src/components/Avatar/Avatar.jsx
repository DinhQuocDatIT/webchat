import styles from "./Avatar.module.css";
import avatarDefaule from "../../assets/avatar-default.jpg";
import { useEffect, useState } from "react";
import { getUsersById } from "../../api/user";
import UserInfoModal from "../UserInfoModal/UserInfoModal";
function Avatar({ userid, isFormInfo = false }) {
  const [user, setUser] = useState();
  const [isShowInfor, setIsShowInfor] = useState(false);
  const [urlImg, setUrlImg] = useState(null);

  useEffect(() => {
    const handleApi = async () => {
      try {
        const res = await getUsersById(userid);
        setUser(res);
        setUrlImg(import.meta.env.VITE_API_URL_IMG + res.avatar);
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
      <img src={urlImg} alt="Ảnh đại diện" onClick={handleShowInfor} />
      {isFormInfo && isShowInfor && (
        <UserInfoModal user={user} onClick={handleShowInfor} />
      )}
    </div>
  );
}
export default Avatar;
