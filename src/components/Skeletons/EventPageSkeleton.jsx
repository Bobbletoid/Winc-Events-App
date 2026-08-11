import {
  Box,
  Center,
  HStack,
  Skeleton,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";

export default function EventPageSkeleton() {
  return (
    <Center>
      <Box maxW="600px" w="100%" p={6}>
        <Skeleton w="100%" h="386px" borderRadius="lg" />

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
            <Skeleton w="63px" h="40px" />
            <Skeleton w="96.5px" h="40px" />
            <Skeleton w="113px" h="40px" />
          </HStack>
        </Stack>
      </Box>
    </Center>
  );
}
