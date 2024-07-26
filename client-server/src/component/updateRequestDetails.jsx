import {updateFinalDecision} from './services'
const UdateRquest = ({finalDecisionChose}) => {
    console.log("finalDecision"+finalDecisionChose)
    const handleUdateFinalDecision = async () => {
       try{
        const success=await updateFinalDecision(1,{finalDecisionChose},'dsajf');
   }
    catch (error) {
        console.log('Failed to update the request. Please try again.');
    }
};
return (
    <div>
       
    </div>
);
}
export default UdateRquest;


 {/* <button onClick={handleUdateFinalDecision}>update</button> */}

//                 } else {
//                     alert('Failed to delete the request.');
//                 }
//             } catch (error) {
//                 alert('Failed to delete the request. Please try again.');
//             }
//         }
//     };

//     return (
//         <div>
//             <button onClick={handleDelete}>Delete Request</button>
//         </div>
//     );
// };

// export default DeleteComponent;
