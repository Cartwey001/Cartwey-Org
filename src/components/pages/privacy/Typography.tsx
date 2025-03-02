import { PropsWithChildren } from "react";

export const HeadingOne = (props: PropsWithChildren) => {
  return (
    <h1 className="text-2xl font-semibold text-black my-6">{props.children}</h1>
  );
};

export const HeadingTwo = (props: PropsWithChildren) => {
  return (
    <h2 className="text-xl font-semibold text-gray-900 my-4">
      {props.children}
    </h2>
  );
};

export const Paragraph = (props: PropsWithChildren) => {
  return <p className="leading-loose my-4 text-sm">{props.children}</p>;
};

export const ListItem = (props: PropsWithChildren) => {
  return (
    <li className="ml-4 text-sm leading-loose">
      <span className="current ml-4">{props.children}</span>
    </li>
  );
};
