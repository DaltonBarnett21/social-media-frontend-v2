import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuHandler, MenuList } from "@material-tailwind/react";

const ShowMore = ({ actionText }) => {
  return (
    <>
      <Menu>
        <MenuHandler>
          <MoreVertIcon className="cursor-pointer" />
        </MenuHandler>
        <MenuList>
          <div className="hover:cursor-pointer w-24 h-12 bg-gray-50 hover:bg-gray-100 border  text-red-500 border-gray-500 flex justify-center items-center p-1 absolute -bottom-5  -right-6 shadow-xl rounded-lg">
            <p className="text-sm">
              <b>{actionText}</b>
            </p>
          </div>
        </MenuList>
      </Menu>
    </>
  );
};

export default ShowMore;
