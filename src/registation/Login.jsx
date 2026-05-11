import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: location.state?.email || "",
    password: location.state?.password || "",
  });
  const [error, setError] = useState(""); //ошибка при загрузке
  const [loading, setLoading] = useState(false); //флаг загрузки
  const [success, setSuccess] = useState(""); //успех загрузки
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (location.state?.email || location.state?.password) {
  //     setFormData({
  //       email: location.state.email || "",
  //       password: location.state.password || "",
  //     });
  //     console.log("location: ", location);
  //   }
  // }, [location]); //добавление логина и пароля после регистрации
  // console.log(formData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const url = "https://todo-redev.herokuapp.com/api/auth/login";
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(url, formData, config);
      const token = response.data?.token;
      if (token) {
        localStorage.setItem("token", token);
        setSuccess("Вход успешно выполнен!");
        setFormData({
          email: "",
          password: "",
        });
        setTimeout(()=>{
          navigate('/todo')
        },1500)
      } else {
        setError("Токен не получен!");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.errors?.[0]?.msg ||
        error?.response?.data?.message;
      if (errorMessage) setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1>Вход в ToDo</h1>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="login__form">
          <div className="form-group">
            <label>Логин</label>
            <input
              type="text"
              name="email"
              value={formData.email}
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
