// import React, { useState } from "react"

// const usePreviewImg = () => {
//     const [imgUrl, setImgUrl] = useState(null);

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         // console.log(file);

//         if(file && file.type.startsWith("image/")){
//             const reader = new FileReader();

//             reader.onloadend = () => {
//                 setImgUrl(reader.result);
//             }

//             reader.readAsDataURL(file);
//         }else{
//             console.log("Invalid file type");
//             setImgUrl(null);
//         }
//     }
//     // console.log(imgUrl);
//     return {handleImageChange, imgUrl};
// }

// export default usePreviewImg;


import React, { useState } from "react";

const usePreviewImg = () => {
    const [imgUrl, setImgUrl] = useState(null);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];

        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImgUrl(reader.result);
            };

            reader.readAsDataURL(file);

            await new Promise((resolve) => {
                reader.onloadend = () => {
                    setImgUrl(reader.result);
                    resolve();
                };
            });
        } else {
            console.log("Invalid file type");
            setImgUrl(null);
        }
    };

    return { handleImageChange, imgUrl };
};

export default usePreviewImg;
