import React from "react";
import Loader from "../../assets/loader.gif"
import Image from "next/image";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Image src={Loader} width={100} height={100} alt="loader" priority/>
    </div>
  );
};

export default Loading;
