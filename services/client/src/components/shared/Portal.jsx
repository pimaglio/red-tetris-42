import { createPortal } from "react-dom";

const Portal = ({children}) => createPortal(children, document.getElementById("portal"))

export default Portal;
