import Todo from "../models/Todo.js";

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    console.error("Lỗi khi gọi getAllTodos", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const createTodo = async (req, res) => {
  try {
    const { text } = req.body;
    const todo = new Todo({ text });

    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Lỗi khi gọi createTodo", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { text, completed } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        text,
        completed,
      },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Nhiệm vụ không tồn tại" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Lỗi khi gọi updateTodo", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const deleteTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deleteTodo) {
      return res.status(404).json({ message: "Nhiệm vụ không tồn tại" });
    }

    res.status(200).json(deleteTodo);
  } catch (error) {
    console.error("Lỗi khi gọi deleteTodo", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
