import { styled } from '@stitches/react'
import React from 'react'

type Props = {
  children: JSX.Element
}

const MenuBar = ({children}: Props) => {
  return (
    <Bar>{children}</Bar>
  )
}

const Bar = styled("div", {
  width: "100%",
  backgroundColor: "#1D1D1D",
  padding: "1rem 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "2rem"

})

export default MenuBar