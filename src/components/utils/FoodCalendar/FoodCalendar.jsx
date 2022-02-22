import React, { useState } from 'react';
import Calendar from 'react-calendar'
// import { differenceInCalendarDays } from 'date-fns';

import 'react-calendar/dist/Calendar.css';
import './calendar_custom.css'
import moment from 'moment';


const FoodCalendar = ({active}) => { 
    const [value, setValue] = useState(new Date());
    const formatDay = (locale, date) => { 
        return new Date(date).getDate();
    }
    return (<Calendar
        className={`${"custom_calendar"} ${!!active ? 'active' : ''}`}
        calendarType="US"
        formatDay={formatDay}
        locale="ko"
        onChange={setValue}
        value={value} />)
}

export default React.memo(FoodCalendar);