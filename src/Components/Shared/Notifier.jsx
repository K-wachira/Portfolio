import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Notifier = (props) => {
  let options = {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  };
  if (props.value === "success") {
    return toast.success(props.message, options);
  } else if (props.value === "promise") {
    return toast.promise(props.message, options);
  } else if (props.value === "warn") {
    return toast.warn(props.message, options);
  } else {
    return toast.warn("Oops that did not work!!", options);
  }
};

export default Notifier;
