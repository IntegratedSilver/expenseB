import { useState } from "react"
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";


export const categories = ['Groceries', 'Utilities','Entertainment','Food','Shopping'];


const App = () => {

  //create a useState to help us handle our selectCategories
  const [selectedCategory, setSelectedCategory] = useState('')

  const [dummyExpensesArray, setDummyExpensesArray] = useState([
    {id: 1, description: 'aaa', amount: 10, category: 'Utilities'},
    {id: 2, description: 'bbb', amount: 15, category: 'Entertainment'},
    {id: 3, description: 'ccc', amount: 20, category: 'Food'},
    {id: 4, description: 'ddd', amount: 25, category: 'Shopping'},
    {id: 5, description: 'eee', amount: 16, category: 'Groceries'},
  ])

  const handleDelete = (id: number) =>{
    setDummyExpensesArray(dummyExpensesArray.filter(expense => expense.id !== id))
  }

  //create a variable with a ternary operator, we are going to use our selectedCategory as a boolean filter through our dummyExpensesArray
  const visibleExpense = selectedCategory ? dummyExpensesArray.filter(e => e.category === selectedCategory) : dummyExpensesArray
  return (
    <>

     <h1 className="text-center">Expense Tracker</h1> 

     <div>
      <ExpenseForm/>
     </div>

      <div className= "mb-5">
     <ExpenseFilter onSelectCategory={category => setSelectedCategory(category)}/>
      </div>

     <div className= "m-5">
     <ExpenseList expenses={visibleExpense} onDelete={handleDelete}/>
     </div>
    </>
  )
}

export default App