
function LandingPage() {
  return (
    <div className="h-screen">
      <div>
        <div className="p-10 flex justify-start items-center h-[25rem] relative">
          <h1 className="text-5xl font-bold">Welcome to Image Modifier</h1>
        </div>
        <div className="bg-[url(/public/image1.jpg)] h-[22rem] w-[22rem] absolute right-[8rem] top-[8rem] rounded-md bg-cover"></div>
      </div>
    </div>
  )
}

export default LandingPage