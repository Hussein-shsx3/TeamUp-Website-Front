import type { Metadata } from "next";
import PostNewIdeaPage from "@/components/pages/PostNewIdeaPage";

export const metadata: Metadata = {
  title: "TeamUp — Edit Project Idea",
};

interface EditPostNewIdeaRouteProps {
  params: Promise<{
    ideaId: string;
  }>;
}

const EditPostNewIdeaRoute = async ({ params }: EditPostNewIdeaRouteProps) => {
  const { ideaId } = await params;

  return <PostNewIdeaPage mode="edit" ideaId={Number(ideaId)} />;
};

export default EditPostNewIdeaRoute;
