import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

const AssistantMessage = ({ content }) => {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-4 py-3 rounded-2xl max-w-[75%] break-words">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default AssistantMessage;
