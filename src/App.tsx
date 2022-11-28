import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { refresh } from "./store/actionCreators/AuthActionCreator";
import { useTypedSelector } from "./hooks/useTypedSelector";
import Loading from "./components/loading/Loading";
// import Error from "./components/error/Error";
import Settings from "./components/settings";
import LinkList from "./components/liskslist";
import Auth from "./components/auth/";
import Notifications from "./components/notifications";

function App() {
  const { isAuth, loading } = useTypedSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(refresh());
    }
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }
  // if (error) {
  //   return <Error />;
  // }

  const Main = () => {
    if (!isAuth) return <Redirect to="/auth" />;
    return (
      <>
        <Settings />
        <LinkList />
      </>
    );
  };

  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/welcome">
            {/* <FirstVisit
              fvtoggle={localStorageStore.setFirstVisit.bind(localStorageStore)}
            ></FirstVisit> */}
          </Route>
          <Route path="/auth" component={Auth} />
          <Redirect to="/" />
        </Switch>
      </div>
      <Notifications />
    </BrowserRouter>
  );
}

export default App;
