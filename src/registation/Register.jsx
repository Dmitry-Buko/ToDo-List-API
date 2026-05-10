import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "", //"Olekkkag123"
    email: "", //"olekkkag1233@gmail.com"
    password: "", //Olekkkag1..|___2
    gender: "",
    age: "",
  });
  const [error, setError] = useState(""); //ошибка при загрузке
  const [loading, setLoading] = useState(false); //флаг загрузки
  const [success, setSuccess] = useState(""); //успех загрузки
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //регистрация пользователя
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setSuccess("");

    try {
      const response = await axios.post(
        "https://todo-redev.herokuapp.com/api/users/register",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
      setTimeout(() => {
        navigate("/login", {
          state: {
            username: formData.username,
            password: formData.password,
          },
        });
      }, 2000);

      setSuccess("Регистрация прошла успешно!Вы будете перенаправлены на страницу входа!");
      setFormData({
        username: "",
        email: "",
        password: "",
        gender: "",
        age: "",
      });
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
        <h1>Регистрация</h1>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="login__form">
          <div className="form-group">
            {" "}
            {/*Логин */}
            <label>Логин</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Придумайте логин"
              required
            />
          </div>

          <div className="form-group">
            {" "}
            {/*E-mail */}
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Введите e-mail"
              required
            />
          </div>

          <div className="form-group">
            {" "}
            {/*Пароль */}
            <label>Пароль</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Придумайте пароль"
              required
            />
          </div>

          <div className="form-group">
            {" "}
            {/*Gender */}
            <label>Пол</label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              placeholder="Ваш гендер"
              required
            />
          </div>

          <div className="form-group">
            {" "}
            {/*Возраст */}
            <label>Возраст</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Ваш возраст"
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Регистрация..." : "Зарегистрироваться"}
          </button>
        </form>

        <p className="switch-link">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
