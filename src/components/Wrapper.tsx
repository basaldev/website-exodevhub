import styled from 'styled-components'

import { media } from '../utils/media'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(320px, 100%) 1fr;
  grid-gap: 32px;
  padding: 0 1rem;
  @media ${media.phone} {
    grid-gap: 0;
    grid-template-columns: 1fr;
  }
`

export default Wrapper
