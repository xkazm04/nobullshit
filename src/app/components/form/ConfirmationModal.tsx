import {   Menu as MenuInner, MenuButton } from '@szhsin/react-menu';

type Props = {
    trigger: JSX.Element;
    content: JSX.Element;
}


const Menu = (props: any) => <MenuInner {...props} menuClassName={menuClassName} />;


const menuClassName = ({ state }:any) =>
  `flex flex-col items-center
  box-border z-50 text-sm text-main bg-gray-950 p-1.5 text-mono border border-gray-800 rounded-xl shadow-lg select-none focus:outline-none min-w-[20rem] 
  ${state === "opening" && "animate-fadeIn"} ${state === "closing" && "animate-fadeOut"}`;



const ConfirmationModal = ({trigger, content}: Props) => {
    return  <Menu menuButton={<MenuButton>{trigger}</MenuButton>} menuClassName={menuClassName} transition>
    {content}
  </Menu>
}

export default ConfirmationModal;