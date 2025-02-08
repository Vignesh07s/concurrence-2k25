import React, { useState, useEffect } from 'react'
import RegistrationModal from './Registration';
import Loader from './Loader';

const PaperPayment = () => {

    const eventName = 'Paper Presentation';
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/events/${eventName}`);
                if (!response.ok) {
                    throw new Error('Event not found');
                }
                const data = await response.json();
                setEvent(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, []);

    if (loading) {
        return (
            <Loader />
        )
    }

    return (
        <div>
            {event ? (
                <RegistrationModal closeModal={() => { }} eventName={eventName} qrimg={event.qrimage} wlink={event.wlink} />
            ) : (
                <div className="text-white">Payment Page Loading... Please wait</div>
            )}
        </div>
    )
}

export default PaperPayment