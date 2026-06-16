import { useDispatch } from "react-redux";
import { logout } from "../rtk/taksSlice";
import { useNavigate } from "react-router-dom";
import ButtonLogout from "../mui components/ButtonLogout";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout())
    navigate('/login', {replace: true})
  };
  return (
    <header className="header">
      <ButtonLogout onClick={handleLogout}/>
      <h1 className="todo__title">ToDo List API</h1>
    </header>
  );
};

export default Header;
