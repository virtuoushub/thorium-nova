import React from "react";
import {css} from "@emotion/core";

const ListGroupItem: React.FC<{
  as?: React.ElementType;
  onClick?: (event: React.MouseEvent<any>) => void;
  selected?: boolean;
  disabled?: boolean;
  size?: "small";
  to?: string;
}> = ({onClick, selected, disabled, size, as = "div", ...props}) =>
  React.createElement(as, {
    className: `block w-full border border-solid border-blackAlpha-50 px-${
      size === "small" ? 2 : 4
    } py-${size === "small" ? 1 : 2} ${size === "small" ? "text-sm" : ""} ${
      disabled ? "text-gray-400 pointer-events-none" : "pointer-events-auto"
    } ${
      size === "small"
        ? "bg-blackAlpha-600"
        : selected
        ? "bg-whiteAlpha-400"
        : "bg-blackAlpha-400"
    } cursor-pointer list-group-item hover:bg-${
      selected ? "whiteAlpha-500" : "whiteAlpha-50"
    }`,
    css: css`
      & + .list-group-item {
        border-top-width: 0;
      }
      &:first-of-type {
        border-top-left-radius: "0.25rem";
        border-top-right-radius: "0.25rem";
      }
      &:last-of-type {
        border-top-left-radius: "0.25rem";
        border-top-right-radius: "0.25rem";
      }
    `,
    onClick,
    ...props,
  });

export default ListGroupItem;
