import React, { ReactNode, SyntheticEvent } from 'react'
import styled from 'styled-components'
import { Link, navigate } from 'gatsby'
import { getLanguage, setLanguage } from '../utils/language';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { designSystem } from '../utils/designSystem'
import config from '../../config/SiteConfig'
import { media } from '../utils/media'
import anime from 'animejs';


type ButtonProps = {
  big: string
}

const button = `
  border: none;
  align-items: center;
  text-transform: uppercase;
  color: black;
  font-weight: bold;
  padding: ${designSystem.spacing(2)};
  line-height: 1;
  font-family: ${designSystem.get('type.fontFamily.mono')};
  font-size: ${(props: ButtonProps) => (props.big ? '1.2rem' : '1rem')};
`

const Wrapper = styled.header`
  grid-column: 2;
  padding: ${designSystem.spacing(4)} 0 ${designSystem.spacing(10)} 0;
`

const Content = styled.div`
  margin: 0 auto;
  position: relative;
  display:grid;
  grid-template-columns: 8fr 3fr 0.5fr;
  grid-gap: ${designSystem.spacing(4)};
  @media ${media.phone} {
    grid-gap: 0;
  grid-template-columns: 1fr;

  }
`

const LogoLink = styled(Link)`
  overflow:hidden;
  display:inline-block;
  @media ${media.phone} {
   & path.text {
     fill: rgba(0,0,0,1)
   }
  }
`

const Menu = styled.div`
  display:flex;
  justify-content: flex-end;
  @media ${media.phone} {
    margin-top: ${designSystem.spacing(2)};
    justify-content: center;
  }
`;
const MenuItem = styled(Link)`
  ${button}
  ${props => { return props.isActive ? `color:${designSystem.color('blue')}`: ''}};
  padding: ${designSystem.space(1)} ${designSystem.space(3)};
`


interface Props {
  children?: ReactNode
  location: any;
}

async function AddVisable(event:any){
  if(event.target.getAttribute('fill') === `rgba(0,0,0,0)`){
    anime({
      targets: event.target,
      fill: ['rgba(0,0,0,0)', `rgba(0,0,0,1)`],
      easing: 'easeInOutSine',
      duration: 500,
    });
  }
}

const routes = [
  {to: '/#about', name: "About"},
  {to: '/#team', name: "Team"},
  {to: '/#blog', name: "Blog"},
]

function Navbar(location:{ hash: string, pathname:string }){
  const list = routes.map(item => {
    const isActive = item.to ===  location.pathname + location.hash;
    const selectedName = isActive ? `[${item.name}]` : item.name;
    return  <MenuItem key={item.to} isActive={isActive} to={item.to}>{selectedName}</MenuItem>
  })

  return (<Menu>
    {list}
  </Menu>)
}
const Header = ({ children, location }: Props) => (
  <Wrapper>
    <Content>
      <LogoLink to="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="151" height="67" fill="none">
          <path className="text" onMouseEnter={AddVisable} fill="rgba(0,0,0,0)" d="M68 29.26h14.004v-4.993H73.92v-4.28h7.153V14.84H73.92v-3.784h8.084V6H68v23.26zM86.264 29.26h7.213l4.628-6.823 4.628 6.823h7.213l-8.235-12.126L109.224 6h-7.212l-3.907 5.8L94.168 6h-7.212l7.513 11.134-8.204 12.127zM132.325 17.661c0-6.42-5.049-11.661-11.27-11.661-6.22 0-11.239 5.241-11.239 11.661s5.019 11.6 11.239 11.6c6.221 0 11.27-5.18 11.27-11.6zm-5.89-.03c0 3.039-2.404 5.55-5.38 5.55-2.945 0-5.349-2.511-5.349-5.55 0-3.071 2.404-5.552 5.349-5.552 2.976 0 5.38 2.48 5.38 5.551zM68 59h8.355c6.22 0 11.269-5.21 11.269-11.63 0-6.42-5.049-11.63-11.27-11.63H68V59zm5.89-6.017v-11.01h2.495c2.945 0 5.349 2.481 5.349 5.49 0 3.04-2.404 5.52-5.35 5.52H73.89zM91.181 59h14.004v-4.993h-8.084v-4.28h7.153v-5.148h-7.153v-3.784h8.084v-5.056H91.181V59zM119.382 59h2.705l10.488-23.291h-5.89l-5.95 13.242-5.921-13.242h-5.95L119.382 59z"/>
          <path className="cut" stroke="#000" strokeWidth="5" d="M7.478 8.5H53.5v48H7.478v-48z"/>
          <path className="frame" fill="#000" d="M0 0h49.84c.653 0 1.182.53 1.182 1.183v1.53c0 27.544-22.33 49.874-49.874 49.874A1.148 1.148 0 0 1 0 51.44V0z"/>
        </svg>
      </LogoLink>
      {Navbar(location)}
      <LanguageSwitcher
        languages={{
          en: true,
          ja: true
        }}
        onClick={(langKey: string) => {
          setLanguage(langKey);
          navigate('/');
        }}
        selectedLanguage={getLanguage()}
      />
      {children}
    </Content>
  </Wrapper>
)

export default Header
