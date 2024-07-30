import { deleteRequest } from './services';
import DeleteIcon from '@mui/icons-material/Delete';
const DeleteComponent = ({id}) => {
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this request?')) {
            try {
                const success = await deleteRequest(id);
                if (success) {
                    console.log('Request deleted successfully');
                   // onDelete(id);
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
            <button onClick={handleDelete}>  <DeleteIcon /></button>
        </div>
    );
};

export default DeleteComponent;
