function SvgRenderComponent({ svgString, classTailwind }) {
  return (
    <>
      <div 
        className={classTailwind}
        dangerouslySetInnerHTML={{ __html: svgString }}
      />
    </>
  )
}

export default SvgRenderComponent;