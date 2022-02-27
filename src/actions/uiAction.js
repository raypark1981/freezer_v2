export const TOGGLE_RIGHT_MYINFO = "TOGGLE_RIGHT_MYINFO";
export const ON_OFF_SPINNER = "ON_OFF_SPINNER";

const toggleRightMyInfo = () => {
  return {
    type: TOGGLE_RIGHT_MYINFO,
  };
};
const onOffSpiner = () => {
  return {
    type: ON_OFF_SPINNER,
  };
};
const uiActionCreator = {
  toggleRightMyInfo,
  onOffSpiner,
};

export default uiActionCreator;
