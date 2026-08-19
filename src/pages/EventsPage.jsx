import {
  Button,
  Center,
  Checkbox,
  Heading,
  HStack,
  Input,
  Menu,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEventContext } from "../components/EventContext";
import { useState } from "react";
import Event from "../components/Event";
import EventsPageSkeleton from "../components/Skeletons/EventsPageSkeleton";
import EventSkeleton from "../components/Skeletons/EventSkeleton";

export const EventsPage = () => {
  const { events, categories, loading } = useEventContext();

  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.every((categoryId) =>
        event.categoryIds.includes(Number(categoryId)),
      );

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {loading ? (
        <>
          <EventsPageSkeleton />

          <EventSkeleton />
        </>
      ) : (
        <>
          <Center>
            <VStack>
              <Heading mb={4}>List of Events</Heading>
              <HStack
                justify="center"
                align="center"
                gap={4}
                mb={6}
                wrap="wrap"
              >
                <Input
                  placeholder="Search events..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  w={{ base: "100%", sm: "350px", md: "450px" }}
                />

                <Menu.Root closeOnSelect={false}>
                  <Menu.Trigger asChild>
                    <Button w="120px">Categories</Button>
                  </Menu.Trigger>

                  <Menu.Positioner>
                    <Menu.Content display="flex" flexDirection="column" gap={2}>
                      {categories.map((category) => {
                        const categoryId = String(category.id);

                        return (
                          <Checkbox.Root
                            key={category.id}
                            checked={selectedCategories.includes(categoryId)}
                            onCheckedChange={(details) => {
                              if (details.checked) {
                                setSelectedCategories((current) => [
                                  ...current,
                                  categoryId,
                                ]);
                              } else {
                                setSelectedCategories((current) =>
                                  current.filter((id) => id !== categoryId),
                                );
                              }
                            }}
                          >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />
                            <Checkbox.Label>{category.name}</Checkbox.Label>
                          </Checkbox.Root>
                        );
                      })}
                    </Menu.Content>
                  </Menu.Positioner>
                </Menu.Root>
              </HStack>
            </VStack>
          </Center>

          {filteredEvents.length === 0 ? (
            <Center p="10" flexDirection="column" gap="2">
              <Text
                fontSize="xl"
                fontWeight="bold"
                color={{ _light: "gray.800", _dark: "gray.600" }}
              >
                No events found
              </Text>
              <Text
                fontSize="sm"
                color={{ _light: "gray.700", _dark: "gray.400" }}
              >
                Try adjusting your search terms or categories
              </Text>
            </Center>
          ) : (
            <Center>
              <SimpleGrid
                columns={{ base: 1, sm: 2, md: 3 }}
                gap={6}
                maxW="1200px"
                w="100%"
                mx="auto"
                justifyItems="center"
                pb={6}
              >
                {filteredEvents.map((event) => (
                  <Event key={event.id} event={event} />
                ))}
              </SimpleGrid>
            </Center>
          )}
        </>
      )}
    </>
  );
};
