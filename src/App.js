import "./styles.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function App() {
  const getPost = () => {
    return async (_dispatch) => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      _dispatch({ type: "FETCH_DATA", payload: data });
    };
  };
  useEffect(() => {
    dispatch(getPost());
  }, []);
  const dispatch = useDispatch();
  const list = useSelector((state) => state);
  const [page, setPage] = useState(1);
  console.log(list, "list");
  return (
    <div className="App">
      <table border="1px">
        <th>Serial No.</th>
        <th>Title</th>
        <th>Details</th>

        {list.slice(page * 10 - 10, page * 10).map((element) => {
          return (
            <tr key={element.id}>
              <td>{element.id}</td>
              <td>{element.title.slice(0, 11)}</td>
              <td>{element.body.slice(0, 51)}</td>
            </tr>
          );
        })}
      </table>

      <div>
        <span onClick={() => setPage(page === 1 ? 10 : page - 1)}>{" < "}</span>
        <span onClick={() => setPage(page === 10 ? 1 : page + 1)}>{" > "}</span>
      </div>
    </div>
  );
}
