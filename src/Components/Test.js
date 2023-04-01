import React, { useState, useEffect, useRef } from 'react';
import { useTransition, animated } from '@react-spring/web'

function FixedPositionComponent() {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const transition = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
}); 

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref]);

  return (
    <div ref={ref}>
      <button onClick={() => setIsOpen(!isOpen)} className='test-btn'>Toggle Component</button>
        {transition((style, isOpen) => isOpen ? (
            <animated.div style={style} className="sidebar-interactive-wrapper">
                <div className='sidebar-interactive-container'>
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
    </div>
  );
}


export default FixedPositionComponent;