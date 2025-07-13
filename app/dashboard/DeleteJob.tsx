"use client"
import { MdDelete } from "react-icons/md"
const DeleteJob = ({ jobId }: { jobId: string }) => {
    const deleteJob = async () => {
        try {
            const response = await fetch(`/api/jobs/${jobId}/delete`,
                {
                    method: "DELETE"
                }
            )
            if (response.status == 200) {
                alert("Job Deleted successfully")
            }
        } catch (error) {
            console.log("Error deleting job: ", (error as Error).message)
        }
    }

    return (

        <div>
            <button className="flex text-xs bg-black text-white px-1 py-0.5 rounded-md items-center" onClick={deleteJob}>
                <MdDelete /> Delete
            </button>
        </div>
    )
}

export default DeleteJob