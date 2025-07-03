import FileUploader from "../components/FileUploader"

function HomePage() {
  return (
    <div className='h-screen'>
      <div className='h-full flex items-center justify-center'>
        <FileUploader />
      </div>
    </div>
  )
}

export default HomePage