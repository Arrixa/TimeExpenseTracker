// Import necessary dependencies
import { useState } from 'react';
import { Button } from '@/app/components/ui/button';

// Cloudinary upload function for client-side
// const fileUpload = async (formData: FormData) => {
//   try {
//     // Perform fetch to server-side API route
//     const response = await fetch('/api/upload', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ image: formData.get('image') }),
//     });

//     // Check if the response is successful (status code 2xx)
//     if (response.ok) {
//       const result = await response.json();
//       console.log('Server response:', result);
//       // Handle successful response, if needed
//     } else {
//       // Handle error response
//       const errorData = await response.json();
//       console.error('Server error:', errorData);
//     }
//   } catch (error) {
//     console.error('Client error:', error);
//   }
// };

// // Main component
// export default function AddFile() {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   // Handle file change
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setSelectedFile(e.target.files[0]);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (selectedFile) {
//       const formData = new FormData();
//       formData.append('image', selectedFile);

//       // Call the client-side Cloudinary upload function
//       fileUpload(formData);
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">Add a profile photo</h2>
//       <form onSubmit={handleSubmit} className="bg-white border border-slate-200 dark:border-slate-500 rounded p-6 mb-6">
//         <p className="mb-6">
//           <label htmlFor="image" className="block font-semibold text-sm mb-2">
//             Select an image to upload
//           </label>
//           <input
//             id="image"
//             className="block w-full border-slate-400 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//             type="file"
//             name="image"
//             onChange={handleFileChange}
//             required
//           />
//         </p>
//         <Button type="submit">Submit</Button>
//       </form>
//     </div>
//   );
// };




import { HiPlus } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

type Props = {
  fetchFiles: () => void;
};

export default function AddFile({ fetchFiles }: Props) {
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return; // Guard clause
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    setUploading(true);
  
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("image", selectedFile);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (res.status === 201) {
        // Assuming fetchFiles is a function that triggers refetch of files
        fetchFiles();
      }
    } catch (error: any) {
      console.log(error.response?.data);
    }
    setUploading(false);
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={handleModalToggle}
          className="flex items-center rounded-lg border border-gray-400 bg-transparent px-5 py-2.5 text-sm font-medium text-gray-700 hover:border-gray-800 hover:bg-gray-800 hover:text-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200">
          <HiPlus className="mr-1 h-5 w-5" />
          Upload File
        </button>

        {/* Search bar */}
        <div
          className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
          id="navbar-search">
          <div className="relative hidden md:block">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <FaSearch />
              <span className="sr-only">Search icon</span>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full rounded-lg border border-gray-500 bg-gray-50 p-2.5 pl-10 text-sm text-gray-800 focus:border-blue-600 focus:outline-none"
              placeholder="Search files..."
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          id="defaultModal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
          {/* Modal content */}
          <div className="relative w-full max-w-2xl rounded-lg bg-white p-4 shadow sm:p-5">
            {/* Modal header */}
            <div className="mb-4 flex items-center justify-between rounded-t border-b pb-4 sm:mb-5">
              <h3 className="text-lg font-semibold text-gray-900">
                Upload File
              </h3>
              <button
                type="button"
                onClick={handleModalToggle}
                className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                data-modal-toggle="defaultModal">
                <MdClose className="h-6 w-6" />
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div>
              <form onSubmit={handleUpload}>
                <div className="mb-1 text-sm font-medium">Upload File</div>
                <input
                  type="file"
                  name="image"
                  className="text-grey-500 w-full cursor-pointer rounded-lg border-2 border-gray-900 bg-gray-50 pr-20 text-sm file:mr-5 file:border-0 file:bg-gray-900
             file:px-6 file:py-2 file:text-sm file:font-medium file:text-white hover:file:cursor-pointer"
                  onChange={handleFileChange}
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  IMG, DOCX, PDF or mp3 (MAX. 4GB).
                </p>
                <button
                  type="submit"
                  disabled={uploading}
                  style={{ opacity: uploading ? ".5" : "1" }}
                  className="mt-4 w-32 rounded bg-red-600 py-2 text-center text-white">
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}