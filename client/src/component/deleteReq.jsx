import { deleteRequest } from './services';
import DeleteIcon from '@mui/icons-material/Delete';
const DeleteComponent = ({id,fetchData}) => {
    const handleDelete = async () => {
            try {
                const success = await deleteRequest(id);
                fetchData();
                if (success) {
                    console.log('Request deleted successfully');
                   // onDelete(id);
                } else {
                    alert('Failed to delete the request.');
                }
            } catch (error) {
                alert('Failed to delete the request. Please try again.');
            }
    };

    return (
        <div>
            <DeleteIcon  onClick={handleDelete} /> 

            {/* <DeleteIcon><button onClick={handleDelete}> </button></DeleteIcon> */}
            </div>
       
    );
};

export default DeleteComponent;
