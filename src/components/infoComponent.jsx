import React from "react";

const InfoComponent = ({ status, moves }) => {
  return (
    <React.Fragment>
      <div>{status}</div>
      <ol>{moves}</ol>
    </React.Fragment>
  );
};

export default InfoComponent;
