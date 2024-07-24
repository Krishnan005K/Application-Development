// src/context/StoreContext.js
import { createContext, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [scheduledInterviews, setScheduledInterviews] = useState([]);
    const [resources, setResources] = useState([]);

    const scheduleInterview = (interview) => {
        setScheduledInterviews((prev) => [...prev, interview]);
    };

    const cancelInterview = (interviewId) => {
        setScheduledInterviews((prev) => prev.filter(interview => interview.id !== interviewId));
    };

    const addResource = (resource) => {
        setResources((prev) => [...prev, resource]);
    };

    const removeResource = (resourceId) => {
        setResources((prev) => prev.filter(resource => resource.id !== resourceId));
    };

    const contextValue = {
        user,
        setUser,
        scheduledInterviews,
        scheduleInterview,
        cancelInterview,
        resources,
        addResource,
        removeResource,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
