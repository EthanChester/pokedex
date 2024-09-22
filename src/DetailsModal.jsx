import "./App.css";

function DetailsModal({ open, children, handleClick }) {
    if (!open) {
        return null;
    }
    return (
        <div className="modalBackground">
            <div className='modal'>
                {children}
                <button onClick={handleClick} className="modalCloseButton">
                    X
                </button>
            </div>
        </div>
        
    );
}

export default DetailsModal;
