// src/App.jsx
import { ExpenseProvider } from "./context/ExpenseContext";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <ExpenseProvider>
      <Home />
    </ExpenseProvider>
  );
}

export default App;