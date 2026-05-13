import { useState } from "react";
function App() {
  const [expense, setExpense] = 
useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = 
useState<any[]>([]);
//function to add expense
  const addExpense = () => {
    if (!expense || !amount) return;
    const newExpense = {
      name: expense,
      amount: Number(amount)
    };
    setExpenses([...expenses,
newExpenses]);
    setExpense("");
    setAmount("");
  };

  return (
    <div>
      <h1>Finance Tracker</h1>
      <input
       placeholder="Enter expense" 
       value={expense} 
       onChange={(e) => 
setExpense(e.target.value)} 
      />
      <input
       type="number"
       placeholder="Enter amount"
       value={amount}
       onChange={(e) =>
      setAmount(e.target.value)}
        type="number"
      />
      <button onClick={() => 
alert(expense)}>
       Add Expense 
      </button>

      <ul>
        {expenses.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.amount}
          </li>
        ))}
      </ul>   
    </div>
  );
}
export default App;
