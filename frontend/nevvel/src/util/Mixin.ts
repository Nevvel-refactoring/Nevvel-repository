const breakpoints = [360, 992, 1440];


export const mobile = `
  @media (max-width: ${breakpoints[0]}px)
`;

// 모바일
// export const mobile = `
//   @media (max-width: ${breakpoints[0]}px)
// `;

// 태블릿 가로
export const tabletH = `
  @media (max-width: ${breakpoints[1]}px)
`;

// 태블릿 세로
// export const tabletV = `
//   @media (max-width: ${breakpoints[2]}px)
// `;