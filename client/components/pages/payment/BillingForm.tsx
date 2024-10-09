"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AddressFormValues, AddressSchema } from "./schema/addressesSchema";

const BillingForm = ({
  onNext,
}: {
  onNext: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(AddressSchema),
  });

  const onSubmit = (data: AddressFormValues) => {
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Prénom</label>
        <Input {...register("firstName")} placeholder="Prénom" />
        {errors.firstName && <p>{errors.firstName.message}</p>}
      </div>
      <div>
        <label>Nom</label>
        <Input {...register("lastName")} placeholder="Nom" />
        {errors.lastName && <p>{errors.lastName.message}</p>}
      </div>
      <Button type="submit">Suivant</Button>
    </form>
  );
};
export default BillingForm;