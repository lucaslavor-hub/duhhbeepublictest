import { useGetProduct } from '@/api/products/hooks/useGetProduct';

type Banner = {
  title: string;
  image: string;
};

type Content = {
  description: string;
  composition: string;
  complement: string;
};

type Actions = {
  price: number;
  link: string;
};

type UseProductHook = (props: { id: string }) => {
  bannerData: Partial<Banner>;
  contentData: Partial<Content>;
  actionsData: Partial<Actions>;
  isFavorite: boolean;
  isLoading: boolean;
};

export const useProduct: UseProductHook = ({ id }) => {
  const { data, isLoading } = useGetProduct({
    id: Number(id),
    config: {
      params: {
        populate: ['imageUrl'],
      },
    },
  });

  const product = data?.data;

  const bannerData = {
    title: product?.attributes.name,
    image: product?.attributes.imageUrl?.url,
  };

  const contentData = {
    description: product?.attributes?.description,
    composition: product?.attributes?.composition,
    complement: product?.attributes?.complement,
  };

  const actionsData = {
    price: product?.attributes?.price,
    link: product?.attributes?.link,
  };

  const isFavorite = product?.attributes?.isFavorite ?? false;

  return { bannerData, contentData, actionsData, isFavorite, isLoading };
};
