type User = {
  username: string;
  password: string;
};

const userKey = "kiwi-user";

const localStorageHelper = {
  setUser: (user: User) => {
    localStorage.setItem(userKey, JSON.stringify(user));
  },
  getUser: () => {
    const userJSON = localStorage.getItem(userKey);

    if (!userJSON) {
      return null;
    }

    return JSON.parse(userJSON) as User;
  },
};

export default localStorageHelper;
