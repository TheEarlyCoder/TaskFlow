import { useEffect, useState, useRef, useReducer } from "react";
import api from "../services/api.js";
import { Trash, SquarePen, SquareCheckBig } from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const Dashboard = () => {
  const editInputRef = useRef(null);
  const [user, setUser] = useState(null);
  const [content, setContent] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await api.get("/v1/users/current-user");
        setUser(response.data.user);
      } catch (error) {
        console.log(error.response?.data?.message);
      }
    };
    getCurrentUser();
  }, []);

  const getTodos = async () => {
    try {
      const response = await api.get("/v1/todos/alltodos");
      setTodos(response.data.todos);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const createTodo = async () => {
    try {
      const response = await api.post("/v1/todos/create-todo", {
        content: content,
      });
      setTodos((prevTodo) => [...prevTodo, response.data.todo]);
      console.log(response.data);
      setContent("");
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  const toggleTodo = async (id, currentStatus) => {
    try {
      const response = await api.patch(`/v1/todos/${id}`, {
        isCompleted: !currentStatus,
      });
      const updatedTodo = response.data.todo;
      setTodos((prevTodo) =>
        prevTodo.map((todo) =>
          todo._id === updatedTodo._id ? updatedTodo : todo,
        ),
      );
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await api.delete(`/v1/todos/${id}`);
      const updatedTodo = response.data.todo;
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const editTodo = (id) => {
    setEditingId(id);
    const todo = todos.find((todo) => id === todo._id);
    setEditContent(todo.content);
  };

  const saveTodo = async (id) => {
    try {
      const newTodo = await api.patch(`/v1/todos/${id}`, {
        content: editContent,
      });
      const updatedTodo = newTodo.data.todo;
      console.log(updatedTodo);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === updatedTodo._id ? updatedTodo : todo,
        ),
      );
      setEditingId(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editingId]);

  const filteredTodos = todos.filter((todo) => {
    return (
      activeFilter === "all" ||
      (activeFilter === "pending" && !todo.isCompleted) ||
      (activeFilter === "completed" && todo.isCompleted)
    );
  });

  const allTodos = todos.length;

  const completedTodos = todos.filter((todo) => todo.isCompleted).length;

  const pendingTodos = allTodos - completedTodos;

  const chartData = [
    {
      name: "Completed",
      value: completedTodos,
    },
    {
      name: "Pending",
      value: pendingTodos,
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-screen-2xl mx-auto">
        {/* Welcome */}
        {user && (
          <div className="mb-10">
            <h1 className="text-3xl font-semibold">
              Welcome back, {user.fullName} 👋
            </h1>

            <p className="text-neutral-400 mt-2">
              Manage your tasks and stay productive.
            </p>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)_320px] items-start">

          <aside className="space-y-2">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>

            {/* All button */}
            <button
              onClick={() => setActiveFilter("all")}
              className= {`w-full text-left px-4 py-3 rounded-xl duration-150 hover:cursor-pointer ${activeFilter === "all" ? "text-orange-400" : "text-white"}`}
              
            >
              All Tasks
            </button>
            {/* Pending button */}
            <button
              onClick={() => setActiveFilter("pending")}
              className= {`w-full text-left px-4 py-3 rounded-xl duration-150 hover:cursor-pointer ${activeFilter === "pending" ? "text-orange-400" : "text-white"}`}
            >
              Pending Tasks
            </button>
            {/* Completed button */}
            <button
              onClick={() => setActiveFilter("completed")}
              className= {`w-full text-left px-4 py-3 rounded-xl duration-150 hover:cursor-pointer ${activeFilter === "completed" ? "text-orange-400" : "text-white"}`}
            >
              Completed Tasks
            </button>
          </aside>
          <main className="min-w-0 space-y-6">
            {/* Move your existing Add Todo card here */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
              <h2 className="text-lg font-medium mb-4">Add a new task</h2>

              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="What do you need to do?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="flex-1 bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 outline-none focus:border-neutral-500 placeholder:text-neutral-500"
                />

                <button
                  className="px-5 py-3 bg-white text-black rounded-xl font-medium hover:bg-neutral-200 transition hover:cursor-pointer"
                  onClick={createTodo}
                >
                  Add Todo
                </button>
              </div>
            </div>
            {/* Move your existing Todo section here */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Your Todos</h2>
              {filteredTodos.length === 0 ? (
                <div className="text-neutral-500 text-sm">No todos yet.</div>
              ) : (
                <div className="space-y-3">
                  {filteredTodos.map((todo) => (
                    <div
                      key={todo._id}
                      className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex justify-between"
                    >
                      <div className="flex gap-4">
                        <input
                          type="checkbox"
                          checked={todo.isCompleted}
                          onChange={() =>
                            toggleTodo(todo._id, todo.isCompleted)
                          }
                        />

                        <p
                          className={
                            todo.isCompleted
                              ? "line-through text-neutral-500"
                              : "text-white"
                          }
                        >
                          {editingId === todo._id ? (
                            <input
                              type="text"
                              value={editContent}
                              ref={editInputRef}
                              onChange={(e) => setEditContent(e.target.value)}
                            />
                          ) : (
                            todo.content
                          )}
                        </p>
                      </div>
                      <div className="flex gap-4 items-center">
                        <button
                          className="hover: cursor-pointer"
                          onClick={() => editTodo(todo._id)}
                        >
                          {editingId === todo._id ? (
                            <div
                              className=" px-1.5 bg-white text-black rounded-xl font-medium hover:bg-neutral-200 transition hover:cursor-pointer"
                              onClick={() => saveTodo(todo._id)}
                            >
                              Save
                            </div>
                          ) : (
                            <SquarePen size={20} />
                          )}
                        </button>
                        <button
                          className="hover: cursor-pointer"
                          onClick={() => deleteTodo(todo._id)}
                        >
                          <Trash size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
          <aside className="min-w-0">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
            <h2 className="text-lg font-medium mb-4">Task Overview</h2>
            <h3>Total tasks: {todos.length}</h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={chartData} dataKey="value" nameKey="name">
                  {chartData.map((data) => (
                    <Cell
                      className="hover:cursor-pointer"
                      key={data.name}
                      fill={data.name === "Completed" ? "#29B384" : "#E78E00"}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
