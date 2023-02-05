import { Modal } from "../../components/Modal/Modal";
import React, { useState } from "react";

export const Users = () => {
  const [userModal, setUserModal] = useState();

  return (
    <div>
      <button className="btn btn-success" onClick={() => setUserModal(true)}>modal</button>
      {userModal ? (
        <Modal title={"USER MODAL"} modal={userModal} setModal={setUserModal}>
          <h3>WELCOME TO THE USER MODAL</h3>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
};
