import { useNavigate } from "react-router-dom";
import ButtonLogout from "@/shared/ui/mui_components/ButtonLogout";
import { useAppDispatch } from "@/app/hooks";
import { taskApi } from "@/features/todos/taskApi";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(taskApi.util.resetApiState());
    navigate("/login", { replace: true });
  };

  return (
    <header className="header">
      <ButtonLogout onClick={handleLogout} />
      <h1 className="todo__title">ToDo List API</h1>
    </header>
  );
};

export default Header;
