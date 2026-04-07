import type { Metadata } from "next";
import PostNewIdeaPage from "@/components/pages/PostNewIdeaPage";

export const metadata: Metadata = {
  title: "TeamUp — Post New Idea",
};

const PostNewIdeaRoute = () => {
  return <PostNewIdeaPage />;
};

export default PostNewIdeaRoute;