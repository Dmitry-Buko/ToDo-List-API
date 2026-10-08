import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InputLogin from "@/shared/ui/InputLogin";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  login,
  selectAuthError,
  selectAuthStatus,
} from "@/features/auth/authSlice";

interface LocationState {
  email?: string;
  password?: string;
}

const Login = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;
  const [formData, setFormData] = useState({
    email: state?.email ?? "",
    password: state?.password ?? "",
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
    const result = await dispatch(login(formData));
    if (login.fulfilled.match(result)) {
      setSuccess("Вход успешно выполнен!");
      setFormData({ email: "", password: "" });
      setTimeout(() => navigate("/todo"), 1500);
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1 className="login__title">Вход в ToDo</h1>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="login__form">
          <div className="form-group">
            <label>E-mail</label>
            <InputLogin
              type="text"
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
              placeholder="Введите пароль"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="form-group__btn-enter"
          >
            {status === "loading" ? "Вход..." : "Войти"}
          </button>
        </form>

        <p className="switch-link">
          Нет аккаунта?
          <Link to="/register" className="switch-link__login">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
