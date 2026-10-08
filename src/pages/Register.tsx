import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputLogin from "@/shared/ui/InputLogin";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  register,
  selectAuthError,
  selectAuthStatus,
} from "@/features/auth/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    age: "",
  });
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectAuthStatus);
  const error = useAppSelector(selectAuthError);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess("");
    const result = await dispatch(
      register({ ...formData, age: Number(formData.age) }),
    );
    if (register.fulfilled.match(result)) {
      setSuccess("Аккаунт создан. Заходим!");
      const { email, password } = formData;
      setFormData({
        username: "",
        email: "",
        password: "",
        gender: "",
        age: "",
      });
      setTimeout(
        () => navigate("/login", { state: { email, password } }),
        2000,
      );
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1 className="login__title">Регистрация</h1>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="login__form">
          <div className="form-group">
            <label>Логин</label>
            <InputLogin
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Придумайте логин"
            />
          </div>

          <div className="form-group">
            <label>E-mail</label>
            <InputLogin
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Введите e-mail"
            />
          </div>

          <div className="form-group">
            <label>Пароль</label>
            <InputLogin
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Придумайте пароль"
            />
          </div>

          <div className="form-group">
            <label>Пол</label>
            <InputLogin
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              placeholder="Ваш гендер"
            />
          </div>

          <div className="form-group">
            <label>Возраст</label>
            <InputLogin
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Ваш возраст"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="form-group__btn-enter"
          >
            {status === "loading" ? "Регистрация..." : "Зарегистрироваться"}
          </button>
        </form>

        <p className="switch-link">
          Уже есть аккаунт?{" "}
          <Link to="/login" className="switch-link__login">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
