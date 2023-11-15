import React, { ReactNode } from 'react';
import Link from 'next/link';

interface WhiteboardButtonWrapperProps {
  children: ReactNode;
}

const WhiteboardButtonWrapper = ({ children }: WhiteboardButtonWrapperProps) => {
  return (
    <div className="button-wrapper">
      <Link href="/whiteboard">
          <div className="button">{children}</div>
      </Link>
    </div>
  );
};

export default WhiteboardButtonWrapper;
