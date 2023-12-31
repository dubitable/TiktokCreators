import Loading from "app/components/MatxLoading";
import Analytics from "./dashboard/Analytics";
import Recommendations from "./recommendations/Recommendations";
import { useEffect, useState } from "react";

const MainApp = (props) => {
  const page = props.page.toLowerCase();

  const [videos, setVideos] = useState([]);
  const [user, setUser] = useState(null);
  const [recs, setRecs] = useState([]);

  async function getVideos() {
    const url =
      "https://tiktokcreators-production.up.railway.app/videos/getvideos?";

    let hasMore = true;
    let cursor = "0";
    let vids = [];

    while (hasMore) {
      const result = await fetch(url + new URLSearchParams({ cursor }));
      const json = await result.json();
      vids = [...vids, ...json.data.videos];
      const sortedVideos = vids.sort((a, b) => b.create_time - a.create_time);
      setVideos([...sortedVideos]);
      hasMore = Boolean(json.data.hasMore);
      cursor = json.data.cursor;
    }
  }

  async function getUser() {
    const userUrl =
      "https://tiktok-video-feature-summary.p.rapidapi.com/user/info?";

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "fe1c5b412fmshfe27953d8668e94p163898jsne4bfad388baf",
        "X-RapidAPI-Host": "tiktok-video-feature-summary.p.rapidapi.com",
      },
    };

    const response = await fetch(
      userUrl + new URLSearchParams({ unique_id: "kristel99999" }),
      options
    );

    const json = await response.json();

    setUser(json);
  }

  const getRecommendations = async () => {
    const url =
      "https://tiktokcreators-production.up.railway.app/videos/getrecs";
    const result = await fetch(url);
    const json = await result.json();
    setRecs(json.data.recs);
  };

  useEffect(() => {
    getVideos();
    getUser();
    getRecommendations();
  }, []);

  if (page === "recommendations") {
    if (recs.length == 0) {
      return <Loading />;
    }
    return <Recommendations recs={recs} />;
  }

  return <Analytics videos={videos} user={user} />;
};

export default MainApp;
