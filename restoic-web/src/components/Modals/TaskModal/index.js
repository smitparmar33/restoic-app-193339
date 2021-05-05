import React from 'react';

import Modal from 'react-modal';
// style
import './index.css';
import '../../../index.css'
import 'react-calendar/dist/Calendar.css';
// icons
import iconInfo from '../../../assets/icons/icon_info_black.png';
import downloadIcon from '../../../assets/icons/icon_download_task.png';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    padding               : '61px',
    paddingTop: '29px',
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
  }
};
 
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#rootModal')
 
const TaskModal = ({
  isOpen,
  closeModal,
  selectedTask,
  selectedTaskTitle,
  selectedTaskCategoryTitle,
  link
}) => {
  const [task = { print_and_provide: '' }] = selectedTask;
  const { print_and_provide: linkForDownload } = task;
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
            <div>
              <div className="taskModalCategoryInfo">
                <img alt="iconInfo" src={iconInfo} className="taskModalInfoIcon" />
                <div className="taskModalCategoryTitle">{selectedTaskCategoryTitle}</div>
              </div>
              <div className="taskModalTitle">{selectedTaskTitle}</div>
                {
                  selectedTask.map(({ task }) => (
                    <div className="taskModalItem">{ReactHtmlParser(task)}</div>
                  ))
                }
                <div className="taskModalButtonWrapper">
                  <div className="taskModalButton" onClick={() => closeModal()}>OK</div>
                  {
                    selectedTaskTitle === 'Print & Provide' ? (
                      <a href={linkForDownload} target="_blank">
                        <img
                          alt="downloadIcon"
                          src={downloadIcon}
                          className="taskModalDownloadIcon"
                        />
                      </a>
                    ) : null
                  }
                </div>
            </div>
        </Modal>
      </div>
    );
}

export default TaskModal;