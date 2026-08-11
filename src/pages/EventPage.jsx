import { Center, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEventContext } from "../components/EventContext";
import Event from "../components/Event";
import EventPageSkeleton from "../components/Skeletons/EventPageSkeleton";

export default function EventPage() {
  const { eventId } = useParams();
  const { events, loading } = useEventContext();

  if (loading) {
    return <EventPageSkeleton />;
  }

  const event = events.find((event) => String(event.id) === String(eventId));

  if (!event) {
    return (
      <Center>
        <Text>Event not found...</Text>
      </Center>
    );
  }

  return (
    <Center p={6}>
      <Event event={event} details />
    </Center>
  );
}
