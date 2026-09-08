import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
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
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
                components={{
                    pre({children}) {
                        return <div className="not-prose my-6">{children}</div>;
                    },
                    code({className, children, node, ref, ...rest}) {
                        const match = /language-(\w+)/.exec(className || "");
                        const isInline =
                            !match && !String(children).includes("\n");

                        if (isInline) {
                            return (
                                <code
                                    {...rest}
                                    className="before:content-none after:content-none bg-gray-100 dark:bg-gray-800 text-primary-dark dark:text-primary px-1.5 py-0.5 rounded font-mono text-[0.875rem]"
                                >
                                    {children}
                                </code>
                            );
                        }

                        return (
                            <SyntaxHighlighter
                                style={oneDark}
                                language={match ? match[1] : "text"}
                                PreTag="div"
                                customStyle={{
                                    backgroundColor: "#282c34",
                                    padding: "1.25rem",
                                    borderRadius: "0.75rem",
                                    fontSize: "0.9rem",
                                    lineHeight: "1.5",
                                    overflowX: "auto",
                                }}
                                codeTagProps={{
                                    style: {
                                        backgroundColor: "transparent",
                                    },
                                }}
                            >
                                {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                        );
                    },
                    // Velog 인라인 HTML img 및 표준 마크다운 이미지 공통 처리
                    img({node, ...props}) {
                        return (
                            <img
                                {...props}
                                alt={props.alt || "포스트 본문 이미지"}
                                loading="lazy"
                                className="rounded-2xl mx-auto my-8 max-w-full h-auto object-contain shadow-sm"
                            />
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
