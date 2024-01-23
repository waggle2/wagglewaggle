import style from "./styles/modal.module.scss";

export const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <button onClick={onClose}>닫기</button>
        {children}
      </div>
      <style jsx>{``}</style>
    </div>
  );
};
