import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const VerifyEmail = () => {
  let userid = useLocation().search;
  userid = userid.slice(8, userid.length);
  let [message, setMessage] = useState("");
  useEffect(() => {
    async function callApi() {
      let response = await fetch(
        "http://localhost:2040/verifyemail?userid=" + userid,
        {
          method: "POST",
          body: JSON.stringify({ userid }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      response = await response.json();
      if (response.message) {
        setMessage(response.message);
        alert(response.message);
      } else {
        console.log("An error occured while verifying the user!");
      }
    }
    callApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container" style={{ fontSize: "20px" }}>
      {message
        ? message
        : "Error occured while verifying you. Please try again!"}
    </div>
  );
};

export default VerifyEmail;
