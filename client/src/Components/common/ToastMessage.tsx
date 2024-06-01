import toast from "react-hot-toast";
import { ToastMessageEnumType } from "../../enum/ToastMessage";

interface IToastMessage {
  messgae: string;
  type: ToastMessageEnumType;
}

export const getToastMessage = (data: IToastMessage) => {
  if (data.type === ToastMessageEnumType.error) {
    return toast.error(data.messgae);
  }
  if (data.type === ToastMessageEnumType.success) {
    return toast.success(data.messgae);
  }
  if (data.type === ToastMessageEnumType.info) {
    return toast(data.messgae);
  }
};
