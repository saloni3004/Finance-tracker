import { useState } from "react";
function App() {
  const [expense, setExpense] = 
useState("");
  return (
    <div>
      <h1>Finance Tracker</h1>
      <input
       placeholder="Enter expense" 
       value={expense} 
       onChange={(e) => 
setExpense(e.target.value)} 
      />
      <button onClick={() => 
alert(expense)}>
       Add Expense 
      </button>
    </div>
  );
}
export default App;
