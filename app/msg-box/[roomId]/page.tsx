import MessageSender from "../_components/MessageSender";
import Messages from "../_components/Messages";
import MessagesHeader from "../_components/MessagesHeader";
import ModalMenu from "../_components/ModalMenu";
import style from "./page.module.scss";

export default function page() {
  return (
    <div className={style.wrapper}>
      <MessagesHeader />
      <div className={style.messagesDiv}>
        <Messages />
      </div>
      <MessageSender />
      {/* <ModalMenu /> */}
    </div>
  );
}
