import "./App.css";
import Counter from "./components/Counter";
import UserComponent from "./components/UserForm";

function App() {
  return (
    <>
      <div className="main-container">
        <div>
          <Counter />
        </div>
        <div>
          <UserComponent />
        </div>
      </div>
    </>
  );
}

export default App;
