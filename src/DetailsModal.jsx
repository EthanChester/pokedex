import "./App.css";

function DetailsModal({ open, children, handleClick }) {
    if (!open) {
        return null;
    }
    return (
        <div
            className='modal'
        >
            {children}
            <button onClick={handleClick}>
                X
            </button>
        </div>
    );
}

export default DetailsModal;
