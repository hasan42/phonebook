import { BookPhoneStore } from "./bookPhoneStore";

class RootStore {
  constructor() {
    this.bookPhoneStore = new BookPhoneStore(this);
  }
}

const rootStore = new RootStore();

export default rootStore;
export { RootStore };
