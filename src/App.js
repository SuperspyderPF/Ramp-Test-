import React, { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [font, setFont] = useState([]);

  useEffect(() => {
    fetch("https://fonts.googleapis.com/css?family=Lato:300,400,700,900")
      .then((response) => response.text())
      .then((data) => {
        setFont(data.split(""));
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    let timer = null;
    if (!loading) {
      font.forEach((char, index) => {
        timer = setTimeout(() => {
          const items = document.querySelectorAll("li");
          items[index].style.display = "inline";
        }, (index + 1) * 500);
      });
    }
    return () => clearTimeout(timer);
  }, [loading, font]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {font.map((char, index) => (
            <li key={index} style={{ display: "none" }}>
              {char}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default App;
