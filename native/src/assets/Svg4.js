import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Svg4(props) {
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
      <Path d="M7.859 6H5.025A2.025 2.025 0 003 8.025v2.834c0 .537.213 1.052.593 1.432l6.116 6.116a2.025 2.025 0 002.864 0l2.834-2.834a2.025 2.025 0 000-2.864L9.29 6.593A2.025 2.025 0 007.859 6z" />
      <Path d="M17.573 18.407l2.834-2.834a2.025 2.025 0 000-2.864L13.29 5.593M6 9h-.01" />
    </Svg>
  )
}

export default Svg4
