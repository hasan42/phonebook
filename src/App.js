import React from "react";
import Table from "./components/Table";
import Form from "./components/Form";

import "./App.css";

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Имя",
        accessor: "firstName",
      },
      {
        Header: "Фамилия",
        accessor: "lastName",
      },
      {
        Header: "Телефон",
        accessor: "phone",
      },
    ],
    []
  );
  const data = [
    { firstName: "AAAAqwwe", lastName: "asdd", phone: 789456123 },
    { firstName: "Aqwwe", lastName: "asdd", phone: 22789456123 },
    { firstName: "qwSwe", lastName: "asdd", phone: 33789456123 },
    { firstName: "qwFwe", lastName: "asdd", phone: 4789456123 },
  ];

  return (
    <div className="App">
      <header className="header">
        <h1>PhoneBook</h1>
      </header>
      <section>
        <article className="wrap">
          <Form />
          <Table data={data} columns={columns} />
        </article>
      </section>
    </div>
  );
}

export default App;
