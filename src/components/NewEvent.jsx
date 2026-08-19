import {
  Button,
  Dialog,
  Field,
  Input,
  Spinner,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import EventDateTimePicker from "./EventDateTimePicker";
import { useEventContext } from "./EventContext";
import { toaster } from "./ui/toaster";

export default function NewEvent({ event, cancel, finish }) {
  const { categories, newEvent } = useEventContext();

  const methods = useForm({
    defaultValues: {
      categories: [],
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const categoryIds = categories
      .filter((category) => (data.categories || []).includes(category.name))
      .map((category) => category.id);

    try {
      await newEvent({
        image: data.image,
        title: data.title,
        description: data.description,
        location: data.location,
        startTime: new Date(data.startTime).toISOString(),
        endTime: new Date(data.endTime).toISOString(),
        categoryIds,
      });

      toaster.success({
        title: "Event created",
        description: "Your event was created successfully.",
      });

      finish();
    } catch {
      toaster.error({
        title: "Failed to create event",
        description: "Something went wrong while creating the event.",
      });
    }
  };

  return (
    <Dialog.Root open={event} onOpenChange={cancel}>
      <Dialog.Backdrop />

      <Dialog.Positioner>
        <Dialog.Content>
          {isSubmitting && (
            <VStack
              position="absolute"
              inset="0"
              zIndex="10"
              bg="blackAlpha.300"
              justify="center"
            >
              <Spinner size="xl" />
            </VStack>
          )}
          <Dialog.Header fontSize="lg" fontWeight="bold">
            Create your Event
          </Dialog.Header>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Dialog.Body>
                <Field.Root invalid={!!errors.image} mt={2}>
                  <Field.Label>Image link</Field.Label>

                  <Input
                    type="text"
                    placeholder="Share the URL to your Event image"
                    {...register("image", {
                      required: "Please share your image link",
                    })}
                  />

                  <Field.ErrorText>{errors.image?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.title} mt={2}>
                  <Field.Label>Title</Field.Label>

                  <Input
                    type="text"
                    placeholder="Title for your Event"
                    {...register("title", {
                      required: "Please enter a title",
                    })}
                  />

                  <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.description} mt={4}>
                  <Field.Label>Description</Field.Label>

                  <Textarea
                    placeholder="Describe your Event..."
                    {...register("description", {
                      required: "Please describe your Event",
                    })}
                  />

                  <Field.ErrorText>
                    {errors.description?.message}
                  </Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.location} mt={4}>
                  <Field.Label>Location</Field.Label>

                  <Input
                    type="text"
                    placeholder="Location of your Event"
                    {...register("location", {
                      required: "Please specify a location for your Event",
                    })}
                  />

                  <Field.ErrorText>{errors.location?.message}</Field.ErrorText>
                </Field.Root>

                <EventDateTimePicker />

                <Field.Root invalid={!!errors.categories} mt={4}>
                  <Field.Label>Categories</Field.Label>

                  <VStack align="start">
                    {categories.map((category, index) => (
                      <label key={category.id}>
                        <input
                          type="checkbox"
                          value={category.name}
                          {...register(
                            "categories",
                            index === 0
                              ? {
                                  validate: (value) =>
                                    value?.length > 0 ||
                                    "Please select at least one category",
                                }
                              : {},
                          )}
                        />{" "}
                        {category.name}
                      </label>
                    ))}

                    {errors.categories && (
                      <Field.ErrorText>
                        {errors.categories.message}
                      </Field.ErrorText>
                    )}
                  </VStack>
                </Field.Root>
              </Dialog.Body>

              <Dialog.Footer>
                <VStack w="full" gap={3}>
                  <Button
                    onClick={cancel}
                    variant="outline"
                    width="full"
                    type="button"
                    disabled="{isSubmitting}"
                  >
                    Cancel
                  </Button>

                  <Button type="submit" loading={isSubmitting} width="full">
                    Create Event
                  </Button>
                </VStack>
              </Dialog.Footer>
            </form>
          </FormProvider>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
