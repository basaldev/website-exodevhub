import styled from 'styled-components';
import { designSystem } from 'utils/designSystem';

const Subline = styled.div`

font-family: ${designSystem.get(`type.fontFamily.mono`)};
font-size: ${props => props.theme.fontSize.small};
color: ${props => props.theme.colors.grey.light};
${props => props.sectionTitle && 'margin-top: -3rem'};
${props => props.sectionTitle && 'margin-bottom: 4rem'};
${props => props.sectionTitle && 'text-align: center'};
a {
  float:right;
}
`;

export default Subline;
