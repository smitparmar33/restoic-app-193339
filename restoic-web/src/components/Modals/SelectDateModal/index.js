import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
// style
import './index.css';
import '../../../index.css'
import 'react-calendar/dist/Calendar.css';
 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    padding               : '100px',
    height: '450px',
    width: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
};
 
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#rootModal')
 
const SelectDateModal = ({ isOpen, closeModal, submitDate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date())
    return (
      <div>
        <Modal
          isOpen={isOpen}
          onRequestClose={() => closeModal()}
          style={customStyles}
          contentLabel="Example Modal"
          overlayClassName="Overlay"
          ariaHideApp={false}
        >
            <div className="selectDateLabel">SELECT START DATE</div>
            <Calendar
                onChange={(value) => setSelectedDate(new Date(value))}
                value={selectedDate}
                minDate={new Date()}
            />
            <div className="selectDateButtonsWrapper">
                <div
                    onClick={() => closeModal()}
                    className="selectDateCloseButton"
                >
                    Close
                </div>
                <div
                    onClick={() => submitDate(new Date(selectedDate).toISOString().substring(0,10))}
                    className="selectDateSubmitButton"
                >
                    Submit
                </div>
            </div>
        </Modal>
      </div>
    );
}

export default SelectDateModal;