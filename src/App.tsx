import "./App.css";
import CrudContent from "./component/crudContent";

function App() {
  return (
    <main className="w-full p-2 ">
      <div className="flex flex-col justify-center items-center px-6">
        <h2 className="font-bold w-full text-blue-800 text-center text-2xl underline underline-offset-4">
          CRUD in React with Redux and Static data
        </h2>
        <CrudContent />
      </div>
    </main>
  );
}

export default App;
