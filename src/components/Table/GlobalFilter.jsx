import React from "react";
import { useAsyncDebounce } from "react-table";

const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className="mt-5">
      <div className="col">
        <label htmlFor="firstName" className="form-label">
          Поиск:
        </label>
        <input
          className="form-control"
          type="text"
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`Имя или фамилия или телефон`}
        />
      </div>
    </div>
  );
};

export default GlobalFilter;
