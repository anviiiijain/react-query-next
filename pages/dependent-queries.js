import { useQuery } from "react-query";
import { request } from "../utils/axios-utils";

const fetchUserByEmail = (email) => {
  return request({ url: `users/${email}` });
};

const fetchCoursesByChannelId = (channelId) => {
  return request({ url: `channels/${channelId}` });
};

export default function DependentQueries() {
  let email = "anvi@gmail.com";
  const { data: user } = useQuery(["user", email], () =>
    fetchUserByEmail(email)
  );
  const channelId = user?.data?.channelId;
  useQuery(["courses", channelId], () => fetchCoursesByChannelId(channelId), {
    enabled: !!channelId,
  });
  return <div>{channelId}</div>;
}
