import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showMessage = (type, message) => {
  switch (type) {
    case 'info':
      toast.info(message);
      break;
    case 'success':
      toast.success(message);
      break;
    case 'error':
      toast.error(message);
      break;
    default:
      toast(message);
  }
};

export default showMessage;
