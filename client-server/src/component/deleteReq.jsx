
import { deleteRequest } from './services';

const DeleteComponent = ({ id, onDeleteSuccess }) => {
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this request?')) {
            try {
                const success = await deleteRequest(id);
                if (success) {
                    console.log('Request deleted successfully');
                    onDeleteSuccess();
                } else {
                    alert('Failed to delete the request.');
                }
            } catch (error) {
                alert('Failed to delete the request. Please try again.');
            }
        }
    };

    return (
        <div>
            <button onClick={handleDelete}>Delete Request</button>
        </div>
    );
};

export default DeleteComponent;
