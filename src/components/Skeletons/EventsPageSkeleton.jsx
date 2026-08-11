import { Center, HStack, Skeleton, VStack } from "@chakra-ui/react";

export default function EventsPageSkeleton() {
  return (
    <>
      <Center>
        <VStack w="100%">
          <Skeleton w="180px" h="32px" mb={4} />
          <HStack
            justify="center"
            align="center"
            gap={4}
            mb={6}
            w="100%"
            wrap="wrap"
          >
            <Skeleton
              w={{ base: "320px", sm: "350px", md: "450px" }}
              h="40px"
            />
            <Skeleton w="120px" h="40px" />
          </HStack>
        </VStack>
      </Center>
    </>
  );
}
