import { Button, Flex } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import NewEvent from "../components/NewEvent";

export const Navigation = () => {
  const navigate = useNavigate();
  const [isNewEventOpen, setIsNewEventOpen] = useState(false);

  return (
    <nav>
      <Flex mb={2} bg="gray.100" shadow="md" gap={2} p={2}>
        <Button as={RouterLink} to="/" flex={{ base: 1, md: "none" }}>
          Events
        </Button>
        <Button
          onClick={() => setIsNewEventOpen(true)}
          flex={{ base: 1, md: "none" }}
        >
          Add Event
        </Button>

        <NewEvent
          event={isNewEventOpen}
          cancel={() => setIsNewEventOpen(false)}
          finish={() => {
            setIsNewEventOpen(false);
            navigate("/");
          }}
        />

        <Button as={RouterLink} to="/contact" flex={{ base: 1, md: "none" }}>
          Contact
        </Button>
      </Flex>
    </nav>
  );
};
