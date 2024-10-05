import "./style.module.scss";
import { useDispatch } from "react-redux";
import { BsCheckCircle, BsPencil, BsTrash } from "react-icons/bs";
import { changeTodoStatus, removeFromTodos } from "../../store/slice";

const Todo = ({ todo, handleEdit }) => {
  const dispatch = useDispatch();

  // A function to handle the status property.
  const handleStatus = () => {
    dispatch(changeTodoStatus(todo.id));
  };

  // A function to handle the delete button.
  const handleDelete = () => {
    dispatch(removeFromTodos(todo.id));
  };

  return (
    <div className="todo">
      <div className="text">
        <span className={`${todo.status === "complete" && "complete"}`}>
          {todo.text}
        </span>
      </div>
      <div className="edit">
        <div onClick={() => handleEdit(todo.id)}>
          <BsPencil />
        </div>
        <div onClick={handleStatus}>
          <BsCheckCircle />
        </div>
        <div onClick={handleDelete}>
          <BsTrash />
        </div>
      </div>
    </div>
  );
};

export default Todo;
