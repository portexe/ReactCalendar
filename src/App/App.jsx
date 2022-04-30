import React, { useState, useEffect } from 'react'; // access to the use state hook
// returns array with two ele
import { CalendarHeader } from '../CalendarHeader';
import { Day } from '../Day';
import { NewEventModal } from '../NewEventModal';
import { DeleteEventModal } from '../DeleteEventModal';
import { useDate } from '../hooks/useDate';

export const App = () => {
  const [nav, setNav] = useState(0); // line unctions to update the state
  // setNav - function to update the nav
  // useState(0) - initial value 
  // const [days, setDays] = useState([]); // initialised but changed
  // const [dateDisplay, setDateDisplay] = useState(''); // initialised but changed
  const [clicked, setClicked] = useState();
  // clicked as false value
  const [events, setEvents] = useState(
    localStorage.getItem('events') ? 
      JSON.parse(localStorage.getItem('events')) : 
      []
  );
// events : clicking on the day button

  const eventForDate = date => events.find(e => e.date === date); // helper function, reusable
  // date fn name; returns events.find; each event find date == date we pass in

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const { days, dateDisplay } = useDate(events, nav);

  return(
    <>
      <div id="container">
        <CalendarHeader // component is invoked
          dateDisplay={dateDisplay} // display "Mar 2022"
          onNext={() => setNav(nav + 1)} // onNext go to next month
          onBack={() => setNav(nav - 1)}
        /> 

        <div id="weekdays">
          <div>Sunday</div>
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
        </div>

        <div id="calendar">
          {days.map((d, index) => (
            <Day
              key={index}
              day={d}
              onClick={() => {
                if (d.value !== 'padding') {
                  setClicked(d.date);
                }
              }}
            />
          ))}
        </div>
      </div>

      {
        clicked && !eventForDate(clicked) &&
        <NewEventModal
          onClose={() => setClicked(null)}
          onSave={title => {
            setEvents([ ...events, { title, date: clicked }]);
            setClicked(null);
          }}
        />
      }

      {
        clicked && eventForDate(clicked) &&
        <DeleteEventModal 
          eventText={eventForDate(clicked).title}
          onClose={() => setClicked(null)}
          onDelete={() => {
            setEvents(events.filter(e => e.date !== clicked));
            setClicked(null);
          }}
        />
      }
    </>
  );
};

