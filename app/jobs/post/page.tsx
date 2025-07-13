"use client"
import { FormEvent } from "react"
const PostJob = () => {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            title: formData.get("title"),
            company: formData.get("company"),
            location: formData.get("location"),
            type: formData.get("type"),
            description: formData.get("description"),
            salary: formData.get("salary"),
        }
        try {
            const response = await fetch('/api/jobs',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            )
            window.location.href = "/jobs";
        }
        catch (error) {
            console.log("Err", error)
        }
    }

    return (
        <div className="max-w-2xl mx-auto text-black">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Post a Job</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Job Title
                    </label>
                    <input type="text"
                        name="title"
                        id="title"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                </div>
                <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                        Company Title
                    </label>
                    <input type="text"
                        name="company"
                        id="company"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                </div>
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Job Location
                    </label>
                    <input type="text"
                        name="location"
                        id="location"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                </div>
                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                        Job Type
                    </label>
                    <select className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600" name="type" id="type" required>
                        <option value="">Select a type</option>
                        <option value="Full-time">Full time</option>
                        <option value="Part-time">Part time</option>
                        <option value="Contact">Contract</option>
                        <option value="Internship">Internship</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea name="description" id="description"
                        rows={6}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                        Salary (Optional)
                    </label>
                    <input type="text"
                        name="salary"
                        id="salary"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600" placeholder="e.g., 80k-100k PKR"
                    />
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed">POST a Job</button>
            </form>
        </div>
    )
}

export default PostJob