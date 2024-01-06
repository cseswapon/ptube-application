import { useState } from "react";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";
import { useEditVideoMutation } from "../../features/api/apiSlice";
import Success from "../ui/Success";
import Error from "../ui/Error";

export default function Form({ video }) {
  const [allContent, setAllContent] = useState({
    title: video.title,
    description: video.description,
    author: video.author,
    date: video.date,
    duration: video.duration,
    views: video.views,
    link: video.link,
    thumbnail: video.thumbnail,
  });

  const { title, description, author, date, duration, views, link, thumbnail } =
    allContent || {};

  const [editVideo, { data, isLoading, isError, isSuccess }] =
    useEditVideoMutation();

  const handelSubmit = (e) => {
    e.preventDefault();
    editVideo({ id: video.id, data: allContent });
  };
  return (
    <form onSubmit={handelSubmit}>
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <TextInput
                value={title}
                onChange={(e) =>
                  setAllContent((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                title="Video Title"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <TextInput
                value={author}
                onChange={(e) =>
                  setAllContent((prev) => ({
                    ...prev,
                    author: e.target.value,
                  }))
                }
                title="Author"
              />
            </div>

            <div className="col-span-6">
              <TextArea
                value={description}
                onChange={(e) =>
                  setAllContent((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                title="Description"
              />
            </div>

            <div className="col-span-6">
              <TextInput
                value={link}
                onChange={(e) =>
                  setAllContent((prev) => ({ ...prev, link: e.target.value }))
                }
                title="YouTube Video link"
              />
            </div>

            <div className="col-span-6">
              <TextInput
                value={thumbnail}
                onChange={(e) =>
                  setAllContent((prev) => ({
                    ...prev,
                    thumbnail: e.target.value,
                  }))
                }
                title="Thumbnail link"
              />
            </div>

            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <TextInput
                value={date}
                onChange={(e) =>
                  setAllContent((prev) => ({ ...prev, date: e.target.value }))
                }
                title="Upload Date"
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <TextInput
                value={duration}
                onChange={(e) =>
                  setAllContent((prev) => ({
                    ...prev,
                    duration: e.target.value,
                  }))
                }
                title="Video Duration"
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <TextInput
                value={views}
                onChange={(e) =>
                  setAllContent((prev) => ({
                    ...prev,
                    views: e.target.value,
                  }))
                }
                title="Video no of views"
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            disabled={isLoading}
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
        {isSuccess && <Success message="Video was Update successfully" />}
        {isError && <Error />}
      </div>
    </form>
  );
}
