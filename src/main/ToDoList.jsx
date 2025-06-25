import { Check, Edit3, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";

export default function TodoList() {
  // create some of : : to hold and control the process
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [filter, setFilter] = useState("all");

  // Create function ( function section)
  // todo function
  const addTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([
        ...todos,
        {
          id: Date.now(), // base on date
          text: inputValue.trim(), // user input task
          completed: false, // task done. set it false as default
          createdAt: new Date().toLocaleDateString(), // this create date can be flixible with other counntry
        },
      ]);
      setInputValue();
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    // a check icon for submit the edit
    setTodos(
      todos.map((todo) =>
        // get all things from "todos", then if it right the old value will replace by new value
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEdit = (id, text) => {
    setEditingId(id); // edit can be work with id
    setEditValue(text); // and text (like : todos title)
  };

  const saveEdit = (id) => {
    if (editValue.trim() !== "") {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: editValue.trim() } : todo
        )
      );
    }
    setEditingId(null);
    setEditValue("");
    // to default value
  };

  const cancelEdit = () => {
    setEditValue("");
    setEditingId(null);
    // to default value
  };

  const clearAllTodos = () => {
    setTodos([]); // throught back to the todos (empty task)
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed; // showing all active todos tasks
    if (filter === "completed") return todo.completed; // showing all completed todos tasks
    return true; // show all task as "all"
  });

  const completedCount = todos.filter((todo) => todo.completed).length; // count the completed task
  const totalCount = todos.length; // count all every task

  return (
    <div className="flex justify-center p-24 items-center Poppins">
      <main className="w-7xl bg-gray-100 rounded-2xl py-20">
        <div className="text-center ">
          <h1 className="text-6xl font-medium text-gray-700 mb-10 Poppins">
            Welcome to ToDoList
          </h1>
          <p>
            {totalCount > 0
              ? `${completedCount} of ${totalCount} task completed`
              : "No task yet!"}
          </p>
        </div>

        {/* Input */}
        <div className="text-center flex justify-center items-center gap-4 p-20">
          <input
            type="text"
            value={inputValue}
            placeholder="Add your new task here..."
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 px-4 py-4  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={addTodo}
            className="px-4 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <Plus />
          </button>
        </div>

        {/* Filter Buttons */}
        {todos.length > 0 && (
          <div className="flex gap-2 justify-center">
            {["all", "active", "completed"].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-lg capitalize  ${
                  filter === filterType
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              >
                {filterType}
              </button>
            ))}
            <button
              onClick={clearAllTodos}
              className="border-red-600 border-2  px-4 rounded-lg text-red-600 font-medium hover:text-white hover:bg-red-600"
            >
              Clear
            </button>
          </div>
        )}

        {/* Todo List */}
        <div className="text-center mt-10 p-10">
          {filteredTodos.length === 0 ? (
            <div>
              {todos.length === 0
                ? "Start by adding your first task!"
                : "No tasks match the current filter."}
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className={`flex items-center gap-3 p-4 border rounded-lg transition-all ${
                  todo.completed
                    ? "bg-green-100 border-green-200"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {/* CheckBox */}
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    todo.completed
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-gray-400 hover:border-green-400"
                  }`}
                >
                  {todo.completed && <Check size={14} />}
                </button>

                {/* todo content */}
                <div className="flex-1">
                  {editingId === todo.id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") saveEdit(todo.id);
                          if (e.key === "Escape") cancelEdit();
                        }}
                        className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                      <button
                        onClick={() => saveEdit(todo.id)}
                        className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="text-left  ">
                      <span
                        className={`text-lg ${
                          todo.completed
                            ? "text-gray-600 line-through "
                            : "text-gray-800 "
                        }`}
                      >
                        {todo.text}
                      </span>
                      <div className="text-sm text-gray-500 mt-1">
                        Created: {todo.createdAt}
                      </div>
                    </div>
                  )}
                </div>
                {editingId !== todo.id && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(todo.id, todo.text)}
                      className="p-2 text-blue-500 hover:bg-blue-100 rounded transition-colors"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="p-2 text-red-500 hover:bg-red-100 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        {/* Progress Bar */}
        {todos.length > 0 && (
          <div className="mt-6 text-center p-5">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round((completedCount / totalCount) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
