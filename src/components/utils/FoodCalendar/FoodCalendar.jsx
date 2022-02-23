import React, { useState } from 'react';
import Calendar from 'react-calendar'

import 'react-calendar/dist/Calendar.css';
import './foodCalendar.css'



const FoodCalendar = ({active , selected , setValueTarget}) => { 
    const [value, onChange] = useState(new Date());
    const handleChange = (value, event) => { 
        selected(value, setValueTarget);
        onChange(value)
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
        value={value} />)
}

export default React.memo(FoodCalendar);