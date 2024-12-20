"use client";

import React, { useEffect, useState } from "react";
import { Truck } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import useCustomerInfo from "../hooks/useCustomerInfo";
import { toast } from "sonner";
import { AddressesFormValues, AddressesSchema } from "./addressesSchema";

const ShippingAddress = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { updateShippingAddress, shippingAddressFetch } = useCustomerInfo();

  // React Hook Form setup avec Zod
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<AddressesFormValues>({
    resolver: zodResolver(AddressesSchema),
    defaultValues: {
      company: "",
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      street_number: "",
      address1: "",
      address2: "",
      postal_code: "",
      city: "",
      country: "",
    },
  });

  // Charger les données de l'adresse de livraison
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await shippingAddressFetch();
        if (data) reset(data); // Remplit le formulaire avec les données reçues
      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
        toast.error("Impossible de charger vos informations.");
      }
    };

    fetchProfile();
  }, [shippingAddressFetch, reset]);

  // Gestion de la soumission du formulaire
  const onSubmit = async (data: AddressesFormValues) => {
    try {
      updateShippingAddress(data);
      toast.success("Adresse de livraison mise à jour avec succès !");
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      toast.error("Impossible de mettre à jour vos informations.");
    }
  };
  const handleEditClick = (event: React.MouseEvent) => {
    event.preventDefault(); // Empêcher la soumission du formulaire
    setIsEditing(true); // Passer en mode édition
  };
  const handleCancelClick = (event: React.MouseEvent) => {
    event.preventDefault(); // Empêcher la soumission du formulaire
    setIsEditing(false); // Passer en mode affichage
    reset(); // Réinitialiser le formulaire
  };
  return (
    <Card className="w-full max-w-lg mx-auto mt-6 p-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="w-6 h-6" />
          Mon adresse de livraison
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {/* Prénom */}
          <div>
            <Label htmlFor="first_name">Prénom</Label>
            <Input
              {...register("first_name")}
              placeholder="Entrez votre prénom"
              disabled={!isEditing}
            />
            {errors.first_name && (
              <p className="text-sm text-red-500">
                {errors.first_name.message}
              </p>
            )}
          </div>

          {/* Nom */}
          <div>
            <Label htmlFor="last_name">Nom</Label>
            <Input
              {...register("last_name")}
              placeholder="Entrez votre nom"
              disabled={!isEditing}
            />
            {errors.last_name && (
              <p className="text-sm text-red-500">{errors.last_name.message}</p>
            )}
          </div>

          {/* Téléphone */}
          <div>
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              {...register("phone")}
              placeholder="Entrez votre numéro de téléphone"
              disabled={!isEditing}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              placeholder="Entrez votre email"
              disabled={!isEditing}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Numéro de voie */}
          <div>
            <Label htmlFor="street_number">Numéro de voie</Label>
            <Input
              {...register("street_number")}
              placeholder="Entrez le numéro de voie"
              disabled={!isEditing}
            />
            {errors.street_number && (
              <p className="text-sm text-red-500">
                {errors.street_number.message}
              </p>
            )}
          </div>

          {/* Adresse principale */}
          <div>
            <Label htmlFor="address1">Adresse</Label>
            <Input
              {...register("address1")}
              placeholder="Entrez votre adresse"
              disabled={!isEditing}
            />
            {errors.address1 && (
              <p className="text-sm text-red-500">{errors.address1.message}</p>
            )}
          </div>

          {/* Adresse complémentaire */}
          <div>
            <Label htmlFor="address2">Complément d'adresse</Label>
            <Input
              {...register("address2")}
              placeholder="Entrez le complément d'adresse"
              disabled={!isEditing}
            />
            {errors.address2 && (
              <p className="text-sm text-red-500">{errors.address2.message}</p>
            )}
          </div>

          {/* Code postal */}
          <div>
            <Label htmlFor="postal_code">Code postal</Label>
            <Input
              {...register("postal_code")}
              placeholder="Entrez le code postal"
              disabled={!isEditing}
            />
            {errors.postal_code && (
              <p className="text-sm text-red-500">
                {errors.postal_code.message}
              </p>
            )}
          </div>

          {/* Ville */}
          <div>
            <Label htmlFor="city">Ville</Label>
            <Input
              {...register("city")}
              placeholder="Entrez la ville"
              disabled={!isEditing}
            />
            {errors.city && (
              <p className="text-sm text-red-500">{errors.city.message}</p>
            )}
          </div>

          {/* Pays */}
          <div>
            <Label htmlFor="country">Pays</Label>
            <Input
              {...register("country")}
              placeholder="Entrez le pays"
              disabled={!isEditing}
            />
            {errors.country && (
              <p className="text-sm text-red-500">{errors.country.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancelClick}>
                Annuler
              </Button>
              <Button type="submit">Enregistrer</Button>
            </>
          ) : (
            <Button onClick={handleEditClick}>Modifier</Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
};

export default ShippingAddress;
