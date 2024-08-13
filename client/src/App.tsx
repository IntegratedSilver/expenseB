import axios from "axios";
import { useState, useEffect } from "react";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";


interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://localhost:5159/api/Expense')
      .then(response => {
        setExpenses(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching expenses:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id: number) => {
    axios.delete(`https://localhost:5159/api/Expense/${id}`)
      .then(() => {
        setExpenses(expenses.filter((expense) => expense.id !== id));
      })
      .catch(error => {
        console.error('Error deleting expense:', error);
      });
  };

  const handleAddExpense = (newExpense: Omit<Expense, "id">) => {
    axios.post('https://localhost:5159/api/Expense', newExpense)
      .then(response => {
        setExpenses([...expenses, response.data]);
      })
      .catch(error => {
        console.error('Error adding expense:', error);
      });
  };

  const visibleExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category === selectedCategory)
    : expenses;

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1 className="text-center">Expense Tracker</h1>
      <div className="m-5">
        <ExpenseForm onAddExpense={handleAddExpense} />
      </div>
      <div className="m-5">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>
      <div className="m-5">
        <ExpenseList expenses={visibleExpenses} onDelete={handleDelete} />
      </div>
    </>
  );
};

export default App;
