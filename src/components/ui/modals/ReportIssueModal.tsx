"use client";
import { useState } from "react";
import Modal from "./Modal";
import { Button } from "@/components/ui/buttons";
import { Input, Textarea } from "@/components/ui/forms";
import { Heading } from "@/components/ui/typography";

export interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    fullName: string;
    email: string;
    title: string;
    description: string;
  }) => void;
}

export const ReportIssueModal = ({
  isOpen,
  onClose,
  onSubmit,
}: ReportIssueModalProps) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      onSubmit({
        fullName,
        email,
        title,
        description,
      });
      // Reset form
      setFullName("");
      setEmail("");
      setTitle("");
      setDescription("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Reset form
    setFullName("");
    setEmail("");
    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      closeButtonClassName="text-content hover:bg-gray-100"
      className="max-w-2xl w-full p-6 pt-12 sm:p-8 "
    >
      <Heading
        level="h4"
        className="pr-10 font-semibold leading-tight text-content"
      >
        Report an Issue
      </Heading>

      <div className="mt-6 flex flex-col gap-4">
        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="fullName"
            className="font-primary text-sm font-medium text-content"
          >
            Full Name
          </label>
          <Input
            id="fullName"
            type="text"
            placeholder="Wafaa amjad"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="font-primary text-sm font-medium text-content"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="title"
            className="font-primary text-sm font-medium text-content"
          >
            Title
          </label>
          <Input
            id="title"
            type="text"
            placeholder="Issue title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <Textarea
          id="description"
          label="Description"
          placeholder="Describe the issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </div>

      {/* Buttons */}
      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          variant="secondary"
          size="md"
          onClick={handleCancel}
          disabled={isSubmitting}
          className="w-full"
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={handleSubmit}
          disabled={
            isSubmitting || !fullName || !email || !title || !description
          }
          className="w-full"
        >
          {isSubmitting ? "Submitting..." : "Submit Report"}
        </Button>
      </div>
    </Modal>
  );
};
