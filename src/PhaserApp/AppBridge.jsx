import { memo, useLayoutEffect, useRef, useState } from "react";
import { PhaserApp } from "./PhaserApp";

export const ROOT_ID = "root-id";

const Root = memo(() => {
 return <div id={ROOT_ID} />;
});
Root.displayName = "Root";

export const AppBridge = ({ width, height, email }) => {

 const app = useRef(null);

 useLayoutEffect(() => {
   
  app.current = new PhaserApp({ width, height, id: ROOT_ID, email })
  
  return () => {
   app.current?.destroy()
  }

 }, [width, height])
 
 return <Root />;

};
AppBridge.displayName = "AppBridge";
