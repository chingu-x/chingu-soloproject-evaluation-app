import { Loader2 } from "lucide-react";

const LoadingScreen = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Loader2 className="animate-spin text-gray-600 dark:text-gray-300 w-12 h-12 mb-4" />
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Loading, please wait...
            </h2>
        </div>
    )
 }

 export default LoadingScreen