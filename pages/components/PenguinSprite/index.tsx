import * as React from 'react';
import Image from "next/image"

const PenguinSprite: React.FunctionComponent = () => {
  return (
    <Image style={{position: "absolute"}} src={'/fireball.gif'} width={70} height={70} />
  );
};

export default PenguinSprite;
