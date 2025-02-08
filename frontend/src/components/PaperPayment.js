import React, { useState, useEffect } from 'react'
import RegistrationModal from './Registration';

const PaperPayment = () => {

const eventName = 'Paper Presentation';
const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/events/${eventName}`);
                if (!response.ok) {
                    throw new Error('Event not found');
                }
                const data = await response.json();
                setEvent(data);
                console.log(data);
            } catch (err) {
            }
        };

        fetchEventDetails();
    }, [eventName]);

    return (
        <div>
            {event ? (
                <RegistrationModal closeModal={() => {}} eventName={eventName} qrimg={event.qrimage} wlink={event.wlink} />
            ) : (
                <div className="text-white">Payment Page Loading... Please wait</div>
            )}
        </div>
    )
}

export default PaperPayment