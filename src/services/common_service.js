import { Cookies } from "react-cookie";

class CommonService {
  constructor(authSrviceContext) {
    this.cookies = new Cookies();
    this.authSrviceContext = authSrviceContext;
  }

  setCookie = (name, value, option = {}) => {
    return this.cookies.set(name, value, { ...option });
  };

  initAuth = ({ notExist }) => {
    this.authSrviceContext.checkUserState((user) => {
      if (user) {
        if (this.state.user.userId !== user.uid) {
          notExist();
          // alert('사용자가 없습니다. ')
          // navigate('/', {replace : true})
        }
      }
    });
  };
}

export default CommonService;
