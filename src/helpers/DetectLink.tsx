// Detect links in text and make them clickable
const DetectLink = ({ children }: any) => {
    const extractUrl = (word: string) => {
        const urlPattern = /\((https?:\/\/\S+?)\)/g; // Regex pattern to find links
        const match = urlPattern.exec(word);
        return match ? match[1] : null;
    }

    const url = extractUrl(children);

    if (url) {
        // If a URL is found, split the children into parts (text before URL and URL)
        const parts = children.split(url);

        return (
            <span>
                {parts[0]} {/* Render text before the URL */}
                <a href={url} target="_blank" rel="noreferrer" className="font-medium text-blue-600 hover:underline">
                    {url}
                </a>
                {parts[1]} {/* Render text after the URL */}
            </span>
        );
    } else {
        return <span>{children}</span>;
    }
}

export default DetectLink;