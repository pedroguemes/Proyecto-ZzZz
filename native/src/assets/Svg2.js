import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Svg2(props) {
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
      <Path d="M12 3L20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3" />
      <Path d="M12 12L20 7.5" />
      <Path d="M12 12L12 21" />
      <Path d="M12 12L4 7.5" />
    </Svg>
  )
}

export default Svg2