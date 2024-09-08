function SvgRenderComponent({ svgString, classTailwind, size = 32 }) {
  const modidSvg = () => {
    if (!svgString) {
      return;
    }
    
    return svgString
      .replace(/width="[^"]+"/, `width="${size}"`)
      .replace(/height="[^"]+"/, `height="${size}"`);
  }
  return (
    <>
      <div 
        className={classTailwind}
        dangerouslySetInnerHTML={{ __html: modidSvg() }}
      />
    </>
  )
}

export default SvgRenderComponent;