import React, { useState } from 'react'

import styles from "./Event.module.scss";

import data from "../../data/eve.json";
import Cards from '../../components/cards';
import DropDown from '../../components/DropDown';


const Index = () => {

    const [protocol, setProtocal] = useState('');
    const [eventType, setEventType] = useState('');

    const protocols = [...new Set(data.map(item => item.proto))];
    const eventTypes = [...new Set(data.map(item => item.event_type))];


    const handleChange = (title, value) => {
        if (title === 'Protocol') setProtocal(value);
        else setEventType(value);
    }

    const filteredData = data.filter(event =>
        (!protocol || event.proto === protocol) && (!eventType || event.event_type === eventType)
    );

    return (
        <section className={`${styles.mainContainer} bg-background`}>
            <div className='flex gap-6 text-white mx-auto w-full justify-center'>
                Filter
                <DropDown title="Protocol" selectedValue={protocol} handleChange={handleChange} list={protocols} />
                <DropDown title="Event Type" selectedValue={eventType} handleChange={handleChange} list={eventTypes} />
            </div>
            <section className={styles.cards}>
                {filteredData.map((event) => <Cards.EventCard {...event} />)}
            </section>
        </section>
    )
}

export default Index;