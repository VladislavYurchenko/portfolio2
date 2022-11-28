import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import ActionCreatos from "../store/actionCreators/";

export const useAction = () => {
  const dispatch = useDispatch();
  return bindActionCreators(ActionCreatos, dispatch);
};
