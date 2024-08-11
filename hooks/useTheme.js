import { useContext } from "react";
import { themeContext } from "../contexts/themeContext";


export const useTheme=()=> useContext(themeContext)