"use client";

import { useState } from "react";
import { Paperclip, Send, Smile } from "lucide-react";
import { Heading } from "@/components/ui/typography";
import { IconButton } from "@/components/ui/buttons";
import { useWorkspaceChat } from "@/hooks/useTeam";

interface TeamChatPanelProps {
  onlineCount: number;
  teamId: string | null;
  currentUserId: string | null;
}

const TeamChatPanel = ({ onlineCount, teamId, currentUserId }: TeamChatPanelProps) => {
  const [draft, setDraft] = useState("");
  const {
    teamChatsQuery,
    chatMessagesQuery,
    chatId,
    workspaceChatMessages,
    isCreatingChat,
    isSendingMessage,
    sendMessage,
  } =
    useWorkspaceChat(teamId, currentUserId);

  const isLoading = teamChatsQuery.isLoading || chatMessagesQuery.isLoading || isCreatingChat;
  const canSend = Boolean(chatId) && !isSendingMessage;

  return (
    <aside
      className="flex h-full min-h-[32rem] flex-col rounded-2xl border border-gray-100 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)]
        lg:min-h-[calc(100vh-12rem)] lg:max-h-[calc(100vh-8rem)]"
    >
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 sm:px-5">
        <Heading level="h6" className="font-semibold text-content">
          Team Chat
        </Heading>
        <span className="font-primary text-xs font-semibold text-primary">{onlineCount} Online</span>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-5">
        <div className="flex justify-center">
          <span
            className="rounded-full bg-primary-light px-3 py-1 font-primary text-[10px] font-medium text-primary"
          >
            Today
          </span>
        </div>
        {isLoading ? (
          <p className="py-4 text-center font-primary text-sm text-content-light">Loading chat...</p>
        ) : workspaceChatMessages.length === 0 ? (
          <p className="py-4 text-center font-primary text-sm text-content-light">No messages yet.</p>
        ) : workspaceChatMessages.map((m) =>
          m.author === "me" ? (
            <div key={m.id} className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-br-md bg-primary px-3 py-2.5">
                <p className="font-primary text-sm leading-snug text-white">{m.body}</p>
                <p className="mt-1 text-right font-primary text-[10px] text-white/80">{m.time}</p>
              </div>
            </div>
          ) : (
            <div key={m.id} className="flex max-w-[90%] flex-col gap-1">
              <span className="font-primary text-[11px] font-medium text-content-light">
                {m.senderName}
              </span>
              <div className="rounded-2xl rounded-bl-md bg-gray-100 px-3 py-2.5">
                <p className="font-primary text-sm leading-snug text-content">{m.body}</p>
                <p className="mt-1 font-primary text-[10px] text-content-muted">{m.time}</p>
              </div>
            </div>
          ),
        )}
      </div>

      <div className="border-t border-gray-100 p-3 sm:p-4">
        <label className="sr-only" htmlFor="team-chat-input">
          Type a message
        </label>
        <textarea
          id="team-chat-input"
          rows={3}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type a Message..."
          className="mb-3 w-full resize-none rounded-xl border border-gray-200 bg-white px-3 py-2.5 font-primary text-sm text-content placeholder:text-content-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <IconButton
              type="button"
              variant="ghost"
              size="sm"
              aria-label="Attach file"
              onClick={() => console.log("attach (mock)")}
            >
              <Paperclip className="text-content-light" />
            </IconButton>
            <IconButton
              type="button"
              variant="ghost"
              size="sm"
              aria-label="Emoji"
              onClick={() => console.log("emoji (mock)")}
            >
              <Smile className="text-content-light" />
            </IconButton>
          </div>
          <IconButton
            type="button"
            variant="primary"
            size="md"
            aria-label="Send message"
            className="rounded-full"
            disabled={!canSend}
            onClick={async () => {
              if (!draft.trim() || !chatId) return;

              await sendMessage(draft.trim());
              setDraft("");
            }}
          >
            <Send className="h-4 w-4 text-white" />
          </IconButton>
        </div>
        <p className="mt-2 font-primary text-[10px] text-content-muted">
          Chat messages are now backed by the server and send through the API.
        </p>
      </div>
    </aside>
  );
};

export default TeamChatPanel;
