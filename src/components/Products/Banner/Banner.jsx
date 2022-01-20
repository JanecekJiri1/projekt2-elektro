import React from "react";

import "./style.css";

const Banner = (prop) => {
  return (
    <>
      <div className="pozadi">{prop.children}</div>
    </>
  );
};

export default Banner;
