import React, { useState, useRef, useEffect } from 'react';
import { BiChevronUp, BiChevronDown } from "react-icons/bi";
import { useTransition, animated } from '@react-spring/web'


function Sidebar() {
    const mobileMenuCardRef = useRef();
    const [mobileMenuOpened, setMobileMenuOpened] = useState(false);

    const openMobileMenu = () => {
        setMobileMenuOpened(true);
    };

    const transition = useTransition(mobileMenuOpened, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });    

    const closeMobileMenuOutsideClick = (event) => {
        if (mobileMenuOpened && event.target.className === "sidebar-interactive-wrapper") {
            setMobileMenuOpened(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", closeMobileMenuOutsideClick);

        return () => {
            document.removeEventListener("click", closeMobileMenuOutsideClick);
        }
    });


    return (
        <div className='sidebar-wrapper'>

            <div className='mobile-logo'>
                <img alt="" className='sidebar-logo' />

                <button className='mobile-btn' onClick={openMobileMenu}>{mobileMenuOpened ? <BiChevronUp /> : <BiChevronDown />}</button>
            </div>

            {transition((style, mobileMenuOpened) => mobileMenuOpened ? (
                <animated.div style={style} className="sidebar-interactive-wrapper">
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
                </animated.div>
            ) : null)}

            <div className='mobile-right'>
                <button>+</button>
                <button>Dots</button>
            </div>

        </div>
    )
}

export default Sidebar;