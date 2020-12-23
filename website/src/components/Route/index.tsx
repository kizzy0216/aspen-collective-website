import React from "react";
import { Route as RRDRoute, RouteProps, useHistory } from "react-router-dom";
import { urls } from "../../routing";
import { SessionService } from "../../services";
import { getItem } from "../../helpers/storage";
import { sleep } from "../../helpers";
interface IProps extends RouteProps {
  isAuthenticated: boolean;
}

const Route: React.FC<IProps> = ({ isAuthenticated, ...props }) => {
  const { push } = useHistory();
  const isSessionActive = SessionService.isSessionActive;
  const delay = async () => {
    await sleep(2500);
    push(urls.start);
  };
  //redirect to home if keystore is empty
  if (props.path !== "/start" && !isSessionActive) {
    if (props.path === "/") {
      delay();
    } else push(urls.start);
  }
  //redirect to start if trying to visit "start" though keystore has already set
  if (props.path === "/start" && isSessionActive) {
    push(urls.home);
  }
  if (props.path === "/success" && !getItem("Success")) {
    push(urls.root);
  }
  return <RRDRoute {...props} />;
};

export default Route;
