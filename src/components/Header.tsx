import React from "react";
import ToggleDarkMode from "../styles/DarkmodeButton";
import robot2k from '../Images/robot2k.png'

type props = {
    theme: string;
    setTheme: (arg0: string) => void;
}

class Header extends React.Component<props> {
    
    //function to switch between darkMode and LightMode
    changeTheme = () => {
        if (this.props.theme === "light") {
            this.props.setTheme("dark");
        } else {
            this.props.setTheme("light");
        }
        localStorage.setItem("theme", (this.props.theme === "light") ? "dark" : "light")
    };

    render() {
        return (
            
            <header className="header2k">
                <div className = "robocont">
                <img src={robot2k} id ="robo" alt="Logo" />
                </div>
                <div id="title">
                    <h1>The Commit Grabber</h1>
                </div>
                <div id="darkButtonCont">
                    <ToggleDarkMode onClick={this.changeTheme} id="darkButton">
                        {this.props.theme === "light" ? "DarkMode" : "LightMode"}
                    </ToggleDarkMode>
                </div>

                



            </header>

            
        );
    }
}

export default Header