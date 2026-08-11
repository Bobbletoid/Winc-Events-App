import {
  Button,
  Dialog,
  Field,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { useEventContext } from "./EventContext";
import EventDateTimePicker from "./EventDateTimePicker";
import { useEffect } from "react";
import { toaster } from "./ui/toaster";

export default function EditEvent({ event, open, cancel }) {
  const { categories, updateEvent } = useEventContext();

  const methods = useForm({
    defaultValues: {
      image: event?.image || "",
      title: event?.title || "",
      description: event?.description || "",
      location: event?.location | "",
      startTime: event?.startTime || "",
      endTime: event?.endTime || "",
      categories: [],
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  useEffect(() => {
    if (!event) return;

    const selectedCategories = categories
      .filter((category) => event.categoryIds.includes(category.id))
      .map((category) => category.name);

    reset({
      image: event.image || "",
      title: event.title || "",
      description: event.description || "",
      location: event.location || "",
      startTime: event.startTime || "",
      endTime: event.endTime || "",
      categories: selectedCategories,
    });
  }, [event, categories, reset]);

  const onSubmit = async (data) => {
    try {
      const categoryIds = categories
        .filter((category) => (data.categories || []).includes(category.name))
        .map((category) => category.id);

      const eventData = {
        image: data.image,
        title: data.title,
        description: data.description,
        location: data.location,
        categoryIds,
      };

      if (data.startTime) {
        eventData.startTime = new Date(data.startTime).toISOString();
      }

      if (data.endTime) {
        eventData.endTime = new Date(data.endTime).toISOString();
      }

      await updateEvent(event.id, eventData);

      toaster.success({
        title: "Event update",
        description: "Your changes were saved successfully.",
      });

      cancel();
    } catch {
      toaster.error({
        title: "Failed to update event",
        description: "Something went wrong while updating the event.",
      });
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={cancel}>
      <Dialog.Backdrop />

      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header fontSize="lg" fontWeight="bold">
            Edit your Event
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

                <EventDateTimePicker required={false} />

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
                  >
                    Cancel
                  </Button>

                  <Button type="submit" loading={isSubmitting} width="full">
                    Save Changes
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
