class FoodService {
  foods = async (userid) => {
    return await fetch("/sampledata.json", {
      method: "GET",
    }).then((data) => data.json());
  };
}

export default FoodService;
