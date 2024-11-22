import React,{useEffect , useState} from 'react';
import axios from 'axios';

function Home() {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [newTodo, setNewTodo] = useState("");
  
    useEffect(() => {
      const fetchtodos = async () => {
        try {
          setLoading(true);
          const response = await axios.get("http://localhost:4002/todo/fetch", {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(response.data.todos);
          setTodos(response.data.todos);
          setError(null);
        } catch (error) {
          setError("Failed to fetch todos");
        } finally {
          setLoading(false);
        }
      };
      fetchtodos();
    }, []);

    const todoCreate = async () => {
        if (!newTodo) return;
        try {
          const response = await axios.post(
            "http://localhost:4002/todo/create",
            {
              text: newTodo,
              completed: false,
            },
            {
              withCredentials: true,
            }
          );
          console.log(response.data.newTodo);
          setTodos([...todos, response.data.newTodo]);
          setNewTodo("");
        } catch (error) {
          setError("Failed to create todo");
        }
      };
    
      const todoStatus = async (id) => {
        const todo = todos.find((t) => t._id === id);
        try {
          const response = await axios.put(
            `http://localhost:4002/todo/update/${id}`,
            {
              ...todo,
              completed: !todo.completed,
            },
            {
              withCredentials: true,
            }
          );
          console.log(response.data.todo);
          setTodos(todos.map((t) => (t._id === id ? response.data.todo : t)));
        } catch (error) {
          setError("Failed to find todo status");
        }
      };
    
      const todoDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:4002/todo/delete/${id}`, {
            withCredentials: true,
          });
          setTodos(todos.filter((t) => t._id !== id));
        } catch (error) {
          setError("Failed to Delete Todo");
        }
      };

      const navigateTo = useNavigate();
  const logout = async () => {
    try {
      await axios.get("http://localhost:4002/user/logout", {
        withCredentials: true,
      });
      toast.success("User logged out successfully");
      navigateTo("/login");
      localStorage.removeItem("jwt");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const remainingTodos = todos.filter((todo) => !todo.completed).length;

  
    return (
    <div>
      Home
    </div>
  )
}

export default Home
