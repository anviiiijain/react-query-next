import Image from "next/image";
import { dehydrate, QueryClient, useQuery } from "react-query";
const getSpaceXData = async () =>
  await (await fetch("https://api.spacexdata.com/v5/launches/latest")).json();

export default function Home() {
  const { data, isLoading, isFetching } = useQuery("spacex", getSpaceXData);
  if (isLoading) return <div>Loading</div>;
  if (isFetching) return <div>Fetching</div>;
  if (!data) return <div>No data</div>;
  return (
    <div>
      <h2>{data?.name}</h2>
      <Image
        src={data?.links.patch.large}
        alt={data?.name}
        width={500}
        height={500}
      />
    </div>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("spacex", getSpaceXData);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
