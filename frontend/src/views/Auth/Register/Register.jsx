import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Register.module.css";
import logouth from "../../../assets/logouth.png";
import { register } from "../../../api/auth";
function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    fullname: "",
    phone: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validate = () => {
    const newErrors = {};
    if (!form.fullname.trim()) {
      newErrors.fullname = "Vui lòng nhập họ và tên";
    } else if (form.fullname.length < 2) {
      newErrors.fullname = "Họ và tên phải có ít nhất 2 ký tự";
    }

    if (!form.phone) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!phoneRegex.test(form.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }
    if (!form.email) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!form.password) {
      newErrors.password = "Vui lòng nhận mật khẩu";
    } else if (form.password.length < 6) {
      newErrors.password = "Mật khẩu tối thiểu 6 ký tự";
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
    if (!validate()) return;
    try {
      setLoading(true);
      setErrorMessage("");
      await register({
        fullName: form.fullname,
        username: form.phone,
        password: form.password,
        email: form.email,
      });
      navigate("/login");
    } catch (err) {
      setErrorMessage(err?.response?.data?.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }

    //TODO: gọi api đăng ký
    console.log("Register data:", form);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <img src={logouth} alt="Logo uth" />
          {/* ChatUTH */}
        </div>
        <div className={styles.introduce}>
          <p className={styles.title}>Đăng ký</p>
          {/* <p className={styles.subtitle}>
            Đăng nhập để tiếp tục trò chuyện qua ChatUTH
          </p> */}
        </div>

        <form className={styles.formLogin} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="fullname">Họ và tên</label>

            <input
              id="fullname"
              name="fullname"
              type="text"
              value={form.fullname}
              onChange={handleChange}
              placeholder="Nhập số điện thoại"
            />
            {errors.fullname && (
              <p className={styles.error}>{errors.fullname}</p>
            )}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Số điện thoại</label>

            <input
              id="phone"
              name="phone"
              type="text"
              value={form.phone}
              onChange={handleChange}
              placeholder="Nhập số điện thoại"
            />
            {errors.phone && <p className={styles.error}>{errors.phone}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Mật khẩu</label>

            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>

            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Nhập email"
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
            {errorMessage && <p>{errorMessage}</p>}
          </div>
          <button type="submit" className={styles.submit}>
            {loading ? (
              <span className={styles.loading}>
                <span className={styles.spinner}></span>
                Đang đăng ký...
              </span>
            ) : (
              "Đăng ký"
            )}
          </button>
        </form>

        <div className={styles.footer}>
          <div className={styles.login}>
            <span>Có tài khoản?</span>
            <Link to="/login">Đăng nhập</Link>
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
export default Register;
