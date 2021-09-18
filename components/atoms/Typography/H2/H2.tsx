import React, { HTMLAttributes } from "react";
import { style } from "./style";
export const H2: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({
  ...props
}) => {
  return (
    <h2 css={style} {...props}>
      {props.children}
    </h2>
  );
};
