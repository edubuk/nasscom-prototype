

const DataPage = ({dataStatus}:{dataStatus:string}) => {
  return (
    <div className="flex flex-col items-center justify-center h-[65vh]">
      <div className="p-6 w-96 text-center">
        <h2 className="text-2xl font-semibold mb-4">Please wait</h2>
        <p className="text-lg text-[#03257e]">{dataStatus}</p>
      </div>
    </div>
  )
}

export default DataPage
