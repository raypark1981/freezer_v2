export const TOGGLE_RIGHT_MYINFO = "TOGGLE_RIGHT_MYINFO";
export const ON_OFF_SPINNER = "ON_OFF_SPINNER";

const toggleRightMyInfo = (right_myinfo_opened) => {
  return {
    type: TOGGLE_RIGHT_MYINFO,
    right_myinfo_opened,
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
