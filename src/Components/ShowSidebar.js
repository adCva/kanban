import React from 'react';
import { BiShowAlt } from "react-icons/bi";
import { useSelector, useDispatch } from 'react-redux';
import { showSidebar } from "../Redux/ux";

function ShowSidebar() {
  const dispatch = useDispatch();
  const isSidebarHidden = useSelector((state) => state.ux.isSidebarHidden);

  return (
    <button className={!isSidebarHidden ? "show-sidebar-container show-sidebar-container-hide" : "show-sidebar-container"} onClick={() => dispatch(showSidebar())}>
        <BiShowAlt />
    </button>
  )
}

export default ShowSidebar;