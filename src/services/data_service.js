import { ref, db, set, update, child, get, push, remove } from "./firebase";

class DataService {
  setFreezer = (userId, freezer) => {
    if (!userId) return;
    set(ref(db, `${userId}/freezers/${freezer.key}`), freezer);
  };

  updateFreezer = (userId, freezer) => {
    if (!userId) return;
    const updates = {};
    updates[`${userId}/freezers/${freezer.key}`] = freezer;
    const value = update(ref(db), updates);
  };

  deleteFreezer = (userId, freezerkey) => {
    if (!userId) return;
    console.log(freezerkey);
    // set(ref(db, `${userId}/freezers/${freezerkey}`));
  };

  setSections = (userId, freezerkey, section) => {
    if (!userId) return;
    set(ref(db, `${userId}/sections/${freezerkey}`), section);
  };

  updateSection = (userId, freezerkey, index, section) => {
    if (!userId) return;

    const updates = {};
    updates[`${userId}/sections/${freezerkey}/${index}`] = section;
    update(ref(db), updates);
  };

  deleteSection = (userId, freezerkey, index, sectionKey) => {
    if (!userId) return;
    console.log(`${userId}/sections/${freezerkey}/${index}/${sectionKey}`);
    remove(ref(db, `${userId}/sections/${freezerkey}/${index}/${sectionKey}`));
    remove(ref(db, `${userId}/foods/${sectionKey}`));
  };

  setFood = (userId, sectionkey, food) => {
    if (!userId) return;
    set(ref(db, `${userId}/foods/${sectionkey}/${food.key}`), food);
  };

  updateFood = (userId, sectionkey, food) => {
    if (!userId) return;
    const updates = {};
    updates[`${userId}/foods/${sectionkey}/${food.key}`] = food;
    const value = update(ref(db), updates);
  };

  setUserInfo = (userId, userInfo) => {
    if (!userId) return;
    set(ref(db, `${userId}/userInfo/`), userInfo);
  };

  getFoods = (userId, setFood, foodkey = "") => {
    if (!userId) return;
    const dbRef = ref(db);
    get(child(dbRef, `${userId}/foods/${foodkey}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setFood(snapshot.val());
      } else {
        setFood({});
      }
    });
  };

  getFreezerAll = async (userId) => {
    if (!userId) return;
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

  getFreezer = async (userId, exist, notExist) => {
    const dbRef = ref(db);
    const frz = get(child(dbRef, `${userId}/freezers/`));
    frz.then((snapshot) => {
      if (snapshot.exists()) {
        exist(snapshot.val());
      } else {
        notExist();
      }
    });
  };

  getUserInfo = (userId, exist, notExist) => {
    const dbRef = ref(db);
    get(child(dbRef, `${userId}/userInfo/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
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
