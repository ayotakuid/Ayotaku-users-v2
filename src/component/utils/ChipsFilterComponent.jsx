export const ChipsFilterComponent = ({ text = '', children }) => {
  return (
    <span 
      id="badge-dismiss-default" 
      className="inline-flex items-center px-3 py-1.5 text-ayotaku-text-sm font-medium bg-ayotaku-super-dark hover:bg-ayotaku-box duration-500 transition-all rounded-md"
    >
      {text.charAt(0).toUpperCase() + text.slice(1)}

      {children}
    </span>
  )
}

export default ChipsFilterComponent;