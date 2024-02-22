import { useState } from "react";
import { Pencil, X } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from '../ui/use-toast';
import { useSession } from "next-auth/react";

// FTM-2 / FTM-19 3. Add photo
// FTM-2 / FTM-20 3. Add photo

export default function AddFile({ setImgUrl }: { setImgUrl: React.Dispatch<React.SetStateAction<string>> }) {
  const [showModal, setShowModal] = useState(false);
  const { data: session, update } = useSession();
  const { toast } = useToast();

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
      const res = await fetch("/api/upload/photo", {
        method: "POST",
        body: formData,
      });
      if (res.status === 201) {
        const responseData = await res.json();
        console.log(responseData);
        console.log('Image URL:', responseData.data.secure_url);
        const imageURL = responseData.data.secure_url;
        setImgUrl(imageURL);
        await update({ 
          ...session, 
          ...session?.user,
          image: imageURL,
        });
        toast({
          description: "File uploaded successfully.",
        })
      } else {
        toast({
          description: "File upload failed.",
        })
        console.error('File upload failed');
      }
    } catch (error: any) {
      toast({
        description: "Error uploading file.",
      })
      console.log(error.response?.data);
    }
    setUploading(false);
  };

  return (
    <>
      <div className="mb-1 flex items-center justify-between w-full">
        <button
          onClick={handleModalToggle}
          className="w-full flex items-center ">
          <Pencil className="mr-1 h-5 w-5" />
        </button>
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
              <h3 className="text-lg font-semibold text-zinc-900">
                Upload File
              </h3>
              <Button
                type="button"
                onClick={handleModalToggle}
                className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-zinc-400 hover:bg-zinc-200 hover:text-zinc-900"
                data-modal-toggle="defaultModal">
                <X className="h-6 w-6" />
                <span className="sr-only">Close modal</span>
              </Button>
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
                <p className="my-2 text-sm">
                  Images in png, jpg and jpeg format are supported. Square images are recommended.
                </p>
                <Button
                  type="submit"
                  disabled={uploading}
                  className="mt-4 w-32 rounded bg-primary py-2 text-center text-white">
                  {uploading ? "Uploading..." : "Upload"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}