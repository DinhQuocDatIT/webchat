import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import styles from "./Login.module.css";
import logouth from "../../../assets/logouth.png";
import { useState } from "react";
import { login } from "../../../api/auth";
function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const validate = () => {
    const newErrors = {};
    if (!form.phone || !form.password) {
      newErrors.emptyPhoneorPassword = "Vui lòng nhập đầy đủ để xác thực";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(import.meta.env.VITE_API_URL);
    if (!validate()) return;

    try {
      setLoading(true);
      setErrorMessage("");

      await login({
        username: form.phone.trim(),
        password: form.password,
      });

      navigate("/messages", { replace: true });
    } catch (err) {
      setErrorMessage(err?.response?.data?.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

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

        <form className={styles.formLogin} onSubmit={handleSubmit}>
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
                value={form.phone}
                onChange={handleChange}
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
                value={form.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu"
              />
            </div>
          </div>
          {errors.emptyPhoneorPassword && (
            <p className={styles.emptyPhoneorPassword}>
              {errors.emptyPhoneorPassword}
            </p>
          )}
          {errorMessage && <p>{errorMessage}</p>}
          <button type="submit" className={styles.submit}>
            {loading ? (
              <span className={styles.loading}>
                <span className={styles.spinner}></span>
                Đang đăng nhập...
              </span>
            ) : (
              "Đăng nhập"
            )}
    
          </button>
        </form>

        <div className={styles.footer}>
          <div className={styles.register}>
            <span>Chưa có tài khoản?</span>
            <Link to="/signup">Đăng ký</Link>
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
