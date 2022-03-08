import React from 'react';
import Calendar from 'react-calendar'

import 'react-calendar/dist/Calendar.css';
import './foodCalendar.css'



const FoodCalendar = ({ date, active, selected, setValueTarget }) => { 

    const handleChange = (value, event) => {
        selected(value, setValueTarget);
    }
    const formatDay = (locale, date) => { 
        return new Date(date).getDate();
    }

    return (<Calendar
        className={`${"custom_calendar"} ${!!active ? 'active' : ''}`}
        calendarType="US"
        formatDay={formatDay}
        locale="ko"
        onChange={handleChange}
        value={date}
    />)
}

export default React.memo(FoodCalendar);