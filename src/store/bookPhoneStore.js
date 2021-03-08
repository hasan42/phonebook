import { makeObservable, observable, autorun, action } from "mobx";
import { generateId } from "../helpers/generateId";

class BookPhoneStore {
  list = [];

  async add(newItem) {
    const newId = generateId();
    const response = await fetch("http://localhost:8080/add", {
      method: "POST",
      body: JSON.stringify({ id: newId, ...newItem }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    this.data();
  }
  async remove(id) {
    console.log(id);
    const response = await fetch("http://localhost:8080/delete", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    this.data();
  }
  edit(editItem) {
    this.list.map((el) => {
      if (el.id === editItem.id) {
        return { ...el, ...editItem };
      }
      return { ...el };
    });
  }

  data() {
    fetch("http://localhost:8080/")
      .then((res) => res.json())
      .then((data) => (this.list = data));
    return this.list;
  }

  constructor(list) {
    makeObservable(this, {
      list: observable,
      stringTest: observable,
      add: action,
      remove: action,
      edit: action,
      data: action,
    });
  }
}

const bookPhoneStore = new BookPhoneStore();

autorun(() => {
  bookPhoneStore.data();
});

export default bookPhoneStore;
export { BookPhoneStore };
