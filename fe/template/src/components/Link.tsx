import React from 'react'
import { Link, LinkProps } from '@tanstack/react-router';
import { styled } from '@stitches/react';
import { theme } from '@/stitches.config';

const Links = styled(Link, {
  backgroundColor: "#292929",
  color: "#AAAAAA",
  textDecoration: 'none',
  padding: "0.75rem 1rem",
  fontFamily: theme.fonts.poppins,
  borderRadius: '8px',
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

})

export default Links