import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
      setFormData({
        username: location.state.username,
        password: location.state.password,
      });
  }, [location.state]); //добавление логина и пароля после регистрации
console.log(formData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1>Вход в ToDo</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login__form">
          <div className="form-group">
            <label>Логин</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Введите логин"
              required
            />
          </div>

          <div className="form-group">
            <label>Пароль</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Введите пароль"
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>

        <p className="switch-link">
          Нет аккаунта?
          <Link to="/register">Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
