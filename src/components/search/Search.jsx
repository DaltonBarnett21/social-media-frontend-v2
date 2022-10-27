import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const Search = () => {
  const [querySearch, setQuerySearch] = useState("");
  const location = useLocation();
  const currentUser = useSelector((state) => state.user);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `/api/users/${currentUser.id}?search=${querySearch}`
      );
      setData(res.data);
    };
    if (querySearch.length > 0) {
      fetchData();
    }
  }, [querySearch]);

  useEffect(() => {
    setQuerySearch("");
  }, [location]);

  return (
    <div className="relative">
      <div className=" shadow-md p-1 bg-white  flex border border-gray-200 ">
        <SearchIcon className=" text-gray-400 mr-3  " />
        <input
          type="text"
          autoComplete="new-password"
          onChange={(e) => setQuerySearch(e.target.value.toLowerCase())}
          placeholder="Search..."
          className=" outline-none font-extralight text-gray-500 lg:w-[500px]  "
        />
      </div>
      {querySearch && (
        <div className="bg-white absolute w-full p-2 rounded-sm shadow-lg border border-gray-200">
          {data?.map((u, i) => (
            <Link to={`/user/${u._id}`}>
              <p
                className=" text-gray-500 cursor-pointer mb-1 hover:bg-gray-100 p-1 rounded-md"
                key={i}
              >
                {u.firstname} {u.lastname}
              </p>
            </Link>
          ))}
          {data.length === 0 && (
            <p className=" text-gray-500 cursor-pointer mb-1 hover:bg-gray-100 p-1 rounded-md">
              User Not Found
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
