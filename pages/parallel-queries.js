import { useQuery } from "react-query";
import { request } from "../utils/axios-utils";

const fetchSuperHeroes = () => {
  return request({ url: "superheroes" });
};

const fetchFriends = () => {
  return request({ url: "friends" });
};

export default function ParallelQueries() {
  const { data: superHeroes } = useQuery("super-heroes", fetchSuperHeroes);
  const { data: friends } = useQuery("friends", fetchFriends);
  console.log(superHeroes, friends);
  return <div>ParallelQueries</div>;
}
