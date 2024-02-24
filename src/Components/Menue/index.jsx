const { default: Image } = require("next/image");
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.css";
import { menuItemClick,actionItemClick } from "@/slice/menuSlice";
const Menu = () => {
  const dispatch = useDispatch();
  const activeMenueItem = useSelector((store) => store.menu.activeMenuItem);
  const menuData = [
    { title: "PENCIL", image: "https://img.icons8.com/ios/50/pencil--v1.png" },
    { title: "ERASER", image: "https://img.icons8.com/ios/50/eraser.png" },
    { title: "UNDO", image: "https://img.icons8.com/ios-filled/50/undo.png" },
    { title: "REDO", image: "https://img.icons8.com/ios-filled/50/redo.png" },
    {
      title: "DOWNLOAD",
      image: "https://img.icons8.com/ios/50/download--v1.png",
    },
    { title: "DELETE", image: "https://img.icons8.com/windows/32/trash.png" },
  ];
  const handleMenueClick = (item, ind) => {
    //console.log(item)
    if (ind <= 1) dispatch(menuItemClick(item));
    else  dispatch(actionItemClick(item))
  };
  return (
    <div className={styles?.menuContainer}>
      {menuData?.map((ele, ind) => (
        <div
          key={ind}
          className={`${styles?.iconContainer} ${
            activeMenueItem === ele?.title ? styles.active : ""
          }`}
          onClick={() => handleMenueClick(ele?.title, ind)}
        >
          <Image src={ele?.image} width={40} height={40} alt={ele?.title} />
        </div>
      ))}
    </div>
  );
};
export default Menu;
