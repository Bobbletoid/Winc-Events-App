import {
  Box,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Stack,
  VStack,
} from "@chakra-ui/react";

export default function EventSkeleton() {
  const skeletons = Array.from({ length: 9 });

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 3 }}
      gap={6}
      maxW="1200px"
      w="100%"
      mx="auto"
      justifyItems="center"
      pb={6}
    >
      {skeletons.map((_, index) => (
        <Box
          key={index}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={2}
          shadow="md"
          w="250px"
          h="550px"
        >
          <VStack w="100%">
            <Skeleton h="311px" w="100%" borderRadius="md" mb={3} />
            <Stack spacing={1} h="160px" w="100%">
              <SkeletonText noOfLines={4} />
              <SkeletonText noOfLines={2} />
            </Stack>
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  );
}
