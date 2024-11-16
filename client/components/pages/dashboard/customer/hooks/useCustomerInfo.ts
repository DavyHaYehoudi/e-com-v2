import { useFetch } from "@/service/hooks/useFetch";

interface ProfileData {
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone: string | null;
  email_marketing_consent: boolean;
  birthday: string | null;
  orders_count: number | null;
}

interface AvatarData {
  avatar_url: string;
}

interface AddressData {
  id: number;
  street: string;
  city: string;
}

const useCustomerInfo = () => {
  const { triggerFetch: profileFetch } = useFetch<ProfileData>(
    "/customer/profile",
    {
      requiredCredentials: true,
    }
  );
  const { triggerFetch: avatarFetch } = useFetch<AvatarData>(
    "/customer/avatar",
    {
      requiredCredentials: true,
    }
  );
  const { triggerFetch: addressesFetch } = useFetch<AddressData[]>(
    "/customer/addresses",
    {
      requiredCredentials: true,
    }
  );
  const { triggerFetch: updateProfile } = useFetch(
    "/customer/profile",
    {
      method: "PATCH",
      requiredCredentials: true,
    }
  );

  return { profileFetch, avatarFetch, addressesFetch ,updateProfile};
};

export default useCustomerInfo;
