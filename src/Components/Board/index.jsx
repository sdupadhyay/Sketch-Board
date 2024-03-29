import { MENU_ITEMS } from "@/constants";
import { actionItemClick } from "@/slice/menuSlice";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
// import { socket } from "../socket";
const Board = () => {
  const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);
  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);
  const canvasRef = useRef();
  const shouldDraw = useRef(false);
  const drawHistory = useRef([]);
  const historyPointer = useRef(0);
  const dispatch = useDispatch();
  const [draw, setDraw] = useState(false);
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const url = canvas.toDataURL();
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "sketch.jpg";
      anchor.click();
      // console.log(url)
    } else if (
      actionMenuItem === MENU_ITEMS.UNDO ||
      actionMenuItem === MENU_ITEMS.REDO
    ) {
      if (historyPointer.current > 0 && actionMenuItem === MENU_ITEMS.UNDO  && drawHistory?.current?.length > 0)
        historyPointer.current -= 1;
      if (
        historyPointer.current < drawHistory.current.length - 1 &&
        actionMenuItem === MENU_ITEMS.REDO && drawHistory?.current?.length > 0
      )
        historyPointer.current += 1;
      const imageData = drawHistory.current[historyPointer.current];
      drawHistory?.current?.length > 0 ?  context.putImageData(imageData, 0, 0) : null
    }
     else if (actionMenuItem === MENU_ITEMS.DELETE){
      drawHistory.current = []
      context.clearRect(0, 0, canvas.width, canvas.height);
    }

    dispatch(actionItemClick(null));
  }, [actionMenuItem, dispatch]);
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const changeConfig = (color, size) => {
      context.strokeStyle = color;
      context.lineWidth = size;
    };

    const handleChangeConfig = (config) => {
      changeConfig(config.color, config.size);
    };
    changeConfig(color, size);
    
    // socket.on("changeConfig", handleChangeConfig);
    // return () => socket.off("changeConfig", handleChangeConfig);
  }, [color, size]);
  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const beginPath = (x, y) => {
      context.beginPath();
      context.moveTo(x, y);
    };
    const drawLine = (x, y) => {
      context.lineTo(x, y);
      context.stroke();
    };
    const handleMouseDown = (e) => {
      //setDraw(true)
      shouldDraw.current = true;
      beginPath(e.clientX, e.clientY);
      //socket.emit("beginPath", { x: e.clientX, y: e.clientY });
    };
    const handleMouseMove = (e) => {
      if (shouldDraw.current) {
        drawLine(e.clientX, e.clientY);
       // socket.emit("drawLine", { x: e.clientX, y: e.clientY });
      }
    };
    const handleMouseUp = (e) => {
      //setDraw(false)
      shouldDraw.current = false;
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      drawHistory.current.push(imageData);
      historyPointer.current = drawHistory.current.length - 1;
    };
    // socket.on("connect", () => {
    //   // ...
    //   console.log("Client Connected");
    // });
    const handleBeginPath = (path) => {
      beginPath(path.x, path.y);
    };

    const handleDrawLine = (path) => {
      drawLine(path.x, path.y);
    };
    // socket.on("beginPath", handleBeginPath);
    // socket.on("drawLine", handleDrawLine);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      // socket.off("beginPath", handleBeginPath);
      // socket.off("drawLine", handleDrawLine);
    };
  }, []);
  return (
    <>
      <canvas ref={canvasRef} className={`${activeMenuItem === "PENCIL" ? styles.cursorPencil: activeMenuItem ==="ERASER"? styles.cursorEarser : ""}`}></canvas>
    </>
  );
};
export default Board;
