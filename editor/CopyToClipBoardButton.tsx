import React, { FC, useEffect, useState } from "react";

interface Props {
  stringToCopy: string;
  children: string;
}

export const CopyToClipboardButton: FC<Props> = ({
  stringToCopy,
  children,
}) => {
  const [copied, setCopied] = useState(false);

  const onClick = () => {
    navigator.clipboard.writeText(stringToCopy);
    setCopied(true);
  };

  useEffect(() => {
    const copiedTimeout = setTimeout(() => {
      setCopied(false);
    }, 1500);

    return () => clearTimeout(copiedTimeout);
  }, [copied]);

  return (
    <button onClick={() => onClick()}>{copied ? "Copied!" : children}</button>
  );
};
