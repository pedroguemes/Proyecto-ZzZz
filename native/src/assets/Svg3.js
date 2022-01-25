import * as React from "react"
import Svg, { Path, Rect } from "react-native-svg"

function Svg3(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={36}
      height={36}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#fff"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M0 0h24v24H0z" stroke="none" />
      <Path d="M15 8L15.01 8" />
      <Rect x={4} y={4} width={16} height={16} rx={3} />
      <Path d="M4 15l4-4a3 5 0 013 0l5 5" />
      <Path d="M14 14l1-1a3 5 0 013 0l2 2" />
    </Svg>
  )
}

export default Svg3