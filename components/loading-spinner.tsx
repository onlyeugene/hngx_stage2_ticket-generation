export const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
      <p className="mt-2">Uploading...</p>
    </div>
  );