import styled from 'styled-components';
import { designSystem } from 'utils/designSystem';
import { Link } from 'gatsby';

const Button = styled(Link)`
  background: ${designSystem.color('yellow')};
  border: none;
  display: inline-flex;
  align-items: center;
  text-transform: uppercase;
  color: black;
  font-weight: bold;
  padding: ${designSystem.spacing(2)};
  line-height: 1;
  font-family: ${designSystem.get('type.fontFamily.mono')};
  font-size: ${props => (props.big ? '1.2rem' : '1rem')};
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;
export default Button;
