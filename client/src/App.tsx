import { useState } from "react";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const [dummyExpensesArray, setDummyExpensesArray] = useState([
    { id: 1, description: "", amount: 0, category: "" },
  ]);
  const visibleExpense = selectedCategory
    ? dummyExpensesArray.filter((e) => e.category === selectedCategory)
    : dummyExpensesArray;
  const handleDelete = (id: number) => {
    setDummyExpensesArray(
      dummyExpensesArray.filter((expense) => expense.id !== id)
    );
  };
  return (
    <>
      <div className="container mainCont">
        <h1 className="text-center my-5">Expense App</h1>
        <div className="container">
          <div className="container my-4 mx-4 flexCont">
            <div className="container formCont col-4">
              <h2 className="text-center">New Expense</h2>
              <div className="m-4 formStyle">
                <ExpenseForm
                  onHelpSubmit={(expense) =>
                    setDummyExpensesArray([
                      ...dummyExpensesArray,
                      { ...expense, id: dummyExpensesArray.length + 1 },
                    ])
                  }
                />
              </div>
              <h4 className="m-4">Selected Category</h4>
              <div className="m-4 ms-4">
                <ExpenseFilter
                  onSelectedCategory={(category) =>
                    setSelectedCategory(category)
                  }
                />
              </div>
            </div>
            <div className="container">
              <div className="col">
                <h2 className="text-center expenseMargin">Expense Table</h2>
                <div className="m-5">
                  <ExpenseList
                    expenses={visibleExpense}
                    onDelete={handleDelete}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
