import React from "react";
import usePreviewImg from "../hooks/usePreviewImg";

const ImageTest = () => {

    const {handleImageChange} = usePreviewImg();

  return (
    <>
        <input type="file" onChange={handleImageChange} />
    </>
  );
};

export default ImageTest;
