import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.css";
import { MENU_ITEMS } from "@/constants";
import cx from "classnames";
import { changeBrushSize, changeColor } from "@/slice/toolboxSlice";
const Toolbox = () => {
  const dispatch = useDispatch();
  const activeMenueItem = useSelector((store) => store.menu.activeMenuItem);
  const { color, size } = useSelector(
    (store) => store.toolbox[activeMenueItem]
  );
  //console.log(useSelector((store) => store.toolbox[activeMenueItem]));
  const showStroke = activeMenueItem === MENU_ITEMS.PENCIL;
  const showBrush =
    activeMenueItem === MENU_ITEMS.PENCIL ||
    activeMenueItem === MENU_ITEMS.ERASER;
  const updateBrushSize = (e) => {
    dispatch(changeBrushSize({ item: activeMenueItem, size: e.target.value }));
  };
  const updateColor = (newColor) => {
    // console.log("NEW",newColor)
    dispatch(changeColor({ item: activeMenueItem, color: newColor }));
  };
  return (
    <div className={styles.toolboxContainer}>
      {showStroke && (
        <div className={styles.toolItem}>
          <span className={styles.toolText}>Colors</span>
          <div className={styles.itemContainer}>
            {colorObject?.map((ele, ind) => (
              <div
                key={ind}
                style={{ backgroundColor: ele?.colorName }}
                className={cx(styles.colorBox, {
                  [styles.active]: color === ele?.colors,
                })}
                onClick={() => updateColor(ele.colors)}
              />
            ))}
          </div>
        </div>
      )}

      {showBrush && (
        <div className={styles.toolItem}>
          <span className={styles.toolText}>Brush Size</span>
          <div className={styles.itemContainer}>
            <input
              type="range"
              min={activeMenueItem === "PENCIL" ? 1 : 10}
              max={activeMenueItem === "PENCIL" ? 10 : 50}
              step={activeMenueItem === "PENCIL" ? 1 : 10}
              value={size}
              defaultValue={activeMenueItem === "PENCIL" ? 5 : 25}
              onChange={(e) => updateBrushSize(e)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default Toolbox;
//https://plainenglish.io/blog/6-interview-questions-that-combine-promise-and-settimeout-34c430fc297e

const colorObject = [
  { colors: "BLACK", colorName: "black" },
  { colors: "RED", colorName: "red" },
  { colors: "GREEN", colorName: "green" },
  { colors: "BLUE", colorName: "blue" },
  { colors: "ORANGE", colorName: "orange" },
  { colors: "YELLOW", colorName: "yellow" },
  { colors: "WHITE", colorName: "white" },
];
