import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const MarkdownResponse = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        strong: ({ children }) => (
          <strong className="font-bold text-teal-900 bg-teal-50 px-1 rounded">
            {children}
          </strong>
        ),
        ul: ({ children }) => (
          <ul className="list-none space-y-2 my-2 ml-2 border-l-2 border-teal-100 pl-4">
            {children}
          </ul>
        ),
        li: ({ children }) => (
          <li className="text-gray-600 text-sm flex items-start gap-2">
            <span className="text-teal-500 mt-1">✔</span>
            <span>{children}</span>
          </li>
        ),
        ol: ({ children }) => <ol className="space-y-6 my-4">{children}</ol>,
        p: ({ children }) => (
          <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
