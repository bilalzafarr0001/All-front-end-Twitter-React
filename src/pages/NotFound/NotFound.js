import React from "react";
import LottieAnimation from "../../Lottie";
import home from "../../Animation/NotFound.json";

function NotFound() {
  return (
    <div>
      <LottieAnimation lotti={home} height={600} width={600} />
    </div>
  );
}

export default NotFound;
