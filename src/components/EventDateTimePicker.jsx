import { Field, Input, VStack } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

export default function EventDateTimePicker({ required = true }) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const startTime = watch("startTime");

  return (
    <VStack spacing={4} mt={4}>
      <Field.Root invalid={errors.startTime}>
        <Field.Label>Event starting time</Field.Label>
        <Input
          type="datetime-local"
          {...register("startTime", {
            required: required ? "Please select a start time" : false,
          })}
        />
        <Field.ErrorText>{errors.startTime?.message}</Field.ErrorText>
      </Field.Root>

      <Field.Root invalid={errors.endTime}>
        <Field.Label>Event ending time</Field.Label>
        <Input
          type="datetime-local"
          min={startTime}
          {...register("endTime", {
            required: required ? "Please select an end time" : false,
          })}
        />
        <Field.ErrorText>{errors.endTime?.message}</Field.ErrorText>
      </Field.Root>
    </VStack>
  );
}
