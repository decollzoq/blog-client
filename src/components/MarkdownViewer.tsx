import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/cjs/styles/prism/one-dark";

interface Props {
    content: string;
}
function MarkdownViewer({content}: Props) {
    return (
        <article className="prose my-12 dark:prose-invert max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    code({className, children, node, ref, ...rest}) {
                        const match = /language-(\w+)/.exec(className || "");
                        return match ? (
                            <SyntaxHighlighter
                                {...rest}
                                style={oneDark}
                                language={match[1]}
                                PreTag="div"
                                customStyle={{
                                    backgroundColor: "transparent",
                                    padding: 0,
                                }}
                                codeTagProps={{
                                    style: {
                                        backgroundColor: "transparent",
                                    },
                                }}
                            >
                                {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                        ) : (
                            <code
                                {...rest}
                                className={`${className} before:content-none after:content-none bg-gray-100 dark:bg-gray-700 dark:text-primary transition-colors duration-500 text-primary-dark px-1.5 py-0.5 rounded font-mono text-[0.9rem]`}
                            >
                                {children}
                            </code>
                        );
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </article>
    );
}

export default MarkdownViewer;
