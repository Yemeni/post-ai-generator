import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface ClipboardButtonProps {
  textToCopy: string; // Text to copy
}

const ClipboardButton: React.FC<ClipboardButtonProps> = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  return (
    <CopyToClipboard text={textToCopy} onCopy={handleCopy}>
      <button style={{ padding: '10px', fontSize: '14px' }}>
        {copied ? 'Copied!' : 'Copy to Clipboard'}
      </button>
    </CopyToClipboard>
  );
};

export default ClipboardButton;
