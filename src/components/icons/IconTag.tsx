import React from 'react';

type Props = {
  add: boolean;
};

const IconTag: React.FC<Props> = ({ add }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    viewBox="0 0 230 230"
    xmlSpace="preserve"
    className="w-full h-full"
  >
    <path d="M95.084 0H.13v95.475L134.658 230l95.212-95.212L95.084 0zM61.138 61.268c-6.988 6.989-18.321 6.989-25.309 0-6.989-6.987-6.99-18.321 0-25.308 6.987-6.99 18.321-6.989 25.309 0 6.989 6.987 6.989 18.321 0 25.308z"></path>
    {add && (
      <path d="M 191.9932,0.41408727 V 22.914087 h -22.5 v 15 h 22.5 v 22.5 h 15 v -22.5 h 22.5 v -15 h -22.5 V 0.41408727 Z" />
    )}
  </svg>
);

export default IconTag;
