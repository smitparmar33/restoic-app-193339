import React from 'react';
import Modal from 'react-modal';
import compareItems from '../../../utils/getCompareItems';
// style
import './index.css';
import '../../../index.css'
 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    height: '500px',
    width: '1200px',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
    padding: '0px'
  }
};

const CompareItem = ({ title, week4, week8, week12 }) => (
    <div className="compareItemWrapper">
        <div className="compareItemTitle">{title}</div>
        <div className="compareItemCheck">{week4 && (<div className="compareItemCheckIcon" />)}</div>
        <div className="compareItemCheck">{week8 && (<div className="compareItemCheckIcon" />)}</div>
        <div className="compareItemCheck">{week12 && (<div className="compareItemCheckIcon" />)}</div>
    </div>
);

const CompareModal = ({ isOpen, closeModal }) => {
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
            <div className="compareModalContainer">
                <div className="compareModalHeader">
                    <div className="compareModalHeaderFirstItem" />
                    <div className="compareModalHeaderSecondItem">
                        <div className="compareModalHeaderTitle">4-Week Program</div>
                    </div>
                    <div className="compareModalHeaderSecondItem">
                        <div className="compareModalHeaderTitle">8-Week Program</div>
                    </div>
                    <div className="compareModalHeaderSecondItem">
                        <div className="compareModalHeaderTitle">12-Week Program</div>
                    </div>
                </div>
                {
                    compareItems.map(({ title, week4, week8, week12 }) => (
                        <CompareItem
                            title={title}
                            week4={week4}
                            week8={week8}
                            week12={week12}
                        />
                    ))
                }
            </div>
        </Modal>
      </div>
    );
}

export default CompareModal;