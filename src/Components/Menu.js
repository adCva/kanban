import React from 'react';
import { BiEdit } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";

function Menu() {
  return (
    <div className='menu-wrapper menu-wrapper-dark'>
        <div className='menu-container'>
            <button className='edit-board-btn'><BiEdit /> Edit Board</button>
            <button className='delete-board-btn'><TiDelete /> Delete Board</button>
        </div>
    </div>
  )
}

export default Menu;