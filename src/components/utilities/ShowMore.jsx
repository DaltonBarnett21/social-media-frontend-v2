import React, { useState, useRef } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDetectOutsideClick } from "../../hooks/useDetectOutsideClick";

const ShowMore = ({ actionText, actionFunction }) => {
  const [showMore, setShowMore] = useState(false);
  const divRef = useRef(null);
  useDetectOutsideClick(divRef, setShowMore, showMore);

  const handleOpenAndClose = () => {
    actionFunction();
    setShowMore(!showMore);
  };
  return (
    <>
      <MoreVertIcon
        onClick={() => setShowMore(!showMore)}
        className="cursor-pointer"
      />
      {showMore && (
        <div
          onClick={handleOpenAndClose}
          className="hover:cursor-pointer bg-gray-50 hover:bg-gray-100 border text-red-500 border-gray-500 p-2 absolute -bottom-5  -right-6 shadow-xl rounded-lg"
          ref={divRef}
        >
          <p>
            <b>{actionText}</b>
          </p>
        </div>
      )}
    </>
  );
};

export default ShowMore;
