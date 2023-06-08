import { GlobalStyles } from "@ui/theme/GlobalStyles";
import { todoController } from "@ui/controller/todo";
import React from "react";

const bg =
  "https://super.abril.com.br/wp-content/uploads/2021/08/SI_430_Lo-fi_site.png?w=1024&resize=1200,800";

interface HomeTodo {
  id: string;
  content: string;
}

/* eslint-disable space-before-function-paren */
function HomePage() {
  const [totalPages, setTotalPages] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [todos, setTodos] = React.useState<HomeTodo[]>([]);

  const hasMoresPages = totalPages > page;

  const isFirstPage = page == 1;

  // using useEffect to load infos onload
  isFirstPage
    ? React.useEffect(() => {
        todoController.get({ page }).then(({ todos, pages }) => {
          setTodos((oldTodos) => {
            return [...oldTodos, ...todos];
          });
          setTotalPages(pages);
        });
      }, [page])
    : React.useEffect(() => {
        todoController.get({ page }).then(({ todos }) => {
          setTodos((oldTodos) => {
            return [...oldTodos, ...todos];
          });
        });
      }, [page]);

  return (
    <main>
      <GlobalStyles themeName="indigo" />
      <header
        style={{
          backgroundImage: `url('${bg}')`,
        }}
      >
        <div className="typewriter">
          <h1>What is your next task?</h1>
        </div>
        <form>
          <input type="text" placeholder="Go to the gym, Do the dishes..." />
          <button type="submit" aria-label="Add new task">
            +
          </button>
        </form>
      </header>

      <section>
        <form>
          <input type="text" placeholder="Search for" />
        </form>

        <table border={1}>
          <thead>
            <tr>
              <th align="left">
                <input type="checkbox" disabled />
              </th>
              <th align="left">Task</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {todos.map((todo) => {
              return (
                <tr key={todo.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{todo.content}</td>
                  <td align="right">
                    <button data-type="delete">Delete</button>
                  </td>
                </tr>
              );
            })}

            <tr>
              <td colSpan={4} align="center" style={{ textAlign: "center" }}>
                Loading...
              </td>
            </tr>

            {/* <tr>
              <td colSpan={4} align="center">
                Can&apos;t find any task
              </td>
            </tr> */}

            {hasMoresPages && (
              <tr>
                <td colSpan={4} align="center" style={{ textAlign: "center" }}>
                  <button
                    data-type="load-more"
                    onClick={() => setPage(page + 1)}
                  >
                    Page {page} - Load more{" "}
                    <span
                      style={{
                        display: "inline-block",
                        marginLeft: "4px",
                        fontSize: "1.2em",
                      }}
                    >
                      ↓
                    </span>
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default HomePage;
