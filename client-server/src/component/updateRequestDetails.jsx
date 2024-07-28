import {updateFinalDecision} from './services'
const UdateRquest = ({selectedFinalDecision}) => {
    console.log("finalDecision"+selectedFinalDecision)
    const handleUdateFinalDecision = async () => {
       try{
        const success = await updateFinalDecision(223,{selectedFinalDecision},'sucsess update final decision');
        console.log("success"+success);
   }
    catch (error) {
        console.log('Failed to update the request. Please try again.');
    }
};
return (
    <div>
       <button onClick={handleUdateFinalDecision}>hhh</button>
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
