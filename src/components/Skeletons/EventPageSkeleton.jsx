import {
  Box,
  HStack,
  Skeleton,
  SkeletonText,
  Stack,
  VStack,
} from "@chakra-ui/react";

export default function EventPageSkeleton() {
  return (
    <>
      <VStack>
        <Box w="100%" maxW="600px" mt={6} mb={5}>
          <Skeleton w="63px" h="40px" />
        </Box>

        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={6}
          shadow="md"
          maxW="600px"
          w="100%"
        >
          <Skeleton w="100%" h="clamp(150px, 50vw, 500px)" />

          <Stack mt={6} gap={4}>
            <Stack gap={2}>
              <Skeleton h="28px" w="60%" />
              <SkeletonText noOfLines={2} />
            </Stack>

            <Stack gap={2}>
              <Skeleton h="20px" w="90px" />
              <Skeleton h="20px" w="180px" />
            </Stack>

            <Stack gap={2}>
              <Skeleton h="20px" w="70px" />
              <Skeleton h="20px" w="180px" />
              <Skeleton h="20px" w="150px" />
              <Skeleton h="20px" w="150px" />
            </Stack>

            <Stack gap={2}>
              <Skeleton h="20px" w="100px" />
              <Skeleton h="20px" w="100px" />
            </Stack>

            <HStack mt={8} gap={{ base: 1, sm: 2, md: 4 }}>
              <Skeleton w="96.5px" h="40px" />
              <Skeleton w="113px" h="40px" />
            </HStack>
          </Stack>
        </Box>
      </VStack>
    </>
  );
}
