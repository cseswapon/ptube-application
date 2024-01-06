import { useGetRelatedVideosQuery } from "../../../features/api/apiSlice";
import Error from "../../ui/Error";
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader";
import RelatedVideo from "./RelatedVideo";

export default function RelatedVideos({ id, title }) {
  const { data, isError, isLoading, isSuccess } = useGetRelatedVideosQuery({
    id,
    title,
  });
  // console.log(data);
  let content = null;
  if (isError) content = <Error message="There was an error" />;
  if (isLoading)
    content = (
      <>
        <RelatedVideoLoader />
        <RelatedVideoLoader />
        <RelatedVideoLoader />
        <RelatedVideoLoader />
      </>
    );
  if (!isLoading && data?.length === 0) {
    content = <Error message="There are no video" />;
  }
  if (data?.length > 0 && isSuccess && !isError)
    content = data?.map((video, i) => <RelatedVideo key={i} video={video} />);
  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
      {content}
    </div>
  );
}
