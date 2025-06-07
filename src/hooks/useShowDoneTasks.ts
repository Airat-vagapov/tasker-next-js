const useShowDoneTasks = () =>{

   const getDoneTasks = async () => {
    try {
        const response = await fetch(`http://localhost:8080/tasks/status/3`, { 'method': 'GET' });
        const data = await response.json();
        return data.result;
    }
    catch (err){
        console.error(err);
    }
   }

   return { getDoneTasks };
}

export default useShowDoneTasks;