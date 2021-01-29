import React from 'react';

export const DeleteEventModal = ({ onDelete, eventText, onClose }) => {
  return(
    <>
      <div id="deleteEventModal">
        <h2>Event</h2>

        <p id="eventText">{eventText}</p>

        <button onClick={onDelete} id="deleteButton">Delete</button>
        <button onClick={onClose} id="closeButton">Close</button>
      </div>

      <div id="modalBackDrop"></div>
    </>
  );
};
