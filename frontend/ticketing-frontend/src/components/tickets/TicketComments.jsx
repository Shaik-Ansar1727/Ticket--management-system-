import React, { useState } from "react";
import { Button, message } from "antd";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Quill from "quill";
import {
  addCommentApi,
  getTicketCommentsApi,
} from "../../api/comment.api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Link = Quill.import("formats/link");
Quill.register(Link, true);

const TicketComments = ({ ticketId }) => {
  const [commentContent, setCommentContent] = useState("");
  const queryClient = useQueryClient();

  const {
    data: comments = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["ticket-comments", ticketId],
    queryFn: () => getTicketCommentsApi(ticketId),
    enabled: !!ticketId,
  });

  const addCommentMutation = useMutation({
    mutationFn: (content) => addCommentApi(ticketId, content),

    onSuccess: () => {
      message.success("Comment added");
      setCommentContent("");
      queryClient.invalidateQueries({
        queryKey: ["ticket-comments", ticketId],
      });
    },

    onError: (error) => {
      message.error(
        error?.response?.data?.message ||
        "Only admin or assigned employee can comment"
      );
    },
  });

  if (isLoading) {
    return <p className="text-gray-500">Loading comments…</p>;
  }

  if (isError) {
    return (
      <p className="text-red-500">
        {error?.response?.data?.message || "Failed to load comments"}
      </p>
    );
  }

  // ✅ SORT: latest comment first
  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="space-y-6">

      <h3 className="text-lg font-semibold text-gray-800">
        Comments
      </h3>

      {sortedComments.length === 0 ? (
        <p className="text-gray-500">No comments yet</p>
      ) : (
        sortedComments.map((comment, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 p-4"
          >
            <div className="text-sm text-gray-600">
              <strong className="text-gray-800">
                {comment.author}
              </strong>{" "}
              •{" "}
              {new Date(comment.createdAt).toLocaleString()}
            </div>

            <div
              className="mt-2 text-gray-800 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: comment.content }}
            />
          </div>
        ))
      )}

      <hr />

      <h3 className="text-lg font-semibold text-gray-800">
        Add Comment
      </h3>

      <ReactQuill
        theme="snow"
        value={commentContent}
        onChange={setCommentContent}
        placeholder="Write a comment..."
        modules={{
          toolbar: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            ["clean"],
          ],
        }}
        formats={["bold", "italic", "underline", "list", "link"]}
      />

      <Button
        type="primary"
        loading={addCommentMutation.isLoading}
        onClick={() => {
          if (!commentContent || commentContent.trim() === "<p><br></p>") {
            message.warning("Comment cannot be empty");
            return;
          }

          addCommentMutation.mutate(commentContent);
        }}
      >
        Add Comment
      </Button>

    </div>
  );
};

export default TicketComments;
