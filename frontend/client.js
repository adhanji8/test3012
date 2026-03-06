// const BASEURL = `http://localhost:8085`;
// const BASE_PROD_URL = `https://test3012-production.up.railway.app`;
document.addEventListener("DOMContentLoaded", (event) => {
  async function getAllTodos() {
    const res = await fetch(`/todos`);
    const data = res.json();
    return data;
  }
  function todosToHtml(todos) {
    return todos.map((todo) => `<p>${todo.title}</p>`).join("");
  }
  async function main() {
    const todos = await getAllTodos();
    const root = document.querySelector("#root");
    root.innerHTML = `
    <div id="todos-container">
    ${todosToHtml(todos)}
    </div>
    <hr>
      <form>
        <label for="title">Title</label>
        <input type="text" name="title" id="title" class="title">
        <button>Create Todo</button>
      </form>
    `;
    const form = document.querySelector("form");
    form.addEventListener("submit", async (e) => {
      // ? -----CLIENT-SIDE WORK-----
      e.preventDefault(); // ! DO NOT RELOAD THE PAGE
      const input = document.querySelector("input");
      const title = input.value; // study golang
      const todosContainer = document.querySelector("#todos-container");
      const p = document.createElement("p");
      p.appendChild(document.createTextNode(title));
      todosContainer.appendChild(p);
      input.value = "";
      // ? -----SERVER-SIDE WORK-----
      try {
        const response = await fetch(`/todos`, {
          method: "post",
          body: JSON.stringify({ title }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Something went wrong");
      } catch (error) {
        todosContainer.lastElementChild.remove();
      }
    });
  }
  main();
});
