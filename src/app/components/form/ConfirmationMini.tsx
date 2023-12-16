import {   Menu as MenuInner,
    MenuItem as MenuItemInner, MenuButton } from '@szhsin/react-menu';

type Props = {
    trigger: JSX.Element;
    yesFn: () => void;
    question: string;
}

const Menu = (props) => <MenuInner {...props} menuClassName={menuClassName} />;

const MenuItem = (props) => (
    <MenuItemInner {...props} className={menuItemClassName} />
  );
  

const menuClassName = ({ state }) =>
  `flex flex-col items-center
  box-border z-50 text-sm text-main bg-gray-950 p-1.5 text-mono border border-gray-800 rounded-xl shadow-lg select-none focus:outline-none min-w-[9rem] 
  ${state === "opening" && "animate-fadeIn"} ${state === "closing" && "animate-fadeOut"}`;

const menuItemClassName = ({ hover, disabled, submenu }) =>
  `flex flex-row justify-center rounded-md w-full px-3 py-5 focus:outline-none border-t border-gray-800
  ${hover && "text-white bg-gray-700"
  } ${disabled && "text-gray-400"} ${submenu && "flex items-center"}`;


const ConfirmationMini = ({trigger, yesFn, question}: Props) => {
    return  <Menu menuButton={<MenuButton>{trigger}</MenuButton>} menuClassName={menuClassName} transition>
    {question}
    <MenuItem onClick={yesFn} className={menuItemClassName}>Yes</MenuItem>
    <MenuItem className={menuItemClassName}>No</MenuItem>
  </Menu>
}

export default ConfirmationMini;