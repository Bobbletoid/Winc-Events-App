import {
  Box,
  Button,
  HStack,
  Image,
  Text,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useColorModeValue } from "./ui/color-mode";
import { useEventContext } from "./EventContext";
import EditEvent from "./EditEvent";
import { toaster } from "../components/ui/toaster";

export default function Event({ event, details = false }) {
  const { categories, deleteEvent } = useEventContext();

  const [isEditOpen, setIsEditOpen] = useState(false);

  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const titleTextColor = useColorModeValue("gray.600", "gray.400");
  const textColor = useColorModeValue("gray.500", "gray.300");

  const formatDate = (iso) => {
    return new Date(iso).toLocaleDateString("en-GB", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (iso) => {
    return new Date(iso).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  if (details) {
    return (
      <>
        <VStack>
          <Button alignSelf="start" mb={4} onClick={() => navigate("/")}>
            Back
          </Button>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={6}
            shadow="md"
            maxW="600px"
            w="100%"
          >
            <Image
              src={event?.image}
              alt={event?.title}
              w="100%"
              maxH="500px"
              objectFit="cover"
              borderRadius="lg"
            />

            <Stack mt={6} gap={4}>
              <Stack gap="0">
                <Text fontSize="xl" fontWeight="bold">
                  {event?.title}
                </Text>
                <Text fontSize="lg">{event?.description}</Text>
              </Stack>

              <Stack gap="0">
                <Text fontWeight="bold">Location:</Text>
                <Text>{event?.location}</Text>
              </Stack>

              <Stack gap="0">
                <Text fontWeight="bold">When:</Text>
                <Text>{formatDate(event?.startTime)}</Text>
                <VStack align="start" gap={1}>
                  <HStack>
                    <Text w="60px">Start:</Text>
                    <Text>{formatTime(event?.startTime)}</Text>
                  </HStack>
                  <HStack>
                    <Text w="60px">End:</Text>
                    <Text>{formatTime(event?.endTime)}</Text>
                  </HStack>
                </VStack>
              </Stack>
              <Stack gap="0">
                <Text fontWeight="bold">Categories:</Text>
                <Text>
                  {categories
                    .filter((category) =>
                      event.categoryIds.includes(category.id),
                    )
                    .map((category) => category.name)
                    .join(", ")}
                </Text>
              </Stack>

              <HStack mt={8} gap={{ base: 1, sm: 2, md: 4 }}>
                <Button onClick={() => setIsEditOpen(true)}>Edit Event</Button>

                <EditEvent
                  event={event}
                  open={isEditOpen}
                  cancel={() => setIsEditOpen(false)}
                />

                <Button
                  colorPalette="red"
                  loading={isDeleting}
                  onClick={async () => {
                    const confirmed = window.confirm(
                      "Are you sure you want to delete this event?",
                    );

                    if (!confirmed) return;

                    setIsDeleting(true);

                    try {
                      await deleteEvent(event.id);

                      toaster.success({
                        title: "Event deleted",
                        description: "The event was deleted successfully.",
                      });

                      navigate("/");
                    } catch {
                      toaster.error({
                        title: "Failed to delete event",
                        description:
                          "Something went wrong while deleting the event.",
                      });
                    } finally {
                      setIsDeleting(false);
                    }
                  }}
                >
                  Delete Event
                </Button>
              </HStack>
            </Stack>
          </Box>
        </VStack>
      </>
    );
  }

  return (
    <Link to={`event/${event.id}`}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={2}
        shadow="md"
        h="550px"
        maxW="250px"
      >
        <Box h="311px">
          <Image
            src={event?.image}
            alt={event?.title}
            borderRadius="md"
            mb={3}
            objectFit="cover"
          />
        </Box>

        <Stack>
          <Stack spacing={1} h="160px">
            <Text fontSize="lg" fontWeight="bold" color={titleTextColor}>
              {event?.title}
            </Text>
            <Text fontSize="md" color={textColor}>
              {event?.description}
            </Text>

            <Text fontSize="sm" color={titleTextColor}>
              {formatDate(event?.startTime)}
              <br />
              From {formatTime(event?.startTime)} to{" "}
              {formatTime(event?.endTime)}
            </Text>
          </Stack>
          <hr />

          <Box h="50px">
            <Text fontSize="md" fontWeight="bold">
              Categories:
            </Text>
            <Text fontSize="sm" color="blue">
              {categories
                .filter((category) => event.categoryIds.includes(category.id))
                .map((category) => category.name)
                .join(", ")}
            </Text>
          </Box>
        </Stack>
      </Box>
    </Link>
  );
}
