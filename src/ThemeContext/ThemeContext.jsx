/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light")
  
  function switchTheme() {
    if (theme === "light") {
      setTheme("dark");
    }
    else {
      setTheme("light")
    }
  }
  return (
    <ThemeContext.Provider value={{theme,setTheme,switchTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider