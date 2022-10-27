import { useQuery, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";

const fetchSuperHero = ({ queryKey }) => {
  const heroId = queryKey[1];
  return request({ url: `superheroes/${heroId}` });
};

export const useSuperHeroData = (heroId) => {
  const queryClient = useQueryClient();
  return useQuery(["super-hero", heroId], fetchSuperHero, {
    initialData: () => {
      const hero = queryClient
        .getQueryData("super-heroes")
        ?.data?.find((hero) => hero.id === parseInt(heroId));
      if (hero) {
        return { data: hero };
      } else {
        return undefined;
      }
    },
  });
};
