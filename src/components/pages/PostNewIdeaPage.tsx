"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/buttons";
import { Heading } from "@/components/ui/typography";
import { Breadcrumb } from "@/components/ui/navigation";
import { Input, Select, TagInput, Textarea } from "@/components/ui/forms";
import { UploadFileModal } from "@/components/ui/modals";
import { MOCK_USER } from "@/mock/Dashboard";
import { PROJECTS_IDEAS } from "@/mock/ProjectsIdeas";

const sectionCard = "rounded-xl border border-gray-100 bg-white p-5 sm:p-6";

type IdeaFormMode = "create" | "edit";

type UploadType = "free" | "paid";

interface FileItem {
  name: string;
  size: string;
  type: UploadType;
}

interface PostIdeaFormValues {
  projectName: string;
  problemStatement: string;
  difficulty: string;
  timeframe: string;
  ideaStatus: UploadType;
  category: string;
  price: string;
  techStack: string[];
  overview: string;
}

interface PostNewIdeaPageProps {
  mode?: IdeaFormMode;
  ideaId?: number;
  initialValues?: Partial<PostIdeaFormValues>;
}

const getIdeaInitialValues = (ideaId?: number): Partial<PostIdeaFormValues> => {
  if (!ideaId) return {};

  const idea = PROJECTS_IDEAS.find((item) => item.id === ideaId);
  if (!idea) return {};

  return {
    projectName: idea.name,
    problemStatement: idea.description,
    difficulty: idea.difficultyLevel.toLowerCase(),
    timeframe: idea.timeFrame.toLowerCase(),
    ideaStatus: idea.price,
    category: idea.category,
    price: idea.priceAmount ? String(idea.priceAmount) : "",
    techStack: Array.from(new Set(idea.techStack)),
    overview: idea.description,
  };
};

const PostNewIdeaPage = ({
  mode = "create",
  ideaId,
  initialValues,
}: PostNewIdeaPageProps) => {
  const isMentor = MOCK_USER.userRole === "mentor";
  const defaults = {
    ...getIdeaInitialValues(ideaId),
    ...initialValues,
  };

  const [projectName, setProjectName] = useState(defaults.projectName ?? "");
  const [problemStatement, setProblemStatement] = useState(
    defaults.problemStatement ?? "",
  );
  const [difficulty, setDifficulty] = useState(defaults.difficulty ?? "");
  const [timeframe, setTimeframe] = useState(defaults.timeframe ?? "");
  const [ideaStatus, setIdeaStatus] = useState<UploadType>(
    defaults.ideaStatus ?? "free",
  );
  const [category, setCategory] = useState(defaults.category ?? "");
  const [price, setPrice] = useState(defaults.price ?? "");
  const [techStack, setTechStack] = useState<string[]>(defaults.techStack ?? []);
  const [overview, setOverview] = useState(defaults.overview ?? "");

  const [files, setFiles] = useState<FileItem[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState<UploadType>("free");

  const handleAddFileClick = (type: UploadType) => {
    setUploadType(type);
    setIsUploadModalOpen(true);
  };

  const handleUpload = (uploadedFiles: File[]) => {
    const newFiles: FileItem[] = uploadedFiles.map((file) => ({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      type: uploadType,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (name: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== name));
  };

  const freeFiles = files.filter((file) => file.type === "free");
  const paidFiles = files.filter((file) => file.type === "paid");
  const submitLabel = mode === "edit" ? "Save changes" : "Publish idea";
  const titleLabel = mode === "edit" ? "Edit Project Idea" : "Post New Idea";
  const subtitleLabel =
    mode === "edit"
      ? "Update your project idea and keep the current structure intact"
      : "Share your project idea with students";
  const breadcrumbLabel =
    mode === "edit" ? "Edit project idea" : "Post new idea";

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb
        items={[
          {
            label: isMentor ? "Main Mentor Dashboard" : "Main Student Dashboard",
            href: "/dashboard",
          },
          { label: "My posted ideas", href: "/dashboard/projects-ideas" },
          { label: breadcrumbLabel },
        ]}
      />

      <div className="flex flex-col">
        <Heading level="h2" className="font-bold text-content">
          {titleLabel}
        </Heading>
        <p className="mt-1 font-primary text-sm text-primary">{subtitleLabel}</p>
      </div>

      <div className={sectionCard}>
        <form className="flex flex-col gap-6">
          <Input
            id="project-name"
            label="Project name"
            placeholder="Smart Campus Energy Management System"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />

          <Input
            id="problem-statement"
            label="Problem statement"
            placeholder="What problem does this idea solve?"
            value={problemStatement}
            onChange={(e) => setProblemStatement(e.target.value)}
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Select
              id="difficulty-level"
              label="Difficulty level"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              options={[
                { label: "Select", value: "" },
                { label: "Beginner", value: "beginner" },
                { label: "Intermediate", value: "intermediate" },
                { label: "Advanced", value: "advanced" },
              ]}
            />
            <Select
              id="expected-timeframe"
              label="Expected Timeframe"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              options={[
                { label: "Select", value: "" },
                { label: "1-2 Months", value: "1-2 months" },
                { label: "3-4 Months", value: "3-4 months" },
                { label: "6+ Months", value: "6+ months" },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Select
              id="idea-status"
              label="Idea status"
              value={ideaStatus}
              onChange={(e) => setIdeaStatus(e.target.value as UploadType)}
              options={[
                { label: "Free", value: "free" },
                { label: "Paid", value: "paid" },
              ]}
            />
            <Select
              id="category"
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={[
                { label: "Select", value: "" },
                { label: "Software", value: "software" },
                { label: "Design", value: "design" },
                { label: "AI / ML", value: "ai_ml" },
              ]}
            />
          </div>

          {ideaStatus === "paid" && (
            <Input
              id="price"
              label="Price"
              placeholder="2$"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          )}

          <TagInput
            id="tech-stack"
            label="Technology stack"
            value={techStack}
            onChange={setTechStack}
            placeholder="Add a technology..."
            variant="minimal"
          />

          <Textarea
            id="idea-overview"
            label="Project idea overview"
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            rows={6}
          />

          <div className="flex flex-col gap-6">
            {ideaStatus === "free" ? (
              <div className="flex flex-col gap-4">
                <p className="font-primary text-sm font-medium text-content-light">
                  Project idea Files
                </p>
                <div className="flex flex-wrap gap-4">
                  {freeFiles.map((file) => (
                    <FileCard
                      key={file.name}
                      file={file}
                      onRemove={() => removeFile(file.name)}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => handleAddFileClick("free")}
                  className="flex items-center gap-2 self-start font-primary text-sm font-medium text-primary hover:text-primary-dark"
                >
                  <Plus size={16} /> Add File
                </button>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-4">
                  <p className="font-primary text-sm font-medium text-content-light">
                    Project idea Free Files
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {freeFiles.map((file) => (
                      <FileCard
                        key={file.name}
                        file={file}
                        onRemove={() => removeFile(file.name)}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddFileClick("free")}
                    className="flex items-center gap-2 self-start font-primary text-sm font-medium text-primary hover:text-primary-dark"
                  >
                    <Plus size={16} /> Add Free File
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="font-primary text-sm font-medium text-content-light">
                    Project idea Paid Files
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {paidFiles.map((file) => (
                      <FileCard
                        key={file.name}
                        file={file}
                        onRemove={() => removeFile(file.name)}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddFileClick("paid")}
                    className="flex items-center gap-2 self-start font-primary text-sm font-medium text-primary hover:text-primary-dark"
                  >
                    <Plus size={16} /> Add Paid File
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <Link
              href="/dashboard/projects-ideas"
              className="rounded-lg border border-primary px-10 py-2.5 font-primary text-sm font-medium text-primary hover:bg-primary/5"
            >
              Cancel
            </Link>
            <Button
              type="button"
              variant="primary"
              size="md"
              className="px-10"
              onClick={() => {
                console.log(mode === "edit" ? "Saving changes..." : "Publishing idea...");
              }}
            >
              {submitLabel}
            </Button>
          </div>
        </form>
      </div>

      <UploadFileModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
        title={`Upload ${uploadType === "paid" ? "Paid" : "Free"} File`}
      />
    </div>
  );
};

const FileCard = ({
  file,
  onRemove,
}: {
  file: FileItem;
  onRemove: () => void;
}) => (
  <div className="relative flex min-w-[200px] items-center gap-3 rounded-lg border border-gray-100 bg-gray-50/30 p-3 pr-10">
    <div className="flex size-10 items-center justify-center rounded-lg bg-red-50 text-red-500">
      <FileText size={20} />
    </div>
    <div className="flex min-w-0 flex-col">
      <p className="truncate font-primary text-sm font-semibold text-content">
        {file.name}
      </p>
      <p className="font-primary text-xs text-content-light">{file.size}</p>
    </div>
    <button
      type="button"
      onClick={onRemove}
      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-content-muted hover:bg-gray-100 hover:text-content"
    >
      <X size={14} />
    </button>
  </div>
);

export default PostNewIdeaPage;
