import "../App/App.css";
import TaskForm from "../TaskForm/TaskForm";
import TaskList from "../TaskList/TaskList";

function Home() {
  return (
    <>
      <section>
        <h2>Add task</h2>
        <TaskForm />
      </section>
      <section>
        <h2>Tasks overview</h2>
        <TaskList />
      </section>
    </>
  );
}

export default Home;
