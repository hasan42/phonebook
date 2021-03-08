import React from "react";
import { observer, inject } from "mobx-react";

import bookPhoneStore from "./store/bookPhoneStore";
import Table from "./components/Table";
import Form from "./components/Form";

import "./App.css";

const App = inject("bookPhoneStore")(
  observer(() => {
    const delRow = React.useCallback((id) => {
      bookPhoneStore.remove(id);
    }, []);
    const editRow = React.useCallback((item) => {
      bookPhoneStore.edit(item);
    }, []);

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
        {
          Header: "",
          id: "deleteRow",
          Cell: ({ row }) => {
            return (
              <>
                <button
                  className="btn btn-secondary"
                  onClick={() => editRow(row.original)}
                >
                  Редактировать
                </button>
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => delRow(row.original.id)}
                >
                  Удалить
                </button>
              </>
            );
          },
        },
      ],
      [delRow, editRow]
    );

    return (
      <div className="App">
        <header className="header">
          <h1>PhoneBook</h1>
        </header>
        <section>
          <article className="wrap">
            <Form />
            <Table data={bookPhoneStore.list} columns={columns} />
          </article>
        </section>
      </div>
    );
  })
);

export default App;
