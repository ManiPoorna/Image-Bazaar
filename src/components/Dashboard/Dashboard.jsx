/* eslint-disable no-unused-vars */
import Navbar from "../Navbar/Navbar";
import "./style.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ThemeProvider, { ThemeContext } from "../../ThemeContext/ThemeContext";

const Dashboard = () => {

  const { theme, setTheme, switchTheme } = useContext(ThemeContext);
  console.log(theme)
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);


  useEffect(() => {
    getImages("nature")
  },[])

  const getImages = async (search) => {
    try {
      setloading(true)
      const response = await axios.get("https://api.unsplash.com/search/photos", {
        params: {
          query: search,
        },
        headers: {
          Authorization: "Client-ID o2DoX5p9nVj_3tzySg0xpZsb2UioALL9bVGAJMDkTCk",
        },
      });
      console.log(response.data.results)
      setData(response.data.results)
      setTimeout(() => {
        setloading(false)
      }, 1000);
    }
    catch (err) {
      console.log(err)
      setloading(false);
    }
  } 


  function searchImages(e) {
    e.preventDefault();
    getImages(searchTerm) 
  }


  return (
    <div className="dashboard" id={theme}>
      <Navbar />
      <div className="form-wrapper" id={theme}>
        <form onSubmit={(e) => searchImages(e)} className="search-form">
          <input
            type="search"
            className="image-search"
            id={theme}
            placeholder="Search Images.."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-btn" id={theme}>
            Search
          </button>
        </form>
        <span onClick={()=>switchTheme()} className="material-symbols-outlined">dark_mode</span>
      </div>
      {loading ? (
        <h1 style={{ textAlign: "center", padding: "2rem 1rem" }}>
          Searching..
        </h1>
      ) : (
        <div className="image-container" id={theme}>
          {data &&
            data.map((photo, i) => (
              <>
                <img key={i} src={photo.urls.small_s3} alt="image" />
              </>
            ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
