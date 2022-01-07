import React from "react";

import "./style.css";

const Banner = (prop) => {
  return (
    <>
      <div class="pozadi">{prop.children}</div>
    </>
  );
};

export default Banner;
