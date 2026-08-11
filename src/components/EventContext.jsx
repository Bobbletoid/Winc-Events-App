import { createContext, useContext, useEffect, useState } from "react";

const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsResponse, categoriesResponse] = await Promise.all([
          fetch("http://localhost:3000/events"),
          fetch("http://localhost:3000/categories"),
        ]);

        const eventsData = await eventsResponse.json();
        const categoriesData = await categoriesResponse.json();

        setEvents(eventsData);
        setCategories(categoriesData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const newEvent = async (eventData) => {
    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error("Failed to create event");
    }

    const newEvent = await response.json();

    setEvents((currentEvents) => [...currentEvents, newEvent]);

    return newEvent;
  };

  const updateEvent = async (eventId, eventData) => {
    const response = await fetch(`http://localhost:3000/events/${eventId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error("Failed to update event");
    }

    const updatedEvent = await response.json();

    setEvents((currentEvents) =>
      currentEvents.map((event) =>
        Number(event.id) === Number(eventId) ? updatedEvent : event,
      ),
    );

    return updatedEvent;
  };

  const deleteEvent = async (eventId) => {
    const response = await fetch(`http://localhost:3000/events/${eventId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete event");
    }

    setEvents((currentEvents) =>
      currentEvents.filter((event) => Number(event.id) !== Number(eventId)),
    );
  };

  return (
    <EventContext.Provider
      value={{
        events,
        categories,
        loading,
        newEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEventContext() {
  return useContext(EventContext);
}
