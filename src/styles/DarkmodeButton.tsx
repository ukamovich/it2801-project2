import styled from 'styled-components';

const ToggleDarkMode = styled.button`

    cursor: pointer;
    height: 80px;
    width: 80px;
    border-radius: 20%;
    word-wrap: break-word;
    border: 2px;
    transition-delay: 2s;
    background-color: ${props => props.theme.textColor};
    color: ${props => props.theme.pageBackground};
    
    &:hover {

        box-shadow: #282f38 1px 2px 4px 2px;
        outline: none;
    }
    transition: all .5s ease;
    
`;

export const textBig = styled.h1`

    color: ${props => props.theme.textBackground};
    transition: all .5s ease;
`;
export default ToggleDarkMode;