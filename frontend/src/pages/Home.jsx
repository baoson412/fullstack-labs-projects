import React from "react";
import { useEffect, useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import axios from "axios";
import { Toaster, toast } from "sonner";

const Home = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [status, setStatus] = useState("all"); // all | active | completed

  const addTodo = async (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      try {
        const response = await axios.post("/api/todos", { text: newTodo });
        setTodos([...todos, response.data]);
        toast.success(`Nhiệm vụ ${newTodo} đã được thêm vào.`);
      } catch (error) {
        console.log("Lỗi xảy ra khi thêm task:", error);
        toast.error("Lỗi xảy ra khi thêm nhiệm vụ mới.");
      }
      setNewTodo("");
    } else {
      toast.error("Bạn cần nhập nội dung của nhiệm vụ.");
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api/todos");
      console.log(response.data);
      setTodos(response.data);
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const filteredTodos = todos.filter((todo) => {
    if (status === "active") return !todo.completed;
    if (status === "completed") return todo.completed;
    return true;
  });

  const startEditing = (todo) => {
    setEditingTodo(todo._id);
    setEditedText(todo.text);
  };

  const saveEdit = async (id) => {
    try {
      const response = await axios.patch(`/api/todos/${id}`, {
        text: editedText,
      });
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      setEditingTodo(null);
      toast.success(`Nhiệm vụ đã đổi thành ${editedText}`);
    } catch (error) {
      console.log("Error updating todo:", error);
      toast.error("Lỗi xảy ra khi cập nhật nhiệm vụ.");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
      toast.success("Nhiệm vụ đã xoá.");
    } catch (error) {
      console.error("Lỗi xảy ra khi xoá task.", error);
      toast.error("Lỗi xảy ra khi xoá nhiệm vụ.");
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id);
      const response = await axios.patch(`/api/todos/${id}`, {
        completed: !todo.completed,
      });
      setTodos(todos.map((t) => (t._id === id ? response.data : t)));
    } catch (error) {
      console.log("Lỗi khi toggle todo:", error);
    }
  };

  return (
    <>
      <Toaster richColors position="top-right" />

      {/* Màu nền */}
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        {/* Khung chính */}
        <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-md">
          {/* Tiêu đề */}
          <h1 className="text-3xl font-bold text-gray-700 text-center mb-6">
            My To-Do List
          </h1>

          {/* Form thêm task */}
          <form
            onSubmit={addTodo}
            className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg"
          >
            <input
              className="flex-1 px-3 py-2 rounded-md outline-none text-gray-700 bg-white border border-gray-200"
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Nhập việc cần làm..."
              required
            />

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Add
            </button>
          </form>

          {/* Các nút lọc  */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              onClick={() => setStatus("all")}
              className={`px-3 py-1 rounded-md border ${
                status === "all" ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              Tất cả
            </button>

            <button
              onClick={() => setStatus("active")}
              className={`px-3 py-1 rounded-md border ${
                status === "active" ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              Đang làm
            </button>

            <button
              onClick={() => setStatus("completed")}
              className={`px-3 py-1 rounded-md border ${
                status === "completed" ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              Hoàn thành
            </button>
          </div>

          {/* Danh sách task */}
          <div className="mt-6">
            {filteredTodos.length === 0 ? (
              <p className="text-gray-500 text-center">Chưa có việc nào</p>
            ) : (
              <div className="flex flex-col gap-3">
                {filteredTodos.map((todo) => (
                  <div key={todo._id}>
                    {/* Nếu đang sửa và hoàn thành sửa */}
                    {editingTodo === todo._id ? (
                      <div className="flex items-center gap-2">
                        <input
                          className="flex-1 px-3 py-2 border rounded-md outline-none"
                          type="text"
                          value={editedText}
                          onChange={(e) => setEditedText(e.target.value)}
                        />

                        <button
                          onClick={() => saveEdit(todo._id)}
                          className="bg-green-500 text-white px-3 py-2 rounded-md"
                        >
                          <MdOutlineDone />
                        </button>

                        <button
                          onClick={() => setEditingTodo(null)}
                          className="bg-gray-200 text-gray-700 px-3 py-2 rounded-md"
                        >
                          <IoClose />
                        </button>
                      </div>
                    ) : (
                      /* Hiển thị task */
                      <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                        <div className="flex items-center gap-3">
                          {/* Tick */}
                          <button
                            onClick={() => toggleTodo(todo._id)}
                            className={`h-6 w-6 flex items-center justify-center rounded-full border 
                            ${
                              todo.completed
                                ? "bg-green-500 text-white border-green-500"
                                : "border-gray-300"
                            }`}
                          >
                            {todo.completed && <MdOutlineDone />}
                          </button>

                          {/* Text task */}
                          <span
                            className={`text-gray-700 ${
                              todo.completed ? "line-through opacity-60" : ""
                            }`}
                          >
                            {todo.text}
                          </span>
                        </div>

                        {/* Nút bắt đầu edit + delete */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => startEditing(todo)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <MdModeEditOutline />
                          </button>

                          <button
                            onClick={() => deleteTodo(todo._id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
