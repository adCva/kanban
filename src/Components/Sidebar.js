import React, { useState, useRef, useEffect } from 'react';
import { BiChevronUp, BiChevronDown } from "react-icons/bi";

function Sidebar() {
    const mobileMenuCardRef = useRef(null);
    const [mobileMenuOpened, setMobileMenuOpened] = useState(false);

    

    const handleMobileMenuToggle = () => {
        setMobileMenuOpened(true);
    };


    const closeMobileMenuOutsideClick = (e) => {
            if (mobileMenuCardRef.current && !mobileMenuCardRef.current.contains(e.target)) {
                setMobileMenuOpened(false);
                console.log("test");
            }
    };
    

    useEffect(() => {
        document.addEventListener("click", closeMobileMenuOutsideClick);

        return () => {
            document.removeEventListener("click", closeMobileMenuOutsideClick);
        }
    }, [mobileMenuOpened]);


    return (
        <div className='sidebar-wrapper'>

            <img alt="" className='sidebar-logo' />

            <button className='mobile-btn' onClick={() => setMobileMenuOpened(!mobileMenuOpened)}>{mobileMenuOpened ? <BiChevronUp /> : <BiChevronDown />}</button>

            {mobileMenuOpened && (
                <div className='sidebar-interactive-wrapper'>
                    <div className='sidebar-interactive-container' ref={mobileMenuCardRef}>
                        <div className='sidebar-top'>
                            <div className='sidebar-details-container'>
                                <p>All Boards (0)</p>
                                <button>+ Create New Board</button>
                            </div>
                        </div>
                        <div className='sidebar-bottom'>
                        <button>Theme</button>
                    </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Sidebar;



/*
<div className="sidebar-interactive-wrapper">

                <div className='sidebar-interactive-container' ref={mobileMenuCardRef}>

                    <div className='sidebar-top'>
                        <div className='sidebar-details-container'>
                            <p>All Boards (0)</p>
                            <button>+ Create New Board</button>
                        </div>
                    </div>

                    <div className='sidebar-bottom'>
                        <button>Theme</button>
                    </div>

                </div>

            </div>

            */