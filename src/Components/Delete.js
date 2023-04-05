import React from 'react';

function Delete() {
  return (
    <div className='delete-wrapper'>
        <div className='delete-container'>
            <h1>Delete this board</h1>
            <p>Are you sure you want to delete this board? This action will remove all columns and tasks and cannot be reversed.</p>
            <div className='delete-buttons'>
                <button>Delete</button>
                <button>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default Delete;