import { ref, db, set, update, child, get, push } from "./firebase";

class DataService {
  setFreezers = (userId, freezer) => {
    set(ref(db, `${userId}/freezers/${freezer.key}`), freezer);
  };

  setSections = (userId, freezerkey, section) => {
    set(ref(db, `${userId}/sections/${freezerkey}`), section);
  };

  setFood = (userId, sectionkey, food) => {
    set(ref(db, `${userId}/foods/${sectionkey}/${food.key}`), food);
  };

  updateFood = (userId, sectionkey, food) => {
    const updates = {};
    updates[`${userId}/foods/${sectionkey}/${food.key}`] = food;
    const value = update(ref(db), updates);
  };

  setUserInfo = (userId, userInfo) => {
    set(ref(db, `${userId}/userInfo/`), userInfo);
  };

  getFoods = (userId, setFood, foodkey = "") => {
    const dbRef = ref(db);
    get(child(dbRef, `${userId}/foods/${foodkey}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setFood(snapshot.val());
      } else {
        setFood({});
      }
    });
  };

  getFreezer = async (userId, exist, notExist) => {
    const dbRef = ref(db);
    const frz = get(child(dbRef, `${userId}/freezers/`));
    const sec = get(child(dbRef, `${userId}/sections/`));

    const snapshots = await Promise.all([frz, sec]);
    const datas = snapshots.map((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
    });
    return datas;
  };

  getUserInfo = (userId, exist, notExist) => {
    const dbRef = ref(db);
    get(child(dbRef, `${userId}/userInfo/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(1);
          exist(snapshot.val());
        } else {
          notExist();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export default DataService;
