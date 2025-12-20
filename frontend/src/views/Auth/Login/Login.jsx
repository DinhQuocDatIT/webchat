import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import styles from "./Login.module.css";
import logouth from "../../../assets/logouth.png";
function Login() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <img src={logouth} alt="Logo uth" />
          {/* ChatUTH */}
        </div>
        <div className={styles.introduce}>
          <p className={styles.title}>Đăng nhập</p>
          <p className={styles.subtitle}>
            Đăng nhập để tiếp tục trò chuyện qua ChatUTH
          </p>
        </div>

        <form className={styles.formLogin}>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Số điện thoại</label>
            <div className={styles.inputGroup}>
              <div>
                <FontAwesomeIcon icon={faUser} />
              </div>
              <input
                id="phone"
                name="phone"
                type="text"
                placeholder="Nhập số điện thoại"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Mật khẩu</label>
            <div className={styles.inputGroup}>
              <div>
                <FontAwesomeIcon icon={faLock} />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Nhập mật khẩu"
              />
            </div>
          </div>
          <button type="submit" className={styles.submit}>
            Đăng nhập
          </button>
        </form>

        <div className={styles.footer}>
          <div className={styles.register}>
            <span>Chưa có tài khoản?</span>
            <Link to="/register">Đăng ký</Link>
          </div>

          <a
            href="https://github.com/DinhQuocDatIT"
            target="_blank"
            rel="noreferrer"
            className={styles.author}
          >
            <span>Được thiết kế bởi </span>
            @Đinh Quốc Đạt
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
