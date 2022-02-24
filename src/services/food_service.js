class FoodService {
  foods = async (userid) => {
    return await fetch("/sampledata.json", {
      method: "GET",
    }).then((data) => data.json());
  };

  addfood = async (food) => {
    return await fetch("/");
  };
}

export default FoodService;
