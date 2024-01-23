"use client";
import { useState } from "react";
import { Modal } from "./Modal";

export default function ModalMenu() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div>
      <button onClick={openModal}>메뉴</button>
      <Modal show={showModal} onClose={closeModal}>
        <p>여기에 메뉴 내용을 넣으세요.</p>
      </Modal>
    </div>
  );
}
