export const ErrorMessage: React.FC<{ error: string | undefined }> = ({ error }) => {
  return (
    <>
      {error && (
        <p className="text-red-500 m-0 text-sm mt-1">{error}</p>
      )}
    </>
  );
};

export default ErrorMessage
