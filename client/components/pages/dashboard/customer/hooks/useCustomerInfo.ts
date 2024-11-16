import { useFetch } from "@/service/hooks/useFetch";

interface ProfileData {
  first_name: string;
  email: string;
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

  return { profileFetch, avatarFetch, addressesFetch };
};

export default useCustomerInfo;
