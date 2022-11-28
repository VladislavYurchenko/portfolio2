import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store/reduscers";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
