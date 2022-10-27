import { useQueries } from "react-query";
import { request } from "../utils/axios-utils";

const fetchSuperHero = (heroId) => {
  return request({ url: `superheroes/${heroId}` });
};

export default function DynamicParallel() {
  let heroIds = [1, 3];
  const queryResults = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ["super-hero", id],
        queryFn: () => fetchSuperHero(id),
      };
    })
  );

  console.log({ queryResults });
  return <div>Dynamic Parallel Queries</div>;
}
