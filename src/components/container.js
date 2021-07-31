export default ({ elRef, props, data: { width, height } }) => {
    <svg
      className='overflow-visible'
      viewBox={`0 0 ${width} ${height}`}
      {...props}
      ref={elRef}
    ></svg>
}