import { memo, useLayoutEffect, useRef, useState } from "react";
import { PhaserApp } from "./PhaserApp";

export const ROOT_ID = "root-id";

const Root = memo(() => {
  return (
    <div
      className="flex justify-center w-min rounded-md p-2 shadow-3xl bg-gradient-to-b from-white to-cyan-700"
      id={ROOT_ID}
    />
  );
});
Root.displayName = "Root";

export const AppBridge = ({ width, height, email }) => {
  const app = useRef(null);

  useLayoutEffect(() => {
    app.current = new PhaserApp({ width, height, id: ROOT_ID, email });

    return () => {
      app.current?.destroy();
    };
  }, [width, height, email]);

  return <Root />;
};
AppBridge.displayName = "AppBridge";
