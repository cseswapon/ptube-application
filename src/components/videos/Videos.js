import { useGetVideosQuery } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import VideoLoader from "../ui/loaders/VideoLoader";
import Video from "./Video";

export default function Videos() {
  const { data, isLoading, isSuccess, isError } = useGetVideosQuery();
  let content = null;
  if (isLoading)
    content = (
      <>
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
      </>
    );
  if (!isLoading && isError) content = <Error message={"There was an error"} />;
  if (!isLoading && data?.length === 0) content = <Error message={"Video Not Found"} />;
  if (isSuccess && data?.length > 0) {
    content = data.map((video, i) => <Video key={i} video={video} />);
  }
  return <>{content}</>;
}
