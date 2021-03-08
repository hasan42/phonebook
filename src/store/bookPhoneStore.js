import { runInAction, makeObservable, observable, autorun, action } from "mobx";
import { generateId } from "../helpers/generateId";

/**
 * @description Начальные значения для формы
 */
const initialValues = {
  id: "",
  firstName: "",
  lastName: "",
  phone: "",
};
class BookPhoneStore {
  list = [];
  formInitial = { ...initialValues };

  /**
   * Добавление или редактирование элемента
   * @param {*} newItem элемент
   */
  async add(newItem) {
    try {
      if (newItem.id === "") {
        const newId = generateId();
        fetch("http://localhost:8080/add", {
          method: "POST",
          body: JSON.stringify({ ...newItem, id: newId }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            runInAction(() => {
              this.list = data;
            });
          });
      } else {
        fetch("http://localhost:8080/edit", {
          method: "POST",
          body: JSON.stringify({ ...newItem }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            runInAction(() => {
              this.list = data;
            });
          });

        this.formInitial = { ...initialValues };
      }
      // console.log(response.json());
      // this.data();
    } catch (error) {
      console.log("error ", error);
    }
  }

  /**
   * Удаление элемента
   * @param {*} id элемента для удаления
   */
  async remove(id) {
    fetch("http://localhost:8080/delete", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        runInAction(() => {
          this.list = data;
        });
      });
  }

  /**
   * Перезаписывает значения по умолчанию для формы
   * @param {*} editItem новые значения для формы
   */
  edit(editItem) {
    this.formInitial = { ...editItem };
  }

  /**
   * Получение списка элементов с сервера
   * @returns Список элементов
   */
  data() {
    fetch("http://localhost:8080/")
      .then((res) => res.json())
      .then((data) => {
        runInAction(() => {
          this.list = data;
        });
      });
  }

  constructor(list) {
    makeObservable(this, {
      list: observable,
      formInitial: observable,
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
